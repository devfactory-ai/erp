import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type PurchaseReceipt = {
    supplier: string;
    posting_date: string;
    grand_total: number;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM PurchaseReceipt').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<PurchaseReceipt>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO PurchaseReceipt (name, supplier, posting_date, grand_total, status) VALUES (?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.supplier,
            body.posting_date,
            body.grand_total || 0.0,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
