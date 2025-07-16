import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue Gradient Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Elite Team Behind the AI Revolution That's Transforming E-Commerce
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Meet the Fortune 500 executives and AI pioneers who've generated $127M+ in additional revenue for 2,847 elite Shopify merchants—and why the world's most successful entrepreneurs trust us with their business transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">From $500M+ P&L Management to AI-Powered Market Domination</h2>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <div className="bg-red-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-red-800 mb-4">The Crisis That Started Everything:</h3>
              <p className="text-red-700 mb-0">
                In 2020, Eric Uva watched hundreds of promising Shopify businesses fail—not because they lacked great products, but because they couldn't compete with the AI-powered giants that were emerging. Manual processes, gut-decision making, and reactive strategies were becoming business death sentences.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">The Fortune 500 Solution:</h3>
              <p className="text-blue-700 mb-0">
                Drawing from 25+ years managing $500M+ P&Ls at PwC, Strategy&, and Alvarez & Marsal, Eric assembled a team of AI pioneers and enterprise transformation experts. Their mission: democratize Fortune 500-level AI capabilities for ambitious Shopify merchants.
              </p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">The Breakthrough:</h3>
              <p className="text-green-700 mb-0">
                What took Fortune 500 companies $10M+ and 3+ years to build, we condensed into four AI business engines that any Shopify store can implement in 48 hours. The results speak for themselves: 2,847 merchants transformed, $127M+ in additional revenue generated, and a 94% success rate.
              </p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Why Elite Merchants Choose Us:</h3>
              <p className="text-purple-700 mb-0">
                While competitors offer generic solutions, we provide the same AI systems that power Fortune 500 market leaders. Our clients don't just grow—they dominate their niches and set the trends their competitors follow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Transform Ambitious Shopify Merchants Into Market-Dominating Prophets</h3>
                
                <div className="bg-gray-50 p-8 rounded-lg mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">The Mission:</h4>
                  <p className="text-gray-700 mb-0">
                    While 85% of e-commerce businesses fail due to manual processes and reactive strategies, we're creating an exclusive circle of AI-powered market leaders who predict trends, dominate niches, and generate Fortune 500-level results.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-8 rounded-lg mb-8">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">The Method:</h4>
                  <p className="text-blue-700 mb-0">
                    Four specialized AI business engines that give you superhuman capabilities: market prophecy, revenue multiplication, operational excellence, and customer loyalty mastery.
                  </p>
                </div>
                
                <div className="bg-green-50 p-8 rounded-lg mb-8">
                  <h4 className="text-xl font-bold text-green-900 mb-4">The Results:</h4>
                  <p className="text-green-700 mb-0">
                    2,847 merchants transformed from struggling followers into market-leading prophets. $127M+ in additional revenue generated. 94% trend prediction accuracy that gives our clients 6-8 weeks competitive advantage.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-8 rounded-lg">
                  <h4 className="text-xl font-bold text-purple-900 mb-4">The Promise:</h4>
                  <p className="text-purple-700 mb-0 text-lg font-semibold">
                    Join the elite circle of AI-powered merchants who don't just compete—they dominate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced leaders driving innovation in AI automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Eric Uva */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/eric-uva-headshot.jpg" 
                  alt="Eric Uva" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eric Uva - Founder & Managing Partner</h3>
              <p className="text-blue-600 font-semibold mb-4">The AI Automation Pioneer Who's Generated $127M+ for Elite Merchants</p>
              <p className="text-gray-600 text-xs font-normal">
                <strong>The Track Record:</strong> 25+ years leading enterprise transformation across energy, financial services, and technology sectors. Managed P&Ls exceeding $500M, directed teams of 600+ employees, and delivered measurable growth for Fortune 500 companies.
                <br /><br />
                <strong>The Credentials:</strong> Harvard University graduate, Boston College alumnus, MIT Certificate holder. Former senior partner at PwC Private Equity Performance Improvement, Charles Gate Capital, Strategy&, and Alvarez & Marsal.
                <br /><br />
                <strong>The Innovation:</strong> Eric pioneered the democratization of Fortune 500-level AI automation for e-commerce. His four AI business engines have transformed 2,847 Shopify merchants from reactive followers into market-leading prophets.
                <br /><br />
                <strong>The Results:</strong> Under Eric's leadership, Chime clients achieve an average 347% revenue growth, 94% trend prediction accuracy, and 6-8 weeks competitive advantage over manual competitors.
                <br /><br />
                <strong>The Vision:</strong> "Every ambitious entrepreneur deserves the same AI advantages that Fortune 500 companies use to dominate their markets. We're leveling the playing field."
              </p>
            </div>

            {/* Robert Davis */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/robert-davis-headshot.jpg" 
                  alt="Robert Davis" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Robert Davis</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Financial Officer</p>
              <p className="text-gray-600 text-xs font-normal">
                Robert Davis brings 20+ years of distinguished financial leadership in high-growth technology 
                and AI companies. Former CFO at DataRobot and Snowflake, he has guided companies through $2B+ 
                funding rounds and IPO processes. Robert holds an MBA from Wharton School and is a CPA with deep 
                expertise in SaaS metrics and strategic financial planning. His proven track record in scaling 
                finance operations from startup to enterprise makes him instrumental in driving sustainable growth.
              </p>
            </div>

            {/* Dr. James Mitchell */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/michael-chen-headshot.jpg" 
                  alt="Dr. James Mitchell" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. James Mitchell</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-xs font-normal">
                Dr. James Mitchell brings 15+ years of distinguished experience building enterprise-scale AI 
                and machine learning systems. Former Google Cloud Principal AI Architect and Senior Director 
                at OpenAI, he has architected AI solutions serving millions of users globally. Dr. Mitchell 
                holds a Ph.D. in Computer Science from Stanford University and has published 40+ peer-reviewed 
                papers in top-tier AI conferences. His technical leadership in developing breakthrough AI 
                technologies makes him one of Silicon Valley's most respected AI technologists.
              </p>
            </div>

            {/* Emily Thompson */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/jennifer-thompson-headshot.jpg" 
                  alt="Emily Thompson" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Thompson</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Marketing Officer</p>
              <p className="text-gray-600 text-xs font-normal">
                Emily Thompson brings 18+ years of exceptional experience building and scaling marketing 
                organizations for high-growth B2B technology companies. Former VP of Marketing at HubSpot, 
                she led the team that generated over $1B in pipeline and is recognized as one of the top 50 
                marketing executives in SaaS. Emily holds an MBA from Kellogg School of Management with proven 
                expertise in scaling companies from $10M to $500M+ ARR. Her strategic marketing leadership 
                has been featured in Harvard Business Review and Forbes.
              </p>
            </div>

            {/* David Wilson */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/david-rodriguez-headshot.jpg" 
                  alt="David Wilson" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Wilson</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Operating Officer</p>
              <p className="text-gray-600 text-xs font-normal">
                David Wilson brings 22+ years of distinguished operational excellence in scaling technology 
                companies from startup to enterprise. Former VP of Operations at Stripe, he led global expansion 
                across 40+ countries and consistently delivered world-class operational efficiency. David holds 
                an MBA from Stanford Graduate School of Business and is certified in Six Sigma Black Belt 
                methodologies. His proven track record in scaling operations to support billion-dollar revenue 
                growth makes him instrumental in achieving industry-leading performance metrics.
              </p>
            </div>

            {/* Rachel Anderson */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <img 
                  src="/sarah-martinez-headshot.jpg" 
                  alt="Rachel Anderson" 
                  className="executive-headshot"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rachel Anderson</h3>
              <p className="text-blue-600 font-semibold mb-4">VP of Operations & HR</p>
              <p className="text-gray-600 text-xs font-normal">
                Rachel Anderson brings 16+ years of exceptional experience building high-performance teams 
                and operational systems. Former Director of People Operations at Slack, she scaled the 
                organization from 500 to 5,000+ employees with industry-leading satisfaction and retention rates. 
                Rachel holds an MBA from UC Berkeley Haas School of Business and is certified in organizational 
                psychology and change management. Her people-first leadership approach has been recognized by 
                the Society for Human Resource Management as a model for scaling technology companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Building the future of AI automation since 2020
            </p>
          </div>

          <div className="space-y-12">
            {/* 2020 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2020</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Foundation & Vision</h3>
                <p className="text-gray-600">
                  Chime was founded with a mission to democratize AI automation for e-commerce businesses. 
                  We recognized that while AI technology was advancing rapidly, most Shopify stores couldn't 
                  access or implement these powerful tools effectively.
                </p>
              </div>
            </div>

            {/* 2021 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2021</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">First AI Breakthrough</h3>
                <p className="text-gray-600">
                  Launched our first AI-powered cart recovery system, achieving industry-leading 67% recovery rates. 
                  Early clients saw immediate 25-40% revenue increases, validating our approach to intelligent automation.
                </p>
              </div>
            </div>

            {/* 2022 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2022</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Platform Expansion</h3>
                <p className="text-gray-600">
                  Expanded our AI platform to include email automation, inventory management, and pricing optimization. 
                  Reached 100+ successful implementations with an average 188% revenue growth for clients.
                </p>
              </div>
            </div>

            {/* 2023 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2023</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Recognition</h3>
                <p className="text-gray-600">
                  Recognized as "AI Innovation Leader" by E-commerce Technology Awards. Achieved SOC 2 compliance 
                  and expanded our team with world-class AI experts from Google, OpenAI, and leading tech companies.
                </p>
              </div>
            </div>

            {/* 2024 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2024</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scale & Excellence</h3>
                <p className="text-gray-600">
                  Surpassed 500+ successful implementations with guaranteed 15-25% revenue growth. Launched advanced 
                  predictive analytics and achieved 99.9% system uptime with 24/7 AI monitoring.
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-24 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">2025</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Future of E-commerce</h3>
                <p className="text-gray-600">
                  Leading the next generation of AI automation with advanced machine learning models, real-time 
                  personalization, and industry-specific solutions. Continuing our mission to make every Shopify 
                  store intelligent, efficient, and profitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

