import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Lead = {
    lead_name: string;
    email_id: string;
    mobile_no: string;
    source: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Lead').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Lead>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Lead (name, lead_name, email_id, mobile_no, status, source) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.lead_name,
            body.email_id,
            body.mobile_no,
            'Lead',
            body.source || 'Website'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
