import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle, Mail, Phone, Building, Globe } from 'lucide-react';

const BackendIntegratedROICalculator = () => {
  console.log('🚀 BackendIntegratedROICalculator component is mounting...');
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [formData, setFormData] = useState({
    monthly_revenue: '50000',
    average_order_value: '75',
    monthly_orders: '667',
    industry: '',
    conversion_rate: '2.5',
    cart_abandonment_rate: '70',
    monthly_ad_spend: '5000',
    manual_hours_per_week: '20',
    business_stage: '',
    biggest_challenges: [],
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    website: '',
    phone: ''
  });
  
  console.log('🎯 State initialized successfully!');
  
  // Railway backend URL
  const API_BASE_URL = 'https://chime-roi-backend-production.up.railway.app/api';
  
  // Industry options
  const industries = [
    'Fashion & Apparel', 'Electronics', 'Health & Wellness', 'Home & Garden',
    'Beauty & Cosmetics', 'Food & Beverage', 'Pet Products', 'Sports & Fitness',
    'Automotive', 'Books & Media', 'Toys & Games', 'Other'
  ];
  
  // Business stage options
  const businessStages = ['Startup', 'Growth', 'Established', 'Mature'];
  
  // Challenge options (matching backend validation)
  const challengeOptions = [
    'Manual processes', 'Low conversion rates', 'High cart abandonment',
    'Poor customer retention', 'Inventory management', 'Marketing inefficiency',
    'Customer service issues', 'Data analysis challenges', 'Other'
  ];
  
  // Handle input changes
  const handleInputChange = (field, value) => {
    console.log(`🔄 handleInputChange called: ${field} = ${value}`);
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      console.log(`📊 Updated formData:`, newData);
      return newData;
    });
  };
  
  // Handle challenge selection
  const handleChallengeToggle = (challenge) => {
    setFormData(prev => ({
      ...prev,
      biggest_challenges: prev.biggest_challenges.includes(challenge)
        ? prev.biggest_challenges.filter(c => c !== challenge)
        : [...prev.biggest_challenges, challenge]
    }));
  };
  
  // Form validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.monthly_revenue && formData.average_order_value;
      case 2:
        return formData.industry && formData.business_stage && formData.biggest_challenges.length > 0;
      case 3:
        return formData.first_name && formData.last_name && formData.email && formData.business_name;
      default:
        return true;
    }
  };
  
  // Step navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Form submission
  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/roi-calculator/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        setSubmissionResult(result);
        setShowSuccess(true);
      } else {
        const error = await response.json();
        console.error('Submission error:', error);
        alert('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
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
    
    // Industry multipliers for more accurate projections
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
      'Toys & Games': 1.2,
      'Other': 1.2
    };
    
    const multiplier = industryMultipliers[formData.industry] || 1.25;
    
    return {
      currentRevenue: monthlyRevenue,
      projectedRevenue: monthlyRevenue * multiplier,
      additionalRevenue: monthlyRevenue * (multiplier - 1),
      annualIncrease: monthlyRevenue * (multiplier - 1) * 12
    };
  }, [formData]);
  
  // Success popup
  if (showSuccess && submissionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You, {formData.first_name}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {submissionResult.message}
            </p>
            
            {submissionResult.projections && (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Conservative</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    ${submissionResult.projections.conservative.monthly_revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Monthly Revenue</div>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Expected</h3>
                  <div className="text-2xl font-bold text-green-600">
                    ${submissionResult.projections.expected.monthly_revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">Monthly Revenue</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Optimistic</h3>
                  <div className="text-2xl font-bold text-purple-600">
                    ${submissionResult.projections.optimistic.monthly_revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700">Monthly Revenue</div>
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
                      placeholder="50000"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Helps us calculate your baseline revenue for accurate growth projections
                    </p>
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
                      placeholder="75"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enables us to optimize your pricing strategy and upselling opportunities
                    </p>
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
                      placeholder="667"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Allows us to identify conversion optimization and automation opportunities
                    </p>
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
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ color: '#6B7280' }}
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Enables industry-specific optimization strategies and benchmarking
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Stage
                    </label>
                    <select
                      value={formData.business_stage}
                      onChange={(e) => handleInputChange('business_stage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ color: '#6B7280' }}
                    >
                      <option value="">Select your business stage</option>
                      {businessStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Helps us tailor growth strategies to your current business maturity level
                    </p>
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
                      placeholder="20"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Quantifies automation potential and time savings opportunities
                    </p>
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
                            checked={formData.biggest_challenges.includes(challenge)}
                            onChange={() => handleChallengeToggle(challenge)}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Identifies priority areas for automation and optimization solutions
                    </p>
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
                    onClick={nextStep}
                    disabled={!validateStep(2)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                        style={{ color: '#6B7280' }}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Personalizes your growth blueprint and recommendations
                      </p>
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
                        style={{ color: '#6B7280' }}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ensures professional communication and follow-up
                      </p>
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
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Delivers your custom growth blueprint and implementation roadmap
                    </p>
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
                      placeholder="Your Company Name"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Customizes solutions to your specific business context and needs
                    </p>
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
                      placeholder="https://yourwebsite.com"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enables detailed analysis of your current setup and optimization opportunities
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                      style={{ color: '#6B7280' }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Allows for priority consultation scheduling and urgent support
                    </p>
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
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Growth Blueprint'}
                    {!isSubmitting && <Target className="inline ml-2 w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue Projection</h3>
              <p className="text-gray-600">Based on your current metrics</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  ${calculations.currentRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Current Monthly Revenue</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ${calculations.projectedRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-green-700">Projected Monthly Revenue</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  +${calculations.additionalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700">Additional Monthly Revenue</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  +${calculations.annualIncrease.toLocaleString()}
                </div>
                <div className="text-sm text-purple-700">Additional Annual Revenue</div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">Growth Potential</span>
              </div>
              <p className="text-sm text-yellow-700">
                Based on industry benchmarks and automation opportunities, your business shows strong potential for {((calculations.projectedRevenue / calculations.currentRevenue - 1) * 100).toFixed(0)}% revenue growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendIntegratedROICalculator;

