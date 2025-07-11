// Email Templates for Chime Payment Success Workflow

const generateConfirmationEmail = (customer, plan, amount, sessionId) => {
  const planDetails = {
    growth: {
      name: 'Growth',
      price: '$2,997',
      guarantee: '15%',
      monthlyFee: '$997'
    },
    professional: {
      name: 'Professional', 
      price: '$4,997',
      guarantee: '20%',
      monthlyFee: '$1,497'
    },
    enterprise: {
      name: 'Enterprise',
      price: '$9,997', 
      guarantee: '25%',
      monthlyFee: '$2,997'
    }
  };

  const currentPlan = planDetails[plan] || planDetails.professional;

  return {
    subject: `Payment Confirmed - Welcome to Chime ${currentPlan.name} Plan!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - Chime</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e293b, #3b82f6); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Chime</h1>
            <h2 style="color: #ffffff; margin: 15px 0 0 0; font-size: 24px; font-weight: normal;">Payment Confirmed!</h2>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">Hi ${customer.name},</h3>
            
            <p style="color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
              Thank you for choosing Chime! Your payment has been successfully processed and your ${currentPlan.name} plan is now active.
            </p>
            
            <!-- Order Details Card -->
            <div style="background: #f1f5f9; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Order Details</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Plan:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${currentPlan.name} Plan</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Amount Paid:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">$${amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Payment Method:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">Credit Card (Stripe)</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Store URL:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.website}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Order ID:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">#${sessionId.slice(-8).toUpperCase()}</td>
                </tr>
              </table>
            </div>
            
            <!-- What's Next Card -->
            <div style="background: #dbeafe; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What Happens Next?</h4>
              <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                <li style="margin-bottom: 8px;">Our implementation team will contact you within 24 hours</li>
                <li style="margin-bottom: 8px;">We'll schedule your onboarding call and begin setup</li>
                <li style="margin-bottom: 8px;">Your AI automation will be live within 48 hours</li>
                <li style="margin-bottom: 8px;">Monthly billing (${currentPlan.monthlyFee}/month) starts after implementation</li>
              </ul>
            </div>
            
            <!-- Guarantee Card -->
            <div style="background: #dcfce7; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">90-Day Money-Back Guarantee</h4>
              <p style="color: #166534; margin: 0; line-height: 1.6;">
                If we don't deliver the promised ${currentPlan.guarantee} revenue growth within 90 days, you get your money back. No questions asked.
              </p>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin: 25px 0 0 0;">
              If you have any questions, please don't hesitate to reach out to our team at 
              <a href="mailto:hello@chime.co" style="color: #3b82f6; text-decoration: none;">hello@chime.co</a>
            </p>
            
            <p style="color: #475569; line-height: 1.6; margin: 25px 0 0 0;">
              Best regards,<br>
              <strong>The Chime Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; padding: 30px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Questions? Contact us at <a href="mailto:hello@chime.co" style="color: #60a5fa;">hello@chime.co</a>
            </p>
            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
              © 2025 Chime. All rights reserved. | SOC 2 Certified | 99.9% Uptime Guarantee
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `
  };
};

const generateWelcomeEmail = (customer, plan, amount) => {
  const planDetails = {
    growth: {
      name: 'Growth',
      guarantee: '15%',
      features: [
        '15% minimum revenue growth guarantee',
        '48-hour implementation',
        '90-day money-back guarantee', 
        '24/7 support',
        'Dedicated success manager',
        'AI-powered cart recovery',
        'Email automation setup',
        'Basic analytics dashboard'
      ]
    },
    professional: {
      name: 'Professional',
      guarantee: '20%', 
      features: [
        '20% minimum revenue growth guarantee',
        '48-hour implementation',
        '90-day money-back guarantee',
        '24/7 priority support',
        'Dedicated success manager',
        'Free monthly optimization',
        'Advanced AI analytics dashboard',
        'Custom automation workflows',
        'Performance monitoring & alerts'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      guarantee: '25%',
      features: [
        '25% minimum revenue growth guarantee',
        '24-hour implementation',
        '90-day money-back guarantee',
        'White-glove support',
        'Dedicated success team',
        'Weekly optimization calls',
        'Custom integrations',
        'Advanced reporting suite',
        'Priority feature requests'
      ]
    }
  };

  const currentPlan = planDetails[plan] || planDetails.professional;

  return {
    subject: `Welcome to Chime! Your ${currentPlan.name} Plan Implementation Guide`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Chime - Implementation Guide</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e293b, #3b82f6); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Chime</h1>
            <h2 style="color: #ffffff; margin: 15px 0 0 0; font-size: 24px; font-weight: normal;">Welcome to Your Growth Journey!</h2>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">Welcome ${customer.name}!</h3>
            
            <p style="color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
              We're excited to help ${customer.company} achieve guaranteed ${currentPlan.guarantee} revenue growth through our AI-powered automation platform.
            </p>
            
            <!-- Implementation Timeline -->
            <div style="background: #f1f5f9; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">Implementation Timeline</h4>
              
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <div style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 15px;">1</div>
                  <div>
                    <strong style="color: #1e293b;">Day 1-2: Setup & Integration</strong>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Our team connects with your Shopify store and begins AI integration setup.</p>
                  </div>
                </div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <div style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 15px;">2</div>
                  <div>
                    <strong style="color: #1e293b;">Day 3-7: Optimization</strong>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">AI algorithms analyze your data and implement personalized customer journeys.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 15px;">3</div>
                  <div>
                    <strong style="color: #1e293b;">Day 8-30: Growth Phase</strong>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Watch your revenue grow as our AI continuously optimizes your store performance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- What's Included -->
            <div style="background: #dbeafe; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Your ${currentPlan.name} Plan Includes:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                ${currentPlan.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
              </ul>
            </div>
            
            <!-- Next Steps -->
            <div style="background: #fef3c7; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">Immediate Next Steps</h4>
              <ol style="margin: 0; padding-left: 20px; color: #92400e;">
                <li style="margin-bottom: 8px;">Check your email for our implementation team's contact within 24 hours</li>
                <li style="margin-bottom: 8px;">Prepare your Shopify admin access credentials for our team</li>
                <li style="margin-bottom: 8px;">Review your current email marketing and automation tools</li>
                <li style="margin-bottom: 8px;">Gather any specific business goals or priorities you'd like to discuss</li>
              </ol>
            </div>
            
            <!-- Contact Information -->
            <div style="background: #f3f4f6; border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h4 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Your Success Team</h4>
              <p style="color: #6b7280; margin: 0 0 15px 0; line-height: 1.6;">
                <strong>Eric Uva</strong> - Founder & Managing Partner<br>
                25+ years of experience in enterprise transformation and AI automation<br>
                Harvard University & MIT educated
              </p>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Questions or need immediate assistance?<br>
                Email: <a href="mailto:hello@chime.co" style="color: #3b82f6;">hello@chime.co</a>
              </p>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin: 25px 0 0 0;">
              We're committed to your success and look forward to delivering exceptional results for ${customer.company}.
            </p>
            
            <p style="color: #475569; line-height: 1.6; margin: 25px 0 0 0;">
              Welcome to the Chime family!<br>
              <strong>The Chime Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; padding: 30px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Questions? Contact us at <a href="mailto:hello@chime.co" style="color: #60a5fa;">hello@chime.co</a>
            </p>
            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
              © 2025 Chime. All rights reserved. | SOC 2 Certified | 99.9% Uptime Guarantee
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `
  };
};

const generateChimeNotificationEmail = (customer, plan, amount, sessionId) => {
  const planDetails = {
    growth: { name: 'Growth', price: '$2,997', guarantee: '15%' },
    professional: { name: 'Professional', price: '$4,997', guarantee: '20%' },
    enterprise: { name: 'Enterprise', price: '$9,997', guarantee: '25%' }
  };

  const currentPlan = planDetails[plan] || planDetails.professional;

  return {
    subject: `🚀 New Customer Onboarding - ${customer.company} (${currentPlan.name} Plan)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Customer Onboarding - Chime</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e293b, #3b82f6); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">New Customer Alert</h1>
            <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 16px;">Payment successful - Ready for onboarding</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">New ${currentPlan.name} Plan Customer</h3>
            
            <!-- Customer Details -->
            <div style="background: #f1f5f9; border-radius: 12px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Customer Information</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 30%;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Store URL:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer.website}</td>
                </tr>
              </table>
            </div>
            
            <!-- Order Details -->
            <div style="background: #dbeafe; border-radius: 12px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Order Details</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 500; width: 30%;">Plan:</td>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">${currentPlan.name} Plan</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 500;">Amount:</td>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">$${amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 500;">Guarantee:</td>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">${currentPlan.guarantee} minimum revenue growth</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 500;">Session ID:</td>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">${sessionId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 500;">Payment Date:</td>
                  <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">${new Date().toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
            
            <!-- Action Items -->
            <div style="background: #fef3c7; border-radius: 12px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">Immediate Action Required</h4>
              <ol style="margin: 0; padding-left: 20px; color: #92400e;">
                <li style="margin-bottom: 8px;"><strong>Contact customer within 24 hours</strong> to schedule onboarding call</li>
                <li style="margin-bottom: 8px;"><strong>Verify Shopify store access</strong> and gather technical requirements</li>
                <li style="margin-bottom: 8px;"><strong>Begin implementation setup</strong> according to ${currentPlan.name} plan specifications</li>
                <li style="margin-bottom: 8px;"><strong>Schedule follow-up milestones</strong> for 48-hour implementation timeline</li>
              </ol>
            </div>
            
            <!-- Customer Expectations -->
            <div style="background: #dcfce7; border-radius: 12px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">Customer Expectations</h4>
              <ul style="margin: 0; padding-left: 20px; color: #166534;">
                <li style="margin-bottom: 8px;">Implementation completed within 48 hours</li>
                <li style="margin-bottom: 8px;">${currentPlan.guarantee} minimum revenue growth within 90 days</li>
                <li style="margin-bottom: 8px;">90-day money-back guarantee if targets not met</li>
                <li style="margin-bottom: 8px;">Dedicated success manager and ongoing support</li>
              </ul>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin: 20px 0 0 0;">
              <strong>Next Steps:</strong> Reach out to ${customer.name} at ${customer.email} to begin the onboarding process.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; padding: 20px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Chime Internal Notification System
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `
  };
};

module.exports = {
  generateConfirmationEmail,
  generateWelcomeEmail,
  generateChimeNotificationEmail
};

