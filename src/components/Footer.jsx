import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock } from 'lucide-react'
import ChimeLogo from './ChimeLogo'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <ChimeLogo className="h-8 [&_path]:stroke-blue-400 [&_text]:fill-white" />
            <p className="text-gray-300 text-sm">
              AI-powered automation platform delivering guaranteed 15-25% revenue growth for Shopify stores.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Mail className="h-4 w-4" />
              <span>hello@chimehq.co</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions/cart-recovery" className="text-gray-300 hover:text-white transition-colors">Cart Recovery</Link></li>
              <li><Link to="/solutions/email" className="text-gray-300 hover:text-white transition-colors">Email Automation</Link></li>
              <li><Link to="/solutions/inventory" className="text-gray-300 hover:text-white transition-colors">Inventory Management</Link></li>
              <li><Link to="/solutions/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing Optimization</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Industries</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/industries/fashion" className="text-gray-300 hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/industries/electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/industries/health" className="text-gray-300 hover:text-white transition-colors">Health & Wellness</Link></li>
              <li><Link to="/industries/home-garden" className="text-gray-300 hover:text-white transition-colors">Home & Garden</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/implementation" className="text-gray-300 hover:text-white transition-colors">Implementation</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/roi-calculator" className="text-gray-300 hover:text-white transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Chime AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-400 text-sm">
                SOC 2 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

