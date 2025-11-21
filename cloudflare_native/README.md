# Cloudflare Native Port (PoC)

This directory contains a **Proof of Concept** for running Perfex-like functionality natively on Cloudflare Workers, D1, and Queues.

## Perfex (Cloudflare Native)

This is a Proof of Concept (PoC) for running **Perfex** natively on Cloudflare's stack.

## Architecture

-   **Backend**: Hono (Cloudflare Workers)
-   **Database**: Cloudflare D1 (SQLite)
-   **Queue**: Cloudflare Queues
-   **Frontend**: React + Vite + Shadcn UI (Cloudflare Pages) Ported

## Prerequisites
1.  Node.js & npm
2.  Cloudflare Account
3.  Wrangler CLI (`npm install -g wrangler`)

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    cd cloudflare_native
    npm install
    ```

2.  **Create D1 Database**:
    ```bash
    wrangler d1 create erpnext-poc-db
    ```
    *Copy the `database_id` from the output and update `wrangler.toml`.*

3.  **Create Queue**:
    ```bash
    wrangler queues create erpnext-jobs
    ```

4.  **Apply Schema Migration**:
    ```bash
    wrangler d1 execute erpnext-poc-db --file=schema.sql
    ```
    *For local testing, add `--local` flag.*

5.  **Run Locally**:
    ```bash
    npm run dev
    ```

6.  **Deploy**:
    ```bash
    npm run deploy
    ```

## API Usage

- **List ToDos**: `GET /todos`
- **Create ToDo**: `POST /todos`
  ```json
  {
    "description": "Test Native Port",
    "status": "Open"
  }
  ```
  *This will also trigger a background job in the Queue.*
