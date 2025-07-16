import { useEffect, useState } from 'react'
import { CheckCircle, Clock, Shield, Users, TrendingUp, Zap } from 'lucide-react'

const ContactPage = () => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false)

  useEffect(() => {
    // Create a global Calendly function if it doesn't exist
    if (!window.Calendly) {
      window.Calendly = {}
    }

    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      setIsCalendlyLoaded(true)
      console.log('Calendly script loaded successfully')
      
      // Track Calendly widget load in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'calendly_widget_loaded', {
          event_category: 'engagement',
          event_label: 'Calendly Widget Loaded'
        });
      }
      
      // Force Calendly to initialize
      if (window.Calendly && window.Calendly.initInlineWidget) {
        try {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/eric-chimehq/30min?hide_gdpr_banner=1&text_color=374151&primary_color=2563eb',
            parentElement: document.querySelector('.calendly-inline-container'),
            prefill: {},
            utm: {}
          })
          console.log('Calendly widget initialized')
        } catch (error) {
          console.error('Error initializing Calendly widget:', error)
        }
      }
    }
    
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  // Direct embed approach using iframe
  const calendlyEmbedCode = `
    <iframe 
      src="https://calendly.com/eric-chimehq/30min?hide_gdpr_banner=1&text_color=374151&primary_color=2563eb" 
      width="100%" 
      height="700px" 
      frameborder="0"
      title="Select a time for your consultation"
    ></iframe>
  `

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Schedule Your Free <span className="text-blue-400">Chime Consultation</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get a personalized AI automation strategy for your Shopify store. We'll analyze your business and show you exactly how to achieve 15-25% revenue growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              30-minute consultation
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              Completely free
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-purple-400 mr-2" />
              Enterprise-grade security
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-blue-400 mr-2" />
              99.9% uptime guarantee
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              500+ successful implementations
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calendly Widget */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Preferred Time</h2>
              
              {/* Direct iframe embed approach */}
              <div 
                className="calendly-inline-container"
                style={{
                  minWidth: '320px',
                  height: '700px',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
                dangerouslySetInnerHTML={{ __html: calendlyEmbedCode }}
              ></div>
            </div>

            {/* Information Panel */}
            <div className="space-y-8">
              {/* What to Expect */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What You'll Get in This Call</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <TrendingUp className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Revenue Growth Analysis</span>
                      <p className="text-gray-600 text-sm">Detailed assessment of your current performance and growth potential</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Shield className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Custom AI Strategy</span>
                      <p className="text-gray-600 text-sm">Personalized automation roadmap tailored to your specific business</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Implementation Timeline</span>
                      <p className="text-gray-600 text-sm">Clear 90-day roadmap with milestones and expected results</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Users className="w-3 h-3 text-orange-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Q&A Session</span>
                      <p className="text-gray-600 text-sm">Direct access to ask questions about our services and guarantee</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Trust Signals */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Shopify Stores Choose Chime</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Successful Implementations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">188%</div>
                    <div className="text-sm text-gray-600">Average Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">99.2%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">90</div>
                    <div className="text-sm text-gray-600">Day Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-600 mr-1" />
                    SOC 2 Certified
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                    Money-Back Guarantee
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
                <blockquote className="text-gray-700 italic mb-4">
                  "Chime's AI automation recovered 67% of our abandoned carts and automated our entire email marketing. Implementation took just 3 weeks and we saw results in 30 days."
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format" 
                    alt="Marcus Chen"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Marcus Chen</div>
                    <div className="text-sm text-gray-600">TechGear Pro • +134% Revenue Growth</div>
                  </div>
                </div>
              </div>

              {/* Contact Alternative */}
              <div className="bg-gray-100 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Prefer Email?</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Send us a message and we'll respond within 2 hours during business hours.
                </p>
                <a
                  href="mailto:hello@chimehq.co?subject=Free Consultation Request&body=Hi, I'd like to schedule a free consultation for my Shopify store."
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  hello@chimehq.co
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Guarantee Your Growth?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Join hundreds of successful Shopify stores already growing with Chime.
          </p>
          <div className="text-center text-blue-200 text-sm">
            🔒 Enterprise-grade security • 99.9% uptime guarantee • 500+ successful implementations
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage

