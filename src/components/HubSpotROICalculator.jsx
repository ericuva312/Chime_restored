import React, { useEffect } from 'react';

const HubSpotROICalculator = () => {
  useEffect(() => {
    // Load HubSpot forms script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        // Create HubSpot form with real configuration
        window.hbspt.forms.create({
          region: "na2",
          portalId: "47326621",
          formId: "chime-roi-calculator-2025",
          target: '#hubspot-form-container',
          css: `
            .hs-form {
              font-family: 'Inter', system-ui, sans-serif !important;
            }
            .hs-form-field {
              margin-bottom: 1.5rem !important;
            }
            .hs-form-field label {
              font-weight: 600 !important;
              color: #374151 !important;
              margin-bottom: 0.5rem !important;
              display: block !important;
            }
            .hs-input {
              width: 100% !important;
              padding: 0.75rem !important;
              border: 2px solid #e5e7eb !important;
              border-radius: 0.5rem !important;
              font-size: 1rem !important;
              transition: border-color 0.2s !important;
            }
            .hs-input:focus {
              border-color: #2563eb !important;
              outline: none !important;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
            }
            .hs-button {
              background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
              color: white !important;
              padding: 1rem 2rem !important;
              border: none !important;
              border-radius: 0.5rem !important;
              font-weight: 600 !important;
              font-size: 1.1rem !important;
              cursor: pointer !important;
              transition: all 0.2s !important;
              width: 100% !important;
              margin-top: 1rem !important;
            }
            .hs-button:hover {
              transform: translateY(-2px) !important;
              box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3) !important;
            }
            .hs-form-required {
              color: #ef4444 !important;
            }
            .hs-error-msgs {
              color: #ef4444 !important;
              font-size: 0.875rem !important;
              margin-top: 0.25rem !important;
            }
            .hs-fieldtype-select select {
              width: 100% !important;
              padding: 0.75rem !important;
              border: 2px solid #e5e7eb !important;
              border-radius: 0.5rem !important;
              background-color: white !important;
              font-size: 1rem !important;
            }
          `,
          onFormReady: function($form) {
            console.log('HubSpot ROI calculator form loaded successfully');
            // Hide loading state
            const loadingDiv = document.querySelector('#hubspot-form-container .text-center');
            if (loadingDiv) {
              loadingDiv.style.display = 'none';
            }
          },
          onFormSubmit: function($form) {
            console.log('ROI calculator form submitted successfully');
            // Show success message
            const container = document.getElementById('hubspot-form-container');
            if (container) {
              container.innerHTML = `
                <div class="text-center py-12">
                  <div class="bg-green-50 rounded-lg p-8">
                    <div class="text-green-600 text-4xl mb-4">✅</div>
                    <h3 class="text-xl font-semibold text-green-900 mb-2">
                      ROI Calculation In Progress!
                    </h3>
                    <p class="text-green-700 mb-4">
                      Thank you for submitting your business information. We're calculating your personalized ROI projection and will email you the detailed results within 5 minutes.
                    </p>
                    <div class="bg-white rounded-lg p-4 mt-4">
                      <p class="text-sm text-gray-600">
                        <strong>What happens next:</strong><br>
                        • Personalized ROI report sent to your email<br>
                        • Industry-specific growth projections<br>
                        • Conservative, realistic, and optimistic scenarios<br>
                        • Implementation roadmap for your business
                      </p>
                    </div>
                  </div>
                </div>
              `;
            }
          },
          onFormSubmitError: function($form) {
            console.error('ROI calculator form submission error');
            // Show fallback message
            document.getElementById('fallback-message').classList.remove('hidden');
          }
        });
      }
    };

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Calculate Your <span className="text-yellow-300">Growth Potential</span>
          </h1>
          <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            See exactly how much revenue Chime can generate for your business. Get a personalized ROI projection based on your industry and business profile.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">188%</div>
              <div className="text-sm text-gray-600">Average Revenue Growth</div>
              <div className="text-xs text-gray-500 mt-1">Across all client implementations</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Successful Businesses</div>
              <div className="text-xs text-gray-500 mt-1">Growing with Chime automation</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
              <div className="text-xs text-gray-500 mt-1">For our clients in 2024</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.2%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="text-xs text-gray-500 mt-1">Clients achieving growth targets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🔒</span>
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">👥</span>
              <span>500+ Success Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">📊</span>
              <span>99.2% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚡</span>
              <span>48-Hour Setup</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            <div className="text-sm text-gray-600">4.9/5 from 500+ businesses</div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
              <h2 className="text-2xl font-bold mb-2">
                <span className="mr-2">🚀</span>
                Revenue Growth Calculator
              </h2>
              <p className="text-blue-100">
                Powered by data from 500+ successful Shopify implementations
              </p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Discover Your Exact Growth Potential
                </h3>
                <p className="text-gray-600">
                  Get a personalized revenue projection based on your specific business data and see exactly how Chime will transform your Shopify store
                </p>
              </div>

              {/* HubSpot Form Container */}
              <div id="hubspot-form-container" className="min-h-[400px]">
                {/* Loading state */}
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading professional ROI calculator...</p>
                </div>
              </div>

              {/* Fallback message if HubSpot doesn't load */}
              <div id="fallback-message" className="hidden text-center py-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Ready to Calculate Your ROI?
                  </h4>
                  <p className="text-blue-700 mb-4">
                    Our professional ROI calculator is loading. If you don't see the form above, please refresh the page or contact us directly.
                  </p>
                  <a 
                    href="mailto:hello@chimehq.co?subject=ROI Calculator Request"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Contact Us for ROI Analysis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600">
              Our projections are based on real client data and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Analysis</h3>
              <p className="text-gray-600">
                We analyze your industry's specific growth patterns and apply our proven multipliers based on 500+ successful implementations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Profile</h3>
              <p className="text-gray-600">
                Your business stage, current challenges, and growth goals are factored into a personalized growth projection model.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Conservative Estimates</h3>
              <p className="text-gray-600">
                We provide both conservative and optimistic scenarios, with our 15% minimum growth guarantee backing the conservative estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Guarantee Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Growth Guarantee
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            We're so confident in our results that we guarantee at least 15% revenue growth within 90 days, or you get your money back. No questions asked.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">15%</div>
              <div className="text-white">Minimum Growth Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">90</div>
              <div className="text-white">Days to See Results</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
              <div className="text-white">Money-Back Promise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubSpotROICalculator;

