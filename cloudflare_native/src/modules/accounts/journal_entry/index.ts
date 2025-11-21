import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type JournalEntry = {
    posting_date: string;
    total_debit: number;
    total_credit: number;
    user_remark: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM JournalEntry').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<JournalEntry>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO JournalEntry (name, posting_date, total_debit, total_credit, user_remark, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.posting_date,
            body.total_debit || 0.0,
            body.total_credit || 0.0,
            body.user_remark,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
