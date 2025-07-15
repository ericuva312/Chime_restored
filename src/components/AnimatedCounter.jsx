import { useState, useEffect, useRef } from 'react'

const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Special handling for 24/7 format
      if (typeof end === 'string' && end === '24/7') {
        const currentCount = Math.floor(progress * 24)
        setCount(currentCount)
      } else {
        // Extract numeric value from end prop for other formats
        const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/[^\d.]/g, '')) : end
        // Use proper rounding for decimal values, especially percentages
        const currentCount = progress === 1 ? numericEnd : Math.floor(progress * numericEnd * 10) / 10
        setCount(currentCount)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  const formatCount = () => {
    // Special handling for 24/7 format
    if (typeof end === 'string' && end === '24/7') {
      return `${count}/7`
    }
    if (typeof end === 'string' && end.includes('%')) {
      // For percentages, show decimal if the original has decimal
      const hasDecimal = end.includes('.')
      return hasDecimal ? `${count}%` : `${Math.floor(count)}%`
    }
    if (typeof end === 'string' && end.includes('+')) {
      return `${Math.floor(count)}+`
    }
    if (typeof end === 'string' && end.includes('/')) {
      return end.replace(/\d+/, Math.floor(count))
    }
    return Math.floor(count)
  }

  return (
    <span ref={counterRef} className="inline-block">
      {prefix}{formatCount()}{suffix}
    </span>
  )
}

export default AnimatedCounter

