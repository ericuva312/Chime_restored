import React from 'react';
import { Link } from 'react-router-dom';

const ImplementationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Matching Main Page Style */}
      <section 
        className="text-white py-20"
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a)',
          minHeight: '600px'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-blue-700/50 rounded-full text-sm font-medium">
              ⚡ Implementation Process
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            How Chime Transforms Your
            <span className="text-blue-300"> Shopify Store</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            A complete breakdown of what Chime does, what you need to provide, 
            and exactly what to expect at every step of your revenue growth journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-pink-600 hover:border-pink-700"
            >
              Start Implementation →
            </Link>
            <Link 
              to="/case-studies" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px'
              }}
            >
              View Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* What Chime Does Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Chime Does for Your Shopify Store
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chime integrates and manages industry-leading AI apps to automate your entire e-commerce operation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                🛒
              </div>
              <h3 className="text-xl font-semibold mb-3">Cart Recovery Automation</h3>
              <p className="text-gray-600 mb-4">
                Automatically recovers 60-70% of abandoned carts with personalized email sequences and SMS campaigns.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Typical Result: +15-25% revenue from recovered sales
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                📧
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Marketing Automation</h3>
              <p className="text-gray-600 mb-4">
                Creates and manages welcome series, product recommendations, win-back campaigns, and customer lifecycle emails.
              </p>
              <div className="text-sm text-green-600 font-medium">
                Typical Result: +20-30% increase in customer lifetime value
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Product Recommendations</h3>
              <p className="text-gray-600 mb-4">
                AI analyzes customer behavior to show the right products at the right time, increasing average order value.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Typical Result: +25-40% increase in average order value
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-3">Dynamic Pricing Optimization</h3>
              <p className="text-gray-600 mb-4">
                Automatically adjusts prices based on demand, competition, and inventory levels to maximize profit margins.
              </p>
              <div className="text-sm text-orange-600 font-medium">
                Typical Result: +10-18% increase in profit margins
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Segmentation & Analytics</h3>
              <p className="text-gray-600 mb-4">
                Segments customers by behavior, value, and preferences to deliver targeted marketing campaigns.
              </p>
              <div className="text-sm text-red-600 font-medium">
                Typical Result: +30-50% improvement in campaign performance
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                📦
              </div>
              <h3 className="text-xl font-semibold mb-3">Inventory Management</h3>
              <p className="text-gray-600 mb-4">
                Predicts demand, prevents stockouts, and optimizes inventory levels to reduce costs and maximize sales.
              </p>
              <div className="text-sm text-teal-600 font-medium">
                Typical Result: +15-25% reduction in inventory costs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Creation Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Value Chime Creates for You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond revenue growth, Chime transforms how you run your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💰 Financial Impact</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>15-25% revenue increase</strong> within 90 days guaranteed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>25-40% higher average order value</strong> through smart recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>60-70% cart recovery rate</strong> vs 10-15% industry average</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>10-18% profit margin improvement</strong> through pricing optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">⏰ Time & Operational Benefits</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span><strong>20+ hours saved per week</strong> on manual marketing tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span><strong>24/7 automated optimization</strong> while you sleep</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span><strong>Zero technical skills required</strong> - we handle everything</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span><strong>Focus on growth strategy</strong> instead of daily operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Need From You Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Need From You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Minimal time investment required - we handle the heavy lifting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔑</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Store Access</h3>
              <p className="text-gray-600 mb-4">
                Shopify admin access to install and configure AI apps (we guide you through this)
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Time Required: 15 minutes
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Information</h3>
              <p className="text-gray-600 mb-4">
                Basic details about your products, target audience, and current marketing efforts
              </p>
              <div className="text-sm text-green-600 font-medium">
                Time Required: 30 minutes
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Weekly Check-ins</h3>
              <p className="text-gray-600 mb-4">
                Brief calls to review performance, adjust strategies, and answer questions
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Time Required: 15-30 minutes/week
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Total Time Investment: Less than 2 hours in the first month
            </h3>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              After initial setup, your involvement is minimal. Our AI systems run autonomously while you focus on growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Timeline & Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Implementation Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear milestones and expectations for every step of your journey
            </p>
          </div>

          <div className="space-y-8">
            {/* Week 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Week 1: Setup & Integration</h3>
                  <p className="text-blue-600 font-medium">Days 1-7</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Your Time Investment</div>
                  <div className="text-lg font-semibold text-blue-600">1 hour total</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What We Do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Install and configure all AI apps</li>
                    <li>• Set up cart recovery sequences</li>
                    <li>• Configure email automation</li>
                    <li>• Implement product recommendations</li>
                    <li>• Begin customer data analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You Can Expect:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Daily progress updates</li>
                    <li>• All systems live and running</li>
                    <li>• First automated emails sending</li>
                    <li>• Cart recovery campaigns active</li>
                    <li>• Initial performance baseline established</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 2-3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Weeks 2-3: Optimization & Learning</h3>
                  <p className="text-green-600 font-medium">Days 8-21</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Your Time Investment</div>
                  <div className="text-lg font-semibold text-green-600">30 minutes/week</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What We Do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• AI learns your customer patterns</li>
                    <li>• Optimize email sequences based on data</li>
                    <li>• Fine-tune product recommendations</li>
                    <li>• Adjust pricing strategies</li>
                    <li>• A/B test different approaches</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You Can Expect:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 5-10% revenue increase visible</li>
                    <li>• Higher email open rates</li>
                    <li>• More recovered carts</li>
                    <li>• Improved product page performance</li>
                    <li>• Weekly performance reports</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Month 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Month 2: Acceleration & Scaling</h3>
                  <p className="text-purple-600 font-medium">Days 22-60</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Your Time Investment</div>
                  <div className="text-lg font-semibold text-purple-600">15 minutes/week</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What We Do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Deploy advanced segmentation</li>
                    <li>• Launch predictive analytics</li>
                    <li>• Implement dynamic pricing</li>
                    <li>• Scale successful campaigns</li>
                    <li>• Optimize for peak performance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You Can Expect:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 15-20% revenue increase achieved</li>
                    <li>• Significantly higher AOV</li>
                    <li>• Improved customer retention</li>
                    <li>• Automated inventory optimization</li>
                    <li>• Detailed ROI analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Month 3+ */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-orange-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Month 3+: Full Optimization & Growth</h3>
                  <p className="text-orange-600 font-medium">Days 61-90+</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Your Time Investment</div>
                  <div className="text-lg font-semibold text-orange-600">Minimal</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What We Do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Continuous AI optimization</li>
                    <li>• Advanced customer journey mapping</li>
                    <li>• Predictive inventory management</li>
                    <li>• Cross-sell and upsell automation</li>
                    <li>• Long-term growth strategy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You Can Expect:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 15-25% revenue growth guaranteed</li>
                    <li>• Fully automated operations</li>
                    <li>• Predictable, scalable growth</li>
                    <li>• 20+ hours saved per week</li>
                    <li>• Complete business transformation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our 90-Day Growth Guarantee
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            If we don't deliver 15-25% revenue growth within 90 days, you get a full refund. 
            We're so confident in our system that we put our money where our mouth is.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-800/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-300 mb-2">15-25%</div>
              <div className="text-sm">Guaranteed Growth</div>
            </div>
            <div className="bg-blue-800/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-300 mb-2">90 Days</div>
              <div className="text-sm">Money-Back Guarantee</div>
            </div>
            <div className="bg-blue-800/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-300 mb-2">500+</div>
              <div className="text-sm">Successful Implementations</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Implementation
            </Link>
            <Link 
              to="/case-studies" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-white/20"
            >
              View Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImplementationPage;

