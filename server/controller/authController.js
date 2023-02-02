const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const config = require('config');

const User = require('../models/user');
const ValidationException = require('../utils/ValidationException');
const ServerException = require('../utils/ServerException');
const HttpException = require('../utils/HttpException');
const ResourceUnavailable = require('../utils/ResourceUnavailable');
const SendMail = require('../utils/SendMail');

/** Authentication
 * [POST] Login
 * [POST] Refresh token
 * [POST] Forgot password
 * [GET] Profile
 * [POST] Change password
 * [PUT] Update profile
 * [POST] Logout
 */

// [POST] Login
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const checkUser = await User.findOne({ email, role });

    if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
      const user = {
        _id: checkUser._id,
        role: checkUser.role,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: config.get('expiredTime.access_token_exp'),
      });

      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: config.get('expiredTime.refresh_token_exp'),
      });

      await User.findByIdAndUpdate(checkUser._id, {
        refreshToken: refreshToken,
      });

      res.status(200).json({
        message: req.t('login_success'),
        userId: checkUser._id,
        role: checkUser.role,
        accessToken,
        refreshToken,
      });
    } else {
      return next(new HttpException(401, 'incorrect_login'));
    }
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [POST] Refresh token
exports.postRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new HttpException(400, 'token_not_provided'));
    }

    const checkUser = await User.findOne({
      refreshToken: refreshToken,
    });

    if (!checkUser) {
      return next(new HttpException(401, 'invalid_token'));
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        return next(new HttpException(401, 'invalid_token'));
      }

      const user = {
        _id: data._id,
        role: data.role,
      };

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: config.get('expiredTime.refresh_token_exp'),
      });

      res.status(200).json({
        message: req.t('success'),
        accessToken: accessToken,
      });
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [POST] Forgot password
exports.postForgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    const { email, role } = req.body;

    const newPassword = randomString.generate(8);

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(newPassword, salt);

    const msg = {
      to: req.body.email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Forgot Password',
      html: `
      <p>Your new password is: ${newPassword}</p>
      `,
    };

    await SendMail(msg);
    await User.updateOne(
      {
        email,
        role,
      },
      {
        password: hash,
      },
    );

    res.status(200).json({
      message: req.t('send_email_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [POST] Change password
exports.postChangePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(newPassword, salt);

    await User.updateOne({ _id: req.user._id }, { password: hash });
    res.status(200).json({
      message: req.t('Change_password_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Profile
exports.getProfile = async (req, res, next) => {
  try {
    const checkUser = await User.findById(req.user._id, {
      email: 1,
      name: 1,
      phone: 1,
      role: 1,
    });

    if (!checkUser) {
      return next(new ResourceUnavailable());
    }

    res.status(200).json({
      message: req.t('success'),
      user: checkUser,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [PUT] Update profile
exports.putProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    await User.findByIdAndUpdate(req.user._id, {
      name,
      phone,
    });

    res.status(200).json({
      message: req.t('update_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [POST] Logout
exports.postLogout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user._id }, { refresh_token: null });

    res.status(200).json({
      message: req.t('logout_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};
