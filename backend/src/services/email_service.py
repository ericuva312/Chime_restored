"""
Email Service for ROI Calculator
Handles customer confirmation emails and internal notifications via SendGrid
"""

import os
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content
from datetime import datetime
import json

# Load API key from environment
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
FROM_EMAIL = 'hello@chimehq.co'
FROM_NAME = 'ChimeHQ Growth Team'

def send_confirmation_email(submission, projections):
    """
    Send customer confirmation email with ROI projections
    """
    try:
        sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
        
        # Email subject with industry personalization
        subject = f"Your {submission.industry} Growth Potential – Results + Action Plan Inside"
        
        # Generate email content
        html_content = generate_confirmation_email_html(submission, projections)
        plain_content = generate_confirmation_email_plain(submission, projections)
        
        # Create email
        from_email = Email(FROM_EMAIL, FROM_NAME)
        to_email = To(submission.email)
        
        mail = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content,
            plain_text_content=plain_content
        )
        
        # Add UTM tracking to links
        calendar_link = "https://calendly.com/chimehq/strategy-call?utm_source=roi_calculator&utm_medium=email&utm_campaign=confirmation"
        
        # Send email
        response = sg.send(mail)
        
        if response.status_code in [200, 201, 202]:
            print(f"✅ Confirmation email sent to {submission.email}")
            return True
        else:
            print(f"❌ Email send failed: {response.status_code} - {response.body}")
            return False
            
    except Exception as e:
        print(f"❌ Email service error: {e}")
        return False

def send_internal_notification(submission, score_breakdown):
    """
    Send internal notification email to team
    """
    try:
        sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
        
        # Subject with lead tier and score
        subject = f"New ROI Lead · {submission.business_name} · {submission.tier}/{submission.lead_score}"
        
        # Generate internal email content
        html_content = generate_internal_notification_html(submission, score_breakdown)
        plain_content = generate_internal_notification_plain(submission, score_breakdown)
        
        # Create email
        from_email = Email(FROM_EMAIL, FROM_NAME)
        to_email = To(FROM_EMAIL)  # Send to hello@chimehq.co
        
        mail = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content,
            plain_text_content=plain_content
        )
        
        # Send email
        response = sg.send(mail)
        
        if response.status_code in [200, 201, 202]:
            print(f"✅ Internal notification sent for {submission.business_name}")
            return True
        else:
            print(f"❌ Internal notification failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Internal notification error: {e}")
        return False

def generate_confirmation_email_html(submission, projections):
    """Generate HTML content for customer confirmation email"""
    
    expected = projections['expected']
    conservative = projections['conservative']
    optimistic = projections['optimistic']
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Growth Potential Results</title>
        <style>
            body {{ font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; }}
            .header {{ text-align: center; margin-bottom: 30px; }}
            .logo {{ color: #2563eb; font-size: 24px; font-weight: bold; }}
            .greeting {{ font-size: 18px; color: #1f2937; margin-bottom: 20px; }}
            .intro {{ color: #4b5563; line-height: 1.6; margin-bottom: 30px; }}
            .results-section {{ margin: 30px 0; }}
            .results-title {{ font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 20px; text-align: center; }}
            .scenarios {{ display: flex; gap: 20px; margin-bottom: 30px; }}
            .scenario {{ flex: 1; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px; text-align: center; }}
            .scenario.expected {{ border-color: #2563eb; background-color: #eff6ff; }}
            .scenario-title {{ font-weight: bold; color: #1f2937; margin-bottom: 10px; }}
            .scenario-revenue {{ font-size: 24px; font-weight: bold; color: #059669; margin-bottom: 5px; }}
            .scenario-increase {{ color: #059669; font-size: 14px; }}
            .scenario-roi {{ color: #7c3aed; font-weight: bold; margin-top: 10px; }}
            .comparison {{ background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .comparison-title {{ font-weight: bold; margin-bottom: 15px; }}
            .comparison-row {{ display: flex; justify-content: space-between; margin-bottom: 10px; }}
            .cta-section {{ text-align: center; margin: 40px 0; }}
            .cta-button {{ display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }}
            .guarantee {{ background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center; }}
            .footer {{ margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }}
            .signature {{ margin-top: 20px; }}
            @media (max-width: 600px) {{
                .scenarios {{ flex-direction: column; }}
                .comparison-row {{ flex-direction: column; }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Chime</div>
            </div>
            
            <div class="greeting">Hi {submission.first_name},</div>
            
            <div class="intro">
                Thank you for calculating your revenue potential with our ROI calculator. 
                Based on your {submission.industry.lower()} business metrics, here are your personalized growth projections:
            </div>
            
            <div class="results-section">
                <div class="results-title">🎯 Your Projected Results</div>
                
                <div class="scenarios">
                    <div class="scenario">
                        <div class="scenario-title">Conservative</div>
                        <div class="scenario-revenue">${conservative['monthly_revenue']:,.0f}</div>
                        <div class="scenario-increase">+${conservative['monthly_increase']:,.0f}/mo</div>
                        <div class="scenario-roi">{conservative['roi_percentage']}% ROI</div>
                    </div>
                    
                    <div class="scenario expected">
                        <div class="scenario-title">Expected</div>
                        <div class="scenario-revenue">${expected['monthly_revenue']:,.0f}</div>
                        <div class="scenario-increase">+${expected['monthly_increase']:,.0f}/mo</div>
                        <div class="scenario-roi">{expected['roi_percentage']}% ROI</div>
                    </div>
                    
                    <div class="scenario">
                        <div class="scenario-title">Optimistic</div>
                        <div class="scenario-revenue">${optimistic['monthly_revenue']:,.0f}</div>
                        <div class="scenario-increase">+${optimistic['monthly_increase']:,.0f}/mo</div>
                        <div class="scenario-roi">{optimistic['roi_percentage']}% ROI</div>
                    </div>
                </div>
                
                <div class="comparison">
                    <div class="comparison-title">What This Means for {submission.business_name}:</div>
                    <div class="comparison-row">
                        <span>Current Monthly Revenue:</span>
                        <span>${submission.monthly_revenue:,.0f}</span>
                    </div>
                    <div class="comparison-row">
                        <span>Projected Monthly Revenue:</span>
                        <span>${expected['monthly_revenue']:,.0f}</span>
                    </div>
                    <div class="comparison-row">
                        <span>Annual Revenue Increase:</span>
                        <span>${expected['annual_benefit']:,.0f}</span>
                    </div>
                    <div class="comparison-row">
                        <span>Break-even Timeline:</span>
                        <span>{expected['break_even_months']} months</span>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <div style="margin-bottom: 20px;">
                    <strong>⏱ Time-to-Value:</strong> Expect measurable improvements in 30–90 days
                </div>
                <a href="https://calendly.com/chimehq/strategy-call?utm_source=roi_calculator&utm_medium=email&utm_campaign=confirmation" class="cta-button">
                    Book Your Free 30-Minute Strategy Session
                </a>
            </div>
            
            <div class="guarantee">
                <strong>🚀 Our Guarantee:</strong><br>
                15% revenue growth or 25% cost reduction within 90 days—or $1,000 payout. No questions asked.
            </div>
            
            <div class="footer">
                <div><strong>Questions?</strong> Reply to this email—I personally read every message.</div>
                
                <div class="signature">
                    Best regards,<br>
                    <strong>ChimeHQ Growth Team</strong><br>
                    hello@chimehq.co
                </div>
                
                <div style="margin-top: 20px;">
                    <strong>P.S.</strong> Strategy session spots are limited—secure yours now!
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html

def generate_confirmation_email_plain(submission, projections):
    """Generate plain text content for customer confirmation email"""
    
    expected = projections['expected']
    conservative = projections['conservative']
    optimistic = projections['optimistic']
    
    plain = f"""
Hi {submission.first_name},

Thank you for calculating your revenue potential with our ROI calculator.

Based on your {submission.industry.lower()} business metrics, here are your personalized growth projections:

🎯 YOUR PROJECTED RESULTS

Conservative Scenario:
- Monthly Revenue: ${conservative['monthly_revenue']:,.0f}
- Monthly Increase: +${conservative['monthly_increase']:,.0f}
- ROI: {conservative['roi_percentage']}%

Expected Scenario (Most Likely):
- Monthly Revenue: ${expected['monthly_revenue']:,.0f}
- Monthly Increase: +${expected['monthly_increase']:,.0f}
- ROI: {expected['roi_percentage']}%

Optimistic Scenario:
- Monthly Revenue: ${optimistic['monthly_revenue']:,.0f}
- Monthly Increase: +${optimistic['monthly_increase']:,.0f}
- ROI: {optimistic['roi_percentage']}%

WHAT THIS MEANS FOR {submission.business_name.upper()}:
- Current Monthly Revenue: ${submission.monthly_revenue:,.0f}
- Projected Monthly Revenue: ${expected['monthly_revenue']:,.0f}
- Annual Revenue Increase: ${expected['annual_benefit']:,.0f}
- Break-even Timeline: {expected['break_even_months']} months

⏱ Time-to-Value: Expect measurable improvements in 30–90 days

🚀 NEXT STEP: Book Your Free 30-Minute Strategy Session
https://calendly.com/chimehq/strategy-call?utm_source=roi_calculator&utm_medium=email&utm_campaign=confirmation

🚀 OUR GUARANTEE:
15% revenue growth or 25% cost reduction within 90 days—or $1,000 payout. No questions asked.

Questions? Reply to this email—I personally read every message.

Best regards,
ChimeHQ Growth Team
hello@chimehq.co

P.S. Strategy session spots are limited—secure yours now!
    """
    
    return plain

def generate_internal_notification_html(submission, score_breakdown):
    """Generate HTML content for internal notification email"""
    
    challenges = submission.get_challenges_list()
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New ROI Calculator Lead</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .header {{ background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
            .content {{ background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }}
            .section {{ margin-bottom: 20px; }}
            .section-title {{ font-weight: bold; color: #1f2937; margin-bottom: 10px; }}
            .tier-{submission.tier.lower()} {{ background-color: {'#dc2626' if submission.tier == 'Hot' else '#f59e0b' if submission.tier == 'Warm' else '#6b7280'}; color: white; padding: 5px 10px; border-radius: 4px; display: inline-block; }}
            .metrics {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }}
            .metric {{ background-color: white; padding: 10px; border-radius: 4px; }}
            .score-breakdown {{ background-color: white; padding: 15px; border-radius: 4px; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th, td {{ padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New ROI Calculator Lead</h2>
                <div>Score: {submission.lead_score}/150 | Tier: <span class="tier-{submission.tier.lower()}">{submission.tier}</span></div>
            </div>
            
            <div class="content">
                <div class="section">
                    <div class="section-title">Lead Snapshot</div>
                    <div class="metrics">
                        <div class="metric"><strong>Name:</strong> {submission.first_name} {submission.last_name}</div>
                        <div class="metric"><strong>Email:</strong> {submission.email}</div>
                        <div class="metric"><strong>Phone:</strong> {submission.phone or 'Not provided'}</div>
                        <div class="metric"><strong>Business:</strong> {submission.business_name}</div>
                        <div class="metric"><strong>Website:</strong> {submission.website or 'Not provided'}</div>
                        <div class="metric"><strong>Industry:</strong> {submission.industry}</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">Key Metrics</div>
                    <div class="metrics">
                        <div class="metric"><strong>Monthly Revenue:</strong> ${submission.monthly_revenue:,.0f}</div>
                        <div class="metric"><strong>Monthly Orders:</strong> {submission.monthly_orders:,}</div>
                        <div class="metric"><strong>Average Order Value:</strong> ${submission.average_order_value:.2f}</div>
                        <div class="metric"><strong>Conversion Rate:</strong> {submission.conversion_rate}%</div>
                        <div class="metric"><strong>Cart Abandonment:</strong> {submission.cart_abandonment_rate}%</div>
                        <div class="metric"><strong>Ad Spend:</strong> ${submission.monthly_ad_spend or 0:,.0f}/month</div>
                        <div class="metric"><strong>Manual Hours:</strong> {submission.manual_hours_per_week}/week</div>
                        <div class="metric"><strong>Business Stage:</strong> {submission.business_stage}</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">Biggest Challenges</div>
                    <ul>
                        {' '.join([f'<li>{challenge}</li>' for challenge in challenges])}
                    </ul>
                </div>
                
                <div class="section">
                    <div class="section-title">Lead Score Breakdown</div>
                    <div class="score-breakdown">
                        <table>
                            <tr><th>Category</th><th>Score</th><th>Details</th></tr>
                            <tr><td>Demographic</td><td>{score_breakdown['demographic']}/60</td><td>Revenue tier, business stage</td></tr>
                            <tr><td>Behavioral</td><td>{score_breakdown['behavioral']}/52</td><td>Form completion, engagement</td></tr>
                            <tr><td>Fit</td><td>{score_breakdown['fit']}/38</td><td>Industry match, challenge alignment</td></tr>
                            <tr><td><strong>Total</strong></td><td><strong>{submission.lead_score}/150</strong></td><td><strong>Tier: {submission.tier}</strong></td></tr>
                        </table>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">Next Steps</div>
                    <ul>
                        <li>Follow up within: {1 if submission.tier == 'Hot' else 24 if submission.tier == 'Warm' else 72} hours</li>
                        <li>HubSpot Contact: <a href="https://app.hubspot.com/contacts/your-hub-id/contact/{submission.hubspot_contact_id or 'pending'}">View Contact</a></li>
                        <li>Submission Record: <a href="/api/roi-calculator/status/{submission.submission_id}">View Details</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html

def generate_internal_notification_plain(submission, score_breakdown):
    """Generate plain text content for internal notification email"""
    
    challenges = submission.get_challenges_list()
    
    plain = f"""
NEW ROI CALCULATOR LEAD
Score: {submission.lead_score}/150 | Tier: {submission.tier}

LEAD SNAPSHOT:
Name: {submission.first_name} {submission.last_name}
Email: {submission.email}
Phone: {submission.phone or 'Not provided'}
Business: {submission.business_name}
Website: {submission.website or 'Not provided'}
Industry: {submission.industry}

KEY METRICS:
Monthly Revenue: ${submission.monthly_revenue:,.0f}
Monthly Orders: {submission.monthly_orders:,}
Average Order Value: ${submission.average_order_value:.2f}
Conversion Rate: {submission.conversion_rate}%
Cart Abandonment: {submission.cart_abandonment_rate}%
Ad Spend: ${submission.monthly_ad_spend or 0:,.0f}/month
Manual Hours: {submission.manual_hours_per_week}/week
Business Stage: {submission.business_stage}

BIGGEST CHALLENGES:
{chr(10).join([f'- {challenge}' for challenge in challenges])}

LEAD SCORE BREAKDOWN:
Demographic: {score_breakdown['demographic']}/60 (Revenue tier, business stage)
Behavioral: {score_breakdown['behavioral']}/52 (Form completion, engagement)
Fit: {score_breakdown['fit']}/38 (Industry match, challenge alignment)
Total: {submission.lead_score}/150 (Tier: {submission.tier})

NEXT STEPS:
- Follow up within: {1 if submission.tier == 'Hot' else 24 if submission.tier == 'Warm' else 72} hours
- HubSpot Contact: https://app.hubspot.com/contacts/your-hub-id/contact/{submission.hubspot_contact_id or 'pending'}
- Submission Record: /api/roi-calculator/status/{submission.submission_id}
    """
    
    return plain

