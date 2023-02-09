const { body } = require('express-validator');
const Area = require('../models/area');

exports.addArea = [
  body('provinceName').not().isEmpty().withMessage('required_province'),
  body('districtName').not().isEmpty().withMessage('required_district'),
  body('areaName')
    .not()
    .isEmpty()
    .withMessage('required_name')
    .bail()
    .custom(async (areaName) => {
      let area = await Area.findOne({ name: areaName });
      if (area) {
        return Promise.reject('existed_name');
      }

      return true;
    }),
  body('minPrice').not().isEmpty().withMessage('required_price'),
  body('maxPrice').not().isEmpty().withMessage('required_price'),
  body('areaCapacity').not().isEmpty().withMessage('required_capacity'),
  body('areaDesc').not().isEmpty().withMessage('required_description'),
];

exports.updateArea = [
  body('areaName')
    .not()
    .isEmpty()
    .withMessage('required_name')
    .bail()
    .custom(async (areaName, { req }) => {
      let area = await Area.findOne({
        name: areaName,
        _id: { $ne: req.params.areaId },
      });
      if (area) {
        return Promise.reject('existed_name');
      }

      return true;
    }),
  body('minPrice').not().isEmpty().withMessage('required_price'),
  body('maxPrice').not().isEmpty().withMessage('required_price'),
  body('areaCapacity').not().isEmpty().withMessage('required_capacity'),
  body('areaDesc').not().isEmpty().withMessage('required_description'),
];
