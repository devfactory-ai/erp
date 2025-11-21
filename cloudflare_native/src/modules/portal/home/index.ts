import { Hono } from 'hono';
import { Bindings } from '../../../bindings';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
    return c.json({
        message: "Welcome to ERPNext Cloudflare Native Portal",
        version: "1.0.0",
        status: "Online"
    });
});

export default app;
