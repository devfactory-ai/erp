import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Issue = {
    subject: string;
    raised_by: string;
    priority: string;
    description: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Issue').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Issue>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Issue (name, subject, raised_by, status, priority, description) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.subject,
            body.raised_by,
            'Open',
            body.priority || 'Medium',
            body.description
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
