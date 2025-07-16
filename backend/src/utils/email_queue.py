"""
Email Queue System for Async Processing
"""
import json
import logging
import time
import threading
from datetime import datetime, timedelta
from collections import deque
import os

logger = logging.getLogger(__name__)

class EmailQueue:
    """Simple in-memory email queue with retry logic"""
    
    def __init__(self, max_retries=3, retry_delay=60):
        self.queue = deque()
        self.processing = False
        self.max_retries = max_retries
        self.retry_delay = retry_delay
        self.failed_queue = deque()
        self.processed_count = 0
        self.failed_count = 0
        self.lock = threading.Lock()
        
        # Start background processor
        self.processor_thread = threading.Thread(target=self._process_queue, daemon=True)
        self.processor_thread.start()
    
    def enqueue_email(self, email_type, recipient, subject, html_content, text_content, 
                     submission_id=None, priority='normal', metadata=None):
        """Add email to queue"""
        email_item = {
            'id': f"{int(time.time() * 1000)}_{submission_id or 'unknown'}",
            'type': email_type,
            'recipient': recipient,
            'subject': subject,
            'html_content': html_content,
            'text_content': text_content,
            'submission_id': submission_id,
            'priority': priority,
            'metadata': metadata or {},
            'attempts': 0,
            'created_at': datetime.now().isoformat(),
            'scheduled_for': datetime.now().isoformat()
        }
        
        with self.lock:
            if priority == 'high':
                self.queue.appendleft(email_item)
            else:
                self.queue.append(email_item)
        
        logger.info(f"Enqueued email: {email_type} to {recipient} (ID: {email_item['id']})")
        return email_item['id']
    
    def enqueue_confirmation_email(self, submission, form_data):
        """Enqueue customer confirmation email"""
        from src.services.email_service_compliant import EmailServiceCompliant
        
        email_service = EmailServiceCompliant()
        
        # Generate unsubscribe link
        unsubscribe_link = f"https://chimehq.co/unsubscribe?email={form_data['email']}&id={submission.submission_id}"
        
        # Create content
        html_content = email_service._create_confirmation_html(submission, form_data, unsubscribe_link)
        text_content = email_service._create_confirmation_text(submission, form_data, unsubscribe_link)
        
        return self.enqueue_email(
            email_type='confirmation',
            recipient=form_data['email'],
            subject=f"Your ROI Analysis Results - {form_data['first_name']}",
            html_content=html_content,
            text_content=text_content,
            submission_id=submission.submission_id,
            priority='high',
            metadata={
                'first_name': form_data['first_name'],
                'business_name': form_data['business_name'],
                'tier': submission.tier
            }
        )
    
    def enqueue_internal_notification(self, submission, form_data):
        """Enqueue internal notification email"""
        from src.services.email_service_compliant import EmailServiceCompliant
        
        email_service = EmailServiceCompliant()
        
        # Create content
        html_content = email_service._create_internal_html(submission, form_data)
        text_content = email_service._create_internal_text(submission, form_data)
        
        return self.enqueue_email(
            email_type='internal',
            recipient='hello@chimehq.co',
            subject=f"🚨 New ROI Calculator Lead - {submission.tier} Tier ({submission.lead_score}/150)",
            html_content=html_content,
            text_content=text_content,
            submission_id=submission.submission_id,
            priority='high',
            metadata={
                'tier': submission.tier,
                'lead_score': submission.lead_score,
                'business_name': form_data['business_name']
            }
        )
    
    def _process_queue(self):
        """Background queue processor"""
        logger.info("Email queue processor started")
        
        while True:
            try:
                if not self.queue:
                    time.sleep(5)  # Check every 5 seconds
                    continue
                
                with self.lock:
                    if self.queue:
                        email_item = self.queue.popleft()
                    else:
                        continue
                
                # Check if email is scheduled for future
                scheduled_time = datetime.fromisoformat(email_item['scheduled_for'])
                if datetime.now() < scheduled_time:
                    # Put back in queue for later
                    with self.lock:
                        self.queue.appendleft(email_item)
                    time.sleep(10)
                    continue
                
                # Process email
                success = self._send_email(email_item)
                
                if success:
                    self.processed_count += 1
                    logger.info(f"Successfully sent email: {email_item['id']}")
                else:
                    email_item['attempts'] += 1
                    
                    if email_item['attempts'] < self.max_retries:
                        # Schedule retry
                        retry_time = datetime.now() + timedelta(seconds=self.retry_delay * email_item['attempts'])
                        email_item['scheduled_for'] = retry_time.isoformat()
                        
                        with self.lock:
                            self.queue.append(email_item)
                        
                        logger.warning(f"Email failed, scheduled for retry: {email_item['id']} (attempt {email_item['attempts']})")
                    else:
                        # Max retries exceeded
                        self.failed_count += 1
                        self.failed_queue.append(email_item)
                        logger.error(f"Email failed permanently: {email_item['id']}")
                
                # Rate limiting
                time.sleep(1)
                
            except Exception as e:
                logger.error(f"Queue processor error: {e}")
                time.sleep(5)
    
    def _send_email(self, email_item):
        """Send individual email"""
        try:
            from sendgrid import SendGridAPIClient
            from sendgrid.helpers.mail import Mail, Email, To
            
            sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
            from_email = Email("hello@chimehq.co", "Chime ROI Calculator")
            
            mail = Mail(
                from_email=from_email,
                to_emails=To(email_item['recipient']),
                subject=email_item['subject'],
                html_content=email_item['html_content'],
                plain_text_content=email_item['text_content']
            )
            
            # Add custom args for tracking
            mail.custom_args = {
                'email_id': email_item['id'],
                'submission_id': email_item['submission_id'] or '',
                'email_type': email_item['type'],
                'attempt': str(email_item['attempts'] + 1)
            }
            
            response = sg.send(mail)
            
            if response.status_code in [200, 201, 202]:
                # Log success
                self._log_email_event(email_item, 'sent', response.status_code)
                return True
            else:
                # Log failure
                self._log_email_event(email_item, 'failed', response.status_code)
                return False
                
        except Exception as e:
            logger.error(f"Email send error: {e}")
            self._log_email_event(email_item, 'error', str(e))
            return False
    
    def _log_email_event(self, email_item, status, details):
        """Log email events for monitoring"""
        log_entry = {
            'email_id': email_item['id'],
            'submission_id': email_item['submission_id'],
            'type': email_item['type'],
            'recipient': email_item['recipient'],
            'status': status,
            'details': details,
            'attempt': email_item['attempts'] + 1,
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"EMAIL_EVENT: {json.dumps(log_entry)}")
    
    def get_queue_status(self):
        """Get queue status information"""
        with self.lock:
            return {
                'pending_emails': len(self.queue),
                'failed_emails': len(self.failed_queue),
                'processed_count': self.processed_count,
                'failed_count': self.failed_count,
                'processor_active': self.processor_thread.is_alive()
            }
    
    def get_failed_emails(self):
        """Get list of failed emails"""
        return list(self.failed_queue)
    
    def retry_failed_email(self, email_id):
        """Retry a specific failed email"""
        for i, email_item in enumerate(self.failed_queue):
            if email_item['id'] == email_id:
                # Reset attempts and reschedule
                email_item['attempts'] = 0
                email_item['scheduled_for'] = datetime.now().isoformat()
                
                # Move back to main queue
                failed_email = list(self.failed_queue)[i]
                del self.failed_queue[i]
                
                with self.lock:
                    self.queue.appendleft(failed_email)
                
                logger.info(f"Retrying failed email: {email_id}")
                return True
        
        return False
    
    def clear_failed_queue(self):
        """Clear the failed email queue"""
        cleared_count = len(self.failed_queue)
        self.failed_queue.clear()
        logger.info(f"Cleared {cleared_count} failed emails")
        return cleared_count

# Global email queue instance
email_queue = EmailQueue()

def get_email_queue():
    """Get the global email queue instance"""
    return email_queue

