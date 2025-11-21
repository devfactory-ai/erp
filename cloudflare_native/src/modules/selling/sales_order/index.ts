import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type SalesOrder = {
    customer: string;
    transaction_date: string;
    delivery_date: string;
    grand_total: number;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM SalesOrder').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<SalesOrder>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO SalesOrder (name, customer, transaction_date, delivery_date, grand_total, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.customer,
            body.transaction_date,
            body.delivery_date,
            body.grand_total || 0.0,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
