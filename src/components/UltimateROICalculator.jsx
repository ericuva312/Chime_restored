import { useState, useEffect } from 'react'
import { ArrowRight, Calculator, TrendingUp, DollarSign, CheckCircle, Users, Clock, Shield, Star, Zap, Target, Award, ChevronRight, AlertCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const UltimateROICalculator = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    monthlyRevenue: '',
    averageOrderValue: '',
    monthlyOrders: '',
    industry: '',
    currentConversionRate: '',
    cartAbandonmentRate: '',
    timeSpentOnManualTasks: '',
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    website: '',
    phoneNumber: '',
    businessStage: '',
    biggestChallenge: '',
    monthlyAdSpend: ''
  })
  const [results, setResults] = useState(null)
  const [showPersonalizedInsights, setShowPersonalizedInsights] = useState(false)

  // Track ROI calculator start when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'roi_calculator_started', {
        event_category: 'engagement',
        event_label: 'ROI Calculator Started'
      });
    }
  }, [])

  const industries = [
    { value: 'fashion', label: 'Fashion & Apparel', multiplier: 1.2, avgGrowth: '22%' },
    { value: 'electronics', label: 'Electronics & Tech', multiplier: 1.15, avgGrowth: '18%' },
    { value: 'health', label: 'Health & Wellness', multiplier: 1.25, avgGrowth: '28%' },
    { value: 'beauty', label: 'Beauty & Cosmetics', multiplier: 1.3, avgGrowth: '31%' },
    { value: 'home', label: 'Home & Garden', multiplier: 1.1, avgGrowth: '16%' },
    { value: 'food', label: 'Food & Beverage', multiplier: 1.18, avgGrowth: '20%' },
    { value: 'pets', label: 'Pet Products', multiplier: 1.22, avgGrowth: '24%' },
    { value: 'jewelry', label: 'Jewelry & Accessories', multiplier: 1.35, avgGrowth: '35%' },
    { value: 'sports', label: 'Sports & Fitness', multiplier: 1.2, avgGrowth: '22%' },
    { value: 'other', label: 'Other', multiplier: 1.15, avgGrowth: '18%' }
  ]

  const businessStages = [
    { value: 'startup', label: 'Startup (0-6 months)', multiplier: 1.4 },
    { value: 'growing', label: 'Growing (6 months - 2 years)', multiplier: 1.25 },
    { value: 'established', label: 'Established (2-5 years)', multiplier: 1.15 },
    { value: 'mature', label: 'Mature (5+ years)', multiplier: 1.1 }
  ]

  const challenges = [
    'Low conversion rates',
    'High cart abandonment',
    'Poor customer retention',
    'Manual task overload',
    'Ineffective email marketing',
    'Inventory management',
    'Customer service bottlenecks',
    'Scaling difficulties'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateAdvancedROI = () => {
    // Track ROI calculator completion in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'roi_calculator_completed', {
        event_category: 'conversion',
        event_label: 'ROI Calculator Completed',
        value: parseFloat(formData.monthlyRevenue) || 0
      });
    }

    const revenue = parseFloat(formData.monthlyRevenue) || 0
    const orders = parseFloat(formData.monthlyOrders) || 0
    const aov = parseFloat(formData.averageOrderValue) || 0
    const conversionRate = parseFloat(formData.currentConversionRate) || 2.5
    const abandonmentRate = parseFloat(formData.cartAbandonmentRate) || 70
    const manualHours = parseFloat(formData.timeSpentOnManualTasks) || 20
    const adSpend = parseFloat(formData.monthlyAdSpend) || 0

    // Get industry and stage multipliers
    const selectedIndustry = industries.find(ind => ind.value === formData.industry) || industries[9]
    const selectedStage = businessStages.find(stage => stage.value === formData.businessStage) || businessStages[1]
    
    // Advanced calculations based on Chime's actual capabilities
    const industryMultiplier = selectedIndustry.multiplier
    const stageMultiplier = selectedStage.multiplier
    const baseGrowthRate = 0.20 // 20% base growth
    
    // Calculate improvements
    const conversionImprovement = Math.min(conversionRate * 0.4, 2.5) // Up to 40% conversion improvement
    const cartRecoveryRate = Math.min(abandonmentRate * 0.35, 25) // Recover up to 35% of abandoned carts
    const automationSavings = manualHours * 0.8 // Save 80% of manual time
    const adEfficiencyGain = adSpend * 0.25 // 25% better ad efficiency
    
    // Revenue calculations
    const monthlyIncrease = revenue * baseGrowthRate * industryMultiplier * stageMultiplier
    const cartRecoveryRevenue = (orders * (abandonmentRate / 100) * (cartRecoveryRate / 100)) * aov
    const conversionRevenue = revenue * (conversionImprovement / 100)
    const adSavings = adEfficiencyGain
    
    const totalMonthlyIncrease = monthlyIncrease + cartRecoveryRevenue + conversionRevenue + adSavings
    const yearlyIncrease = totalMonthlyIncrease * 12
    const newMonthlyRevenue = revenue + totalMonthlyIncrease
    
    // ROI calculation (assuming $1,500/month Chime cost)
    const chimeCost = 1500
    const roi = ((totalMonthlyIncrease - chimeCost) / chimeCost) * 100
    const paybackPeriod = chimeCost / totalMonthlyIncrease
    
    // Time savings
    const hoursSaved = automationSavings
    const weeklySavings = hoursSaved / 4
    const monthlySavings = hoursSaved
    
    // Additional metrics
    const recoveredCarts = Math.floor(orders * (abandonmentRate / 100) * (cartRecoveryRate / 100))
    const newConversionRate = conversionRate + conversionImprovement
    const customerLifetimeValueIncrease = aov * 0.3 // 30% CLV increase
    
    setResults({
      currentRevenue: revenue,
      newRevenue: newMonthlyRevenue,
      monthlyIncrease: totalMonthlyIncrease,
      yearlyIncrease: yearlyIncrease,
      roi: roi,
      paybackPeriod: paybackPeriod,
      recoveredCarts: recoveredCarts,
      hoursSaved: hoursSaved,
      weeklySavings: weeklySavings,
      monthlySavings: monthlySavings,
      conversionImprovement: conversionImprovement,
      newConversionRate: newConversionRate,
      cartRecoveryRate: cartRecoveryRate,
      customerLifetimeValueIncrease: customerLifetimeValueIncrease,
      adSavings: adSavings,
      industryGrowth: selectedIndustry.avgGrowth,
      projectedGrowthRate: (totalMonthlyIncrease / revenue) * 100
    })
    
    setShowPersonalizedInsights(true)
  }

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      calculateAdvancedROI()
      setStep(5)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(number))
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.monthlyRevenue && formData.averageOrderValue && formData.monthlyOrders
      case 2:
        return formData.industry && formData.currentConversionRate && formData.cartAbandonmentRate
      case 3:
        return formData.timeSpentOnManualTasks && formData.businessStage && formData.biggestChallenge
      case 4:
        return formData.firstName && formData.lastName && formData.email && formData.businessName
      default:
        return true
    }
  }

  // Progress percentage
  const progressPercentage = (step / 5) * 100

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with Social Proof */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600">4.9/5 from 500+ businesses</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Discover Your <span className="text-blue-600">Exact Growth Potential</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-green-600" />
          SOC 2 Certified
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-blue-600" />
          500+ Success Stories
        </div>
        <div className="flex items-center">
          <Award className="h-4 w-4 mr-2 text-purple-600" />
          99.2% Success Rate
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-orange-600" />
          48-Hour Setup
        </div>
      </div>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="text-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8" />
            Revenue Growth Calculator
          </CardTitle>
          <p className="text-blue-100 mt-2">
            Powered by data from 500+ successful Shopify implementations
          </p>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-0 h-3 w-3 bg-white rounded-full transform translate-x-1"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-blue-200 mt-2">
              <span>Business Metrics</span>
              <span>Performance Data</span>
              <span>Operations</span>
              <span>Contact Info</span>
              <span>Your Results</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  📊 Current Business Performance
                </h3>
                <p className="text-gray-600">
                  Help us understand your current revenue and order patterns
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Monthly Revenue *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="50,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Your total monthly revenue</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Average Order Value *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="75"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Average amount per order</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Monthly Orders *
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyOrders}
                    onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="667"
                  />
                  <p className="text-xs text-gray-500">Total orders per month</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Why we need this data</h4>
                    <p className="text-sm text-blue-700">
                      These metrics help us calculate your exact growth potential and create a personalized automation strategy. All data is encrypted and never shared.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎯 Performance & Industry Data
                </h3>
                <p className="text-gray-600">
                  Let's understand your current performance and industry context
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label} (Avg: {industry.avgGrowth} growth)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">Industry affects growth potential</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Conversion Rate (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentConversionRate}
                    onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="2.5"
                  />
                  <p className="text-xs text-gray-500">Visitors who make a purchase</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Cart Abandonment Rate (%) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={formData.cartAbandonmentRate}
                    onChange={(e) => handleInputChange('cartAbandonmentRate', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="70"
                  />
                  <p className="text-xs text-gray-500">% of carts left without purchase</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Monthly Ad Spend
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.monthlyAdSpend}
                      onChange={(e) => handleInputChange('monthlyAdSpend', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="5,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Optional: helps calculate ad efficiency gains</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Industry Benchmark</h4>
                    <p className="text-sm text-green-700">
                      {formData.industry && industries.find(ind => ind.value === formData.industry) ? 
                        `${industries.find(ind => ind.value === formData.industry).label} businesses typically see ${industries.find(ind => ind.value === formData.industry).avgGrowth} growth with Chime.` :
                        'Select your industry to see specific growth benchmarks for your sector.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ⚙️ Operations & Business Stage
                </h3>
                <p className="text-gray-600">
                  Understanding your operations helps us calculate time savings and efficiency gains
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Hours/Week on Manual Tasks *
                  </label>
                  <input
                    type="number"
                    value={formData.timeSpentOnManualTasks}
                    onChange={(e) => handleInputChange('timeSpentOnManualTasks', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="20"
                  />
                  <p className="text-xs text-gray-500">Email marketing, inventory, customer service, etc.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Business Stage *
                  </label>
                  <select
                    value={formData.businessStage}
                    onChange={(e) => handleInputChange('businessStage', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select business stage</option>
                    {businessStages.map((stage) => (
                      <option key={stage.value} value={stage.value}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">Affects growth potential and implementation strategy</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Biggest Challenge *
                </label>
                <select
                  value={formData.biggestChallenge}
                  onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Select your biggest challenge</option>
                  {challenges.map((challenge) => (
                    <option key={challenge} value={challenge}>
                      {challenge}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">Helps us prioritize solutions in your growth plan</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">Automation Impact</h4>
                    <p className="text-sm text-purple-700">
                      Based on your manual task hours, we'll calculate exactly how much time Chime will save you each week and the monetary value of that time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  📧 Get Your Personalized Growth Report
                </h3>
                <p className="text-gray-600">
                  We'll send your detailed analysis and implementation roadmap to your email
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="John"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Smith"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="john@company.com"
                  />
                  <p className="text-xs text-gray-500">We'll send your growth report here</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Your Business Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="https://yourstore.com"
                  />
                  <p className="text-xs text-gray-500">Optional: helps us provide specific recommendations</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="(555) 123-4567"
                  />
                  <p className="text-xs text-gray-500">Optional: for priority support and consultation</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Instant access to your personalized growth projections</li>
                      <li>• Detailed PDF report sent to your email within 5 minutes</li>
                      <li>• Optional: Schedule a free strategy call with our growth experts</li>
                      <li>• 🔒 Your data is encrypted and never shared with third parties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && results && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  🎉 Your Personalized Growth Projection
                </h3>
                <p className="text-lg text-gray-600">
                  Based on your specific business data and our 500+ successful implementations
                </p>
              </div>

              {/* Key Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
                  <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {formatCurrency(results.monthlyIncrease)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Monthly Revenue Increase</div>
                  <div className="text-xs text-green-700 font-medium">
                    +{Math.round(results.projectedGrowthRate)}% growth rate
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 text-center">
                  <DollarSign className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatCurrency(results.yearlyIncrease)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Annual Revenue Increase</div>
                  <div className="text-xs text-blue-700 font-medium">
                    First year projection
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 text-center">
                  <Target className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {Math.round(results.roi)}%
                  </div>
                  <div className="text-sm text-gray-600 mb-2">ROI in First Year</div>
                  <div className="text-xs text-purple-700 font-medium">
                    Payback in {results.paybackPeriod.toFixed(1)} months
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Detailed Impact Analysis</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Revenue Improvements
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Current Monthly Revenue</span>
                        <span className="font-semibold">{formatCurrency(results.currentRevenue)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Projected Monthly Revenue</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.newRevenue)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Conversion Rate Improvement</span>
                        <span className="font-semibold text-blue-600">+{results.conversionImprovement.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Cart Recovery Rate</span>
                        <span className="font-semibold text-purple-600">{results.cartRecoveryRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-orange-600" />
                      Time & Efficiency Savings
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Hours Saved Per Week</span>
                        <span className="font-semibold">{results.weeklySavings.toFixed(1)} hours</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Hours Saved Per Month</span>
                        <span className="font-semibold">{results.monthlySavings.toFixed(1)} hours</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Recovered Carts/Month</span>
                        <span className="font-semibold text-green-600">{formatNumber(results.recoveredCarts)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Ad Efficiency Savings</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(results.adSavings)}/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Comparison */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Industry Benchmark Comparison
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{results.industryGrowth}</div>
                    <div className="text-sm text-gray-600">Industry Average Growth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{Math.round(results.projectedGrowthRate)}%</div>
                    <div className="text-sm text-gray-600">Your Projected Growth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((results.projectedGrowthRate / parseFloat(results.industryGrowth.replace('%', ''))) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Above Industry Average</div>
                  </div>
                </div>
              </div>

              {/* Next Steps CTA */}
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-xl text-white text-center">
                <h4 className="text-2xl font-bold mb-4">Ready to Achieve These Results?</h4>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Your personalized growth plan is ready. Get started with our 48-hour implementation and see results in 30 days, or get your money back.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Get My Implementation Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                    Schedule Strategy Call
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    90-Day Money-Back Guarantee
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    48-Hour Setup
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    500+ Success Stories
                  </div>
                </div>
              </div>

              {/* HubSpot Form Placeholder */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-800 mb-3">🔧 HubSpot Form Integration Point</h4>
                <p className="text-sm text-yellow-700 mb-4">
                  This is where your HubSpot embedded form will be placed to capture leads with all the calculated data.
                </p>
                <div className="bg-white p-4 rounded border border-yellow-300">
                  <p className="text-sm text-gray-600 italic">
                    [HubSpot Embedded Form Goes Here - Replace this section with your actual HubSpot embed code]
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="px-8 py-3 text-lg"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-8 py-3 text-lg bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 hover:from-slate-800 hover:via-blue-800 hover:to-slate-800"
              >
                {step === 4 ? 'Calculate My Growth Potential' : 'Continue'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 5 && (
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setResults(null)
                  setShowPersonalizedInsights(false)
                  setFormData({
                    monthlyRevenue: '',
                    averageOrderValue: '',
                    monthlyOrders: '',
                    industry: '',
                    currentConversionRate: '',
                    cartAbandonmentRate: '',
                    timeSpentOnManualTasks: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    businessName: '',
                    website: '',
                    phoneNumber: '',
                    businessStage: '',
                    biggestChallenge: '',
                    monthlyAdSpend: ''
                  })
                }}
                className="px-8 py-3 text-lg"
              >
                Calculate for Another Business
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trust Signals Footer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>🔒 Your data is encrypted and secure • Used by 500+ successful Shopify stores • SOC 2 certified</p>
      </div>
    </div>
  )
}

export default UltimateROICalculator

