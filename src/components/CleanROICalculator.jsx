import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, Target, User, Mail, Building, BarChart3, Zap, Users, ShoppingCart } from 'lucide-react';

const CleanROICalculator = () => {
  console.log('🚀 CleanROICalculator is loading and executing!');
  
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
  
  // Live projections state
  const [showLiveProjections, setShowLiveProjections] = useState(false);
  const [liveCalculations, setLiveCalculations] = useState({});

  console.log('🔍 CleanROICalculator formData:', formData);
  console.log('🔍 Show live projections:', showLiveProjections);

  const handleInputChange = (field, value) => {
    console.log(`📝 CleanROICalculator input changed: ${field} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
          paybackMonths: 1.3,
          revenueIncrease: 20,
          conversionBoost: Math.round(conversionRate * 0.4 * 10) / 10,
          cartRecoveryRate: Math.round(cartAbandonment * 0.3),
          adEfficiencyGain: Math.round(adEfficiency * 0.7),
          timeSaved: Math.round(manualHours * 0.6)
        },
        optimistic: {
          monthlyGrowth: Math.round(baseGrowth * 0.25 + conversionImprovement + cartRecovery + adEfficiency + timeValue),
          annualGrowth: Math.round((baseGrowth * 0.25 + conversionImprovement + cartRecovery + adEfficiency + timeValue) * 12),
          paybackMonths: 0.9,
          revenueIncrease: 25,
          conversionBoost: Math.round(conversionRate * 0.5 * 10) / 10,
          cartRecoveryRate: Math.round(cartAbandonment * 0.4),
          adEfficiencyGain: Math.round(adEfficiency),
          timeSaved: Math.round(manualHours * 0.8)
        }
      };
      
      console.log('📈 Live calculations:', liveCalcs);
      setLiveCalculations(liveCalcs);
      setShowLiveProjections(true);
    } else {
      console.log('❌ Not enough basic fields for live projections');
      setShowLiveProjections(false);
    }
  }, [
    formData.monthly_revenue, 
    formData.industry, 
    formData.business_stage,
    formData.conversion_rate,
    formData.cart_abandonment,
    formData.ad_spend,
    formData.manual_hours
  ]);

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
      calculations: liveCalculations[selectedScenario]
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
    <div className="clean-roi-calculator">
      <style jsx>{`
        .clean-roi-calculator {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .live-projections {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin-top: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .live-projections h3 {
          color: #1e293b;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .scenario-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .scenario-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .scenario-title {
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          text-align: center;
        }
        
        .scenario-metrics {
          display: grid;
          gap: 0.75rem;
        }
        
        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .metric-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }
        
        .metric-value {
          font-weight: 700;
          color: #059669;
          font-size: 0.9rem;
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
        
        .live-projections {
          animation: slideIn 0.5s ease-out;
        }
        
        .form-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .input-field {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: #fafafa;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .cta-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
      `}</style>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          <TrendingUp className="w-10 h-10 inline mr-3 text-blue-600" />
          Revenue Growth Calculator
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover your business's growth potential with AI-powered automation. 
          See real-time projections as you enter your data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Form */}
        <div className="space-y-8">
          {/* Business Metrics Section */}
          <div className="form-section">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Business Metrics
            </h3>
            
            <div className="space-y-6">
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
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
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
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Users className="w-4 h-4 inline mr-2" />
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
        </div>

        {/* Right Column - Live Projections */}
        <div>
          {showLiveProjections && (
            <div className="live-projections">
              <h3>
                <TrendingUp className="w-6 h-6" />
                Live Revenue Projections
              </h3>
              <p className="text-gray-600 mb-6">
                Real-time projections based on your business metrics and performance data:
              </p>
              
              <div className="scenarios-grid">
                {Object.entries(liveCalculations).map(([scenario, data]) => (
                  <div key={scenario} className="scenario-card">
                    <div className="scenario-title">
                      {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                    </div>
                    <div className="scenario-metrics">
                      <div className="metric-row">
                        <span className="metric-label">Monthly Growth</span>
                        <span className="metric-value">${data.monthlyGrowth?.toLocaleString()}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Annual Growth</span>
                        <span className="metric-value">${data.annualGrowth?.toLocaleString()}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Payback Period</span>
                        <span className="metric-value">{data.paybackMonths} months</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Revenue Increase</span>
                        <span className="metric-value">{data.revenueIncrease}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Conversion Boost</span>
                        <span className="metric-value">+{data.conversionBoost}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Time Saved</span>
                        <span className="metric-value">{data.timeSaved} hrs/week</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!showLiveProjections && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Enter Your Business Data
              </h3>
              <p className="text-gray-600 text-lg">
                Fill in your monthly revenue, industry, and business stage to see live projections
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Section */}
      {showLiveProjections && (

        <div className="form-section">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Want to learn more? Get Your Detailed Growth Analysis Report
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your contact details below to get a detailed report featuring industry-specific insights and a step-by-step implementation roadmap, delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
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
                  placeholder="John"
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
                  placeholder="Smith"
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
                  placeholder="john@company.com"
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
                  placeholder="Your Company Inc."
                />
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-xl disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get My Detailed Growth Report'}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Free report • No spam • Unsubscribe anytime
              </p>
            </div>
            
            {submitMessage && (
              <div className="mt-6 text-center">
                <p className={`text-lg ${submitMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
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

export default CleanROICalculator;

