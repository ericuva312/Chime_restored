import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, ShoppingCart, Clock, Mail, User, Building, Globe, ArrowRight, Calendar } from 'lucide-react';

const API_URL = 'https://chime-roi-calculator-backend-secure-production.up.railway.app';

const WorkingROICalculator = () => {
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

  // Simplified calculations
  const calculateResults = () => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    
    // Simple calculation logic
    const scenarios = {
      conservative: {
        totalMonthlyBenefit: Math.round(monthlyRevenue * 0.15 / 12),
        totalAnnualBenefit: Math.round(monthlyRevenue * 0.15),
        paybackPeriod: 1.6,
        revenueIncreasePercent: 15,
        hoursSavedPerWeek: 18,
        fteEquivalent: 0.45,
        monthlyCostSavings: Math.round(monthlyRevenue * 0.04),
        confidenceLevel: '90'
      },
      expected: {
        totalMonthlyBenefit: Math.round(monthlyRevenue * 0.20 / 12),
        totalAnnualBenefit: Math.round(monthlyRevenue * 0.20),
        paybackPeriod: 1.3,
        revenueIncreasePercent: 20,
        hoursSavedPerWeek: 21,
        fteEquivalent: 0.53,
        monthlyCostSavings: Math.round(monthlyRevenue * 0.05),
        confidenceLevel: '70'
      },
      optimistic: {
        totalMonthlyBenefit: Math.round(monthlyRevenue * 0.25 / 12),
        totalAnnualBenefit: Math.round(monthlyRevenue * 0.25),
        paybackPeriod: 1.0,
        revenueIncreasePercent: 25,
        hoursSavedPerWeek: 25,
        fteEquivalent: 0.63,
        monthlyCostSavings: Math.round(monthlyRevenue * 0.06),
        confidenceLevel: '40'
      }
    };

    return scenarios;
  };

  const calculations = calculateResults();

  // Handle calculate button
  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/submit`, {
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

  // Success component
  const SuccessComponent = () => (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Interest in Chime!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your personalized revenue growth analysis has been sent to your email.
        </p>
        <div className="bg-white rounded-lg p-6 border border-green-200 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-3" />
              <span>Schedule a strategy call to discuss your growth plan</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-green-600 mr-3" />
              <span>Receive your detailed ROI analysis via email</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
              <span>Get a custom automation roadmap for your business</span>
            </div>
          </div>
        </div>
        <a
          href="/#/contact"
          className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Your Strategy Call
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  );

  if (showSuccess) {
    return <SuccessComponent />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Business Metrics Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Business Metrics</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Revenue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Monthly Revenue
              <span className="text-gray-500 text-xs block">Current monthly revenue</span>
            </label>
            <input
              type="number"
              value={formData.monthly_revenue}
              onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="75000"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Industry
              <span className="text-gray-500 text-xs block">Your business industry</span>
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
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Business Stage
              <span className="text-gray-500 text-xs block">Current growth stage</span>
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

        <div className="mt-8 text-center">
          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Get Your Personalized Revenue Growth Plan
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Revenue Growth Projections</h3>
          
          {/* Scenario Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              {Object.keys(calculations).map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    selectedScenario === scenario
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {scenario.charAt(0).toUpperCase() + scenario.slice(1)} ({calculations[scenario].confidenceLevel}% confidence)
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${calculations[selectedScenario].totalMonthlyBenefit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${calculations[selectedScenario].totalAnnualBenefit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Additional Annual Benefit</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {calculations[selectedScenario].paybackPeriod} months
              </div>
              <div className="text-sm text-gray-600">Payback Period</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {calculations[selectedScenario].revenueIncreasePercent}%
              </div>
              <div className="text-sm text-gray-600">Annual Revenue Increase</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      {showResults && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Optional: Get Your Detailed Growth Analysis Report
            </h3>
            <p className="text-green-600 font-medium mb-2">
              ✓ You can see your results above without providing any information
            </p>
            <p className="text-gray-600">
              Provide your contact info to receive a detailed growth analysis report with industry-specific insights and implementation roadmap.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
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

export default WorkingROICalculator;

