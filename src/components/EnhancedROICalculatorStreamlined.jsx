import React, { useState, useCallback } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Star, 
  CheckCircle, 
  BarChart3, 
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const EnhancedROICalculatorStreamlined = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Step 1: Business Metrics
    monthly_revenue: '',
    average_order_value: '',
    monthly_orders: '',
    
    // Step 2: Business Category & Performance
    business_category: '',
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

  const updateFormData = useCallback((field, value) => {
    console.log(`Updating ${field} to:`, value);
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      console.log('New formData:', newData);
      return newData;
    });
    
    // Clear any existing errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.monthly_revenue) newErrors.monthly_revenue = 'Monthly revenue is required';
        if (!formData.average_order_value) newErrors.average_order_value = 'Average order value is required';
        if (!formData.monthly_orders) newErrors.monthly_orders = 'Monthly orders is required';
        break;
      case 2:
        if (!formData.business_category) newErrors.business_category = 'Business category is required';
        if (!formData.current_conversion_rate) newErrors.current_conversion_rate = 'Current conversion rate is required';
        if (!formData.cart_abandonment_rate) newErrors.cart_abandonment_rate = 'Cart abandonment rate is required';
        break;
      case 3:
        if (!formData.hours_week_manual_tasks) newErrors.hours_week_manual_tasks = 'Manual tasks hours is required';
        if (!formData.business_stage) newErrors.business_stage = 'Business stage is required';
        if (formData.biggest_challenges.length === 0) newErrors.biggest_challenges = 'At least one challenge must be selected';
        break;
      case 4:
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.company) newErrors.company = 'Company name is required';
        break;
    }
    
    console.log(`Validating step ${step} with formData:`, formData);
    console.log('Validation errors:', newErrors);
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);
      
      // Map business_category to industry for backend compatibility
      const submissionData = {
        ...formData,
        industry: formData.business_category
      };
      
      // Submit to backend API
      const response = await fetch('https://chime-roi-backend-production.up.railway.app/api/roi-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Submission result:', result);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChallengeChange = (challenge) => {
    const currentChallenges = formData.biggest_challenges || [];
    const updatedChallenges = currentChallenges.includes(challenge)
      ? currentChallenges.filter(c => c !== challenge)
      : [...currentChallenges, challenge];
    
    updateFormData('biggest_challenges', updatedChallenges);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Thank You!
              </h1>
              
              <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
                We've received your information and are excited to help you unlock your business's growth potential.
              </p>
              
              <div className="bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-12">
                <h2 className="text-3xl font-bold text-white mb-8">Here's What Happens Next:</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-400">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Check Your Email</h3>
                    <p className="text-blue-100">
                      For instant access to your revenue generation report and personalized growth projections.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-400">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">View Your Report</h3>
                    <p className="text-blue-100">
                      As soon as your report arrives, open it to discover your tailored growth projection and actionable insights.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-400">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Connect With Our Team</h3>
                    <p className="text-blue-100">
                      One of our experts will reach out to review your results, answer any questions, and discuss your next steps for getting started with Chime.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-3xl p-8 border border-white/20 mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Schedule a Strategy Call and get started with Chime today.
                </p>
                <p className="text-lg text-blue-100">
                  Questions? Reply to your confirmation email or contact us at <a href="mailto:hello@chimehq.co" className="text-blue-400 hover:text-blue-300 underline">hello@chimehq.co</a>.
                </p>
                <p className="text-lg text-blue-100 mt-4">
                  We're excited to partner with you—get ready to see results in as little as 48 hours!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="https://chimehq.co/#/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Strategy Call
                </a>
                <a 
                  href="https://chimehq.co/#/implementation" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 border border-white/30"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More
                </a>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-blue-200 text-sm flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Business Metrics</h2>
        <p className="text-blue-100 text-lg">Tell us about your current performance</p>
      </div>
      
      <div className="grid gap-8">
        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Monthly Revenue *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-6 h-6" />
            <input
              type="number"
              placeholder="e.g., 50000"
              value={formData.monthly_revenue}
              onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
          </div>
          {errors.monthly_revenue && <p className="text-red-400 text-sm mt-2">{errors.monthly_revenue}</p>}
        </div>

        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Average Order Value *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-6 h-6" />
            <input
              type="number"
              placeholder="e.g., 75"
              value={formData.average_order_value}
              onChange={(e) => updateFormData('average_order_value', e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
          </div>
          {errors.average_order_value && <p className="text-red-400 text-sm mt-2">{errors.average_order_value}</p>}
        </div>

        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Monthly Orders *
          </label>
          <div className="relative">
            <BarChart3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-6 h-6" />
            <input
              type="number"
              placeholder="e.g., 667"
              value={formData.monthly_orders}
              onChange={(e) => updateFormData('monthly_orders', e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
          </div>
          {errors.monthly_orders && <p className="text-red-400 text-sm mt-2">{errors.monthly_orders}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Business Details</h2>
        <p className="text-blue-100 text-lg">Help us understand your industry and performance</p>
      </div>
      
      <div className="grid gap-8">
        <div>
          <label className="block text-white font-semibold mb-4 text-lg">
            Business Category *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'fashion-apparel', label: 'Fashion & Apparel' },
              { value: 'electronics-tech', label: 'Electronics & Technology' },
              { value: 'health-wellness', label: 'Health & Wellness' },
              { value: 'beauty-cosmetics', label: 'Beauty & Cosmetics' },
              { value: 'home-garden', label: 'Home & Garden' },
              { value: 'food-beverage', label: 'Food & Beverage' },
              { value: 'pet-products', label: 'Pet Products' },
              { value: 'jewelry-accessories', label: 'Jewelry & Accessories' },
              { value: 'sports-fitness', label: 'Sports & Fitness' },
              { value: 'other', label: 'Other' }
            ].map((category) => (
              <label key={category.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="business_category"
                  value={category.value}
                  checked={formData.business_category === category.value}
                  onChange={(e) => updateFormData('business_category', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.business_category === category.value
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-300 hover:bg-white/10'
                }`}>
                  <span className="font-medium">{category.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.business_category && <p className="text-red-400 text-sm mt-2">{errors.business_category}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Current Conversion Rate (%) *
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 2.5"
              value={formData.current_conversion_rate}
              onChange={(e) => updateFormData('current_conversion_rate', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            {errors.current_conversion_rate && <p className="text-red-400 text-sm mt-2">{errors.current_conversion_rate}</p>}
          </div>

          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Cart Abandonment Rate (%) *
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 70"
              value={formData.cart_abandonment_rate}
              onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            {errors.cart_abandonment_rate && <p className="text-red-400 text-sm mt-2">{errors.cart_abandonment_rate}</p>}
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Monthly Ad Spend (Optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-6 h-6" />
            <input
              type="number"
              placeholder="e.g., 5000"
              value={formData.monthly_ad_spend}
              onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Operations & Goals</h2>
        <p className="text-blue-100 text-lg">Tell us about your current operations and challenges</p>
      </div>
      
      <div className="grid gap-8">
        <div>
          <label className="block text-white font-semibold mb-4 text-lg">
            Hours per week on manual tasks *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: '0-5', label: '0-5 hours' },
              { value: '6-10', label: '6-10 hours' },
              { value: '11-20', label: '11-20 hours' },
              { value: '21-40', label: '21-40 hours' },
              { value: '40+', label: '40+ hours' }
            ].map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="hours_week_manual_tasks"
                  value={option.value}
                  checked={formData.hours_week_manual_tasks === option.value}
                  onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.hours_week_manual_tasks === option.value
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-300 hover:bg-white/10'
                }`}>
                  <span className="font-medium">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.hours_week_manual_tasks && <p className="text-red-400 text-sm mt-2">{errors.hours_week_manual_tasks}</p>}
        </div>

        <div>
          <label className="block text-white font-semibold mb-4 text-lg">
            Business stage *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'startup', label: 'Startup (0-2 years)' },
              { value: 'growth', label: 'Growth (2-5 years)' },
              { value: 'established', label: 'Established (5+ years)' },
              { value: 'enterprise', label: 'Enterprise (50+ employees)' }
            ].map((stage) => (
              <label key={stage.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="business_stage"
                  value={stage.value}
                  checked={formData.business_stage === stage.value}
                  onChange={(e) => updateFormData('business_stage', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.business_stage === stage.value
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-300 hover:bg-white/10'
                }`}>
                  <span className="font-medium">{stage.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.business_stage && <p className="text-red-400 text-sm mt-2">{errors.business_stage}</p>}
        </div>

        <div>
          <label className="block text-white font-semibold mb-4 text-lg">
            Biggest challenges (select all that apply) *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <label key={challenge} className="relative cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.biggest_challenges.includes(challenge)}
                  onChange={() => handleChallengeChange(challenge)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.biggest_challenges.includes(challenge)
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-300 hover:bg-white/10'
                }`}>
                  <span className="font-medium">{challenge}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.biggest_challenges && <p className="text-red-400 text-sm mt-2">{errors.biggest_challenges}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
        <p className="text-blue-100 text-lg">Get your personalized ROI report</p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              First Name *
            </label>
            <input
              type="text"
              placeholder="John"
              value={formData.first_name}
              onChange={(e) => updateFormData('first_name', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            {errors.first_name && <p className="text-red-400 text-sm mt-2">{errors.first_name}</p>}
          </div>

          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="Smith"
              value={formData.last_name}
              onChange={(e) => updateFormData('last_name', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            {errors.last_name && <p className="text-red-400 text-sm mt-2">{errors.last_name}</p>}
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
          />
          {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white font-semibold mb-3 text-lg">
            Company Name *
          </label>
          <input
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={(e) => updateFormData('company', e.target.value)}
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
          />
          {errors.company && <p className="text-red-400 text-sm mt-2">{errors.company}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            <p className="text-blue-200 text-sm mt-2">Optional - for faster follow-up</p>
          </div>

          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={(e) => updateFormData('website', e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg backdrop-blur-sm"
            />
            <p className="text-blue-200 text-sm mt-2">Optional - helps us understand your business better</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600/20 p-4 rounded-2xl">
                <Calculator className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center bg-white/10 rounded-full px-6 py-2 border border-white/20">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-semibold">4.9/5 from 500+ businesses</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your <span className="text-blue-400">Growth Potential</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
            </p>
            
            {/* Trust Elements */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                <span>500+ Success Stories</span>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 text-blue-400 mr-2" />
                <span>99.2% Success Rate</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <span>48-Hour Setup</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">188%</div>
                <div className="text-blue-100">Average Revenue Growth</div>
                <div className="text-sm text-blue-200">Across all client implementations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-blue-100">Successful Businesses</div>
                <div className="text-sm text-blue-200">Growing with Chime automation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">$50M+</div>
                <div className="text-blue-100">Revenue Generated</div>
                <div className="text-sm text-blue-200">For our clients in 2024</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">99.2%</div>
                <div className="text-blue-100">Success Rate</div>
                <div


className="text-sm text-blue-200">Clients achieving growth targets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Calculate Your Projected Revenue Growth Section - Moved above form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How We Calculate Your Projected Revenue Growth</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our projections are based on real client data and proven results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-4">1</div>
              <h3 className="text-xl font-bold text-white mb-4">Industry Analysis</h3>
              <p className="text-blue-100">
                We analyze your industry's specific growth patterns and apply our proven multipliers based on 500+ successful implementations.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-4">2</div>
              <h3 className="text-xl font-bold text-white mb-4">Business Profile</h3>
              <p className="text-blue-100">
                Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-4">3</div>
              <h3 className="text-xl font-bold text-white mb-4">Conservative Estimates</h3>
              <p className="text-blue-100">
                We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">Step {currentStep} of 4</span>
              <span className="text-blue-200">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Steps */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/20">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:scale-105'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate my Report →
                  </>
                )}
              </button>
            )}
          </div>

          {/* Security Notice */}
          <div className="text-center mt-8">
            <p className="text-blue-200 text-sm flex items-center justify-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Your information is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
        </div>
      </section>





      {/* Growth Guarantee Section - Moved below form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 rounded-3xl p-12 border border-white/20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Our Growth Guarantee</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
                We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-400 mb-4">15%</div>
                  <div className="text-xl font-semibold text-white mb-2">Minimum Growth Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-400 mb-4">90</div>
                  <div className="text-xl font-semibold text-white mb-2">Days to See Results</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-400 mb-4">100%</div>
                  <div className="text-xl font-semibold text-white mb-2">Money-Back Promise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedROICalculatorStreamlined;

/* Force deployment Fri Jul 11 12:18:50 EDT 2025 */
// Force Vercel deployment Fri Jul 11 12:42:18 EDT 2025
// Cache bust 1752254832
// Auto-deployment test Fri Jul 11 13:32:52 EDT 2025
// Auto-deployment test 2 Fri Jul 11 13:36:31 EDT 2025
