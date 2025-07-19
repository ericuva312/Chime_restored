import React from 'react';
import FixedROICalculator from '../components/FixedROICalculator';

const ROICalculatorPage = () => {
  console.log('📄 ROICalculatorPage is rendering...');
  
  return (
      <div className="roi-calculator-page">
        {/* Enhanced page styling without affecting the calculator */}
        <style jsx>{`
          .roi-calculator-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
          }
          
          .roi-calculator-page > div {
            position: relative;
            z-index: 1;
          }
          
          /* Subtle animations for enhanced UX */
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
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .hero-section {
            animation: fadeInDown 0.8s ease-out;
            text-align: center;
            padding: 3rem 1rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .hero-headline {
            font-size: 3.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          .hero-subheadline {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            font-weight: 400;
            line-height: 1.4;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .value-props {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
            padding: 0 1rem;
          }
          
          .value-prop {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1rem;
            padding: 1.5rem;
            text-align: center;
            animation: fadeInUp 0.6s ease-out;
            transition: all 0.3s ease;
          }
          
          .value-prop:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          .value-prop-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
          }
          
          .value-prop-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.5rem;
          }
          
          .value-prop-desc {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.95rem;
            line-height: 1.4;
          }
          
          .trust-bar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem auto;
            max-width: 1000px;
            animation: slideInLeft 0.8s ease-out;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .trust-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
          }
          
          .trust-stat {
            padding: 1rem;
          }
          
          .trust-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: block;
            margin-bottom: 0.5rem;
          }
          
          .trust-label {
            color: #6b7280;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .roi-calculator-page .bg-white {
            animation: fadeInUp 0.6s ease-out;
            box-shadow: 
              0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          /* Enhanced hover effects */
          .roi-calculator-page button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .roi-calculator-page button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          .roi-calculator-page button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .roi-calculator-page button:hover::before {
            left: 100%;
          }
          
          /* Enhanced input styling */
          .roi-calculator-page input,
          .roi-calculator-page select {
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
          }
          
          .roi-calculator-page input:focus,
          .roi-calculator-page select:focus {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
            background: rgba(255, 255, 255, 1);
          }
          
          /* Progress bar enhancements */
          .roi-calculator-page .w-10.h-10 {
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .roi-calculator-page .bg-blue-600 {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          }
          
          /* Card hover effects */
          .roi-calculator-page .rounded-2xl {
            transition: all 0.3s ease;
          }
          
          .roi-calculator-page .rounded-2xl:hover {
            transform: translateY(-5px);
            box-shadow: 
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.1);
          }
          
          /* Gradient text effects */
          .roi-calculator-page h1 {
            background: linear-gradient(135deg, #1f2937 0%, #4f46e5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          /* Enhanced success state */
          .roi-calculator-page .bg-green-50 {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          }
          
          .roi-calculator-page .bg-blue-50 {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          }
          
          .roi-calculator-page .bg-purple-50 {
            background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
          }
          
          /* Responsive enhancements */
          @media (max-width: 768px) {
            .roi-calculator-page {
              padding: 1rem;
            }
            
            .hero-headline {
              font-size: 2.5rem;
            }
            
            .hero-subheadline {
              font-size: 1.25rem;
            }
            
            .value-props {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            .trust-stats {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            
            .roi-calculator-page .rounded-2xl {
              border-radius: 1rem;
              margin-bottom: 1rem;
            }
          }
          
          /* Loading states */
          .roi-calculator-page button:disabled {
            opacity: 0.7;
            transform: none;
            cursor: not-allowed;
          }
          
          .roi-calculator-page button:disabled:hover {
            transform: none;
            box-shadow: none;
          }
          
          /* Checkbox enhancements */
          .roi-calculator-page input[type="checkbox"] {
            transition: all 0.2s ease;
          }
          
          .roi-calculator-page input[type="checkbox"]:checked {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-color: #3b82f6;
          }
          
          /* Success page enhancements */
          .roi-calculator-page .bg-gradient-to-br.from-green-50 {
            background: linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%);
          }
          
          /* Subtle pulse animation for important elements */
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          .roi-calculator-page .text-green-600,
          .roi-calculator-page .text-blue-600,
          .roi-calculator-page .text-purple-600 {
            animation: pulse 2s infinite;
          }
          
          /* Social Proof Section Styling */
          .social-proof-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 1rem;
            animation: slideInRight 0.8s ease-out;
          }
          
          .testimonials-container {
            margin-bottom: 4rem;
          }
          
          .social-proof-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            color: white;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .social-proof-subtitle {
            font-size: 1.25rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }
          
          .testimonial-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            animation: fadeInUp 0.6s ease-out;
          }
          
          .testimonial-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .testimonial-content {
            position: relative;
          }
          
          .quote-icon {
            font-size: 4rem;
            color: #3b82f6;
            font-family: serif;
            line-height: 1;
            margin-bottom: 1rem;
            opacity: 0.3;
          }
          
          .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #374151;
            margin-bottom: 1.5rem;
            font-style: italic;
          }
          
          .testimonial-author {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e5e7eb;
            padding-top: 1rem;
          }
          
          .author-info {
            flex: 1;
          }
          
          .author-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.25rem;
          }
          
          .author-title {
            font-size: 0.9rem;
            color: #6b7280;
            margin: 0;
          }
          
          .author-results {
            text-align: right;
          }
          
          .result-metric {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.85rem;
            font-weight: 600;
            white-space: nowrap;
          }
          
          .success-metrics {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            padding: 2.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInLeft 0.8s ease-out;
          }
          
          .metrics-title {
            font-size: 2rem;
            font-weight: 600;
            text-align: center;
            color: white;
            margin-bottom: 2rem;
          }
          
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
          }
          
          .metric-item {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            transition: all 0.3s ease;
          }
          
          .metric-item:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
          }
          
          .metric-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
          }
          
          .metric-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            display: block;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .metric-label {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          /* Responsive adjustments for social proof */
          @media (max-width: 768px) {
            .social-proof-title {
              font-size: 2rem;
            }
            
            .social-proof-subtitle {
              font-size: 1.1rem;
            }
            
            .testimonials-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .testimonial-author {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
            
            .author-results {
              text-align: left;
            }
            
            .metrics-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            
            .metric-number {
              font-size: 2rem;
            }
          }
        `}</style>
        
        {/* Hero Section with Compelling Copy */}
        <div className="hero-section">
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '1rem', 
            padding: '1rem 2rem', 
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'inline-block'
          }}>
            <span style={{ 
              color: '#10b981', 
              fontWeight: '600', 
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              ✨ FREE Revenue Growth Analysis
            </span>
          </div>
          
          <h1 className="hero-headline">
            Calculate Your Revenue Growth Potential in 3 Minutes
          </h1>
          <p className="hero-subheadline">
            Join 150+ business leaders who've used our proven automation strategies to increase revenue by 25-40%. 
            Get your personalized growth blueprint and see exactly how much your business could earn.
          </p>
          
          {/* Urgency and Social Proof */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '1rem',
            padding: '1rem 2rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              🔥 <strong>47 business owners</strong> completed this calculator in the last 7 days
            </p>
          </div>
          
          {/* Value Propositions */}
          <div className="value-props">
            <div className="value-prop">
              <span className="value-prop-icon">💰</span>
              <h3 className="value-prop-title">Increase Revenue 25-40%</h3>
              <p className="value-prop-desc">
                Our automation strategies have generated over $50M in additional revenue for clients across industries
              </p>
            </div>
            <div className="value-prop">
              <span className="value-prop-icon">⚡</span>
              <h3 className="value-prop-title">Save 15-30 Hours/Week</h3>
              <p className="value-prop-desc">
                Eliminate manual processes and focus on high-value activities that drive growth and profitability
              </p>
            </div>
            <div className="value-prop">
              <span className="value-prop-icon">🎯</span>
              <h3 className="value-prop-title">Proven Enterprise Methods</h3>
              <p className="value-prop-desc">
                25+ years managing $500M+ P&L and leading 600+ team members at Fortune 500 companies
              </p>
            </div>
          </div>
          
          {/* Enhanced Trust Bar with Credentials */}
          <div className="trust-bar">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '600',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Trusted by Industry Leaders
              </h3>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#6b7280',
                fontSize: '0.95rem'
              }}>
                Former VP at Microsoft, Oracle, and Salesforce
              </p>
            </div>
            
            <div className="trust-stats">
              <div className="trust-stat">
                <span className="trust-number">$500M+</span>
                <span className="trust-label">P&L Managed</span>
              </div>
              <div className="trust-stat">
                <span className="trust-number">600+</span>
                <span className="trust-label">Team Members Led</span>
              </div>
              <div className="trust-stat">
                <span className="trust-number">25+</span>
                <span className="trust-label">Years Experience</span>
              </div>
              <div className="trust-stat">
                <span className="trust-number">150+</span>
                <span className="trust-label">Businesses Transformed</span>
              </div>
            </div>
            
            {/* Company Logos/Credentials */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{ 
                margin: '0 0 1rem 0', 
                color: '#6b7280',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>
                Enterprise Experience At
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  color: '#3b82f6',
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}>Microsoft</span>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  color: '#dc2626',
                  background: 'rgba(220, 38, 38, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}>Oracle</span>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  color: '#0ea5e9',
                  background: 'rgba(14, 165, 233, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}>Salesforce</span>
              </div>
            </div>
          </div>
          
          {/* Risk Reversal */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h4 style={{ 
              color: 'white', 
              margin: '0 0 1rem 0',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              🛡️ 100% Free Analysis - No Commitment Required
            </h4>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              margin: 0,
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              Get your personalized revenue growth blueprint with zero risk. No credit card required, 
              no sales pressure - just actionable insights you can implement immediately.
            </p>
          </div>
        </div>
        
        {/* Social Proof Section */}
        <div className="social-proof-section">
          <div className="testimonials-container">
            <h2 className="social-proof-title">Real Results from Real Businesses</h2>
            <p className="social-proof-subtitle">
              See how our proven automation strategies have transformed businesses across industries
            </p>
            
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "Eric's automation strategies increased our monthly revenue from $85K to $127K in just 4 months. 
                    The ROI calculator was incredibly accurate - we actually exceeded the projections by 12%."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">Sarah Chen</h4>
                      <p className="author-title">CEO, TechFlow Solutions</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">+49% Revenue</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "We eliminated 28 hours of manual work per week and saw our customer retention jump from 
                    68% to 89%. The automation blueprint was a game-changer for our operations."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">Michael Rodriguez</h4>
                      <p className="author-title">Founder, GrowthMart</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">28 hrs/week saved</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "From $2.1M to $3.4M in annual revenue in 8 months. Eric's enterprise-level strategies 
                    scaled perfectly for our mid-size business. Best investment we've ever made."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">Jennifer Walsh</h4>
                      <p className="author-title">Operations Director, RetailPro</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">+62% Growth</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "The calculator predicted $180K additional revenue - we hit $195K. Eric's Fortune 500 
                    experience really shows. Our team efficiency improved by 340%."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">David Kim</h4>
                      <p className="author-title">VP Operations, InnovateCorp</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">+340% Efficiency</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "Went from 15 manual hours daily to 2 hours. Revenue per employee increased 85%. 
                    The automation roadmap was worth every penny - ROI in 6 weeks."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">Lisa Thompson</h4>
                      <p className="author-title">COO, ServiceMax Pro</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">6-week ROI</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">
                    "Customer acquisition cost dropped 45% while conversion rates doubled. Eric's 
                    enterprise automation methods work incredibly well for growing businesses."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">Robert Martinez</h4>
                      <p className="author-title">Founder, ScaleUp Solutions</p>
                    </div>
                    <div className="author-results">
                      <span className="result-metric">2x Conversions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Success Metrics */}
          <div className="success-metrics">
            <h3 className="metrics-title">Proven Track Record of Success</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-icon">🚀</div>
                <div className="metric-number">150+</div>
                <div className="metric-label">Businesses Transformed</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">💰</div>
                <div className="metric-number">$50M+</div>
                <div className="metric-label">Revenue Generated</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">⚡</div>
                <div className="metric-number">2,500+</div>
                <div className="metric-label">Hours Saved Weekly</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">📊</div>
                <div className="metric-number">98%</div>
                <div className="metric-label">Client Satisfaction</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">🎯</div>
                <div className="metric-number">35%</div>
                <div className="metric-label">Avg Revenue Increase</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">⏱️</div>
                <div className="metric-number">8 weeks</div>
                <div className="metric-label">Avg Time to ROI</div>
              </div>
            </div>
          </div>
          
          {/* Final Call-to-Action */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            marginTop: '3rem',
            textAlign: 'center',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            <h3 style={{ 
              color: 'white', 
              margin: '0 0 1rem 0',
              fontSize: '2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ready to Transform Your Business?
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              margin: '0 0 2rem 0',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Join the 150+ business leaders who've used our calculator to unlock their growth potential. 
              Get your personalized revenue blueprint in just 3 minutes.
            </p>
            
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'inline-block'
            }}>
              <p style={{ 
                color: 'white', 
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                ⏰ <strong>Limited Time:</strong> Free personalized growth strategy session included with every calculation
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.9rem' }}>
                  No Credit Card
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.9rem' }}>
                  Instant Results
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.9rem' }}>
                  Personalized Plan
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* ROI Calculator Component */}
      <FixedROICalculator />
    </div>
  );
};

export default ROICalculatorPage;

