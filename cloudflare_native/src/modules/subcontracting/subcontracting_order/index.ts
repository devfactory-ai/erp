import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type SubcontractingOrder = {
    supplier: string;
    purchase_order: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM SubcontractingOrder').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<SubcontractingOrder>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO SubcontractingOrder (name, supplier, purchase_order, status) VALUES (?, ?, ?, ?)'
    )
        .bind(
            id,
            body.supplier,
            body.purchase_order,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
