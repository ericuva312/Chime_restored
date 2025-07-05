import { Link } from 'react-router-dom'
import { Check, ArrowRight, Star, Shield, Zap, TrendingUp } from 'lucide-react'

const PricingPage = () => {
  const plans = [
    {
      name: "Growth",
      setupFee: "$2,997",
      monthlyFee: "$997",
      description: "Perfect for growing Shopify stores ready to scale",
      features: [
        "AI-powered cart recovery system",
        "Email automation sequences",
        "Basic inventory optimization",
        "Customer segmentation",
        "Monthly performance reports",
        "Email support",
        "15% minimum revenue growth guarantee"
      ],
      cta: "Start Growing",
      popular: false,
      savings: null
    },
    {
      name: "Professional",
      setupFee: "$4,997",
      monthlyFee: "$1,497",
      description: "Most popular choice for serious e-commerce businesses",
      features: [
        "Everything in Growth plan",
        "Advanced pricing optimization",
        "Predictive inventory management",
        "Multi-channel automation",
        "Weekly strategy calls",
        "Priority support",
        "20% minimum revenue growth guarantee",
        "Custom automation workflows"
      ],
      cta: "Go Professional",
      popular: true,
      savings: "Save $500/month vs individual services"
    },
    {
      name: "Enterprise",
      setupFee: "$9,997",
      monthlyFee: "$2,997",
      description: "Complete AI transformation for high-volume stores",
      features: [
        "Everything in Professional plan",
        "Dedicated AI strategist",
        "Custom AI model development",
        "Advanced analytics dashboard",
        "24/7 priority support",
        "Quarterly business reviews",
        "25% minimum revenue growth guarantee",
        "White-label solutions available"
      ],
      cta: "Transform Your Business",
      popular: false,
      savings: "Save $1,000/month vs hiring in-house team"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "Luxe Beauty Co.",
      revenue: "$2.3M",
      growth: "188%",
      quote: "Chime's AI automation transformed our entire business. We went from manual processes to intelligent systems that work 24/7.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Marcus Rodriguez",
      company: "TechGear Pro",
      revenue: "$1.8M",
      growth: "156%",
      quote: "The ROI was immediate. Within 60 days, we saw a 156% increase in revenue and saved 25 hours per week.",
      image: "/api/placeholder/64/64"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent
              <br />
              <span className="text-blue-400">Pricing</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
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
                    <div className="text-sm text-gray-500 mb-1">Initial Setup</div>
                    <span className="text-2xl font-bold text-gray-900">{plan.setupFee}</span>
                    <span className="text-gray-600"> one-time</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Monthly Maintenance</div>
                    <span className="text-3xl font-bold text-blue-600">{plan.monthlyFee}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {plan.savings && (
                    <p className="text-green-600 font-semibold text-sm">{plan.savings}</p>
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

                <Link
                  to="/contact"
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors text-center block border-2 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700'
                      : 'bg-white hover:bg-gray-50 text-blue-600 border-blue-600 hover:border-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
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

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.company}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-green-600 font-semibold">{testimonial.growth} growth</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-blue-600 font-semibold">{testimonial.revenue} revenue</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex items-center mt-4">
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
              className="bg-transparent hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white hover:border-blue-300"
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

