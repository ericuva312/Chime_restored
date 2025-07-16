import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import FixedNavigation from './components/FixedNavigation'
import EnhancedFooter from './components/EnhancedFooter'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import ROICalculatorPage from './pages/ROICalculatorPage'
import ImplementationPage from './pages/ImplementationPage'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import FAQPage from './pages/FAQPage'
import { 
  CartRecoveryPage, 
  EmailAutomationPage, 
  InventoryManagementPage, 
  PricingOptimizationPage 
} from './pages/SolutionsPages'
import { 
  FashionApparelPage, 
  ElectronicsPage, 
  HealthWellnessPage, 
  HomeGardenPage,
  BeautyPage,
  FoodPage,
  PetsPage
} from './pages/IndustryPages'
import './App.css'
import './hide-manus-badge.css'

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <FixedNavigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/implementation" element={<ImplementationPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Solutions Pages */}
            <Route path="/solutions/cart-recovery" element={<CartRecoveryPage />} />
            <Route path="/solutions/email" element={<EmailAutomationPage />} />
            <Route path="/solutions/inventory" element={<InventoryManagementPage />} />
            <Route path="/solutions/pricing" element={<PricingOptimizationPage />} />
            
            {/* Industry Pages */}
            <Route path="/industries/fashion" element={<FashionApparelPage />} />
            <Route path="/industries/electronics" element={<ElectronicsPage />} />
            <Route path="/industries/health" element={<HealthWellnessPage />} />
            <Route path="/industries/home-garden" element={<HomeGardenPage />} />
            <Route path="/industries/beauty" element={<BeautyPage />} />
            <Route path="/industries/food" element={<FoodPage />} />
            <Route path="/industries/pets" element={<PetsPage />} />
          </Routes>
        </main>
        <EnhancedFooter />
      </div>
    </Router>
  )
}

export default App

