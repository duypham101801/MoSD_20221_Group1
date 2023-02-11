const { body } = require('express-validator');
const config = require('config');

const AreaFile = require('../models/area_file');
const HouseFile = require('../models/house_file');

exports.addAreaFile = [
  body('fileTitle')
    .not()
    .isEmpty()
    .withMessage('required_file_title')
    .bail()
    .isLength({ max: 125 })
    .bail()
    .custom(async (fileTitle, { req }) => {
      const checkFile = await AreaFile.findOne({
        areaId: req.params.areaId,
        title: fileTitle,
      });

      if (checkFile) {
        return Promise.reject('existed_file_title');
      }
      return true;
    }),
];

exports.addHouseFile = [
  body('fileTitle')
    .not()
    .isEmpty()
    .withMessage('required_file_title')
    .bail()
    .isLength({ max: 125 })
    .bail()
    .custom(async (fileTitle, { req }) => {
      const checkFile = await HouseFile.findOne({
        houseId: req.params.houseId,
        title: fileTitle,
      });

      if (checkFile) {
        return Promise.reject('existed_file_title');
      }
      return true;
    }),
];

exports.updateAreaFile = [
  body('fileTitle')
    .not()
    .isEmpty()
    .withMessage('required_file_title')
    .bail()
    .isLength({ max: 125 })
    .bail()
    .custom(async (fileTitle, { req }) => {
      const checkFile = await AreaFile.findOne({
        _id: { $ne: req.params.fileId },
        title: fileTitle,
      });

      if (checkFile) {
        return Promise.reject('existed_file_title');
      }

      return true;
    }),
];

exports.updateHouseFile = [
  body('fileTitle')
    .not()
    .isEmpty()
    .withMessage('required_file_title')
    .bail()
    .isLength({ max: 125 })
    .bail()
    .custom(async (fileTitle, { req }) => {
      const checkFile = await HouseFile.findOne({
        _id: { $ne: req.params.fileId },
        title: fileTitle,
      });

      if (checkFile) {
        return Promise.reject('existed_file_title');
      }

      return true;
    }),
];
