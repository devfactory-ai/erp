import { Hono } from 'hono';
import { Bindings } from '../../index';
import * as bcrypt from 'bcryptjs';

const userRouter = new Hono<{ Bindings: Bindings }>();

// List Users
userRouter.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT email, full_name, role, enabled, creation FROM User ORDER BY creation DESC'
    ).all();
    return c.json(results);
});

// Get User
userRouter.get('/:email', async (c) => {
    const email = c.req.param('email');
    const user = await c.env.DB.prepare(
        'SELECT email, full_name, role, enabled, creation FROM User WHERE email = ?'
    ).bind(email).first();

    if (!user) {
        return c.json({ error: 'User not found' }, 404);
    }

    return c.json(user);
});

// Create User (Admin)
userRouter.post('/', async (c) => {
    const { email, password, full_name, role } = await c.req.json();

    if (!email || !password || !full_name) {
        return c.json({ error: 'Missing required fields' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await c.env.DB.prepare(
            'INSERT INTO User (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)'
        ).bind(email, hashedPassword, full_name, role || 'User').run();

        return c.json({ message: 'User created successfully' }, 201);
    } catch (e) {
        return c.json({ error: 'User already exists' }, 500);
    }
});

// Update User
userRouter.put('/:email', async (c) => {
    const email = c.req.param('email');
    const { full_name, role, enabled, password } = await c.req.json();

    let query = 'UPDATE User SET modified = datetime("now")';
    const params: any[] = [];

    if (full_name) {
        query += ', full_name = ?';
        params.push(full_name);
    }
    if (role) {
        query += ', role = ?';
        params.push(role);
    }
    if (enabled !== undefined) {
        query += ', enabled = ?';
        params.push(enabled ? 1 : 0);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += ', password_hash = ?';
        params.push(hashedPassword);
    }

    query += ' WHERE email = ?';
    params.push(email);

    await c.env.DB.prepare(query).bind(...params).run();

    return c.json({ message: 'User updated successfully' });
});

export default userRouter;
