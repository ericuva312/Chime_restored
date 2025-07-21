import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, ShoppingCart, Clock, Mail, User, Building, Globe, ArrowRight, Calendar } from 'lucide-react';

const API_URL = 'https://chime-roi-calculator-backend-secure-production.up.railway.app';

const LiveROICalculator = () => {
  const [formData, setFormData] = useState({
    // Business fields (Section 1)
    monthly_revenue: '',
    average_order_value: '',
    monthly_orders: '',
    conversion_rate: '',
    cart_abandonment_rate: '',
    monthly_ad_spend: '',
    manual_hours_per_week: '',
    industry: '',
    business_stage: '',
    
    // Contact fields (Section 2) - Optional
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    website: '',
    phone: ''
  });

  const [showBasicProjections, setShowBasicProjections] = useState(false);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('expected');

  // Industry options
  const industries = [
    'Fashion & Apparel', 'Electronics', 'Health & Wellness', 'Home & Garden',
    'Beauty & Cosmetics', 'Food & Beverage', 'Pet Products', 'Sports & Fitness',
    'Automotive', 'Books & Media', 'Toys & Games', 'Other'
  ];

  // Business stage options
  const businessStages = ['Startup', 'Growth', 'Established', 'Mature'];

  // Handle input changes with live updates
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check if basic fields are filled for basic projections
  useEffect(() => {
    const hasBasicData = formData.monthly_revenue && formData.industry && formData.business_stage;
    setShowBasicProjections(hasBasicData);
    
    // Check for advanced metrics (performance data)
    const hasPerformanceData = formData.conversion_rate && formData.cart_abandonment_rate && 
                              formData.monthly_ad_spend && formData.manual_hours_per_week;
    setShowAdvancedMetrics(hasBasicData && hasPerformanceData);
  }, [formData]);

  // Industry multipliers from rubric
  const getIndustryMultiplier = (industry) => {
    const multipliers = {
      'Fashion & Apparel': 1.2,
      'Electronics': 1.1,
      'Health & Wellness': 1.3,
      'Home & Garden': 1.0,
      'Beauty & Cosmetics': 1.25,
      'Food & Beverage': 1.15,
      'Pet Products': 1.1,
      'Sports & Fitness': 1.2,
      'Automotive': 1.1,
      'Books & Media': 1.0,
      'Toys & Games': 1.1,
      'Other': 1.0
    };
    return multipliers[industry] || 1.0;
  };

  // Business stage multipliers from rubric
  const getStageMultiplier = (stage) => {
    const multipliers = {
      'Startup': 0.8,
      'Growth': 1.2,
      'Established': 1.0,
      'Mature': 0.9
    };
    return multipliers[stage] || 1.0;
  };

  // Calculate projections using the rubric
  const calculateProjections = () => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const conversionRate = parseFloat(formData.conversion_rate) || 2.5;
    const cartAbandonmentRate = parseFloat(formData.cart_abandonment_rate) || 70;
    const monthlyAdSpend = parseFloat(formData.monthly_ad_spend) || 0;
    const manualHours = parseFloat(formData.manual_hours_per_week) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || monthlyRevenue / 600;
    
    const industryMultiplier = getIndustryMultiplier(formData.industry);
    const stageMultiplier = getStageMultiplier(formData.business_stage);

    const scenarios = {
      conservative: {
        // Conversion improvement: +15%
        conversionImprovement: monthlyRevenue * (15 * conversionRate / 100 / 100),
        // Cart recovery: 20%
        cartRecovery: (monthlyRevenue / (1 - cartAbandonmentRate/100)) * (cartAbandonmentRate/100) * 0.20 * (avgOrderValue / monthlyRevenue),
        // Labor savings: 40% automation
        laborSavings: manualHours * 4.33 * 0.40 * 25,
        // Ad efficiency: 15% reduction
        adSavings: monthlyAdSpend * 0.15,
        confidenceLevel: '90'
      },
      expected: {
        // Conversion improvement: +25%
        conversionImprovement: monthlyRevenue * (25 * conversionRate / 100 / 100),
        // Cart recovery: 35%
        cartRecovery: (monthlyRevenue / (1 - cartAbandonmentRate/100)) * (cartAbandonmentRate/100) * 0.35 * (avgOrderValue / monthlyRevenue),
        // Labor savings: 60% automation
        laborSavings: manualHours * 4.33 * 0.60 * 25,
        // Ad efficiency: 25% reduction
        adSavings: monthlyAdSpend * 0.25,
        confidenceLevel: '70'
      },
      optimistic: {
        // Conversion improvement: +40%
        conversionImprovement: monthlyRevenue * (40 * conversionRate / 100 / 100),
        // Cart recovery: 50%
        cartRecovery: (monthlyRevenue / (1 - cartAbandonmentRate/100)) * (cartAbandonmentRate/100) * 0.50 * (avgOrderValue / monthlyRevenue),
        // Labor savings: 75% automation
        laborSavings: manualHours * 4.33 * 0.75 * 25,
        // Ad efficiency: 40% reduction
        adSavings: monthlyAdSpend * 0.40,
        confidenceLevel: '40'
      }
    };

    // Apply multipliers and calculate totals
    Object.keys(scenarios).forEach(scenario => {
      const data = scenarios[scenario];
      const baseBenefit = data.conversionImprovement + data.cartRecovery + data.laborSavings + data.adSavings;
      const adjustedBenefit = baseBenefit * industryMultiplier * stageMultiplier;
      
      data.totalMonthlyBenefit = Math.round(adjustedBenefit);
      data.totalAnnualBenefit = Math.round(adjustedBenefit * 12);
      data.revenueIncreasePercent = Math.round((adjustedBenefit / monthlyRevenue) * 100);
      data.paybackPeriod = (7964 / adjustedBenefit).toFixed(1); // $497/month + $2000 setup
      data.hoursSavedPerWeek = Math.round(manualHours * (scenario === 'conservative' ? 0.4 : scenario === 'expected' ? 0.6 : 0.75));
      data.fteEquivalent = (data.hoursSavedPerWeek / 40).toFixed(2);
      data.monthlyCostSavings = Math.round(data.laborSavings + data.adSavings);
    });

    return scenarios;
  };

  const projections = calculateProjections();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        // Add calculated projections
        conservative_monthly_benefit: projections.conservative.totalMonthlyBenefit,
        conservative_annual_benefit: projections.conservative.totalAnnualBenefit,
        expected_monthly_benefit: projections.expected.totalMonthlyBenefit,
        expected_annual_benefit: projections.expected.totalAnnualBenefit,
        optimistic_monthly_benefit: projections.optimistic.totalMonthlyBenefit,
        optimistic_annual_benefit: projections.optimistic.totalAnnualBenefit,
        selected_scenario: selectedScenario
      };

      const response = await fetch(`${API_URL}/api/roi-calculator/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            monthly_revenue: '',
            average_order_value: '',
            monthly_orders: '',
            conversion_rate: '',
            cart_abandonment_rate: '',
            monthly_ad_spend: '',
            manual_hours_per_week: '',
            industry: '',
            business_stage: '',
            first_name: '',
            last_name: '',
            email: '',
            business_name: '',
            website: '',
            phone: ''
          });
        }, 3000);
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Calculator className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">ROI Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Chime's AI-powered automation can transform your business. 
              Get real-time projections as you enter your data.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Input Form */}
          <div className="space-y-8">
            {/* Section 1: Business Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                Business Metrics
              </h2>
              
              <div className="space-y-6">
                {/* Monthly Revenue */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Monthly Revenue
                    <span className="text-gray-500 block text-xs">Current monthly revenue</span>
                  </label>
                  <input
                    type="number"
                    value={formData.monthly_revenue}
                    onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                    placeholder="75000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-1" />
                    Industry
                    <span className="text-gray-500 block text-xs">Your business industry</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Business Stage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    Business Stage
                    <span className="text-gray-500 block text-xs">Current growth stage</span>
                  </label>
                  <select
                    value={formData.business_stage}
                    onChange={(e) => handleInputChange('business_stage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select your business stage</option>
                    {businessStages.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>

                {/* Performance Data Fields */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Data (for detailed projections)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conversion Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.conversion_rate}
                        onChange={(e) => handleInputChange('conversion_rate', e.target.value)}
                        placeholder="2.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cart Abandonment (%)
                      </label>
                      <input
                        type="number"
                        value={formData.cart_abandonment_rate}
                        onChange={(e) => handleInputChange('cart_abandonment_rate', e.target.value)}
                        placeholder="70"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Ad Spend ($)
                      </label>
                      <input
                        type="number"
                        value={formData.monthly_ad_spend}
                        onChange={(e) => handleInputChange('monthly_ad_spend', e.target.value)}
                        placeholder="5000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        placeholder="35"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Optional: Get Your Detailed Growth Analysis Report
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  ✓ You can see your results above without providing any information
                </p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Provide your contact info to receive a detailed growth analysis report with 
                industry-specific insights and implementation roadmap.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      First Name
                      <span className="text-gray-500 block text-xs">For personalized recommendations</span>
                    </label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      placeholder="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Last Name
                      <span className="text-gray-500 block text-xs">For personalized recommendations</span>
                    </label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      placeholder="Smith"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                    <span className="text-gray-500 block text-xs">To receive your detailed report</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-1" />
                    Business Name
                    <span className="text-gray-500 block text-xs">Your company name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.first_name || !formData.last_name || !formData.email || !formData.business_name}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Report...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      Get My Detailed Growth Report
                    </>
                  )}
                </button>
              </form>

              {showSuccess && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    ✓ Success! Your detailed growth analysis report has been sent to your email.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Live Projections */}
          <div className="space-y-8">
            {showBasicProjections && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                  Your Revenue Growth Projections
                </h2>

                {/* Three-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Conservative */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedScenario === 'conservative' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedScenario('conservative')}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Conservative ({projections.conservative.confidenceLevel}% confidence)
                      </h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ${projections.conservative.totalMonthlyBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
                    </div>
                  </div>

                  {/* Expected */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedScenario === 'expected' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedScenario('expected')}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Expected ({projections.expected.confidenceLevel}% confidence)
                      </h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${projections.expected.totalMonthlyBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
                    </div>
                  </div>

                  {/* Optimistic */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedScenario === 'optimistic' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedScenario('optimistic')}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Optimistic ({projections.optimistic.confidenceLevel}% confidence)
                      </h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        ${projections.optimistic.totalMonthlyBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
                    </div>
                  </div>
                </div>

                {/* Selected Scenario Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                    {selectedScenario} Scenario Details
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${projections[selectedScenario].totalMonthlyBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${projections[selectedScenario].totalAnnualBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Additional Annual Benefit</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {projections[selectedScenario].paybackPeriod} months
                      </div>
                      <div className="text-sm text-gray-600">Payback Period</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {projections[selectedScenario].revenueIncreasePercent}%
                      </div>
                      <div className="text-sm text-gray-600">Annual Revenue Increase</div>
                    </div>
                  </div>

                  {showAdvancedMetrics && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">
                        Additional ROI & Improvement Metrics
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-indigo-600">
                            {projections[selectedScenario].hoursSavedPerWeek}
                          </div>
                          <div className="text-xs text-gray-600">Hours Saved/Week</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-teal-600">
                            {projections[selectedScenario].fteEquivalent}
                          </div>
                          <div className="text-xs text-gray-600">FTE Equivalent</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-red-600">
                            ${projections[selectedScenario].monthlyCostSavings.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">Monthly Cost Savings</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-green-600">
                            {projections[selectedScenario].confidenceLevel}%
                          </div>
                          <div className="text-xs text-gray-600">Confidence Level</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!showBasicProjections && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enter Your Business Data
                </h3>
                <p className="text-gray-600">
                  Fill in your monthly revenue, industry, and business stage to see live projections
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveROICalculator;

