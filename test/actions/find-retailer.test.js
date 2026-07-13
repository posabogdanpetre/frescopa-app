const handler = require('../../actions/find-retailer/index.js')

describe('find_retailer handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ postal_code: '94103' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Find a Fréscopa retailer near me" returns retailer locations', async () => {
        const out = await handler({ postal_code: '94103' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.retailers.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ postal_code: '94103' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.retailers)).toBe(true)
    })

    test('returns error message when postal_code is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/postal_code|provide/i)
        expect(out.structuredContent.retailers).toHaveLength(0)
    })

    test('each retailer exposes the expected fields', async () => {
        const out = await handler({ postal_code: 'San Francisco' })
        const retailers = out.structuredContent.retailers
        retailers.forEach((r) => {
            expect(r).toHaveProperty('name')
            expect(r).toHaveProperty('address')
            expect(r).toHaveProperty('phone')
            expect(r).toHaveProperty('hours')
        })
    })
})
