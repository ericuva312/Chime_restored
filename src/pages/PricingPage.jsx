import { Link } from 'react-router-dom'
import { Check, ArrowRight, Star, Shield, Zap, TrendingUp, Crown, Sparkles, Target } from 'lucide-react'
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
      roi: "ROI: 15x average return",
      tier: "starter",
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      accentColor: "blue"
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
      roi: "ROI: 847% average return",
      tier: "professional",
      icon: Sparkles,
      gradient: "from-purple-500 to-purple-600",
      accentColor: "purple"
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
      roi: "ROI: 1,247% average return",
      tier: "enterprise",
      icon: Crown,
      gradient: "from-amber-500 to-amber-600",
      accentColor: "amber"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Stop Losing $50,000+ Monthly
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">While Competitors Dominate With AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join the exclusive circle of 2,847 elite merchants who've escaped the manual process death spiral. Choose your AI transformation level and start dominating your market in 48 hours—or we pay you $1,000.
            </p>
            <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
              <p className="text-red-200 text-lg md:text-xl font-semibold leading-relaxed">
                <strong className="text-red-300">The Brutal Reality:</strong> Every month you delay costs you $50,000+ in lost revenue while AI-powered competitors capture market share you'll never recover. The window for joining the elite circle is closing fast.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Zap className="w-5 h-5 text-blue-400 mr-3" />
                <span className="font-medium">Setup in 48 hours</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-3" />
                <span className="font-medium">Results in 30 days</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5 text-blue-400 mr-3" />
                <span className="font-medium">90-day guarantee</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Check className="w-5 h-5 text-blue-400 mr-3" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <div
                  key={index}
                  className={`relative group ${
                    plan.popular 
                      ? 'lg:scale-110 lg:-mt-8 lg:mb-8 z-10' 
                      : 'lg:mt-4'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                        <Star className="w-4 h-4 inline mr-2" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    plan.popular 
                      ? 'ring-2 ring-purple-500/20 shadow-purple-100/50' 
                      : 'hover:ring-2 hover:ring-gray-200/50'
                  }`}>
                    
                    {/* Header Gradient */}
                    <div className={`h-2 bg-gradient-to-r ${plan.gradient}`}></div>
                    
                    <div className="p-8 lg:p-10">
                      {/* Icon & Title */}
                      <div className="text-center mb-8">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{plan.description}</p>
                      </div>

                      {/* Pricing */}
                      <div className="text-center mb-8 space-y-4">
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <div className="text-sm text-gray-500 mb-2 font-medium">Setup Investment</div>
                          <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{plan.setupFee}</div>
                          <div className="text-gray-600">one-time</div>
                        </div>
                        <div className={`bg-gradient-to-r ${plan.gradient} rounded-2xl p-6 text-white`}>
                          <div className="text-sm text-white/80 mb-2 font-medium">Monthly Transformation</div>
                          <div className="text-4xl lg:text-5xl font-bold mb-1">{plan.monthlyFee}</div>
                          <div className="text-white/80">per month</div>
                        </div>
                      </div>

                      {/* ROI & Savings */}
                      <div className="text-center mb-8 space-y-3">
                        {plan.roi && (
                          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl font-bold text-lg">
                            {plan.roi}
                          </div>
                        )}
                        {plan.savings && (
                          <div className="bg-orange-50 text-orange-700 px-4 py-3 rounded-xl font-semibold">
                            {plan.savings}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-10">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start group">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mr-4 mt-0.5 flex-shrink-0`}>
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/payment?plan=${plan.name.toLowerCase()}`}
                        className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 text-center block transform hover:scale-105 shadow-lg hover:shadow-xl ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-purple-200`
                            : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-${plan.accentColor}-200`
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="w-5 h-5 inline ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why Chime Delivers Unmatched ROI
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our AI automation doesn't just promise results—it guarantees them. Here's why thousands of Shopify stores trust Chime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Guaranteed Results</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We guarantee minimum revenue growth or you don't pay. Our AI systems are proven to deliver consistent results across all industries.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Rapid Implementation</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Get up and running in 48 hours with our streamlined onboarding process. Start seeing results within the first 30 days.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Risk-Free Investment</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                90-day money-back guarantee. If our AI automation doesn't deliver the promised growth, get a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              See how our clients achieved extraordinary growth with Chime's AI automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 text-xl mb-2">{testimonial.name}</h4>
                  <p className="text-gray-600 text-lg mb-4">{testimonial.company}</p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                      {testimonial.growth} growth
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
                      {testimonial.revenue} revenue
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
            See exactly how much revenue growth you can expect with Chime's AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/roi-calculator"
              className="bg-white hover:bg-gray-50 text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Calculate ROI
            </Link>
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Join hundreds of successful Shopify stores already growing with Chime's AI automation.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-gray-500 mt-8 text-lg">
            ✓ No setup fees ✓ 90-day guarantee ✓ Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default PricingPage

