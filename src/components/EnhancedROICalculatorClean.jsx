import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Star, 
  CheckCircle, 
  BarChart3, 
  Globe,
  Shield,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';

const EnhancedROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Step 1: Business Metrics
    monthly_revenue: '',
    average_order_value: '',
    monthly_orders: '',
    
    // Step 2: Industry & Performance
    industry: '',
    current_conversion_rate: '',
    cart_abandonment_rate: '',
    monthly_ad_spend: '', // Optional
    
    // Step 3: Operations & Goals
    hours_week_manual_tasks: '',
    business_stage: '',
    biggest_challenges: [],
    
    // Step 4: Contact Information
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone: '', // Optional
    website: '' // Optional
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
        if (!formData.current_conversion_rate) newErrors.current_conversion_rate = 'Conversion rate is required';
        if (!formData.cart_abandonment_rate) newErrors.cart_abandonment_rate = 'Cart abandonment rate is required';
        // monthly_ad_spend is optional
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
        // phone and website are optional
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleChallengeToggle = (challenge) => {
    const currentChallenges = formData.biggest_challenges;
    if (currentChallenges.includes(challenge)) {
      updateFormData('biggest_challenges', currentChallenges.filter(c => c !== challenge));
    } else {
      updateFormData('biggest_challenges', [...currentChallenges, challenge]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Submit to HubSpot
      const hubspotResponse = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47326621/b8b1c5e1-8c4a-4b8e-9c2d-3f4e5a6b7c8d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formData.first_name },
            { name: 'lastname', value: formData.last_name },
            { name: 'email', value: formData.email },
            { name: 'company', value: formData.company },
            { name: 'phone', value: formData.phone || '' },
            { name: 'website', value: formData.website || '' },
            { name: 'monthly_revenue', value: formData.monthly_revenue },
            { name: 'average_order_value', value: formData.average_order_value },
            { name: 'monthly_orders', value: formData.monthly_orders },
            { name: 'industry', value: formData.industry },
            { name: 'current_conversion_rate', value: formData.current_conversion_rate },
            { name: 'cart_abandonment_rate', value: formData.cart_abandonment_rate },
            { name: 'monthly_ad_spend', value: formData.monthly_ad_spend || '' },
            { name: 'hours_week_manual_tasks', value: formData.hours_week_manual_tasks },
            { name: 'business_stage', value: formData.business_stage },
            { name: 'biggest_challenges', value: formData.biggest_challenges.join(', ') }
          ]
        })
      });

      if (!hubspotResponse.ok) {
        throw new Error('HubSpot submission failed');
      }

      // Also submit to our backend for email delivery and processing
      const backendResponse = await fetch('https://dyh6i3c98kdw.manus.space/api/roi-calculator-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!backendResponse.ok) {
        throw new Error('Backend submission failed');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
      // Don't set isSubmitted to true if there's an error
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Here's What Happens Next:
                </h2>

                {/* Steps */}
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email:</h3>
                      <p className="text-gray-600">
                        Within the next 5 minutes, you'll receive your personalized revenue growth report straight to your inbox. 
                        Be sure to check your spam or promotions folder just in case!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">View Your Report:</h3>
                      <p className="text-gray-600">
                        As soon as your report arrives, open it to discover your tailored growth projection and actionable insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect With Our Team:</h3>
                      <p className="text-gray-600">
                        Schedule a call with one of our growth advisors to better understand your business and refine how Chime can help you grow.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Factors */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Why 500+ Businesses Trust Chime</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">SOC 2 Certified</h4>
                      <p className="text-sm text-gray-600">Enterprise-grade security</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">99.2% Success Rate</h4>
                      <p className="text-sm text-gray-600">Proven track record</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">48-Hour Setup</h4>
                      <p className="text-sm text-gray-600">Quick implementation</p>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Our Growth Guarantee</h3>
                  <p className="text-green-700 text-center">
                    15% minimum revenue growth within 90 days, or you get your money back. No questions asked.
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a 
                    href="/#/contact" 
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Schedule a Call
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Contact Info */}
                <div className="text-center mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600">
                    Questions? Reply to your confirmation email or{' '}
                    <a href="mailto:hello@chimehq.co" className="text-blue-600 hover:text-blue-700">
                      hello@chimehq.co
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    We're excited to partner with you—get ready to see results in as little as 48 hours!
                  </p>
                </div>
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
              <span className="text-2xl font-bold text-blue-600">Chime</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[oklch(0.208_0.042_265.755)] via-[oklch(0.379_0.146_265.522)] to-[oklch(0.208_0.042_265.755)] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Calculate Your Growth Potential
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            See exactly how much revenue Chime can generate for your business. Get a personalized revenue growth projection based on your industry and business profile.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">188%</div>
              <div className="text-gray-600">Average Revenue Growth</div>
              <div className="text-sm text-gray-500">Across all client implementations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Successful Businesses</div>
              <div className="text-sm text-gray-500">Growing with Chime automation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Revenue Generated</div>
              <div className="text-sm text-gray-500">For our clients in 2024</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">99.2%</div>
              <div className="text-gray-600">Success Rate</div>
              <div className="text-sm text-gray-500">Clients achieving growth targets</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-gray-600">4.9/5 from 500+ businesses</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Growth Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>500+ Success Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>99.2% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>48-Hour Setup</span>
            </div>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
                <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Business Metrics */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Revenue *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.monthly_revenue}
                        onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50000"
                      />
                    </div>
                    {errors.monthly_revenue && <p className="text-red-500 text-sm mt-1">{errors.monthly_revenue}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Order Value *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.average_order_value}
                        onChange={(e) => updateFormData('average_order_value', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="75"
                      />
                    </div>
                    {errors.average_order_value && <p className="text-red-500 text-sm mt-1">{errors.average_order_value}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Orders *
                    </label>
                    <div className="relative">
                      <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.monthly_orders}
                        onChange={(e) => updateFormData('monthly_orders', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="667"
                      />
                    </div>
                    {errors.monthly_orders && <p className="text-red-500 text-sm mt-1">{errors.monthly_orders}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Industry & Performance */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry & Performance</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateFormData('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your industry</option>
                      <option value="fashion-apparel">Fashion & Apparel</option>
                      <option value="electronics-tech">Electronics & Technology</option>
                      <option value="health-wellness">Health & Wellness</option>
                      <option value="home-garden">Home & Garden</option>
                      <option value="beauty-cosmetics">Beauty & Cosmetics</option>
                      <option value="sports-outdoors">Sports & Outdoors</option>
                      <option value="food-beverage">Food & Beverage</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Conversion Rate (%) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.current_conversion_rate}
                      onChange={(e) => updateFormData('current_conversion_rate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2.5"
                    />
                    {errors.current_conversion_rate && <p className="text-red-500 text-sm mt-1">{errors.current_conversion_rate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cart Abandonment Rate (%) *
                    </label>
                    <input
                      type="number"
                      value={formData.cart_abandonment_rate}
                      onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="70"
                    />
                    {errors.cart_abandonment_rate && <p className="text-red-500 text-sm mt-1">{errors.cart_abandonment_rate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Ad Spend
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.monthly_ad_spend}
                        onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5000 (optional)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Operations & Goals */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Operations & Goals</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hours/Week on Manual Tasks *
                    </label>
                    <input
                      type="number"
                      value={formData.hours_week_manual_tasks}
                      onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15"
                    />
                    {errors.hours_week_manual_tasks && <p className="text-red-500 text-sm mt-1">{errors.hours_week_manual_tasks}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Stage *
                    </label>
                    <select
                      value={formData.business_stage}
                      onChange={(e) => updateFormData('business_stage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your business stage</option>
                      <option value="startup">Startup (0-2 years)</option>
                      <option value="growth">Growth (2-5 years)</option>
                      <option value="established">Established (5+ years)</option>
                      <option value="mature">Mature/Enterprise</option>
                    </select>
                    {errors.business_stage && <p className="text-red-500 text-sm mt-1">{errors.business_stage}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biggest Challenges (Select all that apply) *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'inventory_management',
                        'customer_acquisition',
                        'cart_abandonment',
                        'email_marketing',
                        'customer_retention',
                        'pricing_optimization',
                        'manual_processes',
                        'data_analysis'
                      ].map((challenge) => (
                        <label key={challenge} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.biggest_challenges.includes(challenge)}
                            onChange={() => handleChallengeToggle(challenge)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {challenge.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.biggest_challenges && <p className="text-red-500 text-sm mt-1">{errors.biggest_challenges}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => updateFormData('first_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                      {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => updateFormData('last_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Smith"
                      />
                      {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateFormData('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website URL
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => updateFormData('website', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourstore.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Calculating...' : 'Get My Revenue Growth Report'}
                </button>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>🔒 Your information is secure and will never be shared with third parties.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Calculate Your Revenue Growth
            </h2>
            <p className="text-xl text-gray-600">
              Our projections are based on real client data and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Industry Analysis</h3>
              <p className="text-gray-600">
                We analyze your industry's specific growth patterns and apply our proven multipliers based on 500+ successful implementations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Business Profile</h3>
              <p className="text-gray-600">
                Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Conservative Estimates</h3>
              <p className="text-gray-600">
                We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Guarantee Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Growth Guarantee
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">15%</div>
              <div className="text-gray-900 font-semibold">Minimum Growth Guarantee</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">90</div>
              <div className="text-gray-900 font-semibold">Days to See Results</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-900 font-semibold">Money-Back Promise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROICalculator;

