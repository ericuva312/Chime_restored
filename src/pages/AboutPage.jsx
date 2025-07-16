import { Link } from 'react-router-dom';
import { Award, Users, TrendingUp, Target, CheckCircle, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full text-sm mb-4">
              Leadership & Innovation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Transforming Business Through 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> AI Innovation</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              25+ years of enterprise transformation expertise. $500M+ P&L management. 
              600+ team leadership. One mission: Your business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                25+
              </div>
              <div className="text-slate-600 font-medium">Years of Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
                $500M+
              </div>
              <div className="text-slate-600 font-medium">P&L Management</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                600+
              </div>
              <div className="text-slate-600 font-medium">Team Members Led</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
                100%
              </div>
              <div className="text-slate-600 font-medium">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Profile Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Eric Uva
                </h2>
                <p className="text-xl text-blue-600 font-semibold mb-6">
                  Founder & Managing Partner
                </p>
              </div>

              <div className="prose prose-lg text-slate-600 space-y-4">
                <p>
                  Eric Uva is the Founder and Managing Partner of Chime, with over 25 years of experience 
                  leading enterprise transformation and AI automation in e-commerce and related industries.
                </p>
                
                <p>
                  He has managed P&Ls of $500M+, directed teams of more than 600 employees, and overseen 
                  large-scale projects across energy, financial services, industrial, software, and technology sectors.
                </p>

                <p>
                  Eric's capabilities include scaling operations from the ground up, streamlining business 
                  processes, improving profit margins, and implementing technology-driven automation.
                </p>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Education & Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">Boston College</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">Harvard University</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">MIT Certificate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">EU</span>
                  </div>
                  <p className="text-slate-600 font-medium">Professional Portrait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Leadership Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Senior leadership roles at world-class organizations, delivering measurable business growth and operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                PwC Private Equity Performance Improvement
              </h3>
              <p className="text-blue-600 font-medium mb-3">Senior Leadership Role</p>
              <p className="text-slate-600">
                Led enterprise transformation initiatives for private equity portfolio companies
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Charles Gate Capital
              </h3>
              <p className="text-blue-600 font-medium mb-3">Senior Leadership Role</p>
              <p className="text-slate-600">
                Directed large-scale operational improvements and business growth strategies
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Strategy&
              </h3>
              <p className="text-blue-600 font-medium mb-3">Senior Leadership Role</p>
              <p className="text-slate-600">
                Managed complex transformation projects across multiple industry sectors
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Alvarez & Marsal
              </h3>
              <p className="text-blue-600 font-medium mb-3">Senior Leadership Role</p>
              <p className="text-slate-600">
                Delivered measurable business growth and operational improvements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Capabilities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transformation Capabilities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proven expertise in scaling operations, streamlining processes, and implementing technology-driven automation for business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Scaling operations from ground up',
              'Streamlining business processes', 
              'Improving profit margins',
              'Technology-driven automation',
              'Building high-performing teams',
              'Delivering measurable growth',
              'Advanced economic analysis',
              'Proven innovation frameworks',
              'AI-driven transformation'
            ].map((capability, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            At Chime, Eric applies advanced economic analysis and proven innovation frameworks to deliver 
            AI automation solutions for Shopify businesses, helping clients achieve consistent revenue growth 
            and significant time savings. His leadership and expertise position him at the forefront of 
            AI-driven business transformation.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Partner with Our Leadership
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

