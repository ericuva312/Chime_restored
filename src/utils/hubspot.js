// HubSpot API integration utility
const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY || 'your-hubspot-api-key'
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || 'your-portal-id'

// Submit contact form to HubSpot
export const submitContactToHubSpot = async (formData) => {
  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          {
            name: 'firstname',
            value: formData.firstName
          },
          {
            name: 'lastname',
            value: formData.lastName
          },
          {
            name: 'email',
            value: formData.email
          },
          {
            name: 'company',
            value: formData.company
          },
          {
            name: 'phone',
            value: formData.phone || ''
          },
          {
            name: 'message',
            value: formData.message
          },
          {
            name: 'monthly_revenue',
            value: formData.monthlyRevenue || ''
          },
          {
            name: 'form_type',
            value: 'consultation'
          }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit to HubSpot')
    }

    return await response.json()
  } catch (error) {
    console.error('HubSpot submission error:', error)
    throw error
  }
}

// Submit audit form to HubSpot
export const submitAuditToHubSpot = async (formData) => {
  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/audit-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          {
            name: 'firstname',
            value: formData.firstName
          },
          {
            name: 'lastname',
            value: formData.lastName
          },
          {
            name: 'email',
            value: formData.email
          },
          {
            name: 'company',
            value: formData.company
          },
          {
            name: 'website',
            value: formData.website
          },
          {
            name: 'monthly_revenue',
            value: formData.monthlyRevenue
          },
          {
            name: 'industry',
            value: formData.industry
          },
          {
            name: 'business_stage',
            value: formData.businessStage
          },
          {
            name: 'main_challenges',
            value: formData.mainChallenges
          },
          {
            name: 'form_type',
            value: 'audit'
          }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit audit to HubSpot')
    }

    return await response.json()
  } catch (error) {
    console.error('HubSpot audit submission error:', error)
    throw error
  }
}

// Send email notification
export const sendEmailNotification = async (formData, formType) => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        formType,
        to: 'hello@chimehq.co'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email notification')
    }

    return await response.json()
  } catch (error) {
    console.error('Email notification error:', error)
    throw error
  }
}

