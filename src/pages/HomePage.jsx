import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Shield, AlertTriangle, Target, Heart, Brain, Eye, Lightbulb, Star, Award, Lock, Sparkles, Clock, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedCounter from '@/components/AnimatedCounter'
import RealTimeNotifications from '@/components/RealTimeNotifications'

const HomePage = () => {
  const stats = [
    { number: "347%", label: "Average Revenue Growth (vs 15% industry average)" },
    { number: "2,847", label: "Elite Merchants Transformed" },
    { number: "$127M+", label: "Additional Revenue Generated" },
    { number: "94%", label: "Trend Prediction Accuracy" },
    { number: "6-8 weeks", label: "Competitive Advantage Lead Time" },
    { number: "$1,000", label: "Penalty if We Don't Deliver" }
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
                URGENT: Your Competitors Are Using AI to Dominate While You're Still Doing Everything Manually
              </h1>
            </div>
            
            <div className="text-center" style={{ textAlign: 'center !important' }}>
              <p className="text-xl text-white mb-8 leading-relaxed opacity-90" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>
                Join the Exclusive Circle of 2,847 Elite Shopify Merchants Who Escaped the 70-Hour Work Week Death Spiral and Now Generate 15% More Revenue in 90 Days — Or We Pay You $1,000
              </p>
              
              <div className="text-center mb-8">
                <p className="text-lg text-white leading-relaxed opacity-90" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto' }}>
                  <strong>The Brutal Reality:</strong> 85% of Shopify stores fail because they can't keep up with AI-powered competitors. But the top 15% who join our exclusive merchant circle are generating Fortune 500-level results with our four AI business engines.
                </p>
                
                <p className="text-lg text-white mt-4 leading-relaxed opacity-90" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '1rem auto 0 auto' }}>
                  <strong>The Brutal Reality:</strong> 85% of Shopify stores fail because they can't keep up with AI-powered competitors. But the top 15% who join our exclusive merchant circle are generating Fortune 500-level results with our four AI business engines.
                </p>
              </div>
            </div>
            
            {/* CTA Buttons - Matching Case Studies Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Book Strategy Call
              </Link>
              <Link 
                to="/roi-calculator" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                See Your Revenue Potential
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-Time Success Metrics from Elite Merchant Circle</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={stat.number} />
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
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
              Four AI Business Engines That Transform Struggling Merchants Into Market Prophets
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              While your competitors struggle with manual processes, you'll have Fortune 500-level AI systems working 24/7 to dominate your market. Each engine is designed to give you superhuman business capabilities that would cost $500K+ to build in-house.
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
                    <h3 className="text-sm font-bold text-gray-900">Genesis - Strategic Business Engine</h3>
                    <p className="text-blue-600 font-semibold">Strategic Insights & Personal Assistants</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  <strong>"Transform From Reactive Follower to Market Prophet in 90 Days"</strong>
                  <br /><br />
                  Stop chasing trends after they're already viral. Genesis is your AI Chief Strategy Officer that gives you Fortune 500-level market intelligence, predicting trends 6-8 weeks before competitors even know they exist.
                  <br /><br />
                  <strong>The Strategic Death Spiral:</strong> You're making gut decisions while AI-powered competitors use data to dominate. Every reactive decision costs you market share you'll never recover.
                  <br /><br />
                  <strong>Genesis Transformation:</strong> From reactive follower → market prophet who sets trends instead of chasing them.
                  <br /><br />
                  <strong>Results:</strong> 94% trend prediction accuracy, +347% average growth, 6-8 weeks competitive lead time.
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
                  <div>                    <h3 className="text-sm font-bold text-gray-900">Nexus - Revenue Optimization Engine</h3>                    <p className="text-green-600 font-semibold">Pricing, Running Ads & Cart Recovery</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  <strong>"Stop Leaving $50,000+ Monthly on the Table—Start Maximizing Every Revenue Stream"</strong>
                  <br /><br />
                  You're hemorrhaging money through pricing mistakes, cart abandonment, and conversion leaks while your AI-powered competitors capture every dollar.
                  <br /><br />
                  <strong>The Revenue Death Spiral:</strong> 67% cart abandonment rate, suboptimal pricing, and manual processes that can't scale. You're literally watching money walk away.
                  <br /><br />
                  <strong>Nexus Transformation:</strong> Your existing traffic → 2-3x more revenue without spending another dollar on ads.
                  <br /><br />
                  <strong>Results:</strong> +156% conversion boost, 67% cart recovery rate, +$127K average monthly increase.
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
                  <div>                    <h3 className="text-sm font-bold text-gray-900">Catalyst - Operational Excellence Engine</h3>                    <p className="text-purple-600 font-semibold">Supply Chain and Inventory Optimization</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  <strong>"Stop Drowning in 75-Hour Work Weeks—Start Scaling to $1M+ Without Breaking"</strong>
                  <br /><br />
                  You're trapped in operational chaos, working 75-hour weeks while AI-powered competitors scale effortlessly with automated systems.
                  <br /><br />
                  <strong>The Operational Death Spiral:</strong> Manual everything, constant firefighting, and systems that break when you try to grow. You're the bottleneck in your own business.
                  <br /><br />
                  <strong>Catalyst Transformation:</strong> Chaotic manual processes → Fortune 500-level operational systems that scale automatically.
                  <br /><br />
                  <strong>Results:</strong> -78% manual tasks, $1M+ scale capacity, 94% process automation, 60% time savings.
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
                    <h3 className="text-sm font-bold text-gray-900">Pulse - Customer Success Engine</h3>
                    <p className="text-orange-600 font-semibold">Pricing, Sales & Customer Success</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  <strong>"Stop the $40-to-Acquire, $35-and-Disappear Customer Death Spiral"</strong>
                  <br /><br />
                  You're spending $40+ to acquire customers who buy once for $35 and never return, while AI-powered competitors build loyal armies of brand evangelists.
                  <br /><br />
                  <strong>The Customer Acquisition Death Spiral:</strong> 85% customer churn, expensive acquisition costs, and no loyalty systems. You're trapped in an endless cycle of expensive customer replacement.
                  <br /><br />
                  <strong>Pulse Transformation:</strong> One-time buyers → loyal brand evangelists who spend 6.8x more and refer their friends.
                  <br /><br />
                  <strong>Results:</strong> 6.8x customer LTV, 92% retention rate, +145% repeat purchases, $320K annual LTV growth.
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
          <h2 className="text-4xl font-bold mb-6">
            Stop Watching Competitors Dominate With AI While You Fall Further Behind
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-xl mb-6" style={{ textAlign: 'center !important', maxWidth: 'none', margin: '0 auto 1.5rem auto' }}>
              <strong>The Window Is Closing:</strong> Every day you wait is another viral trend you'll miss, another $10,000+ in lost revenue, and another competitive advantage your rivals gain that you can't afford to lose.
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Join the Elite Circle Before Your Competitors Do:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Setup in 48 hours</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Predict next trend in 1 week</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>90-day money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>$1,000 penalty if we fail</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                CLAIM YOUR SPOT IN THE ELITE CIRCLE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/roi-calculator">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                CALCULATE YOUR REVENUE POTENTIAL
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

/* Force deployment - Wed Jul 16 03:12:11 EDT 2025 */
