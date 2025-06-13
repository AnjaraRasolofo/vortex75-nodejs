const express = require('express');
const router = express.Router();
const NewsletterController = require('../controllers/NewsletterController');

router.post('/', NewsletterController.store);

module.exports = router;