import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { authRouter } from './modules/core/auth';
import userRouter from './modules/core/user';
import todoRouter from './modules/core/todo';
import onboardingRouter from './modules/core/onboarding_step';
import customerRouter from './modules/selling/customer';
import itemRouter from './modules/stock/item';
import salesInvoiceRouter from './modules/accounts/sales_invoice';
import supplierRouter from './modules/buying/supplier';
import projectRouter from './modules/projects/project';
import leadRouter from './modules/crm/lead';
import bomRouter from './modules/manufacturing/bom';
import workOrderRouter from './modules/manufacturing/work_order';
import jobCardRouter from './modules/manufacturing/job_card';
import assetRouter from './modules/assets/asset';
import assetCategoryRouter from './modules/assets/asset_category';
import assetMovementRouter from './modules/assets/asset_movement';
import issueRouter from './modules/support/issue';
import maintenanceVisitRouter from './modules/maintenance/maintenance_visit';
import maintenanceScheduleRouter from './modules/maintenance/maintenance_schedule';
import qualityGoalRouter from './modules/quality_management/quality_goal';
import qualityInspectionRouter from './modules/quality_management/quality_inspection';
import subcontractingOrderRouter from './modules/subcontracting/subcontracting_order';
import subcontractingReceiptRouter from './modules/subcontracting/subcontracting_receipt';
import portalHomeRouter from './modules/portal/home';
import companyRouter from './modules/setup/company';
import salesOrderRouter from './modules/selling/sales_order';
import purchaseOrderRouter from './modules/buying/purchase_order';
import stockEntryRouter from './modules/stock/stock_entry';
import communicationRouter from './modules/communication/communication';
import journalEntryRouter from './modules/accounts/journal_entry';
import deliveryNoteRouter from './modules/stock/delivery_note';
import quotationRouter from './modules/selling/quotation';
import purchaseReceiptRouter from './modules/buying/purchase_receipt';
import purchaseInvoiceRouter from './modules/accounts/purchase_invoice';
import paymentEntryRouter from './modules/accounts/payment_entry';
import materialRequestRouter from './modules/stock/material_request';

export type Bindings = {
    DB: D1Database;
    JOBS_QUEUE: Queue;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS Middleware
app.use('/api/*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
}));

// JWT Middleware
app.use('/api/*', (c, next) => {
    const jwtMiddleware = jwt({ secret: 'YOUR_SECRET_KEY' });
    if (c.req.method === 'OPTIONS' || c.req.path.startsWith('/api/auth') || c.req.path.startsWith('/api/portal')) {
        return next();
    }
    return jwtMiddleware(c, next);
});

// Mount Modules
app.route('/api/auth', authRouter);
app.route('/api/core/user', userRouter);
app.route('/api/core/todo', todoRouter);
app.route('/api/core/onboarding-step', onboardingRouter);
app.route('/api/selling/customer', customerRouter);
app.route('/api/stock/item', itemRouter);
app.route('/api/accounts/sales-invoice', salesInvoiceRouter);
app.route('/api/buying/supplier', supplierRouter);
app.route('/api/projects/project', projectRouter);
app.route('/api/crm/lead', leadRouter);
app.route('/api/manufacturing/bom', bomRouter);
app.route('/api/manufacturing/work-order', workOrderRouter);
app.route('/api/manufacturing/job-card', jobCardRouter);
app.route('/api/assets/asset', assetRouter);
app.route('/api/assets/asset-category', assetCategoryRouter);
app.route('/api/assets/asset-movement', assetMovementRouter);
app.route('/api/support/issue', issueRouter);
app.route('/api/maintenance/maintenance-visit', maintenanceVisitRouter);
app.route('/api/maintenance/maintenance-schedule', maintenanceScheduleRouter);
app.route('/api/quality-management/quality-goal', qualityGoalRouter);
app.route('/api/quality-management/quality-inspection', qualityInspectionRouter);
app.route('/api/subcontracting/subcontracting-order', subcontractingOrderRouter);
app.route('/api/subcontracting/subcontracting-receipt', subcontractingReceiptRouter);
app.route('/api/portal/home', portalHomeRouter);
app.route('/api/setup/company', companyRouter);
app.route('/api/selling/sales-order', salesOrderRouter);
app.route('/api/buying/purchase-order', purchaseOrderRouter);
app.route('/api/stock/stock-entry', stockEntryRouter);
app.route('/api/communication/communication', communicationRouter);
app.route('/api/subcontracting/subcontracting-order', subcontractingOrderRouter);
app.route('/api/accounts/journal-entry', journalEntryRouter);
app.route('/api/stock/delivery-note', deliveryNoteRouter);
app.route('/api/selling/quotation', quotationRouter);
app.route('/api/buying/purchase-receipt', purchaseReceiptRouter);
app.route('/api/accounts/purchase-invoice', purchaseInvoiceRouter);
app.route('/api/accounts/payment-entry', paymentEntryRouter);
app.route('/api/stock/material-request', materialRequestRouter);

export default {
    fetch: app.fetch,

    async queue(batch: MessageBatch<any>, env: Bindings): Promise<void> {
        for (const message of batch.messages) {
            const job = message.body;
            console.log(`Processing Job: ${job.type}`, job.payload);

            if (job.type === 'TODO_CREATED') {
                console.log(`Sending notification for ToDo: ${job.payload.id}`);
            }

            message.ack();
        }
    }
};
