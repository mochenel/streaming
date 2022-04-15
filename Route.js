const express = require('express');
const {downloadVideo,getVideoDetails } = require('./services/downloadVideo');
const router = express.Router();
router.get('/download', downloadVideo);
router.get('/getVideoDetails', getVideoDetails);

module.exports = router;