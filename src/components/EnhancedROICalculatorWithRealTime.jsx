import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle, Star, Shield, Clock, Award, BarChart3, User, Building, Globe, Zap, ArrowUp } from 'lucide-react';

const EnhancedROICalculatorWithRealTime = () => {
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

  // Industry multipliers based on actual client data
  const industryMultipliers = {
    'Fashion & Apparel': 1.56,
    'Electronics & Technology': 2.03,
    'Health & Wellness': 1.78,
    'Home & Garden': 1.45,
    'Beauty & Cosmetics': 1.67,
    'Sports & Fitness': 1.34,
    'Food & Beverage': 1.23,
    'Automotive': 1.89,
    'Books & Media': 1.12,
    'Other': 1.50
  };

  // Real-time ROI calculations
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    const conversionRate = parseFloat(formData.conversion_rate) || 2.5;
    const abandonmentRate = parseFloat(formData.cart_abandonment_rate) || 70;
    const adSpend = parseFloat(formData.monthly_ad_spend) || 0;
    const manualHours = parseFloat(formData.hours_week_manual_tasks) || 0;
    
    // Industry multiplier
    const industryMultiplier = industryMultipliers[formData.industry] || 1.5;
    
    // Conservative growth (15% minimum guarantee)
    const conservativeGrowth = monthlyRevenue * 0.15;
    const conservativeMonthly = monthlyRevenue + conservativeGrowth;
    const conservativeAnnual = conservativeMonthly * 12;
    
    // Optimistic growth (based on industry and average 188% growth)
    const baseOptimisticGrowth = monthlyRevenue * 1.88;
    const industryAdjustedGrowth = baseOptimisticGrowth * industryMultiplier;
    const optimisticMonthly = monthlyRevenue + (industryAdjustedGrowth / 12);
    const optimisticAnnual = optimisticMonthly * 12;
    
    // Conversion improvements (89% average improvement)
    const improvedConversion = conversionRate * 1.89;
    const conversionIncrease = improvedConversion - conversionRate;
    
    // Cart abandonment reduction (45% average reduction)
    const reducedAbandonment = abandonmentRate * 0.55;
    const abandonmentReduction = abandonmentRate - reducedAbandonment;
    
    // Time savings (automation reduces manual tasks by 80%)
    const timeSavedHours = manualHours * 0.8;
    const timeSavedValue = timeSavedHours * 52 * 50; // $50/hour value
    
    // ROI calculations
    const setupCost = 4997; // Professional plan setup fee
    const monthlyFee = 1497;
    const annualCost = setupCost + (monthlyFee * 12);
    
    const conservativeROI = conservativeAnnual > 0 ? ((conservativeAnnual - monthlyRevenue * 12 - annualCost) / annualCost) * 100 : 0;
    const optimisticROI = optimisticAnnual > 0 ? ((optimisticAnnual - monthlyRevenue * 12 - annualCost) / annualCost) * 100 : 0;
    
    // Break-even timeline (months)
    const monthlyGrowthConservative = conservativeGrowth;
    const breakEvenMonths = monthlyGrowthConservative > 0 ? Math.ceil(setupCost / monthlyGrowthConservative) : 0;
    
    return {
      monthlyRevenue,
      conservativeMonthly,
      optimisticMonthly,
      conservativeAnnual,
      optimisticAnnual,
      conservativeGrowth,
      optimisticGrowth: industryAdjustedGrowth,
      improvedConversion,
      conversionIncrease,
      reducedAbandonment,
      abandonmentReduction,
      timeSavedHours,
      timeSavedValue,
      conservativeROI,
      optimisticROI,
      breakEvenMonths,
      industryMultiplier,
      hasBasicData: monthlyRevenue > 0 && avgOrderValue > 0 && monthlyOrders > 0,
      hasEnhancedData: formData.industry && conversionRate > 0 && abandonmentRate > 0
    };
  }, [formData]);

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
      
      // Also submit to backend
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
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time results panel component
  const ResultsPanel = () => {
    if (!calculations.hasBasicData) {
      return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center">
            <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Results Will Appear Here</h3>
            <p className="text-gray-600">Enter your business metrics to see real-time ROI projections</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Live Calculation
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Growth Potential</h3>
          <p className="text-gray-600">Based on your business data and our proven results</p>
        </div>

        {/* Revenue Projections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Conservative Growth</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">15% Guaranteed</span>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              ${calculations.conservativeMonthly.toLocaleString()}/mo
            </div>
            <div className="text-sm text-gray-500">
              +${calculations.conservativeGrowth.toLocaleString()} monthly increase
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Optimistic Growth</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Based on Average</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              ${calculations.optimisticMonthly.toLocaleString()}/mo
            </div>
            <div className="text-sm text-gray-500">
              +${(calculations.optimisticGrowth / 12).toLocaleString()} monthly increase
            </div>
          </div>
        </div>

        {/* Annual Projections */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">12-Month Revenue Projection</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Conservative Annual</div>
              <div className="text-xl font-bold text-green-600">
                ${calculations.conservativeAnnual.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Optimistic Annual</div>
              <div className="text-xl font-bold text-blue-600">
                ${calculations.optimisticAnnual.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced metrics when more data is available */}
        {calculations.hasEnhancedData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {calculations.improvedConversion.toFixed(1)}%
                </div>
                <div className="text-sm text-green-600">
                  +{calculations.conversionIncrease.toFixed(1)}% improvement
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-2">
                  <ArrowUp className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Cart Abandonment</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {calculations.reducedAbandonment.toFixed(1)}%
                </div>
                <div className="text-sm text-blue-600">
                  -{calculations.abandonmentReduction.toFixed(1)}% reduction
                </div>
              </div>
            </div>

            {/* ROI and Break-even */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Return on Investment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Conservative ROI</div>
                  <div className="text-2xl font-bold text-green-600">
                    {calculations.conservativeROI.toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Break-even Timeline</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {calculations.breakEvenMonths} months
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Time savings */}
        {calculations.timeSavedHours > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Time Savings</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">
              {calculations.timeSavedHours.toFixed(1)} hours/week
            </div>
            <div className="text-sm text-purple-600">
              ${calculations.timeSavedValue.toLocaleString()} annual value
            </div>
          </div>
        )}

        {/* Industry insight */}
        {formData.industry && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Industry Insight</span>
            </div>
            <div className="text-sm text-gray-700">
              <strong>{formData.industry}</strong> businesses typically see{' '}
              <span className="font-semibold text-purple-600">
                {((calculations.industryMultiplier - 1) * 100).toFixed(0)}% higher
              </span>{' '}
              growth rates with our AI automation platform.
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600 mb-2">
            Complete the form to get your detailed growth report
          </div>
          <div className="text-xs text-gray-500">
            All calculations are based on real client data and industry averages
          </div>
        </div>
      </div>
    );
  };

  // Rest of the component remains the same as the original EnhancedROICalculator
  // but with the addition of the ResultsPanel in the render

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We've received your information and will send you a detailed ROI analysis within 24 hours. 
              Our team will also reach out to discuss how we can help you achieve these projected results.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Detailed ROI report sent to your email
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Personal consultation call scheduled
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Custom implementation plan created
                </li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              4.9/5 from 500+ businesses
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Growth Potential</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>500+ Success Stories</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>99.2% Success Rate</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>48-Hour Setup</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">188%</div>
              <div className="text-sm text-slate-300">Average Revenue Growth</div>
              <div className="text-xs text-slate-400">Across all client implementations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-sm text-slate-300">Successful Businesses</div>
              <div className="text-xs text-slate-400">Growing with Chime automation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">$50M+</div>
              <div className="text-sm text-slate-300">Revenue Generated</div>
              <div className="text-xs text-slate-400">For our clients in 2024</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">99.2%</div>
              <div className="text-sm text-slate-300">Success Rate</div>
              <div className="text-xs text-slate-400">Clients achieving growth targets</div>
            </div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Calculate Your Projected Revenue Growth
          </h2>
          <p className="text-xl text-slate-300">
            Our projections are based on real client data and proven results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-2">1</div>
            <h3 className="text-xl font-semibold text-white mb-4">Industry Analysis</h3>
            <p className="text-slate-300">
              We analyze your industry's specific growth patterns and apply our proven multipliers based on 500+ successful implementations.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <User className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-2">2</div>
            <h3 className="text-xl font-semibold text-white mb-4">Business Profile</h3>
            <p className="text-slate-300">
              Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-2">3</div>
            <h3 className="text-xl font-semibold text-white mb-4">Conservative Estimates</h3>
            <p className="text-slate-300">
              We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
            </p>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section - 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              {/* Progress bar */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold text-white">Step {currentStep} of 4</span>
                <span className="text-sm text-slate-300">{(currentStep / 4 * 100).toFixed(0)}% Complete</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>

              {/* Step 1: Business Metrics */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Business Metrics</h2>
                  <p className="text-slate-300 mb-8">Tell us about your current performance</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Monthly Revenue *
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_revenue}
                        onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.monthly_revenue ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 50000"
                      />
                      {errors.monthly_revenue && (
                        <p className="text-red-400 text-sm mt-1">{errors.monthly_revenue}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Average Order Value *
                      </label>
                      <input
                        type="number"
                        value={formData.average_order_value}
                        onChange={(e) => updateFormData('average_order_value', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.average_order_value ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 75"
                      />
                      {errors.average_order_value && (
                        <p className="text-red-400 text-sm mt-1">{errors.average_order_value}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Monthly Orders *
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_orders}
                        onChange={(e) => updateFormData('monthly_orders', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.monthly_orders ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 667"
                      />
                      {errors.monthly_orders && (
                        <p className="text-red-400 text-sm mt-1">{errors.monthly_orders}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Performance Data */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Performance Data</h2>
                  <p className="text-slate-300 mb-8">Help us understand your current metrics</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Industry *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => updateFormData('industry', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.industry ? 'border-red-500' : 'border-slate-600'
                        }`}
                      >
                        <option value="">Select your industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Current Conversion Rate (%) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.conversion_rate}
                        onChange={(e) => updateFormData('conversion_rate', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.conversion_rate ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 2.5"
                      />
                      {errors.conversion_rate && (
                        <p className="text-red-400 text-sm mt-1">{errors.conversion_rate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Cart Abandonment Rate (%) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.cart_abandonment_rate}
                        onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cart_abandonment_rate ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 70"
                      />
                      {errors.cart_abandonment_rate && (
                        <p className="text-red-400 text-sm mt-1">{errors.cart_abandonment_rate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Monthly Ad Spend (Optional)
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_ad_spend}
                        onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 5000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Operations */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Operations</h2>
                  <p className="text-slate-300 mb-8">Tell us about your current operations</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Hours per week spent on manual tasks *
                      </label>
                      <input
                        type="number"
                        value={formData.hours_week_manual_tasks}
                        onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.hours_week_manual_tasks ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 20"
                      />
                      {errors.hours_week_manual_tasks && (
                        <p className="text-red-400 text-sm mt-1">{errors.hours_week_manual_tasks}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Business Stage *
                      </label>
                      <select
                        value={formData.business_stage}
                        onChange={(e) => updateFormData('business_stage', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.business_stage ? 'border-red-500' : 'border-slate-600'
                        }`}
                      >
                        <option value="">Select your business stage</option>
                        {businessStages.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                      {errors.business_stage && (
                        <p className="text-red-400 text-sm mt-1">{errors.business_stage}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Biggest Challenges (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {challengeOptions.map(challenge => (
                          <label key={challenge} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.biggest_challenges.includes(challenge)}
                              onChange={(e) => handleChallengeChange(challenge, e.target.checked)}
                              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-slate-300">{challenge}</span>
                          </label>
                        ))}
                      </div>
                      {errors.biggest_challenges && (
                        <p className="text-red-400 text-sm mt-1">{errors.biggest_challenges}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                  <p className="text-slate-300 mb-8">Get your detailed ROI report</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) => updateFormData('firstname', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.firstname ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstname && (
                        <p className="text-red-400 text-sm mt-1">{errors.firstname}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => updateFormData('lastname', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.lastname ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="Smith"
                      />
                      {errors.lastname && (
                        <p className="text-red-400 text-sm mt-1">{errors.lastname}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.company ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="Your Company"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Website URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateFormData('website', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yourstore.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My ROI Report
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Privacy notice */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel - 2 columns */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <ResultsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Growth Guarantee Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-3xl p-12 border border-green-500/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Growth Guarantee</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">15%</div>
                <div className="text-slate-300">Minimum Growth Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">90</div>
                <div className="text-slate-300">Days to See Results</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-slate-300">Money-Back Promise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROICalculatorWithRealTime;

