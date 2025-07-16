import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChimeLogo from './ChimeLogo'

const FixedNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)
  const [showIndustries, setShowIndustries] = useState(false)
  const location = useLocation()
  const solutionsRef = useRef(null)
  const industriesRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setShowSolutions(false)
      }
      if (industriesRef.current && !industriesRef.current.contains(event.target)) {
        setShowIndustries(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    <header role="banner">
      <nav className="nav-premium" role="navigation" aria-label="Main navigation">
        <div className="container-premium">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center" aria-label="Chime homepage">
              <ChimeLogo className="h-8" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center nav-links" role="menubar">
              {/* Solutions Dropdown */}
              <div 
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setShowSolutions(true)}
                onMouseLeave={() => setShowSolutions(false)}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={showSolutions}
              >
                <button 
                  className="nav-link flex items-center"
                  aria-label="AI Engines menu"
                  aria-controls="solutions-menu"
                  onClick={() => setShowSolutions(!showSolutions)}
                  style={{ 
                    color: '#1e40af',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  <span style={{ color: '#1e40af' }}>AI Engines</span>
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`} 
                    style={{ color: '#1e40af' }} 
                    aria-hidden="true" 
                  />
                </button>
                {showSolutions && (
                  <div 
                    id="solutions-menu"
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50 animate-in fade-in-0 zoom-in-95"
                    role="menu"
                    aria-label="AI Engines submenu"
                  >
                    {solutions.map((solution) => (
                      <Link
                        key={solution.href}
                        to={solution.href}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                        role="menuitem"
                        style={{ color: '#374151' }}
                        onClick={() => setShowSolutions(false)}
                      >
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div 
                ref={industriesRef}
                className="relative"
                onMouseEnter={() => setShowIndustries(true)}
                onMouseLeave={() => setShowIndustries(false)}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={showIndustries}
              >
                <button 
                  className="flex items-center text-xs font-medium transition-colors hover:text-blue-600"
                  aria-label="Industries menu"
                  aria-controls="industries-menu"
                  onClick={() => setShowIndustries(!showIndustries)}
                  style={{ 
                    color: '#1e40af',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  <span style={{ color: '#1e40af' }}>Industries</span>
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${showIndustries ? 'rotate-180' : ''}`} 
                    style={{ color: '#1e40af' }} 
                    aria-hidden="true" 
                  />
                </button>
                {showIndustries && (
                  <div 
                    id="industries-menu"
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50 animate-in fade-in-0 zoom-in-95"
                    role="menu"
                    aria-label="Industries submenu"
                  >
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        to={industry.href}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                        role="menuitem"
                        style={{ color: '#374151' }}
                        onClick={() => setShowIndustries(false)}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/implementation" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/implementation') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/implementation') ? 'page' : undefined}
              >
                Implementation
              </Link>

              <Link 
                to="/pricing" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/pricing') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/pricing') ? 'page' : undefined}
              >
                Pricing
              </Link>

              <Link 
                to="/case-studies" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/case-studies') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/case-studies') ? 'page' : undefined}
              >
                Case Studies
              </Link>

              <Link 
                to="/faq" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/faq') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/faq') ? 'page' : undefined}
              >
                FAQ
              </Link>

              <Link 
                to="/about" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/about') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                About
              </Link>

              <Link 
                to="/roi-calculator" 
                className={`text-xs font-medium transition-colors hover:text-blue-600 ${
                  isActive('/roi-calculator') ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive('/roi-calculator') ? 'page' : undefined}
              >
                ROI Calculator
              </Link>

              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/contact" role="menuitem">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="transition-colors p-2 rounded hover:bg-blue-700"
                aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                style={{ 
                  color: '#ffffff',
                  backgroundColor: '#2563eb',
                  border: '2px solid #2563eb',
                  outline: 'none'
                }}
              >
                {isOpen ? 
                  <X className="h-6 w-6" style={{ color: '#ffffff' }} aria-hidden="true" /> : 
                  <Menu className="h-6 w-6" style={{ color: '#ffffff' }} aria-hidden="true" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div 
              id="mobile-menu"
              className="md:hidden py-4 border-t"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                <div className="space-y-2" role="group" aria-labelledby="mobile-solutions-heading">
                  <div id="mobile-solutions-heading" className="text-base font-medium text-gray-900">AI Engines</div>
                  {solutions.map((solution) => (
                    <Link
                      key={solution.href}
                      to={solution.href}
                      className="block pl-4 text-sm text-gray-600 hover:text-blue-600"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-2" role="group" aria-labelledby="mobile-industries-heading">
                  <div id="mobile-industries-heading" className="text-base font-medium text-gray-900">Industries</div>
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      to={industry.href}
                      className="block pl-4 text-sm text-gray-600 hover:text-blue-600"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>

                <Link 
                  to="/implementation" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Implementation
                </Link>

                <Link 
                  to="/pricing" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>

                <Link 
                  to="/case-studies" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Case Studies
                </Link>

                <Link 
                  to="/faq" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>

                <Link 
                  to="/about" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                <Link 
                  to="/roi-calculator" 
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  ROI Calculator
                </Link>

                <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                  <Link to="/contact" role="menuitem" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default FixedNavigation

