import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type SalesInvoice = {
    customer: string;
    posting_date: string;
    due_date: string;
    grand_total: number;
    currency: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM SalesInvoice').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<SalesInvoice>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO SalesInvoice (name, customer, posting_date, due_date, grand_total, currency, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.customer,
            body.posting_date,
            body.due_date,
            body.grand_total || 0.0,
            body.currency || 'USD',
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
