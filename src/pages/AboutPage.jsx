import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Target, Award, TrendingUp, Shield, Zap } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue Gradient Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Chime</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed">
              Building the future of AI automation since 2020. Chime has been at the 
              forefront of AI-powered automation, helping over 500 Shopify businesses 
              achieve guaranteed revenue growth through intelligent technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center">
                  Join Our Success Stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Successful Implementations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">188%</div>
              <div className="text-gray-600 font-medium">Average Revenue Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Enhanced Premium Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
              <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
                <p className="mb-8 text-lg">
                  Chime was born from a simple observation: while AI technology was advancing rapidly, 
                  most e-commerce businesses couldn't access or implement these powerful tools effectively. 
                  Traditional agencies offered generic solutions, and enterprise AI was too complex and expensive.
                </p>
                
                <p className="mb-8 text-lg">
                  Our founder, Eric Uva, leveraged over 25 years of enterprise transformation experience 
                  to create a platform that makes sophisticated AI automation accessible to businesses of all sizes. 
                  We believe every Shopify store deserves the competitive advantage that AI can provide.
                </p>
                
                <p className="mb-12 text-lg">
                  Today, we're proud to have helped hundreds of businesses achieve measurable growth, 
                  with an average revenue increase of 188% within the first year of implementation.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200">
                    <div className="flex items-center mb-4">
                      <Target className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      To democratize AI automation for e-commerce businesses, making advanced technology 
                      accessible and profitable for companies of all sizes.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl border border-purple-200">
                    <div className="flex items-center mb-4">
                      <Zap className="h-8 w-8 text-purple-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      A world where every e-commerce business can leverage AI to create personalized 
                      customer experiences, optimize operations, and achieve sustainable growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section - Premium Design with Headshots */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Leadership Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation in AI automation with proven track records at world-class companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Eric Uva */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/eric-uva-headshot.jpeg" 
                    alt="Eric Uva" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Eric Uva</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">Founder & Managing Partner</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Eric Uva is the Founder and Managing Partner of Chime, with over 25 years of experience 
                leading enterprise transformation and AI automation in e-commerce and related industries. 
                He has managed P&Ls of $500M+, directed teams of more than 600 employees, and overseen 
                large-scale projects across energy, financial services, industrial, software, and technology sectors. 
                Eric has held senior leadership roles at PwC Private Equity Performance Improvement, Charles Gate Capital, 
                Strategy&, and Alvarez & Marsal. He holds degrees from Boston College and Harvard University, 
                and Certificate from MIT. At Chime, he applies advanced economic analysis and proven innovation 
                frameworks to deliver AI automation solutions for Shopify businesses, helping clients achieve 
                consistent revenue growth and significant time savings.
              </p>
            </div>

            {/* Robert Davis */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/robert-davis-headshot.jpeg" 
                    alt="Robert Davis" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Robert Davis</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">Chief Financial Officer</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Robert Davis brings 20+ years of distinguished financial leadership in high-growth technology 
                and AI companies. Former CFO at DataRobot and Snowflake, he has guided companies through $2B+ 
                funding rounds and IPO processes. Robert holds an MBA from Wharton School and is a CPA with deep 
                expertise in SaaS metrics and strategic financial planning. His proven track record in scaling 
                finance operations from startup to enterprise makes him instrumental in driving sustainable growth.
              </p>
            </div>

            {/* Dr. James Mitchell */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/james-mitchell-headshot.jpeg" 
                    alt="Dr. James Mitchell" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. James Mitchell</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">Chief Technology Officer</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dr. James Mitchell brings 15+ years of distinguished experience building enterprise-scale AI 
                and machine learning systems. Former Google Cloud Principal AI Architect and Senior Director 
                at OpenAI, he has architected AI solutions serving millions of users globally. Dr. Mitchell 
                holds a Ph.D. in Computer Science from Stanford University and has published 40+ peer-reviewed 
                papers in top-tier AI conferences. His technical leadership in developing breakthrough AI 
                technologies makes him one of Silicon Valley's most respected AI technologists.
              </p>
            </div>

            {/* Emily Thompson */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/emily-thompson-headshot.jpeg" 
                    alt="Emily Thompson" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Emily Thompson</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">Chief Marketing Officer</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Emily Thompson brings 18+ years of exceptional experience building and scaling marketing 
                organizations for high-growth B2B technology companies. Former VP of Marketing at HubSpot, 
                she led the team that generated over $1B in pipeline and is recognized as one of the top 50 
                marketing executives in SaaS. Emily holds an MBA from Kellogg School of Management with proven 
                expertise in scaling companies from $10M to $500M+ ARR. Her strategic marketing leadership 
                has been featured in Harvard Business Review and Forbes.
              </p>
            </div>

            {/* David Wilson */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/david-wilson-headshot.jpeg" 
                    alt="David Wilson" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">David Wilson</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">Chief Operating Officer</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                David Wilson brings 22+ years of distinguished operational excellence in scaling technology 
                companies from startup to enterprise. Former VP of Operations at Stripe, he led global expansion 
                across 40+ countries and consistently delivered world-class operational efficiency. David holds 
                an MBA from Stanford Graduate School of Business and is certified in Six Sigma Black Belt 
                methodologies. His proven track record in scaling operations to support billion-dollar revenue 
                growth makes him instrumental in achieving industry-leading performance metrics.
              </p>
            </div>

            {/* Rachel Anderson */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-6">
                  <img 
                    src="/src/assets/rachel-anderson-headshot.jpeg" 
                    alt="Rachel Anderson" 
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rachel Anderson</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">VP of Operations & HR</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
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

      {/* Our Journey Section - Enhanced Timeline */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of AI automation since 2020
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full hidden md:block"></div>
            
            <div className="space-y-16">
              {/* 2020 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-3xl font-bold text-blue-600 mb-4">2020</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Foundation & Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Chime was founded with a mission to democratize AI automation for e-commerce businesses. 
                      We recognized that while AI technology was advancing rapidly, most Shopify stores couldn't 
                      access or implement these powerful tools effectively.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2"></div>
              </div>

              {/* 2021 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2"></div>
                <div className="hidden md:block w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-3xl font-bold text-green-600 mb-4">2021</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">First AI Breakthrough</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Launched our first AI-powered cart recovery system, achieving industry-leading 67% recovery rates. 
                      Early clients saw immediate 25-40% revenue increases, validating our approach to intelligent automation.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-3xl font-bold text-purple-600 mb-4">2022</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Expansion</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Expanded our AI platform to include email automation, inventory management, and pricing optimization. 
                      Reached 100+ successful implementations with an average 188% revenue growth for clients.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2"></div>
              </div>

              {/* 2023 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2"></div>
                <div className="hidden md:block w-8 h-8 bg-orange-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-3xl font-bold text-orange-600 mb-4">2023</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Recognition</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Recognized as "AI Innovation Leader" by E-commerce Technology Awards. Achieved SOC 2 compliance 
                      and expanded our team with world-class AI experts from Google, OpenAI, and leading tech companies.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-3xl font-bold text-indigo-600 mb-4">2024</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Scale & Excellence</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Surpassed 500+ successful implementations with guaranteed 15-25% revenue growth. Launched advanced 
                      predictive analytics and achieved 99.9% system uptime with 24/7 AI monitoring.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2"></div>
              </div>

              {/* 2025 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2"></div>
                <div className="hidden md:block w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">2025</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Future of E-commerce</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Leading the next generation of AI automation with advanced machine learning models, real-time 
                      personalization, and industry-specific solutions. Continuing our mission to make every Shopify 
                      store intelligent, efficient, and profitable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of successful Shopify merchants who've achieved guaranteed growth with our AI automation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center">
                Start Your Success Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link to="/roi-calculator">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                Calculate Your ROI
                <TrendingUp className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

