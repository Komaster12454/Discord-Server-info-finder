import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { botToken, serverId } = req.body;

    // Check if botToken and serverId are provided
    if (!botToken || !serverId) {
        console.error('Missing bot token or server ID');
        return res.status(400).json({ error: 'Missing bot token or server ID' });
    }

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}`, {
            headers: {
                'Authorization': `Bot ${botToken}`
            }
        });

        // Check for errors in the response
        if (!response.ok) {
            const errorResponse = await response.json().catch(() => response.text());
            console.error('Discord API Error:', errorResponse);
            return res.status(response.status).json({ error: errorResponse.message || 'Failed to fetch server info' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Internal Server Error:', error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
