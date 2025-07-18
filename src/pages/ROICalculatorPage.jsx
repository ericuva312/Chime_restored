import React from 'react';
import BackendIntegratedROICalculator from '../components/BackendIntegratedROICalculator';

const ROICalculatorPage = () => {
  console.log('📄 ROICalculatorPage is rendering...');
  
  try {
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
        `}</style>
        
        {/* Calculator component remains unchanged */}
        <BackendIntegratedROICalculator />
      </div>
    );
  } catch (error) {
    console.error('❌ Error in ROICalculatorPage:', error);
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Error Loading ROI Calculator</h1>
          <p style={{ marginBottom: '1rem' }}>Please refresh the page or contact support.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default ROICalculatorPage;

