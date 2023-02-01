const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const AccountController = require('../controllers/accountController');
const Validator = require('../validators/accountValidator');
const Authorization = require('../middleware/authorization');

// [POST] Create account
router.post('/create-account', [
  Authorization.authenToken(['admin']),
  Validator.createAccount,
  AccountController.postCreateAccount,
]);

// [GET] List of accounts
router.get('/list-accounts', [
  Authorization.authenToken(['admin']),
  AccountController.getListAccounts,
]);

// [GET] Account detail
router.get('/account-detail/:userId', [
  Authorization.authenToken(['admin']),
  ResourceValidator.checkData(config.get('paramId.user')),
  AccountController.getAccountDetail,
]);

// [DELETE] Delete account
router.delete('/delete-account/:userId', [
  Authorization.authenToken(['admin']),
  ResourceValidator.checkData(config.get('paramId.user')),
  AccountController.deleteAccount,
]);

module.exports = router;
