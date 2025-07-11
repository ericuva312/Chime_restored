import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Mail, Calendar, ArrowRight, Shield, Star, TrendingUp } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [customerData, setCustomerData] = useState(null);
  
  // Get payment details from URL parameters
  const sessionId = searchParams.get('session_id');
  const planType = searchParams.get('plan') || 'professional';
  
  useEffect(() => {
    // In a real implementation, you would fetch customer data from Stripe session
    // For now, we'll use mock data based on the plan
    const mockCustomerData = {
      name: 'John Smith',
      email: 'john@example.com',
      company: 'Your Company',
      plan: planType,
      amount: planType === 'growth' ? 2997 : planType === 'enterprise' ? 9997 : 4997,
      sessionId: sessionId || 'cs_test_' + Math.random().toString(36).substr(2, 9)
    };
    setCustomerData(mockCustomerData);
  }, [sessionId, planType]);

  const planDetails = {
    growth: {
      name: 'Growth',
      price: '$2,997',
      guarantee: '15%',
      features: ['15% minimum revenue growth guarantee', '48-hour implementation', '90-day money-back guarantee', '24/7 support', 'Dedicated success manager']
    },
    professional: {
      name: 'Professional',
      price: '$4,997',
      guarantee: '20%',
      features: ['20% minimum revenue growth guarantee', '48-hour implementation', '90-day money-back guarantee', '24/7 priority support', 'Dedicated success manager', 'Free monthly optimization']
    },
    enterprise: {
      name: 'Enterprise',
      price: '$9,997',
      guarantee: '25%',
      features: ['25% minimum revenue growth guarantee', '24-hour implementation', '90-day money-back guarantee', 'White-glove support', 'Dedicated success team', 'Weekly optimization calls', 'Custom integrations']
    }
  };

  const currentPlan = planDetails[planType] || planDetails.professional;

  if (!customerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Chime
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Order #{customerData.sessionId.slice(-8).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Welcome to Chime, {customerData.name}!
          </p>
          <p className="text-lg text-blue-300">
            Your {currentPlan.name} plan is now active and we're ready to grow your business.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Details */}
            <div>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {currentPlan.name} Plan
                </h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {currentPlan.price}
                </p>
                <p className="text-sm text-blue-700">
                  {currentPlan.guarantee} minimum revenue growth guarantee
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Customer Information</h4>
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-medium">Name:</span> {customerData.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {customerData.email}
                </div>
                <div>
                  <span className="font-medium">Company:</span> {customerData.company}
                </div>
                <div>
                  <span className="font-medium">Plan:</span> {currentPlan.name}
                </div>
                <div>
                  <span className="font-medium">Amount Paid:</span> {currentPlan.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
              <p className="text-gray-600 text-sm">
                You'll receive a confirmation email within 60 seconds with your order details.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Welcome Package</h3>
              <p className="text-gray-600 text-sm">
                Our team will send you a welcome email with implementation timeline and next steps.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600 text-sm">
                We'll begin implementation within 48 hours and have you live within days.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Timeline</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day 1-2: Setup & Integration</h3>
                <p className="text-gray-600">Our team connects with your Shopify store and begins AI integration setup.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day 3-7: Optimization</h3>
                <p className="text-gray-600">AI algorithms analyze your data and implement personalized customer journeys.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day 8-30: Growth Phase</h3>
                <p className="text-gray-600">Watch your revenue grow as our AI continuously optimizes your store performance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Investment is Protected</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">90-Day Guarantee</h3>
              <p className="text-gray-600 text-sm">
                If we don't deliver the promised growth, you get your money back. No questions asked.
              </p>
            </div>

            <div className="text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">SOC 2 Certified</h3>
              <p className="text-gray-600 text-sm">
                Enterprise-grade security with bank-level encryption and data protection.
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600 text-sm">
                500+ successful implementations with an average 188% revenue increase.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-300">
            Questions? Contact us at{' '}
            <a href="mailto:hello@chime.co" className="text-blue-400 hover:text-blue-300">
              hello@chime.co
            </a>
          </p>
          <p className="text-slate-400 text-sm mt-2">
            © 2025 Chime. All rights reserved. | SOC 2 Certified | 99.9% Uptime Guarantee
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentSuccessPage;

