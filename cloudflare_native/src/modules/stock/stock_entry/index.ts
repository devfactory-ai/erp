import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type StockEntry = {
    stock_entry_type: string;
    posting_date: string;
    purpose: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM StockEntry').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<StockEntry>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO StockEntry (name, stock_entry_type, posting_date, purpose, status) VALUES (?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.stock_entry_type || 'Material Receipt',
            body.posting_date,
            body.purpose || 'Material Receipt',
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
