#!/bin/bash

# Helper script to deploy Perfex Cloudflare Native

echo "🚀 Starting Deployment Process for Perfex..."

# Check if logged in
if ! npx wrangler whoami &> /dev/null; then
    echo "❌ You are not logged in to Cloudflare."
    echo "👉 Run 'npx wrangler login' first."
    exit 1
fi

echo "✅ Authenticated with Cloudflare."

# Ask for Environment
echo "Select Environment to deploy to:"
echo "1) Development (default)"
echo "2) Staging"
echo "3) Production"
read -p "Enter choice [1-3]: " ENV_CHOICE

case $ENV_CHOICE in
    2)
        ENV_FLAG="--env staging"
        ENV_NAME="staging"
        PROJECT_NAME="perfex-frontend-staging"
        ;;
    3)
        ENV_FLAG="--env production"
        ENV_NAME="production"
        PROJECT_NAME="perfex-frontend-prod"
        ;;
    *)
        ENV_FLAG="" # Default is dev
        ENV_NAME="dev"
        PROJECT_NAME="perfex-frontend-dev"
        ;;
esac

# Deploy Backend
echo "📦 Deploying Backend to $ENV_NAME..."
npx wrangler deploy $ENV_FLAG
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed."
    exit 1
fi

# Get Worker URL
echo "⚠️  IMPORTANT: Please enter your deployed Worker URL for $ENV_NAME (e.g., https://perfex-native-$ENV_NAME.subdomain.workers.dev):"
read WORKER_URL

if [ -z "$WORKER_URL" ]; then
    echo "❌ Worker URL is required for frontend build."
    exit 1
fi

# Deploy Frontend
echo "🎨 Building and Deploying Frontend to $ENV_NAME..."
cd frontend
VITE_API_URL="$WORKER_URL/api" npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed."
    exit 1
fi

npx wrangler pages deploy dist --project-name=$PROJECT_NAME
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed."
    exit 1
fi

echo "🎉 Deployment to $ENV_NAME Complete!"
