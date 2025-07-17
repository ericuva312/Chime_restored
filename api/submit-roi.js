// Vercel serverless function for ROI calculator form submission
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

    // Send email notification (using a simple email service)
    try {
      await sendEmailNotification(submissionData);
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
      submissionId: generateSubmissionId()
    });

  } catch (error) {
    console.error('ROI submission error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process ROI calculation'
    });
  }
}

// Helper function to send email notification
async function sendEmailNotification(data) {
  // Simple email notification - can be enhanced with SendGrid, etc.
  const emailData = {
    to: data.email,
    subject: 'Your ROI Calculator Results - Chime AI',
    html: `
      <h2>Your ROI Calculator Results</h2>
      <p>Hi ${data.first_name},</p>
      <p>Thank you for using our ROI calculator. Here are your results:</p>
      
      <h3>Business Information:</h3>
      <ul>
        <li>Company: ${data.business_name}</li>
        <li>Industry: ${data.industry}</li>
        <li>Current Monthly Revenue: $${data.monthly_revenue}</li>
        <li>Business Stage: ${data.business_stage}</li>
      </ul>
      
      <h3>Growth Projections:</h3>
      <ul>
        <li><strong>Conservative:</strong> $${data.projections?.conservative?.newRevenue} (+$${data.projections?.conservative?.increase})</li>
        <li><strong>Expected:</strong> $${data.projections?.expected?.newRevenue} (+$${data.projections?.expected?.increase})</li>
        <li><strong>Optimistic:</strong> $${data.projections?.optimistic?.newRevenue} (+$${data.projections?.optimistic?.increase})</li>
      </ul>
      
      <p>We'll be in touch soon to discuss how Chime can help you achieve these results!</p>
      <p>Best regards,<br>The Chime Team</p>
    `
  };
  
  // Log email data (in production, integrate with actual email service)
  console.log('Email notification prepared:', emailData);
  return true;
}

// Helper function to log submission
async function logSubmission(data) {
  // Simple logging - in production, integrate with database
  console.log('ROI Submission logged:', {
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

