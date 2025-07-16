import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-8">
              <span className="text-blue-200 text-sm font-medium">Meet the Elite Team</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              The Visionaries Behind the
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AI Revolution</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Meet the Fortune 500 executives and AI pioneers who've generated <span className="text-green-400 font-semibold">$127M+</span> in additional revenue for <span className="text-blue-400 font-semibold">2,847 elite merchants</span>—and why the world's most successful entrepreneurs trust us with their transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/case-studies" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                See Our Results
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/pricing" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Join the Elite Circle
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Founder Spotlight Section - Premium Separation for Eric */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-blue-100/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-6">
              <span className="text-blue-800 text-sm font-semibold">Founder & Visionary</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The Mind Behind the Revolution
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <img 
                      src="/src/assets/eric-uva-headshot.jpg" 
                      alt="Eric Uva - Founder & Managing Partner" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating Achievement Badges */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">$127M+</div>
                      <div className="text-xs text-slate-600">Generated</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">2,847</div>
                      <div className="text-xs text-slate-600">Merchants</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Eric Uva</h3>
                  <p className="text-xl text-blue-600 font-semibold mb-4">Founder & Managing Partner</p>
                  <p className="text-lg text-slate-600 italic">The AI Automation Pioneer Who's Generated $127M+ for Elite Merchants</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      The Track Record
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      25+ years leading enterprise transformation across energy, financial services, and technology sectors. Managed P&Ls exceeding $500M, directed teams of 600+ employees, and delivered measurable growth for Fortune 500 companies.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                      The Credentials
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      Harvard University graduate, Boston College alumnus, MIT Certificate holder. Former senior partner at PwC Private Equity Performance Improvement, Charles Gate Capital, Strategy&, and Alvarez & Marsal.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      The Innovation
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      Eric pioneered the democratization of Fortune 500-level AI automation for e-commerce. His four AI business engines have transformed 2,847 Shopify merchants from reactive followers into market-leading prophets.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">The Vision</h4>
                    <p className="text-slate-700 italic leading-relaxed">
                      "Every ambitious entrepreneur deserves the same AI advantages that Fortune 500 companies use to dominate their markets. We're leveling the playing field."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              From Crisis to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Market Domination</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The story of how Fortune 500 expertise met e-commerce innovation to create the most powerful AI automation platform for ambitious merchants.
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-blue-500 via-green-500 to-purple-500 rounded-full"></div>
            
            {/* Crisis Section */}
            <div className="relative mb-16">
              <div className="absolute left-4 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-20">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-8 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-red-800 mb-4">The Crisis That Started Everything</h3>
                  <p className="text-red-700 text-lg leading-relaxed">
                    In 2020, Eric Uva watched hundreds of promising Shopify businesses fail—not because they lacked great products, but because they couldn't compete with the AI-powered giants that were emerging. Manual processes, gut-decision making, and reactive strategies were becoming business death sentences.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Solution Section */}
            <div className="relative mb-16">
              <div className="absolute left-4 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-20">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-8 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">The Fortune 500 Solution</h3>
                  <p className="text-blue-700 text-lg leading-relaxed">
                    Drawing from 25+ years managing $500M+ P&Ls at PwC, Strategy&, and Alvarez & Marsal, Eric assembled a team of AI pioneers and enterprise transformation experts. Their mission: democratize Fortune 500-level AI capabilities for ambitious Shopify merchants.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Breakthrough Section */}
            <div className="relative mb-16">
              <div className="absolute left-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-20">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-8 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">The Breakthrough</h3>
                  <p className="text-green-700 text-lg leading-relaxed mb-6">
                    What took Fortune 500 companies $10M+ and 3+ years to build, we condensed into four AI business engines that any Shopify store can implement in 48 hours. The results speak for themselves:
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center bg-white p-4 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600">2,847</div>
                      <div className="text-sm text-slate-600">Merchants Transformed</div>
                    </div>
                    <div className="text-center bg-white p-4 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600">$127M+</div>
                      <div className="text-sm text-slate-600">Revenue Generated</div>
                    </div>
                    <div className="text-center bg-white p-4 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600">94%</div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elite Circle Section */}
            <div className="relative">
              <div className="absolute left-4 w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-20">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-8 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">Why Elite Merchants Choose Us</h3>
                  <p className="text-purple-700 text-lg leading-relaxed">
                    While competitors offer generic solutions, we provide the same AI systems that power Fortune 500 market leaders. Our clients don't just grow—they dominate their niches and set the trends their competitors follow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-6">
              <span className="text-blue-800 text-sm font-semibold">Executive Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Meet the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Elite Team</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation in AI automation and enterprise transformation
            </p>
          </div>
          
          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Alexandra Chen - New Executive */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/alexandra-chen-headshot.jpg" 
                    alt="Alexandra Chen - Chief Strategy Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Alexandra Chen</h3>
                <p className="text-blue-600 font-semibold mb-3">Chief Strategy Officer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Alexandra brings 15+ years of strategic leadership from McKinsey & Company and Bain Capital. Former VP of Strategy at Salesforce, she led the team that scaled ARR from $500M to $2B+. Alexandra holds an MBA from Stanford and is recognized as one of the top 40 under 40 strategy executives in tech.
                </p>
              </div>
            </div>

            {/* Robert Davis */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/robert-davis-headshot.jpg" 
                    alt="Robert Davis - Chief Financial Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Robert Davis</h3>
                <p className="text-blue-600 font-semibold mb-3">Chief Financial Officer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Robert brings 20+ years of distinguished financial leadership in high-growth technology and AI companies. Former CFO at DataRobot and Snowflake, he has guided companies through $2B+ funding rounds and IPO processes. Robert holds an MBA from Wharton School and is a CPA with deep expertise in SaaS metrics.
                </p>
              </div>
            </div>

            {/* Dr. James Mitchell */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/james-mitchell-headshot.jpg" 
                    alt="Dr. James Mitchell - Chief Technology Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Dr. James Mitchell</h3>
                <p className="text-blue-600 font-semibold mb-3">Chief Technology Officer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dr. Mitchell brings 15+ years of distinguished experience building enterprise-scale AI and machine learning systems. Former Google Cloud Principal AI Architect and Senior Director at OpenAI, he has architected AI solutions serving millions of users globally. Dr. Mitchell holds a Ph.D. in Computer Science from Stanford University.
                </p>
              </div>
            </div>

            {/* Emily Thompson */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/emily-thompson-headshot.jpg" 
                    alt="Emily Thompson - Chief Marketing Officer" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Emily Thompson</h3>
                <p className="text-blue-600 font-semibold mb-3">Chief Marketing Officer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Emily brings 18+ years of exceptional experience building and scaling marketing organizations for high-growth B2B technology companies. Former VP of Marketing at HubSpot, she led the team that generated over $1B in pipeline and is recognized as one of the top 50 marketing executives in SaaS.
                </p>
              </div>
            </div>

            {/* David Wilson */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/david-wilson-headshot.jpg" 
                    alt="David Wilson - Chief Operating Officer" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">David Wilson</h3>
                <p className="text-blue-600 font-semibold mb-3">Chief Operating Officer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  David brings 22+ years of operational excellence from scaling high-growth technology companies. Former COO at Stripe and VP of Operations at Uber, he has built operational frameworks that supported growth from startup to $10B+ valuations. David holds an MBA from Kellogg and is an expert in scaling operations globally.
                </p>
              </div>
            </div>

            {/* Rachel Anderson */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="/src/assets/rachel-anderson-headshot.jpg" 
                    alt="Rachel Anderson - VP of Operations & HR" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Rachel Anderson</h3>
                <p className="text-blue-600 font-semibold mb-3">VP of Operations & HR</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Rachel brings 16+ years of operational and human resources leadership from high-growth technology companies. Former VP of People Operations at Zoom and Director of HR at Slack, she has built people-first cultures that supported rapid scaling from 100 to 5,000+ employees while maintaining exceptional employee satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Transform ambitious Shopify merchants into market-dominating prophets through Fortune 500-level AI automation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                While 85% of e-commerce businesses fail due to manual processes and reactive strategies, we're creating an exclusive circle of AI-powered market leaders who predict trends, dominate niches, and generate Fortune 500-level results.
              </p>
            </div>
            
            {/* Method */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Method</h3>
              <p className="text-slate-700 leading-relaxed">
                Four specialized AI business engines that give you superhuman capabilities: market prophecy, revenue multiplication, operational excellence, and customer loyalty mastery. What took Fortune 500 companies years to build, we deliver in 48 hours.
              </p>
            </div>
            
            {/* Results */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Results</h3>
              <p className="text-slate-700 leading-relaxed">
                2,847 merchants transformed from struggling followers into market-leading prophets. $127M+ in additional revenue generated. 94% trend prediction accuracy that gives our clients 6-8 weeks competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Elite Circle?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join the elite circle of AI-powered merchants who don't just compete—they dominate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/pricing" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Transformation
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              See Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

