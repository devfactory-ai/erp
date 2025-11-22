#!/bin/bash

# Automated Dev Deployment Script
# No user input required

# ------------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------------
# Dev Worker URL
WORKER_URL="https://perfex-native-poc.yassine-techini.workers.dev"
# ------------------------------------------------------------------

echo "🚀 Starting Automated Dev Deployment..."

# 1. Deploy Backend (Default/Dev environment)
echo "📦 Deploying Backend to Dev..."
npx wrangler deploy
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed."
    exit 1
fi

# 2. Build Frontend
echo "🎨 Building Frontend..."
cd frontend
# Clean previous build to avoid caching issues
rm -rf dist
VITE_API_URL="$WORKER_URL/api" npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed."
    exit 1
fi

# 3. Deploy Frontend to Pages
echo "🚀 Deploying to Cloudflare Pages (Dev)..."
npx wrangler pages deploy dist --project-name=perfex-frontend-dev
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed."
    exit 1
fi

echo "✅ Dev Deployment Complete!"
echo "🌍 Frontend URL: https://perfex-frontend-dev.pages.dev"
