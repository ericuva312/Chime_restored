import React, { useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { User, AlertCircle, CheckCircle, Loader } from 'lucide-react'

const PayPalPaymentForm = ({ amount, plan, planName, isProcessing, setIsProcessing }) => {
  const [{ isPending }] = usePayPalScriptReducer()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: ''
  })

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const createOrder = async (data, actions) => {
    try {
      setIsProcessing(true)
      setError(null)

      // Create order on backend
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'USD',
          plan: plan,
          customer: customerInfo,
          payment_method: 'paypal'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create PayPal order')
      }

      const { order_id } = await response.json()
      return order_id
    } catch (err) {
      setError(err.message || 'Failed to create PayPal order')
      setIsProcessing(false)
      throw err
    }
  }

  const onApprove = async (data, actions) => {
    try {
      // Capture payment on backend
      const response = await fetch('/api/capture-paypal-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: data.orderID,
          customer: customerInfo,
          plan: plan,
          amount: amount
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to capture PayPal payment')
      }

      const result = await response.json()
      
      if (result.status === 'COMPLETED') {
        setSuccess(true)
        
        // Send confirmation email and create customer record
        await fetch('/api/payment-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paypal_order_id: data.orderID,
            customer: customerInfo,
            plan: plan,
            amount: amount
          }),
        })
      } else {
        throw new Error('Payment was not completed successfully')
      }
    } catch (err) {
      setError(err.message || 'Failed to process PayPal payment')
    }
    
    setIsProcessing(false)
  }

  const onError = (err) => {
    setError('PayPal payment failed. Please try again.')
    setIsProcessing(false)
    console.error('PayPal error:', err)
  }

  const onCancel = (data) => {
    setError('Payment was cancelled. Please try again if you wish to proceed.')
    setIsProcessing(false)
  }

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.company && customerInfo.website

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
        <p className="text-blue-200 mb-4">
          Thank you for choosing Chime! Your {planName} plan implementation will begin within 48 hours.
        </p>
        <p className="text-blue-200 text-sm">
          You'll receive a confirmation email with next steps and your dedicated implementation manager's contact information.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Customer Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center">
          <User className="w-5 h-5 mr-2" />
          Contact Information
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={customerInfo.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Your Company"
            />
          </div>
          
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-blue-200 text-sm font-medium mb-2">
            Shopify Store URL *
          </label>
          <input
            type="url"
            name="website"
            value={customerInfo.website}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="https://yourstore.myshopify.com"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* PayPal Buttons */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          Complete Payment with PayPal
        </h4>
        
        {isPending && (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-blue-400" />
            <span className="ml-2 text-blue-200">Loading PayPal...</span>
          </div>
        )}
        
        {!isPending && isFormValid && (
          <div className="paypal-buttons-container">
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal',
                height: 50
              }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
              disabled={isProcessing}
            />
          </div>
        )}
        
        {!isFormValid && (
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              Please fill in all required fields above to proceed with PayPal payment.
            </p>
          </div>
        )}
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
          <span className="ml-2 text-blue-200">Processing payment...</span>
        </div>
      )}

      {/* Security Notice */}
      <div className="text-center text-blue-200 text-sm">
        Your payment is processed securely through PayPal. We never store your payment information.
      </div>
    </div>
  )
}

export default PayPalPaymentForm

