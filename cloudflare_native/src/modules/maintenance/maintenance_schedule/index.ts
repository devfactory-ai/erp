import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), item_code (TEXT), schedule_date (TEXT), status (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM MaintenanceSchedule ORDER BY schedule_date'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        `INSERT INTO MaintenanceSchedule (name, item_code, schedule_date, status) 
     VALUES (?, ?, ?, ?)`
    ).bind(id, body.item_code, body.schedule_date, 'Scheduled').run();

    return c.json({ success: true, id });
});

export default app;
