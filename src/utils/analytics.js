// Analytics utility for Chime GA4 tracking
// This file provides React-friendly functions for tracking user interactions

// Initialize dataLayer if not exists
const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

// Helper function to push events to dataLayer
const pushEvent = (eventName, eventData = {}) => {
  initDataLayer();
  
  const eventObject = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_title: document.title,
    user_agent: navigator.userAgent,
    ...eventData
  };
  
  window.dataLayer.push(eventObject);
  console.log('📊 GA4 Event Tracked:', eventObject);
  
  return eventObject;
};

// ROI Calculator specific tracking functions
export const trackROICalculator = {
  // Track when user starts the calculator
  start: () => {
    return pushEvent('roi_calculator_start', {
      calculator_type: 'revenue_growth',
      user_type: 'anonymous',
      page_section: 'roi_calculator'
    });
  },

  // Track when user completes a field
  fieldComplete: (fieldName, fieldValue, completionPercentage) => {
    return pushEvent('roi_calculator_field_complete', {
      field_name: fieldName,
      field_value: fieldValue,
      completion_percentage: completionPercentage,
      calculator_step: getCalculatorStep(completionPercentage),
      field_type: getFieldType(fieldName)
    });
  },

  // Track when projections are displayed
  projectionView: (projectionData) => {
    return pushEvent('roi_calculator_projection_view', {
      monthly_revenue: projectionData.monthlyRevenue || 0,
      industry: projectionData.industry || 'unknown',
      business_stage: projectionData.businessStage || 'unknown',
      projected_growth_low: projectionData.scenarios?.low?.revenueIncrease || 0,
      projected_growth_expected: projectionData.scenarios?.expected?.revenueIncrease || 0,
      projected_growth_high: projectionData.scenarios?.high?.revenueIncrease || 0,
      time_savings: projectionData.timeSavings || 0,
      roi_percentage: projectionData.roiPercentage || 0,
      lead_score: projectionData.leadScore || 0
    });
  },

  // Track scenario selection (Low, Expected, High)
  scenarioSelect: (scenario, projectionData) => {
    return pushEvent('roi_calculator_scenario_select', {
      selected_scenario: scenario,
      scenario_revenue_increase: projectionData.revenueIncrease || 0,
      scenario_time_savings: projectionData.timeSavings || 0,
      scenario_roi: projectionData.roi || 0,
      monthly_revenue: projectionData.monthlyRevenue || 0
    });
  },

  // Track calculator completion
  complete: (calculatorData, leadScore) => {
    return pushEvent('roi_calculator_complete', {
      monthly_revenue: calculatorData.monthly_revenue || 0,
      industry: calculatorData.industry || 'unknown',
      business_stage: calculatorData.business_stage || 'unknown',
      conversion_rate: calculatorData.conversion_rate || 0,
      cart_abandonment: calculatorData.cart_abandonment || 0,
      ad_spend: calculatorData.ad_spend || 0,
      manual_hours: calculatorData.manual_hours || 0,
      lead_score: leadScore || 0,
      completion_time: calculatorData.completionTime || 0,
      total_projected_value: calculatorData.totalProjectedValue || 0,
      has_contact_info: !!(calculatorData.email && calculatorData.first_name)
    });
  }
};

// Contact form tracking functions
export const trackContactForm = {
  // Track when contact form appears
  start: (formType = 'roi_calculator') => {
    return pushEvent('contact_form_start', {
      form_type: formType,
      form_location: window.location.pathname,
      trigger_source: 'roi_calculator_completion'
    });
  },

  // Track contact form field completion
  fieldComplete: (fieldName, fieldValue, formType = 'roi_calculator') => {
    return pushEvent('contact_form_field_complete', {
      form_type: formType,
      field_name: fieldName,
      field_value: fieldValue ? 'filled' : 'empty', // Don't track actual values for privacy
      form_section: 'contact_details'
    });
  },

  // Track form submission attempt
  submit: (formData, formType = 'roi_calculator') => {
    return pushEvent('contact_form_submit', {
      form_type: formType,
      lead_source: 'website',
      industry: formData.industry || 'unknown',
      business_stage: formData.business_stage || 'unknown',
      monthly_revenue: formData.monthly_revenue || 0,
      has_business_name: !!formData.business_name,
      submission_method: 'roi_calculator_flow'
    });
  },

  // Track successful form submission
  success: (leadData, formType = 'roi_calculator') => {
    return pushEvent('contact_form_success', {
      form_type: formType,
      lead_id: leadData.leadId || 'unknown',
      lead_score: leadData.leadScore || 0,
      lead_tier: leadData.leadTier || 'unknown',
      email_sent: leadData.emailSent || false,
      hubspot_created: leadData.hubspotCreated || false,
      conversion_value: leadData.estimatedValue || 0
    });
  },

  // Track form submission error
  error: (errorData, formType = 'roi_calculator') => {
    return pushEvent('contact_form_error', {
      form_type: formType,
      error_type: errorData.type || 'unknown',
      error_message: errorData.message || 'unknown',
      field_errors: errorData.fieldErrors || [],
      submission_attempt: errorData.attempt || 1
    });
  }
};

// Business event tracking functions
export const trackBusinessEvent = {
  // Track demo requests
  demoRequest: (source = 'website', userData = {}) => {
    return pushEvent('demo_request', {
      request_source: source,
      user_segment: userData.segment || 'unknown',
      lead_score: userData.leadScore || 0,
      monthly_revenue: userData.monthlyRevenue || 0,
      industry: userData.industry || 'unknown'
    });
  },

  // Track pricing page views
  pricingView: (tier = null, timeOnPage = 0) => {
    return pushEvent('pricing_view', {
      pricing_tier_viewed: tier,
      time_on_pricing: timeOnPage,
      referrer_page: document.referrer || 'direct'
    });
  },

  // Track case study views
  caseStudyView: (caseStudyId, industry = null) => {
    return pushEvent('case_study_view', {
      case_study_id: caseStudyId,
      industry: industry,
      view_source: 'website'
    });
  },

  // Track consultation bookings
  consultationBooked: (bookingData = {}) => {
    return pushEvent('consultation_booked', {
      booking_source: bookingData.source || 'website',
      consultation_type: bookingData.type || 'strategy_call',
      scheduled_date: bookingData.scheduledDate || null,
      lead_score: bookingData.leadScore || 0,
      booking_method: bookingData.method || 'popup_cta'
    });
  }
};

// Page tracking functions
export const trackPageView = (pageName, pageData = {}) => {
  return pushEvent('page_view', {
    page_name: pageName,
    page_category: pageData.category || 'website',
    page_section: pageData.section || 'main',
    user_type: pageData.userType || 'anonymous',
    ...pageData
  });
};

// Engagement tracking functions
export const trackEngagement = {
  // Track scroll depth
  scrollDepth: (percentage) => {
    return pushEvent('scroll_depth', {
      scroll_percentage: percentage,
      page_height: document.body.scrollHeight,
      viewport_height: window.innerHeight
    });
  },

  // Track time on page
  timeOnPage: (seconds, pageName) => {
    return pushEvent('time_on_page', {
      time_seconds: seconds,
      page_name: pageName,
      engagement_level: getEngagementLevel(seconds)
    });
  },

  // Track button clicks
  buttonClick: (buttonName, buttonLocation, additionalData = {}) => {
    return pushEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation,
      click_timestamp: new Date().toISOString(),
      ...additionalData
    });
  }
};

// Helper functions
const getCalculatorStep = (percentage) => {
  if (percentage <= 20) return 'basic_info';
  if (percentage <= 40) return 'business_metrics';
  if (percentage <= 60) return 'performance_data';
  if (percentage <= 80) return 'contact_info';
  return 'complete';
};

const getFieldType = (fieldName) => {
  const fieldTypes = {
    monthly_revenue: 'financial',
    industry: 'demographic',
    business_stage: 'demographic',
    conversion_rate: 'performance',
    cart_abandonment: 'performance',
    ad_spend: 'financial',
    manual_hours: 'operational',
    first_name: 'contact',
    last_name: 'contact',
    email: 'contact',
    business_name: 'contact'
  };
  return fieldTypes[fieldName] || 'unknown';
};

const getEngagementLevel = (seconds) => {
  if (seconds < 30) return 'low';
  if (seconds < 120) return 'medium';
  if (seconds < 300) return 'high';
  return 'very_high';
};

// Validation functions
export const validateTracking = {
  // Check if GTM is loaded
  isGTMLoaded: () => {
    return typeof window.dataLayer !== 'undefined' && window.dataLayer.length > 0;
  },

  // Check if GA4 is configured
  isGA4Configured: () => {
    return typeof window.gtag !== 'undefined';
  },

  // Test event firing
  testEvent: () => {
    return pushEvent('test_event', {
      test_parameter: 'test_value',
      test_timestamp: new Date().toISOString(),
      test_source: 'analytics_utility'
    });
  },

  // Get current dataLayer contents
  getDataLayer: () => {
    return window.dataLayer || [];
  }
};

// Export all tracking functions
export {
  pushEvent,
  initDataLayer
};

// Default export for convenience
export default {
  trackROICalculator,
  trackContactForm,
  trackBusinessEvent,
  trackPageView,
  trackEngagement,
  validateTracking
};



// Validation and Testing Integration
// Make analytics functions available globally for testing
if (typeof window !== 'undefined') {
  window.ChimeAnalytics = {
    GA4_CONFIG: {
      measurementId: 'G-494484742',
      gtmContainerId: 'GTM-PP97DW9W',
      customEvents: true
    },
    trackROICalculator,
    trackContactForm,
    trackBusinessEvent,
    trackPageView,
    pushEvent,
    
    // Testing functions
    test: {
      roiCalculator: () => {
        trackROICalculator.start();
        trackROICalculator.fieldComplete('monthly_revenue', '50000', 25);
        trackROICalculator.projectionView({
          monthlyRevenue: 50000,
          industry: 'electronics',
          businessStage: 'growth'
        });
        return 'ROI Calculator events fired';
      },
      
      contactForm: () => {
        trackContactForm.start('test');
        trackContactForm.submit({ industry: 'electronics' }, 'test');
        return 'Contact Form events fired';
      },
      
      businessEvents: () => {
        trackBusinessEvent.pricingView('market_dominator', 30);
        trackBusinessEvent.caseStudyView('bella_fashion', 'fashion');
        return 'Business events fired';
      },
      
      pageView: () => {
        trackPageView('test_page', { category: 'test' });
        return 'Page view event fired';
      }
    },
    
    // Debug functions
    debug: {
      getDataLayer: () => window.dataLayer || [],
      getLastEvents: (count = 5) => (window.dataLayer || []).slice(-count),
      clearDataLayer: () => { window.dataLayer = []; },
      getEventCount: () => (window.dataLayer || []).length
    }
  };
  
  // Initialize validation after analytics is loaded
  setTimeout(() => {
    if (window.GA4Validator) {
      console.log('🔍 GA4 Validator found, running initial validation...');
      window.GA4Validator.runFullValidation();
    }
  }, 2000);
}

// Auto-initialize on page load
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📊 Chime Analytics initialized');
    
    // Track initial page view
    trackPageView(window.location.pathname, {
      category: 'navigation',
      section: 'page_load'
    });
  });
} else if (typeof window !== 'undefined') {
  console.log('📊 Chime Analytics initialized');
  
  // Track initial page view
  trackPageView(window.location.pathname, {
    category: 'navigation',
    section: 'page_load'
  });
}

