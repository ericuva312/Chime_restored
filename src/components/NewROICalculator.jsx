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

  // Calculate results
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    const conversionRate = parseFloat(formData.conversion_rate) || 0;
    const cartAbandonmentRate = parseFloat(formData.cart_abandonment_rate) || 0;
    const monthlyAdSpend = parseFloat(formData.monthly_ad_spend) || 0;
    const manualHours = parseFloat(formData.manual_hours_per_week) || 0;

    // Industry multipliers for growth potential
    const industryMultipliers = {
      'Fashion & Apparel': 1.3,
      'Electronics': 1.25,
      'Health & Wellness': 1.4,
      'Home & Garden': 1.2,
      'Beauty & Cosmetics': 1.35,
      'Food & Beverage': 1.15,
      'Pet Products': 1.3,
      'Sports & Fitness': 1.25,
      'Automotive': 1.2,
      'Books & Media': 1.1,
      'Toys & Games': 1.25,
      'Other': 1.2
    };

    const multiplier = industryMultipliers[formData.industry] || 1.25;
    
    // Calculate projections
    const projectedRevenue = monthlyRevenue * multiplier;
    const additionalRevenue = projectedRevenue - monthlyRevenue;
    const annualAdditional = additionalRevenue * 12;
    
    // Calculate conversion improvements
    const improvedConversionRate = conversionRate * 1.4; // 40% improvement
    const reducedCartAbandonment = cartAbandonmentRate * 0.7; // 30% reduction
    
    // Calculate time savings
    const timeSavingsHours = manualHours * 0.6; // 60% time savings
    const timeSavingsValue = timeSavingsHours * 52 * 50; // $50/hour value
    
    // Calculate ROI
    const totalBenefit = annualAdditional + timeSavingsValue;
    const investmentCost = 60000; // $5k/month * 12 months
    const roi = ((totalBenefit - investmentCost) / investmentCost) * 100;

    return {
      currentRevenue: monthlyRevenue,
      projectedRevenue,
      additionalRevenue,
      annualAdditional,
      improvedConversionRate,
      reducedCartAbandonment,
      timeSavingsHours,
      timeSavingsValue,
      totalBenefit,
      roi: Math.max(roi, 150) // Minimum 150% ROI
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
          calculations
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success/Thank you component
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 rounded-full p-4">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Revenue Growth Analysis is Ready!
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              Based on your business metrics, here's your growth potential with Chime's AI automation.
            </p>
          </div>

          {/* Results Summary Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Growth Potential</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Revenue Projections */}
              <div>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Revenue Growth</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Monthly Revenue:</span>
                      <span className="font-semibold">${calculations.currentRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projected Monthly Revenue:</span>
                      <span className="font-semibold text-blue-600">${calculations.projectedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Additional Annual Revenue:</span>
                      <span className="font-bold text-green-600 text-lg">${calculations.annualAdditional.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Improved Conversion Rate:</span>
                    <span className="font-semibold text-green-600">{calculations.improvedConversionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reduced Cart Abandonment:</span>
                    <span className="font-semibold text-green-600">{calculations.reducedCartAbandonment.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Savings per Week:</span>
                    <span className="font-semibold text-green-600">{calculations.timeSavingsHours.toFixed(1)} hours</span>
                  </div>
                </div>
              </div>

              {/* ROI Summary */}
              <div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Investment ROI</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {calculations.roi.toFixed(0)}%
                    </div>
                    <p className="text-green-700 mb-4">Expected ROI in Year 1</p>
                    <div className="text-2xl font-semibold text-gray-900">
                      ${calculations.totalBenefit.toLocaleString()}
                    </div>
                    <p className="text-gray-600">Total Annual Benefit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ready to Unlock This Growth?</h2>
            
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">
                Schedule a free strategy call to discuss how Chime can deliver these results for your business.
              </p>
              
              <a 
                href="/#/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Schedule Your Strategy Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              
              <p className="text-sm text-gray-500 mt-4">
                No commitment required • Free 30-minute consultation
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Successful Implementations</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">188%</div>
                <p className="text-gray-600">Average Revenue Increase</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">90 Days</div>
                <p className="text-gray-600">Money-Back Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <Calculator className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Revenue Growth Calculator</h1>
          <p className="text-blue-100">
            Discover your potential revenue growth with Chime's AI-powered automation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Section 1: Business Information */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Business Metrics</h2>
                <p className="text-gray-600">Tell us about your current business performance</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Monthly Revenue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Revenue ($)
                  <span className="text-gray-500 text-xs block">Your current monthly sales</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.monthly_revenue}
                    onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75000"
                  />
                </div>
              </div>

              {/* Average Order Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Order Value ($)
                  <span className="text-gray-500 text-xs block">Average amount per purchase</span>
                </label>
                <div className="relative">
                  <ShoppingCart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.average_order_value}
                    onChange={(e) => handleInputChange('average_order_value', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="125"
                  />
                </div>
              </div>

              {/* Monthly Orders */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Orders
                  <span className="text-gray-500 text-xs block">Number of orders per month</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.monthly_orders}
                    onChange={(e) => handleInputChange('monthly_orders', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="600"
                  />
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.monthly_ad_spend}
                    onChange={(e) => handleInputChange('monthly_ad_spend', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Manual Hours per Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manual Hours per Week
                  <span className="text-gray-500 text-xs block">Time spent on repetitive tasks</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.manual_hours_per_week}
                    onChange={(e) => handleInputChange('manual_hours_per_week', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="35"
                  />
                </div>
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
                  {industries.map(industry => (
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
                  {businessStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
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
            <div className="mb-12 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Growth Potential</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${calculations.additionalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Additional Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${calculations.annualAdditional.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {calculations.roi.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Contact Information (Optional) */}
          {showResults && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Get Your Detailed Report</h2>
                  <p className="text-gray-600">
                    <strong>Optional:</strong> Provide your contact info to receive a detailed growth analysis report.
                    <br />
                    <span className="text-sm text-green-600">You can see your results above without providing any information.</span>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                    <span className="text-gray-500 text-xs block">For personalized recommendations</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                    <span className="text-gray-500 text-xs block">Complete your profile</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                    <span className="text-gray-500 text-xs block">To receive your detailed report</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                    <span className="text-gray-500 text-xs block">Your company name</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange('business_name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your Company Inc."
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                    <span className="text-gray-500 text-xs block">For industry-specific insights</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Report...' : 'Get My Detailed Growth Report'}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Free report • No spam • Unsubscribe anytime
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewROICalculator;

