// Vercel serverless function for ROI calculator form submission
import sgMail from '@sendgrid/mail';

// Configure SendGrid with API key from environment variables
// In production, set this in Vercel environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'notifications@chimehq.co';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@chimehq.co';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['monthly_revenue', 'average_order_value', 'monthly_orders', 'industry', 'business_stage', 'first_name', 'last_name', 'email', 'business_name'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missing: missingFields 
      });
    }

    // Calculate ROI metrics
    const monthlyRevenue = parseFloat(formData.monthly_revenue);
    const aov = parseFloat(formData.average_order_value);
    const monthlyOrders = parseInt(formData.monthly_orders);
    
    // Industry multipliers
    const industryMultipliers = {
      'Fashion': 1.56,
      'Beauty': 1.67,
      'Sports': 1.34,
      'Food & Beverage': 1.23,
      'Electronics': 2.03,
      'Health & Wellness': 1.78,
      'Home & Garden': 1.45,
      'Automotive': 1.89,
      'Other': 1.40
    };

    const multiplier = industryMultipliers[formData.industry] || 1.40;
    
    // Calculate projections
    const projections = {
      conservative: {
        newRevenue: Math.round(monthlyRevenue * 1.15),
        increase: Math.round(monthlyRevenue * 0.15),
        roi: Math.round((monthlyRevenue * 0.15 * 12) / (monthlyRevenue * 0.1) * 100),
        breakEvenMonths: 6
      },
      expected: {
        newRevenue: Math.round(monthlyRevenue * 1.30),
        increase: Math.round(monthlyRevenue * 0.30),
        roi: Math.round((monthlyRevenue * 0.30 * 12) / (monthlyRevenue * 0.1) * 100),
        breakEvenMonths: 4
      },
      optimistic: {
        newRevenue: Math.round(monthlyRevenue * multiplier),
        increase: Math.round(monthlyRevenue * (multiplier - 1)),
        roi: Math.round((monthlyRevenue * (multiplier - 1) * 12) / (monthlyRevenue * 0.1) * 100),
        breakEvenMonths: 3
      }
    };

    // Prepare data for storage/email
    const submissionData = {
      ...formData,
      projections,
      submittedAt: new Date().toISOString(),
      calculatedMetrics: {
        monthlyRevenue,
        aov,
        monthlyOrders,
        industryMultiplier: multiplier
      }
    };

    // Generate submission ID
    const submissionId = generateSubmissionId();
    submissionData.submissionId = submissionId;

    // Send email notifications
    try {
      // Only attempt to send emails if SendGrid is configured
      if (SENDGRID_API_KEY) {
        // Send email to merchant
        await sendMerchantEmail(submissionData);
        
        // Send confirmation email to admin
        await sendAdminEmail(submissionData);
      } else {
        // Log that emails would be sent in production
        console.log('SendGrid not configured. In production, would send emails to:', 
          submissionData.email, 'and', ADMIN_EMAIL);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the entire request if email fails
    }

    // Store in simple database/log
    try {
      await logSubmission(submissionData);
    } catch (logError) {
      console.error('Logging failed:', logError);
      // Don't fail the entire request if logging fails
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'ROI calculation submitted successfully',
      projections,
      submissionId
    });

  } catch (error) {
    console.error('ROI submission error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process ROI calculation'
    });
  }
}

// Helper function to send email to merchant
async function sendMerchantEmail(data) {
  // Create merchant email with ROI results
  const merchantEmail = {
    to: data.email,
    from: FROM_EMAIL,
    subject: 'Your ROI Calculator Results - Chime AI',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #4a90e2 0%, #6a5acd 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
          .metrics {
            background: white;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .projection {
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
          }
          .conservative {
            background: #e8f4fd;
            border-left: 4px solid #4a90e2;
          }
          .expected {
            background: #e8f5e9;
            border-left: 4px solid #66bb6a;
          }
          .optimistic {
            background: #fff8e1;
            border-left: 4px solid #ffca28;
          }
          .cta-button {
            display: inline-block;
            background: #4a90e2;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
          }
          h2 {
            color: #4a90e2;
          }
          h3 {
            color: #555;
          }
          ul {
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your ROI Calculator Results</h1>
          </div>
          <div class="content">
            <p>Hi ${data.first_name},</p>
            <p>Thank you for using our ROI calculator. Based on your inputs, we've prepared a detailed analysis of how Chime can help grow your business.</p>
            
            <div class="metrics">
              <h3>Your Business Information:</h3>
              <ul>
                <li><strong>Company:</strong> ${data.business_name}</li>
                <li><strong>Industry:</strong> ${data.industry}</li>
                <li><strong>Current Monthly Revenue:</strong> $${data.monthly_revenue}</li>
                <li><strong>Business Stage:</strong> ${data.business_stage}</li>
              </ul>
            </div>
            
            <h3>Your Growth Projections:</h3>
            
            <div class="projection conservative">
              <h4>Conservative Scenario:</h4>
              <p><strong>Monthly Revenue:</strong> $${data.projections.conservative.newRevenue} (+$${data.projections.conservative.increase})</p>
              <p><strong>Annual ROI:</strong> ${data.projections.conservative.roi}%</p>
              <p><strong>Break-even:</strong> ${data.projections.conservative.breakEvenMonths} months</p>
            </div>
            
            <div class="projection expected">
              <h4>Expected Scenario:</h4>
              <p><strong>Monthly Revenue:</strong> $${data.projections.expected.newRevenue} (+$${data.projections.expected.increase})</p>
              <p><strong>Annual ROI:</strong> ${data.projections.expected.roi}%</p>
              <p><strong>Break-even:</strong> ${data.projections.expected.breakEvenMonths} months</p>
            </div>
            
            <div class="projection optimistic">
              <h4>Optimistic Scenario:</h4>
              <p><strong>Monthly Revenue:</strong> $${data.projections.optimistic.newRevenue} (+$${data.projections.optimistic.increase})</p>
              <p><strong>Annual ROI:</strong> ${data.projections.optimistic.roi}%</p>
              <p><strong>Break-even:</strong> ${data.projections.optimistic.breakEvenMonths} months</p>
            </div>
            
            <p>These projections are based on our experience with ${data.industry} businesses at the ${data.business_stage} stage. Our AI-powered business automation can help you achieve these results through optimized operations, enhanced customer experiences, and data-driven decision making.</p>
            
            <p>We'd love to discuss how we can help you achieve these results. Our team will be in touch shortly, or you can schedule a call with us right away:</p>
            
            <div style="text-align: center;">
              <a href="https://www.chimehq.co/book-call" class="cta-button">Schedule a Strategy Call</a>
            </div>
            
            <p>If you have any questions, simply reply to this email.</p>
            
            <p>Best regards,<br>The Chime Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Chime HQ. All rights reserved.</p>
            <p>Submission ID: ${data.submissionId}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  
  // If SendGrid is configured, send the email
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send(merchantEmail);
      console.log('Merchant email sent successfully to:', data.email);
      return true;
    } catch (error) {
      console.error('Error sending merchant email:', error);
      if (error.response) {
        console.error('SendGrid error response:', error.response.body);
      }
      throw error;
    }
  } else {
    // Log email data for development
    console.log('Merchant email would be sent in production:', merchantEmail);
    return true;
  }
}

// Helper function to send admin notification email
async function sendAdminEmail(data) {
  // Format challenges array if it exists
  const challengesText = data.challenges && Array.isArray(data.challenges) 
    ? data.challenges.join(', ') 
    : 'None specified';

  // Create admin notification email
  const adminEmail = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `New ROI Calculator Submission: ${data.business_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #333;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
          }
          .section {
            background: white;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .contact-info {
            background: #e8f5e9;
            border-left: 4px solid #66bb6a;
          }
          .business-info {
            background: #e8f4fd;
            border-left: 4px solid #4a90e2;
          }
          .projections {
            background: #fff8e1;
            border-left: 4px solid #ffca28;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ROI Calculator Lead</h2>
          </div>
          <div class="content">
            <p>A new lead has submitted the ROI calculator form. Here are the details:</p>
            
            <div class="section contact-info">
              <h3>Contact Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${data.first_name} ${data.last_name}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
                <li><strong>Business:</strong> ${data.business_name}</li>
                <li><strong>Submission Time:</strong> ${new Date(data.submittedAt).toLocaleString()}</li>
              </ul>
            </div>
            
            <div class="section business-info">
              <h3>Business Information:</h3>
              <ul>
                <li><strong>Industry:</strong> ${data.industry}</li>
                <li><strong>Business Stage:</strong> ${data.business_stage}</li>
                <li><strong>Monthly Revenue:</strong> $${data.monthly_revenue}</li>
                <li><strong>Average Order Value:</strong> $${data.average_order_value}</li>
                <li><strong>Monthly Orders:</strong> ${data.monthly_orders}</li>
                <li><strong>Conversion Rate:</strong> ${data.conversion_rate || 'Not provided'}%</li>
                <li><strong>Cart Abandonment:</strong> ${data.cart_abandonment || 'Not provided'}%</li>
                <li><strong>Monthly Ad Spend:</strong> $${data.monthly_ad_spend || 'Not provided'}</li>
                <li><strong>Manual Hours/Week:</strong> ${data.manual_hours || 'Not provided'}</li>
                <li><strong>Challenges:</strong> ${challengesText}</li>
              </ul>
            </div>
            
            <div class="section projections">
              <h3>ROI Projections:</h3>
              <table>
                <tr>
                  <th>Scenario</th>
                  <th>New Revenue</th>
                  <th>Increase</th>
                  <th>ROI</th>
                  <th>Break-even</th>
                </tr>
                <tr>
                  <td>Conservative</td>
                  <td>$${data.projections.conservative.newRevenue}</td>
                  <td>+$${data.projections.conservative.increase}</td>
                  <td>${data.projections.conservative.roi}%</td>
                  <td>${data.projections.conservative.breakEvenMonths} months</td>
                </tr>
                <tr>
                  <td>Expected</td>
                  <td>$${data.projections.expected.newRevenue}</td>
                  <td>+$${data.projections.expected.increase}</td>
                  <td>${data.projections.expected.roi}%</td>
                  <td>${data.projections.expected.breakEvenMonths} months</td>
                </tr>
                <tr>
                  <td>Optimistic</td>
                  <td>$${data.projections.optimistic.newRevenue}</td>
                  <td>+$${data.projections.optimistic.increase}</td>
                  <td>${data.projections.optimistic.roi}%</td>
                  <td>${data.projections.optimistic.breakEvenMonths} months</td>
                </tr>
              </table>
            </div>
            
            <p><strong>Industry Multiplier:</strong> ${data.calculatedMetrics.industryMultiplier}</p>
            <p><strong>Submission ID:</strong> ${data.submissionId}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Chime HQ. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  
  // If SendGrid is configured, send the email
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send(adminEmail);
      console.log('Admin notification email sent successfully to:', ADMIN_EMAIL);
      return true;
    } catch (error) {
      console.error('Error sending admin notification email:', error);
      if (error.response) {
        console.error('SendGrid error response:', error.response.body);
      }
      throw error;
    }
  } else {
    // Log email data for development
    console.log('Admin notification email would be sent in production:', adminEmail);
    return true;
  }
}

// Helper function to log submission
async function logSubmission(data) {
  // Simple logging - in production, integrate with database
  console.log('ROI Submission logged:', {
    submissionId: data.submissionId,
    timestamp: data.submittedAt,
    email: data.email,
    company: data.business_name,
    revenue: data.monthly_revenue,
    industry: data.industry
  });
  return true;
}

// Helper function to generate submission ID
function generateSubmissionId() {
  return 'roi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

