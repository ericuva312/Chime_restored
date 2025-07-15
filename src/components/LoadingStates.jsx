import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Primary Loading Spinner
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <Loader2 
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`} 
    />
  );
};

// Button Loading State
export const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '',
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    secondary: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 hover:from-yellow-500 hover:to-yellow-600',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

// Page Loading Overlay
export const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-lg font-medium text-slate-700">{message}</p>
        <p className="text-sm text-slate-500 mt-2">Elite systems loading...</p>
      </div>
    </div>
  );
};

// Content Loading Skeleton
export const ContentSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-slate-200 rounded mb-3 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

// Card Loading State
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="h-6 bg-slate-200 rounded mb-4 w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
      <div className="mt-6 h-10 bg-slate-200 rounded w-32"></div>
    </div>
  );
};

// Success State
export const SuccessMessage = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
      <p className="text-green-800 font-medium">{message}</p>
    </div>
  );
};

// Error State
export const ErrorMessage = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
      <p className="text-red-800 font-medium">{message}</p>
    </div>
  );
};

// Progress Bar
export const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

// Loading States for Different Sections
export const HeroLoading = () => (
  <div className="animate-pulse bg-gradient-to-br from-slate-50 to-blue-50 py-20">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="h-16 bg-slate-200 rounded mb-6 w-3/4 mx-auto"></div>
      <div className="h-6 bg-slate-200 rounded mb-4 w-2/3 mx-auto"></div>
      <div className="h-6 bg-slate-200 rounded mb-8 w-1/2 mx-auto"></div>
      <div className="h-12 bg-slate-200 rounded w-48 mx-auto"></div>
    </div>
  </div>
);

export const StatsLoading = () => (
  <div className="animate-pulse py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="text-center">
            <div className="h-12 bg-slate-200 rounded mb-2 w-24 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded w-32 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default {
  LoadingSpinner,
  LoadingButton,
  PageLoading,
  ContentSkeleton,
  CardSkeleton,
  SuccessMessage,
  ErrorMessage,
  ProgressBar,
  HeroLoading,
  StatsLoading
};

