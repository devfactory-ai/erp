import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import * as bcrypt from 'bcryptjs';
import { Bindings } from '../../index';

const authRouter = new Hono<{ Bindings: Bindings }>();

// Register (For initial setup, or Admin only later)
authRouter.post('/register', async (c) => {
    const { email, password, full_name } = await c.req.json();

    if (!email || !password || !full_name) {
        return c.json({ error: 'Missing required fields' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await c.env.DB.prepare(
            'INSERT INTO User (email, password_hash, full_name) VALUES (?, ?, ?)'
        ).bind(email, hashedPassword, full_name).run();

        return c.json({ message: 'User created successfully' }, 201);
    } catch (e) {
        console.error(e);
        return c.json({ error: 'User already exists or database error' }, 500);
    }
});

// Login
authRouter.post('/login', async (c) => {
    const { email, password } = await c.req.json();

    if (!email || !password) {
        return c.json({ error: 'Missing email or password' }, 400);
    }

    const user = await c.env.DB.prepare(
        'SELECT * FROM User WHERE email = ?'
    ).bind(email).first();

    if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    const validPassword = await bcrypt.compare(password, user.password_hash as string);

    if (!validPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    const payload = {
        sub: user.email,
        role: user.role,
        name: user.full_name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    };

    const secret = 'YOUR_SECRET_KEY'; // TODO: Move to env var
    const token = await sign(payload, secret);

    return c.json({
        token,
        user: {
            email: user.email,
            full_name: user.full_name,
            role: user.role,
        },
    });
});

// Me (Get current user info)
// Note: This route should be protected by JWT middleware in index.ts
authRouter.get('/me', async (c) => {
    const payload = c.get('jwtPayload');
    return c.json({ user: payload });
});

export { authRouter };
