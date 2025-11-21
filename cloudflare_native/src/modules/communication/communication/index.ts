import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Communication = {
    subject: string;
    content: string;
    communication_type: string;
    sender: string;
    recipients: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Communication').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Communication>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Communication (name, subject, content, communication_type, sender, recipients, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.subject,
            body.content,
            body.communication_type || 'Communication',
            body.sender,
            body.recipients,
            'Open'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
