# Perfex Cloudflare Native - Advanced Deployment Guide

This guide covers the "State of the Art" deployment process using Multi-Environment setup (Staging/Production) and CI/CD with GitHub Actions.

## Prerequisites

1.  **Cloudflare Account**: You need a Cloudflare account.
2.  **GitHub Repository**: The project must be hosted on GitHub.
3.  **Wrangler CLI**: Installed locally (`npm install -g wrangler`).

## 1. Environment Setup

We use `wrangler.toml` to define environments.

### Database Setup (D1)

Create three D1 databases:

```bash
# Development
wrangler d1 create perfex-dev-db

# Staging
wrangler d1 create perfex-staging-db

# Production
wrangler d1 create perfex-prod-db
```

Update `wrangler.toml` with the `database_id` for each environment.

### Schema Migration

Apply schema to all environments:

```bash
# Dev
wrangler d1 execute perfex-dev-db --file=./schema.sql

# Staging
wrangler d1 execute perfex-staging-db --file=./schema.sql --remote

# Production
wrangler d1 execute perfex-prod-db --file=./schema.sql --remote
```

## 2. CI/CD Setup (GitHub Actions)

The workflow is defined in `.github/workflows/deploy.yml`.

### Secrets

Go to your GitHub Repository -> Settings -> Secrets and Variables -> Actions.
Add the following Repository Secrets:

-   `CLOUDFLARE_API_TOKEN`: Create this in Cloudflare Dashboard (My Profile -> API Tokens -> Edit Cloudflare Workers).
-   `CLOUDFLARE_ACCOUNT_ID`: Find this in Cloudflare Dashboard URL or Sidebar.

### Workflow Strategy

-   **Push to `develop`**: Deploys to **Staging** environment.
    -   Backend: `perfex-native-staging` (Worker)
    -   Frontend: `perfex-frontend-staging` (Pages)
-   **Push to `main`**: Deploys to **Production** environment.
    -   Backend: `perfex-native-prod` (Worker)
    -   Frontend: `perfex-frontend-prod` (Pages)

## 3. Manual Deployment (Fallback)

You can deploy manually using the helper script `./deploy.sh` which guides you through the process.

Or run commands individually:

```bash
# 1. Deploy Backend
wrangler deploy --env staging

# 2. Build Frontend (Inject API URL)
cd frontend
# Replace with your actual Worker URL
VITE_API_URL=https://perfex-native-staging.YOUR-SUBDOMAIN.workers.dev/api npm run build

# 3. Deploy Frontend
wrangler pages deploy dist --project-name perfex-frontend-staging
```

## 4. Verification

After deployment, verify:
1.  **Staging**: https://perfex-frontend-staging.pages.dev
2.  **Production**: https://perfex-frontend-prod.pages.dev
). You should see the ERPNext dashboard and be able to interact with the API.
