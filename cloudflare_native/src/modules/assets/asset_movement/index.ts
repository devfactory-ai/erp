import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), asset (TEXT), target_location (TEXT), transaction_date (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM AssetMovement ORDER BY transaction_date DESC'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        `INSERT INTO AssetMovement (name, asset, target_location, transaction_date) 
     VALUES (?, ?, ?, ?)`
    ).bind(id, body.asset, body.target_location, body.transaction_date).run();

    return c.json({ success: true, id });
});

export default app;
