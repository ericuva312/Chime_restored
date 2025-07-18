import React, { useState, useEffect } from 'react';

const BackendIntegratedROICalculator = () => {
  console.log('🚀 BackendIntegratedROICalculator component is mounting...');
  
  const [test, setTest] = useState('working');
  console.log('🎯 Test state initialized:', test);
  
  return (
    <div style={{padding: '20px', backgroundColor: 'white', minHeight: '100vh'}}>
      <h1>ROI Calculator Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Test state: {test}</p>
    </div>
  );
};

export default BackendIntegratedROICalculator;

