import { useState } from 'react'
import { ArrowRight, Calculator, TrendingUp, DollarSign, CheckCircle, Users, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EnhancedROICalculator = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    monthlyRevenue: '',
    averageOrderValue: '',
    monthlyOrders: '',
    industry: '',
    currentConversionRate: '',
    email: '',
    businessName: ''
  })
  const [results, setResults] = useState(null)
  const [showLeadForm, setShowLeadForm] = useState(false)

  const industries = [
    'Fashion & Apparel',
    'Electronics',
    'Health & Wellness',
    'Beauty & Cosmetics',
    'Home & Garden',
    'Food & Beverage',
    'Pet Products',
    'Other'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateROI = () => {
    const revenue = parseFloat(formData.monthlyRevenue) || 0
    const orders = parseFloat(formData.monthlyOrders) || 0
    const aov = parseFloat(formData.averageOrderValue) || 0
    
    // Conservative estimates based on industry data
    const revenueIncrease = revenue * 0.20 // 20% average increase
    const newMonthlyRevenue = revenue + revenueIncrease
    const yearlyIncrease = revenueIncrease * 12
    const roi = ((yearlyIncrease - 12000) / 12000) * 100 // Assuming $1000/month cost
    
    setResults({
      currentRevenue: revenue,
      newRevenue: newMonthlyRevenue,
      monthlyIncrease: revenueIncrease,
      yearlyIncrease: yearlyIncrease,
      roi: roi,
      recoveredCarts: Math.floor(orders * 0.3), // 30% cart recovery
      timesSaved: 25 // hours per week
    })
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      calculateROI()
      setStep(4)
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

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.monthlyRevenue && formData.averageOrderValue && formData.monthlyOrders
      case 2:
        return formData.industry && formData.currentConversionRate
      case 3:
        return formData.email && formData.businessName
      default:
        return true
    }
  }

  // HubSpot Form Component
  const HubSpotLeadForm = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 mt-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🎯 Ready to Achieve These Results?
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Get your personalized implementation plan and start growing in 48 hours
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            500+ Success Stories
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-green-600" />
            48-Hour Setup
          </div>
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-purple-600" />
            90-Day Guarantee
          </div>
        </div>
      </div>

      {/* HubSpot Embedded Form Container */}
      <div className="max-w-md mx-auto">
        <div id="hubspot-form-container" className="bg-white p-6 rounded-lg shadow-sm">
          {/* This is where the HubSpot embed code will be inserted */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                defaultValue={formData.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                defaultValue={formData.businessName}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Revenue
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select range...</option>
                <option value="0-10k">$0 - $10,000</option>
                <option value="10k-50k">$10,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-500k">$100,000 - $500,000</option>
                <option value="500k+">$500,000+</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get My Personalized Growth Plan →
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            🔒 Your information is secure and will never be shared. 
            <br />
            By submitting, you agree to receive follow-up communications about our services.
          </p>
        </div>
      </div>

      {/* HubSpot Embed Code Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Instructions:</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>1. Create HubSpot Form:</strong> Go to Marketing → Forms → Create Form</p>
          <p><strong>2. Add Required Fields:</strong> First Name, Last Name, Email, Company, Phone, Monthly Revenue</p>
          <p><strong>3. Get Embed Code:</strong> Click Actions → Share → Embed Code tab</p>
          <p><strong>4. Replace Mock Form:</strong> Replace the form HTML above with your HubSpot embed code</p>
          <p><strong>5. Style with CSS:</strong> Use custom CSS to match your brand colors and spacing</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            ROI Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Discover your potential revenue growth with Chime AI automation
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Current Business Metrics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Revenue ($)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Order Value ($)
                  </label>
                  <input
                    type="number"
                    value={formData.averageOrderValue}
                    onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Orders
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyOrders}
                    onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="667"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Business Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentConversionRate}
                    onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  We'll send your detailed ROI report to this email address
                </p>
              </div>
            </div>
          )}

          {step === 4 && results && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Your Projected Results with Chime AI
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.monthlyIncrease)}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Revenue Increase</div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.yearlyIncrease)}
                  </div>
                  <div className="text-sm text-gray-600">Annual Revenue Increase</div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(results.roi)}%
                  </div>
                  <div className="text-sm text-gray-600">ROI in First Year</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Additional Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Recover {results.recoveredCarts}+ abandoned carts monthly</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Save {results.timesSaved} hours per week</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 AI-powered optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>90-day money-back guarantee</span>
                  </div>
                </div>
              </div>

              {/* HubSpot Lead Capture Form */}
              <HubSpotLeadForm />
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 bg-blue-600 hover:bg-blue-700"
              >
                {step === 3 ? 'Calculate ROI' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setResults(null)
                  setShowLeadForm(false)
                  setFormData({
                    monthlyRevenue: '',
                    averageOrderValue: '',
                    monthlyOrders: '',
                    industry: '',
                    currentConversionRate: '',
                    email: '',
                    businessName: ''
                  })
                }}
                className="px-6"
              >
                Calculate Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EnhancedROICalculator

