import { useState } from 'react';
import { AlertCircle, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import { LoadingButton } from './LoadingStates';

// Form Input Component with Validation
export const ValidatedInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-10' : ''} border rounded-lg transition-all duration-200
            ${error 
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
          `}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Textarea with Validation
export const ValidatedTextarea = ({ 
  label, 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder,
  rows = 4,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-vertical
          ${error 
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50
        `}
      />
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Contact Form with Full Validation
export const ContactForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validation Rules
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await onSubmit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in elite AI transformation. Our team will respond within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidatedInput
          label="Full Name"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          required
          placeholder="Enter your full name"
          icon={User}
        />
        
        <ValidatedInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          required
          placeholder="Enter your email address"
          icon={Mail}
        />
      </div>

      <ValidatedInput
        label="Company Name"
        value={formData.company}
        onChange={handleChange('company')}
        error={errors.company}
        required
        placeholder="Enter your company name"
      />

      <ValidatedTextarea
        label="Message"
        value={formData.message}
        onChange={handleChange('message')}
        error={errors.message}
        required
        placeholder="Tell us about your business goals and how we can help you dominate your market..."
        rows={5}
      />

      {errors.submit && (
        <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{errors.submit}</span>
        </div>
      )}

      <LoadingButton
        type="submit"
        loading={loading}
        variant="primary"
        className="w-full md:w-auto"
      >
        {loading ? 'Sending Message...' : 'Claim Your Competitive Edge'}
      </LoadingButton>

      <p className="text-sm text-slate-600">
        By submitting this form, you agree to our elite transformation process and privacy policy.
      </p>
    </form>
  );
};

// Newsletter Signup Form
export const NewsletterForm = ({ onSubmit, className = '' }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email is required');
      return;
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit({ email });
      setSuccess(true);
      setEmail('');
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 text-center ${className}`}>
        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Successfully subscribed!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your email for elite insights"
            className={`
              w-full px-4 py-3 border rounded-lg transition-all duration-200
              ${error 
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-50
            `}
          />
        </div>
        <LoadingButton
          type="submit"
          loading={loading}
          variant="secondary"
          className="whitespace-nowrap"
        >
          Subscribe
        </LoadingButton>
      </div>
      
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default {
  ValidatedInput,
  ValidatedTextarea,
  ContactForm,
  NewsletterForm
};

