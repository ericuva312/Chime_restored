const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const stripe = require('stripe')
const nodemailer = require('nodemailer')
const { generateConfirmationEmail, generateWelcomeEmail, generateChimeNotificationEmail } = require('./email-templates')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY)

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Payment server is running' })
})

// Stripe: Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, plan, customer } = req.body

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || 'usd',
      metadata: {
        plan: plan,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_company: customer.company,
        customer_website: customer.website
      },
    })

    res.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: error.message })
  }
})

// Stripe: Confirm Payment
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { payment_intent_id, customer, plan, amount } = req.body

    const paymentIntent = await stripeClient.paymentIntents.retrieve(payment_intent_id)

    if (paymentIntent.status === 'succeeded') {
      await handleSuccessfulPayment({
        payment_method: 'stripe',
        payment_intent_id: payment_intent_id,
        customer: customer,
        plan: plan,
        amount: amount
      })

      res.json({ success: true, message: 'Payment processed successfully' })
    } else {
      res.status(400).json({ error: 'Payment not completed' })
    }
  } catch (error) {
    console.error('Error confirming payment:', error)
    res.status(500).json({ error: error.message })
  }
})

// Payment Success Handler
app.post('/api/payment-success', async (req, res) => {
  try {
    const { payment_intent_id, customer, plan, amount } = req.body

    await handleSuccessfulPayment({
      payment_method: 'stripe',
      payment_intent_id: payment_intent_id,
      customer: customer,
      plan: plan,
      amount: amount
    })

    res.json({ success: true, message: 'Payment processed successfully' })
  } catch (error) {
    console.error('Error handling payment success:', error)
    res.status(500).json({ error: error.message })
  }
})

// Stripe: Create Checkout Session (Embedded)
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, plan, planName, customer } = req.body

    const session = await stripeClient.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${planName} Plan Setup`,
              description: `Chime AI automation setup for ${customer.company}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customer.email,
      metadata: {
        plan: plan,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_company: customer.company,
        customer_phone: customer.phone || '',
        customer_website: customer.website
      },
      return_url: `${req.headers.origin || 'http://localhost:5173'}/#/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.json({ client_secret: session.client_secret })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: error.message })
  }
})

// Stripe Webhook Handler for Payment Success
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment succeeded for session:', session.id)
      
      // Extract customer and plan data from session metadata
      const customerData = {
        name: session.metadata.customer_name,
        email: session.metadata.customer_email || session.customer_email,
        company: session.metadata.customer_company,
        phone: session.metadata.customer_phone,
        website: session.metadata.customer_website
      }
      
      const planType = session.metadata.plan
      const amount = session.amount_total / 100 // Convert from cents
      
      // Trigger automated workflow
      await handleSuccessfulPayment({
        payment_method: 'stripe',
        session_id: session.id,
        customer: customerData,
        plan: planType,
        amount: amount
      })
      
      break
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent succeeded:', paymentIntent.id)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({received: true})
})

// Handle successful payment with automated email workflow
async function handleSuccessfulPayment(paymentData) {
  const { payment_method, customer, plan, amount, session_id } = paymentData
  const sessionId = session_id || paymentData.payment_intent_id || 'manual_' + Date.now()

  console.log(`Processing payment success for ${customer.email} - ${plan} plan - $${amount}`)

  try {
    // 1. Send immediate confirmation email to customer (within 60 seconds)
    const confirmationEmail = generateConfirmationEmail(customer, plan, amount, sessionId)
    
    await emailTransporter.sendMail({
      from: process.env.FROM_EMAIL || 'hello@chime.co',
      to: customer.email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    })
    
    console.log(`Confirmation email sent to ${customer.email}`)

    // 2. Send notification email to Chime team immediately
    const chimeNotificationEmail = generateChimeNotificationEmail(customer, plan, amount, sessionId)
    
    await emailTransporter.sendMail({
      from: process.env.FROM_EMAIL || 'hello@chime.co',
      to: 'hello@chime.co',
      subject: chimeNotificationEmail.subject,
      html: chimeNotificationEmail.html,
    })
    
    console.log(`Chime team notification sent for ${customer.company}`)

    // 3. Schedule welcome email with implementation details (sent after confirmation)
    setTimeout(async () => {
      try {
        const welcomeEmail = generateWelcomeEmail(customer, plan, amount)
        
        await emailTransporter.sendMail({
          from: process.env.FROM_EMAIL || 'hello@chime.co',
          to: customer.email,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html,
        })
        
        console.log(`Welcome email sent to ${customer.email}`)
      } catch (error) {
        console.error('Error sending welcome email:', error)
      }
    }, 2 * 60 * 1000) // Send welcome email 2 minutes after confirmation

    console.log(`Payment workflow completed successfully for ${customer.email}`)
    
  } catch (error) {
    console.error('Error in payment success workflow:', error)
    throw error
  }
}

// Stripe: Retrieve Checkout Session
app.get('/api/checkout-session/:sessionId', async (req, res) => {
  try {
    const session = await stripeClient.checkout.sessions.retrieve(req.params.sessionId)
    res.json({ session })
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    res.status(500).json({ error: error.message })
  }
})

// Stripe: Webhook endpoint
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    // For development, you can skip signature verification
    // In production, you should set STRIPE_WEBHOOK_SECRET
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripeClient.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } else {
      event = JSON.parse(req.body)
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Checkout session completed:', session.id)
      
      // Extract customer data from metadata
      const customerData = {
        name: session.metadata.customer_name,
        email: session.metadata.customer_email,
        company: session.metadata.customer_company,
        phone: session.metadata.customer_phone,
        website: session.metadata.customer_website
      }

      // Handle successful payment
      await handleSuccessfulPayment({
        payment_method: 'stripe_checkout',
        session_id: session.id,
        customer: customerData,
        plan: session.metadata.plan,
        amount: session.amount_total / 100 // Convert from cents
      })
      break
    
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({received: true})
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

module.exports = app

