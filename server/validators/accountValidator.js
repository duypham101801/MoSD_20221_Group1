const { body } = require('express-validator');
const config = require('config');

const User = require('../models/user');

exports.createAccount = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('required_email')
    .bail()
    .custom(async (value, { req }) => {
      let check_user = await User.findOne({
        email: value,
        role: req.body.role,
      });
      if (check_user) {
        return Promise.reject('existed_account');
      }

      return true;
    }),
  body('phone')
    .not()
    .isEmpty()
    .withMessage('required_phone')
    .bail()
    .matches(new RegExp(config.get('regex_phone')))
    .withMessage('invalid_phone'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('required_password')
    .bail()
    .isLength({ min: 6 }),
  body('confirmPassword').custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      return Promise.reject('incorrect_confirm_password');
    }

    return true;
  }),
];
