import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const FixedROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [formData, setFormData] = useState({
    monthly_revenue: '75000',
    average_order_value: '125',
    monthly_orders: '600',
    industry: '',
    conversion_rate: '2.5',
    cart_abandonment_rate: '70',
    monthly_ad_spend: '5000',
    manual_hours_per_week: '35',
    business_stage: '',
    challenges: ['Manual processes', 'Low conversion rates', 'High cart abandonment'],
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    website: '',
    phone: ''
  });

  console.log('🎯 FixedROICalculator initialized!');
  
  // Production backend URL (deployed to Manus)
  const API_BASE_URL = 'https://77h9ikczlzgq.manus.space';
  
  // Industry options
  const industries = [
    'Fashion & Apparel', 'Electronics', 'Health & Wellness', 'Home & Garden',
    'Beauty & Cosmetics', 'Food & Beverage', 'Pet Products', 'Sports & Fitness',
    'Automotive', 'Books & Media', 'Toys & Games', 'Other'
  ];
  
  // Business stage options
  const businessStages = ['Startup', 'Growth', 'Established', 'Mature'];
  
  // Challenge options
  const challengeOptions = [
    'Manual processes', 'Low conversion rates', 'High cart abandonment',
    'Poor customer retention', 'Inventory management', 'Marketing inefficiency',
    'Customer service issues', 'Data analysis challenges', 'Other'
  ];
  
  // Handle input changes with proper state management
  const handleInputChange = (field, value) => {
    console.log(`🔄 handleInputChange: ${field} = "${value}"`);
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      console.log(`📊 Updated ${field}:`, newData[field]);
      console.log(`📊 Full formData after update:`, newData);
      
      // Special logging for Step 2 fields
      if (field === 'industry' || field === 'business_stage') {
        console.log(`🎯 Step 2 validation check after ${field} update:`);
        console.log(`  - industry: "${newData.industry}" (${!!newData.industry})`);
        console.log(`  - business_stage: "${newData.business_stage}" (${!!newData.business_stage})`);
        console.log(`  - Step 2 valid: ${!!(newData.industry && newData.business_stage)}`);
      }
      
      return newData;
    });
  };
  
  // Handle challenge selection
  const handleChallengeToggle = (challenge) => {
    console.log(`🔄 Challenge toggle: ${challenge}`);
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };
  
  // Form validation with detailed logging
  const validateStep = (step) => {
    console.log(`🔍 Validating step ${step}`);
    console.log(`📊 Current formData:`, formData);
    
    switch (step) {
      case 1:
        const step1Valid = formData.monthly_revenue && formData.average_order_value && formData.monthly_orders;
        console.log(`✅ Step 1 valid: ${step1Valid}`);
        return step1Valid;
      case 2:
        const step2Valid = formData.industry && formData.business_stage;
        console.log(`✅ Step 2 validation:`);
        console.log(`  - industry: "${formData.industry}" (${!!formData.industry})`);
        console.log(`  - business_stage: "${formData.business_stage}" (${!!formData.business_stage})`);
        console.log(`  - challenges: ${formData.challenges.length} items (optional)`);
        console.log(`✅ Step 2 valid: ${step2Valid}`);
        return step2Valid;
      case 3:
        const step3Valid = formData.first_name && formData.last_name && formData.email && formData.business_name;
        console.log(`✅ Step 3 valid: ${step3Valid}`);
        return step3Valid;
      default:
        return true;
    }
  };
  
  // Step navigation
  const nextStep = () => {
    console.log(`🚀 Next step from ${currentStep}`);
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      console.log(`✅ Advanced to step ${currentStep + 1}`);
    } else {
      console.log(`❌ Validation failed for step ${currentStep}`);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Form submission
  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    console.log('🚀 Submitting form...', formData);
    
    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Submission successful:', result);
        setSubmissionResult(result);
        setShowSuccess(true);
      } else {
        const error = await response.json();
        console.error('❌ Submission error:', error);
        alert('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('There was a network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculations
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    
    // Industry multipliers
    const industryMultipliers = {
      'Fashion & Apparel': 1.3,
      'Electronics': 1.25,
      'Health & Wellness': 1.4,
      'Home & Garden': 1.2,
      'Beauty & Cosmetics': 1.35,
      'Food & Beverage': 1.15,
      'Pet Products': 1.3,
      'Sports & Fitness': 1.25,
      'Automotive': 1.2,
      'Books & Media': 1.1,
      'Toys & Games': 1.25,
      'Other': 1.2
    };
    
    const multiplier = industryMultipliers[formData.industry] || 1.25;
    const projectedRevenue = monthlyRevenue * multiplier;
    const additionalRevenue = projectedRevenue - monthlyRevenue;
    
    return {
      currentRevenue: monthlyRevenue,
      projectedRevenue,
      additionalRevenue,
      annualAdditional: additionalRevenue * 12
    };
  }, [formData.monthly_revenue, formData.average_order_value, formData.monthly_orders, formData.industry]);

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank you! Your analysis is complete.
            </h1>
            
            {submissionResult && (
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Your Revenue Projections</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      ${submissionResult.projections?.conservative?.monthly_revenue?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Conservative</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${submissionResult.projections?.expected?.monthly_revenue?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Expected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      ${submissionResult.projections?.optimistic?.monthly_revenue?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Optimistic</div>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 mb-6">
              Check your email for your personalized growth blueprint and next steps.
            </p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Revenue Growth Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your potential revenue growth with AI-powered automation
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8">
            <span className={`text-sm ${currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Business Metrics
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Business Details
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Contact Info
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Business Metrics */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Business Metrics</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Revenue ($)
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_revenue}
                      onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="75000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Order Value ($)
                    </label>
                    <input
                      type="number"
                      value={formData.average_order_value}
                      onChange={(e) => handleInputChange('average_order_value', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="125"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Orders
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_orders}
                      onChange={(e) => handleInputChange('monthly_orders', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="600"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(1)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next Step <ChevronRight className="inline ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Business Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => {
                        console.log('🔥 Industry dropdown onChange triggered!');
                        console.log('  - Selected value:', e.target.value);
                        console.log('  - Current formData.industry:', formData.industry);
                        handleInputChange('industry', e.target.value);
                        console.log('  - After handleInputChange called');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Stage
                    </label>
                    <select
                      value={formData.business_stage}
                      onChange={(e) => {
                        console.log('🔥 Business Stage dropdown onChange triggered!');
                        console.log('  - Selected value:', e.target.value);
                        console.log('  - Current formData.business_stage:', formData.business_stage);
                        handleInputChange('business_stage', e.target.value);
                        console.log('  - After handleInputChange called');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your business stage</option>
                      {businessStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manual Hours per Week
                    </label>
                    <input
                      type="number"
                      value={formData.manual_hours_per_week}
                      onChange={(e) => handleInputChange('manual_hours_per_week', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="35"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biggest Challenges (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {challengeOptions.map(challenge => (
                        <label key={challenge} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.challenges.includes(challenge)}
                            onChange={() => handleChallengeToggle(challenge)}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <ChevronLeft className="inline mr-2 w-5 h-5" /> Previous
                  </button>
                  <button
                    onClick={() => {
                      console.log('🚀 Next Step button clicked!');
                      console.log('  - Current formData:', formData);
                      console.log('  - Industry:', formData.industry);
                      console.log('  - Business Stage:', formData.business_stage);
                      console.log('  - Step 2 validation:', !!(formData.industry && formData.business_stage));
                      nextStep();
                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next Step <ChevronRight className="inline ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange('business_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company Inc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <ChevronLeft className="inline mr-2 w-5 h-5" /> Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!validateStep(3) || isSubmitting}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Analysis'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Revenue Projection */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Revenue Projection</h3>
              <p className="text-gray-600">Based on your current metrics</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${calculations.currentRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Current Monthly Revenue</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  ${calculations.projectedRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Projected Monthly Revenue</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  +${calculations.additionalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Additional Monthly Revenue</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  +${calculations.annualAdditional.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Additional Annual Revenue</div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Growth Potential</h4>
              <p className="text-sm text-blue-700">
                Based on industry benchmarks and automation opportunities, your business shows strong potential for 
                {formData.industry ? ` ${Math.round(((calculations.projectedRevenue - calculations.currentRevenue) / calculations.currentRevenue) * 100)}%` : ' 25%'} revenue growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedROICalculator;

