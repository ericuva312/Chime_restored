import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Shield, AlertTriangle, Target, Heart, Brain, Eye, Lightbulb, Star, Award, Lock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedCounter from '@/components/AnimatedCounter'
import RealTimeNotifications from '@/components/RealTimeNotifications'

const HomePage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <RealTimeNotifications />
      
      {/* Premium Hero Section */}
      <section className="hero-premium">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Engines That Turn Rising Shopify Stores Into Market Leaders—Guaranteed
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join 500+ Shopify merchants who escaped the 70-hour work weeks and now lead their niches. Achieve 15% more revenue or 25% lower costs in 90 days, or we'll pay you $1,000.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>500+ Merchants</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>99.9% Satisfaction</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Book Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/roi-calculator">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  See your revenue potential
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={stat.number} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtually Zero Risk, Unlimited Upside Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Virtually Zero Risk, Unlimited Upside: Our Unbeatable Four-Sided Guarantee
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe your success is non-negotiable. That's why we back our service with an ironclad, four-sided guarantee—designed to eliminate your risk and maximize your upside.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Growth Guarantee */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-green-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Guarantee</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">If your store doesn't grow by at least 15% in 90 days, you pay nothing. We're that confident in our AI automation and proven strategies.</p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-semibold text-green-800">Your upside:</p>
                    <p className="text-green-700">Minimum 15% growth or you don't pay a dime.</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-800">Our promise:</p>
                    <p className="text-blue-700">You win, or you don't pay.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 90-Day Money-Back Promise */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-blue-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">90-Day Money-Back Promise</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">If you're not completely satisfied for any reason, you get a full refund within 90 days—no questions asked.</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-800">Your upside:</p>
                    <p className="text-blue-700">Try us risk-free for 90 days.</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-semibold text-green-800">Our promise:</p>
                    <p className="text-green-700">Every penny back if you're not thrilled.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* No Technical Headaches */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-purple-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Technical Headaches</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">We handle all the implementation, setup, and maintenance. You focus on running your business while we do the heavy lifting.</p>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-semibold text-purple-800">Your upside:</p>
                    <p className="text-purple-700">Zero setup stress, zero maintenance, zero technical knowledge required.</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-800">Our promise:</p>
                    <p className="text-blue-700">100% hands-off for you.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All-in-One Solution */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-orange-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">All-in-One Solution</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">With 500+ successful implementations and a 99.9% satisfaction rate, you're partnering with a team that delivers. We're your one-stop shop—every aspect handled for you.</p>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="font-semibold text-orange-800">Your upside:</p>
                    <p className="text-orange-700">Confidence in a partner with a proven track record.</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-800">Our promise:</p>
                    <p className="text-blue-700">All-in-one solution; we handle everything.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zero Risk Footer */}
          <div className="text-center bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero Risk. All Reward.</h3>
            <p className="text-lg text-gray-600 mb-2">We're so confident in our results, we guarantee your success with these four ironclad promises.</p>
            <p className="text-xl font-semibold text-blue-600 mb-2">Virtually zero risk. Unlimited upside.</p>
            <p className="text-lg text-gray-700">Your success is our only priority.</p>
          </div>
        </div>
      </section>

      {/* Core AI Business Engines Section - MOST CRITICAL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core AI Business Engines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four specialized AI engines working together to transform your Shopify store into a market-leading powerhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Genesis - Strategic Growth Engine */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 rounded-full p-4 mr-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">"Genesis" - Strategic Growth Engine</h3>
                    <p className="text-blue-600 font-semibold">Strategic Insights & Personal Assistants</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Genesis serves as your chief strategy officer, analyzing market opportunities, competitive positioning, and growth vectors. It develops comprehensive business plans, identifies new revenue streams, and creates actionable roadmaps for scaling your business.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Market analysis and opportunity identification</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Competitive intelligence and positioning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Revenue forecasting and growth planning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Strategic partnership recommendations</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Investment and expansion planning</li>
                  </ul>
                </div>

                <Link to="/solutions/email">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Explore Genesis Engine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nexus - Revenue Optimization Engine */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-600 rounded-full p-4 mr-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">"Nexus" - Revenue Optimization Engine</h3>
                    <p className="text-green-600 font-semibold">Pricing, Running Ads & Cart Recovery</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Nexus focuses exclusively on maximizing your revenue through pricing optimization, sales process improvement, and customer acquisition strategies. It continuously tests and refines your revenue generation systems.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Dynamic pricing optimization</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Sales funnel analysis and improvement</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Lead qualification and nurturing</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer acquisition cost optimization</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Revenue attribution and tracking</li>
                  </ul>
                </div>

                <Link to="/solutions/cart-recovery">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Explore Nexus Engine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Catalyst - Operational Excellence Engine */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600 rounded-full p-4 mr-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">"Catalyst" - Operational Excellence Engine</h3>
                    <p className="text-purple-600 font-semibold">Supply Chain and Inventory Optimization</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Catalyst redesigns your business operations for maximum efficiency and scalability. It identifies process improvements, automates workflows, and creates systems that support rapid growth without proportional cost increases.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Process optimization and automation</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Resource allocation and planning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Quality control and improvement</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Vendor management and negotiation</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Cost reduction and efficiency gains</li>
                  </ul>
                </div>

                <Link to="/solutions/inventory">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Explore Catalyst Engine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pulse - Customer Success Engine */}
            <Card className="bg-gradient-to-br from-orange-50 to-amber-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-600 rounded-full p-4 mr-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">"Pulse" - Customer Success Engine</h3>
                    <p className="text-orange-600 font-semibold">Pricing, Sales & Customer Success</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Pulse develops intimate knowledge of your customer base, predicting behavior, preventing churn, and maximizing customer lifetime value through personalized experiences and proactive support.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer behavior prediction and analysis</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Churn prevention and retention strategies</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Personalization and experience optimization</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer success metrics and tracking</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Feedback analysis and product improvement</li>
                  </ul>
                </div>

                <Link to="/solutions/pricing">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Explore Pulse Engine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Symbols Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted & Certified</h3>
            <div className="flex justify-center items-center space-x-12">
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto" />
                </div>
                <p className="font-semibold text-gray-900">SOC 2 Certified</p>
                <p className="text-sm text-gray-600">Enterprise Security</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
                  <Sparkles className="h-12 w-12 text-green-600 mx-auto" />
                </div>
                <p className="font-semibold text-gray-900">Shopify Plus Partner</p>
                <p className="text-sm text-gray-600">Official Partnership</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
                  <Users className="h-12 w-12 text-purple-600 mx-auto" />
                </div>
                <p className="font-semibold text-gray-900">500+ Merchants</p>
                <p className="text-sm text-gray-600">Proven Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Chime Delivers Results */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Chime Delivers Results</h2>
            <div className="text-center">
              <p className="text-xl text-gray-600">Simple 3-step process to transform your e-commerce business</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis & Setup</h3>
              <p className="text-gray-600">We analyze your store, identify opportunities, and implement our AI engines tailored to your business needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Optimization</h3>
              <p className="text-gray-600">Our AI engines continuously optimize your operations, revenue, and customer experience in real-time.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scale & Dominate</h3>
              <p className="text-gray-600">Watch your store transform into a market leader with guaranteed growth and operational excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Merchants Say</h2>
            <p className="text-xl text-gray-600">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-sm font-semibold text-green-600">{testimonial.growth}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <p className="text-xs text-gray-500">{testimonial.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-lg">
              🔒 Enterprise-grade security • 99.9% uptime guarantee • 500+ successful implementations
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join the Elite Circle of AI-Powered Merchants?
          </h2>
          <p className="text-xl mb-8">
            Book your call now. Walk away with a custom growth plan worth $2,500.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Book Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/roi-calculator">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                See your revenue potential
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-lg opacity-90">
            No sales pitch. Just a genuine strategy session to help you dominate your market.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage

