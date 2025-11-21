import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), step_name (TEXT), is_complete (INTEGER), completed_at (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM OnboardingStep ORDER BY step_name'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const { step_name, is_complete } = body;

    const id = step_name.toLowerCase().replace(/\s+/g, '-');
    const completed_at = is_complete ? new Date().toISOString() : null;

    await c.env.DB.prepare(
        `INSERT INTO OnboardingStep (name, step_name, is_complete, completed_at) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(name) DO UPDATE SET is_complete = ?, completed_at = ?`
    ).bind(id, step_name, is_complete ? 1 : 0, completed_at, is_complete ? 1 : 0, completed_at).run();

    return c.json({ success: true, id });
});

export default app;
