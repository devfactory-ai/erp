import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../../index';

describe('Customer Module', () => {
    it('should return empty list initially', async () => {
        const request = new Request('http://example.com/api/selling/customer');
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        await waitOnExecutionContext(ctx);

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body).toEqual([]);
    });

    it('should create a new customer', async () => {
        const newCustomer = {
            customer_name: 'Test Customer',
            customer_type: 'Company',
            customer_group: 'Commercial'
        };

        const request = new Request('http://example.com/api/selling/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCustomer),
        });
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        await waitOnExecutionContext(ctx);

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('success', true);
        expect(body).toHaveProperty('id');
    });
});
