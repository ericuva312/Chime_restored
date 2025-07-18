import React from 'react';
import BackendIntegratedROICalculator from '../components/BackendIntegratedROICalculator';

const ROICalculatorPage = () => {
  console.log('📄 ROICalculatorPage is rendering...');
  
  try {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <BackendIntegratedROICalculator />
      </div>
    );
  } catch (error) {
    console.error('❌ Error in ROICalculatorPage:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Error Loading ROI Calculator</h1>
        <p>Please refresh the page or contact support.</p>
        <pre>{error.toString()}</pre>
      </div>
    );
  }
};

export default ROICalculatorPage;

