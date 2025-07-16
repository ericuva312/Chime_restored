import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock, Shield, Award, Lock, CheckCircle } from 'lucide-react'
import ChimeLogo from './ChimeLogo'

const EnhancedFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Trust Indicators Section */}
        <div className="mb-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">SOC 2 Certified</span>
              <span className="text-xs text-gray-300">Enterprise Security</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Lock className="h-8 w-8 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">SSL Encrypted</span>
              <span className="text-xs text-gray-300">Bank-Level Protection</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="h-8 w-8 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">GDPR Compliant</span>
              <span className="text-xs text-gray-300">Privacy Protected</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <span className="text-sm font-semibold text-green-400">99.9% Uptime</span>
              <span className="text-xs text-gray-300">Guaranteed Reliability</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-6">
            <ChimeLogo className="h-10 [&_path]:stroke-blue-400 [&_text]:fill-white" />
            <p className="text-gray-300 text-base leading-relaxed">
              Elite AI-powered automation platform delivering guaranteed 15-25% revenue growth for growth-stage Shopify merchants. Trusted by 500+ successful businesses.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="font-medium">hello@chimehq.co</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>24/7 AI-Powered Support</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Global Enterprise Solutions</span>
              </div>
            </div>

            {/* Elite Credentials */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Elite Leadership</h4>
              <p className="text-sm text-gray-300">
                25+ years enterprise experience • $500M+ P&L management • 600+ team leadership
              </p>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">AI Engines</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/solutions/cart-recovery" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Revenue Optimization Engine
              </Link></li>
              <li><Link to="/solutions/email" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Strategic Growth Engine
              </Link></li>
              <li><Link to="/solutions/inventory" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Operational Excellence Engine
              </Link></li>
              <li><Link to="/solutions/pricing" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Customer Success Engine
              </Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Industries</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/industries/fashion" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Fashion & Apparel
              </Link></li>
              <li><Link to="/industries/electronics" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Electronics
              </Link></li>
              <li><Link to="/industries/health" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Health & Wellness
              </Link></li>
              <li><Link to="/industries/home-garden" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Home & Garden
              </Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                About Us
              </Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Case Studies
              </Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Pricing
              </Link></li>
              <li><Link to="/implementation" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Implementation
              </Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                FAQ
              </Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Contact
              </Link></li>
              <li><Link to="/roi-calculator" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                ROI Calculator
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Legal and Security */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 Chime AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Enterprise Grade
                </span>
                <span className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  256-bit SSL
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <span className="text-emerald-400 font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                SOC 2 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default EnhancedFooter

