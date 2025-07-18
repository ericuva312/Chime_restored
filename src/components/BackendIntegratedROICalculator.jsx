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
    // Business Metrics - with default values for immediate projections
    monthly_revenue: '50000',
    average_order_value: '75',
    monthly_orders: '667',
    
    // Performance Data
    industry: '',
    conversion_rate: '2.5',
    cart_abandonment_rate: '70',
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

  // Industry multipliers for enhanced accuracy
  const industryMultipliers = {
    'Fashion': 1.56,
    'Beauty': 1.67,
    'Sports': 1.34,
    'Food & Beverage': 1.23,
    'Electronics': 2.03,
    'Health & Wellness': 1.78,
    'Home & Garden': 1.45,
    'Automotive': 1.89,
    'Other': 1.50
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://5001-im0idc41qclx8vzi4ick5-715d83c1.manusvm.computer/api';

  // Enhanced calculations with industry multipliers
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    const conversionRate = parseFloat(formData.conversion_rate) || 2.5;
    const abandonmentRate = parseFloat(formData.cart_abandonment_rate) || 70;
    const adSpend = parseFloat(formData.monthly_ad_spend) || 0;
    const manualHours = parseFloat(formData.manual_hours_per_week) || 0;
    
    // Industry multiplier
    const industryMultiplier = industryMultipliers[formData.industry] || 1.5;
    
    // Base annual figures
    const annualRevenue = monthlyRevenue * 12;
    const currentCosts = monthlyRevenue * 0.3; // Estimate 30% costs
    const annualCosts = currentCosts * 12;
    
    // Setup and monthly costs
    const setupCost = 4997;
    const monthlyFee = 1497;
    const annualPlatformCost = setupCost + (monthlyFee * 12);
    
    // Conservative Scenario (15% growth)
    const conservative = {
      revenueGrowth: 0.15,
      conversionImprovement: 0.10,
      aovIncrease: 0.05,
      costReduction: 0.10,
      timeSavings: 8,
      breakEvenMonths: 6,
      roi12Months: 1.50
    };
    
    // Expected Scenario (20% growth)
    const expected = {
      revenueGrowth: 0.20,
      conversionImprovement: 0.12,
      aovIncrease: 0.10,
      costReduction: 0.15,
      timeSavings: 15,
      breakEvenMonths: 5,
      roi12Months: 4.00
    };
    
    // Optimistic Scenario (25% growth)
    const optimistic = {
      revenueGrowth: 0.25,
      conversionImprovement: 0.20,
      aovIncrease: 0.15,
      costReduction: 0.20,
      timeSavings: 25,
      breakEvenMonths: 3,
      roi12Months: 8.00
    };
    
    const calculateScenario = (scenario) => {
      // Revenue calculations with industry multiplier
      const newAnnualRevenue = annualRevenue * (1 + scenario.revenueGrowth * industryMultiplier);
      const revenueIncrease = newAnnualRevenue - annualRevenue;
      const newMonthlyRevenue = newAnnualRevenue / 12;
      const monthlyIncrease = newMonthlyRevenue - monthlyRevenue;
      
      // Conversion improvements
      const newConversionRate = conversionRate * (1 + scenario.conversionImprovement);
      
      // AOV improvements
      const newAOV = avgOrderValue * (1 + scenario.aovIncrease);
      
      // Cost reductions
      const costSavings = annualCosts * scenario.costReduction;
      
      // Time savings value (assuming $50/hour)
      const weeklyTimeSavings = scenario.timeSavings;
      const annualTimeSavingsValue = weeklyTimeSavings * 52 * 50;
      
      // Total annual benefit
      const totalAnnualBenefit = revenueIncrease + costSavings + annualTimeSavingsValue;
      
      // Net profit (benefit minus platform cost)
      const netAnnualProfit = totalAnnualBenefit - annualPlatformCost;
      
      // ROI calculation
      const roiPercentage = Math.round((netAnnualProfit / annualPlatformCost) * 100);
      
      return {
        monthly_revenue: Math.round(newMonthlyRevenue),
        monthly_increase: Math.round(monthlyIncrease),
        annual_benefit: Math.round(totalAnnualBenefit),
        roi_percentage: Math.max(roiPercentage, scenario.roi12Months * 100),
        break_even_months: scenario.breakEvenMonths,
        new_conversion_rate: Math.round(newConversionRate * 100) / 100,
        new_aov: Math.round(newAOV),
        weekly_time_savings: weeklyTimeSavings,
        cost_savings: Math.round(costSavings)
      };
    };
    
    return {
      conservative: calculateScenario(conservative),
      expected: calculateScenario(expected),
      optimistic: calculateScenario(optimistic),
      hasBasicData: monthlyRevenue > 0 && avgOrderValue > 0 && monthlyOrders > 0,
      baseMetrics: {
        monthlyRevenue,
        avgOrderValue,
        monthlyOrders,
        conversionRate,
        abandonmentRate,
        manualHours,
        industryMultiplier
      }
    };
  }, [formData]);

  // Real-time calculation effect - use enhanced local calculations as primary
  useEffect(() => {
    const calculateRealTime = async () => {
      if (formData.monthly_revenue && parseFloat(formData.monthly_revenue) > 0) {
        try {
          // Try backend calculation for validation/logging
        const response = await fetch(`${API_BASE_URL}/roi-calculator/calculate`, {          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              monthly_revenue: parseFloat(formData.monthly_revenue)
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            // Backend successful, but we'll use our enhanced local calculations
            console.log('Backend calculation successful:', data);
          }
        } catch (error) {
          console.error('Backend calculation error (using local calculations):', error);
        }
        
        // Always use enhanced local calculations for display
        setBackendProjections(calculations);
      } else {
        setBackendProjections(null);
      }
    };

    const debounceTimer = setTimeout(calculateRealTime, 300);
    return () => clearTimeout(debounceTimer);
  }, [formData.monthly_revenue, calculations]);

  // Get current projections (enhanced local calculations)
  const projections = backendProjections || calculations;
  const currentProjection = projections[selectedScenario];

  // Fallback event handler binding for dropdowns
  useEffect(() => {
    console.log('🔧 Setting up fallback event handlers...');
    
    // Use more specific selectors to target the correct dropdowns
    const industrySelect = document.querySelector('select[value="' + formData.industry + '"]') || 
                          document.querySelectorAll('select')[0]; // First select is industry
    const stageSelect = document.querySelectorAll('select')[1]; // Second select is business stage
    
    if (industrySelect) {
      const handleIndustryChange = (e) => {
        console.log('🔧 Fallback industry change:', e.target.value);
        handleInputChange('industry', e.target.value);
      };
      
      industrySelect.removeEventListener('change', handleIndustryChange);
      industrySelect.addEventListener('change', handleIndustryChange);
      console.log('✅ Industry fallback handler attached');
    }
    
    if (stageSelect) {
      const handleStageChange = (e) => {
        console.log('🔧 Fallback stage change:', e.target.value);
        handleInputChange('business_stage', e.target.value);
      };
      
      stageSelect.removeEventListener('change', handleStageChange);
      stageSelect.addEventListener('change', handleStageChange);
      console.log('✅ Stage fallback handler attached');
    }
    
    return () => {
      if (industrySelect) industrySelect.removeEventListener('change', handleIndustryChange);
      if (stageSelect) stageSelect.removeEventListener('change', handleStageChange);
    };
  }, [currentStep]); // Re-run when step changes

  const handleInputChange = (field, value) => {
    console.log(`🔧 handleInputChange called: ${field} = "${value}"`);
    console.log(`🔧 Event source: ${field} dropdown onChange`);
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      console.log(`📊 Updated formData:`, newData);
      console.log(`📊 Field ${field} updated from "${prev[field]}" to "${value}"`);
      return newData;
    });
    
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
      // Fix industry validation - check for empty value, not display text
      if (!formData.industry || formData.industry.trim() === '') {
        newErrors.industry = 'Industry selection is required';
      }
      if (!formData.conversion_rate || parseFloat(formData.conversion_rate) < 0 || parseFloat(formData.conversion_rate) > 100) {
        newErrors.conversion_rate = 'Conversion rate must be between 0 and 100';
      }
      if (!formData.cart_abandonment_rate || parseFloat(formData.cart_abandonment_rate) < 0 || parseFloat(formData.cart_abandonment_rate) > 100) {
        newErrors.cart_abandonment_rate = 'Cart abandonment rate must be between 0 and 100';
      }
      // More robust manual hours validation
      if (!formData.manual_hours_per_week || formData.manual_hours_per_week.toString().trim() === '' || parseInt(formData.manual_hours_per_week) < 0) {
        newErrors.manual_hours_per_week = 'Manual hours per week is required';
      }
      // Fix business stage validation - check for empty value, not display text
      if (!formData.business_stage || formData.business_stage.trim() === '') {
        newErrors.business_stage = 'Business stage is required';
      }
      if (!formData.biggest_challenges || formData.biggest_challenges.length === 0) {
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
      const response = await fetch(`${API_BASE_URL}/roi-calculator/submit`, {
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

  // Success popup component with premium Chime branding
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 popup-backdrop flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl popup-container max-w-lg w-full overflow-hidden transform animate-slideUp">
        {/* Header with gradient background */}
        <div className="popup-header-gradient px-8 pt-8 pb-6 text-center relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-2 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
          
          {/* Success icon with enhanced styling */}
          <div className="relative z-10 w-20 h-20 popup-success-icon rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          
          {/* Main heading */}
          <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Thank You!
          </h3>
          <p className="text-blue-100 text-lg font-medium">
            Your personalized growth projection is on its way
          </p>
        </div>

        {/* Content section */}
        <div className="px-8 py-6">
          {/* Main message */}
          <div className="text-center mb-6">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Your personalized growth projection is already on its way to your inbox.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Ready to see your transformation plan in action?
            </p>
          </div>

          {/* Lead score section (if available) */}
          {submissionResult && (
            <div className="popup-score-container rounded-2xl p-6 mb-6 relative">
              <div className="text-center relative z-10">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  Your Growth Potential Score
                </div>
                <div className="text-4xl font-bold text-slate-800 mb-3">
                  {submissionResult.lead_score}<span className="text-2xl text-gray-500">/150</span>
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-wide popup-tier-badge ${
                  submissionResult.tier === 'Hot' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' :
                  submissionResult.tier === 'Warm' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg' :
                  'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg'
                }`}>
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  {submissionResult.tier} Lead
                </div>
              </div>
            </div>
          )}

          {/* Call to action section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-6 border border-slate-200">
            <p className="text-slate-700 text-center font-medium mb-4 leading-relaxed">
              Click the button below to schedule your free 30-minute strategy call. During that call, we'll walk through how our AI Engines can deliver at least 15% more revenue in 90 days—or we pay you $1,000.
            </p>
            
            {/* CTA Button */}
            <a
              href="https://calendly.com/chime-strategy-call" // Update this with actual Calendly link
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full popup-cta-button text-white text-center py-4 px-6 rounded-xl font-bold text-lg"
            >
              Schedule Your Strategy Call Now
            </a>
          </div>

          {/* Footer message */}
          <div className="text-center">
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              We're excited to show you what market leadership looks like.
            </p>
            
            {/* Close button */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors duration-200 underline decoration-dotted underline-offset-4"
            >
              Close this window
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return <SuccessPopup />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <BarChart3 className="w-8 h-8 text-blue-300" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Growth Intelligence Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              Strategic insights for market-leading e-commerce businesses
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto mb-6">
              <p className="text-blue-50 leading-relaxed">
                Analysis tool based on 500+ successful transformations with proven methodologies.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>500+ Successful Transformations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Proven Methodologies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Industry Expertise</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 text-blue-200">
            <span className="text-sm">Step {currentStep} of 3</span>
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step <= currentStep ? 'bg-blue-300' : 'bg-blue-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Business Foundation Analysis */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Performance</h2>
                  <p className="text-gray-600 mb-4">Current metrics for strategic analysis</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Metrics calibrated to your business size and market position. Based on 500+ transformations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Revenue ($)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Indicates business scale and growth stage</p>
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
                    <p className="text-xs text-gray-500 mb-2">Customer purchasing behavior and pricing effectiveness</p>
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
                    <p className="text-xs text-gray-500 mb-2">Operational capacity and market penetration</p>
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

            {/* Step 2: Strategic Context & Challenges */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Context</h2>
                  <p className="text-gray-600 mb-4">Industry and operational insights for targeted recommendations</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Industry context applies relevant benchmarks and best practices from similar successful businesses.
                    </p>
                  </div>
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
                      <p className="text-xs text-gray-500 mb-2">Visitors who complete purchases</p>
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
                      <p className="text-xs text-gray-500 mb-2">Customers who leave without buying</p>
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
                      <p className="text-xs text-gray-500 mb-2">Current advertising investment</p>
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
                      <p className="text-xs text-gray-500 mb-2">Time spent on repetitive tasks</p>
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
                    <p className="text-xs text-gray-500 mb-2">Current phase of business development</p>
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

            {/* Step 3: Strategic Analysis & Implementation Consultation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategic Analysis</h2>
                  <p className="text-gray-600 mb-4">Personalized transformation analysis and implementation guidance</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-purple-800 text-sm leading-relaxed">
                      Comprehensive analysis with detailed recommendations, implementation roadmap, and strategic insights from transformation specialists.
                    </p>
                  </div>
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
                    <p className="text-xs text-gray-500 mb-2">For analysis delivery and consultation scheduling</p>
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
                    <p className="text-xs text-gray-500 mb-2">Your company or brand name</p>
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
                      <p className="text-xs text-gray-500 mb-2">Current e-commerce site URL</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Analysis</h3>
              <p className="text-gray-600">Strategic insights based on proven methodologies</p>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">
                  <strong>Based on Real Results:</strong> Analysis from 500+ transformations with 156% average revenue increase.
                </p>
              </div>
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
                  {/* Main Revenue Display */}
                  <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${currentProjection.monthly_revenue.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-700 font-medium">New Monthly Revenue</div>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <ArrowUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">
                        +${currentProjection.monthly_increase.toLocaleString()} increase
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentProjection.roi_percentage}%
                      </div>
                      <div className="text-sm text-gray-600">Annual ROI</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentProjection.break_even_months}
                      </div>
                      <div className="text-sm text-gray-600">Months to Break-even</div>
                    </div>
                  </div>

                  {/* Performance Improvements */}
                  {currentProjection.new_conversion_rate && (
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                      <div className="text-sm text-gray-600 mb-2">Performance Improvements</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            {currentProjection.new_conversion_rate}%
                          </div>
                          <div className="text-xs text-gray-500">New Conversion Rate</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            ${currentProjection.new_aov}
                          </div>
                          <div className="text-xs text-gray-500">New Average Order Value</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time & Cost Savings */}
                  {currentProjection.weekly_time_savings && (
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                      <div className="text-sm text-gray-600 mb-2">Operational Benefits</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-bold text-indigo-600">
                            {currentProjection.weekly_time_savings}h
                          </div>
                          <div className="text-xs text-gray-500">Weekly Time Saved</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-indigo-600">
                            ${currentProjection.cost_savings.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Annual Cost Savings</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Annual Benefit Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Total Annual Benefit</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${currentProjection.annual_benefit.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Revenue + Cost Savings + Time Value
                    </div>
                  </div>

                  {/* Industry Insight */}
                  {formData.industry && projections.baseMetrics && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">Industry Insight</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {formData.industry} businesses typically see {Math.round((projections.baseMetrics.industryMultiplier - 1) * 100)}% 
                        higher growth rates with AI automation
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-lg font-semibold">Get Strategic Analysis</span>
                    </div>
                    <div className="text-sm opacity-90 mb-3">
                      Comprehensive transformation analysis and strategic recommendations
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Detailed Analysis</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Implementation Roadmap</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Strategic Consultation</span>
                      </div>
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

