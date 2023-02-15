const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const Validator = require('../validators/authValidator');
const Authorization = require('../middleware/authorization');

// [POST] Login
router.post('/login', [Validator.login, AuthController.postLogin]);

// [POST] CLient request fresh token
router.post('/refresh-token', [AuthController.postRefreshToken]);

// [GET] profile
router.get('/profile', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    AuthController.getProfile,
]);

// [POST] Logout
router.post('/logout', [
    Authorization.authenToken(['admin', 'sale', 'editor']),
    AuthController.postLogout,
]);
  
module.exports = router;