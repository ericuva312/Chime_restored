import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChimeLogo from './ChimeLogo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)
  const [showIndustries, setShowIndustries] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const solutions = [
    { name: 'Cart Recovery', href: '/solutions/cart-recovery' },
    { name: 'Email Automation', href: '/solutions/email' },
    { name: 'Inventory Management', href: '/solutions/inventory' },
    { name: 'Pricing Optimization', href: '/solutions/pricing' }
  ]

  const industries = [
    { name: 'Fashion & Apparel', href: '/industries/fashion' },
    { name: 'Electronics', href: '/industries/electronics' },
    { name: 'Health & Wellness', href: '/industries/health' },
    { name: 'Beauty & Cosmetics', href: '/industries/beauty' },
    { name: 'Home & Garden', href: '/industries/home' },
    { name: 'Food & Beverage', href: '/industries/food' },
    { name: 'Pet Products', href: '/industries/pets' }
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ChimeLogo className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowSolutions(true)}
              onMouseLeave={() => setShowSolutions(false)}
            >
              <button 
                className="flex items-center text-sm font-medium transition-colors hover:text-blue-600"
                style={{ 
                  color: '#1e40af',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span style={{ color: '#1e40af' }}>Solutions</span>
                <ChevronDown className="ml-1 h-4 w-4" style={{ color: '#1e40af' }} />
              </button>
              {showSolutions && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
                  onMouseEnter={() => setShowSolutions(true)}
                  onMouseLeave={() => setShowSolutions(false)}
                >
                  {solutions.map((solution) => (
                    <Link
                      key={solution.href}
                      to={solution.href}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: '#374151 !important' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.color = '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#374151';
                      }}
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowIndustries(true)}
              onMouseLeave={() => setShowIndustries(false)}
            >
              <button 
                className="flex items-center text-sm font-medium transition-colors hover:text-blue-600"
                style={{ 
                  color: '#1e40af',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span style={{ color: '#1e40af' }}>Industries</span>
                <ChevronDown className="ml-1 h-4 w-4" style={{ color: '#1e40af' }} />
              </button>
              {showIndustries && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
                  onMouseEnter={() => setShowIndustries(true)}
                  onMouseLeave={() => setShowIndustries(false)}
                >
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      to={industry.href}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: '#374151 !important' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.color = '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#374151';
                      }}
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/implementation" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/implementation') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Implementation
            </Link>

            <Link 
              to="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/pricing') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Pricing
            </Link>

            <Link 
              to="/case-studies" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/case-studies') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Case Studies
            </Link>

            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/faq') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              FAQ
            </Link>

            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About
            </Link>

            <Link 
              to="/roi-calculator" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/roi-calculator') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              ROI Calculator
            </Link>

            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="transition-colors p-2 rounded hover:bg-blue-700"
              style={{ 
                color: '#ffffff',
                backgroundColor: '#2563eb',
                border: '2px solid #2563eb',
                outline: 'none'
              }}
            >
              {isOpen ? 
                <X className="h-6 w-6" style={{ color: '#ffffff' }} /> : 
                <Menu className="h-6 w-6" style={{ color: '#ffffff' }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div className="space-y-2">
                <div className="text-base font-medium text-gray-900">Solutions</div>
                {solutions.map((solution) => (
                  <Link
                    key={solution.href}
                    to={solution.href}
                    className="block pl-4 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-base font-medium text-gray-900">Industries</div>
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    to={industry.href}
                    className="block pl-4 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>

              <Link 
                to="/implementation" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Implementation
              </Link>

              <Link 
                to="/pricing" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>

              <Link 
                to="/case-studies" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>

              <Link 
                to="/faq" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>

              <Link 
                to="/about" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link 
                to="/roi-calculator" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ROI Calculator
              </Link>

              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

