// routes/api.routes.js

const express = require('express');
const multer = require('multer');
const router = express.Router();
const AuthController = require('../api/AuthController');
const PostController = require('../api/PostController');
const CategoryController = require('../api/CategoryController');
const UserController = require('../api/UserController');

// Configuration de multer pour stocker les fichiers uploader depuis reactjs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage });

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

router.get('/posts', PostController.getAll);
router.get('/post/:id', PostController.getById);
router.post('/post',upload.single('image'), PostController.create);
router.put('/post/:id',upload.single('image'), PostController.update);
router.delete('/post/:id', PostController.delete);

router.get('/categories', CategoryController.getAll);
router.get('/category/:id', CategoryController.getById);
router.post('/category', CategoryController.create);
router.put('/category/:id', CategoryController.update);
router.delete('/category/:id', CategoryController.delete);

router.get('/users', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

module.exports = router;