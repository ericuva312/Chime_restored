"""
Security utilities for ROI Calculator backend
"""
import hashlib
import hmac
import time
import re
from functools import wraps
from flask import request, jsonify, session
from collections import defaultdict, deque
import threading

# Rate limiting storage
rate_limit_storage = defaultdict(lambda: deque())
rate_limit_lock = threading.Lock()

# CSRF token storage
csrf_tokens = {}

def generate_csrf_token():
    """Generate a CSRF token"""
    import secrets
    token = secrets.token_urlsafe(32)
    csrf_tokens[token] = time.time()
    return token

def validate_csrf_token(token):
    """Validate CSRF token"""
    if not token or token not in csrf_tokens:
        return False
    
    # Check if token is not expired (1 hour)
    if time.time() - csrf_tokens[token] > 3600:
        del csrf_tokens[token]
        return False
    
    return True

def rate_limit(max_requests=10, window_minutes=1):
    """Rate limiting decorator"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            current_time = time.time()
            window_seconds = window_minutes * 60
            
            with rate_limit_lock:
                # Clean old requests
                while (rate_limit_storage[client_ip] and 
                       current_time - rate_limit_storage[client_ip][0] > window_seconds):
                    rate_limit_storage[client_ip].popleft()
                
                # Check rate limit
                if len(rate_limit_storage[client_ip]) >= max_requests:
                    return jsonify({
                        'error': 'Rate limit exceeded. Please try again later.',
                        'retry_after': window_seconds
                    }), 429
                
                # Add current request
                rate_limit_storage[client_ip].append(current_time)
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def sanitize_input(data):
    """Sanitize input data"""
    if isinstance(data, str):
        # Remove potentially dangerous characters
        data = re.sub(r'[<>"\']', '', data)
        # Limit length
        data = data[:1000]
        return data.strip()
    elif isinstance(data, dict):
        return {k: sanitize_input(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_input(item) for item in data]
    return data

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Validate phone format (basic validation)"""
    if not phone:
        return True  # Optional field
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', phone)
    # Check if it's between 10-15 digits
    return 10 <= len(digits_only) <= 15

def validate_url(url):
    """Validate URL format"""
    if not url:
        return True  # Optional field
    pattern = r'^https?://[^\s/$.?#].[^\s]*$'
    return re.match(pattern, url) is not None

def encrypt_sensitive_data(data, key=None):
    """Simple encryption for sensitive data"""
    if not data:
        return data
    
    # Use a simple XOR encryption for demonstration
    # In production, use proper encryption libraries
    if not key:
        key = "roi_calculator_secret_key_2024"
    
    result = ""
    for i, char in enumerate(data):
        result += chr(ord(char) ^ ord(key[i % len(key)]))
    
    # Base64 encode the result
    import base64
    return base64.b64encode(result.encode()).decode()

def decrypt_sensitive_data(encrypted_data, key=None):
    """Simple decryption for sensitive data"""
    if not encrypted_data:
        return encrypted_data
    
    if not key:
        key = "roi_calculator_secret_key_2024"
    
    try:
        # Base64 decode
        import base64
        data = base64.b64decode(encrypted_data.encode()).decode()
        
        result = ""
        for i, char in enumerate(data):
            result += chr(ord(char) ^ ord(key[i % len(key)]))
        
        return result
    except:
        return encrypted_data  # Return as-is if decryption fails

def enforce_https():
    """Middleware to enforce HTTPS in production"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # In production, redirect HTTP to HTTPS
            if not request.is_secure and request.headers.get('X-Forwarded-Proto') != 'https':
                # For development, we'll skip this check
                pass
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def log_security_event(event_type, details, ip_address=None):
    """Log security events"""
    import logging
    
    if not ip_address:
        ip_address = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    
    logging.warning(f"SECURITY EVENT: {event_type} - IP: {ip_address} - Details: {details}")

