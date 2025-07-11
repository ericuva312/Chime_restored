import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Calculator, TrendingUp, Users, Clock } from 'lucide-react';

const EnhancedROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize formData with all fields
  const [formData, setFormData] = useState({
    monthly_revenue: '',
    average_order_value: '',
    monthly_orders: '',
    industry: '',
    current_conversion_rate: '',
    cart_abandonment_rate: '',
    monthly_ad_spend: '',
    hours_week_manual_tasks: '',
    business_stage: '',
    biggest_challenges: [],
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone: '',
    website: ''
  });

  // Robust updateFormData function
  const updateFormData = (field, value) => {
    console.log(`Updating ${field} to:`, value);
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      console.log('New formData:', newData);
      return newData;
    });
    // Clear error when user updates field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Robust industry change handler with multiple approaches
  const handleIndustryChange = (e) => {
    const value = e.target.value;
    console.log('Industry onChange triggered with value:', value);
    console.log('Event target:', e.target);
    
    // Update state immediately
    updateFormData('industry', value);
    
    // Force re-render by updating a timestamp
    setFormData(prev => ({
      ...prev,
      industry: value,
      _lastUpdate: Date.now()
    }));
  };

  // Enhanced validation with detailed logging
  const validateStep = (step) => {
    const newErrors = {};
    console.log('Validating step', step, 'with formData:', formData);
    
    switch (step) {
      case 1:
        if (!formData.monthly_revenue) newErrors.monthly_revenue = 'Monthly revenue is required';
        if (!formData.average_order_value) newErrors.average_order_value = 'Average order value is required';
        if (!formData.monthly_orders) newErrors.monthly_orders = 'Monthly orders is required';
        break;
      case 2:
        console.log('Validating industry field:', formData.industry);
        if (!formData.industry || formData.industry === '' || formData.industry === 'Select your industry') {
          newErrors.industry = 'Industry selection is required';
          console.log('Industry validation failed');
        } else {
          console.log('Industry validation passed');
        }
        if (!formData.current_conversion_rate) newErrors.current_conversion_rate = 'Conversion rate is required';
        if (!formData.cart_abandonment_rate) newErrors.cart_abandonment_rate = 'Cart abandonment rate is required';
        break;
      case 3:
        if (!formData.hours_week_manual_tasks) newErrors.hours_week_manual_tasks = 'Manual task hours is required';
        if (!formData.business_stage) newErrors.business_stage = 'Business stage is required';
        if (formData.biggest_challenges.length === 0) newErrors.biggest_challenges = 'Please select at least one challenge';
        break;
      case 4:
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.company) newErrors.company = 'Company name is required';
        break;
    }
    
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('handleNext called, current step:', currentStep);
    console.log('Validating step', currentStep, 'with formData:', formData);
    
    if (validateStep(currentStep)) {
      console.log('Validation passed, moving to next step');
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Validation failed, staying on current step');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleChallengeChange = (challenge) => {
    const currentChallenges = formData.biggest_challenges;
    const newChallenges = currentChallenges.includes(challenge)
      ? currentChallenges.filter(c => c !== challenge)
      : [...currentChallenges, challenge];
    
    updateFormData('biggest_challenges', newChallenges);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form with data:', formData);
      
      const response = await fetch('https://zmhqivcv79pd.manus.space/api/roi-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Submission result:', result);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Submission failed:', result);
        alert('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-12 text-center">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
                <p className="text-xl text-green-100">
                  Your ROI calculation has been submitted successfully.
                </p>
              </div>
              
              <div className="px-8 py-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    We're processing your personalized ROI report and will send it to your email within the next few minutes.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email</h3>
                      <p className="text-gray-600">
                        Your personalized ROI report with detailed growth projections will arrive in your inbox shortly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule Your Consultation</h3>
                      <p className="text-gray-600">
                        Our team will reach out to discuss how Chime can help you achieve these growth projections.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Growth Journey</h3>
                      <p className="text-gray-600">
                        Begin implementing Chime's automation solutions to unlock your business's full potential.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Metrics</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Revenue *
        </label>
        <input
          type="number"
          placeholder="e.g., 50000"
          value={formData.monthly_revenue}
          onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.monthly_revenue ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.monthly_revenue && (
          <p className="mt-1 text-sm text-red-600">{errors.monthly_revenue}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Average Order Value *
        </label>
        <input
          type="number"
          placeholder="e.g., 75"
          value={formData.average_order_value}
          onChange={(e) => updateFormData('average_order_value', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.average_order_value ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.average_order_value && (
          <p className="mt-1 text-sm text-red-600">{errors.average_order_value}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Orders *
        </label>
        <input
          type="number"
          placeholder="e.g., 667"
          value={formData.monthly_orders}
          onChange={(e) => updateFormData('monthly_orders', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.monthly_orders ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.monthly_orders && (
          <p className="mt-1 text-sm text-red-600">{errors.monthly_orders}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry & Performance</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry *
        </label>
        <select
          value={formData.industry}
          onChange={handleIndustryChange}
          onBlur={handleIndustryChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.industry ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your industry</option>
          <option value="fashion-apparel">Fashion & Apparel</option>
          <option value="electronics-tech">Electronics & Technology</option>
          <option value="health-wellness">Health & Wellness</option>
          <option value="beauty-cosmetics">Beauty & Cosmetics</option>
          <option value="home-garden">Home & Garden</option>
          <option value="food-beverage">Food & Beverage</option>
          <option value="pet-products">Pet Products</option>
          <option value="jewelry-accessories">Jewelry & Accessories</option>
          <option value="sports-fitness">Sports & Fitness</option>
          <option value="other">Other</option>
        </select>
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Conversion Rate (%) *
        </label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 2.5"
          value={formData.current_conversion_rate}
          onChange={(e) => updateFormData('current_conversion_rate', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.current_conversion_rate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.current_conversion_rate && (
          <p className="mt-1 text-sm text-red-600">{errors.current_conversion_rate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cart Abandonment Rate (%) *
        </label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 70"
          value={formData.cart_abandonment_rate}
          onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.cart_abandonment_rate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cart_abandonment_rate && (
          <p className="mt-1 text-sm text-red-600">{errors.cart_abandonment_rate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Ad Spend
        </label>
        <input
          type="number"
          placeholder="e.g., 5000"
          value={formData.monthly_ad_spend}
          onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">Optional - helps us provide more accurate projections</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Operations & Goals</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hours per week spent on manual tasks *
        </label>
        <select
          value={formData.hours_week_manual_tasks}
          onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.hours_week_manual_tasks ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select hours per week</option>
          <option value="0-5">0-5 hours</option>
          <option value="6-10">6-10 hours</option>
          <option value="11-20">11-20 hours</option>
          <option value="21-40">21-40 hours</option>
          <option value="40+">40+ hours</option>
        </select>
        {errors.hours_week_manual_tasks && (
          <p className="mt-1 text-sm text-red-600">{errors.hours_week_manual_tasks}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business stage *
        </label>
        <select
          value={formData.business_stage}
          onChange={(e) => updateFormData('business_stage', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.business_stage ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select business stage</option>
          <option value="startup">Startup (0-2 years)</option>
          <option value="growth">Growth (2-5 years)</option>
          <option value="established">Established (5+ years)</option>
          <option value="enterprise">Enterprise (50+ employees)</option>
        </select>
        {errors.business_stage && (
          <p className="mt-1 text-sm text-red-600">{errors.business_stage}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biggest challenges (select all that apply) *
        </label>
        <div className="space-y-3">
          {[
            'Low conversion rates',
            'High cart abandonment',
            'Poor email performance',
            'Manual processes taking too much time',
            'Difficulty scaling operations',
            'Inconsistent customer experience',
            'Limited customer data insights',
            'Ineffective marketing automation'
          ].map((challenge) => (
            <label key={challenge} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.biggest_challenges.includes(challenge)}
                onChange={() => handleChallengeChange(challenge)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{challenge}</span>
            </label>
          ))}
        </div>
        {errors.biggest_challenges && (
          <p className="mt-1 text-sm text-red-600">{errors.biggest_challenges}</p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            placeholder="John"
            value={formData.first_name}
            onChange={(e) => updateFormData('first_name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.first_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            placeholder="Smith"
            value={formData.last_name}
            onChange={(e) => updateFormData('last_name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.last_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          placeholder="Your Company"
          value={formData.company}
          onChange={(e) => updateFormData('company', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.company ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">Optional - for faster follow-up</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">Optional - helps us understand your business better</p>
      </div>
    </div>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Business Metrics';
      case 2: return 'Industry & Performance';
      case 3: return 'Operations & Goals';
      case 4: return 'Contact Information';
      default: return 'Business Metrics';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">★</span>
              ))}
            </div>
          </div>
          <p className="text-xl text-blue-200 mb-8">4.9/5 from 500+ businesses</p>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your Growth Potential
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get a personalized revenue projection based on your specific business 
            data and see exactly how Chime will transform your Shopify store
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">500+ Success Stories</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm font-medium">99.2% Success Rate</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-orange-400">
              <Clock className="w-6 h-6" />
              <span className="text-sm font-medium">48-Hour Setup</span>
            </div>
          </div>
        </div>

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of 4
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((currentStep / 4) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{getStepTitle()}</h2>
              </div>

              {getStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4" />
                        <span>Get My ROI Report</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Security Notice */}
              <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4" />
                <span>Your information is secure and will never be shared with third parties.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROICalculator;

