import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import text
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Import our modules
from src.models.user import db
from src.models.roi_submission import ROISubmission
from src.routes.user import user_bp
from src.routes.roi_calculator import roi_bp
from src.utils.security import rate_limit, sanitize_input, enforce_https, log_security_event
from src.utils.monitoring import get_system_health, submission_tracker, check_system_health_alerts
from src.utils.database import configure_database, create_database_indexes, test_database_connection

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_secure_app():
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    
    # Security configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'roi-calculator-secure-key-2024')
    app.config['WTF_CSRF_ENABLED'] = True
    app.config['WTF_CSRF_TIME_LIMIT'] = 3600  # 1 hour
    
    # Configure database with production settings
    database_url = configure_database(app)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=["http://localhost:5173", "https://chime-restored.vercel.app"])
    
    # Register blueprints
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(roi_bp, url_prefix='/api/roi-calculator')
    
    # Create tables and indexes
    with app.app_context():
        try:
            db.create_all()
            create_database_indexes(db)
            logger.info("✅ Database tables and indexes created successfully")
        except Exception as e:
            logger.error(f"❌ Database setup error: {e}")
    
    # Test database connection
    if not test_database_connection(app):
        logger.warning("⚠️ Database connection test failed")
    
    return app

app = create_secure_app()

# Security middleware
@app.before_request
@enforce_https()
def security_middleware():
    """Apply security measures to all requests"""
    # Log suspicious activity
    if request.method == 'POST' and len(request.get_data()) > 10000:
        log_security_event('large_payload', f'Size: {len(request.get_data())}')
    
    # Sanitize JSON data
    if request.is_json and request.json:
        request.json = sanitize_input(request.json)

# Enhanced health check endpoint
@app.route('/api/health', methods=['GET'])
@rate_limit(max_requests=30, window_minutes=1)
def health_check():
    """Enhanced health check with system metrics"""
    try:
        health_data = get_system_health()
        
        # Check database connection
        try:
            with db.engine.connect() as connection:
                connection.execute(text('SELECT 1'))
            health_data['database'] = 'healthy'
        except Exception as e:
            health_data['database'] = f'error: {str(e)}'
        
        # Check system alerts
        check_system_health_alerts()
        
        return jsonify({
            'status': 'healthy',
            'service': 'roi-calculator-backend',
            'version': '2.0.0-secure',
            'timestamp': os.environ.get('TIMESTAMP', 'unknown'),
            'metrics': health_data,
            'security': {
                'csrf_protection': True,
                'rate_limiting': True,
                'input_sanitization': True,
                'https_enforcement': True
            }
        })
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

# Error handlers
@app.errorhandler(429)
def rate_limit_handler(e):
    """Handle rate limit errors"""
    log_security_event('rate_limit_exceeded', str(e))
    return jsonify({
        'error': 'Rate limit exceeded',
        'message': 'Too many requests. Please try again later.',
        'retry_after': 60
    }), 429

@app.errorhandler(400)
def bad_request_handler(e):
    """Handle bad requests"""
    log_security_event('bad_request', str(e))
    return jsonify({
        'error': 'Bad request',
        'message': 'Invalid request format or data.'
    }), 400

@app.errorhandler(403)
def forbidden_handler(e):
    """Handle forbidden requests"""
    log_security_event('forbidden_access', str(e))
    return jsonify({
        'error': 'Forbidden',
        'message': 'Access denied.'
    }), 403

@app.errorhandler(500)
def internal_error_handler(e):
    """Handle internal server errors"""
    logger.error(f"Internal server error: {e}")
    submission_tracker.send_alert('Internal Server Error', {'error': str(e)})
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred. Please try again later.'
    }), 500

# Security headers
@app.after_request
def security_headers(response):
    """Add security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

# Monitoring endpoint
@app.route('/api/metrics', methods=['GET'])
@rate_limit(max_requests=10, window_minutes=1)
def metrics():
    """System metrics endpoint"""
    try:
        return jsonify(get_system_health())
    except Exception as e:
        logger.error(f"Metrics error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"🚀 Starting Secure ROI Calculator Backend on port {port}")
    logger.info(f"🔒 Security features enabled:")
    logger.info(f"   - Rate limiting (10 req/min per IP)")
    logger.info(f"   - CSRF protection")
    logger.info(f"   - Input sanitization")
    logger.info(f"   - Security headers")
    logger.info(f"   - HTTPS enforcement")
    logger.info(f"📊 Monitoring enabled:")
    logger.info(f"   - Health checks")
    logger.info(f"   - Error tracking")
    logger.info(f"   - Performance metrics")
    logger.info(f"   - Alert system")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

