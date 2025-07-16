import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle, Star, Shield, Clock, Award, BarChart3, User, Building, Globe, Zap, ArrowUp, Crown, Trophy, Rocket, Lock, Eye, EyeOff, TrendingDown, Percent, Timer } from 'lucide-react';

const BackendIntegratedROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState('expected');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [backendProjections, setBackendProjections] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [formData, setFormData] = useState({
    // Business Metrics
    monthly_revenue: '',
    average_order_value: '',
    monthly_orders: '',
    
    // Performance Data
    industry: '',
    conversion_rate: '',
    cart_abandonment_rate: '',
    monthly_ad_spend: '',
    
    // Operations
    manual_hours_per_week: '',
    business_stage: '',
    biggest_challenges: [],
    
    // Contact Info
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    website: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  // Backend API base URL
  const API_BASE_URL = 'https://web-production-9632.up.railway.app/api';

  // Real-time calculation effect
  useEffect(() => {
    const calculateRealTime = async () => {
      if (formData.monthly_revenue && parseFloat(formData.monthly_revenue) > 0) {
        try {
          const response = await fetch(`${API_BASE_URL}/calculate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              monthly_revenue: parseFloat(formData.monthly_revenue)
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            setBackendProjections(data.projections);
          }
        } catch (error) {
          console.error('Real-time calculation error:', error);
          // Fallback to client-side calculation
          setBackendProjections(calculateFallbackProjections());
        }
      } else {
        setBackendProjections(null);
      }
    };

    const debounceTimer = setTimeout(calculateRealTime, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.monthly_revenue]);

  // Fallback calculation for when backend is unavailable
  const calculateFallbackProjections = () => {
    const revenue = parseFloat(formData.monthly_revenue) || 0;
    return {
      conservative: {
        monthly_revenue: revenue * 1.10,
        monthly_increase: revenue * 0.10,
        annual_benefit: revenue * 0.10 * 12,
        roi_percentage: 150,
        break_even_months: 6
      },
      expected: {
        monthly_revenue: revenue * 1.30,
        monthly_increase: revenue * 0.30,
        annual_benefit: revenue * 0.30 * 12,
        roi_percentage: 400,
        break_even_months: 5
      },
      optimistic: {
        monthly_revenue: revenue * 1.50,
        monthly_increase: revenue * 0.50,
        annual_benefit: revenue * 0.50 * 12,
        roi_percentage: 700,
        break_even_months: 4
      }
    };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleChallengeToggle = (challenge) => {
    setFormData(prev => ({
      ...prev,
      biggest_challenges: prev.biggest_challenges.includes(challenge)
        ? prev.biggest_challenges.filter(c => c !== challenge)
        : [...prev.biggest_challenges, challenge]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.monthly_revenue || parseFloat(formData.monthly_revenue) <= 0) {
        newErrors.monthly_revenue = 'Monthly revenue is required and must be positive';
      }
      if (!formData.average_order_value || parseFloat(formData.average_order_value) <= 0) {
        newErrors.average_order_value = 'Average order value is required and must be positive';
      }
      if (!formData.monthly_orders || parseInt(formData.monthly_orders) <= 0) {
        newErrors.monthly_orders = 'Monthly orders is required and must be positive';
      }
    }
    
    if (step === 2) {
      if (!formData.industry) {
        newErrors.industry = 'Industry selection is required';
      }
      if (!formData.conversion_rate || parseFloat(formData.conversion_rate) < 0 || parseFloat(formData.conversion_rate) > 100) {
        newErrors.conversion_rate = 'Conversion rate must be between 0 and 100';
      }
      if (!formData.cart_abandonment_rate || parseFloat(formData.cart_abandonment_rate) < 0 || parseFloat(formData.cart_abandonment_rate) > 100) {
        newErrors.cart_abandonment_rate = 'Cart abandonment rate must be between 0 and 100';
      }
      if (!formData.manual_hours_per_week || parseInt(formData.manual_hours_per_week) < 0) {
        newErrors.manual_hours_per_week = 'Manual hours per week is required';
      }
      if (!formData.business_stage) {
        newErrors.business_stage = 'Business stage is required';
      }
      if (formData.biggest_challenges.length === 0) {
        newErrors.biggest_challenges = 'Please select at least one challenge';
      }
    }
    
    if (step === 3) {
      if (!formData.first_name.trim()) {
        newErrors.first_name = 'First name is required';
      }
      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Last name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.business_name.trim()) {
        newErrors.business_name = 'Business name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowContactForm(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmissionResult(result);
        setIsSubmitted(true);
      } else {
        // Handle validation errors
        if (result.field_errors) {
          setErrors(result.field_errors);
        } else {
          alert(result.error || 'Submission failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current projections (backend or fallback)
  const projections = backendProjections || calculateFallbackProjections();
  const currentProjection = projections[selectedScenario];

  // Success popup component
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">
          {submissionResult?.message || 'Your ROI analysis has been submitted successfully!'}
        </p>
        {submissionResult && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">Your Lead Score</div>
            <div className="text-2xl font-bold text-blue-600">
              {submissionResult.lead_score}/150
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              submissionResult.tier === 'Hot' ? 'bg-red-100 text-red-800' :
              submissionResult.tier === 'Warm' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {submissionResult.tier} Lead
            </div>
          </div>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Check your email for your detailed growth blueprint and next steps.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return <SuccessPopup />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ROI Calculator</h1>
                <p className="text-sm text-gray-500">Discover your growth potential</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Step {currentStep} of 3
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Business Metrics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Metrics</h2>
                  <p className="text-gray-600">Tell us about your current business performance</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Revenue ($)
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_revenue}
                      onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.monthly_revenue ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="50000"
                    />
                    {errors.monthly_revenue && (
                      <p className="text-red-500 text-sm mt-1">{errors.monthly_revenue}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Order Value ($)
                    </label>
                    <input
                      type="number"
                      value={formData.average_order_value}
                      onChange={(e) => handleInputChange('average_order_value', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.average_order_value ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="75"
                    />
                    {errors.average_order_value && (
                      <p className="text-red-500 text-sm mt-1">{errors.average_order_value}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Orders
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_orders}
                      onChange={(e) => handleInputChange('monthly_orders', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.monthly_orders ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="667"
                    />
                    {errors.monthly_orders && (
                      <p className="text-red-500 text-sm mt-1">{errors.monthly_orders}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Performance & Operations */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance & Operations</h2>
                  <p className="text-gray-600">Help us understand your business context</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.industry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your industry</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Sports">Sports</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Health & Wellness">Health & Wellness</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conversion Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.conversion_rate}
                        onChange={(e) => handleInputChange('conversion_rate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.conversion_rate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="2.5"
                      />
                      {errors.conversion_rate && (
                        <p className="text-red-500 text-sm mt-1">{errors.conversion_rate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cart Abandonment (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.cart_abandonment_rate}
                        onChange={(e) => handleInputChange('cart_abandonment_rate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cart_abandonment_rate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="70"
                      />
                      {errors.cart_abandonment_rate && (
                        <p className="text-red-500 text-sm mt-1">{errors.cart_abandonment_rate}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Ad Spend ($) <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_ad_spend}
                        onChange={(e) => handleInputChange('monthly_ad_spend', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manual Hours/Week
                      </label>
                      <input
                        type="number"
                        value={formData.manual_hours_per_week}
                        onChange={(e) => handleInputChange('manual_hours_per_week', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.manual_hours_per_week ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="20"
                      />
                      {errors.manual_hours_per_week && (
                        <p className="text-red-500 text-sm mt-1">{errors.manual_hours_per_week}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Stage
                    </label>
                    <select
                      value={formData.business_stage}
                      onChange={(e) => handleInputChange('business_stage', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.business_stage ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select business stage</option>
                      <option value="Startup">Startup</option>
                      <option value="Growth">Growth</option>
                      <option value="Established">Established</option>
                      <option value="Mature">Mature</option>
                    </select>
                    {errors.business_stage && (
                      <p className="text-red-500 text-sm mt-1">{errors.business_stage}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Biggest Challenges (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Manual processes',
                        'Low conversion rates',
                        'High cart abandonment',
                        'Poor customer retention',
                        'Inventory management',
                        'Marketing inefficiency',
                        'Customer service issues',
                        'Data analysis challenges'
                      ].map((challenge) => (
                        <label key={challenge} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.biggest_challenges.includes(challenge)}
                            onChange={() => handleChallengeToggle(challenge)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </label>
                      ))}
                    </div>
                    {errors.biggest_challenges && (
                      <p className="text-red-500 text-sm mt-1">{errors.biggest_challenges}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                  <p className="text-gray-600">Get your personalized growth blueprint</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.first_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.last_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Smith"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                      )}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange('business_name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.business_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your Company Inc."
                    />
                    {errors.business_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.business_name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Blueprint</span>
                      <Rocket className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Growth Potential</h3>
              <p className="text-gray-600">Real-time projections based on your data</p>
            </div>

            {projections && formData.monthly_revenue ? (
              <>
                {/* Scenario Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                  {[
                    { key: 'conservative', label: 'Conservative' },
                    { key: 'expected', label: 'Expected' },
                    { key: 'optimistic', label: 'Optimistic' }
                  ].map((scenario) => (
                    <button
                      key={scenario.key}
                      onClick={() => setSelectedScenario(scenario.key)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        selectedScenario === scenario.key
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {scenario.label}
                    </button>
                  ))}
                </div>

                {/* Current Projection Display */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${currentProjection.monthly_revenue.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-600">Monthly Revenue</div>
                    <div className="text-sm text-green-600 font-medium">
                      +${currentProjection.monthly_increase.toLocaleString()} increase
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentProjection.roi_percentage}%
                      </div>
                      <div className="text-sm text-gray-600">ROI</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentProjection.break_even_months}
                      </div>
                      <div className="text-sm text-gray-600">Months to Break-even</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Annual Benefit</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${currentProjection.annual_benefit.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                    <div className="text-lg font-semibold mb-2">
                      🚀 Ready to unlock this potential?
                    </div>
                    <div className="text-sm opacity-90">
                      Complete the form to get your personalized growth blueprint
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your monthly revenue to see real-time projections
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendIntegratedROICalculator;

