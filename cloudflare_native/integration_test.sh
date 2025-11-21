#!/bin/bash

BASE_URL="http://localhost:8787/api"

echo "Starting ERPNext Cloudflare Native Integration Test..."
echo "-----------------------------------------------------"

# 1. Setup: Create Company
echo "[1/15] Creating Company..."
curl -s -X POST "$BASE_URL/setup/company" \
  -H "Content-Type: application/json" \
  -d '{"company_name": "TechCorp", "default_currency": "USD", "country": "USA"}' | grep "success"
echo ""

# 2. Core: Create ToDo
echo "[2/15] Creating ToDo..."
curl -s -X POST "$BASE_URL/core/todo" \
  -H "Content-Type: application/json" \
  -d '{"description": "Review Migration"}' | grep "success"
echo ""

# 3. Selling: Create Customer
echo "[3/15] Creating Customer..."
curl -s -X POST "$BASE_URL/selling/customer" \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "John Doe", "customer_type": "Individual"}' | grep "success"
echo ""

# 4. Buying: Create Supplier
echo "[4/15] Creating Supplier..."
curl -s -X POST "$BASE_URL/buying/supplier" \
  -H "Content-Type: application/json" \
  -d '{"supplier_name": "Acme Supplies", "supplier_type": "Company"}' | grep "success"
echo ""

# 5. Stock: Create Item
echo "[5/15] Creating Item..."
curl -s -X POST "$BASE_URL/stock/item" \
  -H "Content-Type: application/json" \
  -d '{"item_code": "LAPTOP-001", "item_name": "High Performance Laptop", "valuation_rate": 1000}' | grep "success"
echo ""

# 6. CRM: Create Lead
echo "[6/15] Creating Lead..."
curl -s -X POST "$BASE_URL/crm/lead" \
  -H "Content-Type: application/json" \
  -d '{"lead_name": "Jane Smith", "email_id": "jane@example.com"}' | grep "success"
echo ""

# 7. Selling: Create Quotation
echo "[7/15] Creating Quotation..."
curl -s -X POST "$BASE_URL/selling/quotation" \
  -H "Content-Type: application/json" \
  -d '{"customer": "John Doe", "transaction_date": "2023-10-27", "grand_total": 1200}' | grep "success"
echo ""

# 8. Selling: Create Sales Order
echo "[8/15] Creating Sales Order..."
curl -s -X POST "$BASE_URL/selling/sales-order" \
  -H "Content-Type: application/json" \
  -d '{"customer": "John Doe", "transaction_date": "2023-10-28", "grand_total": 1200}' | grep "success"
echo ""

# 9. Buying: Create Purchase Order
echo "[9/15] Creating Purchase Order..."
curl -s -X POST "$BASE_URL/buying/purchase-order" \
  -H "Content-Type: application/json" \
  -d '{"supplier": "Acme Supplies", "transaction_date": "2023-10-28", "grand_total": 800}' | grep "success"
echo ""

# 10. Buying: Create Purchase Receipt
echo "[10/15] Creating Purchase Receipt..."
curl -s -X POST "$BASE_URL/buying/purchase-receipt" \
  -H "Content-Type: application/json" \
  -d '{"supplier": "Acme Supplies", "posting_date": "2023-10-30", "grand_total": 800}' | grep "success"
echo ""

# 11. Stock: Create Stock Entry (Receipt)
echo "[11/15] Creating Stock Entry..."
curl -s -X POST "$BASE_URL/stock/stock-entry" \
  -H "Content-Type: application/json" \
  -d '{"stock_entry_type": "Material Receipt", "posting_date": "2023-10-30", "purpose": "Purchase Receipt"}' | grep "success"
echo ""

# 12. Stock: Create Delivery Note
echo "[12/15] Creating Delivery Note..."
curl -s -X POST "$BASE_URL/stock/delivery-note" \
  -H "Content-Type: application/json" \
  -d '{"customer": "John Doe", "posting_date": "2023-11-01", "grand_total": 1200}' | grep "success"
echo ""

# 13. Accounts: Create Sales Invoice
echo "[13/15] Creating Sales Invoice..."
curl -s -X POST "$BASE_URL/accounts/sales-invoice" \
  -H "Content-Type: application/json" \
  -d '{"customer": "John Doe", "posting_date": "2023-11-01", "grand_total": 1200}' | grep "success"
echo ""

# 14. Accounts: Create Purchase Invoice
echo "[14/15] Creating Purchase Invoice..."
curl -s -X POST "$BASE_URL/accounts/purchase-invoice" \
  -H "Content-Type: application/json" \
  -d '{"supplier": "Acme Supplies", "posting_date": "2023-11-02", "grand_total": 800}' | grep "success"
echo ""

# 15. Accounts: Create Payment Entry
echo "[15/15] Creating Payment Entry..."
curl -s -X POST "$BASE_URL/accounts/payment-entry" \
  -H "Content-Type: application/json" \
  -d '{"payment_type": "Receive", "party_type": "Customer", "party": "John Doe", "paid_amount": 1200}' | grep "success"
echo ""

echo "-----------------------------------------------------"
echo "Integration Test Completed."
