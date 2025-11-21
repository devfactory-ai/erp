import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Customer = {
    name: string;
    customer_name: string;
    customer_type: string;
    email_id: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Customer').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Customer>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Customer (name, customer_name, customer_type, email_id) VALUES (?, ?, ?, ?)'
    )
        .bind(id, body.customer_name, body.customer_type || 'Company', body.email_id)
        .run();

    return c.json({ success: true, id });
});

export default app;
