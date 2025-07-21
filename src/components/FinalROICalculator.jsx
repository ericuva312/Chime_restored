import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, Target, User, Mail, Building } from 'lucide-react';

const FinalROICalculator = () => {
  console.log('🎯 FinalROICalculator is loading and executing!');
  
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

  const [showResults, setShowResults] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('expected');
  const [calculations, setCalculations] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Live projections state
  const [showLiveProjections, setShowLiveProjections] = useState(false);
  const [liveCalculations, setLiveCalculations] = useState({});

  console.log('🔍 FinalROICalculator formData:', formData);
  console.log('🔍 Show live projections:', showLiveProjections);

  const handleInputChange = (field, value) => {
    console.log(`📝 FinalROICalculator input changed: ${field} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Live projections effect - triggers when basic fields are filled
  useEffect(() => {
    console.log('🔄 FinalROICalculator live projections useEffect triggered');
    
    const hasBasicFields = formData.monthly_revenue && formData.industry && formData.business_stage;
    console.log('📊 Has basic fields:', hasBasicFields);
    
    if (hasBasicFields) {
      console.log('✅ Calculating live projections...');
      
      const revenue = parseFloat(formData.monthly_revenue) || 0;
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
      
      const liveCalcs = {
        conservative: {
          monthlyGrowth: baseGrowth * 0.15,
          annualGrowth: baseGrowth * 0.15 * 12,
          paybackMonths: 1.8,
          revenueIncrease: 15
        },
        expected: {
          monthlyGrowth: baseGrowth * 0.20,
          annualGrowth: baseGrowth * 0.20 * 12,
          paybackMonths: 1.3,
          revenueIncrease: 20
        },
        optimistic: {
          monthlyGrowth: baseGrowth * 0.25,
          annualGrowth: baseGrowth * 0.25 * 12,
          paybackMonths: 0.9,
          revenueIncrease: 25
        }
      };
      
      console.log('📈 Live calculations:', liveCalcs);
      setLiveCalculations(liveCalcs);
      setShowLiveProjections(true);
    } else {
      console.log('❌ Not enough basic fields for live projections');
      setShowLiveProjections(false);
    }
  }, [formData.monthly_revenue, formData.industry, formData.business_stage]);

  const calculateROI = () => {
    console.log('🧮 Calculating ROI...');
    
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
    const conversionImprovement = (conversionRate * 0.4);
    const cartRecovery = (cartAbandonment * 0.3 * revenue) / 100;
    const adEfficiency = adSpend * 0.25;
    const timeValue = (manualHours * 50) * 4.33;

    const scenarios = {
      conservative: {
        totalMonthlyBenefit: Math.round(baseGrowth * 0.15 + conversionImprovement + cartRecovery * 0.5 + adEfficiency * 0.5 + timeValue * 0.5),
        totalAnnualBenefit: Math.round((baseGrowth * 0.15 + conversionImprovement + cartRecovery * 0.5 + adEfficiency * 0.5 + timeValue * 0.5) * 12),
        paybackPeriod: 1.8,
        annualRevenueIncrease: 15,
        confidenceLevel: 90
      },
      expected: {
        totalMonthlyBenefit: Math.round(baseGrowth * 0.20 + conversionImprovement + cartRecovery * 0.7 + adEfficiency * 0.7 + timeValue * 0.7),
        totalAnnualBenefit: Math.round((baseGrowth * 0.20 + conversionImprovement + cartRecovery * 0.7 + adEfficiency * 0.7 + timeValue * 0.7) * 12),
        paybackPeriod: 1.3,
        annualRevenueIncrease: 20,
        confidenceLevel: 70
      },
      optimistic: {
        totalMonthlyBenefit: Math.round(baseGrowth * 0.25 + conversionImprovement + cartRecovery + adEfficiency + timeValue),
        totalAnnualBenefit: Math.round((baseGrowth * 0.25 + conversionImprovement + cartRecovery + adEfficiency + timeValue) * 12),
        paybackPeriod: 0.9,
        annualRevenueIncrease: 25,
        confidenceLevel: 40
      }
    };

    console.log('📊 Calculated scenarios:', scenarios);
    setCalculations(scenarios);
    setShowResults(true);
  };

  const handleCalculate = () => {
    console.log('🎯 Calculate button clicked');
    calculateROI();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Form submitted');
    setIsSubmitting(true);
    setSubmitMessage('');

    // Map business stage for HubSpot compatibility
    const mapBusinessStageForHubSpot = (stage) => {
      const mapping = {
        'Startup': 'startup',
        'Growth': 'growing',
        'Established': 'established',
        'Mature': 'enterprise'
      };
      return mapping[stage] || stage;
    };

    // Map industry for HubSpot compatibility  
    const mapIndustryForHubSpot = (industry) => {
      const mapping = {
        'Fashion & Apparel': 'fashion_apparel',
        'Electronics': 'electronics',
        'Health & Wellness': 'health_wellness',
        'Home & Garden': 'home_garden',
        'Beauty & Cosmetics': 'beauty_cosmetics',
        'Food & Beverage': 'food_beverage',
        'Pet Products': 'pet_products',
        'Sports & Fitness': 'sports_fitness',
        'Automotive': 'automotive',
        'Books & Media': 'books_media',
        'Toys & Games': 'toys_games',
        'Other': 'other'
      };
      return mapping[industry] || industry;
    };

    // Prepare data with HubSpot-compatible values
    const submissionData = {
      ...formData,
      business_stage: mapBusinessStageForHubSpot(formData.business_stage),
      industry: mapIndustryForHubSpot(formData.industry),
      calculations: calculations[selectedScenario]
    };

    console.log('📊 Submission data with mapping:', submissionData);

    try {
      const response = await fetch('https://roi-calculator-backend-production-8b8b.up.railway.app/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitMessage('✅ Thank you! Your detailed growth report has been sent to your email.');
      } else {
        const errorData = await response.text();
        console.error('Submit error response:', errorData);
        setSubmitMessage('❌ There was an error sending your report. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage('❌ There was an error sending your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="final-roi-calculator">
      <style jsx>{`
        .final-roi-calculator {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .live-projections {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #0ea5e9;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          animation: slideIn 0.5s ease-out;
        }
        
        .live-projections h3 {
          color: #0369a1;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .scenario-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .scenario-title {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .scenario-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 0.25rem;
        }
        
        .scenario-label {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          <TrendingUp className="w-8 h-8 inline mr-2 text-blue-600" />
          ROI Calculator
        </h2>
        <p className="text-lg text-gray-600">
          Discover how Chime's AI-powered automation can transform your business. Get real-time projections as you enter your data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-8">
          {/* Business Metrics Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Business Metrics
            </h3>
            
            <div className="space-y-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Business Stage
                  <span className="text-gray-500 text-xs block">Current growth stage</span>
                </label>
                <select
                  value={formData.business_stage}
                  onChange={(e) => handleInputChange('business_stage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Performance Data (for detailed projections)
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.conversion_rate}
                  onChange={(e) => handleInputChange('conversion_rate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cart Abandonment (%)</label>
                <input
                  type="number"
                  value={formData.cart_abandonment}
                  onChange={(e) => handleInputChange('cart_abandonment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="70"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Ad Spend ($)</label>
                <input
                  type="number"
                  value={formData.ad_spend}
                  onChange={(e) => handleInputChange('ad_spend', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manual Hours/Week</label>
                <input
                  type="number"
                  value={formData.manual_hours}
                  onChange={(e) => handleInputChange('manual_hours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="35"
                />
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
        </div>

        {/* Right Column - Live Projections */}
        <div>
          {showLiveProjections && (
            <div className="live-projections">
              <h3>🚀 Live Revenue Projections</h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your business metrics, here are your potential growth scenarios:
              </p>
              
              <div className="scenarios-grid">
                <div className="scenario-card">
                  <div className="scenario-title">Conservative</div>
                  <div className="scenario-value">
                    ${Math.round(liveCalculations.conservative?.monthlyGrowth || 0).toLocaleString()}
                  </div>
                  <div className="scenario-label">Monthly Growth</div>
                </div>
                
                <div className="scenario-card">
                  <div className="scenario-title">Expected</div>
                  <div className="scenario-value">
                    ${Math.round(liveCalculations.expected?.monthlyGrowth || 0).toLocaleString()}
                  </div>
                  <div className="scenario-label">Monthly Growth</div>
                </div>
                
                <div className="scenario-card">
                  <div className="scenario-title">Optimistic</div>
                  <div className="scenario-value">
                    ${Math.round(liveCalculations.optimistic?.monthlyGrowth || 0).toLocaleString()}
                  </div>
                  <div className="scenario-label">Monthly Growth</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  💡 Fill in performance data above for detailed projections
                </p>
              </div>
            </div>
          )}
          
          {!showLiveProjections && (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Enter Your Business Data
              </h3>
              <p className="text-gray-600">
                Fill in your monthly revenue, industry, and business stage to see live projections
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 mb-8 mt-8">
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
                  {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${calculations[selectedScenario]?.totalMonthlyBenefit?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Additional Monthly Benefit</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${calculations[selectedScenario]?.totalAnnualBenefit?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Additional Annual Benefit</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {calculations[selectedScenario]?.paybackPeriod} months
              </div>
              <div className="text-sm text-gray-600">Payback Period</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {calculations[selectedScenario]?.annualRevenueIncrease}%
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
              Want to learn more? Get Your Detailed Growth Analysis Report
            </h3>
            <p className="text-gray-600">
              Enter your contact details below to get a detailed report featuring industry-specific insights and a step-by-step implementation roadmap, delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  First Name
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
                  <User className="w-4 h-4 inline mr-1" />
                  Last Name
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
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Inc."
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
            
            {submitMessage && (
              <div className="mt-4 text-center">
                <p className={`text-sm ${submitMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default FinalROICalculator;

