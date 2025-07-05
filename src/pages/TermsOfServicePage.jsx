import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> July 3, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Chime AI website and services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Chime AI provides AI-powered automation services for Shopify stores, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Automated cart recovery systems</li>
                <li>Email marketing automation</li>
                <li>Inventory management optimization</li>
                <li>Pricing strategy automation</li>
                <li>Customer segmentation and personalization</li>
                <li>ROI calculation and business analytics tools</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Revenue Growth Guarantee</h2>
              <p className="text-gray-700 mb-4">
                Chime AI guarantees a 15-25% revenue increase within 90 days of full implementation, 
                subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Client must provide complete access to Shopify store and required integrations</li>
                <li>Client must implement all recommended automation systems</li>
                <li>Baseline revenue must be established during the first 30 days</li>
                <li>Client must maintain active service subscription throughout the guarantee period</li>
                <li>Revenue increase is measured against the established baseline</li>
              </ul>
              <p className="text-gray-700 mb-4">
                If the guaranteed revenue increase is not achieved, clients are eligible for a full refund 
                of service fees paid during the guarantee period, as outlined in our Refund Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and complete information when using our services</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our services for any unlawful or prohibited activities</li>
                <li>Cooperate with our implementation and optimization processes</li>
                <li>Provide timely feedback and respond to service-related communications</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                All content, features, and functionality of our services, including but not limited to 
                text, graphics, logos, software, and algorithms, are owned by Chime AI and are protected 
                by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                You are granted a limited, non-exclusive, non-transferable license to use our services 
                for your business purposes in accordance with these Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is 
                governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700 mb-4">
                By using our services, you consent to the collection, use, and sharing of your information 
                as described in our Privacy Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Service fees are due according to the payment schedule outlined in your service agreement. 
                All fees are non-refundable except as specifically provided in our Refund Policy.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Payment is due within 30 days of invoice date</li>
                <li>Late payments may incur additional fees</li>
                <li>Services may be suspended for non-payment</li>
                <li>All prices are subject to change with 30 days notice</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Level Agreement</h2>
              <p className="text-gray-700 mb-4">Chime AI commits to the following service levels:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Uptime:</strong> 99.9% system availability</li>
                <li><strong>Implementation:</strong> Complete setup within 48 hours</li>
                <li><strong>Support Response:</strong> Initial response within 24 hours</li>
                <li><strong>Performance:</strong> Results visible within 30 days</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Chime AI shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to 
                loss of profits, data, or business interruption.
              </p>
              <p className="text-gray-700 mb-4">
                Our total liability for any claims arising from or related to our services shall not 
                exceed the amount paid by you for the services during the 12 months preceding the claim.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate the service agreement with 30 days written notice. 
                Upon termination:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>All automation systems will be transferred to client control</li>
                <li>Access to Chime AI proprietary tools will be revoked</li>
                <li>Final invoice will be issued for services rendered</li>
                <li>Data export will be provided upon request</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                We offer a 90-day money-back guarantee for our services. If you are not satisfied 
                with the results or if we fail to meet our revenue growth guarantee, you may request 
                a full refund within 90 days of service commencement.
              </p>
              <p className="text-gray-700 mb-4">
                Refund requests must be submitted in writing to hello@chimehq.co with supporting 
                documentation. Refunds will be processed within 30 days of approval.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction where Chime AI is incorporated, without regard to conflict of law principles.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective 
                immediately upon posting on our website. Your continued use of our services after 
                changes are posted constitutes acceptance of the modified Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:hello@chimehq.co" className="text-blue-600 hover:text-blue-700">hello@chimehq.co</a><br />
                  <strong>Website:</strong> <a href="https://chimehq.co" className="text-blue-600 hover:text-blue-700">https://chimehq.co</a><br />
                  <strong>Subject Line:</strong> Terms of Service Inquiry
                </p>
              </div>
            </section>
            
            <div className="border-t pt-8 mt-8">
              <p className="text-sm text-gray-500">
                These Terms of Service are effective as of July 3, 2025, and govern your use of 
                all Chime AI services and website functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage

