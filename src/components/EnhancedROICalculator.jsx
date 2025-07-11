import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle, Star, Shield, Clock, Award, BarChart3, User, Building, Globe } from 'lucide-react';

const EnhancedROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    hours_week_manual_tasks: '',
    business_stage: '',
    biggest_challenges: [],
    
    // Contact Info
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    website: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const industries = [
    'Fashion & Apparel',
    'Electronics & Technology',
    'Health & Wellness',
    'Home & Garden',
    'Beauty & Cosmetics',
    'Sports & Fitness',
    'Food & Beverage',
    'Automotive',
    'Books & Media',
    'Other'
  ];

  const businessStages = [
    'Startup (0-1 years)',
    'Growth (1-3 years)',
    'Established (3-5 years)',
    'Mature (5+ years)'
  ];

  const challengeOptions = [
    'Low conversion rates',
    'High cart abandonment',
    'Poor customer retention',
    'Inefficient inventory management',
    'Limited customer insights',
    'Manual processes taking too much time',
    'Difficulty scaling operations',
    'Other'
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleChallengeChange = (challenge, checked) => {
    setFormData(prev => ({
      ...prev,
      biggest_challenges: checked 
        ? [...prev.biggest_challenges, challenge]
        : prev.biggest_challenges.filter(c => c !== challenge)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.monthly_revenue) newErrors.monthly_revenue = 'Monthly revenue is required';
        if (!formData.average_order_value) newErrors.average_order_value = 'Average order value is required';
        if (!formData.monthly_orders) newErrors.monthly_orders = 'Monthly orders is required';
        break;
      case 2:
        if (!formData.industry) newErrors.industry = 'Industry selection is required';
        if (!formData.conversion_rate) newErrors.conversion_rate = 'Conversion rate is required';
        if (!formData.cart_abandonment_rate) newErrors.cart_abandonment_rate = 'Cart abandonment rate is required';
        // Monthly ad spend is now optional
        break;
      case 3:
        if (!formData.hours_week_manual_tasks) newErrors.hours_week_manual_tasks = 'Hours per week is required';
        if (!formData.business_stage) newErrors.business_stage = 'Business stage is required';
        if (formData.biggest_challenges.length === 0) newErrors.biggest_challenges = 'Please select at least one challenge';
        break;
      case 4:
        if (!formData.firstname) newErrors.firstname = 'First name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.company) newErrors.company = 'Business name is required';
        // Website URL and phone are now optional
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit to HubSpot
      await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47326621/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formData.firstname },
            { name: 'lastname', value: formData.lastname },
            { name: 'email', value: formData.email },
            { name: 'company', value: formData.company },
            { name: 'website', value: formData.website },
            { name: 'phone', value: formData.phone },
            { name: 'monthly_revenue', value: formData.monthly_revenue },
            { name: 'average_order_value', value: formData.average_order_value },
            { name: 'monthly_orders', value: formData.monthly_orders },
            { name: 'industry', value: formData.industry },
            { name: 'conversion_rate', value: formData.conversion_rate },
            { name: 'cart_abandonment_rate', value: formData.cart_abandonment_rate },
            { name: 'monthly_ad_spend', value: formData.monthly_ad_spend },
            { name: 'hours_week_manual_tasks', value: formData.hours_week_manual_tasks },
            { name: 'business_stage', value: formData.business_stage },
            { name: 'biggest_challenges', value: formData.biggest_challenges.join(', ') }
          ]
        }),
        mode: 'no-cors'
      });
      
      // Also submit to our backend
      try {
        await fetch('https://kkh7ikclq901.manus.space/api/roi-calculator-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.firstname,
            last_name: formData.lastname,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            monthly_revenue: formData.monthly_revenue,
            average_order_value: formData.average_order_value,
            monthly_orders: formData.monthly_orders,
            industry: formData.industry.toLowerCase().replace(/\s+/g, '-').replace('&', ''),
            current_conversion_rate: formData.conversion_rate,
            cart_abandonment_rate: formData.cart_abandonment_rate,
            monthly_ad_spend: formData.monthly_ad_spend,
            hours_week_manual_tasks: formData.hours_week_manual_tasks,
            business_stage: formData.business_stage,
            biggest_challenges: formData.biggest_challenges
          })
        });
      } catch (backendError) {
        console.log('Backend submission failed, but HubSpot submission succeeded');
      }
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Chime</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Thank You Content */}
        <div className="bg-white min-h-screen">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[oklch(0.208_0.042_265.755)] via-[oklch(0.379_0.146_265.522)] to-[oklch(0.208_0.042_265.755)] text-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Thank You for Submitting Your Revenue Growth Indicators!
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                We've received your information and are excited to help you unlock your business's growth potential.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Here's What Happens Next:
                </h2>
                
                {/* Steps */}
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email:</h3>
                      <p className="text-gray-600">
                        Within the next 5 minutes, you'll receive your personalized revenue growth report straight to your inbox. 
                        Be sure to check your spam or promotions folder just in case!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">View Your Report:</h3>
                      <p className="text-gray-600">
                        As soon as your report arrives, open it to discover your tailored growth projection and actionable insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Connect With Our Team:</h4>
                      <p className="text-gray-600 mb-4">
                        Schedule a call with one of our growth advisors to better understand your business and refine how Chime can help you grow.
                      </p>
                      <a 
                        href="/#/contact" 
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Schedule a Call
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Factors */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Businesses Trust Chime</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">SOC 2 Certified</h4>
                    <p className="text-gray-600 text-sm">Enterprise-grade security and compliance</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">500+ Success Stories</h4>
                    <p className="text-gray-600 text-sm">Proven results across industries</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">48-Hour Setup</h4>
                    <p className="text-gray-600 text-sm">Quick implementation, fast results</p>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12 border border-blue-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Growth Guarantee</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">15%</div>
                      <div className="text-sm text-gray-600">Minimum Growth Guarantee</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">90</div>
                      <div className="text-sm text-gray-600">Days to See Results</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-gray-600">Money-Back Promise</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Questions? Reply to your confirmation email or{' '}
                  <a 
                    href="mailto:hello@chimehq.co" 
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    hello@chimehq.co
                  </a>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  We're excited to partner with you—get ready to see results in as little as 48 hours!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Chime</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Solutions</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Industries</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Implementation</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Case Studies</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Revenue Growth Calculator</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[oklch(0.208_0.042_265.755)] via-[oklch(0.379_0.146_265.522)] to-[oklch(0.208_0.042_265.755)] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Calculate Your <span className="text-blue-400">Growth Potential</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
            See exactly how much revenue Chime can generate for your business. Get a personalized Revenue Growth projection based on your industry and business profile.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">188%</div>
              <div className="text-sm text-gray-300">Average Revenue Growth</div>
              <div className="text-xs text-gray-400 mt-1">Across all client implementations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-300">Successful Businesses</div>
              <div className="text-xs text-gray-400 mt-1">Growing with Chime automation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">$50M+</div>
              <div className="text-sm text-gray-300">Revenue Generated</div>
              <div className="text-xs text-gray-400 mt-1">For our clients in 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">99.2%</div>
              <div className="text-sm text-gray-300">Success Rate</div>
              <div className="text-xs text-gray-400 mt-1">Clients achieving growth targets</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="ml-2 text-white">4.9/5 from 500+ businesses</span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your <span className="text-blue-600">Growth Potential</span>
            </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-gray-700 font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">500+ Success Stories</span>
            </div>
            <div className="flex items-center">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              <span className="text-gray-700 font-medium">99.2% Success Rate</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-orange-600 mr-2" />
              <span className="text-gray-700 font-medium">48-Hour Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-slate-800 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calculator className="w-8 h-8 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">Revenue Growth Calculator</h3>
                    <p className="text-slate-300">Powered by data from 500+ successful Shopify implementations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-300">Step {currentStep} of 4</div>
                  <div className="text-lg font-semibold">{getStepProgress().toFixed(0)}% Complete</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span className={currentStep >= 1 ? 'text-white font-medium' : ''}>Business Metrics</span>
                  <span className={currentStep >= 2 ? 'text-white font-medium' : ''}>Performance Data</span>
                  <span className={currentStep >= 3 ? 'text-white font-medium' : ''}>Operations</span>
                  <span className={currentStep >= 4 ? 'text-white font-medium' : ''}>Contact Info</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getStepProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Step 1: Business Metrics */}
              {currentStep === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Current Business Performance
                    </h3>
                    <p className="text-gray-600">
                      Help us understand your current revenue and order patterns
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Revenue *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.monthly_revenue}
                          onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
                          placeholder="50,000"
                          className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.monthly_revenue ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.monthly_revenue && (
                        <p className="text-red-500 text-sm mt-1">{errors.monthly_revenue}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Your total monthly revenue</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Order Value *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.average_order_value}
                          onChange={(e) => updateFormData('average_order_value', e.target.value)}
                          placeholder="75"
                          className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.average_order_value ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.average_order_value && (
                        <p className="text-red-500 text-sm mt-1">{errors.average_order_value}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Average amount per order</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Orders *
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_orders}
                        onChange={(e) => updateFormData('monthly_orders', e.target.value)}
                        placeholder="667"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.monthly_orders ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.monthly_orders && (
                        <p className="text-red-500 text-sm mt-1">{errors.monthly_orders}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Total orders per month</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Why we need this data</h4>
                    <p className="text-blue-700 text-sm">
                      These metrics help us calculate your exact growth potential and create a personalized automation strategy. 
                      All data is encrypted and never shared.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Performance Data */}
              {currentStep === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Industry & Performance Metrics
                    </h3>
                    <p className="text-gray-600">
                      Tell us about your industry and current performance indicators
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => updateFormData('industry', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.industry ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Conversion Rate *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={formData.conversion_rate}
                            onChange={(e) => updateFormData('conversion_rate', e.target.value)}
                            placeholder="2.5"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.conversion_rate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <span className="absolute right-3 top-3 text-gray-500">%</span>
                        </div>
                        {errors.conversion_rate && (
                          <p className="text-red-500 text-sm mt-1">{errors.conversion_rate}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Website visitors who make a purchase</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cart Abandonment Rate *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={formData.cart_abandonment_rate}
                            onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
                            placeholder="70"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.cart_abandonment_rate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <span className="absolute right-3 top-3 text-gray-500">%</span>
                        </div>
                        {errors.cart_abandonment_rate && (
                          <p className="text-red-500 text-sm mt-1">{errors.cart_abandonment_rate}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Customers who add to cart but don't purchase</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Ad Spend
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.monthly_ad_spend}
                          onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
                          placeholder="5,000"
                          className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.monthly_ad_spend ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.monthly_ad_spend && (
                        <p className="text-red-500 text-sm mt-1">{errors.monthly_ad_spend}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Total monthly advertising budget</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Operations */}
              {currentStep === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Operations & Goals
                    </h3>
                    <p className="text-gray-600">
                      Help us understand your current operations and growth objectives
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hours/Week on Manual Tasks *
                        </label>
                        <input
                          type="number"
                          value={formData.hours_week_manual_tasks}
                          onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
                          placeholder="20"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.hours_week_manual_tasks ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.hours_week_manual_tasks && (
                          <p className="text-red-500 text-sm mt-1">{errors.hours_week_manual_tasks}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Time spent on repetitive tasks</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Stage *
                        </label>
                        <select
                          value={formData.business_stage}
                          onChange={(e) => updateFormData('business_stage', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.business_stage ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select business stage</option>
                          {businessStages.map((stage) => (
                            <option key={stage} value={stage}>
                              {stage}
                            </option>
                          ))}
                        </select>
                        {errors.business_stage && (
                          <p className="text-red-500 text-sm mt-1">{errors.business_stage}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Biggest Challenges * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {challengeOptions.map((challenge) => (
                          <label key={challenge} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.biggest_challenges.includes(challenge)}
                              onChange={(e) => handleChallengeChange(challenge, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{challenge}</span>
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

              {/* Step 4: Contact Info */}
              {currentStep === 4 && (
                <div>
                  <div className="text-center mb-8">
                    <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Contact Information
                    </h3>
                    <p className="text-gray-600">
                      We'll send your personalized Revenue Growth report to this email
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstname}
                          onChange={(e) => updateFormData('firstname', e.target.value)}
                          placeholder="John"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.firstname ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstname && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastname}
                          onChange={(e) => updateFormData('lastname', e.target.value)}
                          placeholder="Smith"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.lastname ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastname && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => updateFormData('company', e.target.value)}
                          placeholder="Your Business Name"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.company ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website URL
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => updateFormData('website', e.target.value)}
                          placeholder="https://yourstore.com"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.website ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.website && (
                        <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Calculating...' : 'Get My Revenue Growth Report'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>

              {/* Security Notice */}
              <div className="text-center mt-6 text-sm text-gray-500">
                🔒 Your data is encrypted and secure • Used by 500+ successful Shopify stores • SOC 2 certified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Calculate Your Revenue Growth</h2>
            <p className="text-xl text-gray-600">Our projections are based on real client data and proven results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Analysis</h3>
              <p className="text-gray-600">
                We analyze your industry's specific growth patterns and apply our proven multipliers based on 500+ successful implementations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Profile</h3>
              <p className="text-gray-600">
                Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservative Estimates</h3>
              <p className="text-gray-600">
                We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Guarantee Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Growth Guarantee</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-50 rounded-xl p-8">
              <div className="text-5xl font-bold text-green-600 mb-2">15%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Minimum Growth Guarantee</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-8">
              <div className="text-5xl font-bold text-blue-600 mb-2">90</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Days to See Results</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-8">
              <div className="text-5xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Money-Back Promise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROICalculator;

