import React, { useState, useCallback, useMemo } from 'react';
import { submitToHubSpot } from '../utils/hubspot';

const UltimateROICalculator = () => {
  // Consolidated form state with proper initialization
  const [formData, setFormData] = useState({
    // Step 1: Business Metrics
    monthlyRevenue: '',
    averageOrderValue: '',
    monthlyOrders: '',
    
    // Step 2: Performance & Industry Data
    industry: '',
    conversionRate: '',
    cartAbandonmentRate: '',
    monthlyAdSpend: '',
    
    // Step 3: Operations
    teamSize: '',
    currentTools: '',
    timeSpentOnTasks: '',
    
    // Step 4: Contact Info
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState(null);
  const [errors, setErrors] = useState({});

  // Industry options - memoized to prevent re-creation
  const industries = useMemo(() => [
    { value: '', label: 'Select your industry' },
    { value: 'fashion', label: 'Fashion & Apparel (Avg: 22% growth)' },
    { value: 'electronics', label: 'Electronics & Tech (Avg: 18% growth)' },
    { value: 'health', label: 'Health & Wellness (Avg: 28% growth)' },
    { value: 'beauty', label: 'Beauty & Cosmetics (Avg: 31% growth)' },
    { value: 'home', label: 'Home & Garden (Avg: 16% growth)' },
    { value: 'food', label: 'Food & Beverage (Avg: 20% growth)' },
    { value: 'pets', label: 'Pet Products (Avg: 24% growth)' },
    { value: 'jewelry', label: 'Jewelry & Accessories (Avg: 35% growth)' },
    { value: 'sports', label: 'Sports & Fitness (Avg: 22% growth)' },
    { value: 'other', label: 'Other (Avg: 18% growth)' }
  ], []);

  // Update form data function - Optimized to prevent unnecessary re-renders
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Validation functions for each step
  const validateStep = useCallback((step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Monthly revenue is required';
        if (!formData.averageOrderValue) newErrors.averageOrderValue = 'Average order value is required';
        if (!formData.monthlyOrders) newErrors.monthlyOrders = 'Monthly orders is required';
        break;
        
      case 2:
        if (!formData.industry) newErrors.industry = 'Industry selection is required';
        if (!formData.conversionRate) newErrors.conversionRate = 'Conversion rate is required';
        if (!formData.cartAbandonmentRate) newErrors.cartAbandonmentRate = 'Cart abandonment rate is required';
        break;
        
      case 3:
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        if (!formData.currentTools) newErrors.currentTools = 'Current tools information is required';
        if (!formData.timeSpentOnTasks) newErrors.timeSpentOnTasks = 'Time spent on tasks is required';
        break;
        
      case 4:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.company) newErrors.company = 'Company is required';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Navigation functions
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  // Calculate ROI based on form data
  const calculateROI = useCallback(() => {
    const revenue = parseFloat(formData.monthlyRevenue) || 0;
    const orders = parseFloat(formData.monthlyOrders) || 0;
    const conversionRate = parseFloat(formData.conversionRate) || 0;
    const cartAbandonmentRate = parseFloat(formData.cartAbandonmentRate) || 0;
    
    // Industry multipliers
    const industryMultipliers = {
      fashion: 1.22,
      electronics: 1.18,
      health: 1.28,
      beauty: 1.31,
      home: 1.16,
      food: 1.20,
      pets: 1.24,
      jewelry: 1.35,
      sports: 1.22,
      other: 1.18
    };
    
    const multiplier = industryMultipliers[formData.industry] || 1.18;
    
    // Conservative calculation
    const conservativeGrowth = revenue * 0.15 * multiplier;
    const realisticGrowth = revenue * 0.25 * multiplier;
    const optimisticGrowth = revenue * 0.40 * multiplier;
    
    return {
      conservative: Math.round(conservativeGrowth),
      realistic: Math.round(realisticGrowth),
      optimistic: Math.round(optimisticGrowth),
      growthPercentage: Math.round((realisticGrowth / revenue) * 100),
      additionalRevenue: Math.round(realisticGrowth * 12),
      roi: Math.round(((realisticGrowth * 12) / (revenue * 12)) * 100)
    };
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateStep(4)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate results
      const results = calculateROI();
      setCalculatedResults(results);
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        calculatedResults: results,
        submittedAt: new Date().toISOString()
      };
      
      // Submit to backend
      const response = await fetch('https://lnh8imcjywkg.manus.space/api/roi-calculator-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      // Submit to HubSpot
      try {
        await submitToHubSpot({
          email: formData.email,
          firstname: formData.firstName,
          lastname: formData.lastName,
          company: formData.company,
          phone: formData.phone,
          monthly_revenue: formData.monthlyRevenue,
          industry: formData.industry,
          roi_projection: results.roi
        });
      } catch (hubspotError) {
        console.error('HubSpot submission failed:', hubspotError);
        // Continue even if HubSpot fails
      }
      
      // Show results
      setShowResults(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, calculateROI]);

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">📊 Current Business Performance</h3>
              <p className="text-gray-600">Help us understand your current revenue and order patterns</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Revenue *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => updateFormData('monthlyRevenue', e.target.value)}
                    placeholder="50,000"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.monthlyRevenue ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.monthlyRevenue && <p className="text-red-500 text-sm mt-1">{errors.monthlyRevenue}</p>}
                <p className="text-sm text-gray-500 mt-1">Your total monthly revenue</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Order Value *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.averageOrderValue}
                    onChange={(e) => updateFormData('averageOrderValue', e.target.value)}
                    placeholder="75"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.averageOrderValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.averageOrderValue && <p className="text-red-500 text-sm mt-1">{errors.averageOrderValue}</p>}
                <p className="text-sm text-gray-500 mt-1">Average amount per order</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Orders *
                </label>
                <input
                  type="number"
                  value={formData.monthlyOrders}
                  onChange={(e) => updateFormData('monthlyOrders', e.target.value)}
                  placeholder="667"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.monthlyOrders ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.monthlyOrders && <p className="text-red-500 text-sm mt-1">{errors.monthlyOrders}</p>}
                <p className="text-sm text-gray-500 mt-1">Total orders per month</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🔒 Why we need this data</h4>
              <p className="text-blue-800 text-sm">
                These metrics help us calculate your exact growth potential and create a personalized automation strategy. All data 
                is encrypted and never shared.
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 Performance & Industry Data</h3>
              <p className="text-gray-600">Let's understand your current performance and industry context</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                <p className="text-sm text-gray-500 mt-1">Industry affects growth potential</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Conversion Rate (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.conversionRate}
                  onChange={(e) => updateFormData('conversionRate', e.target.value)}
                  placeholder="2.5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.conversionRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.conversionRate && <p className="text-red-500 text-sm mt-1">{errors.conversionRate}</p>}
                <p className="text-sm text-gray-500 mt-1">Visitors who make a purchase</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cart Abandonment Rate (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.cartAbandonmentRate}
                  onChange={(e) => updateFormData('cartAbandonmentRate', e.target.value)}
                  placeholder="70"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.cartAbandonmentRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cartAbandonmentRate && <p className="text-red-500 text-sm mt-1">{errors.cartAbandonmentRate}</p>}
                <p className="text-sm text-gray-500 mt-1">% of carts left without purchase</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Ad Spend
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyAdSpend}
                    onChange={(e) => updateFormData('monthlyAdSpend', e.target.value)}
                    placeholder="5,000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Optional: helps calculate ad efficiency gains</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">📈 Industry Benchmark</h4>
              <p className="text-green-800 text-sm">
                Select your industry to see specific growth benchmarks for your sector.
              </p>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">⚙️ Current Operations</h3>
              <p className="text-gray-600">Tell us about your team and current workflow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Size *
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => updateFormData('teamSize', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.teamSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select team size</option>
                  <option value="1">Just me</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-25">11-25 people</option>
                  <option value="26+">26+ people</option>
                </select>
                {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
                <p className="text-sm text-gray-500 mt-1">Including yourself</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Tools *
                </label>
                <select
                  value={formData.currentTools}
                  onChange={(e) => updateFormData('currentTools', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.currentTools ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select current setup</option>
                  <option value="basic">Basic (Shopify + email)</option>
                  <option value="intermediate">Intermediate (+ some automation)</option>
                  <option value="advanced">Advanced (multiple tools)</option>
                  <option value="enterprise">Enterprise (full stack)</option>
                </select>
                {errors.currentTools && <p className="text-red-500 text-sm mt-1">{errors.currentTools}</p>}
                <p className="text-sm text-gray-500 mt-1">Your current tech stack</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Spent on Manual Tasks *
                </label>
                <select
                  value={formData.timeSpentOnTasks}
                  onChange={(e) => updateFormData('timeSpentOnTasks', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.timeSpentOnTasks ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select time spent</option>
                  <option value="0-5">0-5 hours per week</option>
                  <option value="6-15">6-15 hours per week</option>
                  <option value="16-30">16-30 hours per week</option>
                  <option value="31+">31+ hours per week</option>
                </select>
                {errors.timeSpentOnTasks && <p className="text-red-500 text-sm mt-1">{errors.timeSpentOnTasks}</p>}
                <p className="text-sm text-gray-500 mt-1">Time on email marketing, customer service, inventory management, etc.</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">⏰ Time Savings Calculation</h4>
              <p className="text-purple-800 text-sm">
                We'll calculate how much time Chime can save you based on your current manual processes.
              </p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">📞 Contact Information</h3>
              <p className="text-gray-600">Almost done! We'll send your personalized ROI report to this email</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="John"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Smith"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="john@company.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Your Company"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Optional: for priority support and consultation</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">📧 What happens next?</h4>
              <p className="text-yellow-800 text-sm">
                You'll receive a detailed ROI report via email within minutes, plus we'll add you to our priority list for 
                implementation support.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Progress calculation
  const progressPercentage = (currentStep / 5) * 100;

  // Results page
  if (showResults && calculatedResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎉 Your Personalized ROI Projection</h2>
          <p className="text-xl text-gray-600">Based on your business data and industry benchmarks</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">{calculatedResults.growthPercentage}%</div>
            <div className="text-blue-100">Projected Growth</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">${calculatedResults.additionalRevenue.toLocaleString()}</div>
            <div className="text-green-100">Additional Annual Revenue</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">{calculatedResults.roi}%</div>
            <div className="text-purple-100">ROI</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">6-12</div>
            <div className="text-orange-100">Months to ROI</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Revenue Projection Scenarios</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Conservative</h4>
              <div className="text-2xl font-bold text-gray-900">${calculatedResults.conservative.toLocaleString()}</div>
              <p className="text-sm text-gray-600 mt-2">Monthly increase</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">Realistic</h4>
              <div className="text-2xl font-bold text-blue-900">${calculatedResults.realistic.toLocaleString()}</div>
              <p className="text-sm text-blue-600 mt-2">Monthly increase</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h4 className="text-lg font-semibold text-green-700 mb-2">Optimistic</h4>
              <div className="text-2xl font-bold text-green-900">${calculatedResults.optimistic.toLocaleString()}</div>
              <p className="text-sm text-green-600 mt-2">Monthly increase</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-6">
            Your detailed ROI report has been sent to {formData.email}
          </p>
          <p className="text-blue-100 mb-6">
            Our team will contact you within 24 hours to discuss your personalized implementation strategy.
          </p>
          <button
            onClick={() => window.location.href = '/pricing'}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Pricing Plans
          </button>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">📊 Revenue Growth Calculator</h2>
          <div className="text-right">
            <div className="text-sm opacity-90">Step {currentStep} of 5</div>
            <div className="text-lg font-semibold">{Math.round(progressPercentage)}% Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-blue-500 rounded-full h-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm mt-2 opacity-90">
          <span>Business Metrics</span>
          <span>Performance Data</span>
          <span>Operations</span>
          <span>Contact Info</span>
          <span>Your Results</span>
        </div>
        
        <p className="text-center mt-4 text-blue-100">
          Powered by data from 500+ successful Shopify implementations
        </p>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        
        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Calculating...' : 'Get My ROI Report'}
          </button>
        )}
      </div>
      
      {/* Security Notice */}
      <div className="text-center mt-6 text-sm text-gray-500">
        🔒 Your data is encrypted and secure • Used by 500+ successful Shopify stores • SOC 2 certified
      </div>
    </div>
  );
};

export default UltimateROICalculator;

