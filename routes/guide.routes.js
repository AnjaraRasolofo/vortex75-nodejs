const express = require('express');

const router = express.Router();

const guideController = require('../controllers/GuideController');

router.get('/', guideController.about);

module.exports = router;