import { Shield, Lock, CheckCircle, Star, Award, TrendingUp } from 'lucide-react'

const RedesignedTrustSignals = () => {
  const securityFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-emerald-600" />,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security"
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "SSL Encrypted",
      description: "Bank-level data protection"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "GDPR Compliant",
      description: "Privacy protection guaranteed"
    }
  ]

  const recognitions = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "4.9/5 Customer Rating",
      description: "Based on 500+ reviews"
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Top AI Solution 2024",
      description: "E-commerce Technology Awards"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      title: "99.9% Success Rate",
      description: "Customer satisfaction guarantee"
    }
  ]

  return (
    <>
      {/* Security & Compliance - Integrated into content flow */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your data is protected with the same security standards used by Fortune 500 companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Recognition - Seamlessly integrated */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Industry Recognition & Trust
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recognized by industry leaders and trusted by hundreds of successful businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recognitions.map((recognition, index) => (
              <div key={index} className="group text-center">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      {recognition.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {recognition.title}
                  </h4>
                  <p className="text-gray-600">
                    {recognition.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default RedesignedTrustSignals

