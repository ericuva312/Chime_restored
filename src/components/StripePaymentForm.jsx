import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock } from 'lucide-react'

const StripePaymentForm = ({ amount, planName, planType }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Get the correct price ID based on plan type
  const getPriceId = (planType) => {
    const priceIds = {
      growth: import.meta.env.VITE_STRIPE_GROWTH_PRICE_ID,
      professional: import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID,
      enterprise: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID
    }
    return priceIds[planType] || priceIds.professional
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.')
      return
    }

    setIsProcessing(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    try {
      // Create payment method first
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Customer', // You can collect this from a form field
        },
      })

      if (paymentMethodError) {
        setError(paymentMethodError.message)
        setIsProcessing(false)
        return
      }

      // Create payment intent with payment method attached
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          plan: planType,
          customer: {
            name: 'Customer', // This should be collected from form
            email: 'customer@example.com', // This should be collected from form
            company: 'Company', // This should be collected from form
            website: 'https://example.com' // This should be collected from form
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const { client_secret, error: backendError } = await response.json()

      if (backendError) {
        setError(backendError)
        setIsProcessing(false)
        return
      }

      // Confirm payment with the client secret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethod.id
      })

      if (confirmError) {
        setError(confirmError.message)
        setIsProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        setSuccess(true)
        setError(null)
        
        // Redirect to success page or show success message
        setTimeout(() => {
          window.location.href = '/payment-success?plan=' + planType
        }, 2000)
      }

    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Payment error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600">
          Thank you for choosing Chime. We'll be in touch within 24 hours to begin your implementation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700">Card Information</span>
        </div>
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500">
        <Lock className="w-4 h-4 mr-2" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${amount.toLocaleString()} - Start Implementation`
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        By completing this purchase, you agree to our Terms of Service and Privacy Policy.
        90-day money-back guarantee included.
      </div>
    </form>
  )
}

export default StripePaymentForm

