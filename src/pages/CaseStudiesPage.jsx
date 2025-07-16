import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      industry: "Fashion & Apparel",
      company: "Bella Fashion Co.",
      challenge: "Struggling with inventory management and seasonal demand fluctuations",
      solution: "AI-powered demand forecasting and personalized product recommendations",
      results: {
        revenue: "+156%",
        conversion: "+89%",
        inventory: "-34%",
        timeframe: "6 months"
      },
      details: "Bella Fashion Co. was experiencing significant inventory challenges with overstock in some categories and stockouts in others. Our AI system analyzed historical sales data, seasonal trends, and customer behavior patterns to optimize inventory levels and implement dynamic pricing strategies.",
      testimonial: "Chime transformed our fashion store completely. We went from struggling with inventory to having our best quarter ever.",
      author: "Sarah Chen, Founder"
    },
    {
      industry: "Electronics & Technology",
      company: "TechGear Pro",
      challenge: "Low conversion rates and high cart abandonment",
      solution: "Smart product bundling and personalized customer journeys",
      results: {
        revenue: "+203%",
        conversion: "+127%",
        cart_abandonment: "-45%",
        timeframe: "4 months"
      },
      details: "TechGear Pro struggled with customers browsing but not purchasing. Our AI implemented intelligent product bundling, personalized recommendations, and automated email sequences that guided customers through the purchase process.",
      testimonial: "The AI recommendations are incredibly accurate. Our customers love the personalized experience and our sales have skyrocketed.",
      author: "Mike Rodriguez, CEO"
    },
    {
      industry: "Health & Wellness",
      company: "Wellness Essentials",
      challenge: "Difficulty in customer retention and repeat purchases",
      solution: "Subscription optimization and health journey personalization",
      results: {
        revenue: "+178%",
        retention: "+92%",
        ltv: "+145%",
        timeframe: "8 months"
      },
      details: "Wellness Essentials needed to improve customer lifetime value and create lasting relationships. Our AI developed personalized health journeys, optimized subscription timing, and created targeted wellness content that kept customers engaged.",
      testimonial: "Finally, an automation platform that actually delivers on its promises. ROI was immediate and continues to grow.",
      author: "Lisa Thompson, Marketing Director"
    },
    {
      industry: "Beauty & Cosmetics",
      company: "Glow Beauty Studio",
      challenge: "Seasonal sales volatility and low customer engagement",
      solution: "AI-driven beauty consultations and seasonal campaign optimization",
      results: {
        revenue: "+234%",
        engagement: "+156%",
        seasonal_stability: "+78%",
        timeframe: "5 months"
      },
      details: "Glow Beauty Studio faced significant seasonal fluctuations and needed to improve year-round engagement. Our AI created virtual beauty consultations, personalized skincare routines, and optimized seasonal campaigns for consistent growth.",
      testimonial: "The virtual beauty consultant feature has been a game-changer. Customers love the personalized recommendations and our sales are more consistent than ever.",
      author: "Amanda Foster, Owner"
    },
    {
      industry: "Home & Garden",
      company: "Garden Paradise",
      challenge: "Complex product catalog and seasonal buying patterns",
      solution: "Intelligent product discovery and seasonal automation",
      results: {
        revenue: "+167%",
        product_discovery: "+89%",
        seasonal_sales: "+123%",
        timeframe: "7 months"
      },
      details: "Garden Paradise had thousands of products and customers struggled to find what they needed. Our AI implemented smart search, seasonal product highlighting, and automated gardening guides that matched customer locations and preferences.",
      testimonial: "Our customers can now easily find exactly what they need for their gardens. The seasonal automation has made our marketing effortless.",
      author: "Robert Kim, Operations Manager"
    },
    {
      industry: "Specialty Food & Beverage",
      company: "Artisan Delights",
      challenge: "Limited market reach and complex shipping requirements",
      solution: "Geographic expansion strategy and logistics optimization",
      results: {
        revenue: "+189%",
        market_reach: "+245%",
        shipping_efficiency: "+67%",
        timeframe: "6 months"
      },
      details: "Artisan Delights wanted to expand beyond their local market but faced complex shipping and preservation challenges. Our AI optimized shipping routes, predicted demand by region, and automated inventory distribution.",
      testimonial: "We've expanded to 15 new states with Chime's help. The logistics automation has made national shipping seamless.",
      author: "Maria Gonzalez, Founder"
    },
    {
      industry: "Pet Products",
      company: "Happy Paws Supply",
      challenge: "Diverse customer needs and subscription management",
      solution: "Pet-specific personalization and smart subscription optimization",
      results: {
        revenue: "+198%",
        subscription_growth: "+156%",
        customer_satisfaction: "+89%",
        timeframe: "5 months"
      },
      details: "Happy Paws Supply needed to cater to diverse pet needs and optimize their subscription service. Our AI created pet profiles, personalized product recommendations based on pet age and breed, and optimized delivery schedules.",
      testimonial: "The pet personalization features are amazing. Customers love getting products perfectly matched to their pets' needs.",
      author: "Jennifer Walsh, Customer Success Manager"
    }
  ]

  const overallStats = [
    { metric: "Average Revenue Growth", value: "188%", description: "Across all implementations" },
    { metric: "Customer Satisfaction", value: "97%", description: "Net Promoter Score" },
    { metric: "Implementation Success", value: "99.2%", description: "Projects completed successfully" },
    { metric: "ROI Achievement", value: "100%", description: "Clients meeting growth targets" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Real Results from
              <br />
              <span className="text-blue-400">Real Businesses</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover how Chime has helped businesses across 7 industries achieve 
              guaranteed revenue growth through AI-powered automation.
            </p>
            
            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                Write your success story
              </Link>
              <Link 
                to="/roi-calculator" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                See Your Revenue Potential
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.metric}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 case-studies-subheading">
              Success Stories by Industry
            </h2>
            <p className="text-xl text-gray-600 case-studies-subheading">
              See how businesses like yours have transformed with Chime
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                      <div className="text-sm font-semibold text-blue-600 mb-2">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {study.company}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                          <p className="text-gray-600 text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                          <p className="text-gray-600 text-sm">{study.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Results in {study.results.timeframe}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(study.results).map(([key, value]) => {
                          if (key === 'timeframe') return null
                          return (
                            <div key={key} className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{value}</div>
                              <div className="text-xs text-gray-600 capitalize">
                                {key.replace('_', ' ')}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Details & Testimonial */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Implementation Details</h4>
                      <p className="text-gray-600 text-sm mb-6">{study.details}</p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <blockquote className="text-gray-700 italic mb-3">
                          "{study.testimonial}"
                        </blockquote>
                        <div className="text-sm font-semibold text-gray-900">
                          {study.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Success Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              Our AI adapts to your industry's unique challenges and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Fashion & Apparel", growth: "156%", focus: "Inventory & Trends" },
              { name: "Electronics", growth: "203%", focus: "Product Bundling" },
              { name: "Health & Wellness", growth: "178%", focus: "Customer Retention" },
              { name: "Beauty & Cosmetics", growth: "234%", focus: "Personalization" },
              { name: "Home & Garden", growth: "167%", focus: "Seasonal Optimization" },
              { name: "Specialty Food", growth: "189%", focus: "Geographic Expansion" },
              { name: "Pet Products", growth: "198%", focus: "Subscription Management" }
            ].map((industry, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {industry.name}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    +{industry.growth}
                  </div>
                  <p className="text-sm text-gray-600">
                    Focus: {industry.focus}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven Implementation Process
            </h2>
            <p className="text-xl text-gray-600">
              How we deliver guaranteed results in 90 days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Analysis & Strategy",
                description: "Deep dive into your business data, customer behavior, and growth opportunities",
                duration: "Week 1-2"
              },
              {
                step: "2",
                title: "AI Implementation",
                description: "Deploy custom AI models tailored to your industry and business needs",
                duration: "Week 3-6"
              },
              {
                step: "3",
                title: "Optimization & Testing",
                description: "Fine-tune algorithms and test performance across all customer touchpoints",
                duration: "Week 7-10"
              },
              {
                step: "4",
                title: "Scale & Monitor",
                description: "Scale successful strategies and continuously monitor for improvements",
                duration: "Week 11+"
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {phase.title}
                </h3>
                <p className="text-gray-600 mb-2">{phase.description}</p>
                <div className="text-sm font-semibold text-blue-600">{phase.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join These Success Stories?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            See how Chime can deliver similar results for your business. 
            Start with a free analysis of your growth potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/contact">
                Write your success story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/roi-calculator">See Your Revenue Potential</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudiesPage

