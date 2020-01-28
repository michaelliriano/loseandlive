const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', userController.home);
router.get('/sign-up', userController.signUpGuest);

module.exports = router;
