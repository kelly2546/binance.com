#!/bin/bash

echo "🚀 Deploying Cryptocurrency Trading Platform to Vercel"
echo "=================================================="

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "Starting deployment process..."

# Login to Vercel (this will open browser for authentication)
echo "Please authenticate with Vercel in your browser..."
npx vercel login

# Deploy to production
echo "Deploying to production..."
npx vercel --prod --yes

echo "✅ Deployment complete!"
echo "Your cryptocurrency trading platform should now be live on Vercel."