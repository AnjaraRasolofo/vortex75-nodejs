const express = require('express');

const router = express.Router();

const messageController = require('../controllers/MessageController');

router.get('/', messageController.send);

module.exports = router;