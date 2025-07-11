import React from 'react'
import { Link } from 'react-router-dom'
import './BorderedButton.css'

const BorderedButton = ({ to, children, variant = 'primary', className = '' }) => {
  const baseStyles = 'w-full py-4 px-6 rounded-lg font-semibold transition-colors text-center block forced-border-button'
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-blue-600'
  }
  
  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

export default BorderedButton

