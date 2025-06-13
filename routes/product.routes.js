const express = require('express');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/', productController.home);

router.get('/catalogue', productController.catalogue);

router.get('/shopping-cart', isAuthenticated, productController.showShoppingCart);

router.post('/shopping-cart/add/:id', isAuthenticated, productController.addInShoppingCart);

router.delete('/shopping-cart/delete/:id', isAuthenticated, productController.deleteInShoppingCart);

router.get('/:id', productController.show);





module.exports = router;