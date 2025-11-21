import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Company = {
    company_name: string;
    default_currency: string;
    country: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Company').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Company>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Company (name, company_name, default_currency, country) VALUES (?, ?, ?, ?)'
    )
        .bind(
            id,
            body.company_name,
            body.default_currency || 'USD',
            body.country || 'United States'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
