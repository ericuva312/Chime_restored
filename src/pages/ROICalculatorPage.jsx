import React from 'react';
import FixedROICalculator from '../components/FixedROICalculator';

const ROICalculatorPage = () => {
  console.log('📄 ROICalculatorPage is rendering...');
  
  return (
      <div className="roi-calculator-page">
        {/* ChimeHQ.co matching design */}
        <style jsx>{`
          .roi-calculator-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            position: relative;
            overflow-x: hidden;
          }
          
          .roi-calculator-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(30, 58, 138, 0.2) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
          }
          
          .roi-calculator-page > div {
            position: relative;
            z-index: 1;
          }
          
          /* ChimeHQ.co style animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .hero-section {
            animation: fadeInDown 0.8s ease-out;
            text-align: center;
            padding: 4rem 1rem 3rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .hero-headline {
            font-size: 3.5rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          .hero-subheadline {
            font-size: 1.25rem;
            color: #e2e8f0;
            margin-bottom: 2rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
          }
          
          .hero-badge {
            display: inline-block;
            background: #10b981;
            color: #ffffff;
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .calculator-container {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            margin: 2rem auto;
            max-width: 800px;
            overflow: hidden;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          .no-email-message {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem auto;
            max-width: 600px;
            text-align: center;
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          
          .no-email-message h3 {
            color: #1f2937;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          
          .no-email-message p {
            color: #6b7280;
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .social-proof-section {
            background: #ffffff;
            padding: 4rem 2rem;
            margin-top: 4rem;
            animation: fadeInUp 0.8s ease-out 0.6s both;
          }
          
          .social-proof-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 1rem;
          }
          
          .social-proof-subtitle {
            text-align: center;
            font-size: 1.125rem;
            color: #6b7280;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .testimonial-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .testimonial-result {
            font-size: 1.5rem;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 0.5rem;
          }
          
          .testimonial-quote {
            color: #374151;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
          }
          
          .testimonial-author {
            font-weight: 600;
            color: #1f2937;
            font-size: 0.875rem;
          }
          
          .trust-indicators {
            background: #f8fafc;
            padding: 3rem 2rem;
            text-align: center;
          }
          
          .trust-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 2rem;
          }
          
          .trust-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .trust-stat {
            text-align: center;
          }
          
          .trust-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #3b82f6;
            margin-bottom: 0.5rem;
          }
          
          .trust-label {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          /* Mobile responsive design */
          @media (max-width: 768px) {
            .hero-headline {
              font-size: 2.5rem;
            }
            
            .hero-section {
              padding: 2rem 1rem;
            }
            
            .calculator-container {
              margin: 1rem;
              border-radius: 12px;
            }
            
            .testimonials-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .trust-stats {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .hero-headline {
              font-size: 2rem;
            }
            
            .trust-stats {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            FREE REVENUE GROWTH ANALYSIS
          </div>
          <h1 className="hero-headline">
            Discover Your Hidden Revenue Potential with Chime's AI
          </h1>
          <p className="hero-subheadline">
            Join 150+ business leaders who discovered their hidden revenue potential with Chime's AI-powered growth analysis. See exactly how much additional revenue your business could generate with our proven automation strategies.
          </p>
        </div>

        {/* No Email Required Message */}
        <div className="no-email-message">
          <h3>🔓 Get Instant Results - No Email Required</h3>
          <p>
            Use Chime's calculator below to instantly see your revenue projections and growth potential. 
            Your contact information is only needed if you want a detailed, personalized growth blueprint delivered to you.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="calculator-container">
          <FixedROICalculator />
        </div>

        {/* Social Proof Section */}
        <div className="social-proof-section">
          <h2 className="social-proof-title">
            Real Results from Chime's AI-Powered Business Automation
          </h2>
          <p className="social-proof-subtitle">
            See how Chime's AI automation platform has transformed businesses across industries with measurable revenue growth
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-result">+49% Revenue Growth</div>
              <p className="testimonial-quote">
                "Chime's AI platform identified revenue leaks we never knew existed. We went from $85K to $127K monthly revenue in just 4 months with their automation system."
              </p>
              <div className="testimonial-author">Sarah Chen, Electronics Store Owner</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-result">28 Hours/Week Saved</div>
              <p className="testimonial-quote">
                "Chime's automation freed up almost 30 hours per week. Our customer retention jumped from 68% to 89% with their AI-powered personalization systems."
              </p>
              <div className="testimonial-author">Michael Rodriguez, Health & Wellness</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-result">+62% Business Growth</div>
              <p className="testimonial-quote">
                "From $2.1M to $3.4M in 8 months. Chime's predictive analytics and automation helped us scale faster than we ever thought possible."
              </p>
              <div className="testimonial-author">Jennifer Walsh, Fashion Brand</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-result">+340% Efficiency Gain</div>
              <p className="testimonial-quote">
                "Our operational efficiency skyrocketed with Chime's AI engines. Revenue per employee increased from $180K to $195K while reducing manual work by 75%."
              </p>
              <div className="testimonial-author">David Kim, Home & Garden</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-result">6-Week ROI Achievement</div>
              <p className="testimonial-quote">
                "We saw ROI in just 6 weeks with Chime's platform. Daily operations went from 15 hours to 2 hours, and revenue per employee increased by 85%."
              </p>
              <div className="testimonial-author">Lisa Thompson, Beauty & Cosmetics</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-result">2x Conversion Rate</div>
              <p className="testimonial-quote">
                "Chime's AI optimization doubled our conversions and reduced customer acquisition costs by 45%. The ROI was immediate and substantial."
              </p>
              <div className="testimonial-author">Robert Martinez, Sports & Fitness</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <h2 className="trust-title">
            Trusted by Growing Businesses Using Chime's AI Platform
          </h2>
          <div className="trust-stats">
            <div className="trust-stat">
              <div className="trust-number">150+</div>
              <div className="trust-label">Businesses Transformed</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">$50M+</div>
              <div className="trust-label">Revenue Generated</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">98%</div>
              <div className="trust-label">Client Satisfaction</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">35%</div>
              <div className="trust-label">Avg Revenue Increase</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ROICalculatorPage;

