import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

// Selling
import CustomerList from "./pages/selling/CustomerList";
import CustomerForm from "./pages/selling/CustomerForm";
import QuotationList from "./pages/selling/QuotationList";
import QuotationForm from "./pages/selling/QuotationForm";
import SalesOrderList from "./pages/selling/SalesOrderList";
import SalesOrderForm from "./pages/selling/SalesOrderForm";

// Buying
import SupplierList from "./pages/buying/SupplierList";
import SupplierForm from "./pages/buying/SupplierForm";
import PurchaseOrderList from "./pages/buying/PurchaseOrderList";
import PurchaseOrderForm from "./pages/buying/PurchaseOrderForm";
import PurchaseReceiptList from "./pages/buying/PurchaseReceiptList";
import PurchaseReceiptForm from "./pages/buying/PurchaseReceiptForm";

// Stock
import ItemList from "./pages/stock/ItemList";
import ItemForm from "./pages/stock/ItemForm";
import DeliveryNoteList from "./pages/stock/DeliveryNoteList";
import DeliveryNoteForm from "./pages/stock/DeliveryNoteForm";

// Accounts
import SalesInvoiceList from "./pages/accounts/SalesInvoiceList";
import SalesInvoiceForm from "./pages/accounts/SalesInvoiceForm";
import JournalEntryList from "./pages/accounts/JournalEntryList";
import JournalEntryForm from "./pages/accounts/JournalEntryForm";
import PaymentEntryList from "./pages/accounts/PaymentEntryList";
import PaymentEntryForm from "./pages/accounts/PaymentEntryForm";
import PurchaseInvoiceList from "./pages/accounts/PurchaseInvoiceList";
import PurchaseInvoiceForm from "./pages/accounts/PurchaseInvoiceForm";

// CRM
import LeadList from "./pages/crm/LeadList";
import LeadForm from "./pages/crm/LeadForm";

// Support
import IssueList from "./pages/support/IssueList";
import IssueForm from "./pages/support/IssueForm";

// Projects
import ProjectList from "./pages/projects/ProjectList";
import ProjectForm from "./pages/projects/ProjectForm";

// Setup
import CompanyList from "./pages/setup/CompanyList";
import CompanyForm from "./pages/setup/CompanyForm";

// Remaining Stock
import StockEntryList from "./pages/stock/StockEntryList";
import StockEntryForm from "./pages/stock/StockEntryForm";
import MaterialRequestList from "./pages/stock/MaterialRequestList";
import MaterialRequestForm from "./pages/stock/MaterialRequestForm";

// Manufacturing
import WorkOrderList from "./pages/manufacturing/WorkOrderList";
import WorkOrderForm from "./pages/manufacturing/WorkOrderForm";
import JobCardList from "./pages/manufacturing/JobCardList";
import JobCardForm from "./pages/manufacturing/JobCardForm";

// Assets
import AssetCategoryList from "./pages/assets/AssetCategoryList";
import AssetCategoryForm from "./pages/assets/AssetCategoryForm";
import AssetMovementList from "./pages/assets/AssetMovementList";
import AssetMovementForm from "./pages/assets/AssetMovementForm";

// Maintenance
import MaintenanceScheduleList from "./pages/maintenance/MaintenanceScheduleList";
import MaintenanceScheduleForm from "./pages/maintenance/MaintenanceScheduleForm";

// Quality Management
import QualityInspectionList from "./pages/quality_management/QualityInspectionList";
import QualityInspectionForm from "./pages/quality_management/QualityInspectionForm";

// Subcontracting
import SubcontractingReceiptList from "./pages/subcontracting/SubcontractingReceiptList";
import SubcontractingReceiptForm from "./pages/subcontracting/SubcontractingReceiptForm";

import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />

                {/* Redirects */}
                <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />

                <Route path="/app" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* Selling Module */}
                    <Route path="selling">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/selling/customer" className="text-primary underline">Customer</Link>, <Link to="/app/selling/quotation" className="text-primary underline">Quotation</Link>, <Link to="/app/selling/sales-order" className="text-primary underline">Sales Order</Link></div>} />
                        <Route path="customer" element={<CustomerList />} />
                        <Route path="customer/new" element={<CustomerForm />} />
                        <Route path="quotation" element={<QuotationList />} />
                        <Route path="quotation/new" element={<QuotationForm />} />
                        <Route path="sales-order" element={<SalesOrderList />} />
                        <Route path="sales-order/new" element={<SalesOrderForm />} />
                    </Route>

                    {/* Buying Module */}
                    <Route path="buying">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/buying/supplier" className="text-primary underline">Supplier</Link>, <Link to="/app/buying/purchase-order" className="text-primary underline">Purchase Order</Link>, <Link to="/app/buying/purchase-receipt" className="text-primary underline">Purchase Receipt</Link></div>} />
                        <Route path="supplier" element={<SupplierList />} />
                        <Route path="supplier/new" element={<SupplierForm />} />
                        <Route path="purchase-order" element={<PurchaseOrderList />} />
                        <Route path="purchase-order/new" element={<PurchaseOrderForm />} />
                        <Route path="purchase-receipt" element={<PurchaseReceiptList />} />
                        <Route path="purchase-receipt/new" element={<PurchaseReceiptForm />} />
                    </Route>

                    {/* Stock Module */}
                    <Route path="stock">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/stock/item" className="text-primary underline">Item</Link>, <Link to="/app/stock/delivery-note" className="text-primary underline">Delivery Note</Link>, <Link to="/app/stock/stock-entry" className="text-primary underline">Stock Entry</Link>, <Link to="/app/stock/material-request" className="text-primary underline">Material Request</Link></div>} />
                        <Route path="item" element={<ItemList />} />
                        <Route path="item/new" element={<ItemForm />} />
                        <Route path="delivery-note" element={<DeliveryNoteList />} />
                        <Route path="delivery-note/new" element={<DeliveryNoteForm />} />
                        <Route path="stock-entry" element={<StockEntryList />} />
                        <Route path="stock-entry/new" element={<StockEntryForm />} />
                        <Route path="material-request" element={<MaterialRequestList />} />
                        <Route path="material-request/new" element={<MaterialRequestForm />} />
                    </Route>

                    {/* Accounts Module */}
                    <Route path="accounts">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/accounts/sales-invoice" className="text-primary underline">Sales Invoice</Link>, <Link to="/app/accounts/purchase-invoice" className="text-primary underline">Purchase Invoice</Link>, <Link to="/app/accounts/journal-entry" className="text-primary underline">Journal Entry</Link>, <Link to="/app/accounts/payment-entry" className="text-primary underline">Payment Entry</Link></div>} />
                        <Route path="sales-invoice" element={<SalesInvoiceList />} />
                        <Route path="sales-invoice/new" element={<SalesInvoiceForm />} />
                        <Route path="purchase-invoice" element={<PurchaseInvoiceList />} />
                        <Route path="purchase-invoice/new" element={<PurchaseInvoiceForm />} />
                        <Route path="journal-entry" element={<JournalEntryList />} />
                        <Route path="journal-entry/new" element={<JournalEntryForm />} />
                        <Route path="payment-entry" element={<PaymentEntryList />} />
                        <Route path="payment-entry/new" element={<PaymentEntryForm />} />
                    </Route>

                    {/* CRM Module */}
                    <Route path="crm">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/crm/lead" className="text-primary underline">Lead</Link></div>} />
                        <Route path="lead" element={<LeadList />} />
                        <Route path="lead/new" element={<LeadForm />} />
                    </Route>

                    {/* Projects Module */}
                    <Route path="projects">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/projects/project" className="text-primary underline">Project</Link></div>} />
                        <Route path="project" element={<ProjectList />} />
                        <Route path="project/new" element={<ProjectForm />} />
                    </Route>

                    {/* Manufacturing Module */}
                    <Route path="manufacturing">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/manufacturing/work-order" className="text-primary underline">Work Order</Link>, <Link to="/app/manufacturing/job-card" className="text-primary underline">Job Card</Link></div>} />
                        <Route path="work-order" element={<WorkOrderList />} />
                        <Route path="work-order/new" element={<WorkOrderForm />} />
                        <Route path="job-card" element={<JobCardList />} />
                        <Route path="job-card/new" element={<JobCardForm />} />
                    </Route>

                    {/* Assets Module */}
                    <Route path="assets">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/assets/asset" className="text-primary underline">Asset</Link>, <Link to="/app/assets/asset-category" className="text-primary underline">Asset Category</Link>, <Link to="/app/assets/asset-movement" className="text-primary underline">Asset Movement</Link></div>} />
                        <Route path="asset" element={<div>Asset List (Placeholder)</div>} />
                        <Route path="asset-category" element={<AssetCategoryList />} />
                        <Route path="asset-category/new" element={<AssetCategoryForm />} />
                        <Route path="asset-movement" element={<AssetMovementList />} />
                        <Route path="asset-movement/new" element={<AssetMovementForm />} />
                    </Route>

                    {/* Maintenance Module */}
                    <Route path="maintenance">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/maintenance/maintenance-schedule" className="text-primary underline">Maintenance Schedule</Link></div>} />
                        <Route path="maintenance-schedule" element={<MaintenanceScheduleList />} />
                        <Route path="maintenance-schedule/new" element={<MaintenanceScheduleForm />} />
                    </Route>

                    {/* Support Module */}
                    <Route path="support">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/support/issue" className="text-primary underline">Issue</Link></div>} />
                        <Route path="issue" element={<IssueList />} />
                        <Route path="issue/new" element={<IssueForm />} />
                    </Route>

                    {/* Quality Management Module */}
                    <Route path="quality-management">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/quality-management/quality-goal" className="text-primary underline">Quality Goal</Link>, <Link to="/app/quality-management/quality-inspection" className="text-primary underline">Quality Inspection</Link></div>} />
                        <Route path="quality-goal" element={<div>Quality Goal List (Placeholder)</div>} />
                        <Route path="quality-inspection" element={<QualityInspectionList />} />
                        <Route path="quality-inspection/new" element={<QualityInspectionForm />} />
                    </Route>

                    {/* Subcontracting Module */}
                    <Route path="subcontracting">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/subcontracting/subcontracting-order" className="text-primary underline">Subcontracting Order</Link>, <Link to="/app/subcontracting/subcontracting-receipt" className="text-primary underline">Subcontracting Receipt</Link></div>} />
                        <Route path="subcontracting-order" element={<div>Subcontracting Order List (Placeholder)</div>} />
                        <Route path="subcontracting-receipt" element={<SubcontractingReceiptList />} />
                        <Route path="subcontracting-receipt/new" element={<SubcontractingReceiptForm />} />
                    </Route>

                    {/* Setup Module */}
                    <Route path="setup">
                        <Route index element={<div className="p-4">Select a DocType: <Link to="/app/setup/company" className="text-primary underline">Company</Link></div>} />
                        <Route path="company" element={<CompanyList />} />
                        <Route path="company/new" element={<CompanyForm />} />
                    </Route>
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="text-xl mb-4">Page Not Found</p>
                        <a href="/" className="text-primary underline">Go Home</a>
                    </div>
                </div>} />
            </Routes>
        </Router>
    );
}

export default App;
