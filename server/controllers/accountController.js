const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const ValidationException = require('../utils/ValidationException');
const ServerException = require('../utils/ServerException');
const SendMail = require('../utils/SendMail');

/** Manage Account
 * [GET] List of accounts
 * [POST] Create account
 * [GET] Account detail
 * [DELETE] Delete account
 */

// [POST] Create account
exports.postCreateAccount = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const { email, name, phone, role, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    let user = await User.create({
      email,
      name,
      phone,
      role,
      password: hash,
    });

    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Create Account',
      html: `
      <p>You are created an account by Travelo\'s admin</p>
      <h4>Your account infomation:</h4>
      <ul>
        <li>Email: ${email}</li>
        <li>Name: ${name}</li>
        <li>Phone: ${phone}</li>
        <li>Role: ${role}</li>
        <li>Password: ${password}</li>
      </ul>
      `,
    };

    // await SendMail(msg);

    res.status(201).json({
      message: req.t('create_success'),
      user: user,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] List accounts
exports.getListAccounts = async (req, res, next) => {
  try {
    const listAccounts = await User.allAccount();

    res.status(200).json({
      message: req.t('success'),
      accounts: listAccounts,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Account detail
exports.getAccountDetail = async (req, res, next) => {
  try {
    const account = await User.accountDetail(req.params.userId);

    res.status(200).json({
      message: req.t('success'),
      account,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [DELETE] Delete account
exports.deleteAccount = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({
      message: req.t('delete_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};