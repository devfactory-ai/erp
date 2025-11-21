import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Asset = {
    asset_name: string;
    item_code: string;
    gross_purchase_amount: number;
    purchase_date: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Asset').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Asset>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Asset (name, asset_name, item_code, gross_purchase_amount, purchase_date, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.asset_name,
            body.item_code,
            body.gross_purchase_amount || 0.0,
            body.purchase_date,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
