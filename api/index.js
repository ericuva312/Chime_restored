import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  // Set security headers
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.calendly.com; frame-src 'self' https://calendly.com; object-src 'none'; base-uri 'self'; form-action 'self';")

  // Serve the index.html file
  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html')
    const html = fs.readFileSync(indexPath, 'utf8')
    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (error) {
    res.status(500).json({ error: 'Failed to serve page' })
  }
}

