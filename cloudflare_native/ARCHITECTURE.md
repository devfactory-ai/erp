# Cloudflare Native ERPNext Architecture

This document outlines the architecture of the Cloudflare Native port of ERPNext.

## System Overview

The system is built entirely on the Cloudflare Developer Platform, leveraging serverless technologies for scalability, performance, and low maintenance.

### Components

1.  **Cloudflare Workers**: The core compute layer. We use **Hono** as a lightweight, ultrafast web framework to handle HTTP requests and routing.
2.  **Cloudflare D1**: A native serverless SQL database (SQLite) used for storing all DocType data.
3.  **Cloudflare Queues**: Asynchronous message queues for background jobs (e.g., sending emails, processing stock updates).
4.  **Cron Triggers**: Scheduled events for recurring tasks (e.g., daily summaries, maintenance).

## Architecture Diagram

```mermaid
graph TD
    Client[Client / Frontend] -->|HTTP Request| Worker[Cloudflare Worker (Hono)]
    
    subgraph "Worker Layer"
        Worker --> Router{Router}
        Router --> ModCore[Core Module]
        Router --> ModSelling[Selling Module]
        Router --> ModBuying[Buying Module]
        Router --> ModStock[Stock Module]
        Router --> ModAccounts[Accounts Module]
        Router --> ModOther[Other Modules...]
    end
    
    subgraph "Data Layer"
        ModCore -->|SQL| D1[(Cloudflare D1 Database)]
        ModSelling -->|SQL| D1
        ModBuying -->|SQL| D1
        ModStock -->|SQL| D1
        ModAccounts -->|SQL| D1
    end
    
    subgraph "Async Layer"
        Worker -->|Enqueue| Queue[Cloudflare Queue]
        Queue -->|Process| Consumer[Queue Consumer Worker]
        Consumer -->|Update| D1
    end
    
    subgraph "Scheduled Layer"
        Cron[Cron Trigger] -->|Trigger| Worker
    end
```

## Modular Design

The codebase follows ERPNext's modular philosophy. Each module is isolated in its own directory under `src/modules/`.

### Directory Structure

```
src/
├── index.ts                  # Main Entry Point & Router
├── modules/
│   ├── core/                 # Core System (ToDo, etc.)
│   ├── selling/              # Sales (Customer, Quotation, Order)
│   ├── buying/               # Purchasing (Supplier, Order, Receipt)
│   ├── stock/                # Inventory (Item, Entry, Delivery, Material Request)
│   ├── accounts/             # Accounting (Invoice, Payment, Journal)
│   ├── crm/                  # CRM (Lead)
│   ├── projects/             # Projects
│   ├── manufacturing/        # Manufacturing (BOM)
│   ├── assets/               # Assets
│   ├── support/              # Support (Issue)
│   ├── quality_management/   # Quality
│   ├── maintenance/          # Maintenance
│   ├── communication/        # Communication
│   ├── subcontracting/       # Subcontracting
│   └── setup/                # Setup (Company)
```

## Data Flow

1.  **Request**: A request hits the Worker (e.g., `POST /api/selling/sales-order`).
2.  **Routing**: `src/index.ts` routes the request to `src/modules/selling/sales_order/index.ts`.
3.  **Logic**: The module executes business logic (validation, calculation).
4.  **Persistence**: Data is written to D1 via SQL.
5.  **Background**: If needed, a job is pushed to the Queue (e.g., "Email Customer").
6.  **Response**: JSON response is returned to the client.

## Key Benefits

-   **Zero Ops**: No servers to manage, patch, or scale.
-   **Global Latency**: Code runs on Cloudflare's global network, close to users.
-   **Cost Efficiency**: Pay only for request time and storage.
-   **Instant Scalability**: Automatically handles traffic spikes.
