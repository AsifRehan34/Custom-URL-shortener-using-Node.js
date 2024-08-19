import { nanoid } from 'nanoid';
import URL from '../models/url.js';

export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        shortURL: body.url,
        visitHistory: [],
    });
    return res.render("home",
    {
        id:shortID,
    }
    );
}

export async function handleFetchID(req, res) {
    const shortId = req.params.shortId;
    console.log(`Searching for shortId: ${shortId}`);

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            console.log(`No entry found for shortId: ${shortId}`);
            return res.status(404).json({ error: 'Short URL not found' });
        }

        console.log(`Redirecting to: ${entry.shortURL}`);
        return res.redirect(entry.shortURL);
    } catch (error) {
        console.error("Error handling short URL redirection:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.json({
        TotalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
