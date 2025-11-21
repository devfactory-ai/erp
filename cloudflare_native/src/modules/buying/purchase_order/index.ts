import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type PurchaseOrder = {
    supplier: string;
    transaction_date: string;
    schedule_date: string;
    grand_total: number;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM PurchaseOrder').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<PurchaseOrder>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO PurchaseOrder (name, supplier, transaction_date, schedule_date, grand_total, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.supplier,
            body.transaction_date,
            body.schedule_date,
            body.grand_total || 0.0,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
