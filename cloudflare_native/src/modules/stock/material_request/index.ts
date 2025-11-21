import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type MaterialRequest = {
    transaction_date: string;
    schedule_date: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM MaterialRequest').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<MaterialRequest>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO MaterialRequest (name, transaction_date, schedule_date, status) VALUES (?, ?, ?, ?)'
    )
        .bind(
            id,
            body.transaction_date,
            body.schedule_date,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
