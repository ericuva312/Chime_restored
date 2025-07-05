import { useState, useEffect } from 'react'
import { CheckCircle, TrendingUp, Users, Zap } from 'lucide-react'

const RealTimeNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const notifications = [
    {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      message: "Sarah D. from Coastal Threads just increased revenue by 28%",
      time: "2 minutes ago"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      message: "Michael R. at Summit Electronics completed AI setup",
      time: "4 minutes ago"
    },
    {
      icon: <Users className="h-4 w-4 text-purple-500" />,
      message: "Jennifer L. recovered $8,400 in abandoned carts today",
      time: "7 minutes ago"
    },
    {
      icon: <Zap className="h-4 w-4 text-orange-500" />,
      message: "David K. from Pure Wellness automated inventory management",
      time: "11 minutes ago"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      message: "Amanda S. at Artisan Home just started free analysis",
      time: "14 minutes ago"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      message: "Carlos M. from Urban Gear increased AOV by 52%",
      time: "17 minutes ago"
    },
    {
      icon: <Users className="h-4 w-4 text-purple-500" />,
      message: "Lisa T. at Garden Grove optimized pricing strategy",
      time: "21 minutes ago"
    },
    {
      icon: <Zap className="h-4 w-4 text-orange-500" />,
      message: "Robert H. from Tech Solutions automated email campaigns",
      time: "24 minutes ago"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      message: "Maria G. at Bella Vista increased conversion rate by 34%",
      time: "28 minutes ago"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      message: "James P. from Nordic Outdoors recovered $15,200 this week",
      time: "31 minutes ago"
    },
    {
      icon: <Users className="h-4 w-4 text-purple-500" />,
      message: "Rachel W. at Luxe Beauty implemented personalization",
      time: "35 minutes ago"
    },
    {
      icon: <Zap className="h-4 w-4 text-orange-500" />,
      message: "Kevin B. from Metro Sports optimized checkout flow",
      time: "38 minutes ago"
    }
  ]

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
      setCurrentNotification(randomNotification)
      setIsVisible(true)

      setTimeout(() => {
        setIsVisible(false)
      }, 4000)
    }

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000)

    // Then show notifications every 8-12 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 4000 + 8000 // 8-12 seconds
      setTimeout(showNotification, randomDelay)
    }, 12000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!currentNotification || !isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <div className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {currentNotification.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {currentNotification.message}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentNotification.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeNotifications

