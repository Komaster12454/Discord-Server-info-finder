import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { botToken, serverId } = req.body;

    if (!botToken || !serverId) {
        return res.status(400).json({ error: 'Missing bot token or server ID' });
    }

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}`, {
            headers: {
                'Authorization': `Bot ${botToken}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch server info');

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
