import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, ShoppingCart, Clock, Mail, User, Building, Globe, ArrowRight, Calendar } from 'lucide-react';

const NewROICalculator = () => {
  const [formData, setFormData] = useState({
    // Business fields (Section 1)
    monthly_revenue: '75000',
    average_order_value: '125',
    monthly_orders: '600',
    conversion_rate: '2.5',
    cart_abandonment_rate: '70',
    monthly_ad_spend: '5000',
    manual_hours_per_week: '35',
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

  const [showResults, setShowResults] = useState(false);
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

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate results using approved rubric
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const averageOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    const conversionRate = parseFloat(formData.conversion_rate) || 0;
    const cartAbandonmentRate = parseFloat(formData.cart_abandonment_rate) || 0;
    const monthlyAdSpend = parseFloat(formData.monthly_ad_spend) || 0;
    const manualHoursPerWeek = parseFloat(formData.manual_hours_per_week) || 0;
    
    // Industry multipliers
    const industryMultipliers = {
      'Fashion & Apparel': 1.2,
      'Electronics': 1.1,
      'Health & Wellness': 1.3,
      'Home & Garden': 1.0,
      'Beauty & Cosmetics': 1.25,
      'Food & Beverage': 1.15,
      'Pet Products': 1.1,
      'Sports & Fitness': 1.2,
      'Automotive': 1.0,
      'Books & Media': 1.0,
      'Toys & Games': 1.1,
      'Other': 1.0
    };
    
    // Business stage multipliers
    const stageMultipliers = {
      'Startup': 0.8,
      'Growth': 1.2,
      'Established': 1.0,
      'Mature': 0.9
    };
    
    const industryMultiplier = industryMultipliers[formData.industry] || 1.0;
    const stageMultiplier = stageMultipliers[formData.business_stage] || 1.0;
    
    // Scenario definitions
    const scenarios = {
      conservative: {
        conversionImprovement: 0.15,
        cartRecoveryRate: 0.20,
        clvIncrease: 0.10,
        automationRate: 0.40,
        adEfficiencyGain: 0.15,
        confidenceLevel: 90
      },
      expected: {
        conversionImprovement: 0.25,
        cartRecoveryRate: 0.35,
        clvIncrease: 0.20,
        automationRate: 0.60,
        adEfficiencyGain: 0.25,
        confidenceLevel: 70
      },
      optimistic: {
        conversionImprovement: 0.40,
        cartRecoveryRate: 0.50,
        clvIncrease: 0.35,
        automationRate: 0.75,
        adEfficiencyGain: 0.40,
        confidenceLevel: 40
      }
    };
    
    const calculateScenario = (scenario) => {
      // 1. Conversion Rate Optimization
      const conversionRevenue = monthlyRevenue * (scenario.conversionImprovement * conversionRate / 100);
      
      // 2. Cart Abandonment Recovery
      const totalPotentialRevenue = monthlyRevenue / (1 - cartAbandonmentRate / 100);
      const abandonedRevenue = totalPotentialRevenue * (cartAbandonmentRate / 100);
      const recoveredRevenue = abandonedRevenue * scenario.cartRecoveryRate;
      
      // 3. Customer Lifetime Value Enhancement
      const clvImpact = monthlyRevenue * scenario.clvIncrease * 0.15; // 15% monthly impact
      
      // 4. Manual Labor Automation (Cost Savings)
      const laborSavings = manualHoursPerWeek * 4.33 * scenario.automationRate * 25; // $25/hour
      
      // 5. Ad Spend Efficiency (Cost Savings)
      const adSavings = monthlyAdSpend * scenario.adEfficiencyGain;
      
      // Base calculations
      const baseRevenueBenefit = conversionRevenue + recoveredRevenue + clvImpact;
      const baseCostSavings = laborSavings + adSavings;
      const baseTotalBenefit = baseRevenueBenefit + baseCostSavings;
      
      // Apply multipliers
      const adjustedBenefit = baseTotalBenefit * industryMultiplier * stageMultiplier;
      const adjustedRevenueBenefit = baseRevenueBenefit * industryMultiplier * stageMultiplier;
      const adjustedCostSavings = baseCostSavings * industryMultiplier * stageMultiplier;
      
      // Investment assumptions
      const monthlyInvestment = 497; // Chime platform cost
      const oneTimeSetup = 2000; // Implementation cost
      const annualInvestment = (monthlyInvestment * 12) + oneTimeSetup;
      
      // Calculate outputs
      const monthlyRevenueBenefit = adjustedRevenueBenefit;
      const annualRevenueBenefit = monthlyRevenueBenefit * 12;
      const revenueIncreasePercent = (monthlyRevenueBenefit / monthlyRevenue) * 100;
      
      const monthlyCostSavings = adjustedCostSavings;
      const annualCostSavings = monthlyCostSavings * 12;
      
      const totalMonthlyBenefit = adjustedBenefit;
      const totalAnnualBenefit = totalMonthlyBenefit * 12;
      
      const paybackPeriod = annualInvestment / totalMonthlyBenefit;
      const roi = ((totalAnnualBenefit - annualInvestment) / annualInvestment) * 100;
      
      const hoursSavedPerWeek = manualHoursPerWeek * scenario.automationRate;
      const hoursSavedPerMonth = hoursSavedPerWeek * 4.33;
      const fteEquivalent = hoursSavedPerWeek / 40;
      
      const newAverageOrderValue = averageOrderValue * (1 + (scenario.conversionImprovement * 0.1));
      const cacReduction = monthlyAdSpend > 0 && monthlyOrders > 0 ? monthlyAdSpend * scenario.adEfficiencyGain / monthlyOrders : 0;
      
      return {
        monthlyRevenueBenefit: Math.round(monthlyRevenueBenefit),
        annualRevenueBenefit: Math.round(annualRevenueBenefit),
        revenueIncreasePercent: Math.round(revenueIncreasePercent * 10) / 10,
        monthlyCostSavings: Math.round(monthlyCostSavings),
        annualCostSavings: Math.round(annualCostSavings),
        totalMonthlyBenefit: Math.round(totalMonthlyBenefit),
        totalAnnualBenefit: Math.round(totalAnnualBenefit),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        roi: Math.round(roi),
        hoursSavedPerWeek: Math.round(hoursSavedPerWeek * 10) / 10,
        hoursSavedPerMonth: Math.round(hoursSavedPerMonth * 10) / 10,
        fteEquivalent: Math.round(fteEquivalent * 100) / 100,
        newAverageOrderValue: Math.round(newAverageOrderValue),
        cacReduction: Math.round(cacReduction),
        confidenceLevel: scenario.confidenceLevel
      };
    };
    
    return {
      conservative: calculateScenario(scenarios.conservative),
      expected: calculateScenario(scenarios.expected),
      optimistic: calculateScenario(scenarios.optimistic)
    };
  }, [formData]);

  // Handle calculate button
  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://60h5imcydxdy.manus.space/api/roi-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          calculations: calculations[selectedScenario]
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success component with existing thank you page structure
  const SuccessComponent = () => (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Interest in Chime!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your personalized revenue growth analysis has been sent to your email. 
          Our team will review your business details and provide additional insights within 24 hours.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">
            Ready to Transform Your Business?
          </h3>
          <p className="text-blue-700 mb-4">
            Schedule a personalized consultation to discuss how Chime's AI automation 
            can specifically benefit your business.
          </p>
          <a
            href="/#/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Call
          </a>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Questions? Visit our <a href="/#/contact" className="text-blue-600 hover:underline">contact page</a> or check out our <a href="/#/faq" className="text-blue-600 hover:underline">FAQ</a>.</p>
        </div>
      </div>
    </div>
  );

  if (showSuccess) {
    return <SuccessComponent />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Business Metrics Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Business Metrics</h2>
        </div>
        <p className="text-gray-600 mb-8">Tell us about your current business performance</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Monthly Revenue ($)
              <span className="text-gray-500 text-xs block">Your current monthly sales</span>
            </label>
            <input
              type="number"
              value={formData.monthly_revenue}
              onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="75000"
            />
          </div>

          {/* Average Order Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ShoppingCart className="w-4 h-4 inline mr-1" />
              Average Order Value ($)
              <span className="text-gray-500 text-xs block">Average amount per purchase</span>
            </label>
            <input
              type="number"
              value={formData.average_order_value}
              onChange={(e) => handleInputChange('average_order_value', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="125"
            />
          </div>

          {/* Monthly Orders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Monthly Orders
              <span className="text-gray-500 text-xs block">Number of orders per month</span>
            </label>
            <input
              type="number"
              value={formData.monthly_orders}
              onChange={(e) => handleInputChange('monthly_orders', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="600"
            />
          </div>

          {/* Conversion Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Conversion Rate (%)
              <span className="text-gray-500 text-xs block">Percentage of visitors who buy</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.conversion_rate}
              onChange={(e) => handleInputChange('conversion_rate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2.5"
            />
          </div>

          {/* Cart Abandonment Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cart Abandonment Rate (%)
              <span className="text-gray-500 text-xs block">Percentage who leave without buying</span>
            </label>
            <input
              type="number"
              value={formData.cart_abandonment_rate}
              onChange={(e) => handleInputChange('cart_abandonment_rate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="70"
            />
          </div>

          {/* Monthly Ad Spend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Ad Spend ($)
              <span className="text-gray-500 text-xs block">Your marketing budget per month</span>
            </label>
            <input
              type="number"
              value={formData.monthly_ad_spend}
              onChange={(e) => handleInputChange('monthly_ad_spend', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>

          {/* Manual Hours per Week */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Manual Hours per Week
              <span className="text-gray-500 text-xs block">Time spent on repetitive tasks</span>
            </label>
            <input
              type="number"
              value={formData.manual_hours_per_week}
              onChange={(e) => handleInputChange('manual_hours_per_week', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="35"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
              <span className="text-gray-500 text-xs block">Your business category</span>
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              Business Stage
              <span className="text-gray-500 text-xs block">Your current growth phase</span>
            </label>
            <select
              value={formData.business_stage}
              onChange={(e) => handleInputChange('business_stage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your business stage</option>
              {businessStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleCalculate}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Get Your Personalized Revenue Growth Plan
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Growth Potential</h3>
          
          {/* Scenario Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              {['conservative', 'expected', 'optimistic'].map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`px-6 py-2 rounded-md font-medium capitalize transition-colors ${
                    selectedScenario === scenario
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {scenario} ({calculations[scenario].confidenceLevel}% confidence)
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${calculations[selectedScenario].totalMonthlyBenefit.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Additional Monthly Benefit</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${calculations[selectedScenario].totalAnnualBenefit.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Additional Annual Benefit</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {calculations[selectedScenario].roi}%
              </div>
              <div className="text-gray-600 font-medium">Expected ROI</div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                {calculations[selectedScenario].paybackPeriod} months
              </div>
              <div className="text-sm text-gray-600">Payback Period</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                {calculations[selectedScenario].hoursSavedPerWeek} hours/week
              </div>
              <div className="text-sm text-gray-600">Manual Hours Saved</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                {calculations[selectedScenario].revenueIncreasePercent}%
              </div>
              <div className="text-sm text-gray-600">Revenue Increase</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                {calculations[selectedScenario].fteEquivalent} FTE
              </div>
              <div className="text-sm text-gray-600">Equivalent Employees Saved</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                ${calculations[selectedScenario].monthlyCostSavings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Monthly Cost Savings</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">
                ${calculations[selectedScenario].cacReduction.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">CAC Reduction</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Mail className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Get Your Detailed Report</h2>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">
              <strong>Optional:</strong> Provide your contact info to receive a detailed growth analysis report.
            </p>
            <p className="text-green-600 text-sm mt-1">
              You can see your results above without providing any information.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  First Name
                  <span className="text-gray-500 text-xs block">For personalized recommendations</span>
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                  <span className="text-gray-500 text-xs block">Complete your profile</span>
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Smith"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                  <span className="text-gray-500 text-xs block">To receive your detailed report</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Business Name
                  <span className="text-gray-500 text-xs block">Your company name</span>
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Inc."
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Website URL
                  <span className="text-gray-500 text-xs block">For industry-specific insights</span>
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourcompany.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                  <span className="text-gray-500 text-xs block">For priority consultation scheduling</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get My Detailed Growth Report'}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Free report • No spam • Unsubscribe anytime
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewROICalculator;

