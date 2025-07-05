import UltimateROICalculator from '../components/UltimateROICalculator'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const ROICalculatorPage = () => {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      value: "188%",
      label: "Average Revenue Growth",
      description: "Across all client implementations"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      value: "500+",
      label: "Successful Businesses",
      description: "Growing with Chime automation"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      value: "$50M+",
      label: "Revenue Generated",
      description: "For our clients in 2024"
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      value: "99.2%",
      label: "Success Rate",
      description: "Clients achieving growth targets"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Calculate Your
              <span className="text-blue-600"> Growth Potential</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              See exactly how much revenue Chime can generate for your business. 
              Get a personalized ROI projection based on your industry and business profile.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Calculator */}
          <div className="flex justify-center">
            <UltimateROICalculator />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600">
              Our projections are based on real client data and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Industry Analysis
                </h3>
                <p className="text-gray-600">
                  We analyze your industry's specific growth patterns and apply our 
                  proven multipliers based on 500+ successful implementations.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Business Profile
                </h3>
                <p className="text-gray-600">
                  Your business stage, current challenges, and growth goals are 
                  factored into a personalized growth projection model.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Conservative Estimates
                </h3>
                <p className="text-gray-600">
                  We provide both conservative and optimistic scenarios, with our 
                  15% minimum growth guarantee backing the conservative estimate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Growth Guarantee
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're so confident in our results that we guarantee at least 15% revenue 
            growth within 90 days, or you get your money back. No questions asked.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15%</div>
                <div className="text-sm text-gray-600">Minimum Growth Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">90</div>
                <div className="text-sm text-gray-600">Days to See Results</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Money-Back Promise</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ROICalculatorPage

