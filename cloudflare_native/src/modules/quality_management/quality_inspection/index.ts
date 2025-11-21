import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), reference_type (TEXT), reference_name (TEXT), status (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM QualityInspection ORDER BY name DESC'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        `INSERT INTO QualityInspection (name, reference_type, reference_name, status) 
     VALUES (?, ?, ?, ?)`
    ).bind(id, body.reference_type, body.reference_name, 'Pending').run();

    return c.json({ success: true, id });
});

export default app;
