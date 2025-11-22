#!/bin/bash

# Automated Staging Deployment Script
# No user input required

# ------------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------------
# Replace this with your actual Staging Worker URL
# You can find this in your Cloudflare Dashboard > Workers > perfex-native-staging
WORKER_URL="https://perfex-native-staging.yassine-techini.workers.dev"
# ------------------------------------------------------------------

echo "🚀 Starting Automated Staging Deployment..."

# 1. Deploy Backend
echo "📦 Deploying Backend to Staging..."
npx wrangler deploy --env staging
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed."
    exit 1
fi

# 2. Build Frontend
echo "🎨 Building Frontend..."
cd frontend
VITE_API_URL="$WORKER_URL/api" npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed."
    exit 1
fi

# 3. Deploy Frontend to Pages
echo "🚀 Deploying to Cloudflare Pages (Staging)..."
npx wrangler pages deploy dist --project-name=perfex-frontend-staging
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed."
    exit 1
fi

echo "✅ Staging Deployment Complete!"
echo "🌍 Frontend URL: https://perfex-frontend-staging.pages.dev"
