import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Mail, Package, DollarSign, TrendingUp, Clock, Users, Zap, Brain, Eye, Target, BarChart3, Lightbulb, Telescope, Sparkles } from 'lucide-react'

// Solutions Pages - Updated for Vercel deployment

// Cart Recovery Page (Nexus)
export const CartRecoveryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Stop Leaving Money on the Table—Start <span className="text-blue-600">Maximizing Every Revenue Stream</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Nexus is your AI Revenue Multiplier that identifies and fixes every revenue leak in your funnel, turning your existing traffic into 2-3x more revenue without spending another dollar on ads.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Revenue Leak Reality:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• 70% of your customers abandon their carts—that's $50,000+ walking away monthly</li>
                  <li>• You're manually sending generic "forgot something?" emails that get ignored</li>
                  <li>• You watch your analytics knowing customers were THIS close to buying</li>
                  <li>• You feel helpless watching potential revenue slip away daily</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  See Your Revenue Potential
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Nexus Recovers For You</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Recovery Rate</span>
                  <span className="text-2xl font-bold text-green-600">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Revenue Recovered</span>
                  <span className="text-2xl font-bold text-blue-600">$47,320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Multiplier</span>
                  <span className="text-2xl font-bold text-purple-600">2.3x</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 1,847% in first 90 days</p>
                  <p className="text-green-700 text-sm">Turn existing traffic into 2-3x more revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nexus Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nexus: Your AI Revenue Multiplier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop chasing new traffic when you're hemorrhaging revenue from existing visitors. Nexus plugs every leak in your funnel and maximizes every dollar from your current traffic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Leak Detection</h3>
              <p className="text-gray-600">
                Identifies every point where revenue escapes your funnel—from cart abandonment to checkout friction to post-purchase missed opportunities. Nothing slips through the cracks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Recovery Sequences</h3>
              <p className="text-gray-600">
                Multi-channel recovery campaigns that feel personal, not pushy. Email, SMS, retargeting ads, and push notifications—all perfectly timed to bring customers back without overwhelming them.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Optimization Engine</h3>
              <p className="text-gray-600">
                Continuously tests and optimizes every touchpoint to maximize revenue per visitor. Dynamic pricing, personalized offers, and behavioral triggers that convert.
              </p>
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
            Every day you wait is another $1,000-$3,000 walking out the door. Your competitors are already using AI to recover their abandoned revenue. Don't let them steal your customers AND your money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              Book Strategy Call
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              to="/roi-calculator"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              See Your Revenue Potential
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            ✓ Setup in 48 hours ✓ See results in 7 days ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Email Automation Page (Genesis)
export const EmailAutomationPage = () => {
  const genesisCapabilities = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Market Analysis and Opportunity Identification",
      description: "Analyzes 10,000+ data points across your industry to predict trends 6-8 weeks before they hit mainstream, giving you first-mover advantage on every opportunity."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Competitive Intelligence and Positioning",
      description: "Monitors competitor moves, pricing changes, and market positioning to ensure you're always one step ahead with superior strategy and timing."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: "Revenue Forecasting and Growth Planning",
      description: "Uses machine learning to identify emerging patterns in customer behavior, seasonal shifts, and market dynamics before your competitors even notice them."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-600" />,
      title: "Strategic Partnership Recommendations",
      description: "Provides Fortune 500-level strategic insights and actionable recommendations that position you as the trendsetter in your niche, not the follower."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      title: "Investment and Expansion Planning",
      description: "Develops comprehensive business plans, identifies new revenue streams, and creates actionable roadmaps for scaling your business strategically."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform From Reactive Follower to <span className="text-blue-600">Market Prophet</span> in 90 Days
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Genesis is your AI Chief Strategy Officer that gives you Fortune 500-level market intelligence, predicting trends 6-8 weeks before competitors and turning you into the trendsetter in your niche.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Reactive Business Trap:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Always playing catch-up while competitors set the trends</li>
                  <li>• Missing profitable opportunities because you see them too late</li>
                  <li>• Making strategic decisions based on outdated data and gut feelings</li>
                  <li>• Watching market leaders dominate while you react to their moves</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  See Your Revenue Potential
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Genesis Strategic Advantage</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend Prediction Accuracy</span>
                  <span className="text-2xl font-bold text-blue-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Lead Time</span>
                  <span className="text-2xl font-bold text-purple-600">6-8 weeks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Strategic Insights Daily</span>
                  <span className="text-2xl font-bold text-emerald-600">47+</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <p className="text-blue-800 font-semibold">ROI: 2,340% in first quarter</p>
                  <p className="text-blue-700 text-sm">Become the trendsetter, not the follower</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genesis Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Genesis: Your AI Chief Strategy Officer
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Genesis serves as your chief strategy officer, analyzing market opportunities, competitive positioning, and growth vectors. It develops comprehensive business plans, identifies new revenue streams, and creates actionable roadmaps for scaling your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {genesisCapabilities.map((capability, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                      {capability.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Following—Start Leading Your Market
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Every day you react instead of predict is another day your competitors gain strategic advantage. The market leaders of tomorrow are being built today with AI strategic intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              Book Strategy Call
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              to="/roi-calculator"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              See Your Revenue Potential
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            ✓ Strategic setup in 48 hours ✓ First insights in 24 hours ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Inventory Management Page (Catalyst)
export const InventoryManagementPage = () => {
  const catalystCapabilities = [
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "Predictive Operations Intelligence",
      description: "Forecasts demand, optimizes inventory levels, and automates reordering with 97% accuracy, eliminating stockouts and overstock situations that drain cash flow."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Process Automation Engine",
      description: "Transforms chaotic manual processes into streamlined Fortune 500-level systems, automating everything from order processing to supplier management."
    },
    {
      icon: <Target className="h-8 w-8 text-emerald-600" />,
      title: "Scalability Framework",
      description: "Builds operational infrastructure that scales seamlessly from $100K to $10M+ without breaking, ensuring your team never becomes the bottleneck."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Performance Optimization System",
      description: "Continuously monitors and optimizes every operational metric, identifying bottlenecks before they impact growth and automatically implementing solutions."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Stop Drowning in Operations—Start <span className="text-purple-600">Scaling Without Limits</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Catalyst is your AI Operations Commander that transforms chaotic manual processes into Fortune 500-level systems, letting you scale to $1M+ without breaking or burning out your team.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Operations Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Drowning in $30,000+ monthly losses from stockouts and dead inventory</li>
                  <li>• Spending 20+ hours weekly manually tracking and reordering</li>
                  <li>• Your team burning out from repetitive manual processes</li>
                  <li>• Operations becoming the bottleneck that prevents growth</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-purple-600 hover:border-purple-700"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-purple-600 hover:border-purple-700"
                >
                  See Your Revenue Potential
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Catalyst Operations Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Operational Efficiency</span>
                  <span className="text-2xl font-bold text-purple-600">+340%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Savings Weekly</span>
                  <span className="text-2xl font-bold text-orange-600">35+ hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inventory Accuracy</span>
                  <span className="text-2xl font-bold text-emerald-600">97%</span>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg mt-6">
                  <p className="text-purple-800 font-semibold">ROI: 1,890% in first quarter</p>
                  <p className="text-purple-700 text-sm">Scale to $1M+ without operational chaos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalyst Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Catalyst: Your AI Operations Commander
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Stop letting operations limit your growth. Catalyst transforms your business into a well-oiled machine that scales effortlessly while your competitors struggle with manual chaos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {catalystCapabilities.map((capability, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                      {capability.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Operations From Limiting Your Growth
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Every day you spend on manual operations is another day you can't focus on growth. Your competitors are already using AI to scale efficiently while you're stuck in operational chaos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-purple-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              Book Strategy Call
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              to="/roi-calculator"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
            >
              See Your Revenue Potential
            </Link>
          </div>
          <p className="text-purple-200 text-sm mt-4">
            ✓ Operations setup in 48 hours ✓ See efficiency gains in 7 days ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Pricing Optimization Page (Pulse Customer Success Engine)
export const PricingOptimizationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Spending $40 to Acquire Customers Who Buy Once for $35 and <span className="text-orange-600">Disappear Forever?</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stop the customer acquisition death spiral. Chime transforms one-time buyers into loyal brand evangelists who spend 6.8x more and refer their friends.
              </p>
              
              {/* The Customer Acquisition Death Spiral */}
              <div className="bg-red-50 p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">The Customer Acquisition Death Spiral</h3>
                <h4 className="text-md font-semibold text-red-700 mb-2">The Brutal Reality:</h4>
                <ul className="text-red-700 space-y-1 mb-4">
                  <li>• 85% of ecommerce businesses fail because they focus on acquisition instead of retention</li>
                  <li>• You're spending $40+ to acquire customers who buy once for $35 and never return</li>
                  <li>• Your competitors are building loyal armies while you chase one-time buyers</li>
                  <li>• Every lost customer costs 5x more to replace than to retain</li>
                  <li>• You're trapped in an endless cycle of expensive customer acquisition</li>
                </ul>
              </div>

              {/* The Customer Success Revolution */}
              <div className="bg-green-50 p-6 mb-8">
                <h4 className="text-md font-semibold text-green-700 mb-2">The Customer Success Revolution:</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Transform one-time buyers into loyal brand evangelists</li>
                  <li>• Build a community of customers who advocate for your brand</li>
                  <li>• Create predictable recurring revenue from existing customers</li>
                  <li>• Reduce acquisition costs while increasing customer lifetime value</li>
                  <li>• Dominate your market through customer loyalty, not just acquisition</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-orange-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  See your revenue potential
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
                  <span className="text-gray-600">Profit Margin Improvement</span>
                  <span className="text-2xl font-bold text-blue-600">+67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pricing Accuracy</span>
                  <span className="text-2xl font-bold text-purple-600">94%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 1,567% in first quarter</p>
                  <p className="text-green-700 text-sm">Perfect pricing for maximum profitability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              AI-Powered Pricing That Maximizes Profit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop leaving money on the table with guesswork pricing. Our AI analyzes thousands of variables to find the perfect price point for maximum profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dynamic Price Optimization</h3>
              <p className="text-gray-600">
                Real-time price adjustments based on demand, competition, inventory levels, and customer behavior. Your prices automatically optimize for maximum profit 24/7.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profit Margin Intelligence</h3>
              <p className="text-gray-600">
                Analyzes your costs, market positioning, and customer willingness to pay to find the sweet spot that maximizes both sales volume and profit margins.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Psychology Pricing</h3>
              <p className="text-gray-600">
                Uses behavioral psychology and customer data to set prices that feel fair to customers while maximizing your revenue. The perfect balance of profit and perception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Leaving Money on the Table
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Every day you use guesswork pricing is another day you're losing thousands in potential profit. Your competitors are already using AI to optimize their pricing strategies.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-green-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-orange-600 hover:border-orange-700"
          >
            Optimize My Pricing Today
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-green-200 text-sm mt-4">
            ✓ Setup in 24 hours ✓ See profit increase immediately ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

