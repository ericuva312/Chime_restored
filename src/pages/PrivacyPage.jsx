import { Link } from 'react-router-dom'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                To provide our AI automation services, we collect and process the following types of information:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Information</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Company name, contact details, and business registration information</li>
                <li>Shopify store data including products, inventory, and sales history</li>
                <li>Customer data necessary for automation and personalization</li>
                <li>Financial data related to revenue, transactions, and growth metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Website usage data and analytics</li>
                <li>System performance and optimization metrics</li>
                <li>API access logs and integration data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use your information exclusively to provide and improve our AI automation services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Implementing and optimizing AI automation systems</li>
                <li>Providing personalized customer experiences</li>
                <li>Generating performance reports and analytics</li>
                <li>Improving our AI algorithms and service quality</li>
                <li>Providing customer support and technical assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security and Protection</h2>
              <p className="text-gray-600 mb-4">
                We implement industry-leading security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>SOC 2 Type II compliance for data handling and security</li>
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure cloud infrastructure with regular security audits</li>
                <li>Access controls and authentication for all team members</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Third Parties</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, rent, or share your personal or business data with third parties, except:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>With your explicit consent for specific integrations</li>
                <li>With trusted service providers who assist in delivering our services</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your data only as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Active subscription data: Retained during service period</li>
                <li>Historical performance data: Retained for 3 years for analytics</li>
                <li>Financial records: Retained for 7 years for compliance</li>
                <li>Marketing data: Retained until you opt out</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Access: Request a copy of your personal data</li>
                <li>Correction: Request correction of inaccurate data</li>
                <li>Deletion: Request deletion of your personal data</li>
                <li>Portability: Request transfer of your data</li>
                <li>Opt-out: Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to improve your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Performance cookies to optimize our services</li>
                <li>Marketing cookies for relevant advertising (with consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your data may be processed in countries other than your own. We ensure adequate protection through:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Standard contractual clauses approved by regulatory authorities</li>
                <li>Adequacy decisions for data transfer destinations</li>
                <li>Additional safeguards for sensitive data transfers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our service. Continued use constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                For questions about this Privacy Policy or to exercise your rights, contact us at:
              </p>
              <p className="text-gray-600">
                Email: hello@chimehq.co<br />
                Subject: Privacy Policy Inquiry<br />
                Response time: Within 48 hours
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
                to="/terms" 
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors text-center border-2 border-blue-600 hover:border-blue-700"
              >
                View Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage

