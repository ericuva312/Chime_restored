import { Link } from 'react-router-dom'
import { CheckCircle, Clock, Zap, TrendingUp, ArrowRight, Users, Shield, Target, Star, Award, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const ImplementationPage = () => {
  const timelineSteps = [
    {
      day: "Day 1",
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      title: "Initial Setup & Analysis",
      duration: "2-4 hours",
      description: "We connect to your Shopify store and perform comprehensive analysis to understand your unique business needs",
      details: [
        "Secure Shopify integration with enterprise-grade encryption",
        "Complete performance baseline analysis and audit",
        "AI system configuration tailored to your industry",
        "Initial optimization setup and testing",
        "Custom dashboard creation for real-time monitoring"
      ],
      outcome: "Complete understanding of your current performance and growth opportunities"
    },
    {
      day: "Day 2",
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI Deployment & Automation",
      duration: "4-6 hours",
      description: "Our AI systems go live and begin intelligent optimization of your entire customer journey",
      details: [
        "Cart recovery automation with personalized messaging",
        "Smart email sequence deployment based on customer behavior",
        "AI-powered product recommendation engine activation",
        "Dynamic inventory optimization and demand forecasting",
        "Automated pricing strategy implementation"
      ],
      outcome: "Fully automated AI systems working 24/7 to optimize your store"
    },
    {
      day: "Days 3-30",
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Learning & Optimization",
      duration: "Continuous",
      description: "AI continuously learns from your data and optimizes performance while you see immediate results",
      details: [
        "Real-time performance monitoring and adjustment",
        "Machine learning optimization based on customer patterns",
        "Weekly detailed performance reports and insights",
        "Ongoing A/B testing of messaging and strategies",
        "Continuous refinement of automation rules"
      ],
      outcome: "Measurable revenue growth and operational efficiency improvements"
    },
    {
      day: "Day 30+",
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Guaranteed Results",
      duration: "Ongoing",
      description: "Achieve your guaranteed 15-25% revenue growth or receive a full refund",
      details: [
        "Guaranteed revenue increase verification",
        "Comprehensive ROI reporting and analysis",
        "Continued optimization and feature updates",
        "24/7 AI monitoring with instant issue resolution",
        "Dedicated success manager for ongoing support"
      ],
      outcome: "Sustained revenue growth and long-term business transformation"
    }
  ]

  const benefits = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Dedicated Success Team",
      description: "Personal success manager and technical support throughout implementation",
      highlight: "White-glove service"
    },
    {
      icon: <Shield className="h-12 w-12 text-emerald-600" />,
      title: "Zero Risk Guarantee",
      description: "90-day money-back guarantee if you don't achieve 15-25% revenue growth",
      highlight: "100% risk-free"
    },
    {
      icon: <Clock className="h-12 w-12 text-purple-600" />,
      title: "Minimal Time Investment",
      description: "Less than 2 hours of your time required during the entire setup process",
      highlight: "Set and forget"
    }
  ]

  const faqs = [
    {
      question: "What if my store is complex or has custom integrations?",
      answer: "Our AI platform is designed to work with any Shopify configuration. We handle custom apps, themes, and integrations seamlessly. Our technical team has experience with thousands of unique store setups."
    },
    {
      question: "Will this disrupt my current operations?",
      answer: "Not at all. Implementation happens in the background without affecting your live store. Customers continue shopping normally while we optimize behind the scenes."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients see initial improvements within 7-14 days, with full results typically achieved by day 30. Our AI learns and improves continuously from day one."
    },
    {
      question: "What happens if I'm not satisfied?",
      answer: "We offer a 90-day money-back guarantee. If you don't achieve at least 15% revenue growth, we'll refund your investment completely."
    }
  ]

  const stats = [
    { number: "48", label: "Hours to Full Implementation", suffix: "" },
    { number: "500", label: "Successful Implementations", suffix: "+" },
    { number: "15-25", label: "Guaranteed Revenue Growth", suffix: "%" },
    { number: "90", label: "Day Money-Back Guarantee", suffix: "" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="h-4 w-4 mr-2" />
              Proven Implementation Process
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              48-Hour
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Implementation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              From setup to guaranteed results in just 48 hours. Our proven process has helped 500+ Shopify stores achieve 15-25% revenue growth with zero risk.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-blue-200 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all">
                <Link to="/contact">
                  Start Your Implementation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-10 py-4 text-lg font-semibold rounded-xl">
                <Link to="/roi-calculator">Calculate Your ROI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Journey to
              <span className="text-blue-600"> Guaranteed Growth</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our streamlined process ensures rapid deployment and immediate results through proven methodology
            </p>
          </div>

          <div className="space-y-20">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left Side - Overview */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-blue-600 font-bold text-lg">{step.day}</div>
                        <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                        <div className="text-purple-600 font-semibold text-lg">{step.duration}</div>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <Award className="h-5 w-5 text-emerald-600 mr-2" />
                        Expected Outcome
                      </h4>
                      <p className="text-gray-700 font-medium">{step.outcome}</p>
                    </div>
                  </div>

                  {/* Right Side - Details */}
                  <div className="bg-gray-50 rounded-3xl p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                      What We Deliver
                    </h4>
                    <div className="space-y-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-3">
                          <div className="bg-emerald-100 p-1 rounded-full mt-1">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Connector */}
                {index < timelineSteps.length - 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Our Implementation
              <span className="text-blue-600"> Always Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Proven methodology backed by 500+ successful implementations and industry-leading results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-10 text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {benefit.highlight}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Implementation
              <span className="text-blue-600"> FAQ</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Common questions about our 48-hour implementation process
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed ml-12">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            500+ Successful Implementations
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Start Your
            <br />
            <span className="text-yellow-300">48-Hour Transformation?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful Shopify stores that have achieved guaranteed revenue growth with our proven implementation process.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all">
              <Link to="/contact">
                Start Implementation Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg font-semibold px-10 py-4 rounded-xl">
              <Link to="/case-studies">View Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ImplementationPage

