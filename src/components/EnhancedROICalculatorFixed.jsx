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
    if (!validateStep(4)) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Submit to our backend for email delivery and processing
      const backendResponse = await fetch('https://y0h0i3cq39on.manus.space/api/roi-calculator-submit', {
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
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
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

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">View Your Report:</h3>
                      <p className="text-gray-600">
                        As soon as your report arrives, open it to discover your tailored growth projection and actionable insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Connect With Our Team:</h4>
                      <p className="text-gray-600">
                        Schedule a call with one of our growth advisors to better understand your business and refine how Chime can help you grow.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center mb-8">
                  <p className="text-gray-600">
                    Questions? Reply to your confirmation email or{' '}
                    <a href="mailto:hello@chimehq.co" className="text-blue-600 hover:text-blue-800 underline">
                      hello@chimehq.co
                    </a>
                  </p>
                </div>

                {/* Trust Factors */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Why Choose Chime?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">SOC 2 Certified</p>
                      <p className="text-sm text-gray-600">Enterprise-grade security</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">500+ Success Stories</p>
                      <p className="text-sm text-gray-600">Proven track record</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">48-Hour Setup</p>
                      <p className="text-sm text-gray-600">Quick implementation</p>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Growth Guarantee</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">15%</div>
                      <p className="text-sm text-gray-600">Minimum Growth Guarantee</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">90</div>
                      <p className="text-sm text-gray-600">Days to See Results</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                      <p className="text-sm text-gray-600">Money-Back Promise</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a 
                    href="/#/contact" 
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Schedule a Call
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </a>
                </div>

                {/* Final Message */}
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-700 font-medium">
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
          onChange={(e) => updateFormData('industry', e.target.value)}
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
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Operations & Goals</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hours/Week on Manual Tasks *
        </label>
        <input
          type="number"
          placeholder="e.g., 15"
          value={formData.hours_week_manual_tasks}
          onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.hours_week_manual_tasks ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.hours_week_manual_tasks && (
          <p className="mt-1 text-sm text-red-600">{errors.hours_week_manual_tasks}</p>
        )}
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
          <option value="">Select your business stage</option>
          <option value="startup">Startup (0-1 years)</option>
          <option value="growth">Growth (1-3 years)</option>
          <option value="established">Established (3-5 years)</option>
          <option value="mature">Mature (5+ years)</option>
        </select>
        {errors.business_stage && (
          <p className="mt-1 text-sm text-red-600">{errors.business_stage}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biggest Challenges (Select all that apply) *
        </label>
        <div className="space-y-3">
          {[
            'Low conversion rates',
            'High cart abandonment',
            'Poor customer retention',
            'Manual processes taking too much time',
            'Difficulty scaling operations',
            'Inventory management issues',
            'Customer service bottlenecks',
            'Marketing attribution problems'
          ].map((challenge) => (
            <label key={challenge} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.biggest_challenges.includes(challenge)}
                onChange={() => handleChallengeToggle(challenge)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{challenge}</span>
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
          Email *
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
          Phone
        </label>
        <input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          placeholder="https://yourcompany.com"
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

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
      <div className="relative bg-gradient-to-br from-[oklch(0.208_0.042_265.755)] via-[oklch(0.379_0.146_265.522)] to-[oklch(0.208_0.042_265.755)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Calculate Your Growth Potential
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            See exactly how much revenue Chime can generate for your business. Get a personalized revenue growth projection based on your industry and business profile.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">188%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Average Revenue Growth</div>
              <div className="text-sm text-gray-600">Across all client implementations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Successful Businesses</div>
              <div className="text-sm text-gray-600">Growing with Chime automation</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Revenue Generated</div>
              <div className="text-sm text-gray-600">For our clients in 2024</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">99.2%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Success Rate</div>
              <div className="text-sm text-gray-600">Clients achieving growth targets</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="flex justify-center items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600">4.9/5 from 500+ businesses</p>
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Discover Your Growth Potential
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>500+ Success Stories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>99.2% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>48-Hour Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of 4
                </span>
                <span className="text-sm font-medium text-gray-700">
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

            {/* Form Steps */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Revenue Growth Report'}
                </button>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Your information is secure and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Business Profile</h3>
              <p className="text-gray-600">
                Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Conservative Estimates</h3>
              <p className="text-gray-600">
                We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Growth Guarantee
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">15%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Minimum Growth Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">90</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Days to See Results</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Money-Back Promise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROICalculator;

