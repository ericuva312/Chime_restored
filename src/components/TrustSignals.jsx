import { Shield, Lock, Award, Star, CheckCircle, TrendingUp } from 'lucide-react'

const TrustSignals = () => {
  const securityBadges = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security"
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      title: "SSL Encrypted",
      description: "Bank-level data protection"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
      title: "GDPR Compliant",
      description: "Privacy protection guaranteed"
    }
  ]

  const clientLogos = [
    { name: "TechGear Pro", industry: "Electronics" },
    { name: "Bella Boutique", industry: "Fashion" },
    { name: "Wellness Essentials", industry: "Health" },
    { name: "Beauty Brand", industry: "Cosmetics" },
    { name: "Home & Garden Co", industry: "Retail" },
    { name: "Pet Paradise", industry: "Pet Products" }
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
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "99.9% Success Rate",
      description: "Customer satisfaction guarantee"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Badges */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Enterprise-Grade Security & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-4">
                  {badge.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {badge.title}
                </h4>
                <p className="text-gray-600 text-center">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by Leading Brands
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clientLogos.map((client, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 text-center">
                  {client.name}
                </h4>
                <p className="text-xs text-gray-500 text-center">
                  {client.industry}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Industry Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recognitions.map((recognition, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {recognition.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {recognition.title}
                    </h4>
                    <p className="text-gray-600">
                      {recognition.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSignals

