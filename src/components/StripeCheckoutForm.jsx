import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RiPccHaYvGfnRgRzbsBWpUeY3cRcAMF3LOYDzZiLxICymrXIm227cIKY5VcK3QDDnMUEXUCYLz1m6QTMYNecxRj0065arrkYQ')

const StripeCheckoutForm = ({ amount, planName, planType, customerData }) => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        setLoading(true)
        setError('')

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        
        const response = await fetch(`${apiUrl}/api/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: planType,
            name: customerData?.name || 'Customer',
            email: customerData?.email || 'customer@example.com',
            company: customerData?.company || 'Company',
            website: customerData?.website || 'https://example.com'
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.client_secret) {
          setClientSecret(data.client_secret)
        } else {
          throw new Error('No client secret received')
        }
      } catch (err) {
        console.error('Error creating checkout session:', err)
        setError('Failed to initialize payment. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (amount && planType) {
      createCheckoutSession()
    }
  }, [amount, planType, planName, customerData])

  const options = {
    clientSecret,
    onComplete: () => {
      // Handle successful payment
      console.log('Payment completed successfully')
      // You can redirect to a success page or show a success message
      window.location.href = '/#/payment-success'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading secure payment form...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800 font-medium">Payment Error</div>
        <div className="text-red-600 text-sm mt-1">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="text-yellow-800">Initializing payment...</div>
      </div>
    )
  }

  return (
    <div className="stripe-checkout-container">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default StripeCheckoutForm

