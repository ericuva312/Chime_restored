import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import StripeCheckoutForm from '../components/StripeCheckoutForm'
import { Check, Shield, Star, Lock, CreditCard, ArrowRight, Users, Award, Clock, TrendingUp, Zap, Globe } from 'lucide-react'

const PaymentPage = () => {
  const [searchParams] = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: ''
  })
  const [formErrors, setFormErrors] = useState({})

  const plans = {
    growth: {
      name: 'Growth',
      setupFee: 2997,
      monthlyFee: 997,
      description: 'Perfect for growing Shopify stores ready to scale',
      guarantee: '15%'
    },
    professional: {
      name: 'Professional',
      setupFee: 4997,
      monthlyFee: 1497,
      description: 'Most popular choice for serious e-commerce businesses',
      guarantee: '20%'
    },
    enterprise: {
      name: 'Enterprise',
      setupFee: 9997,
      monthlyFee: 2997,
      description: 'Complete AI transformation for high-volume stores',
      guarantee: '25%'
    }
  }

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan && plans[plan]) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const currentPlan = plans[selectedPlan]

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!customerData.name.trim()) {
      errors.name = 'Full name is required'
    }
    
    if (!customerData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!customerData.company.trim()) {
      errors.company = 'Company name is required'
    }
    
    if (!customerData.website.trim()) {
      errors.website = 'Shopify store URL is required'
    } else if (!customerData.website.includes('myshopify.com') && !customerData.website.includes('.com')) {
      errors.website = 'Please enter a valid store URL'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setShowCheckout(true)
    }
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Secure Payment
            </h1>
            <p className="text-lg text-blue-100">
              {currentPlan.name} Plan - ${currentPlan.setupFee.toLocaleString()}
            </p>
            <button 
              onClick={() => setShowCheckout(false)}
              className="mt-4 text-blue-300 hover:text-blue-100 text-sm underline"
            >
              ← Back to edit information
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Customer Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <div className="font-medium">{customerData.name}</div>
                    <div className="text-gray-500">{customerData.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Company:</span>
                    <div className="font-medium">{customerData.company}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Plan:</span>
                    <div className="font-medium">{currentPlan.name}</div>
                  </div>
                  <div className="border-t pt-3">
                    <span className="text-gray-600">Total:</span>
                    <div className="text-xl font-bold text-blue-600">
                      ${currentPlan.setupFee.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Additional Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-3">
                    <div className="flex items-center text-xs text-gray-600">
                      <Shield className="w-4 h-4 text-green-600 mr-2" />
                      <span>256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Lock className="w-4 h-4 text-green-600 mr-2" />
                      <span>PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Award className="w-4 h-4 text-green-600 mr-2" />
                      <span>SOC 2 Type II Certified</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Users className="w-4 h-4 text-blue-600 mr-2" />
                      <span>Trusted by 500+ Businesses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe Checkout */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Secure Payment by Stripe
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your payment is protected by industry-leading security
                    </p>
                  </div>
                </div>
                
                <StripeCheckoutForm 
                  amount={currentPlan.setupFee}
                  planName={currentPlan.name}
                  planType={selectedPlan}
                  customerData={customerData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Complete Your Order
          </h1>
          <p className="text-lg text-blue-100">
            {currentPlan.name} Plan - ${currentPlan.setupFee.toLocaleString()}
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 mt-4 text-blue-200 text-sm">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>500+ Happy Clients</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>188% Avg Growth</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>48hr Setup</span>
            </div>
          </div>
        </div>

        {/* Equal width layout - 2 columns with each section taking 1 column */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-8">
              
              {/* Quick Plan Selector with improved contrast */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Plan</h2>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(plans).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPlan === key
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-300 text-gray-800 hover:bg-gray-400 border border-gray-400 shadow-sm'
                      }`}
                    >
                      {plan.name} - ${plan.setupFee.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="John Smith"
                    />
                    {formErrors.name && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={customerData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.company ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Your Company"
                    />
                    {formErrors.company && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shopify Store URL *
                    </label>
                    <input
                      type="url"
                      value={customerData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.website ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="https://yourstore.myshopify.com"
                    />
                    {formErrors.website && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.website}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <div className="mb-6">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Security & Trust Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Your Security is Our Priority
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 text-green-600 mr-2" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 text-green-600 mr-2" />
                    <span>PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-green-600 mr-2" />
                    <span>SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-green-600 mr-2" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-center text-sm text-gray-500">
                <p>
                  <Shield className="w-4 h-4 inline mr-1" />
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary - Equal width with lg:col-span-1 in 2-column grid */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-8 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Plan Details */}
              <div className="mb-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900">{currentPlan.name} Plan</h4>
                  <p className="text-sm text-blue-700">{currentPlan.description}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup Fee</span>
                    <span className="font-semibold">${currentPlan.setupFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Due Today</span>
                      <span>${currentPlan.setupFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Key Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What You Get</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>{currentPlan.guarantee}% minimum revenue growth guarantee</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>48-hour implementation</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>90-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>24/7 priority support</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Dedicated success manager</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Free monthly optimization</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Advanced AI analytics dashboard</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Custom automation workflows</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Performance monitoring & alerts</span>
                  </div>
                </div>
              </div>

              {/* Monthly Billing */}
              <div className="text-sm text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg">
                <strong>Monthly billing:</strong> ${currentPlan.monthlyFee}/month starts after implementation
              </div>

              {/* Enhanced Guarantee */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-green-800 mb-1">
                      90-Day Money-Back Guarantee
                    </div>
                    <div className="text-sm text-green-700">
                      If we don't deliver the promised {currentPlan.guarantee}% revenue growth within 90 days, 
                      you get your money back. No questions asked.
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <div className="text-sm font-semibold text-blue-900">4.9/5 Customer Rating</div>
                  <div className="text-xs text-blue-700">Based on 500+ reviews</div>
                </div>
              </div>

              {/* Additional Trust Elements */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Why Choose Chime?</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Average 188% revenue increase</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>500+ successful implementations</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>48-hour setup guarantee</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <span>Secured by Stripe</span>
                </div>
                <div className="flex items-center justify-center">
                  <Award className="w-4 h-4 text-blue-600 mr-2" />
                  <span>Shopify Plus Partner</span>
                </div>
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-600 mr-2" />
                  <span>AI-Powered Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

