#!/bin/bash

# Chime Website - Vercel Deployment Script
# Run this script after authenticating with Vercel CLI

echo "🚀 Deploying Chime Website to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel. Please run: vercel login"
    echo "   Then run this script again."
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix build errors and try again."
    exit 1
fi

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Copy the deployment URL from above"
    echo "2. Add chimehq.co as a custom domain in Vercel dashboard"
    echo "3. Configure DNS records as instructed by Vercel"
    echo ""
    echo "🌐 Your Implementation page fixes are now live!"
else
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi

