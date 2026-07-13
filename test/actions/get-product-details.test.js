const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ name: 'Fresco Deluxe' });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Tell me more about the Fresco Deluxe espresso machine" returns product details', async () => {
        const out = await handler({ name: 'Fresco Deluxe' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.name).toBe('Fresco Deluxe');
        expect(out.structuredContent.price).toBe('$499.00');
        expect(out.structuredContent.category).toBe('Coffee Machines');
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: 'Fresco Deluxe' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('matches product by partial name (case-insensitive)', async () => {
        const out = await handler({ name: 'fresco original' });
        expect(out.structuredContent.name).toBe('Fresco Original');
        expect(out.structuredContent.price).toBe('$299.00');
    });

    test('returns error message when required arg is missing', async () => {
        const out = await handler({});
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0].text).toMatch(/name|provide/i);
        expect(out.structuredContent).toBeUndefined();
    });

    test('unknown product returns not-found message with no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Gizmo 9000' });
        expect(out.content[0].text).toMatch(/no product found|not found/i);
        expect(out.structuredContent).toBeUndefined();
    });
});
