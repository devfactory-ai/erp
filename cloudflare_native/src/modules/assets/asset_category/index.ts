import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), category_name (TEXT), depreciation_method (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM AssetCategory ORDER BY category_name'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = body.category_name.toLowerCase().replace(/\s+/g, '-');

    await c.env.DB.prepare(
        `INSERT INTO AssetCategory (name, category_name, depreciation_method) 
     VALUES (?, ?, ?)`
    ).bind(id, body.category_name, body.depreciation_method).run();

    return c.json({ success: true, id });
});

export default app;
