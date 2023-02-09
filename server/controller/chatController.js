const config = require('config');

const User = require('../models/user');
const HttpException = require('../utils/HttpException');
const ServerException = require('../utils/ServerException');

// [GET] Seclect sale receive contact
exports.getSelectSale = async (req, res, next) => {
  try {
    let listUser = await User.find({
      role: config.get('role.sale'),
    }).sort({
      countContacts: 1,
    });

    if (listUser.length < 1)
      return next(new HttpException(404, 'not_found_data'));
    let saleSelected = listUser[0];
    const countContacts =
      saleSelected.countContacts !== undefined ? countContacts + 1 : 1;

    await User.findByIdAndUpdate(saleSelected._id, {
      countContacts: countContacts,
    });
    res.status(201).json({
      message: req.t('success'),
      saleId: saleSelected._id,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};
