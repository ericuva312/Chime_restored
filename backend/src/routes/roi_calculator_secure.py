"""
ROI Calculator API Routes with Security and Monitoring
"""
from flask import Blueprint, request, jsonify
import logging
import time
from datetime import datetime

# Import models and services
from src.models.roi_submission import ROISubmission, db
from src.services.email_service import EmailService
from src.services.hubspot_service import HubSpotService
from src.utils.lead_scoring import calculate_lead_score, assign_tier
from src.utils.validation import validate_roi_submission
from src.utils.security import rate_limit, sanitize_input, validate_email, validate_phone, validate_url, encrypt_sensitive_data
from src.utils.monitoring import submission_tracker, email_monitor, hubspot_monitor, log_submission_event

# Create blueprint
roi_calculator_bp = Blueprint('roi_calculator', __name__)
logger = logging.getLogger(__name__)

@roi_calculator_bp.route('/calculate', methods=['POST'])
@rate_limit(max_requests=20, window_minutes=1)
def calculate_roi():
    """Real-time ROI calculation endpoint"""
    start_time = time.time()
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Sanitize input
        data = sanitize_input(data)
        
        # Validate required field
        monthly_revenue = data.get('monthly_revenue')
        if not monthly_revenue or float(monthly_revenue) <= 0:
            return jsonify({'error': 'Valid monthly revenue is required'}), 400
        
        monthly_revenue = float(monthly_revenue)
        
        # Calculate projections for all scenarios
        projections = {
            'conservative': {
                'monthly_revenue': monthly_revenue * 1.10,
                'monthly_increase': monthly_revenue * 0.10,
                'annual_benefit': monthly_revenue * 0.10 * 12,
                'roi_percentage': 150,
                'break_even_months': 6,
                'conversion_improvement': '15%',
                'cost_reduction': '8%'
            },
            'expected': {
                'monthly_revenue': monthly_revenue * 1.30,
                'monthly_increase': monthly_revenue * 0.30,
                'annual_benefit': monthly_revenue * 0.30 * 12,
                'roi_percentage': 400,
                'break_even_months': 5,
                'conversion_improvement': '25%',
                'cost_reduction': '15%'
            },
            'optimistic': {
                'monthly_revenue': monthly_revenue * 1.50,
                'monthly_increase': monthly_revenue * 0.50,
                'annual_benefit': monthly_revenue * 0.50 * 12,
                'roi_percentage': 700,
                'break_even_months': 4,
                'conversion_improvement': '40%',
                'cost_reduction': '25%'
            }
        }
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'success': True,
            'projections': projections,
            'processing_time': round(processing_time, 3),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"ROI calculation error: {e}")
        return jsonify({
            'error': 'Calculation failed',
            'message': 'Unable to process ROI calculation. Please try again.'
        }), 500

@roi_calculator_bp.route('/submit', methods=['POST'])
@rate_limit(max_requests=5, window_minutes=1)
def submit_roi_form():
    """Enhanced form submission with full workflow"""
    start_time = time.time()
    submission_id = None
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Sanitize input
        data = sanitize_input(data)
        
        # Validate form data
        validation_result = validate_roi_submission(data)
        if not validation_result['valid']:
            return jsonify({
                'error': 'Validation failed',
                'field_errors': validation_result['errors']
            }), 400
        
        # Additional security validations
        if not validate_email(data.get('email')):
            return jsonify({'error': 'Invalid email format'}), 400
        
        if not validate_phone(data.get('phone')):
            return jsonify({'error': 'Invalid phone format'}), 400
        
        if not validate_url(data.get('website')):
            return jsonify({'error': 'Invalid website URL'}), 400
        
        # Calculate lead score and tier
        lead_score = calculate_lead_score(data)
        tier = assign_tier(lead_score)
        
        # Create submission record with encrypted sensitive data
        submission = ROISubmission(
            monthly_revenue=float(data['monthly_revenue']),
            average_order_value=float(data['average_order_value']),
            monthly_orders=int(data['monthly_orders']),
            industry=data['industry'],
            conversion_rate=float(data['conversion_rate']),
            cart_abandonment_rate=float(data['cart_abandonment_rate']),
            monthly_ad_spend=float(data.get('monthly_ad_spend', 0)) if data.get('monthly_ad_spend') else None,
            manual_hours_per_week=int(data['manual_hours_per_week']),
            business_stage=data['business_stage'],
            biggest_challenges=str(data.get('biggest_challenges', [])),
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=encrypt_sensitive_data(data['email']),  # Encrypt email
            business_name=data['business_name'],
            website=data.get('website'),
            phone=encrypt_sensitive_data(data.get('phone')) if data.get('phone') else None,  # Encrypt phone
            lead_score=lead_score,
            tier=tier,
            ip_address=request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
        )
        
        # Save to database
        db.session.add(submission)
        db.session.commit()
        submission_id = submission.submission_id
        
        log_submission_event(submission_id, 'submission_created', {
            'tier': tier,
            'lead_score': lead_score,
            'industry': data['industry']
        })
        
        # Initialize services
        email_service = EmailService()
        hubspot_service = HubSpotService()
        
        # Process email sending
        try:
            # Send customer confirmation email
            email_result = email_service.send_confirmation_email(submission, data)
            if email_result['success']:
                submission.email_sent = True
                email_monitor.record_email_sent(submission_id, 'confirmation', data['email'])
            else:
                email_monitor.record_email_error(submission_id, 'confirmation', email_result['error'])
            
            # Send internal notification
            internal_result = email_service.send_internal_notification(submission, data)
            if internal_result['success']:
                email_monitor.record_email_sent(submission_id, 'internal', 'hello@chimehq.co')
            else:
                email_monitor.record_email_error(submission_id, 'internal', internal_result['error'])
                
        except Exception as e:
            logger.error(f"Email processing error for {submission_id}: {e}")
            email_monitor.record_email_error(submission_id, 'system', str(e))
        
        # Process HubSpot integration
        try:
            # Create/update contact
            contact_result = hubspot_service.upsert_contact(data, lead_score, tier)
            if contact_result['success']:
                submission.hubspot_contact_id = contact_result['contact_id']
                hubspot_monitor.record_sync_success(submission_id, 'contact', contact_result['contact_id'])
                
                # Create deal
                deal_result = hubspot_service.create_deal(data, contact_result['contact_id'], lead_score)
                if deal_result['success']:
                    submission.hubspot_deal_id = deal_result['deal_id']
                    submission.hubspot_synced = True
                    hubspot_monitor.record_sync_success(submission_id, 'deal', deal_result['deal_id'])
                else:
                    hubspot_monitor.record_sync_error(submission_id, 'deal', deal_result['error'])
            else:
                hubspot_monitor.record_sync_error(submission_id, 'contact', contact_result['error'])
                
        except Exception as e:
            logger.error(f"HubSpot processing error for {submission_id}: {e}")
            hubspot_monitor.record_sync_error(submission_id, 'system', str(e))
        
        # Update submission record
        db.session.commit()
        
        # Record successful submission
        processing_time = time.time() - start_time
        submission_tracker.record_success(submission_id, processing_time)
        
        log_submission_event(submission_id, 'submission_completed', {
            'processing_time': processing_time,
            'email_sent': submission.email_sent,
            'hubspot_synced': submission.hubspot_synced
        })
        
        return jsonify({
            'success': True,
            'message': 'Your ROI analysis has been submitted successfully!',
            'submission_id': submission_id,
            'lead_score': lead_score,
            'tier': tier,
            'processing_time': round(processing_time, 3),
            'next_steps': {
                'email_confirmation': 'Check your email for detailed projections',
                'follow_up': f'Our team will contact you within {get_follow_up_time(tier)}',
                'calendar_link': 'https://calendly.com/chimehq/roi-consultation'
            }
        })
        
    except Exception as e:
        logger.error(f"Submission processing error: {e}")
        if submission_id:
            submission_tracker.record_error(submission_id, 'processing_error', str(e))
        
        return jsonify({
            'error': 'Submission failed',
            'message': 'Unable to process your submission. Please try again or contact support.'
        }), 500

@roi_calculator_bp.route('/status/<submission_id>', methods=['GET'])
@rate_limit(max_requests=10, window_minutes=1)
def get_submission_status(submission_id):
    """Get submission status and processing details"""
    try:
        submission = ROISubmission.query.filter_by(submission_id=submission_id).first()
        
        if not submission:
            return jsonify({'error': 'Submission not found'}), 404
        
        return jsonify({
            'submission_id': submission_id,
            'status': 'completed' if submission.hubspot_synced else 'processing',
            'lead_score': submission.lead_score,
            'tier': submission.tier,
            'email_sent': submission.email_sent,
            'hubspot_synced': submission.hubspot_synced,
            'created_at': submission.timestamp.isoformat(),
            'processing_details': {
                'hubspot_contact_id': submission.hubspot_contact_id,
                'hubspot_deal_id': submission.hubspot_deal_id
            }
        })
        
    except Exception as e:
        logger.error(f"Status check error for {submission_id}: {e}")
        return jsonify({'error': 'Status check failed'}), 500

def get_follow_up_time(tier):
    """Get follow-up time based on lead tier"""
    follow_up_times = {
        'Hot': '1 hour',
        'Warm': '24 hours',
        'Cold': '3 days'
    }
    return follow_up_times.get(tier, '24 hours')

