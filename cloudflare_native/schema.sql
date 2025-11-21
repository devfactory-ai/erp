-- Core: ToDo
DROP TABLE IF EXISTS ToDo;
CREATE TABLE ToDo (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    owner TEXT,
    description TEXT,
    status TEXT DEFAULT 'Open',
    priority TEXT DEFAULT 'Medium',
    date TEXT,
    allocated_to TEXT
);

-- Selling: Customer
DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer_name TEXT,
    customer_type TEXT DEFAULT 'Company',
    customer_group TEXT,
    territory TEXT,
    email_id TEXT,
    mobile_no TEXT
);

-- Stock: Item
DROP TABLE IF EXISTS Item;
CREATE TABLE Item (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    item_code TEXT UNIQUE,
    item_name TEXT,
    item_group TEXT,
    stock_uom TEXT,
    valuation_rate REAL DEFAULT 0.0,
    description TEXT
);

-- Accounts: Sales Invoice
DROP TABLE IF EXISTS SalesInvoice;
CREATE TABLE SalesInvoice (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer TEXT,
    posting_date TEXT,
    due_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft',
    currency TEXT DEFAULT 'USD'
);

-- Buying: Supplier
DROP TABLE IF EXISTS Supplier;
CREATE TABLE Supplier (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    supplier_name TEXT,
    supplier_type TEXT DEFAULT 'Company',
    supplier_group TEXT,
    email_id TEXT,
    mobile_no TEXT
);

-- Projects: Project
DROP TABLE IF EXISTS Project;
CREATE TABLE IF NOT EXISTS Project (
    name TEXT PRIMARY KEY,
    project_name TEXT,
    project_type TEXT,
    expected_start_date TEXT,
    expected_end_date TEXT,
    status TEXT,
    creation TEXT,
    modified TEXT
);

CREATE TABLE IF NOT EXISTS OnboardingStep (
    name TEXT PRIMARY KEY,
    step_name TEXT,
    is_complete INTEGER DEFAULT 0,
    completed_at TEXT
);

CREATE TABLE IF NOT EXISTS WorkOrder (
    name TEXT PRIMARY KEY,
    production_item TEXT,
    qty REAL,
    status TEXT,
    creation TEXT,
    modified TEXT
);

CREATE TABLE IF NOT EXISTS JobCard (
    name TEXT PRIMARY KEY,
    work_order TEXT,
    operation TEXT,
    status TEXT,
    creation TEXT,
    modified TEXT
);

CREATE TABLE IF NOT EXISTS AssetCategory (
    name TEXT PRIMARY KEY,
    category_name TEXT,
    depreciation_method TEXT
);

CREATE TABLE IF NOT EXISTS AssetMovement (
    name TEXT PRIMARY KEY,
    asset TEXT,
    target_location TEXT,
    transaction_date TEXT
);

CREATE TABLE IF NOT EXISTS MaintenanceSchedule (
    name TEXT PRIMARY KEY,
    item_code TEXT,
    schedule_date TEXT,
    status TEXT
);

CREATE TABLE IF NOT EXISTS QualityInspection (
    name TEXT PRIMARY KEY,
    reference_type TEXT,
    reference_name TEXT,
    status TEXT
);

CREATE TABLE IF NOT EXISTS SubcontractingReceipt (
    name TEXT PRIMARY KEY,
    supplier TEXT,
    purchase_order TEXT,
    status TEXT
);

-- CRM: Lead
DROP TABLE IF EXISTS Lead;
CREATE TABLE Lead (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    lead_name TEXT,
    email_id TEXT,
    mobile_no TEXT,
    status TEXT DEFAULT 'Lead',
    source TEXT
);

-- Manufacturing: BOM
DROP TABLE IF EXISTS BOM;
CREATE TABLE BOM (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    item TEXT,
    quantity REAL DEFAULT 1.0,
    is_active INTEGER DEFAULT 1,
    is_default INTEGER DEFAULT 0,
    operating_cost REAL DEFAULT 0.0
);

-- Assets: Asset
DROP TABLE IF EXISTS Asset;
CREATE TABLE Asset (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    asset_name TEXT,
    item_code TEXT,
    gross_purchase_amount REAL DEFAULT 0.0,
    purchase_date TEXT,
    status TEXT DEFAULT 'Draft'
);

-- Support: Issue
DROP TABLE IF EXISTS Issue;
CREATE TABLE Issue (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    subject TEXT,
    raised_by TEXT,
    status TEXT DEFAULT 'Open',
    priority TEXT DEFAULT 'Medium',
    description TEXT
);

-- Quality Management: Quality Goal
DROP TABLE IF EXISTS QualityGoal;
CREATE TABLE QualityGoal (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    goal TEXT,
    frequency TEXT DEFAULT 'Monthly',
    status TEXT DEFAULT 'Open'
);

-- Maintenance: Maintenance Visit
DROP TABLE IF EXISTS MaintenanceVisit;
CREATE TABLE MaintenanceVisit (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer TEXT,
    maintenance_type TEXT DEFAULT 'Scheduled',
    completion_status TEXT DEFAULT 'Pending',
    visit_date TEXT
);

-- Setup: Company
DROP TABLE IF EXISTS Company;
CREATE TABLE Company (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    company_name TEXT,
    default_currency TEXT DEFAULT 'USD',
    country TEXT
);

-- Selling: Sales Order
DROP TABLE IF EXISTS SalesOrder;
CREATE TABLE SalesOrder (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer TEXT,
    transaction_date TEXT,
    delivery_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Buying: Purchase Order
DROP TABLE IF EXISTS PurchaseOrder;
CREATE TABLE PurchaseOrder (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    supplier TEXT,
    transaction_date TEXT,
    schedule_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Stock: Stock Entry
DROP TABLE IF EXISTS StockEntry;
CREATE TABLE StockEntry (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    stock_entry_type TEXT DEFAULT 'Material Receipt',
    posting_date TEXT,
    purpose TEXT DEFAULT 'Material Receipt',
    status TEXT DEFAULT 'Draft'
);

-- Communication: Communication
DROP TABLE IF EXISTS Communication;
CREATE TABLE Communication (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    subject TEXT,
    content TEXT,
    communication_type TEXT DEFAULT 'Communication',
    sender TEXT,
    recipients TEXT,
    status TEXT DEFAULT 'Open'
);

-- Subcontracting: Subcontracting Order
DROP TABLE IF EXISTS SubcontractingOrder;
CREATE TABLE SubcontractingOrder (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    supplier TEXT,
    purchase_order TEXT,
    status TEXT DEFAULT 'Draft'
);

-- Accounts: Journal Entry
DROP TABLE IF EXISTS JournalEntry;
CREATE TABLE JournalEntry (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    posting_date TEXT,
    total_debit REAL DEFAULT 0.0,
    total_credit REAL DEFAULT 0.0,
    user_remark TEXT,
    status TEXT DEFAULT 'Draft'
);

-- Stock: Delivery Note
DROP TABLE IF EXISTS DeliveryNote;
CREATE TABLE DeliveryNote (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer TEXT,
    posting_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Selling: Quotation
DROP TABLE IF EXISTS Quotation;
CREATE TABLE Quotation (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    customer TEXT,
    transaction_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Buying: Purchase Receipt
DROP TABLE IF EXISTS PurchaseReceipt;
CREATE TABLE PurchaseReceipt (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    supplier TEXT,
    posting_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Accounts: Purchase Invoice
DROP TABLE IF EXISTS PurchaseInvoice;
CREATE TABLE PurchaseInvoice (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    supplier TEXT,
    posting_date TEXT,
    grand_total REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Accounts: Payment Entry
DROP TABLE IF EXISTS PaymentEntry;
CREATE TABLE PaymentEntry (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    payment_type TEXT DEFAULT 'Pay',
    party_type TEXT,
    party TEXT,
    paid_amount REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Draft'
);

-- Stock: Material Request
DROP TABLE IF EXISTS MaterialRequest;
CREATE TABLE MaterialRequest (
    name TEXT PRIMARY KEY,
    creation TEXT DEFAULT (datetime('now')),
    modified TEXT DEFAULT (datetime('now')),
    transaction_date TEXT,
    schedule_date TEXT,
    status TEXT DEFAULT 'Draft'
);
