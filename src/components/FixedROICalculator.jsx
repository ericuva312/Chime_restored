import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, Target, User, Mail, Building, BarChart3, Zap, Users, ShoppingCart, Send, CheckCircle } from 'lucide-react';

const FixedROICalculator = () => {
  console.log('🚀 FixedROICalculator is loading and executing!');
  
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
  
  // Live projections state
  const [showLiveProjections, setShowLiveProjections] = useState(false);
  const [liveCalculations, setLiveCalculations] = useState({});

  console.log('🔍 FixedROICalculator formData:', formData);
  console.log('🔍 Show live projections:', showLiveProjections);

  const handleInputChange = (field, value) => {
    console.log(`📝 FixedROICalculator input changed: ${field} = ${value}`);
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
    console.log('📤 Form submitted with data:', formData);
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitSuccess(false);

    // Prepare data with correct field names for backend
    const submissionData = {
      // Basic business metrics
      monthly_revenue: parseFloat(formData.monthly_revenue) || 0,
      industry: formData.industry,
      business_stage: formData.business_stage,
      
      // Performance metrics with corrected field names
      conversion_rate: parseFloat(formData.conversion_rate) || 2.5,
      cart_abandonment_rate: parseFloat(formData.cart_abandonment) || 70, // ✅ Fixed field name
      monthly_ad_spend: parseFloat(formData.ad_spend) || 5000, // ✅ Fixed field name
      manual_hours_per_week: parseFloat(formData.manual_hours) || 35, // ✅ Fixed field name
      
      // Add missing required fields with intelligent defaults
      average_order_value: parseFloat(formData.monthly_revenue) * 0.002 || 150,
      monthly_orders: Math.max(10, parseInt(parseFloat(formData.monthly_revenue) / 150)) || 500,
      
      // Contact information
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      business_name: formData.business_name,
      
      // Optional fields
      website: formData.website || null,
      phone: formData.phone || null
    };

    console.log('📤 Sending submission data:', submissionData);

    try {
      const response = await fetch('https://chime-roi-calculator-backend-secure-production.up.railway.app/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();
      console.log('📥 Backend response:', result);

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage(result.message || 'Thank you! Your detailed growth analysis report is on the way.');
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
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
          setSubmitSuccess(false);
          setSubmitMessage('');
        }, 5000);
      } else {
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        <style>{`
          .metric-box {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #cbd5e1;
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            transition: all 0.3s ease;
          }
          
          .metric-box:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
            color: #1f2937;
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
            width: 100%;
          }
          
          .cta-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }
          
          .cta-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .contact-form-section {
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
            color: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(30, 64, 175, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .contact-form-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.1;
          }
          
          .contact-form-section > * {
            position: relative;
            z-index: 1;
          }
          
          .success-message {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            animation: slideIn 0.5s ease-out;
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

            {/* Contact Form Section - Enhanced Design */}
            {showLiveProjections && (
              <div className="contact-form-section">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">
                    Want to learn more?
                  </h3>
                  <h4 className="text-2xl font-semibold mb-4">
                    Get Your Detailed Growth Analysis Report
                  </h4>
                  <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Enter your contact details below to get a detailed report featuring industry-specific insights 
                    and a step-by-step implementation roadmap, delivered directly to your inbox.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="success-message">
                    <CheckCircle className="w-8 h-8 inline mr-3" />
                    <span className="text-lg font-semibold">{submitMessage}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        <User className="w-4 h-4 inline mr-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        <Building className="w-4 h-4 inline mr-2" />
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.business_name}
                        onChange={(e) => handleInputChange('business_name', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cta-button"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 inline mr-3" />
                          Get My Detailed Growth Report
                        </>
                      )}
                    </button>
                    
                    {submitMessage && !submitSuccess && (
                      <div className="text-red-300 text-center mt-4 p-3 bg-red-500/20 rounded-lg">
                        {submitMessage}
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Live Projections */}
          <div className="space-y-8">
            {showLiveProjections ? (
              <div className="live-projections">
                <div className="form-section">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                    Real-time Growth Projections
                  </h3>
                  
                  {/* Scenario Selector */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['conservative', 'expected', 'optimistic'].map((scenario) => (
                      <button
                        key={scenario}
                        onClick={() => setSelectedScenario(scenario)}
                        className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all flex-1 min-w-0 ${
                          selectedScenario === scenario
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-400 text-white hover:bg-gray-500'
                        }`}
                      >
                        {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  {/* Live Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-box">
                      <div className="metric-label">Monthly Growth</div>
                      <div className="metric-value">
                        ${liveCalculations[selectedScenario]?.monthlyGrowth?.toLocaleString() || '0'}
                      </div>
                    </div>
                    
                    <div className="metric-box">
                      <div className="metric-label">Annual Growth</div>
                      <div className="metric-value">
                        ${liveCalculations[selectedScenario]?.annualGrowth?.toLocaleString() || '0'}
                      </div>
                    </div>
                    
                    <div className="metric-box">
                      <div className="metric-label">Payback Period</div>
                      <div className="metric-value">
                        {liveCalculations[selectedScenario]?.paybackMonths || '0'} months
                      </div>
                    </div>
                    
                    <div className="metric-box">
                      <div className="metric-label">Revenue Increase</div>
                      <div className="metric-value">
                        {liveCalculations[selectedScenario]?.revenueIncrease || '0'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-section text-center py-16">
                <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  Enter Your Business Data
                </h3>
                <p className="text-gray-500">
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

export default FixedROICalculator;

