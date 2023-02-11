const { body } = require('express-validator');

const House = require('../models/house');

exports.addHouse = [
  body('houseName')
    .not()
    .isEmpty()
    .withMessage('required_name')
    .bail()
    .custom(async (houseName, { req }) => {
      const checkHouse = await House.findOne({
        areaId: req.params.areaId,
        name: houseName,
      });
      if (checkHouse) {
        return Promise.reject('existed_name');
      }

      return true;
    }),
  body('housePrice').not().isEmpty().withMessage('required_price'),
  body('houseInfo').not().isEmpty().withMessage('required_info'),
  body('houseType').not().isEmpty().withMessage('required_type'),
  body('houseCount').not().isEmpty().withMessage('required_count'),
];

exports.updateHouse = [
  body('houseName')
    .not()
    .isEmpty()
    .withMessage('required_name')
    .bail()
    .custom(async (houseName, { req }) => {
      const checkHouse = await House.findOne({
        _id: { $ne: req.params.houseId },
        name: houseName,
      });
      if (checkHouse) {
        return Promise.reject('existed_name');
      }

      return true;
    }),
  body('housePrice').not().isEmpty().withMessage('required_price'),
  body('houseInfo').not().isEmpty().withMessage('required_info'),
  body('houseType').not().isEmpty().withMessage('required_type'),
  body('houseCount').not().isEmpty().withMessage('required_count'),
];
