import { Link } from 'react-router-dom';
import { Award, Users, TrendingUp, Target, CheckCircle, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-full text-sm mb-4">
              Elite Leadership
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Transforming Business Through 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Elite AI Innovation</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              25+ years of enterprise transformation expertise. $500M+ P&L management. 
              600+ team leadership. One mission: Your market domination.
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
              <div className="text-slate-600 font-medium">Years of Elite Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
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
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
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
                <h3 className="text-xl font-semibold text-slate-900">Elite Education & Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-700 font-medium">Boston College</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-700 font-medium">Harvard University</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-700 font-medium">MIT Certificate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold text-white">EU</span>
                  </div>
                  <p className="text-slate-600 font-medium">Professional Portrait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Elite Leadership Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Senior leadership roles at world-class organizations, delivering measurable business growth 
              and operational excellence.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                company: "PwC Private Equity Performance Improvement",
                role: "Senior Leadership Role",
                icon: TrendingUp,
                description: "Led enterprise transformation initiatives for private equity portfolio companies"
              },
              {
                company: "Charles Gate Capital",
                role: "Senior Leadership Role", 
                icon: Target,
                description: "Directed large-scale operational improvements and business growth strategies"
              },
              {
                company: "Strategy&",
                role: "Senior Leadership Role",
                icon: Users,
                description: "Managed complex transformation projects across multiple industry sectors"
              },
              {
                company: "Alvarez & Marsal",
                role: "Senior Leadership Role",
                icon: Award,
                description: "Delivered measurable business growth and operational improvements"
              }
            ].map((experience, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-slate-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <experience.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{experience.company}</h3>
                  <p className="text-blue-600 font-medium mb-2">{experience.role}</p>
                  <p className="text-slate-600">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Elite Transformation Capabilities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proven expertise in scaling operations, streamlining processes, and implementing 
              technology-driven automation for market domination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Scaling operations from ground up",
              "Streamlining business processes", 
              "Improving profit margins",
              "Technology-driven automation",
              "Building high-performing teams",
              "Delivering measurable growth",
              "Advanced economic analysis",
              "Proven innovation frameworks",
              "AI-driven transformation"
            ].map((capability, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Elite Mission
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            At Chime, Eric applies advanced economic analysis and proven innovation frameworks 
            to deliver AI automation solutions for Shopify businesses, helping clients achieve 
            consistent revenue growth and significant time savings. His leadership and expertise 
            position him at the forefront of AI-driven business transformation.
          </p>
          
          <Link 
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105"
          >
            Partner with Elite Leadership
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;

