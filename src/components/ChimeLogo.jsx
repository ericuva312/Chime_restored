const ChimeLogo = ({ className = "h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 140 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Modern Geometric C shape - reduced by additional 33% */}
      <path d="M6 16C6 11.58 9.58 8 14 8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 16C6 14.34 7.34 13 9 13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Chime Text - bottom-aligned with arc bottom */}
      <text 
        x="20" 
        y="16" 
        fontFamily="Poppins, sans-serif" 
        fontSize="12" 
        fontWeight="600" 
        fill="#1e293b"
      >
        Chime
      </text>
    </svg>
  )
}

export default ChimeLogo

