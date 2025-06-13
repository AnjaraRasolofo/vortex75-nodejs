const express = require('express');

const router = express.Router();

const signalController = require('../controllers/SignalController');

router.get('/', signalController.home);

module.exports = router;