#!/bin/bash

# Helper script to deploy ERPNext Cloudflare Native

echo "🚀 Starting Deployment Process..."

# Check if logged in
if ! npx wrangler whoami &> /dev/null; then
    echo "❌ You are not logged in to Cloudflare."
    echo "👉 Run 'npx wrangler login' first."
    exit 1
fi

echo "✅ Authenticated with Cloudflare."

# Deploy Backend
echo "📦 Deploying Backend..."
npx wrangler deploy
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed."
    exit 1
fi

# Get Worker URL (This is a bit hacky, better to ask user or use a known domain)
echo "⚠️  IMPORTANT: Please enter your deployed Worker URL (e.g., https://erpnext-native-poc.subdomain.workers.dev):"
read WORKER_URL

if [ -z "$WORKER_URL" ]; then
    echo "❌ Worker URL is required for frontend build."
    exit 1
fi

# Deploy Frontend
echo "🎨 Building and Deploying Frontend..."
cd frontend
VITE_API_URL="$WORKER_URL/api" npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed."
    exit 1
fi

npx wrangler pages deploy dist --project-name=erpnext-frontend
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed."
    exit 1
fi

echo "🎉 Deployment Complete!"
