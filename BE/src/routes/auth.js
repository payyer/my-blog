const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.post('/login', authController.authLogin);

router.delete('/logout', authController.authLogout);

router.post('/register', authController.authRegister);

router.get('/verify-email/:opt', authController.verifiedEmail);

router.post('/forgot-password', authController.forgotPassword);

router.put('/reset-password/:opt', authController.resetPassword);

module.exports = router;