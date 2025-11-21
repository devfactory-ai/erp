import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Item = {
    item_code: string;
    item_name: string;
    item_group: string;
    stock_uom: string;
    valuation_rate: number;
    description: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Item').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Item>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Item (name, item_code, item_name, item_group, stock_uom, valuation_rate, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.item_code,
            body.item_name,
            body.item_group || 'All Item Groups',
            body.stock_uom || 'Nos',
            body.valuation_rate || 0.0,
            body.description
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
