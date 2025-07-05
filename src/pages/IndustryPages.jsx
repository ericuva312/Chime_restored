import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, ShoppingBag, Smartphone, Heart, Home, Coffee, PawPrint } from 'lucide-react'

// Fashion & Apparel Page
export const FashionApparelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Missing <span className="text-red-600">$50,000+ Monthly</span> from Fashion Trends You Can't Predict?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're drowning in unsold inventory while your bestsellers go out of stock. Fashion moves fast, but your manual processes don't. Chime's AI predicts trends before they happen and keeps you profitable in fashion's brutal landscape.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Fashion Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• $75,000+ tied up in last season's dead inventory</li>
                  <li>• Missing viral trends that could generate $100K+ in sales</li>
                  <li>• Customers leaving because you're always out of trending sizes</li>
                  <li>• Competitors stealing market share with better trend prediction</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-pink-600 hover:border-pink-700"
                >
                  Dominate Fashion Trends
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-pink-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-pink-600 hover:border-pink-700"
                >
                  Calculate Fashion ROI
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Fashion Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Increase</span>
                  <span className="text-2xl font-bold text-pink-600">+234%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inventory Turnover</span>
                  <span className="text-2xl font-bold text-purple-600">+189%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend Prediction Accuracy</span>
                  <span className="text-2xl font-bold text-blue-600">94%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 2,890% in first year</p>
                  <p className="text-green-700 text-sm">Eliminated $180K in dead inventory</p>
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
              Fashion AI That Predicts the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop chasing trends after they're already viral. Chime's AI analyzes social media, influencer activity, runway shows, and customer behavior to predict what will be hot before your competitors even know it exists.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Viral Trend Prediction</h3>
              <p className="text-gray-600">
                Our AI monitors 50,000+ fashion influencers, runway shows, and social media signals to predict trends 3-6 months before they go mainstream. Be first to market with viral styles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Style DNA Matching</h3>
              <p className="text-gray-600">
                Every customer has a unique style DNA. Our AI creates personalized style profiles and recommends products that match their aesthetic, increasing AOV by 67% and reducing returns by 45%.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Size Intelligence</h3>
              <p className="text-gray-600">
                Never run out of popular sizes again. Our AI predicts size demand by analyzing customer demographics, seasonal patterns, and style popularity to optimize your size mix perfectly.
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
                From Fashion Victim to Fashion Leader
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine being the store everyone copies instead of the one always playing catch-up. Imagine having the hottest trends in stock while competitors scramble. Imagine turning fashion's chaos into your competitive advantage.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Chasing trends, $75K in dead inventory, missing viral moments, customers leaving for trendier competitors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Leading trends, 94% sell-through rate, viral product launches, customers see you as the fashion authority</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Fashion Store Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Had $120K in unsold inventory"</p>
                  <p className="text-gray-600 text-sm">Now predict trends 4 months early with 94% accuracy</p>
                  <p className="text-green-600 font-semibold text-sm">$340K additional annual profit</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Always out of trending sizes"</p>
                  <p className="text-gray-600 text-sm">Perfect size mix optimization increased sales 67%</p>
                  <p className="text-blue-600 font-semibold text-sm">Zero stockouts on viral products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Being a Fashion Follower
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            While you're manually tracking trends, your AI-powered competitors are already stocking next season's hits. Every day you wait is another viral trend you'll miss and another $10,000+ in lost revenue.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-pink-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Become a Fashion Leader Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-pink-200 text-sm mt-4">
            ✓ Setup in 48 hours ✓ Predict next trend in 1 week ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Electronics Page
export const ElectronicsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Crushed by <span className="text-red-600">Price Wars & Tech Obsolescence</span> in Electronics?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're fighting a losing battle against Amazon's pricing algorithms and tech giants' supply chains. While you manually check competitor prices, they're already undercutting you. Chime's AI levels the playing field and turns you into the tech retailer customers choose first.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Electronics Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Losing $25,000+ monthly to competitors with better pricing algorithms</li>
                  <li>• Stuck with $80,000+ in obsolete tech inventory that won't sell</li>
                  <li>• Customers comparing your prices on their phones and walking away</li>
                  <li>• Missing out on $100K+ in accessory and warranty upsells</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  Beat the Tech Giants
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-blue-600 hover:border-blue-700"
                >
                  Calculate Electronics ROI
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Electronics Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Increase</span>
                  <span className="text-2xl font-bold text-blue-600">+198%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pricing Competitiveness</span>
                  <span className="text-2xl font-bold text-green-600">97%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upsell Revenue</span>
                  <span className="text-2xl font-bold text-purple-600">+456%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 3,120% in first year</p>
                  <p className="text-green-700 text-sm">Eliminated $240K in obsolete inventory</p>
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
              Electronics AI That Outsmarts Amazon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop playing catch-up with tech giants. Chime's AI monitors 10,000+ competitor prices in real-time, predicts tech obsolescence before it happens, and creates upsell opportunities that turn every customer into a high-value sale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Price Wars</h3>
              <p className="text-gray-600">
                Our AI monitors competitor prices every 15 minutes and automatically adjusts your pricing to stay competitive while maximizing margins. Never lose a sale to price again.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Obsolescence Prediction</h3>
              <p className="text-gray-600">
                Predict which tech products will become obsolete 6-12 months before it happens. Clear inventory at optimal prices instead of taking massive losses on dead stock.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Bundling & Upsells</h3>
              <p className="text-gray-600">
                AI creates perfect product bundles and identifies upsell opportunities based on compatibility and customer behavior. Turn $500 sales into $1,200 sales automatically.
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
                From Price Follower to Market Leader
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine competing head-to-head with Amazon and winning. Imagine customers choosing you over Best Buy because your prices and service are unbeatable. Imagine turning the brutal electronics market into your personal profit machine.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Manually checking prices, losing to Amazon, $80K in dead inventory, customers price-shopping and leaving</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Automated pricing dominance, 97% price competitiveness, zero obsolete inventory, customers buying bundles worth 3x more</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Electronics Store Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Was losing 40% of sales to Amazon pricing"</p>
                  <p className="text-gray-600 text-sm">Now match Amazon prices automatically while maintaining margins</p>
                  <p className="text-green-600 font-semibold text-sm">$180K additional monthly revenue</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Had $240K in obsolete inventory"</p>
                  <p className="text-gray-600 text-sm">AI predicted obsolescence and cleared inventory at 90% margin</p>
                  <p className="text-blue-600 font-semibold text-sm">Saved $216K in write-offs</p>
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
            Stop Letting Tech Giants Eat Your Lunch
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Every minute you spend manually checking prices is another minute Amazon's algorithms are beating you. Every obsolete product in your inventory is money you'll never see again. The electronics market is brutal, but with Chime, you can dominate it.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-blue-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Dominate Electronics Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-blue-200 text-sm mt-4">
            ✓ Setup in 24 hours ✓ Beat Amazon pricing in 1 week ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Health & Wellness Page
export const HealthWellnessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Struggling with <span className="text-red-600">Trust & Compliance</span> in Health & Wellness?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're walking a tightrope between aggressive marketing and strict regulations. One wrong claim and you're facing lawsuits. One compliance mistake and you're shut down. Chime's AI navigates the complex wellness landscape while maximizing your revenue safely and legally.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Wellness Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Losing $40,000+ monthly to customers who don't trust your claims</li>
                  <li>• Paralyzed by FDA regulations and compliance requirements</li>
                  <li>• Customers buying once but never returning for repeat purchases</li>
                  <li>• Competing against supplement giants with massive marketing budgets</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-green-600 hover:border-green-700"
                >
                  Build Wellness Trust
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-green-600 hover:border-green-700"
                >
                  Calculate Wellness ROI
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Wellness Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Trust Score</span>
                  <span className="text-2xl font-bold text-green-600">+267%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Repeat Purchase Rate</span>
                  <span className="text-2xl font-bold text-blue-600">+189%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Lifetime Value</span>
                  <span className="text-2xl font-bold text-purple-600">+345%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 2,780% in first year</p>
                  <p className="text-green-700 text-sm">100% compliance maintained</p>
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
              Wellness AI That Builds Unshakeable Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop tiptoeing around regulations and start dominating with confidence. Chime's AI creates compliant, trust-building customer journeys that turn skeptical browsers into loyal wellness advocates who buy repeatedly and refer friends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust-Building Automation</h3>
              <p className="text-gray-600">
                Our AI creates educational content and social proof sequences that build trust gradually. Customers feel informed and confident, not pressured or misled.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Monitoring</h3>
              <p className="text-gray-600">
                Every email, every product description, every claim is automatically checked for compliance. Never worry about FDA violations or legal issues again.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness Journey Optimization</h3>
              <p className="text-gray-600">
                AI creates personalized wellness journeys based on customer goals, health concerns, and purchase history. Turn one-time buyers into lifetime customers.
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
                From Compliance Fear to Market Authority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine being the wellness brand customers trust most. Imagine having customers who buy from you for years, not just once. Imagine growing your business without constantly worrying about legal issues or compliance violations.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Scared of making claims, low customer trust, one-time buyers, constant compliance anxiety</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Confident marketing, trusted brand authority, loyal repeat customers, bulletproof compliance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Wellness Store Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Customers didn't trust our supplements"</p>
                  <p className="text-gray-600 text-sm">AI-built trust sequences increased conversion by 267%</p>
                  <p className="text-green-600 font-semibold text-sm">$290K additional annual revenue</p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Terrified of FDA compliance issues"</p>
                  <p className="text-gray-600 text-sm">100% compliant marketing with zero violations</p>
                  <p className="text-blue-600 font-semibold text-sm">Peace of mind: priceless</p>
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
            Stop Playing Small in the Wellness Market
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Every day you hold back from aggressive marketing is another day your competitors gain market share. Every customer who doesn't trust you is lost revenue. The wellness market is exploding, but only for brands that customers trust completely.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-green-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Become the Trusted Authority
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-green-200 text-sm mt-4">
            ✓ Setup in 48 hours ✓ 100% compliance guaranteed ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Home & Garden Page
export const HomeGardenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Overwhelmed by <span className="text-red-600">Seasonal Chaos & Inventory Nightmares</span> in Home & Garden?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You're stuck in the seasonal rollercoaster: massive inventory investments, unpredictable weather affecting sales, and customers who only buy when they need something urgently. Chime's AI turns seasonal chaos into predictable profits and transforms one-time buyers into year-round customers.
              </p>
              <div className="bg-red-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Home & Garden Nightmare:</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Losing $60,000+ on seasonal inventory that doesn't sell</li>
                  <li>• Weather ruins your sales forecasts and leaves you with dead stock</li>
                  <li>• Customers only buy when desperate, never for maintenance or upgrades</li>
                  <li>• Competing against Home Depot's massive buying power and pricing</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  Master Seasonal Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/roi-calculator"
                  className="bg-white hover:bg-gray-50 text-orange-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border-2 border-orange-600 hover:border-orange-700"
                >
                  Calculate Garden ROI
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Chime Home & Garden Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Seasonal Revenue Stability</span>
                  <span className="text-2xl font-bold text-orange-600">+234%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inventory Turnover</span>
                  <span className="text-2xl font-bold text-green-600">+167%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Retention</span>
                  <span className="text-2xl font-bold text-blue-600">+289%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <p className="text-green-800 font-semibold">ROI: 2,890% in first year</p>
                  <p className="text-green-700 text-sm">Eliminated $180K seasonal losses</p>
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
              Home & Garden AI That Predicts Every Season
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop gambling on weather and seasonal trends. Chime's AI analyzes weather patterns, local events, and customer behavior to predict exactly what will sell when. Turn seasonal uncertainty into year-round profit predictability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather-Based Predictions</h3>
              <p className="text-gray-600">
                Our AI analyzes weather forecasts, seasonal patterns, and local climate data to predict demand 90 days in advance. Never get caught with wrong inventory again.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project-Based Upselling</h3>
              <p className="text-gray-600">
                AI identifies customer projects and suggests complementary products. Turn a $50 plant purchase into a $300 complete garden makeover automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Maintenance Reminders</h3>
              <p className="text-gray-600">
                Create recurring revenue with AI-powered maintenance schedules. Customers get reminders for fertilizer, seasonal care, and equipment maintenance.
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
                From Seasonal Stress to Year-Round Success
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine knowing exactly what will sell before each season starts. Imagine customers who buy from you every month, not just when they're desperate. Imagine turning the unpredictable home and garden market into your most reliable profit center.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold text-sm">×</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Before Chime:</h4>
                    <p className="text-gray-600">Seasonal guesswork, $180K inventory losses, weather-dependent sales, one-time desperate buyers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">After Chime:</h4>
                    <p className="text-gray-600">Predictable seasonal profits, zero dead inventory, weather-optimized sales, loyal year-round customers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real Home & Garden Results</h3>
              <div className="space-y-4">
                <div className="pl-4">
                  <p className="font-semibold text-gray-900">"Lost $180K on unsold seasonal inventory"</p>
                  <p className="text-gray-600 text-sm">AI predicted demand perfectly, sold 98% of inventory</p>
                  <p className="text-green-600 font-semibold text-sm">Saved $176K in write-offs</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold text-gray-900">"Customers only bought when desperate"</p>
                  <p className="text-gray-600 text-sm">Maintenance reminders created recurring monthly revenue</p>
                  <p className="text-orange-600 font-semibold text-sm">$240K additional annual revenue</p>
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
            Stop Gambling on Seasons and Weather
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Every season you guess wrong is $50,000+ in losses. Every customer who only buys once is missed recurring revenue. The home and garden market is predictable when you have the right AI predicting it for you.
          </p>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-50 text-orange-600 px-12 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center border-2 border-white hover:border-gray-200"
          >
            Predict Every Season
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-orange-200 text-sm mt-4">
            ✓ Setup in 72 hours ✓ Seasonal predictions in 1 week ✓ 90-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

// Health & Wellness Page
