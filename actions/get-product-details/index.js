// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'House Blend - Dark Roast',
        description: 'A bold dark roast of Arabica and Robusta beans with notes of dark chocolate, toasted nuts, and smokiness.',
        image_url: 'https://frescopa.coffee/products/hbdr212/media_1743b8d1728141829345e636987b2ef62eb6636e7.avif?width=1200&format=pjpg&optimize=medium',
        price: '$14.99',
        category: 'Bagged Coffee'
    },
    {
        name: 'House Blend - Espresso',
        description: 'A rich espresso blend of Arabica and Robusta beans with notes of dark chocolate, caramel, and nuttiness.',
        image_url: 'https://frescopa.coffee/products/hbex213/media_1629fa1f91b7fe1c09dae2d9518b7df86dc0502f4.avif?width=1200&format=pjpg&optimize=medium',
        price: '$14.99',
        category: 'Bagged Coffee'
    },
    {
        name: 'House Blend - Medium Roast',
        description: 'A balanced medium roast with hints of caramel, toasted nuts, and fruitiness for a smooth daily cup.',
        image_url: 'https://frescopa.coffee/products/hbmr211/media_1826d3245acb9c9a2eb68e6ae2e0a20ec19e4cf71.avif?width=1200&format=pjpg&optimize=medium',
        price: '$14.99',
        category: 'Bagged Coffee'
    },
    {
        name: 'Morning Muse - Light Roast',
        description: 'A Colombian light-roast coffee pod with notes of caramel, chocolate, and cherry.',
        image_url: 'https://frescopa.coffee/products/pod311/media_1385e21a8cecbcb340946f79797ad589623cb049c.avif?width=1200&format=pjpg&optimize=medium',
        price: '$3.99',
        category: 'Coffee Pods'
    },
    {
        name: 'Fresco Original',
        description: 'Single-serve espresso machine with a detachable reservoir and removable drip dish for easy cleaning.',
        image_url: 'https://frescopa.coffee/products/csm5125/media_143b6a68a2b167e460bc311b4b724e793d0acfc3f.avif?width=1200&format=pjpg&optimize=medium',
        price: '$299.00',
        category: 'Coffee Machines'
    },
    {
        name: 'Fresco Deluxe',
        description: 'Triple-nozzle espresso machine with timed brewing, adjustable grind coarseness, and custom drink settings.',
        image_url: 'https://frescopa.coffee/products/csm5131/media_143b6a68a2b167e460bc311b4b724e793d0acfc3f.avif?width=1200&format=pjpg&optimize=medium',
        price: '$499.00',
        category: 'Coffee Machines'
    }
];

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product name to retrieve details for.' }]
        };
    }

    const query = name.trim().toLowerCase();
    let item = MOCK_DATA.find((p) => p.name.toLowerCase() === query);
    if (!item) {
        item = MOCK_DATA.find((p) => p.name.toLowerCase().includes(query));
    }

    if (!item) {
        // Not found — return content only (no structuredContent) so the widget shows its empty state.
        return {
            content: [{ type: 'text', text: `No product found matching: ${name.trim()}` }]
        };
    }

    const summary = `${item.name} — ${item.category}, priced at ${item.price}. ${item.description}`;
    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: { ...item }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
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
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
