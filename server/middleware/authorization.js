require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpException = require('../utils/HttpException');
const ServerException = require('../utils/ServerException');

exports.authenToken = (roles) => {
  return (req, res, next) => {
    try {
      const authorizationHeader = req.headers['authorization'];

      // 'Beaer [token]'
      const token = authorizationHeader && authorizationHeader.split(' ')[1];
      if (!token) {
        return next(new HttpException(401, 'authorization_failed'));
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err || !roles.includes(data.role))
          return next(new HttpException(401, 'authorization_failed'));

        User.findById(data._id).then((user) => {
          req.user = user;
          next();
        });
      });
    } catch (error) {
      return next(new ServerException());
    }
  };
};
