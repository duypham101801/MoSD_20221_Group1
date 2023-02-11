const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const Validator = require('../validators/authValidator');
const Authorization = require('../middlewares/authorization');

// [POST] Login
router.post('/login', [Validator.login, AuthController.postLogin]);

// [POST] CLient request fresh token
router.post('/refresh-token', [AuthController.postRefreshToken]);

// [POST] Forgot password
router.post('/forgot-password', [
    Validator.forgotPassword,
    AuthController.postForgotPassword,
  ]);
  
  // [POST] Change password
  router.post('/change-password', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    Validator.changePassword,
    AuthController.postChangePassword,
  ]);

// [GET] profile
router.get('/profile', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    AuthController.getProfile,
]);

// [PUT] profile
router.put('/profile', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    Validator.updateProfile,
    AuthController.putProfile,
  ]);

// [POST] Logout
router.post('/logout', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    AuthController.postLogout,
]);
  
module.exports = router;