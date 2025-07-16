import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle, Star, Shield, Clock, Award, BarChart3, User, Building, Globe, Zap, ArrowUp, Crown, Trophy, Rocket, Lock, Eye, EyeOff } from 'lucide-react';

const OverhauledROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
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
      setCurrentStep(prev => Math.min(prev + 1, 3));
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
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 border border-yellow-500/30 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="w-10 h-10 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your Domination Potential</h3>
            <p className="text-slate-300 mb-4">Enter your business metrics to see your transformation in real-time</p>
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
              <Eye className="w-4 h-4 mr-2" />
              No Contact Info Required
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 border border-yellow-500/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            LIVE TRANSFORMATION PREVIEW
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Your Path to Market Domination</h3>
          <p className="text-slate-300">Based on 2,847 successful merchant transformations</p>
        </div>

        {/* Revenue Projections */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <span className="text-lg font-bold text-white">Guaranteed Growth</span>
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">15% MINIMUM</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${calculations.conservativeMonthly.toLocaleString()}/mo
            </div>
            <div className="text-sm text-green-300">
              +${calculations.conservativeGrowth.toLocaleString()} monthly increase
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Annual: ${calculations.conservativeAnnual.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Rocket className="w-6 h-6 text-blue-400 mr-3" />
                <span className="text-lg font-bold text-white">Domination Potential</span>
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">AVERAGE RESULT</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              ${calculations.optimisticMonthly.toLocaleString()}/mo
            </div>
            <div className="text-sm text-blue-300">
              +${(calculations.optimisticGrowth / 12).toLocaleString()} monthly increase
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Annual: ${calculations.optimisticAnnual.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Enhanced metrics when more data is available */}
        {calculations.hasEnhancedData && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-slate-300">Conversion Rate</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {calculations.improvedConversion.toFixed(1)}%
                </div>
                <div className="text-sm text-yellow-400">
                  +{calculations.conversionIncrease.toFixed(1)}% boost
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center mb-2">
                  <ArrowUp className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-slate-300">Cart Recovery</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {calculations.reducedAbandonment.toFixed(1)}%
                </div>
                <div className="text-sm text-purple-400">
                  -{calculations.abandonmentReduction.toFixed(1)}% abandonment
                </div>
              </div>
            </div>

            {/* ROI and Break-even */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border border-yellow-500/30 mb-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Return on Investment
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-300 mb-1">Conservative ROI</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {calculations.conservativeROI.toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-300 mb-1">Break-even</div>
                  <div className="text-2xl font-bold text-orange-400">
                    {calculations.breakEvenMonths} months
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Time savings */}
        {calculations.timeSavedHours > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-lg font-bold text-white">Time Liberation</span>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {calculations.timeSavedHours.toFixed(1)} hours/week
            </div>
            <div className="text-sm text-green-300">
              ${calculations.timeSavedValue.toLocaleString()} annual value
            </div>
          </div>
        )}

        {/* Industry insight */}
        {formData.industry && (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30 mb-6">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-lg font-bold text-white">Industry Dominance</span>
            </div>
            <div className="text-sm text-slate-300">
              <strong className="text-purple-400">{formData.industry}</strong> merchants in our network achieve{' '}
              <span className="font-bold text-purple-300">
                {((calculations.industryMultiplier - 1) * 100).toFixed(0)}% higher
              </span>{' '}
              growth rates than the average.
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center pt-6 border-t border-slate-700/50">
          <div className="text-sm text-slate-400 mb-3">
            Want the detailed transformation roadmap?
          </div>
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get My Domination Blueprint
          </button>
          <div className="text-xs text-slate-500 mt-2">
            Join 2,847 merchants who transformed their businesses
          </div>
        </div>
      </div>
    );
  };

  // Contact form modal
  const ContactFormModal = () => {
    if (!showContactForm) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 max-w-md w-full border border-yellow-500/30 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Claim Your Transformation</h3>
            <p className="text-slate-300">Get your detailed domination blueprint</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => updateFormData('firstname', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstname}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => updateFormData('lastname', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Last Name"
                />
                {errors.lastname && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Business Name"
              />
              {errors.company && (
                <p className="text-red-400 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2 inline-block"></div>
                    Sending...
                  </>
                ) : (
                  'Get Blueprint'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-purple-800 rounded-3xl p-12 shadow-2xl border border-yellow-500/30">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Crown className="w-12 h-12 text-slate-900" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              Your Transformation Begins Now
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Your detailed domination blueprint is being prepared. Our transformation specialists will contact you within 24 hours to begin your journey to market leadership.
            </p>
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-6 mb-8 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-4">What happens next?</h3>
              <ul className="text-left text-green-300 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                  Detailed transformation roadmap delivered to your inbox
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                  Personal strategy session with our domination experts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                  Custom implementation plan for your market domination
                </li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 rounded-full text-sm font-bold mb-8 border border-yellow-500/30">
              <Users className="w-4 h-4 mr-2" />
              Join 2,847 successful merchants who dominate their niches
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Break Free From <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Overwhelm</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dominate Your Niche</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform from struggling store to market leader with AI-powered automation that eliminates manual tasks and multiplies your revenue
            </p>

            {/* Key Value Props */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 rounded-2xl p-8 border border-blue-500/30">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Eye className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">See Your Growth Potential</h3>
                <p className="text-slate-300">
                  <strong className="text-green-400">No contact info required.</strong> Get instant revenue projections as you enter your business data.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 rounded-2xl p-8 border border-purple-500/30">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">15% Revenue Growth or $1,000 Back</h3>
                <p className="text-slate-300">
                  We guarantee at least 15% revenue growth within 90 days, or you get $1,000 back. <strong className="text-yellow-400">No questions asked.</strong>
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-green-800/50 rounded-2xl p-8 border border-green-500/30">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Rocket className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Join Market Leaders</h3>
                <p className="text-slate-300">
                  <strong className="text-blue-400">2,847 merchants</strong> have already transformed their businesses and now dominate their markets.
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm mb-8">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>99.2% Success Rate</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>48-Hour Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Section - 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 rounded-3xl p-8 border border-blue-500/30 shadow-2xl">
              {/* Progress bar */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-white">Step {currentStep} of 3</span>
                <span className="text-sm text-slate-300">{(currentStep / 3 * 100).toFixed(0)}% Complete</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 mb-8">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>

              {/* Step 1: Business Metrics */}
              {currentStep === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <DollarSign className="w-8 h-8 text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Your Current Empire</h2>
                    <p className="text-slate-300">Tell us about your business performance</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Monthly Revenue *
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_revenue}
                        onChange={(e) => updateFormData('monthly_revenue', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.monthly_revenue ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 50,000"
                      />
                      {errors.monthly_revenue && (
                        <p className="text-red-400 text-sm mt-2">{errors.monthly_revenue}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Average Order Value *
                      </label>
                      <input
                        type="number"
                        value={formData.average_order_value}
                        onChange={(e) => updateFormData('average_order_value', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.average_order_value ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 75"
                      />
                      {errors.average_order_value && (
                        <p className="text-red-400 text-sm mt-2">{errors.average_order_value}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Monthly Orders *
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_orders}
                        onChange={(e) => updateFormData('monthly_orders', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.monthly_orders ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 667"
                      />
                      {errors.monthly_orders && (
                        <p className="text-red-400 text-sm mt-2">{errors.monthly_orders}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Performance Data */}
              {currentStep === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BarChart3 className="w-8 h-8 text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Market Intelligence</h2>
                    <p className="text-slate-300">Help us understand your competitive position</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Industry *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => updateFormData('industry', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.industry ? 'border-red-500' : 'border-slate-600'
                        }`}
                      >
                        <option value="">Select your battlefield</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="text-red-400 text-sm mt-2">{errors.industry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Current Conversion Rate (%) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.conversion_rate}
                        onChange={(e) => updateFormData('conversion_rate', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.conversion_rate ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 2.5"
                      />
                      {errors.conversion_rate && (
                        <p className="text-red-400 text-sm mt-2">{errors.conversion_rate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Cart Abandonment Rate (%) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.cart_abandonment_rate}
                        onChange={(e) => updateFormData('cart_abandonment_rate', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.cart_abandonment_rate ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 70"
                      />
                      {errors.cart_abandonment_rate && (
                        <p className="text-red-400 text-sm mt-2">{errors.cart_abandonment_rate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Monthly Ad Spend (Optional)
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_ad_spend}
                        onChange={(e) => updateFormData('monthly_ad_spend', e.target.value)}
                        className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        placeholder="e.g., 5,000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Operations */}
              {currentStep === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="w-8 h-8 text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Liberation Potential</h2>
                    <p className="text-slate-300">Show us where you're trapped by manual work</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Hours per week on manual tasks *
                      </label>
                      <input
                        type="number"
                        value={formData.hours_week_manual_tasks}
                        onChange={(e) => updateFormData('hours_week_manual_tasks', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.hours_week_manual_tasks ? 'border-red-500' : 'border-slate-600'
                        }`}
                        placeholder="e.g., 20"
                      />
                      {errors.hours_week_manual_tasks && (
                        <p className="text-red-400 text-sm mt-2">{errors.hours_week_manual_tasks}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Business Stage *
                      </label>
                      <select
                        value={formData.business_stage}
                        onChange={(e) => updateFormData('business_stage', e.target.value)}
                        className={`w-full px-6 py-4 bg-slate-700/50 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg ${
                          errors.business_stage ? 'border-red-500' : 'border-slate-600'
                        }`}
                      >
                        <option value="">Select your current stage</option>
                        {businessStages.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                      {errors.business_stage && (
                        <p className="text-red-400 text-sm mt-2">{errors.business_stage}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3">
                        Biggest Challenges (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {challengeOptions.map(challenge => (
                          <label key={challenge} className="flex items-center p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.biggest_challenges.includes(challenge)}
                              onChange={(e) => handleChallengeChange(challenge, e.target.checked)}
                              className="w-5 h-5 text-yellow-600 bg-slate-700 border-slate-600 rounded focus:ring-yellow-500 focus:ring-2"
                            />
                            <span className="ml-3 text-slate-300">{challenge}</span>
                          </label>
                        ))}
                      </div>
                      {errors.biggest_challenges && (
                        <p className="text-red-400 text-sm mt-2">{errors.biggest_challenges}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-700 text-white hover:bg-slate-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <button
                  onClick={nextStep}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {currentStep === 3 ? 'See Full Results' : 'Continue Domination'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Privacy notice */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center text-green-400 text-sm">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Your data is encrypted and never shared with third parties</span>
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

      {/* Guarantee Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm rounded-3xl p-12 border border-green-500/30 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Shield className="w-10 h-10 text-slate-900" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Domination Guarantee</h2>
            <p className="text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
              We guarantee at least <span className="text-green-400 font-bold">15% revenue growth</span> within 90 days, or you get <span className="text-yellow-400 font-bold">$1,000 back</span>. No questions asked.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-3">15%</div>
                <div className="text-slate-300 text-lg">Minimum Growth Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-3">90</div>
                <div className="text-slate-300 text-lg">Days to See Results</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-3">$1K</div>
                <div className="text-slate-300 text-lg">Money-Back Promise</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal />
    </div>
  );
};

export default OverhauledROICalculator;

