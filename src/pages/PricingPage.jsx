import { Link } from 'react-router-dom'
import { Check, ArrowRight, Star, Shield, Zap, TrendingUp } from 'lucide-react'
import BorderedButton from '../components/BorderedButton'

const PricingPage = () => {  const plans = [
    {
      name: "MARKET DOMINATOR",
      setupFee: "$2,997",
      monthlyFee: "$997",
      description: "Ideal for growing stores ready to escape manual processes and start scaling intelligently",
      features: [
        "Genesis + Nexus AI Engines: Strategic growth and revenue optimization",
        "Essential Automation Suite: Cart recovery, email sequences, basic optimization",
        "Monthly Performance Reviews: Track your transformation progress",
        "Standard Support: Email and chat support during business hours",
        "Growth Guarantee: 15% revenue growth or full refund"
      ],
      cta: "Start Dominating",
      popular: false,
      savings: null,
      roi: "ROI: 15x average return"
    },
    {
      name: "MARKET PROPHET",
      setupFee: "$4,997",
      monthlyFee: "$1,497",
      description: "Most Popular - 67% Choose This | Transform from reactive follower to market-leading prophet",
      features: [
        "Genesis AI Engine: Predict trends 6-8 weeks before competitors (94% accuracy)",
        "Nexus Revenue Multiplier: Turn existing traffic into 2-3x more revenue",
        "Catalyst Operations Commander: Scale to $1M+ without breaking",
        "Pulse Customer Whisperer: Transform buyers into brand evangelists",
        "Weekly Strategy Calls: Direct access to Fortune 500 transformation experts",
        "Priority Elite Support: 24/7 access to your dedicated success team",
        "Market Domination Guarantee: 20% revenue growth or we pay you $1,000"
      ],
      cta: "Join Elite Circle",
      popular: true,
      savings: "Save $2,000 vs manual implementation",
      roi: "ROI: 847% average return"
    },
    {
      name: "MARKET EMPEROR",
      setupFee: "$9,997",
      monthlyFee: "$2,997",
      description: "Ultimate AI transformation for high-volume dominators ready to achieve Fortune 500-level market domination",
      features: [
        "All Four AI Engines: Complete market domination system",
        "Dedicated AI Strategist: Personal Fortune 500-level consultant",
        "Custom AI Development: Proprietary models built for your business",
        "White-Label Solutions: Brand our technology as your own",
        "Quarterly Business Reviews: Strategic planning with C-level executives",
        "Emperor-Level Support: Direct phone access to leadership team",
        "Market Emperor Guarantee: 25% revenue growth or we pay you $1,000"
      ],
      cta: "Become Emperor",
      popular: false,
      savings: "Save $15,000 vs hiring in-house AI team",
      roi: "ROI: 1,247% average return"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "Luxe Beauty Co.",
      revenue: "$2.3M",
      growth: "188%",
      quote: "Chime's AI automation transformed our entire business. We went from manual processes to intelligent systems that work 24/7. The results exceeded every expectation."
    },
    {
      name: "Marcus Rodriguez",
      company: "TechGear Pro",
      revenue: "$1.8M",
      growth: "156%",
      quote: "The ROI was immediate. Within 60 days, we saw a 156% increase in revenue and saved 25 hours per week. This is the future of e-commerce automation."
    },
    {
      name: "Jennifer Walsh",
      company: "Elite Fashion Hub",
      revenue: "$3.1M",
      growth: "234%",
      quote: "Chime delivered a 234% revenue increase in just 4 months. Our conversion rates doubled and customer lifetime value increased by 180%. Absolutely game-changing."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Stop Losing $50,000+ Monthly
              <br />
              <span className="text-red-400">While Competitors Dominate With AI</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Join the exclusive circle of 2,847 elite merchants who've escaped the manual process death spiral. Choose your AI transformation level and start dominating your market in 48 hours—or we pay you $1,000.
            </p>
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 max-w-3xl mx-auto mb-8">
              <p className="text-red-200 text-lg font-semibold">
                <strong>The Brutal Reality:</strong> Every month you delay costs you $50,000+ in lost revenue while AI-powered competitors capture market share you'll never recover. The window for joining the elite circle is closing fast.
              </p>
            </div>
              Choose the plan that fits your business. All plans include our revenue 
              growth guarantee. If we don't deliver the promised results, you don't pay.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-blue-400 mr-2" />
                Setup in 48 hours
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                Results in 30 days
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                90-day guarantee
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-400 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <div className="text-sm text-gray-500 mb-1">Setup Investment</div>
                    <span className="text-2xl font-bold text-gray-900">{plan.setupFee}</span>
                    <span className="text-gray-600"> one-time</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Monthly Transformation</div>
                    <span className="text-3xl font-bold text-blue-600">{plan.monthlyFee}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {plan.roi && (
                    <p className="text-green-600 font-bold text-sm mb-2">{plan.roi}</p>
                  )}
                  {plan.savings && (
                    <p className="text-orange-600 font-semibold text-sm">{plan.savings}</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Growth" ? (
                  <Link
                    to="/payment?plan=growth"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-colors text-center block border-2 bg-white hover:bg-gray-50 text-blue-600 border-blue-600 hover:border-blue-700"
                  >
                    {plan.cta}
                  </Link>
                ) : plan.name === "Enterprise" ? (
                  <Link
                    to="/payment?plan=enterprise"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-colors text-center block border-2 bg-white hover:bg-gray-50 text-blue-600 border-blue-600 hover:border-blue-700"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Link
                    to={`/payment?plan=${plan.name.toLowerCase()}`}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors text-center block border-2 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700'
                        : 'bg-white hover:bg-gray-50 text-blue-600 border-blue-600 hover:border-blue-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Chime Delivers Unmatched ROI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI automation doesn't just promise results—it guarantees them. Here's why thousands of Shopify stores trust Chime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Guaranteed Results</h3>
              <p className="text-gray-600">
                We guarantee minimum revenue growth or you don't pay. Our AI systems are proven to deliver consistent results across all industries.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rapid Implementation</h3>
              <p className="text-gray-600">
                Get up and running in 48 hours with our streamlined onboarding process. Start seeing results within the first 30 days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk-Free Investment</h3>
              <p className="text-gray-600">
                90-day money-back guarantee. If our AI automation doesn't deliver the promised growth, get a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-gray-600">
              See how our clients achieved extraordinary growth with Chime's AI automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.company}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 font-semibold text-lg">{testimonial.growth} growth</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-blue-600 font-semibold text-lg">{testimonial.revenue} revenue</span>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            See exactly how much revenue growth you can expect with Chime's AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/roi-calculator"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white hover:border-gray-200"
            >
              Calculate ROI
            </Link>
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-orange-600 hover:border-orange-700"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of successful Shopify stores already growing with Chime's AI automation.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-blue-600 hover:border-blue-700"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            ✓ No setup fees ✓ 90-day guarantee ✓ Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default PricingPage

