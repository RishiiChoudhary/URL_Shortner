const express = require('express')
const {handleGenerateNewShortURL,handleGetAnalysticURL} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalysticURL);

module.exports = router;