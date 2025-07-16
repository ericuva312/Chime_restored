"""
Email Service for ROI Calculator with Compliance and Retry Logic
"""
import os
import logging
import time
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content, Attachment, FileContent, FileName, FileType, Disposition
from datetime import datetime
import json

logger = logging.getLogger(__name__)

class EmailServiceCompliant:
    def __init__(self):
        self.api_key = os.getenv('SENDGRID_API_KEY')
        if not self.api_key:
            logger.warning("SENDGRID_API_KEY not found in environment variables")
            self.enabled = False
            self.sg = None
        else:
            self.enabled = True
            self.sg = SendGridAPIClient(api_key=self.api_key)
            
        self.from_email = Email("hello@chimehq.co", "Chime ROI Calculator")
        self.max_retries = 3
        self.retry_delay = 2  # seconds
    
    def send_confirmation_email(self, submission, form_data):
        """Send customer confirmation email with compliance features"""
        if not self.enabled:
            logger.warning("Email service disabled - missing API key")
            return {
                'success': False,
                'error': 'Email service not configured'
            }
        
        try:
            # Create personalized subject
            subject = f"Your ROI Analysis Results - {form_data['first_name']}"
            
            # Generate unsubscribe link
            unsubscribe_link = f"https://chimehq.co/unsubscribe?email={form_data['email']}&id={submission.submission_id}"
            
            # Create HTML content with compliance footer
            html_content = self._create_confirmation_html(submission, form_data, unsubscribe_link)
            
            # Create plain text version
            text_content = self._create_confirmation_text(submission, form_data, unsubscribe_link)
            
            # Create email
            mail = Mail(
                from_email=self.from_email,
                to_emails=To(form_data['email'], f"{form_data['first_name']} {form_data['last_name']}"),
                subject=subject,
                html_content=html_content,
                plain_text_content=text_content
            )
            
            # Add compliance headers
            mail.custom_args = {
                'submission_id': submission.submission_id,
                'email_type': 'confirmation',
                'lead_tier': submission.tier
            }
            
            # Send with retry logic
            return self._send_with_retry(mail, 'confirmation', form_data['email'])
            
        except Exception as e:
            logger.error(f"Error creating confirmation email: {e}")
            return {'success': False, 'error': str(e)}
    
    def send_internal_notification(self, submission, form_data):
        """Send internal notification email"""
        try:
            subject = f"🚨 New ROI Calculator Lead - {submission.tier} Tier ({submission.lead_score}/150)"
            
            html_content = self._create_internal_html(submission, form_data)
            text_content = self._create_internal_text(submission, form_data)
            
            mail = Mail(
                from_email=self.from_email,
                to_emails=To("hello@chimehq.co", "Chime Team"),
                subject=subject,
                html_content=html_content,
                plain_text_content=text_content
            )
            
            mail.custom_args = {
                'submission_id': submission.submission_id,
                'email_type': 'internal',
                'lead_tier': submission.tier,
                'lead_score': str(submission.lead_score)
            }
            
            return self._send_with_retry(mail, 'internal', 'hello@chimehq.co')
            
        except Exception as e:
            logger.error(f"Error creating internal notification: {e}")
            return {'success': False, 'error': str(e)}
    
    def _send_with_retry(self, mail, email_type, recipient):
        """Send email with retry logic"""
        for attempt in range(self.max_retries):
            try:
                response = self.sg.send(mail)
                
                if response.status_code in [200, 201, 202]:
                    logger.info(f"Email sent successfully: {email_type} to {recipient} (attempt {attempt + 1})")
                    return {
                        'success': True,
                        'status_code': response.status_code,
                        'attempt': attempt + 1
                    }
                else:
                    logger.warning(f"Email send failed: {email_type} to {recipient} - Status: {response.status_code}")
                    
            except Exception as e:
                logger.error(f"Email send error (attempt {attempt + 1}): {e}")
                
                if attempt < self.max_retries - 1:
                    time.sleep(self.retry_delay * (attempt + 1))  # Exponential backoff
                else:
                    return {'success': False, 'error': str(e), 'attempts': attempt + 1}
        
        return {'success': False, 'error': 'Max retries exceeded', 'attempts': self.max_retries}
    
    def _create_confirmation_html(self, submission, form_data, unsubscribe_link):
        """Create HTML confirmation email with compliance footer"""
        # Calculate projections
        monthly_revenue = float(form_data['monthly_revenue'])
        projections = {
            'conservative': {
                'monthly_revenue': monthly_revenue * 1.10,
                'monthly_increase': monthly_revenue * 0.10,
                'annual_benefit': monthly_revenue * 0.10 * 12,
                'roi_percentage': 150
            },
            'expected': {
                'monthly_revenue': monthly_revenue * 1.30,
                'monthly_increase': monthly_revenue * 0.30,
                'annual_benefit': monthly_revenue * 0.30 * 12,
                'roi_percentage': 400
            },
            'optimistic': {
                'monthly_revenue': monthly_revenue * 1.50,
                'monthly_increase': monthly_revenue * 0.50,
                'annual_benefit': monthly_revenue * 0.50 * 12,
                'roi_percentage': 700
            }
        }
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your ROI Analysis Results</title>
            <style>
                body {{ font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }}
                .container {{ max-width: 600px; margin: 0 auto; background-color: white; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }}
                .content {{ padding: 40px 30px; }}
                .projections {{ display: flex; gap: 20px; margin: 30px 0; }}
                .projection-card {{ flex: 1; background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; border: 2px solid #e9ecef; }}
                .projection-card.expected {{ border-color: #667eea; background: #f0f2ff; }}
                .cta-button {{ display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }}
                .guarantee {{ background: #e8f5e8; border-left: 4px solid #28a745; padding: 20px; margin: 30px 0; }}
                .footer {{ background: #f8f9fa; padding: 30px; font-size: 12px; color: #666; border-top: 1px solid #e9ecef; }}
                .footer a {{ color: #667eea; text-decoration: none; }}
                @media (max-width: 600px) {{
                    .projections {{ flex-direction: column; }}
                    .content {{ padding: 20px; }}
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 Your Growth Potential Revealed</h1>
                    <p>Hi {form_data['first_name']}, here's your personalized ROI analysis</p>
                </div>
                
                <div class="content">
                    <p>Thank you for using our ROI Calculator! Based on your {form_data['industry']} business generating <strong>${monthly_revenue:,.0f}/month</strong>, here are your growth projections:</p>
                    
                    <div class="projections">
                        <div class="projection-card">
                            <h3>Conservative</h3>
                            <div style="font-size: 24px; font-weight: bold; color: #28a745;">${projections['conservative']['monthly_revenue']:,.0f}</div>
                            <div>Monthly Revenue</div>
                            <div style="margin-top: 10px; color: #666;">+${projections['conservative']['monthly_increase']:,.0f}/month</div>
                        </div>
                        
                        <div class="projection-card expected">
                            <h3>Expected ⭐</h3>
                            <div style="font-size: 24px; font-weight: bold; color: #667eea;">${projections['expected']['monthly_revenue']:,.0f}</div>
                            <div>Monthly Revenue</div>
                            <div style="margin-top: 10px; color: #666;">+${projections['expected']['monthly_increase']:,.0f}/month</div>
                        </div>
                        
                        <div class="projection-card">
                            <h3>Optimistic</h3>
                            <div style="font-size: 24px; font-weight: bold; color: #dc3545;">${projections['optimistic']['monthly_revenue']:,.0f}</div>
                            <div>Monthly Revenue</div>
                            <div style="margin-top: 10px; color: #666;">+${projections['optimistic']['monthly_increase']:,.0f}/month</div>
                        </div>
                    </div>
                    
                    <div class="guarantee">
                        <h3>🛡️ Our Growth Guarantee</h3>
                        <p>We're so confident in our ability to grow your business that we guarantee at least <strong>15% revenue growth within 90 days</strong> or we'll pay you $1,000.</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="https://calendly.com/chimehq/roi-consultation?utm_source=email&utm_medium=confirmation&utm_campaign=roi_calculator" class="cta-button">
                            📅 Book Your Strategy Call
                        </a>
                    </div>
                    
                    <p>Your lead score: <strong>{submission.lead_score}/150</strong> ({submission.tier} Priority)</p>
                    <p>Our team will reach out within <strong>{self._get_follow_up_time(submission.tier)}</strong> to discuss your growth strategy.</p>
                    
                    <p>Best regards,<br>
                    The Chime Team<br>
                    <em>P.S. The businesses that act fastest see the biggest results. Don't wait!</em></p>
                </div>
                
                <div class="footer">
                    <p><strong>Chime HQ</strong><br>
                    123 Business Street, Suite 100<br>
                    Business City, BC 12345</p>
                    
                    <p>
                        <a href="https://chimehq.co/privacy">Privacy Policy</a> | 
                        <a href="{unsubscribe_link}">Unsubscribe</a> | 
                        <a href="mailto:hello@chimehq.co">Contact Us</a>
                    </p>
                    
                    <p>This email was sent to {form_data['email']} because you requested an ROI analysis from chimehq.co. 
                    If you no longer wish to receive these emails, you can <a href="{unsubscribe_link}">unsubscribe here</a>.</p>
                    
                    <p>© 2024 Chime HQ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
    
    def _create_confirmation_text(self, submission, form_data, unsubscribe_link):
        """Create plain text confirmation email"""
        monthly_revenue = float(form_data['monthly_revenue'])
        projections = {
            'conservative': monthly_revenue * 1.10,
            'expected': monthly_revenue * 1.30,
            'optimistic': monthly_revenue * 1.50
        }
        
        return f"""
Your Growth Potential Revealed

Hi {form_data['first_name']},

Thank you for using our ROI Calculator! Based on your {form_data['industry']} business generating ${monthly_revenue:,.0f}/month, here are your growth projections:

CONSERVATIVE: ${projections['conservative']:,.0f}/month
EXPECTED: ${projections['expected']:,.0f}/month  
OPTIMISTIC: ${projections['optimistic']:,.0f}/month

Our Growth Guarantee:
We guarantee at least 15% revenue growth within 90 days or we'll pay you $1,000.

Your lead score: {submission.lead_score}/150 ({submission.tier} Priority)
Our team will reach out within {self._get_follow_up_time(submission.tier)} to discuss your growth strategy.

Book your strategy call: https://calendly.com/chimehq/roi-consultation

Best regards,
The Chime Team

P.S. The businesses that act fastest see the biggest results. Don't wait!

---
Chime HQ
123 Business Street, Suite 100
Business City, BC 12345

Privacy Policy: https://chimehq.co/privacy
Unsubscribe: {unsubscribe_link}
Contact: hello@chimehq.co

This email was sent to {form_data['email']} because you requested an ROI analysis from chimehq.co.
© 2024 Chime HQ. All rights reserved.
        """
    
    def _create_internal_html(self, submission, form_data):
        """Create internal notification HTML"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New ROI Calculator Lead</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; }}
                .header {{ background: #667eea; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .lead-info {{ background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }}
                .tier-hot {{ border-left: 4px solid #dc3545; }}
                .tier-warm {{ border-left: 4px solid #ffc107; }}
                .tier-cold {{ border-left: 4px solid #6c757d; }}
                .metrics {{ display: flex; gap: 20px; margin: 20px 0; }}
                .metric {{ flex: 1; text-align: center; background: #e9ecef; padding: 15px; border-radius: 5px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚨 New ROI Calculator Lead</h1>
                    <h2>{submission.tier} Priority - Score: {submission.lead_score}/150</h2>
                </div>
                
                <div class="content">
                    <div class="lead-info tier-{submission.tier.lower()}">
                        <h3>Contact Information</h3>
                        <p><strong>Name:</strong> {form_data['first_name']} {form_data['last_name']}</p>
                        <p><strong>Email:</strong> {form_data['email']}</p>
                        <p><strong>Company:</strong> {form_data['business_name']}</p>
                        <p><strong>Website:</strong> {form_data.get('website', 'Not provided')}</p>
                        <p><strong>Phone:</strong> {form_data.get('phone', 'Not provided')}</p>
                    </div>
                    
                    <div class="metrics">
                        <div class="metric">
                            <div style="font-size: 24px; font-weight: bold;">${float(form_data['monthly_revenue']):,.0f}</div>
                            <div>Monthly Revenue</div>
                        </div>
                        <div class="metric">
                            <div style="font-size: 24px; font-weight: bold;">{int(form_data['monthly_orders'])}</div>
                            <div>Monthly Orders</div>
                        </div>
                        <div class="metric">
                            <div style="font-size: 24px; font-weight: bold;">${float(form_data['average_order_value']):,.0f}</div>
                            <div>Average Order Value</div>
                        </div>
                    </div>
                    
                    <div class="lead-info">
                        <h3>Business Details</h3>
                        <p><strong>Industry:</strong> {form_data['industry']}</p>
                        <p><strong>Business Stage:</strong> {form_data['business_stage']}</p>
                        <p><strong>Conversion Rate:</strong> {form_data['conversion_rate']}%</p>
                        <p><strong>Cart Abandonment:</strong> {form_data['cart_abandonment_rate']}%</p>
                        <p><strong>Manual Hours/Week:</strong> {form_data['manual_hours_per_week']}</p>
                        <p><strong>Monthly Ad Spend:</strong> ${float(form_data.get('monthly_ad_spend', 0)):,.0f}</p>
                        <p><strong>Biggest Challenges:</strong> {form_data.get('biggest_challenges', 'Not specified')}</p>
                    </div>
                    
                    <div class="lead-info">
                        <h3>Next Steps</h3>
                        <p><strong>Follow-up Timeline:</strong> {self._get_follow_up_time(submission.tier)}</p>
                        <p><strong>HubSpot Contact ID:</strong> {submission.hubspot_contact_id or 'Pending'}</p>
                        <p><strong>HubSpot Deal ID:</strong> {submission.hubspot_deal_id or 'Pending'}</p>
                        <p><strong>Submission ID:</strong> {submission.submission_id}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
    
    def _create_internal_text(self, submission, form_data):
        """Create internal notification text"""
        return f"""
New ROI Calculator Lead - {submission.tier} Priority

Lead Score: {submission.lead_score}/150

CONTACT INFORMATION:
Name: {form_data['first_name']} {form_data['last_name']}
Email: {form_data['email']}
Company: {form_data['business_name']}
Website: {form_data.get('website', 'Not provided')}
Phone: {form_data.get('phone', 'Not provided')}

BUSINESS METRICS:
Monthly Revenue: ${float(form_data['monthly_revenue']):,.0f}
Monthly Orders: {int(form_data['monthly_orders'])}
Average Order Value: ${float(form_data['average_order_value']):,.0f}
Industry: {form_data['industry']}
Business Stage: {form_data['business_stage']}
Conversion Rate: {form_data['conversion_rate']}%
Cart Abandonment: {form_data['cart_abandonment_rate']}%
Manual Hours/Week: {form_data['manual_hours_per_week']}
Monthly Ad Spend: ${float(form_data.get('monthly_ad_spend', 0)):,.0f}

CHALLENGES: {form_data.get('biggest_challenges', 'Not specified')}

NEXT STEPS:
Follow-up Timeline: {self._get_follow_up_time(submission.tier)}
HubSpot Contact ID: {submission.hubspot_contact_id or 'Pending'}
HubSpot Deal ID: {submission.hubspot_deal_id or 'Pending'}
Submission ID: {submission.submission_id}
        """
    
    def _get_follow_up_time(self, tier):
        """Get follow-up time based on tier"""
        times = {'Hot': '1 hour', 'Warm': '24 hours', 'Cold': '3 days'}
        return times.get(tier, '24 hours')

