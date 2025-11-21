import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Supplier = {
    supplier_name: string;
    supplier_type: string;
    supplier_group: string;
    email_id: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Supplier').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Supplier>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Supplier (name, supplier_name, supplier_type, supplier_group, email_id) VALUES (?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.supplier_name,
            body.supplier_type || 'Company',
            body.supplier_group || 'All Supplier Groups',
            body.email_id
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
