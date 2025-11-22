import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import OnboardingWizard from "@/pages/Onboarding";

// Selling
import CustomerList from "@/pages/selling/CustomerList";
import CustomerForm from "@/pages/selling/CustomerForm";
import QuotationList from "@/pages/selling/QuotationList";
import QuotationForm from "@/pages/selling/QuotationForm";
import SalesOrderList from "@/pages/selling/SalesOrderList";
import SalesOrderForm from "@/pages/selling/SalesOrderForm";

// Buying
import SupplierList from "@/pages/buying/SupplierList";
import SupplierForm from "@/pages/buying/SupplierForm";
import PurchaseOrderList from "@/pages/buying/PurchaseOrderList";
import PurchaseOrderForm from "@/pages/buying/PurchaseOrderForm";
import PurchaseReceiptList from "@/pages/buying/PurchaseReceiptList";
import PurchaseReceiptForm from "@/pages/buying/PurchaseReceiptForm";

// Stock
import ItemList from "@/pages/stock/ItemList";
import ItemForm from "@/pages/stock/ItemForm";
import DeliveryNoteList from "@/pages/stock/DeliveryNoteList";
import DeliveryNoteForm from "@/pages/stock/DeliveryNoteForm";
import StockEntryList from "@/pages/stock/StockEntryList";
import StockEntryForm from "@/pages/stock/StockEntryForm";
import MaterialRequestList from "@/pages/stock/MaterialRequestList";
import MaterialRequestForm from "@/pages/stock/MaterialRequestForm";

// Accounts
import SalesInvoiceList from "@/pages/accounts/SalesInvoiceList";
import SalesInvoiceForm from "@/pages/accounts/SalesInvoiceForm";
import JournalEntryList from "@/pages/accounts/JournalEntryList";
import JournalEntryForm from "@/pages/accounts/JournalEntryForm";
import PaymentEntryList from "@/pages/accounts/PaymentEntryList";
import PaymentEntryForm from "@/pages/accounts/PaymentEntryForm";
import PurchaseInvoiceList from "@/pages/accounts/PurchaseInvoiceList";
import PurchaseInvoiceForm from "@/pages/accounts/PurchaseInvoiceForm";

// CRM
import LeadList from "@/pages/crm/LeadList";
import LeadForm from "@/pages/crm/LeadForm";

// Projects
import ProjectList from "@/pages/projects/ProjectList";
import ProjectForm from "@/pages/projects/ProjectForm";

// Manufacturing
import WorkOrderList from "@/pages/manufacturing/WorkOrderList";
import WorkOrderForm from "@/pages/manufacturing/WorkOrderForm";
import JobCardList from "@/pages/manufacturing/JobCardList";
import JobCardForm from "@/pages/manufacturing/JobCardForm";

// Assets
import AssetCategoryList from "@/pages/assets/AssetCategoryList";
import AssetCategoryForm from "@/pages/assets/AssetCategoryForm";
import AssetMovementList from "@/pages/assets/AssetMovementList";
import AssetMovementForm from "@/pages/assets/AssetMovementForm";

// Support
import IssueList from "@/pages/support/IssueList";
import IssueForm from "@/pages/support/IssueForm";

// Maintenance
import MaintenanceScheduleList from "@/pages/maintenance/MaintenanceScheduleList";
import MaintenanceScheduleForm from "@/pages/maintenance/MaintenanceScheduleForm";

// Quality Management
import QualityInspectionList from "@/pages/quality_management/QualityInspectionList";
import QualityInspectionForm from "@/pages/quality_management/QualityInspectionForm";

// Subcontracting
import SubcontractingReceiptList from "@/pages/subcontracting/SubcontractingReceiptList";
import SubcontractingReceiptForm from "@/pages/subcontracting/SubcontractingReceiptForm";

// Setup
import CompanyList from "@/pages/setup/CompanyList";
import CompanyForm from "@/pages/setup/CompanyForm";
import UserList from "@/pages/setup/UserList";
import UserForm from "@/pages/setup/UserForm";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

function AppLayout() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/app" element={<AppLayout />}>
                            <Route index element={<Navigate to="/app/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />

                            {/* Core */}
                            <Route path="core/todo" element={<div className="p-4">ToDo List (Coming Soon)</div>} />
                            <Route path="core/onboarding" element={<OnboardingWizard />} />

                            {/* Selling */}
                            <Route path="selling/customer" element={<CustomerList />} />
                            <Route path="selling/customer/new" element={<CustomerForm />} />
                            <Route path="selling/sales-order" element={<SalesOrderList />} />
                            <Route path="selling/sales-order/new" element={<SalesOrderForm />} />
                            <Route path="selling/quotation" element={<QuotationList />} />
                            <Route path="selling/quotation/new" element={<QuotationForm />} />

                            {/* Buying */}
                            <Route path="buying/supplier" element={<SupplierList />} />
                            <Route path="buying/supplier/new" element={<SupplierForm />} />
                            <Route path="buying/purchase-order" element={<PurchaseOrderList />} />
                            <Route path="buying/purchase-order/new" element={<PurchaseOrderForm />} />
                            <Route path="buying/purchase-receipt" element={<PurchaseReceiptList />} />
                            <Route path="buying/purchase-receipt/new" element={<PurchaseReceiptForm />} />

                            {/* Stock */}
                            <Route path="stock/item" element={<ItemList />} />
                            <Route path="stock/item/new" element={<ItemForm />} />
                            <Route path="stock/stock-entry" element={<StockEntryList />} />
                            <Route path="stock/stock-entry/new" element={<StockEntryForm />} />
                            <Route path="stock/delivery-note" element={<DeliveryNoteList />} />
                            <Route path="stock/delivery-note/new" element={<DeliveryNoteForm />} />
                            <Route path="stock/material-request" element={<MaterialRequestList />} />
                            <Route path="stock/material-request/new" element={<MaterialRequestForm />} />

                            {/* Accounts */}
                            <Route path="accounts/sales-invoice" element={<SalesInvoiceList />} />
                            <Route path="accounts/sales-invoice/new" element={<SalesInvoiceForm />} />
                            <Route path="accounts/purchase-invoice" element={<PurchaseInvoiceList />} />
                            <Route path="accounts/purchase-invoice/new" element={<PurchaseInvoiceForm />} />
                            <Route path="accounts/journal-entry" element={<JournalEntryList />} />
                            <Route path="accounts/journal-entry/new" element={<JournalEntryForm />} />
                            <Route path="accounts/payment-entry" element={<PaymentEntryList />} />
                            <Route path="accounts/payment-entry/new" element={<PaymentEntryForm />} />

                            {/* Projects */}
                            <Route path="projects/project" element={<ProjectList />} />
                            <Route path="projects/project/new" element={<ProjectForm />} />

                            {/* CRM */}
                            <Route path="crm/lead" element={<LeadList />} />
                            <Route path="crm/lead/new" element={<LeadForm />} />

                            {/* Manufacturing */}
                            <Route path="manufacturing/work-order" element={<WorkOrderList />} />
                            <Route path="manufacturing/work-order/new" element={<WorkOrderForm />} />
                            <Route path="manufacturing/job-card" element={<JobCardList />} />
                            <Route path="manufacturing/job-card/new" element={<JobCardForm />} />

                            {/* Assets */}
                            <Route path="assets/asset" element={<div className="p-4">Asset List (Coming Soon)</div>} />
                            <Route path="assets/asset-category" element={<AssetCategoryList />} />
                            <Route path="assets/asset-category/new" element={<AssetCategoryForm />} />
                            <Route path="assets/asset-movement" element={<AssetMovementList />} />
                            <Route path="assets/asset-movement/new" element={<AssetMovementForm />} />

                            {/* Support */}
                            <Route path="support/issue" element={<IssueList />} />
                            <Route path="support/issue/new" element={<IssueForm />} />

                            {/* Maintenance */}
                            <Route path="maintenance/maintenance-visit" element={<div className="p-4">Maintenance Visit List (Coming Soon)</div>} />
                            <Route path="maintenance/maintenance-schedule" element={<MaintenanceScheduleList />} />
                            <Route path="maintenance/maintenance-schedule/new" element={<MaintenanceScheduleForm />} />

                            {/* Quality Management */}
                            <Route path="quality-management/quality-goal" element={<div className="p-4">Quality Goal List (Coming Soon)</div>} />
                            <Route path="quality-management/quality-inspection" element={<QualityInspectionList />} />
                            <Route path="quality-management/quality-inspection/new" element={<QualityInspectionForm />} />

                            {/* Subcontracting */}
                            <Route path="subcontracting/subcontracting-order" element={<div className="p-4">Subcontracting Order List (Coming Soon)</div>} />
                            <Route path="subcontracting/subcontracting-receipt" element={<SubcontractingReceiptList />} />
                            <Route path="subcontracting/subcontracting-receipt/new" element={<SubcontractingReceiptForm />} />

                            {/* Setup */}
                            <Route path="setup/company" element={<CompanyList />} />
                            <Route path="setup/company/new" element={<CompanyForm />} />
                            <Route path="setup/users" element={<UserList />} />
                            <Route path="setup/users/new" element={<UserForm />} />
                            <Route path="setup/users/:id" element={<UserForm />} />
                        </Route>
                    </Route>

                    {/* Redirect root to /app */}
                    <Route path="/" element={<Navigate to="/app" replace />} />

                    {/* 404 */}
                    <Route path="*" element={<div className="p-8">404 - Page Not Found</div>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
