import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue Gradient Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              About <span className="text-blue-400">Chime</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Building the future of AI automation since 2020. Chime has been at the 
              forefront of AI-powered automation, helping over 500 Shopify businesses 
              achieve guaranteed revenue growth through intelligent technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Chime was born from a simple observation: while AI technology was advancing rapidly, 
              most e-commerce businesses couldn't access or implement these powerful tools effectively. 
              Traditional agencies offered generic solutions, and enterprise AI was too complex and expensive.
            </p>
            
            <p className="mb-6">
              Our founder, Eric Uva, leveraged over 25 years of enterprise transformation experience 
              to create a platform that makes sophisticated AI automation accessible to businesses of all sizes. 
              We believe every Shopify store deserves the competitive advantage that AI can provide.
            </p>
            
            <p className="mb-8">
              Today, we're proud to have helped hundreds of businesses achieve measurable growth, 
              with an average revenue increase of 188% within the first year of implementation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p>
                  To democratize AI automation for e-commerce businesses, making advanced technology 
                  accessible and profitable for companies of all sizes.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p>
                  A world where every e-commerce business can leverage AI to create personalized 
                  customer experiences, optimize operations, and achieve sustainable growth.
                </p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eric Uva</h3>
              <p className="text-blue-600 font-semibold mb-4">Founder & Managing Partner</p>
              <p className="text-gray-600 text-sm">
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
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Robert Davis</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Financial Officer</p>
              <p className="text-gray-600 text-sm">
                Robert Davis brings 20+ years of distinguished financial leadership in high-growth technology 
                and AI companies. Former CFO at DataRobot and Snowflake, he has guided companies through $2B+ 
                funding rounds and IPO processes. Robert holds an MBA from Wharton School and is a CPA with deep 
                expertise in SaaS metrics and strategic financial planning. His proven track record in scaling 
                finance operations from startup to enterprise makes him instrumental in driving sustainable growth.
              </p>
            </div>

            {/* Dr. James Mitchell */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. James Mitchell</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Thompson</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Marketing Officer</p>
              <p className="text-gray-600 text-sm">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Wilson</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Operating Officer</p>
              <p className="text-gray-600 text-sm">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rachel Anderson</h3>
              <p className="text-blue-600 font-semibold mb-4">VP of Operations & HR</p>
              <p className="text-gray-600 text-sm">
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

