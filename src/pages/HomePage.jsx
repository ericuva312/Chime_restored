import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Shield, AlertTriangle, Target, Heart, Brain, Eye, Lightbulb, Star, Award, Lock, Sparkles, Clock, UserCheck } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <RealTimeNotifications />
      
      {/* Premium Hero Section */}
      <section className="hero-premium bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                AI Engines That Turn Rising Shopify Stores Into Market Leaders — Guaranteed
              </h1>
            </div>
            
            <div className="text-center" style={{ textAlign: 'center !important' }}>
              <p className="text-xl text-white mb-8 leading-relaxed opacity-90" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>
                Join 500+ Shopify merchants who escaped the 70-hour work weeks and now lead their niches. Achieve 15% more revenue or 25% lower costs in 90 days, or we'll pay you $1,000.
              </p>
            </div>
            
            {/* CTA Buttons - Made Bigger and More Contrast */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-20 py-10 text-3xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-500">
                  Book Strategy Call
                  <ArrowRight className="ml-3 h-8 w-8" />
                </Button>
              </Link>
              <Link to="/roi-calculator">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-20 py-10 text-3xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-500">
                  See Your Revenue Potential
                  <TrendingUp className="ml-3 h-8 w-8" />
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

      {/* Virtually Zero Risk, Unlimited Upside Section - Enhanced Premium Design */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Virtually Zero Risk, Unlimited Upside: Our Unbeatable Four-Sided Guarantee
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We believe your success is non-negotiable. That's why we back our service with an ironclad, four-sided guarantee—designed to eliminate your risk and maximize your upside.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Growth Guarantee */}
            <Card className="bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2"></div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth Guarantee</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700 leading-relaxed">If your store doesn't achieve 15% growth in 90 days, you pay nothing. We're confident in our AI automation and proven strategies.</p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">Your upside:</p>
                    <p className="text-green-700">Minimum 15% growth guaranteed or you don't pay a dime.</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Our promise:</p>
                    <p className="text-blue-700">You win, or you don't pay.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 90-Day Money-Back Promise */}
            <Card className="bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">90-Day Refund Policy</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700 leading-relaxed">If you're not completely satisfied for any reason, you get a full refund within 90 days—no questions asked, guaranteed results.</p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Your upside:</p>
                    <p className="text-blue-700">Try us completely risk-free for a full 90 days today.</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">Our promise:</p>
                    <p className="text-green-700">Every penny back if not thrilled.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* No Technical Headaches */}
            <Card className="bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-2"></div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Zero Technical Risks</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700 leading-relaxed">We handle all implementation, setup, and maintenance completely. You focus on running your business while we do the heavy lifting.</p>
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                    <p className="font-semibold text-purple-800 mb-1">Your upside:</p>
                    <p className="text-purple-700">Zero setup stress, zero maintenance, zero tech required.</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Our promise:</p>
                    <p className="text-blue-700">100% hands-off solution for you.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All-in-One Solution */}
            <Card className="bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-2"></div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">All-in-One Platform</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700 leading-relaxed">With 500+ successful implementations and 99.9% satisfaction rate, you're partnering with a team that delivers comprehensive results.</p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Your upside:</p>
                    <p className="text-orange-700">Confidence in a partner with a proven track record.</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Our promise:</p>
                    <p className="text-blue-700">All-in-one; we handle everything.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Zero Risk Footer - More Premium and Connected */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-16 shadow-2xl border-4 border-blue-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-4xl font-bold text-white mb-4">Zero Risk. All Reward.</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
              </div>
              <p className="text-xl text-white/90 mb-6 leading-relaxed" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto 1.5rem auto' }}>We're so confident in our results, we guarantee your success with these four ironclad promises.</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto 1rem auto' }}>Virtually zero risk. Unlimited upside.</p>
              <p className="text-xl text-white/80" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>Your success is our only priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core AI Business Engines Section - Enhanced Premium Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Core AI Business Engines
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Four specialized AI engines working together to transform your Shopify store into a market-leading powerhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Genesis - Strategic Growth Engine */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105 h-full flex flex-col">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Genesis - Strategic Business Engine</h3>
                    <p className="text-blue-600 font-semibold">Strategic Insights & Personal Assistants</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  Genesis serves as your chief strategy officer, analyzing market opportunities and positioning. It develops comprehensive business plans and identifies new revenue streams.
                </p>                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Market analysis and opportunity identification</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Competitive intelligence and positioning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Revenue forecasting and growth planning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Strategic partnership recommendations</li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link to="/solutions/email">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Explore Genesis Engine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Nexus - Revenue Optimization Engine */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105 h-full flex flex-col">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2"></div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-full p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>                    <h3 className="text-xl font-bold text-gray-900">Nexus - Revenue Optimization Engine</h3>                    <p className="text-green-600 font-semibold">Pricing, Running Ads & Cart Recovery</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  Nexus focuses exclusively on maximizing your revenue through pricing optimization and sales process improvement. It continuously tests and refines your revenue generation systems.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Dynamic pricing optimization</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Sales funnel analysis and improvement</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Lead qualification and nurturing</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Customer acquisition cost optimization</li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link to="/solutions/cart-recovery">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Explore Nexus Engine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Catalyst - Operational Excellence Engine */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105 h-full flex flex-col">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-2"></div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-full p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>                    <h3 className="text-xl font-bold text-gray-900">Catalyst - Operational Excellence Engine</h3>                    <p className="text-purple-600 font-semibold">Supply Chain and Inventory Optimization</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  Catalyst redesigns your business operations for maximum efficiency and scalability. It identifies process improvements and automates workflows for rapid growth.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Process optimization and automation</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Resource allocation and planning</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Quality control and improvement</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Vendor management and negotiation</li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link to="/solutions/inventory">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Explore Catalyst Engine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Pulse - Customer Success Engine */}
            <Card className="bg-gradient-to-br from-orange-50 to-amber-100 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group hover:scale-105 h-full flex flex-col">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-2"></div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-full p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Pulse - Customer Success Engine</h3>
                    <p className="text-orange-600 font-semibold">Pricing, Sales & Customer Success</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  Pulse develops intimate knowledge of your customer base, predicting behavior and preventing churn. It maximizes customer lifetime value through personalized experiences.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">Key Capabilities:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Customer behavior prediction and analysis</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Churn prevention and retention strategies</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Personalization and experience optimization</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />Customer success metrics and tracking</li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link to="/solutions/pricing">
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Explore Pulse Engine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Chime Delivers Results - Moved Above Trust Badges */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Chime Delivers Results</h2>
            <div className="text-center" style={{ textAlign: 'center !important' }}>
              <p className="text-xl text-gray-600" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>Simple 3-step process to transform your e-commerce business</p>
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

      {/* Security Footer */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-400" />
              <span className="text-lg">Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="text-lg">99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-purple-400" />
              <span className="text-lg">500+ successful implementations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join the Elite Circle of AI-Powered Merchants?
          </h2>
          <div className="text-center" style={{ textAlign: 'center !important' }}>
            <p className="text-xl mb-8" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto 2rem auto' }}>
              Book your call now. Walk away with a custom growth plan worth $2,500.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Book Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/roi-calculator">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                See Your Revenue Potential
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="text-center" style={{ textAlign: 'center !important' }}>
            <p className="text-lg opacity-90" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>
              No sales pitch. Just a genuine strategy session to help you dominate your market.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

