import React, { useState } from 'react';

const TestMinimalComponent = () => {
  console.log('🧪 TestMinimalComponent is loading and executing!');
  
  const [testValue, setTestValue] = useState('Initial Value');
  
  console.log('🔍 TestMinimalComponent state:', testValue);
  
  const handleClick = () => {
    console.log('🎯 Button clicked! Updating state...');
    setTestValue('Button was clicked!');
  };
  
  const handleInputChange = (e) => {
    console.log('⌨️ Input changed:', e.target.value);
    setTestValue(e.target.value);
  };
  
  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
      <h2>🧪 MINIMAL TEST COMPONENT</h2>
      <p>If you can see this, React is working!</p>
      <p>Current state: <strong>{testValue}</strong></p>
      
      <div style={{ marginTop: '10px' }}>
        <input 
          type="text" 
          value={testValue}
          onChange={handleInputChange}
          placeholder="Type here to test state"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button 
          onClick={handleClick}
          style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white' }}
        >
          Test Button
        </button>
      </div>
      
      <p style={{ fontSize: '12px', color: 'gray', marginTop: '10px' }}>
        Check console for debug logs
      </p>
    </div>
  );
};

export default TestMinimalComponent;

