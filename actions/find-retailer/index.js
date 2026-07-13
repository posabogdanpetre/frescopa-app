// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call (see the TODO block below the handler).
const MOCK_DATA = [
    {
        name: 'Fréscopa Flagship Store',
        address: '128 Market Street, San Francisco, CA 94103',
        phone: '(415) 555-0142',
        hours: 'Mon–Sat 9am–8pm, Sun 10am–6pm'
    },
    {
        name: 'Fréscopa Union Square',
        address: '455 Powell Street, San Francisco, CA 94102',
        phone: '(415) 555-0198',
        hours: 'Daily 10am–7pm'
    },
    {
        name: 'Fréscopa Marina District',
        address: '2101 Chestnut Street, San Francisco, CA 94123',
        phone: '(415) 555-0176',
        hours: 'Mon–Sun 10am–8pm'
    }
]

module.exports = async ({ postal_code = '' }) => {
    if (!postal_code || typeof postal_code !== 'string' || !postal_code.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a postal_code (or city) to search for nearby Fréscopa retailers.' }],
            // structuredContent.retailers — derived from action name "find_retailer" (bare array outputSchema rule)
            structuredContent: { retailers: [] }
        }
    }

    const query = postal_code.trim()

    // MOCK_DATA is not geo-filtered — the real API (see TODO) would query by postal code.
    // Return all mock retailers as the nearby results for the provided query.
    const retailers = MOCK_DATA

    const summary = retailers.length > 0
        ? `Found ${retailers.length} Fréscopa retailers near ${query}.`
        : `No Fréscopa retailers found near ${query}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.retailers — derived from action name "find_retailer" (bare array outputSchema rule)
        structuredContent: { retailers }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/retailers?postal_code=${postal_code}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/retailers?postal_code=${encodeURIComponent(postal_code)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
