import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type Project = {
    project_name: string;
    project_type: string;
    expected_end_date: string;
    priority: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM Project').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<Project>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO Project (name, project_name, project_type, expected_end_date, priority, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.project_name,
            body.project_type || 'Internal',
            body.expected_end_date,
            body.priority || 'Medium',
            'Open'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
