import React, { useState } from 'react';

const TestROICalculator = () => {
  const [test, setTest] = useState('working');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test ROI Calculator</h1>
      <p>Component is {test}</p>
      <button 
        onClick={() => setTest('clicked')}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Test Button
      </button>
    </div>
  );
};

export default TestROICalculator;

