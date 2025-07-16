"""
Monitoring and alerting utilities for ROI Calculator backend
"""
import logging
import time
import json
import requests
from datetime import datetime
from collections import defaultdict, deque
import threading

# Metrics storage
metrics_storage = {
    'submissions': deque(maxlen=1000),
    'errors': deque(maxlen=1000),
    'email_deliveries': deque(maxlen=1000),
    'hubspot_syncs': deque(maxlen=1000)
}
metrics_lock = threading.Lock()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/roi_calculator.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class SubmissionTracker:
    """Track submission metrics and health"""
    
    def __init__(self):
        self.success_count = 0
        self.error_count = 0
        self.start_time = time.time()
    
    def record_success(self, submission_id, processing_time=None):
        """Record successful submission"""
        with metrics_lock:
            self.success_count += 1
            metrics_storage['submissions'].append({
                'submission_id': submission_id,
                'status': 'success',
                'timestamp': time.time(),
                'processing_time': processing_time
            })
        
        logger.info(f"Submission success: {submission_id}")
    
    def record_error(self, submission_id, error_type, error_message):
        """Record submission error"""
        with metrics_lock:
            self.error_count += 1
            metrics_storage['errors'].append({
                'submission_id': submission_id,
                'error_type': error_type,
                'error_message': error_message,
                'timestamp': time.time()
            })
        
        logger.error(f"Submission error: {submission_id} - {error_type}: {error_message}")
        
        # Send alert for critical errors
        if error_type in ['database_error', 'hubspot_error', 'email_error']:
            self.send_alert(f"Critical Error: {error_type}", {
                'submission_id': submission_id,
                'error': error_message,
                'timestamp': datetime.now().isoformat()
            })
    
    def get_success_rate(self, window_minutes=60):
        """Calculate success rate over time window"""
        current_time = time.time()
        window_seconds = window_minutes * 60
        
        with metrics_lock:
            recent_submissions = [
                s for s in metrics_storage['submissions']
                if current_time - s['timestamp'] <= window_seconds
            ]
            recent_errors = [
                e for e in metrics_storage['errors']
                if current_time - e['timestamp'] <= window_seconds
            ]
        
        total = len(recent_submissions) + len(recent_errors)
        if total == 0:
            return 100.0
        
        return (len(recent_submissions) / total) * 100
    
    def send_alert(self, title, details):
        """Send alert notification"""
        # For now, just log the alert
        # In production, this would send to Slack/email
        logger.critical(f"ALERT: {title} - {json.dumps(details)}")
        
        # Placeholder for Slack webhook
        # self.send_slack_alert(title, details)
    
    def send_slack_alert(self, title, details):
        """Send Slack alert (placeholder)"""
        # This would be implemented with actual Slack webhook
        slack_webhook_url = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
        
        payload = {
            "text": f"🚨 ROI Calculator Alert: {title}",
            "attachments": [{
                "color": "danger",
                "fields": [
                    {"title": key, "value": str(value), "short": True}
                    for key, value in details.items()
                ]
            }]
        }
        
        try:
            # requests.post(slack_webhook_url, json=payload)
            pass  # Disabled for now
        except Exception as e:
            logger.error(f"Failed to send Slack alert: {e}")

class EmailMonitor:
    """Monitor email delivery"""
    
    def record_email_sent(self, submission_id, email_type, recipient):
        """Record email sent"""
        with metrics_lock:
            metrics_storage['email_deliveries'].append({
                'submission_id': submission_id,
                'email_type': email_type,
                'recipient': recipient,
                'status': 'sent',
                'timestamp': time.time()
            })
        
        logger.info(f"Email sent: {email_type} to {recipient} for {submission_id}")
    
    def record_email_error(self, submission_id, email_type, error):
        """Record email error"""
        with metrics_lock:
            metrics_storage['email_deliveries'].append({
                'submission_id': submission_id,
                'email_type': email_type,
                'status': 'error',
                'error': str(error),
                'timestamp': time.time()
            })
        
        logger.error(f"Email error: {email_type} for {submission_id} - {error}")
    
    def get_delivery_rate(self, window_minutes=60):
        """Calculate email delivery rate"""
        current_time = time.time()
        window_seconds = window_minutes * 60
        
        with metrics_lock:
            recent_emails = [
                e for e in metrics_storage['email_deliveries']
                if current_time - e['timestamp'] <= window_seconds
            ]
        
        if not recent_emails:
            return 100.0
        
        successful = len([e for e in recent_emails if e['status'] == 'sent'])
        return (successful / len(recent_emails)) * 100

class HubSpotMonitor:
    """Monitor HubSpot integration"""
    
    def record_sync_success(self, submission_id, operation, hubspot_id):
        """Record successful HubSpot sync"""
        with metrics_lock:
            metrics_storage['hubspot_syncs'].append({
                'submission_id': submission_id,
                'operation': operation,
                'hubspot_id': hubspot_id,
                'status': 'success',
                'timestamp': time.time()
            })
        
        logger.info(f"HubSpot sync success: {operation} for {submission_id} -> {hubspot_id}")
    
    def record_sync_error(self, submission_id, operation, error):
        """Record HubSpot sync error"""
        with metrics_lock:
            metrics_storage['hubspot_syncs'].append({
                'submission_id': submission_id,
                'operation': operation,
                'status': 'error',
                'error': str(error),
                'timestamp': time.time()
            })
        
        logger.error(f"HubSpot sync error: {operation} for {submission_id} - {error}")
    
    def get_sync_rate(self, window_minutes=60):
        """Calculate HubSpot sync success rate"""
        current_time = time.time()
        window_seconds = window_minutes * 60
        
        with metrics_lock:
            recent_syncs = [
                s for s in metrics_storage['hubspot_syncs']
                if current_time - s['timestamp'] <= window_seconds
            ]
        
        if not recent_syncs:
            return 100.0
        
        successful = len([s for s in recent_syncs if s['status'] == 'success'])
        return (successful / len(recent_syncs)) * 100

# Global monitors
submission_tracker = SubmissionTracker()
email_monitor = EmailMonitor()
hubspot_monitor = HubSpotMonitor()

def get_system_health():
    """Get overall system health metrics"""
    return {
        'submission_success_rate': submission_tracker.get_success_rate(),
        'email_delivery_rate': email_monitor.get_delivery_rate(),
        'hubspot_sync_rate': hubspot_monitor.get_sync_rate(),
        'uptime_seconds': time.time() - submission_tracker.start_time,
        'total_submissions': submission_tracker.success_count,
        'total_errors': submission_tracker.error_count,
        'timestamp': datetime.now().isoformat()
    }

def log_submission_event(submission_id, event_type, details=None):
    """Log submission-related events"""
    log_data = {
        'submission_id': submission_id,
        'event_type': event_type,
        'timestamp': datetime.now().isoformat()
    }
    
    if details:
        log_data['details'] = details
    
    logger.info(f"SUBMISSION_EVENT: {json.dumps(log_data)}")

def check_system_health_alerts():
    """Check system health and send alerts if needed"""
    health = get_system_health()
    
    # Alert if success rate drops below 95%
    if health['submission_success_rate'] < 95:
        submission_tracker.send_alert(
            "Low Success Rate",
            {'success_rate': health['submission_success_rate']}
        )
    
    # Alert if email delivery rate drops below 90%
    if health['email_delivery_rate'] < 90:
        submission_tracker.send_alert(
            "Low Email Delivery Rate",
            {'delivery_rate': health['email_delivery_rate']}
        )
    
    # Alert if HubSpot sync rate drops below 95%
    if health['hubspot_sync_rate'] < 95:
        submission_tracker.send_alert(
            "Low HubSpot Sync Rate",
            {'sync_rate': health['hubspot_sync_rate']}
        )

