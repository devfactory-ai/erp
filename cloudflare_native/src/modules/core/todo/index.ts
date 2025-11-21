import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
    JOBS_QUEUE: Queue;
};

type ToDo = {
    name: string;
    description: string;
    status: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM ToDo').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<ToDo>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO ToDo (name, description, status, owner) VALUES (?, ?, ?, ?)'
    )
        .bind(id, body.description, body.status || 'Open', 'Guest')
        .run();

    await c.env.JOBS_QUEUE.send({
        type: 'TODO_CREATED',
        payload: { id, description: body.description }
    });

    return c.json({ success: true, id });
});

export default app;
