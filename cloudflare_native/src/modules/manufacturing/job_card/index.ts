import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), work_order (TEXT), operation (TEXT), status (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM JobCard ORDER BY creation DESC'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await c.env.DB.prepare(
        `INSERT INTO JobCard (name, work_order, operation, status, creation, modified) 
     VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, body.work_order, body.operation, 'Open', now, now).run();

    return c.json({ success: true, id });
});

export default app;
