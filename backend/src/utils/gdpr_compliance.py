"""
GDPR Compliance Utilities for ROI Calculator
"""
import os
import logging
import json
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from src.models.roi_submission import ROISubmission, db
from src.utils.security import decrypt_sensitive_data, validate_email

logger = logging.getLogger(__name__)

# Create GDPR blueprint
gdpr_bp = Blueprint('gdpr', __name__)

class GDPRCompliance:
    """GDPR compliance management"""
    
    def __init__(self):
        self.data_retention_days = 2555  # 7 years default
        self.consent_required_fields = ['email', 'phone', 'business_name']
    
    def record_consent(self, submission_id, consent_data):
        """Record user consent for data processing"""
        try:
            submission = ROISubmission.query.filter_by(submission_id=submission_id).first()
            if not submission:
                return {'success': False, 'error': 'Submission not found'}
            
            # Update consent fields
            submission.consent_marketing = consent_data.get('marketing', False)
            submission.consent_analytics = consent_data.get('analytics', False)
            submission.consent_timestamp = datetime.utcnow()
            submission.privacy_policy_accepted = consent_data.get('privacy_policy', False)
            
            db.session.commit()
            
            logger.info(f"Consent recorded for submission: {submission_id}")
            return {'success': True}
            
        except Exception as e:
            logger.error(f"Error recording consent: {e}")
            return {'success': False, 'error': str(e)}
    
    def export_user_data(self, email):
        """Export all data for a user (Right to Data Portability)"""
        try:
            if not validate_email(email):
                return {'success': False, 'error': 'Invalid email format'}
            
            # Find all submissions for this email
            submissions = ROISubmission.query.filter_by(email=email).all()
            
            if not submissions:
                return {'success': False, 'error': 'No data found for this email'}
            
            exported_data = {
                'export_date': datetime.utcnow().isoformat(),
                'email': email,
                'submissions': []
            }
            
            for submission in submissions:
                submission_data = {
                    'submission_id': submission.submission_id,
                    'timestamp': submission.timestamp.isoformat(),
                    'business_data': {
                        'monthly_revenue': submission.monthly_revenue,
                        'average_order_value': submission.average_order_value,
                        'monthly_orders': submission.monthly_orders,
                        'industry': submission.industry,
                        'conversion_rate': submission.conversion_rate,
                        'cart_abandonment_rate': submission.cart_abandonment_rate,
                        'manual_hours_per_week': submission.manual_hours_per_week,
                        'business_stage': submission.business_stage,
                        'monthly_ad_spend': submission.monthly_ad_spend,
                        'biggest_challenges': submission.biggest_challenges
                    },
                    'personal_data': {
                        'first_name': submission.first_name,
                        'last_name': submission.last_name,
                        'email': decrypt_sensitive_data(submission.email),
                        'business_name': submission.business_name,
                        'website': submission.website,
                        'phone': decrypt_sensitive_data(submission.phone) if submission.phone else None
                    },
                    'processing_data': {
                        'lead_score': submission.lead_score,
                        'tier': submission.tier,
                        'email_sent': submission.email_sent,
                        'hubspot_synced': submission.hubspot_synced,
                        'hubspot_contact_id': submission.hubspot_contact_id,
                        'hubspot_deal_id': submission.hubspot_deal_id
                    },
                    'consent_data': {
                        'consent_marketing': submission.consent_marketing,
                        'consent_analytics': submission.consent_analytics,
                        'consent_timestamp': submission.consent_timestamp.isoformat() if submission.consent_timestamp else None,
                        'privacy_policy_accepted': submission.privacy_policy_accepted
                    }
                }
                exported_data['submissions'].append(submission_data)
            
            logger.info(f"Data exported for email: {email}")
            return {'success': True, 'data': exported_data}
            
        except Exception as e:
            logger.error(f"Error exporting user data: {e}")
            return {'success': False, 'error': str(e)}
    
    def delete_user_data(self, email, verification_token=None):
        """Delete all data for a user (Right to Erasure)"""
        try:
            if not validate_email(email):
                return {'success': False, 'error': 'Invalid email format'}
            
            # In production, you'd verify the deletion request with a token
            # For now, we'll implement basic deletion
            
            submissions = ROISubmission.query.filter_by(email=email).all()
            
            if not submissions:
                return {'success': False, 'error': 'No data found for this email'}
            
            deleted_count = 0
            for submission in submissions:
                # Log deletion for audit trail
                logger.info(f"Deleting submission: {submission.submission_id} for email: {email}")
                
                db.session.delete(submission)
                deleted_count += 1
            
            db.session.commit()
            
            logger.info(f"Deleted {deleted_count} submissions for email: {email}")
            return {
                'success': True,
                'deleted_submissions': deleted_count,
                'message': f'All data for {email} has been permanently deleted'
            }
            
        except Exception as e:
            logger.error(f"Error deleting user data: {e}")
            db.session.rollback()
            return {'success': False, 'error': str(e)}
    
    def cleanup_expired_data(self):
        """Clean up data that has exceeded retention period"""
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=self.data_retention_days)
            
            expired_submissions = ROISubmission.query.filter(
                ROISubmission.timestamp < cutoff_date
            ).all()
            
            deleted_count = 0
            for submission in expired_submissions:
                logger.info(f"Auto-deleting expired submission: {submission.submission_id}")
                db.session.delete(submission)
                deleted_count += 1
            
            db.session.commit()
            
            logger.info(f"Auto-deleted {deleted_count} expired submissions")
            return {
                'success': True,
                'deleted_count': deleted_count,
                'cutoff_date': cutoff_date.isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up expired data: {e}")
            db.session.rollback()
            return {'success': False, 'error': str(e)}
    
    def update_consent(self, email, consent_updates):
        """Update consent preferences for a user"""
        try:
            if not validate_email(email):
                return {'success': False, 'error': 'Invalid email format'}
            
            submissions = ROISubmission.query.filter_by(email=email).all()
            
            if not submissions:
                return {'success': False, 'error': 'No data found for this email'}
            
            updated_count = 0
            for submission in submissions:
                if 'marketing' in consent_updates:
                    submission.consent_marketing = consent_updates['marketing']
                if 'analytics' in consent_updates:
                    submission.consent_analytics = consent_updates['analytics']
                
                submission.consent_timestamp = datetime.utcnow()
                updated_count += 1
            
            db.session.commit()
            
            logger.info(f"Updated consent for {updated_count} submissions for email: {email}")
            return {
                'success': True,
                'updated_submissions': updated_count,
                'consent_updates': consent_updates
            }
            
        except Exception as e:
            logger.error(f"Error updating consent: {e}")
            db.session.rollback()
            return {'success': False, 'error': str(e)}

# Global GDPR compliance instance
gdpr_compliance = GDPRCompliance()

# GDPR API endpoints
@gdpr_bp.route('/export-data', methods=['POST'])
def export_user_data():
    """Export user data endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        result = gdpr_compliance.export_user_data(email)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"Export data endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@gdpr_bp.route('/delete-data', methods=['POST'])
def delete_user_data():
    """Delete user data endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        verification_token = data.get('verification_token')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        result = gdpr_compliance.delete_user_data(email, verification_token)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"Delete data endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@gdpr_bp.route('/update-consent', methods=['POST'])
def update_consent():
    """Update consent preferences endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        consent_updates = data.get('consent_updates', {})
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        result = gdpr_compliance.update_consent(email, consent_updates)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"Update consent endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@gdpr_bp.route('/privacy-policy', methods=['GET'])
def privacy_policy():
    """Privacy policy endpoint"""
    policy = {
        'last_updated': '2024-07-16',
        'data_controller': 'Chime HQ',
        'contact_email': 'hello@chimehq.co',
        'data_retention_period': f'{gdpr_compliance.data_retention_days} days',
        'data_processing_purposes': [
            'ROI calculation and analysis',
            'Lead scoring and qualification',
            'Email communication and follow-up',
            'CRM integration and sales process',
            'Service improvement and analytics'
        ],
        'user_rights': [
            'Right to access your data',
            'Right to rectify incorrect data',
            'Right to erase your data',
            'Right to restrict processing',
            'Right to data portability',
            'Right to object to processing',
            'Right to withdraw consent'
        ],
        'data_categories': [
            'Contact information (name, email, phone)',
            'Business information (company, website, industry)',
            'Financial data (revenue, orders, ad spend)',
            'Behavioral data (conversion rates, challenges)',
            'Technical data (IP address, browser info)'
        ]
    }
    
    return jsonify(policy), 200

def get_gdpr_compliance():
    """Get the global GDPR compliance instance"""
    return gdpr_compliance

