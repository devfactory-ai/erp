import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type BOM = {
    item: string;
    quantity: number;
    operating_cost: number;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM BOM').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<BOM>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO BOM (name, item, quantity, is_active, is_default, operating_cost) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.item,
            body.quantity || 1.0,
            1, // is_active
            0, // is_default
            body.operating_cost || 0.0
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
