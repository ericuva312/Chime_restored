import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, Target, User, Mail, Building, BarChart3, Zap, Users, ShoppingCart, Send, CheckCircle, X, Calendar, Star } from 'lucide-react';
import { trackROICalculator, trackContactForm, trackEngagement } from '../utils/analytics';

const FixedROICalculatorCorrected = () => {
  console.log('🚀 FixedROICalculatorCorrected is loading and executing!');
  
  const [formData, setFormData] = useState({
    monthly_revenue: '',
    industry: '',
    business_stage: '',
    conversion_rate: '',
    cart_abandonment: '',
    ad_spend: '',
    manual_hours: '',
    first_name: '',
    last_name: '',
    email: '',
    business_name: ''
  });

  const [selectedScenario, setSelectedScenario] = useState('expected');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  
  // Live projections state
  const [showLiveProjections, setShowLiveProjections] = useState(false);
  const [liveCalculations, setLiveCalculations] = useState({});

  console.log('🔍 FixedROICalculatorCorrected formData:', formData);
  console.log('🔍 Show live projections:', showLiveProjections);

  // Track component mount and calculator start
  useEffect(() => {
    console.log('🚀 ROI Calculator component mounted');
    window.calculatorStartTime = Date.now(); // Track start time for completion duration
    trackROICalculator.start();
  }, []);

  // Track when contact form becomes visible
  useEffect(() => {
    const showContactForm = formData.monthly_revenue && formData.industry && formData.business_stage;
    if (showContactForm) {
      trackContactForm.start('roi_calculator');
    }
  }, [formData.monthly_revenue, formData.industry, formData.business_stage]);

  const handleInputChange = (field, value) => {
    console.log(`📝 FixedROICalculatorCorrected input changed: ${field} = ${value}`);
    
    // Track field completion
    const completionPercentage = calculateCompletionPercentage({ ...formData, [field]: value });
    trackROICalculator.fieldComplete(field, value, completionPercentage);
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper function to calculate completion percentage
  const calculateCompletionPercentage = (data) => {
    const requiredFields = ['monthly_revenue', 'industry', 'business_stage'];
    const optionalFields = ['conversion_rate', 'cart_abandonment', 'ad_spend', 'manual_hours'];
    const contactFields = ['first_name', 'last_name', 'email', 'business_name'];
    
    const requiredComplete = requiredFields.filter(field => data[field]).length;
    const optionalComplete = optionalFields.filter(field => data[field]).length;
    const contactComplete = contactFields.filter(field => data[field]).length;
    
    const totalFields = requiredFields.length + optionalFields.length + contactFields.length;
    const completedFields = requiredComplete + optionalComplete + contactComplete;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  // Helper function to calculate lead score
  const calculateLeadScore = (data) => {
    let score = 0;
    
    // Revenue scoring (0-40 points)
    const revenue = parseFloat(data.monthly_revenue) || 0;
    if (revenue >= 100000) score += 40;
    else if (revenue >= 50000) score += 30;
    else if (revenue >= 25000) score += 20;
    else if (revenue >= 10000) score += 10;
    
    // Industry scoring (0-20 points)
    const highValueIndustries = ['electronics', 'fashion', 'health_beauty'];
    if (highValueIndustries.includes(data.industry)) score += 20;
    else if (data.industry) score += 10;
    
    // Business stage scoring (0-20 points)
    if (data.business_stage === 'growth') score += 20;
    else if (data.business_stage === 'established') score += 15;
    else if (data.business_stage === 'startup') score += 10;
    
    // Contact info scoring (0-20 points)
    if (data.email && data.first_name) score += 15;
    if (data.business_name) score += 5;
    
    return Math.min(score, 100);
  };

  // Real-time calculations for ALL fields including performance data
  useEffect(() => {
    console.log('🔄 Real-time calculations useEffect triggered');
    
    const hasBasicFields = formData.monthly_revenue && formData.industry && formData.business_stage;
    
    if (hasBasicFields) {
      console.log('✅ Calculating real-time projections with performance data...');
      
      const revenue = parseFloat(formData.monthly_revenue) || 0;
      const conversionRate = parseFloat(formData.conversion_rate) || 2.5;
      const cartAbandonment = parseFloat(formData.cart_abandonment) || 70;
      const adSpend = parseFloat(formData.ad_spend) || 5000;
      const manualHours = parseFloat(formData.manual_hours) || 35;
      
      const industryMultipliers = {
        'Fashion & Apparel': 1.2,
        'Electronics': 1.15,
        'Health & Wellness': 1.25,
        'Home & Garden': 1.1,
        'Beauty & Cosmetics': 1.3,
        'Food & Beverage': 1.05,
        'Pet Products': 1.2,
        'Sports & Fitness': 1.15,
        'Automotive': 1.1,
        'Books & Media': 1.05,
        'Toys & Games': 1.2,
        'Other': 1.1
      };
      
      const stageMultipliers = {
        'Startup': 1.3,
        'Growth': 1.25,
        'Established': 1.15,
        'Mature': 1.1
      };
      
      const industryMultiplier = industryMultipliers[formData.industry] || 1.1;
      const stageMultiplier = stageMultipliers[formData.business_stage] || 1.1;
      
      const baseGrowth = revenue * industryMultiplier * stageMultiplier;
      const conversionImprovement = (conversionRate * 0.4 * revenue) / 100;
      const cartRecovery = (cartAbandonment * 0.3 * revenue) / 100;
      const adEfficiency = adSpend * 0.25;
      const timeValue = (manualHours * 50) * 4.33;
      
      const liveCalcs = {
        conservative: {
          monthlyGrowth: Math.round(baseGrowth * 0.15 + conversionImprovement * 0.5 + cartRecovery * 0.5 + adEfficiency * 0.5 + timeValue * 0.5),
          annualGrowth: Math.round((baseGrowth * 0.15 + conversionImprovement * 0.5 + cartRecovery * 0.5 + adEfficiency * 0.5 + timeValue * 0.5) * 12),
          paybackMonths: 1.8,
          revenueIncrease: 15,
          conversionBoost: Math.round(conversionRate * 0.3 * 10) / 10,
          cartRecoveryRate: Math.round(cartAbandonment * 0.2),
          adEfficiencyGain: Math.round(adEfficiency * 0.5),
          timeSaved: Math.round(manualHours * 0.4)
        },
        expected: {
          monthlyGrowth: Math.round(baseGrowth * 0.20 + conversionImprovement * 0.7 + cartRecovery * 0.7 + adEfficiency * 0.7 + timeValue * 0.7),
          annualGrowth: Math.round((baseGrowth * 0.20 + conversionImprovement * 0.7 + cartRecovery * 0.7 + adEfficiency * 0.7 + timeValue * 0.7) * 12),
          paybackMonths: 1.2,
          revenueIncrease: 25,
          conversionBoost: Math.round(conversionRate * 0.5 * 10) / 10,
          cartRecoveryRate: Math.round(cartAbandonment * 0.35),
          adEfficiencyGain: Math.round(adEfficiency * 0.7),
          timeSaved: Math.round(manualHours * 0.6)
        },
        optimistic: {
          monthlyGrowth: Math.round(baseGrowth * 0.30 + conversionImprovement + cartRecovery + adEfficiency + timeValue),
          annualGrowth: Math.round((baseGrowth * 0.30 + conversionImprovement + cartRecovery + adEfficiency + timeValue) * 12),
          paybackMonths: 0.8,
          revenueIncrease: 35,
          conversionBoost: Math.round(conversionRate * 0.8 * 10) / 10,
          cartRecoveryRate: Math.round(cartAbandonment * 0.5),
          adEfficiencyGain: Math.round(adEfficiency),
          timeSaved: Math.round(manualHours * 0.8)
        }
      };
      
      setLiveCalculations(liveCalcs);
      setShowLiveProjections(true);
      console.log('📊 Live calculations updated:', liveCalcs);
      
      // Track projection view
      trackROICalculator.projectionView({
        monthlyRevenue: parseFloat(formData.monthly_revenue) || 0,
        industry: formData.industry,
        businessStage: formData.business_stage,
        scenarios: liveCalcs,
        timeSavings: liveCalcs.expected?.timeSaved || 0,
        roiPercentage: liveCalcs.expected?.revenueIncrease || 0,
        leadScore: calculateLeadScore(formData)
      });
    } else {
      console.log('❌ Not enough basic fields for live projections');
      setShowLiveProjections(false);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      console.log('🚀 Submitting form data:', formData);
      
      // Track form submission attempt
      trackContactForm.submit(formData, 'roi_calculator');
      
      // Prepare data for backend
      const submitData = {
        monthly_revenue: parseFloat(formData.monthly_revenue) || 0,
        industry: formData.industry,
        business_stage: formData.business_stage,
        conversion_rate: parseFloat(formData.conversion_rate) || 2.5,
        cart_abandonment_rate: parseFloat(formData.cart_abandonment) || 70,
        monthly_ad_spend: parseFloat(formData.ad_spend) || 5000,
        manual_hours_per_week: parseFloat(formData.manual_hours) || 35,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        business_name: formData.business_name
      };

      console.log('📤 Sending to backend:', submitData);

      const response = await fetch('https://chime-roi-calculator-backend-secure-production.up.railway.app/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      console.log('📥 Backend response:', result);

      if (response.ok && result.status === 'success') {
        // Track successful form submission
        const leadScore = calculateLeadScore(formData);
        trackContactForm.success({
          leadId: result.lead_id || 'unknown',
          leadScore: leadScore,
          leadTier: leadScore >= 80 ? 'high' : leadScore >= 60 ? 'medium' : 'low',
          emailSent: result.email_sent || false,
          hubspotCreated: result.hubspot_created || false,
          estimatedValue: parseFloat(formData.monthly_revenue) * 0.35 || 0
        }, 'roi_calculator');
        
        // Track calculator completion
        trackROICalculator.complete({
          ...formData,
          completionTime: Date.now() - (window.calculatorStartTime || Date.now()),
          totalProjectedValue: parseFloat(formData.monthly_revenue) * 0.35 || 0
        }, leadScore);
        
        setSubmitSuccess(true);
        setSubmitMessage(result.message || 'Thank you! Your growth analysis is on the way.');
        setShowThankYouPopup(true);
        console.log('✅ Form submitted successfully');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      
      // Track form submission error
      trackContactForm.error({
        type: 'submission_error',
        message: error.message || 'Unknown error',
        fieldErrors: [],
        attempt: 1
      }, 'roi_calculator');
      
      setSubmitSuccess(false);
      setSubmitMessage('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if contact form should be shown
  const showContactForm = formData.monthly_revenue && formData.industry && formData.business_stage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Revenue Growth Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your business's growth potential with AI-powered automation. See real-time projections as you enter your data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Metrics Section */}
          <div className="form-section">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Business Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Monthly Revenue */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Monthly Revenue
                </label>
                <input
                  type="number"
                  value={formData.monthly_revenue}
                  onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                  className="input-field"
                  placeholder="75000"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Building className="w-4 h-4 inline mr-2" />
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select your industry</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Pet Products">Pet Products</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Books & Media">Books & Media</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Business Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Target className="w-4 h-4 inline mr-2" />
                  Business Stage
                </label>
                <select
                  value={formData.business_stage}
                  onChange={(e) => handleInputChange('business_stage', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select your business stage</option>
                  <option value="Startup">Startup</option>
                  <option value="Growth">Growth</option>
                  <option value="Established">Established</option>
                  <option value="Mature">Mature</option>
                </select>
              </div>
            </div>
          </div>

          {/* Performance Data Section */}
          <div className="form-section">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Performance Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Conversion Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.conversion_rate}
                  onChange={(e) => handleInputChange('conversion_rate', e.target.value)}
                  className="input-field"
                  placeholder="2.5"
                />
              </div>

              {/* Cart Abandonment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Cart Abandonment (%)
                </label>
                <input
                  type="number"
                  value={formData.cart_abandonment}
                  onChange={(e) => handleInputChange('cart_abandonment', e.target.value)}
                  className="input-field"
                  placeholder="70"
                />
              </div>

              {/* Monthly Ad Spend */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Monthly Ad Spend ($)
                </label>
                <input
                  type="number"
                  value={formData.ad_spend}
                  onChange={(e) => handleInputChange('ad_spend', e.target.value)}
                  className="input-field"
                  placeholder="5000"
                />
              </div>

              {/* Manual Hours */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Manual Hours/Week
                </label>
                <input
                  type="number"
                  value={formData.manual_hours}
                  onChange={(e) => handleInputChange('manual_hours', e.target.value)}
                  className="input-field"
                  placeholder="35"
                />
              </div>
            </div>
          </div>

          {/* Live Projections */}
          {showLiveProjections && (
            <div className="form-section">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                Real-time Growth Projections
              </h3>
              
              {/* Scenario Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['conservative', 'expected', 'optimistic'].map((scenario) => (
                  <button
                    key={scenario}
                    type="button"
                    onClick={() => setSelectedScenario(scenario)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedScenario === scenario
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-400 text-gray-700 hover:bg-gray-500'
                    }`}
                  >
                    {scenario === 'conservative' ? 'Low' : scenario === 'optimistic' ? 'High' : 'Expected'}
                  </button>
                ))}
              </div>

              {/* Live Results */}
              {liveCalculations[selectedScenario] && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="metric-card">
                    <div className="metric-value text-green-600">
                      +${liveCalculations[selectedScenario].monthlyGrowth?.toLocaleString()}
                    </div>
                    <div className="metric-label">Monthly Growth</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value text-blue-600">
                      {liveCalculations[selectedScenario].timeSaved}h
                    </div>
                    <div className="metric-label">Hours Saved/Week</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value text-purple-600">
                      {liveCalculations[selectedScenario].paybackMonths} months
                    </div>
                    <div className="metric-label">Payback Period</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact Form */}
          {showContactForm && (
            <div className="form-section">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Want to learn more? Get Your Detailed Growth Analysis Report
                </h3>
                <p className="text-blue-100 text-lg">
                  Enter your contact details below to get a detailed report featuring industry-specific insights and a step-by-step implementation roadmap, delivered directly to your inbox.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="input-field"
                    style={{ color: '#1f2937' }}
                    placeholder="John"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="input-field"
                    style={{ color: '#1f2937' }}
                    placeholder="Smith"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                    style={{ color: '#1f2937' }}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Building className="w-4 h-4 inline mr-2" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    className="input-field"
                    style={{ color: '#1f2937' }}
                    placeholder="Your Company"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating Your Report...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-3" />
                      Get My Detailed Growth Report
                    </span>
                  )}
                </button>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center">
                    {submitSuccess ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <X className="w-5 h-5 mr-2" />
                    )}
                    {submitMessage}
                  </div>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Thank You Popup */}
        {showThankYouPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
               style={{
                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                 backdropFilter: 'blur(8px)',
                 WebkitBackdropFilter: 'blur(8px)'
               }}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                 style={{
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                   border: '1px solid rgba(255, 255, 255, 0.2)'
                 }}>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl relative">
                <button
                  onClick={() => setShowThankYouPopup(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  style={{ transform: 'scale(1)', transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-bold mb-2">🚀 Unlock Your Business's True Potential Today</h2>
                <p className="text-blue-100 text-lg">Thank you for exploring how Chime's AI-powered automation platform can accelerate your growth.</p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">2,847+</div>
                    <div className="text-sm text-gray-600">Businesses Transformed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">35%</div>
                    <div className="text-sm text-gray-600">Average Growth</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>

                {/* What's Next */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's next?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Review your Revenue Growth Plan.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">One of our growth experts will review your data and reach out shortly to discuss tailored strategies.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Meanwhile, dive into our success stories to see how businesses like yours have soared with Chime.</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 mb-6">Ready to supercharge your business? Schedule a no-obligation strategy call with us today and take the first step toward transformational growth.</p>
                  
                  <a
                    href="https://www.chimehq.co/#/contact?utm_source=roi_calculator&utm_medium=popup&utm_campaign=thank_you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(0)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.5), 0 8px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    🚀 Schedule Your Strategy Call
                  </a>
                  
                  <p className="text-sm text-gray-500 mt-4">Free 30-minute consultation • No commitment required</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .form-section {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
          background: white;
          color: #1f2937;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .metric-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          text-align: center;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }
        
        .metric-value {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .metric-label {
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default FixedROICalculatorCorrected;

