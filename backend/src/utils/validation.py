"""
Form validation system for ROI calculator submissions
Implements comprehensive validation for all form fields
"""

import re
from decimal import Decimal, InvalidOperation
from urllib.parse import urlparse

class ValidationError(Exception):
    """Custom exception for validation errors"""
    pass

def validate_positive_number(value, field_name, allow_zero=False):
    """Validate positive numeric values"""
    try:
        num_value = float(value)
        if allow_zero and num_value < 0:
            raise ValidationError(f"{field_name} must be zero or positive")
        elif not allow_zero and num_value <= 0:
            raise ValidationError(f"{field_name} must be positive")
        return num_value
    except (ValueError, TypeError):
        raise ValidationError(f"{field_name} must be a valid number")

def validate_positive_integer(value, field_name):
    """Validate positive integer values"""
    try:
        int_value = int(value)
        if int_value <= 0:
            raise ValidationError(f"{field_name} must be a positive integer")
        return int_value
    except (ValueError, TypeError):
        raise ValidationError(f"{field_name} must be a valid integer")

def validate_percentage(value, field_name):
    """Validate percentage values (0-100 with 2 decimals)"""
    try:
        pct_value = float(value)
        if pct_value < 0 or pct_value > 100:
            raise ValidationError(f"{field_name} must be between 0 and 100")
        
        # Check for max 2 decimal places
        decimal_value = Decimal(str(value))
        if decimal_value.as_tuple().exponent < -2:
            raise ValidationError(f"{field_name} can have maximum 2 decimal places")
        
        return pct_value
    except (ValueError, TypeError, InvalidOperation):
        raise ValidationError(f"{field_name} must be a valid percentage")

def validate_email(email):
    """Validate email format"""
    if not email or not isinstance(email, str):
        raise ValidationError("Email is required")
    
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email.strip()):
        raise ValidationError("Invalid email format")
    
    return email.strip().lower()

def validate_alphabetic(value, field_name):
    """Validate alphabetic names"""
    if not value or not isinstance(value, str):
        raise ValidationError(f"{field_name} is required")
    
    # Allow letters, spaces, hyphens, apostrophes
    name_pattern = r"^[a-zA-Z\s\-']+$"
    cleaned_value = value.strip()
    
    if not cleaned_value:
        raise ValidationError(f"{field_name} cannot be empty")
    
    if not re.match(name_pattern, cleaned_value):
        raise ValidationError(f"{field_name} can only contain letters, spaces, hyphens, and apostrophes")
    
    return cleaned_value

def validate_website(url):
    """Validate website URL (optional field)"""
    if not url:
        return None
    
    url = url.strip()
    if not url:
        return None
    
    # Add protocol if missing
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    try:
        parsed = urlparse(url)
        if not parsed.netloc or not parsed.scheme:
            raise ValidationError("Invalid website URL")
        
        # Check for valid TLD
        if '.' not in parsed.netloc:
            raise ValidationError("Website must have a valid domain")
        
        return url
    except Exception:
        raise ValidationError("Invalid website URL format")

def validate_phone(phone):
    """Validate phone number (optional field)"""
    if not phone:
        return None
    
    phone = phone.strip()
    if not phone:
        return None
    
    # Remove common formatting characters
    cleaned_phone = re.sub(r'[\s\-\(\)\+\.]', '', phone)
    
    # Check if it's all digits (after cleaning)
    if not cleaned_phone.isdigit():
        raise ValidationError("Phone number can only contain digits and formatting characters")
    
    # Check length (7-15 digits is reasonable for international numbers)
    if len(cleaned_phone) < 7 or len(cleaned_phone) > 15:
        raise ValidationError("Phone number must be between 7 and 15 digits")
    
    return phone  # Return original format

def validate_dropdown_choice(value, field_name, valid_choices):
    """Validate dropdown selections"""
    if not value:
        raise ValidationError(f"{field_name} is required")
    
    if value not in valid_choices:
        raise ValidationError(f"Invalid {field_name} selection")
    
    return value

def validate_roi_submission(data):
    """
    Validate complete ROI submission data
    Returns: cleaned_data dict
    Raises: ValidationError with specific field errors
    """
    errors = {}
    cleaned_data = {}
    
    # Define valid choices
    VALID_INDUSTRIES = [
        'Fashion', 'Beauty', 'Sports', 'Food & Beverage', 'Electronics', 
        'Health & Wellness', 'Home & Garden', 'Automotive', 'Other'
    ]
    
    VALID_BUSINESS_STAGES = ['Startup', 'Growth', 'Established', 'Mature']
    
    VALID_CHALLENGES = [
        'Manual processes', 'Low conversion rates', 'High cart abandonment',
        'Poor customer retention', 'Inventory management', 'Marketing inefficiency',
        'Customer service issues', 'Data analysis challenges', 'Other'
    ]
    
    # Validate required numeric fields
    try:
        cleaned_data['monthly_revenue'] = validate_positive_number(
            data.get('monthly_revenue'), 'Monthly revenue'
        )
    except ValidationError as e:
        errors['monthly_revenue'] = str(e)
    
    try:
        cleaned_data['average_order_value'] = validate_positive_number(
            data.get('average_order_value'), 'Average order value'
        )
    except ValidationError as e:
        errors['average_order_value'] = str(e)
    
    try:
        cleaned_data['monthly_orders'] = validate_positive_integer(
            data.get('monthly_orders'), 'Monthly orders'
        )
    except ValidationError as e:
        errors['monthly_orders'] = str(e)
    
    try:
        cleaned_data['conversion_rate'] = validate_percentage(
            data.get('conversion_rate'), 'Conversion rate'
        )
    except ValidationError as e:
        errors['conversion_rate'] = str(e)
    
    try:
        cleaned_data['cart_abandonment_rate'] = validate_percentage(
            data.get('cart_abandonment_rate'), 'Cart abandonment rate'
        )
    except ValidationError as e:
        errors['cart_abandonment_rate'] = str(e)
    
    try:
        cleaned_data['manual_hours_per_week'] = validate_positive_integer(
            data.get('manual_hours_per_week'), 'Manual hours per week'
        )
    except ValidationError as e:
        errors['manual_hours_per_week'] = str(e)
    
    # Validate optional numeric field
    if data.get('monthly_ad_spend'):
        try:
            cleaned_data['monthly_ad_spend'] = validate_positive_number(
                data.get('monthly_ad_spend'), 'Monthly ad spend', allow_zero=True
            )
        except ValidationError as e:
            errors['monthly_ad_spend'] = str(e)
    else:
        cleaned_data['monthly_ad_spend'] = None
    
    # Validate dropdown fields
    try:
        cleaned_data['industry'] = validate_dropdown_choice(
            data.get('industry'), 'Industry', VALID_INDUSTRIES
        )
    except ValidationError as e:
        errors['industry'] = str(e)
    
    try:
        cleaned_data['business_stage'] = validate_dropdown_choice(
            data.get('business_stage'), 'Business stage', VALID_BUSINESS_STAGES
        )
    except ValidationError as e:
        errors['business_stage'] = str(e)
    
    # Validate challenges (multi-select)
    challenges = data.get('biggest_challenges', [])
    if not challenges:
        errors['biggest_challenges'] = 'At least one challenge must be selected'
    else:
        if isinstance(challenges, str):
            try:
                import json
                challenges = json.loads(challenges)
            except:
                errors['biggest_challenges'] = 'Invalid challenges format'
        
        if isinstance(challenges, list):
            for challenge in challenges:
                if challenge not in VALID_CHALLENGES:
                    errors['biggest_challenges'] = f'Invalid challenge: {challenge}'
                    break
            cleaned_data['biggest_challenges'] = challenges
        else:
            errors['biggest_challenges'] = 'Challenges must be a list'
    
    # Validate contact information
    try:
        cleaned_data['first_name'] = validate_alphabetic(
            data.get('first_name'), 'First name'
        )
    except ValidationError as e:
        errors['first_name'] = str(e)
    
    try:
        cleaned_data['last_name'] = validate_alphabetic(
            data.get('last_name'), 'Last name'
        )
    except ValidationError as e:
        errors['last_name'] = str(e)
    
    try:
        cleaned_data['email'] = validate_email(data.get('email'))
    except ValidationError as e:
        errors['email'] = str(e)
    
    # Business name (required text)
    business_name = data.get('business_name', '').strip()
    if not business_name:
        errors['business_name'] = 'Business name is required'
    else:
        cleaned_data['business_name'] = business_name
    
    # Optional fields
    try:
        cleaned_data['website'] = validate_website(data.get('website'))
    except ValidationError as e:
        errors['website'] = str(e)
    
    try:
        cleaned_data['phone'] = validate_phone(data.get('phone'))
    except ValidationError as e:
        errors['phone'] = str(e)
    
    # If there are any errors, raise ValidationError with all errors
    if errors:
        raise ValidationError(errors)
    
    return cleaned_data

