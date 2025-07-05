import { Link } from 'react-router-dom'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Chime AI automation services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-600 mb-4">
                Chime provides AI-powered automation services for Shopify stores, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Revenue optimization and growth automation</li>
                <li>Cart recovery and customer retention systems</li>
                <li>Inventory management and pricing optimization</li>
                <li>Customer segmentation and personalization</li>
                <li>Analytics and performance reporting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Revenue Growth Guarantee</h2>
              <p className="text-gray-600 mb-4">
                Chime guarantees a minimum 15% revenue growth within 90 days of full implementation. If this guarantee is not met, you are eligible for a full refund of your subscription fees paid during the guarantee period, subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Full implementation of all recommended automation systems</li>
                <li>Minimum 90-day active subscription period</li>
                <li>Compliance with all setup and optimization requirements</li>
                <li>Provision of accurate baseline revenue data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription and Payment</h2>
              <p className="text-gray-600 mb-4">
                Our services are provided on a subscription basis. Payment is due monthly in advance. Failure to pay may result in suspension or termination of services. All fees are non-refundable except as specifically provided in our guarantee terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Access and Privacy</h2>
              <p className="text-gray-600 mb-4">
                To provide our services, we require access to your Shopify store data, including customer information, sales data, and inventory details. We are committed to protecting your data and will only use it to provide and improve our services. See our Privacy Policy for detailed information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All AI algorithms, software, and proprietary systems used in our service remain the intellectual property of Chime. You retain ownership of your business data and customer information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Chime's liability is limited to the amount paid for services during the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-600 mb-4">
                Either party may terminate this agreement with 30 days written notice. Upon termination, access to our services will cease, but you retain ownership of all your business data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: hello@chimehq.co<br />
                Response time: Within 24 hours
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 ">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center border-2 border-blue-600 hover:border-blue-700"
              >
                Get Started Today
              </Link>
              <Link 
                to="/privacy" 
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors text-center border-2 border-blue-600 hover:border-blue-700"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage

