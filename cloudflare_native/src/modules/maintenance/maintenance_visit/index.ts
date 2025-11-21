import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type MaintenanceVisit = {
    customer: string;
    maintenance_type: string;
    visit_date: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM MaintenanceVisit').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<MaintenanceVisit>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO MaintenanceVisit (name, customer, maintenance_type, completion_status, visit_date) VALUES (?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.customer,
            body.maintenance_type || 'Scheduled',
            'Pending',
            body.visit_date
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
