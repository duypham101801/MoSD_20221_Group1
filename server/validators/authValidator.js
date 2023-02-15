const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');

const User = require('../models/user');

exports.login = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('required_email')
    .bail()
    .isEmail()
    .withMessage('invalid_email'),
  body('role').not().isEmpty().withMessage('required_role'),
  body('password').not().isEmpty().withMessage('required_password'),
];

exports.changePassword = [
  body('currentPassword')
    .not()
    .isEmpty()
    .withMessage('required_password')
    .bail()
    .custom((currentPassword, { req }) => {
      if (!bcrypt.compareSync(currentPassword, req.body.password)) {
        return Promise.reject('incorrect_password');
      }

      return true;
    }),
  body('newPassword')
    .not()
    .isEmpty()
    .withMessage('required_new_password')
    .bail()
    .isLength({ min: 6 }),
  body('confirmPassword').custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.newPassword) {
      return Promise.reject('incorrect_confirm_password');
    }

    return true;
  }),
];

exports.forgotPassword = [
  body('role').not().isEmpty().withMessage('require_role'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('require_email')
    .bail()
    .isEmail()
    .withMessage('invalid_email')
    .bail()
    .custom(async (email, { req }) => {
      const checkUser = await User.findOne({
        email,
        role: req.body.role,
      });
      if (!checkUser) {
        return Promise.reject('account_not_exists');
      }

      return true;
    }),
];

exports.updateProfile = [
  body('name').not().isEmpty().withMessage('required_name'),
  body('phone')
    .not()
    .isEmpty()
    .withMessage('required_phone')
    .bail()
    .matches(new RegExp(config.get('regex_phone')))
    .withMessage('invalid_phone'),
];
