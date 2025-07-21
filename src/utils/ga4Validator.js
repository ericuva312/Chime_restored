// React-compatible GA4 Validation Utility for Chime
// This provides validation functions that can be used in React components

// Simple validation functions for React components
export const validateGA4Implementation = () => {
  const results = {
    timestamp: new Date().toISOString(),
    gtm_loaded: validateGTMLoaded(),
    ga4_configured: validateGA4Configured(),
    dataLayer_working: validateDataLayer(),
    analytics_utility_loaded: validateAnalyticsUtility(),
    events_firing: validateEventsFiring()
  };

  console.log('📊 GA4 Implementation Validation:', results);
  return results;
};

// Check if GTM is properly loaded
const validateGTMLoaded = () => {
  const checks = {
    dataLayer_exists: typeof window.dataLayer !== 'undefined',
    dataLayer_has_content: window.dataLayer && window.dataLayer.length > 0,
    gtm_script_present: !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'),
    gtm_noscript_present: !!document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]')
  };

  const isValid = checks.dataLayer_exists && checks.dataLayer_has_content;
  return { valid: isValid, details: checks };
};

// Check if GA4 is properly configured
const validateGA4Configured = () => {
  const checks = {
    gtag_exists: typeof window.gtag !== 'undefined',
    measurement_id_configured: checkForMeasurementId(),
    container_id_correct: checkContainerId()
  };

  const isValid = checks.gtag_exists || checks.measurement_id_configured;
  return { valid: isValid, details: checks };
};

// Check if dataLayer is working
const validateDataLayer = () => {
  try {
    if (!window.dataLayer) {
      return { valid: false, error: 'dataLayer not found' };
    }

    // Test pushing to dataLayer
    const testEvent = {
      event: 'validation_test',
      test_parameter: 'validation_check',
      timestamp: new Date().toISOString()
    };

    window.dataLayer.push(testEvent);
    
    return { 
      valid: true, 
      dataLayer_length: window.dataLayer.length,
      test_event_pushed: true
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

// Check if analytics utility is loaded
const validateAnalyticsUtility = () => {
  const checks = {
    chime_analytics_exists: typeof window.ChimeAnalytics !== 'undefined',
    tracking_functions_available: checkTrackingFunctions(),
    ga4_config_loaded: checkGA4Config()
  };

  const isValid = checks.chime_analytics_exists && checks.tracking_functions_available;
  return { valid: isValid, details: checks };
};

// Check if events are firing
const validateEventsFiring = () => {
  if (!window.dataLayer) {
    return { valid: false, error: 'dataLayer not available' };
  }

  // Look for recent events in dataLayer
  const recentEvents = window.dataLayer.slice(-10).filter(item => 
    item && typeof item === 'object' && item.event
  );

  const eventTypes = [...new Set(recentEvents.map(event => event.event))];
  
  return {
    valid: recentEvents.length > 0,
    recent_events_count: recentEvents.length,
    unique_event_types: eventTypes.length,
    event_types: eventTypes,
    sample_events: recentEvents.slice(-3)
  };
};

// Helper functions
const checkForMeasurementId = () => {
  // Check for GA4 measurement ID in scripts or dataLayer
  const scripts = document.querySelectorAll('script');
  for (let script of scripts) {
    const content = script.innerHTML || script.src || '';
    if (content.includes('G-') || content.includes('494484742')) {
      return true;
    }
  }

  // Check in dataLayer
  if (window.dataLayer) {
    return window.dataLayer.some(item => 
      item && (
        (typeof item === 'string' && item.includes('G-')) ||
        (typeof item === 'object' && JSON.stringify(item).includes('G-'))
      )
    );
  }

  return false;
};

const checkContainerId = () => {
  const scripts = document.querySelectorAll('script');
  for (let script of scripts) {
    const content = script.innerHTML || script.src || '';
    if (content.includes('GTM-PP97DW9W')) {
      return true;
    }
  }
  return false;
};

const checkTrackingFunctions = () => {
  return window.ChimeAnalytics && 
         window.ChimeAnalytics.trackROICalculator &&
         window.ChimeAnalytics.trackContactForm &&
         window.ChimeAnalytics.trackBusinessEvent;
};

const checkGA4Config = () => {
  return window.ChimeAnalytics && 
         window.ChimeAnalytics.GA4_CONFIG &&
         window.ChimeAnalytics.GA4_CONFIG.measurementId;
};

// React hook for validation
export const useGA4Validation = () => {
  const [validationResults, setValidationResults] = React.useState(null);
  const [isValidating, setIsValidating] = React.useState(false);

  const runValidation = React.useCallback(() => {
    setIsValidating(true);
    
    setTimeout(() => {
      const results = validateGA4Implementation();
      setValidationResults(results);
      setIsValidating(false);
    }, 100);
  }, []);

  React.useEffect(() => {
    // Run initial validation after component mount
    const timer = setTimeout(runValidation, 2000);
    return () => clearTimeout(timer);
  }, [runValidation]);

  return {
    validationResults,
    isValidating,
    runValidation,
    isValid: validationResults ? Object.values(validationResults).filter(
      result => result && typeof result === 'object' && result.valid === true
    ).length >= 3 : false
  };
};

// Simple test functions for manual testing
export const testGA4Events = () => {
  console.log('🧪 Testing GA4 Events...');
  
  const tests = {
    roi_calculator_start: testROICalculatorStart(),
    contact_form_start: testContactFormStart(),
    page_view: testPageView(),
    business_event: testBusinessEvent()
  };

  console.log('🧪 GA4 Event Test Results:', tests);
  return tests;
};

const testROICalculatorStart = () => {
  try {
    if (window.ChimeAnalytics && window.ChimeAnalytics.trackROICalculator) {
      window.ChimeAnalytics.trackROICalculator.start();
      return { success: true, message: 'ROI calculator start event fired' };
    }
    return { success: false, message: 'ChimeAnalytics not available' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const testContactFormStart = () => {
  try {
    if (window.ChimeAnalytics && window.ChimeAnalytics.trackContactForm) {
      window.ChimeAnalytics.trackContactForm.start('test');
      return { success: true, message: 'Contact form start event fired' };
    }
    return { success: false, message: 'ChimeAnalytics not available' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const testPageView = () => {
  try {
    if (window.ChimeAnalytics && window.ChimeAnalytics.trackPageView) {
      window.ChimeAnalytics.trackPageView('test_page', { category: 'test' });
      return { success: true, message: 'Page view event fired' };
    }
    return { success: false, message: 'ChimeAnalytics not available' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const testBusinessEvent = () => {
  try {
    if (window.ChimeAnalytics && window.ChimeAnalytics.trackBusinessEvent) {
      window.ChimeAnalytics.trackBusinessEvent.pricingView('test_tier', 30);
      return { success: true, message: 'Business event fired' };
    }
    return { success: false, message: 'ChimeAnalytics not available' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Debug functions
export const getGA4DebugInfo = () => {
  return {
    timestamp: new Date().toISOString(),
    dataLayer_length: window.dataLayer ? window.dataLayer.length : 0,
    dataLayer_sample: window.dataLayer ? window.dataLayer.slice(-5) : [],
    gtag_available: typeof window.gtag !== 'undefined',
    chime_analytics_available: typeof window.ChimeAnalytics !== 'undefined',
    validation_system_available: typeof window.GA4Validator !== 'undefined',
    page_url: window.location.href,
    page_title: document.title,
    user_agent: navigator.userAgent
  };
};

export const logGA4Status = () => {
  const debugInfo = getGA4DebugInfo();
  const validationResults = validateGA4Implementation();
  
  console.group('📊 GA4 Implementation Status');
  console.log('Debug Info:', debugInfo);
  console.log('Validation Results:', validationResults);
  console.groupEnd();
  
  return { debugInfo, validationResults };
};

// Default export
export default {
  validateGA4Implementation,
  testGA4Events,
  getGA4DebugInfo,
  logGA4Status
};

