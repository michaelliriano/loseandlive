const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', userController.home);
router.get('/about', userController.construction);
router.get('/careers', userController.construction);
router.get('/contact', userController.construction);
router.get('/sign-up', userController.signUpGuest);
router.post('/register', userController.register);
router.post('/login', userController.login);
module.exports = router;
