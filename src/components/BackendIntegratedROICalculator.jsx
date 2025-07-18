import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calculator, TrendingUp, Users, DollarSign, Target, CheckCircle } from 'lucide-react';

const BackendIntegratedROICalculator = () => {
  console.log('🚀 BackendIntegratedROICalculator component is mounting...');
  
  // Basic state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    monthly_revenue: '50000',
    average_order_value: '75',
    monthly_orders: '667',
    industry: '',
    conversion_rate: '2.5',
    cart_abandonment_rate: '70',
    monthly_ad_spend: '',
    manual_hours_per_week: '20',
    business_stage: '',
    biggest_challenges: [],
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    website: '',
    phone: ''
  });
  
  console.log('🎯 Basic state initialized successfully!');
  
  // Basic calculations
  const calculations = useMemo(() => {
    const monthlyRevenue = parseFloat(formData.monthly_revenue) || 0;
    const avgOrderValue = parseFloat(formData.average_order_value) || 0;
    const monthlyOrders = parseFloat(formData.monthly_orders) || 0;
    
    return {
      currentRevenue: monthlyRevenue,
      projectedRevenue: monthlyRevenue * 1.25, // 25% increase
      additionalRevenue: monthlyRevenue * 0.25
    };
  }, [formData]);
  
  console.log('🎯 Calculations initialized successfully!');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Revenue Growth Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your potential revenue growth with AI-powered automation
          </p>
        </div>
        
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Business Metrics</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Revenue ($)
                </label>
                <input
                  type="number"
                  value={formData.monthly_revenue}
                  onChange={(e) => setFormData({...formData, monthly_revenue: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Order Value ($)
                </label>
                <input
                  type="number"
                  value={formData.average_order_value}
                  onChange={(e) => setFormData({...formData, average_order_value: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="75"
                />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Next Step <ChevronRight className="inline ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Results Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Projection</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${calculations.currentRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Current Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${calculations.projectedRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Projected Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                +${calculations.additionalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Additional Monthly Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendIntegratedROICalculator;

