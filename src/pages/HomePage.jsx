import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Shield, AlertTriangle, Target, Heart, Brain, Eye, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedCounter from '@/components/AnimatedCounter'
import RealTimeNotifications from '@/components/RealTimeNotifications'

const HomePage = () => {
  const features = [
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Guaranteed Growth",
      description: "15-25% revenue increase within 90 days or your money back"
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: "Smart Segmentation", 
      description: "AI-powered customer analysis for personalized experiences"
    },
    {
      icon: <Zap className="h-12 w-12 text-orange-600" />,
      title: "Smart Automation",
      description: "Set-and-forget systems that continuously improve performance"
    },
    {
      icon: <Shield className="h-12 w-12 text-emerald-600" />,
      title: "Enterprise Security",
      description: "SOC 2 certified with bank-level encryption & protection"
    }
  ]
  
  const stats = [
    { number: "188%", label: "Average Revenue Growth" },
    { number: "500+", label: "Successful Implementations" },
    { number: "24/7", label: "AI-Powered Monitoring" },
    { number: "99.9%", label: "System Uptime" }
  ]

  const testimonials = [
    {
      quote: "Chime's AI automation recovered 67% of our abandoned carts and automated our entire email marketing. Implementation took just 3 weeks and we saw results in 30 days.",
      author: "Marcus Chen",
      company: "TechGear Pro • Electronics",
      growth: "+134% revenue growth",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format",
      details: "From $180K to $421K/month in 6 months • 890% ROI • SSL encrypted"
    },
    {
      quote: "The personalized product recommendations alone increased our average order value by 45%. I save 25 hours per week on manual tasks that are now automated.",
      author: "Sarah Rodriguez",
      company: "Bella Boutique • Fashion",
      growth: "+188% revenue growth",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format",
      details: "From $95K to $274K/month in 8 months • 1,240% ROI • GDPR compliant"
    },
    {
      quote: "Chime's AI handles our entire customer journey - from first visit to repeat purchase. Our customer lifetime value doubled and we're scaling faster than ever.",
      author: "David Park",
      company: "Wellness Essentials • Health",
      growth: "+167% revenue growth",
      image: "/images/david-park.jpg",
      details: "From $320K to $854K/month in 10 months • 756% ROI • SOC 2 certified"
    }
  ]

  const deathSpiralPoints = [
    "85% of ecommerce businesses fail because they focus on acquisition instead of retention",
    "You're spending $40+ to acquire customers who buy once for $35 and never return",
    "Your competitors are building loyal armies while you chase one-time buyers",
    "Every lost customer costs 5x more to replace than to retain",
    "You're trapped in an endless cycle of expensive customer acquisition"
  ]

  const revolutionPoints = [
    "Transform one-time buyers into loyal brand evangelists",
    "Build a community of customers who advocate for your brand",
    "Create predictable recurring revenue from existing customers",
    "Reduce acquisition costs while increasing customer lifetime value",
    "Dominate your market through customer loyalty, not just acquisition"
  ]

  const pulseCapabilities = [
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "Behavioral Intelligence",
      description: "Deep learning algorithms analyze customer patterns, preferences, and purchase history to predict future behavior with 94% accuracy"
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: "Churn Prevention",
      description: "Identifies at-risk customers 30 days before they churn and automatically triggers personalized retention campaigns"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Lifetime Value Optimization",
      description: "Maximizes customer lifetime value through personalized product recommendations and dynamic pricing strategies"
    },
    {
      icon: <Target className="h-8 w-8 text-emerald-600" />,
      title: "Proactive Support",
      description: "Anticipates customer needs and delivers proactive support before issues arise, increasing satisfaction by 67%"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section className="hero-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Chasing Customers—Start Building an <span className="text-yellow-400">Empire of Loyal Fans</span> Who Buy Again and Again
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Chime's Four AI Engines transform one-time buyers into lifetime customers, building predictable recurring revenue that grows your empire while competitors fight over scraps.
          </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="trust-badge">
                <Shield className="w-4 h-4" />
                SOC 2 Certified
              </div>
              <div className="trust-badge">
                <CheckCircle className="w-4 h-4" />
                500+ Success Stories
              </div>
              <div className="trust-badge">
                <TrendingUp className="w-4 h-4" />
                188% Avg Growth
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contact" 
                className="btn-accent interactive-element"
              >
                Claim Your Competitive Edge
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/roi-calculator" 
                className="btn-secondary interactive-element"
              >
                Calculate Your Domination Potential
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                Elite Setup in 48 Hours
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
                Market Domination in 30 Days
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                90-day guarantee
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                SOC 2 certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={stat.number} duration={2000} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Death Spiral Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Brutal Reality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Most e-commerce businesses are trapped in a death spiral of expensive customer acquisition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deathSpiralPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Customer Success Revolution Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Lightbulb className="h-16 w-16 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Customer Success Revolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Break free from the acquisition trap and build a sustainable empire of loyal customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {revolutionPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-emerald-500">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Pulse Engine Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pulse: Your Customer Intelligence Engine
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Pulse develops intimate knowledge of your customer base, predicting behavior, preventing churn, and maximizing customer lifetime value through personalized experiences and proactive support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pulseCapabilities.map((capability, index) => (
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Leading Brands Choose Chime
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform delivers results that traditional marketing agencies can't match
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Chime Delivers Results
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to transform your e-commerce business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect & Analyze
              </h3>
              <p className="text-gray-600">
                We integrate with your Shopify store and analyze your customer data, sales patterns, and growth opportunities using advanced AI algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Optimize & Automate
              </h3>
              <p className="text-gray-600">
                Our AI implements personalized customer journeys, optimizes pricing strategies, and automates inventory management for maximum efficiency.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Scale & Grow
              </h3>
              <p className="text-gray-600">
                Watch your revenue grow as our AI continuously learns and optimizes your store performance, delivering guaranteed 15-25% growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-semibold text-sm mb-4">
                    {testimonial.growth}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-xs text-gray-500 pt-4">
                    {testimonial.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Guarantee Your Growth?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful Shopify stores already growing with Chime. Start your free analysis today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button asChild size="lg" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/contact">
                Schedule a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/roi-calculator">Calculate Your ROI</Link>
            </Button>
          </div>
          <div className="text-center text-blue-200 text-sm">
            🔒 Enterprise-grade security • 99.9% uptime guarantee • 500+ successful implementations
          </div>
        </div>
      </section>

      {/* Real-time Notifications */}
      <RealTimeNotifications />
    </div>
  )
}

export default HomePage

