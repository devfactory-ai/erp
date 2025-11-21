import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), production_item (TEXT), qty (REAL), status (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM WorkOrder ORDER BY creation DESC'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await c.env.DB.prepare(
        `INSERT INTO WorkOrder (name, production_item, qty, status, creation, modified) 
     VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, body.production_item, body.qty, 'Draft', now, now).run();

    return c.json({ success: true, id });
});

export default app;
