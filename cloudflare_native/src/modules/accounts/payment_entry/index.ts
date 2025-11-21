import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

type PaymentEntry = {
    payment_type: string;
    party_type: string;
    party: string;
    paid_amount: number;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM PaymentEntry').all();
    return c.json(results);
});

app.post('/', async (c) => {
    const body = await c.req.json<PaymentEntry>();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
        'INSERT INTO PaymentEntry (name, payment_type, party_type, party, paid_amount, status) VALUES (?, ?, ?, ?, ?, ?)'
    )
        .bind(
            id,
            body.payment_type || 'Pay',
            body.party_type,
            body.party,
            body.paid_amount || 0.0,
            'Draft'
        )
        .run();

    return c.json({ success: true, id });
});

export default app;
