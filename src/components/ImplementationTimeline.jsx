import { CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react'

const ImplementationTimeline = () => {
  const timelineSteps = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Day 1: Initial Setup",
      duration: "2-4 hours",
      description: "Connect your Shopify store, analyze current performance, and configure AI systems",
      details: [
        "Shopify integration and data sync",
        "Performance baseline analysis",
        "AI system configuration",
        "Initial optimization setup"
      ]
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Day 2: AI Deployment",
      duration: "4-6 hours",
      description: "Deploy AI automation systems and begin intelligent optimization processes",
      details: [
        "Cart recovery automation launch",
        "Email sequence deployment",
        "Product recommendation engine",
        "Inventory optimization setup"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Days 3-30: Optimization",
      duration: "Continuous",
      description: "AI learns and optimizes your store performance while you see immediate results",
      details: [
        "Real-time performance monitoring",
        "Continuous AI learning and improvement",
        "Weekly performance reports",
        "Ongoing optimization adjustments"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Day 30+: Guaranteed Results",
      duration: "Ongoing",
      description: "Achieve 15-25% revenue growth or get your money back with our guarantee",
      details: [
        "Guaranteed revenue increase",
        "Detailed ROI reporting",
        "Continued optimization",
        "24/7 AI monitoring and support"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            48-Hour Implementation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From setup to results in just 48 hours. Our streamlined process gets you up and running fast.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 hidden lg:block"></div>

          <div className="space-y-12">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`lg:flex lg:items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className="lg:w-1/2 lg:px-8">
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 mr-4">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                          <p className="text-sm text-blue-600 font-medium">
                            {step.duration}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of successful Shopify stores already growing with Chime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your 48-Hour Setup
              </a>
              <a 
                href="/roi-calculator" 
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 transition-colors"
              >
                Calculate Your ROI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImplementationTimeline

