import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type QualityGoal = {
    goal: string;
    frequency: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM QualityGoal').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<QualityGoal>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO QualityGoal (name, goal, frequency, status) VALUES (?, ?, ?, ?)'
    )
        .bind(
            id,
            body.goal,
            body.frequency || 'Monthly',
            'Open'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
