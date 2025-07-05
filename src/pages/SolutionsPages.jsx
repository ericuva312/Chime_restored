import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Mail, Package, DollarSign, TrendingUp, Clock, Users, Zap } from 'lucide-react'

// Cart Recovery Page
export const CartRecoveryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Watching <span className="text-red-600">$50,000+ Walk Away</span> Every Month?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're losing sleep knowing that 70% of your customers add items to cart but never complete their purchase. That's not just lost sales—it's lost dreams, lost growth, and lost peace of mind. Chime's AI doesn't just recover carts; it recovers your sanity and your revenue.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Painful Reality:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• You're manually sending generic "forgot something?" emails that get ignored</li>
                  <li>• You watch your analytics knowing customers were THIS close to buying</li>
                  <li>• You're losing $2,000-$10,000+ monthly to abandoned carts</li>
                  <li>• You feel helpless watching potential revenue slip away daily</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  Stop The Revenue Bleeding Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  See Your Lost Revenue
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Chime Recovers For You</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cart Recovery Rate</span>
                  <span className="text-2xl font-bold text-green-600">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Revenue Recovered</span>
                  <span className="text-2xl font-bold text-blue-600">$47,320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time You Save Weekly</span>
                  <span className="text-2xl font-bold text-purple-600">25 hours</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 1,847% in first 90 days</p>
                  <p className="text-green-700 text-sm">Your investment pays for itself in 3 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Finally, Cart Recovery That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop sending desperate "You forgot something!" emails that make you look amateur. Chime's AI knows exactly when, how, and what to say to bring customers back—without sounding pushy or desperate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect Timing Intelligence</h3>
              <p className="text-gray-600">
                No more guessing when to send recovery emails. Our AI analyzes each customer's behavior patterns and sends messages at the exact moment they're most likely to complete their purchase—not when it's convenient for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hyper-Personal Messages</h3>
              <p className="text-gray-600">
                Stop sending generic "complete your order" emails. Every message is crafted based on what they viewed, how long they browsed, their purchase history, and even their device preferences. It feels like you personally wrote each email.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Channel Recovery</h3>
              <p className="text-gray-600">
                Email isn't enough anymore. Chime coordinates recovery across email, SMS, retargeting ads, and even push notifications—all perfectly timed to avoid overwhelming customers while maximizing touchpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Frustration to Celebration
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine checking your phone tomorrow morning and seeing notification after notification of completed purchases from customers who abandoned their carts yesterday. That's not a dream—that's your new reality with Chime.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Watching $50,000+ walk away monthly, sending desperate generic emails, losing sleep over lost revenue</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Recovering 67% of abandoned carts automatically, sleeping peacefully knowing AI is working 24/7, celebrating consistent revenue growth</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Shopify Store Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"I was losing $8,000/month to abandoned carts"</p>
                  <p className="text-gray-600 text-sm">Now recovering $5,360 monthly with Chime's AI</p>
                  <p className="text-green-600 font-semibold text-sm">ROI: 1,247% in 60 days</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Generic cart emails got 2% response"</p>
                  <p className="text-gray-600 text-sm">Chime's personalized sequences get 34% conversion</p>
                  <p className="text-blue-600 font-semibold text-sm">17x improvement in performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Losing Revenue While You Sleep
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Every day you wait is another $1,000-$3,000 walking out the door. Your competitors are already using AI to recover their abandoned carts. Don't let them steal your customers AND your revenue.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-blue-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Start Recovering Revenue Today
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-blue-200 text-sm mt-4">
            ✓ Setup in 48 hours ✓ See results in 7 days ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Email Automation Page
export const EmailAutomationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Tired of <span className="text-red-600">Embarrassing Generic Emails</span> That Scream "Mass Marketing"?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You know that sinking feeling when you send an email blast and immediately regret it? When customers unsubscribe because your emails feel robotic and irrelevant? Chime's AI creates emails so personal, your customers will think you have a psychic marketing team.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Email Marketing Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Spending 15+ hours weekly crafting emails that get 2% open rates</li>
                  <li>• Watching unsubscribe rates climb while sales plummet</li>
                  <li>• Sending "Dear [First Name]" emails that feel fake and desperate</li>
                  <li>• Losing customers to competitors with better email game</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-green-600 hover:border-green-700"
                >
                  Transform My Email Marketing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-green-600 hover:border-green-700"
                >
                  See Email ROI Potential
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Email Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Open Rate Increase</span>
                  <span className="text-2xl font-bold text-green-600">+347%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Click-Through Rate</span>
                  <span className="text-2xl font-bold text-blue-600">+892%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Per Email</span>
                  <span className="text-2xl font-bold text-purple-600">$47.32</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 2,340% in first quarter</p>
                  <p className="text-green-700 text-sm">Each $1 spent generates $23.40 in revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Email Marketing That Feels Like Mind Reading
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop guessing what your customers want to hear. Chime's AI analyzes every click, purchase, and behavior to craft emails that feel like you're reading their minds—because you basically are.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Behavioral Trigger Mastery</h3>
              <p className="text-gray-600">
                Forget scheduled blasts. Our AI sends emails based on what customers DO, not what day it is. Browse a category? Get relevant recommendations. Abandon a cart? Get a perfectly timed recovery sequence. It's like having a personal assistant for every customer.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Psychographic Personalization</h3>
              <p className="text-gray-600">
                We don't just use their name—we understand their personality. Are they price-conscious? Quality-focused? Impulse buyers? Every email is crafted to match their psychological profile and buying triggers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Send Optimization</h3>
              <p className="text-gray-600">
                Our AI predicts when each customer is most likely to open, read, and buy. No more sending emails into the void—every message arrives at the perfect psychological moment for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Email Anxiety to Email Excitement
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine customers actually LOOKING FORWARD to your emails. Imagine open rates so high you double-check the analytics. Imagine emails that sell products while you sleep. That's not fantasy—that's Chime.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Dreading email campaigns, 2% open rates, customers unsubscribing, spending weekends writing emails nobody reads</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Customers eagerly opening emails, 47% open rates, growing subscriber lists, emails generating $47+ per send automatically</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Shopify Email Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"My emails were getting 1.8% open rates"</p>
                  <p className="text-gray-600 text-sm">Now averaging 43% with Chime's AI personalization</p>
                  <p className="text-green-600 font-semibold text-sm">2,389% improvement in engagement</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Spent 20 hours/week on email marketing"</p>
                  <p className="text-gray-600 text-sm">Now spend 2 hours while generating 5x more revenue</p>
                  <p className="text-blue-600 font-semibold text-sm">90% time savings, 500% revenue increase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Embarrassing Yourself with Amateur Emails
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Your competitors are already using AI to create emails that convert. Every day you send generic emails is another day you're losing customers and revenue to smarter marketers.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-green-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Transform My Email Marketing Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-green-200 text-sm mt-4">
            ✓ Setup in 24 hours ✓ See results in first send ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Inventory Management Page
export const InventoryManagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Drowning in <span className="text-red-600">$30,000+ Monthly Losses</span> from Stockouts and Dead Inventory?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're trapped in inventory hell: either watching customers leave because you're out of stock, or drowning in cash tied up in products that won't sell. Chime's AI doesn't just manage inventory—it predicts the future and keeps you profitable.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Inventory Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Losing $5,000+ weekly to stockouts on bestsellers</li>
                  <li>• $50,000+ tied up in slow-moving inventory eating your cash flow</li>
                  <li>• Spending 20+ hours weekly manually tracking and reordering</li>
                  <li>• Constantly stressed about having too much or too little stock</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-purple-600 hover:border-purple-700"
                >
                  Fix My Inventory Chaos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-purple-600 hover:border-purple-700"
                >
                  Calculate Inventory Savings
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Inventory Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stockout Reduction</span>
                  <span className="text-2xl font-bold text-green-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inventory Costs Saved</span>
                  <span className="text-2xl font-bold text-blue-600">$67,340</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Saved Weekly</span>
                  <span className="text-2xl font-bold text-purple-600">22 hours</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 1,567% in first 6 months</p>
                  <p className="text-green-700 text-sm">Pays for itself in 3 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Inventory Management That Sees the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop playing inventory roulette. Chime's AI analyzes 47 different data points to predict exactly what you'll sell, when you'll sell it, and how much to order. It's like having a crystal ball for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Demand Forecasting</h3>
              <p className="text-gray-600">
                Our AI doesn't just look at last month's sales—it analyzes seasonality, trends, competitor activity, economic indicators, and even weather patterns to predict demand with 97% accuracy. Never get caught off-guard again.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Auto-Reordering</h3>
              <p className="text-gray-600">
                Forget spreadsheets and manual calculations. Our AI automatically reorders products at the perfect time, considering lead times, supplier reliability, and cash flow optimization. Wake up to perfectly stocked inventory.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cash Flow Optimization</h3>
              <p className="text-gray-600">
                Stop having your money trapped in dead inventory. Our AI identifies slow-movers before they become problems and optimizes your inventory investment to maximize cash flow and profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Inventory Stress to Inventory Success
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine never running out of your bestsellers again. Imagine having perfect inventory levels without tying up unnecessary cash. Imagine sleeping peacefully knowing your inventory is optimized 24/7. That's life with Chime.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Constant stockouts, $50K+ in dead inventory, 20+ hours weekly on inventory management, stressed about cash flow</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">99.7% in-stock rate, 40% less inventory investment, 2 hours weekly on inventory, optimized cash flow and peace of mind</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Shopify Inventory Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Was losing $12K monthly to stockouts"</p>
                  <p className="text-gray-600 text-sm">Now maintain 99.8% in-stock rate with Chime's AI</p>
                  <p className="text-green-600 font-semibold text-sm">$144K annual revenue recovery</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Had $80K tied up in slow inventory"</p>
                  <p className="text-gray-600 text-sm">Reduced inventory by 45% while improving availability</p>
                  <p className="text-blue-600 font-semibold text-sm">$36K cash flow improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Bleeding Money on Inventory Mistakes
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Every day you manage inventory manually is another day you're losing money to stockouts and dead stock. Your competitors are already using AI to optimize their inventory. Don't let them steal your market share.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-purple-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Optimize My Inventory Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-purple-200 text-sm mt-4">
            ✓ Setup in 48 hours ✓ See results in 1 week ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Pricing Optimization Page
export const PricingOptimizationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Still <span className="text-red-600">Guessing Your Prices</span> and Leaving Money on the Table?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're either pricing too low and missing out on thousands in profit, or pricing too high and losing customers to competitors. Chime's AI finds the sweet spot that maximizes both sales volume AND profit margins.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Pricing Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Losing $15,000+ monthly by underpricing bestsellers</li>
                  <li>• Watching competitors steal customers with better pricing</li>
                  <li>• Spending hours researching prices only to guess anyway</li>
                  <li>• Fear of changing prices and losing sales</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  Optimize My Pricing Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-orange-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  Calculate Pricing ROI
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Pricing Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Increase</span>
                  <span className="text-2xl font-bold text-green-600">+43%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Margin Boost</span>
                  <span className="text-2xl font-bold text-blue-600">+67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Additional Monthly Profit</span>
                  <span className="text-2xl font-bold text-purple-600">$28,450</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 3,240% in first quarter</p>
                  <p className="text-green-700 text-sm">Pricing optimization pays for itself in 5 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pricing That Reads Your Customers' Minds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop playing pricing roulette. Chime's AI analyzes customer psychology, competitor moves, and market dynamics to find the exact price that maximizes your profit while keeping customers happy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Psychological Price Points</h3>
              <p className="text-gray-600">
                Our AI understands customer psychology and finds the exact price points that feel "right" to your customers. $19.97 vs $20.00 can mean a 23% difference in conversion rates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Competitor Intelligence</h3>
              <p className="text-gray-600">
                We monitor your competitors 24/7 and automatically adjust your prices to stay competitive while maximizing profit. Never lose a sale to competitor pricing again.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dynamic Profit Optimization</h3>
              <p className="text-gray-600">
                Our AI continuously tests and optimizes prices to find the perfect balance between volume and margin. Increase profits without sacrificing sales velocity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Pricing Anxiety to Pricing Confidence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine knowing with certainty that your prices are optimized for maximum profit. Imagine never worrying about leaving money on the table or losing customers to competitors. That confidence is what Chime delivers.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Guessing prices, losing $15K+ monthly to underpricing, afraid to raise prices, constantly checking competitors manually</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Scientifically optimized prices, 43% revenue increase, confident pricing decisions, automated competitor monitoring</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Shopify Pricing Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Was underpricing by 30% on bestsellers"</p>
                  <p className="text-gray-600 text-sm">Chime's AI found optimal prices without losing customers</p>
                  <p className="text-green-600 font-semibold text-sm">$34K additional monthly profit</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Competitors were beating our prices"</p>
                  <p className="text-gray-600 text-sm">Now automatically match and beat competitor pricing</p>
                  <p className="text-blue-600 font-semibold text-sm">67% increase in conversion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Leaving Thousands on the Table Every Month
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Every day you price manually is another day you're losing money to suboptimal pricing. Your competitors are already using AI to optimize their prices. Don't let them outprice and outsell you.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-orange-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Optimize My Pricing Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-orange-200 text-sm mt-4">
            ✓ Setup in 24 hours ✓ See results immediately ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

