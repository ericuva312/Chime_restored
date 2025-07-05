import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const AboutPage = () => {
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Eric Uva establishes Chime with a vision to democratize AI automation for e-commerce businesses"
    },
    {
      year: "2021",
      title: "First AI Models",
      description: "Developed proprietary customer segmentation algorithms with 95% accuracy rates"
    },
    {
      year: "2022",
      title: "Shopify Partnership",
      description: "Became certified Shopify Plus partner, enabling seamless platform integration"
    },
    {
      year: "2023",
      title: "500+ Clients",
      description: "Reached milestone of 500 successful implementations across 15 industries"
    },
    {
      year: "2024",
      title: "Enterprise Expansion",
      description: "Launched enterprise solutions for businesses with $10M+ annual revenue"
    },
    {
      year: "2025",
      title: "Global Recognition",
      description: "Named 'AI Innovation Leader' by E-commerce Technology Awards"
    }
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Comprehensive security and availability controls",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    },
    {
      name: "ISO 27001",
      description: "International information security management",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    },
    {
      name: "PCI DSS Level 1",
      description: "Payment card industry data security standards",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    }
  ]



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-blue-400">Chime</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Building the future of AI automation since 2020. Chime has been at the forefront of AI-powered automation, 
              helping over 500 Shopify businesses achieve guaranteed revenue growth 
              through intelligent technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Chime was born from a simple observation: while AI technology was advancing rapidly, 
                most e-commerce businesses couldn't access or implement these powerful tools effectively. 
                Traditional agencies offered generic solutions, and enterprise AI was too complex and expensive.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, Eric Uva, leveraged over 25 years of enterprise transformation experience 
                to create a platform that makes sophisticated AI automation accessible to businesses of all sizes. 
                We believe every Shopify store deserves the competitive advantage that AI can provide.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to have helped hundreds of businesses achieve measurable growth, 
                with an average revenue increase of 188% within the first year of implementation.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                To democratize AI automation for e-commerce businesses, making advanced technology 
                accessible and profitable for companies of all sizes.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600">
                A world where every e-commerce business can leverage AI to create personalized 
                customer experiences, optimize operations, and achieve sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced leaders driving innovation in AI automation</p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
            {/* Eric Uva */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="/headshot.jpeg" 
                    alt="Eric Uva" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Eric Uva</h3>
                  <p className="text-blue-600 font-semibold text-sm">Founder & Managing Partner</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Eric Uva is the Founder and Managing Partner of Chime, with over 25 years of experience leading enterprise transformation and AI automation in e-commerce and related industries. He has managed P&Ls of $500M+, directed teams of more than 600 employees, and overseen large-scale projects across energy, financial services, industrial, software, and technology sectors. Eric has held senior leadership roles at PwC Private Equity Performance Improvement, Charles Gate Capital, Strategy&, and Alvarez & Marsal. He holds degrees from Boston College and Harvard University, and Certificate from MIT. At Chime, he applies advanced economic analysis and proven innovation frameworks to deliver AI automation solutions for Shopify businesses, helping clients achieve consistent revenue growth and significant time savings.
                </p>
              </CardContent>
            </Card>

            {/* Robert Davis */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="/robert-davis-unique.jpg" 
                    alt="Robert Davis" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Robert Davis</h3>
                  <p className="text-blue-600 font-semibold text-sm">Chief Financial Officer</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Robert Davis brings 20+ years of distinguished financial leadership in high-growth technology and AI companies. Former CFO at DataRobot and Snowflake, he has guided companies through $2B+ funding rounds and IPO processes. Robert holds an MBA from Wharton School and is a CPA with deep expertise in SaaS metrics and strategic financial planning. His proven track record in scaling finance operations from startup to enterprise makes him instrumental in driving sustainable growth.
                </p>
              </CardContent>
            </Card>

            {/* Dr. James Mitchell */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="/james-mitchell-new-unique.jpg" 
                    alt="Dr. James Mitchell" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Dr. James Mitchell</h3>
                  <p className="text-blue-600 font-semibold text-sm">Chief Technology Officer</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Dr. James Mitchell brings 15+ years of distinguished experience building enterprise-scale AI and machine learning systems. Former Google Cloud Principal AI Architect and Senior Director at OpenAI, he has architected AI solutions serving millions of users globally. Dr. Mitchell holds a Ph.D. in Computer Science from Stanford University and has published 40+ peer-reviewed papers in top-tier AI conferences. His technical leadership in developing breakthrough AI technologies makes him one of Silicon Valley's most respected AI technologists.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Emily Thompson */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" 
                    alt="Emily Thompson" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Emily Thompson</h3>
                  <p className="text-blue-600 font-semibold text-sm">Chief Marketing Officer</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Emily Thompson brings 18+ years of exceptional experience building and scaling marketing organizations for high-growth B2B technology companies. Former VP of Marketing at HubSpot, she led the team that generated over $1B in pipeline and is recognized as one of the top 50 marketing executives in SaaS. Emily holds an MBA from Kellogg School of Management with proven expertise in scaling companies from $10M to $500M+ ARR. Her strategic marketing leadership has been featured in Harvard Business Review and Forbes.
                </p>
              </CardContent>
            </Card>

            {/* David Wilson */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="/david-wilson-unique.jpg" 
                    alt="David Wilson" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">David Wilson</h3>
                  <p className="text-blue-600 font-semibold text-sm">Chief Operating Officer</p>
                </div>
                <p className="text-gray-600 text-sm">
                  David Wilson brings 22+ years of distinguished operational excellence in scaling technology companies from startup to enterprise. Former VP of Operations at Stripe, he led global expansion across 40+ countries and consistently delivered world-class operational efficiency. David holds an MBA from Stanford Graduate School of Business and is certified in Six Sigma Black Belt methodologies. His proven track record in scaling operations to support billion-dollar revenue growth makes him instrumental in achieving industry-leading performance metrics.
                </p>
              </CardContent>
            </Card>

            {/* Rachel Anderson */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face" 
                    alt="Rachel Anderson" 
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Rachel Anderson</h3>
                  <p className="text-blue-600 font-semibold text-sm">VP of Operations & HR</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Rachel Anderson brings 16+ years of exceptional experience building high-performance teams and operational systems. Former Director of People Operations at Slack, she scaled the organization from 500 to 5,000+ employees with industry-leading satisfaction and retention rates. Rachel holds an MBA from UC Berkeley Haas School of Business and is certified in organizational psychology and change management. Her people-first leadership approach has been recognized by the Society for Human Resource Management as a model for scaling technology companies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Our Journey */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of AI automation since 2020
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2020
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Foundation & Vision</h3>
                  <p className="text-gray-600">
                    Chime was founded with a mission to democratize AI automation for e-commerce businesses. 
                    We recognized that while AI technology was advancing rapidly, most Shopify stores couldn't 
                    access or implement these powerful tools effectively.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2021
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">First AI Breakthrough</h3>
                  <p className="text-gray-600">
                    Launched our first AI-powered cart recovery system, achieving industry-leading 67% recovery rates. 
                    Early clients saw immediate 25-40% revenue increases, validating our approach to intelligent automation.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2022
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Expansion</h3>
                  <p className="text-gray-600">
                    Expanded our AI platform to include email automation, inventory management, and pricing optimization. 
                    Reached 100+ successful implementations with an average 188% revenue growth for clients.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2023
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Recognition</h3>
                  <p className="text-gray-600">
                    Recognized as "AI Innovation Leader" by E-commerce Technology Awards. 
                    Achieved SOC 2 compliance and expanded our team with world-class AI experts from Google, OpenAI, and leading tech companies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2024
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Scale & Excellence</h3>
                  <p className="text-gray-600">
                    Surpassed 500+ successful implementations with guaranteed 15-25% revenue growth. 
                    Launched advanced predictive analytics and achieved 99.9% system uptime with 24/7 AI monitoring.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    2025
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Future of E-commerce</h3>
                  <p className="text-gray-600">
                    Leading the next generation of AI automation with advanced machine learning models, 
                    real-time personalization, and industry-specific solutions. Continuing our mission to make 
                    every Shopify store intelligent, efficient, and profitable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutPage

