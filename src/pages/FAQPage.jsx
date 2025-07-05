import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react'

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How quickly can I get started with Chime?",
          answer: "We can have your AI automation systems up and running within 48 hours of signing up. Our streamlined onboarding process includes initial setup, data integration, and the first automation workflows. You'll start seeing results within the first 30 days."
        },
        {
          question: "What do I need to provide to get started?",
          answer: "You'll need access to your Shopify store, basic business information, and historical sales data (if available). Our team will guide you through the entire setup process and handle all technical integrations."
        },
        {
          question: "Do I need technical knowledge to use Chime?",
          answer: "No technical knowledge is required. Our AI automation systems work in the background, and our team handles all setup and optimization. You'll receive easy-to-understand reports and recommendations through our user-friendly dashboard."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      faqs: [
        {
          question: "What's included in each pricing plan?",
          answer: "Each plan includes different levels of AI automation, support, and guaranteed growth. Growth plan includes basic automation and 15% growth guarantee. Professional adds advanced features and 20% guarantee. Enterprise provides complete transformation with 25% guarantee and dedicated support."
        },
        {
          question: "Is there a setup fee?",
          answer: "No, there are no setup fees for any of our plans. The monthly subscription covers everything including setup, implementation, ongoing optimization, and support."
        },
        {
          question: "Can I change plans later?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we'll help ensure a smooth transition of your automation systems."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards and ACH bank transfers. Payments are processed securely through our encrypted payment system, and you'll receive detailed invoices for your records."
        }
      ]
    },
    {
      title: "Revenue Growth Guarantee",
      faqs: [
        {
          question: "How does the revenue growth guarantee work?",
          answer: "We guarantee minimum revenue growth within 90 days of full implementation. If we don't achieve the promised growth percentage for your plan, you're eligible for a full refund of subscription fees paid during the guarantee period."
        },
        {
          question: "What if you don't deliver the promised growth?",
          answer: "If we don't meet the guaranteed growth targets, you don't pay. We'll provide a full refund of your subscription fees for the guarantee period. This demonstrates our confidence in our AI automation systems."
        },
        {
          question: "How do you measure revenue growth?",
          answer: "We measure growth based on your baseline revenue before implementation compared to revenue after our systems are fully deployed. We use your Shopify analytics and our tracking systems to provide transparent, accurate measurements."
        },
        {
          question: "Are there any conditions for the guarantee?",
          answer: "The guarantee requires full implementation of recommended automation systems, minimum 90-day active subscription, compliance with setup requirements, and provision of accurate baseline data. We work with you to ensure all conditions are met."
        }
      ]
    },
    {
      title: "AI Automation Features",
      faqs: [
        {
          question: "What types of automation do you provide?",
          answer: "Our AI automation includes cart recovery, email marketing, inventory management, pricing optimization, customer segmentation, personalized recommendations, and predictive analytics. Each system is customized for your specific business needs."
        },
        {
          question: "How does the cart recovery system work?",
          answer: "Our AI analyzes customer behavior patterns to identify optimal timing and messaging for cart recovery emails. It personalizes content based on customer preferences and purchase history, resulting in significantly higher recovery rates than standard systems."
        },
        {
          question: "Can you integrate with my existing tools?",
          answer: "Yes, our AI systems integrate with most popular e-commerce tools including email platforms, CRM systems, analytics tools, and marketing automation platforms. We'll assess your current stack and ensure seamless integration."
        },
        {
          question: "How does pricing optimization work?",
          answer: "Our AI continuously analyzes market conditions, competitor pricing, demand patterns, and customer behavior to recommend optimal pricing strategies. This helps maximize revenue while maintaining competitiveness."
        }
      ]
    },
    {
      title: "Data & Security",
      faqs: [
        {
          question: "How do you protect my business data?",
          answer: "We use enterprise-grade security including SOC 2 Type II compliance, end-to-end encryption, secure cloud infrastructure, and strict access controls. Your data is protected with the same standards used by major financial institutions."
        },
        {
          question: "What data do you need access to?",
          answer: "We need access to your Shopify store data including sales history, customer information, product catalog, and inventory levels. This data is used exclusively to provide and improve our AI automation services."
        },
        {
          question: "Do you share my data with third parties?",
          answer: "No, we never sell or share your business data with third parties. Your data is used only to provide our services and improve our AI algorithms. We maintain strict confidentiality and data protection standards."
        },
        {
          question: "Can I export my data if I cancel?",
          answer: "Yes, you retain full ownership of your business data. Upon cancellation, we'll provide you with exports of your data and ensure smooth transition. We'll also delete your data from our systems as requested."
        }
      ]
    },
    {
      title: "Support & Implementation",
      faqs: [
        {
          question: "What kind of support do you provide?",
          answer: "Support varies by plan: Growth includes email support, Professional adds weekly strategy calls and priority support, Enterprise provides 24/7 support and a dedicated AI strategist. All plans include comprehensive onboarding and training."
        },
        {
          question: "How long does implementation take?",
          answer: "Initial setup takes 48 hours, with full implementation completed within 2 weeks. You'll start seeing results within 30 days as our AI systems learn your business patterns and optimize performance."
        },
        {
          question: "Do you provide training for my team?",
          answer: "Yes, we provide comprehensive training for your team including how to use the dashboard, interpret reports, and optimize results. Training is included in all plans and tailored to your team's needs."
        },
        {
          question: "What happens if I need help after setup?",
          answer: "Our support team is available to help with any questions or issues. We also provide ongoing optimization recommendations and regular performance reviews to ensure you're getting maximum value from our systems."
        }
      ]
    },
    {
      title: "Implementation Process",
      faqs: [
        {
          question: "What if my store is complex or has custom integrations?",
          answer: "Our AI platform is designed to work with any Shopify configuration. We handle custom apps, themes, and integrations seamlessly. Our technical team has experience with thousands of unique store setups."
        },
        {
          question: "Will this disrupt my current operations?",
          answer: "Not at all. Implementation happens in the background without affecting your live store. Customers continue shopping normally while we optimize behind the scenes."
        },
        {
          question: "How quickly will I see results from implementation?",
          answer: "Most clients see initial improvements within 7-14 days, with full results typically achieved by day 30. Our AI learns and improves continuously from day one."
        },
        {
          question: "What happens if I'm not satisfied with the implementation?",
          answer: "We offer a 90-day money-back guarantee. If you don't achieve at least 15% revenue growth, we'll refund your investment completely."
        }
      ]
    },
    {
      title: "Results & Performance",
      faqs: [
        {
          question: "How quickly will I see results?",
          answer: "Most clients see initial improvements within 30 days, with significant results by 60-90 days. Our AI systems continuously learn and optimize, so performance improves over time as they gather more data about your business."
        },
        {
          question: "What kind of results can I expect?",
          answer: "Typical results include 15-25% revenue growth, 40-60% improvement in cart recovery rates, 20-30% increase in customer lifetime value, and 20+ hours saved per week on manual tasks. Results vary based on your starting point and industry."
        },
        {
          question: "How do you track and report results?",
          answer: "We provide detailed analytics dashboards showing key metrics, growth trends, and ROI calculations. You'll receive regular reports highlighting performance improvements and recommendations for further optimization."
        },
        {
          question: "What if my results plateau?",
          answer: "Our AI systems continuously adapt and optimize to prevent plateaus. If growth slows, we analyze the data, identify new opportunities, and implement additional automation strategies to maintain momentum."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Everything you need to know about Chime's AI automation services. Can't find what you're looking for? Contact our team.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center border-2 border-blue-600 hover:border-blue-700"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask a Question
          </Link>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 ">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const itemKey = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems[itemKey]
                  
                  return (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-sm border">
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our team is here to help. Get personalized answers and see how Chime can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white hover:border-gray-200"
            >
              Book Free Consultation
            </Link>
            <Link
              to="/roi-calculator"
              className="bg-transparent hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white hover:border-blue-300"
            >
              Calculate Your ROI
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore More
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/case-studies"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Case Studies
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                See real results from businesses like yours
              </p>
              <ArrowRight className="w-5 h-5 text-blue-600 mx-auto" />
            </Link>

            <Link
              to="/pricing"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Pricing Plans
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Choose the perfect plan for your business
              </p>
              <ArrowRight className="w-5 h-5 text-blue-600 mx-auto" />
            </Link>

            <Link
              to="/about"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                About Chime
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn about our team and mission
              </p>
              <ArrowRight className="w-5 h-5 text-blue-600 mx-auto" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQPage

