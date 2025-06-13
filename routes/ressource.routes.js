const express = require('express');

const router = express.Router();

const ressourceController = require('../controllers/RessourceController');

router.get('/', ressourceController.listTutorials);
router.get('/:slug', ressourceController.showTutorial);

module.exports = router;