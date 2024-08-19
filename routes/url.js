import express from 'express';
import { handleGenerateNewShortURL, handleFetchID, handleGetAnalytics } from '../controllers/url.js';

const router = express.Router();

// Route to generate a new short URL
router.post('/', handleGenerateNewShortURL);

// Route to handle the redirect based on shortId
router.get('/:shortId', handleFetchID);

// Route to get analytics for a specific short URL
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;
