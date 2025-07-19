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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setShowSolutions(false)
    setShowIndustries(false)
  }, [location])

  const solutions = [
    { name: 'Revenue Optimization Engine', href: '/solutions/cart-recovery' },
    { name: 'Strategic Growth Engine', href: '/solutions/email' },
    { name: 'Operational Excellence Engine', href: '/solutions/inventory' },
    { name: 'Customer Success Engine', href: '/solutions/pricing' }
  ]

  const industries = [
    { name: 'Fashion & Apparel', href: '/industries/fashion' },
    { name: 'Electronics', href: '/industries/electronics' },
    { name: 'Health & Wellness', href: '/industries/health' },
    { name: 'Beauty & Cosmetics', href: '/industries/beauty' },
    { name: 'Home & Garden', href: '/industries/home-garden' },
    { name: 'Food & Beverage', href: '/industries/food' },
    { name: 'Pet Products', href: '/industries/pets' }
  ]

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <style jsx>{`
        /* Navigation Font Consistency */
        .nav-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .nav-link:hover {
          color: #3b82f6;
          background-color: #f8fafc;
        }
        
        .nav-link.active {
          color: #3b82f6;
          background-color: #eff6ff;
        }
        
        .nav-button {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }
        
        .nav-button.primary {
          background-color: #3b82f6;
          color: white;
          border: 1px solid #3b82f6;
        }
        
        .nav-button.primary:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        
        .nav-button.secondary {
          background-color: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        
        .nav-button.secondary:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }
        
        /* Mobile Menu Styles */
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          max-height: calc(100vh - 64px);
          overflow-y: auto;
        }
        
        .mobile-nav-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          display: block;
          transition: background-color 0.2s ease;
        }
        
        .mobile-nav-link:hover {
          background-color: #f9fafb;
          color: #3b82f6;
        }
        
        .mobile-nav-link.active {
          background-color: #eff6ff;
          color: #3b82f6;
        }
        
        /* Dropdown Styles */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          z-index: 50;
        }
        
        .dropdown-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #374151;
          text-decoration: none;
          padding: 0.75rem 1rem;
          display: block;
          transition: background-color 0.2s ease;
        }
        
        .dropdown-link:hover {
          background-color: #f9fafb;
          color: #3b82f6;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-nav {
            display: flex;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex;
          }
          
          .mobile-nav {
            display: none;
          }
          
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Chime homepage">
            <ChimeLogo className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav items-center space-x-6" role="menubar">
            {/* AI Engines Dropdown */}
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
                className="nav-link"
                aria-label="AI Engines menu"
                aria-controls="solutions-menu"
                onClick={() => setShowSolutions(!showSolutions)}
              >
                AI Engines
                <ChevronDown 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`} 
                  aria-hidden="true" 
                />
              </button>
              {showSolutions && (
                <div 
                  id="solutions-menu"
                  className="dropdown-menu"
                  role="menu"
                  aria-label="AI Engines submenu"
                >
                  {solutions.map((solution) => (
                    <Link
                      key={solution.href}
                      to={solution.href}
                      className="dropdown-link"
                      role="menuitem"
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
                className="nav-link"
                aria-label="Industries menu"
                aria-controls="industries-menu"
                onClick={() => setShowIndustries(!showIndustries)}
              >
                Industries
                <ChevronDown 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${showIndustries ? 'rotate-180' : ''}`} 
                  aria-hidden="true" 
                />
              </button>
              {showIndustries && (
                <div 
                  id="industries-menu"
                  className="dropdown-menu"
                  role="menu"
                  aria-label="Industries submenu"
                >
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      to={industry.href}
                      className="dropdown-link"
                      role="menuitem"
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
              className={`nav-link ${isActive('/implementation') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/implementation') ? 'page' : undefined}
            >
              Implementation
            </Link>

            <Link 
              to="/pricing" 
              className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/pricing') ? 'page' : undefined}
            >
              Pricing
            </Link>

            <Link 
              to="/case-studies" 
              className={`nav-link ${isActive('/case-studies') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/case-studies') ? 'page' : undefined}
            >
              Case Studies
            </Link>

            <Link 
              to="/faq" 
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/faq') ? 'page' : undefined}
            >
              FAQ
            </Link>

            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
            </Link>

            <Link 
              to="/roi-calculator" 
              className={`nav-link ${isActive('/roi-calculator') ? 'active' : ''}`}
              role="menuitem"
              aria-current={isActive('/roi-calculator') ? 'page' : undefined}
            >
              ROI Calculator
            </Link>

            <Button asChild className="nav-button primary">
              <Link to="/contact" role="menuitem">
                Book Strategy Call
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-nav">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 font-medium text-sm transition-colors duration-200"
              aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="mobile-menu"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div className="py-2">
                <div className="text-sm font-semibold text-gray-900 px-3 py-2">AI Engines</div>
                {solutions.map((solution) => (
                  <Link
                    key={solution.href}
                    to={solution.href}
                    className="mobile-nav-link pl-6"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>

              <div className="py-2">
                <div className="text-sm font-semibold text-gray-900 px-3 py-2">Industries</div>
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    to={industry.href}
                    className="mobile-nav-link pl-6"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>

              <Link 
                to="/implementation" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Implementation
              </Link>

              <Link 
                to="/pricing" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>

              <Link 
                to="/case-studies" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>

              <Link 
                to="/faq" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>

              <Link 
                to="/about" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link 
                to="/roi-calculator" 
                className="mobile-nav-link"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                ROI Calculator
              </Link>

              <div className="px-3 py-4 space-y-2">
                <Button asChild className="nav-button secondary w-full">
                  <Link to="/contact" role="menuitem" onClick={() => setIsOpen(false)}>
                    Book Strategy Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default FixedNavigation

