const express = require('express');

const router = express.Router();

const postController = require('../controllers/PostController');

router.get('/', postController.listPosts);

router.get('/:slug', postController.showPost);

router.get('/categorie/:slug', postController.postsByCategory);

module.exports = router;