import { useState } from 'react'
import { submitAuditToHubSpot, sendEmailNotification } from '../utils/hubspot'
import { Calculator, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const ROICalculator = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    monthlyRevenue: '',
    industry: '',
    businessStage: '',
    mainChallenges: ''
  })
  const [results, setResults] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateROI = () => {
    const revenue = parseFloat(formData.monthlyRevenue.replace(/[^0-9]/g, '')) || 0
    
    // Industry-specific multipliers
    const industryMultipliers = {
      'Fashion & Apparel': 1.88,
      'Electronics': 1.34,
      'Health & Wellness': 1.67,
      'Beauty & Cosmetics': 1.45,
      'Home & Garden': 1.23,
      'Specialty Food': 1.56,
      'Pet Products': 1.78
    }

    // Business stage multipliers
    const stageMultipliers = {
      'Startup': 1.1,
      'Growing': 1.0,
      'Established': 0.9,
      'Enterprise': 0.8
    }

    const industryMultiplier = industryMultipliers[formData.industry] || 1.25
    const stageMultiplier = stageMultipliers[formData.businessStage] || 1.0
    
    const projectedGrowth = Math.min(industryMultiplier * stageMultiplier, 2.5) // Cap at 250%
    const newMonthlyRevenue = revenue * projectedGrowth
    const additionalRevenue = newMonthlyRevenue - revenue
    const annualAdditionalRevenue = additionalRevenue * 12
    const timeSaved = 22 // hours per week
    const costSavings = timeSaved * 4 * 50 // $50/hour, 4 weeks

    return {
      currentRevenue: revenue,
      projectedRevenue: newMonthlyRevenue,
      additionalRevenue,
      annualAdditionalRevenue,
      growthPercentage: ((projectedGrowth - 1) * 100).toFixed(0),
      timeSaved,
      costSavings,
      roi: ((annualAdditionalRevenue / 35964) * 100).toFixed(0) // ROI based on annual service cost
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      const calculatedResults = calculateROI()
      setResults(calculatedResults)
      setStep(4)
    }
  }

  const handleSubmitAudit = async () => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Submit to HubSpot
      await submitAuditToHubSpot(formData)
      
      // Send email notification
      await sendEmailNotification(formData, 'audit')
      
      setSubmitStatus('success')
    } catch (error) {
      console.error('Audit submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of 4</span>
          <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Business Information */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your business</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company/Store Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourstore.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.company}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-blue-600 hover:border-blue-700 disabled:border-blue-400"
            >
              Next: Business Details
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Revenue and Industry */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Monthly Revenue *
              </label>
              <select
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select revenue range</option>
                <option value="$5,000">Under $5K</option>
                <option value="$10,000">$5K - $10K</option>
                <option value="$25,000">$10K - $25K</option>
                <option value="$50,000">$25K - $50K</option>
                <option value="$100,000">$50K - $100K</option>
                <option value="$250,000">$100K - $250K</option>
                <option value="$500,000">$250K+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select your industry</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Electronics">Electronics</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Specialty Food">Specialty Food</option>
                <option value="Pet Products">Pet Products</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Stage *
              </label>
              <select
                name="businessStage"
                value={formData.businessStage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select business stage</option>
                <option value="Startup">Startup (0-2 years)</option>
                <option value="Growing">Growing (2-5 years)</option>
                <option value="Established">Established (5+ years)</option>
                <option value="Enterprise">Enterprise (Large team)</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-gray-200 hover:border-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.monthlyRevenue || !formData.industry || !formData.businessStage}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-blue-600 hover:border-blue-700 disabled:border-blue-400"
              >
                Next: Challenges
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Challenges */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What are your main challenges?</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your biggest challenges with your Shopify store
              </label>
              <textarea
                name="mainChallenges"
                value={formData.mainChallenges}
                onChange={handleInputChange}
                rows={4}
                placeholder="e.g., Low conversion rates, abandoned carts, manual processes, inventory management, customer retention..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-gray-200 hover:border-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-blue-600 hover:border-blue-700"
              >
                Calculate ROI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && results && (
        <div className="space-y-8">
          {/* ROI Results */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Projected Results with Chime
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">
                  +{formatCurrency(results.additionalRevenue)}
                </div>
                <div className="text-sm text-gray-600">Additional Monthly Revenue</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  +{results.growthPercentage}%
                </div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl text-center">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {results.timeSaved}h
                </div>
                <div className="text-sm text-gray-600">Time Saved Per Week</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Annual Impact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.annualAdditionalRevenue)}
                  </div>
                  <div className="text-sm text-gray-600">Additional Annual Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.roi}% ROI
                  </div>
                  <div className="text-sm text-gray-600">Return on Investment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Get Audit Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free AI Automation Audit</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-800">Thank you! We'll send your detailed audit report within 24 hours.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-800">There was an error submitting your request. Please try again or contact us directly.</span>
              </div>
            )}

            {submitStatus !== 'success' && (
              <>
                <p className="text-gray-600 mb-6">
                  Want to see exactly how we'll achieve these results for your store? Get a free, personalized AI automation audit that shows:
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Specific automation opportunities in your store</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Custom implementation roadmap</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Detailed ROI projections for your business</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Priority recommendations for maximum impact</span>
                  </li>
                </ul>

                <button
                  onClick={handleSubmitAudit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-blue-600 hover:border-blue-700 disabled:border-blue-400"
                >
                  {isSubmitting ? 'Requesting Audit...' : 'Get My Free AI Automation Audit'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ROICalculator

