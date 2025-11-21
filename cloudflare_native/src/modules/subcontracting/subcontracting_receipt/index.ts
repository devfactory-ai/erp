import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

// Schema:
// name (TEXT PRIMARY KEY), supplier (TEXT), purchase_order (TEXT), status (TEXT)

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM SubcontractingReceipt ORDER BY name DESC'
    ).all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        `INSERT INTO SubcontractingReceipt (name, supplier, purchase_order, status) 
     VALUES (?, ?, ?, ?)`
    ).bind(id, body.supplier, body.purchase_order, 'Draft').run();

    return c.json({ success: true, id });
});

export default app;
