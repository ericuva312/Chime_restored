import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry - even elite AI systems occasionally take a wrong turn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Looking for something specific?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/solutions"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <Search className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-slate-900">AI Solutions</div>
                <div className="text-sm text-slate-600">Explore our automation platform</div>
              </div>
            </Link>

            <Link 
              to="/pricing"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <HelpCircle className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-slate-900">Pricing Plans</div>
                <div className="text-sm text-slate-600">View our premium packages</div>
              </div>
            </Link>

            <Link 
              to="/contact"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <Search className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-slate-900">Contact Us</div>
                <div className="text-sm text-slate-600">Get in touch with our team</div>
              </div>
            </Link>

            <Link 
              to="/faq"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <HelpCircle className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-slate-900">FAQ</div>
                <div className="text-sm text-slate-600">Find answers to common questions</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Elite Positioning Message */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">
            Ready to dominate your market with elite AI automation?
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Claim Your Competitive Edge →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

