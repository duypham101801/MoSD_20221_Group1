const { validationResult } = require('express-validator');
const fs = require('fs');

const ServerException = require('../utils/ServerException');
const ValidationException = require('../utils/ValidationException');
const House = require('../models/house');
const HouseImage = require('../models/house_image');
const HouseFile = require('../models/house_file');

const RE = new RegExp(process.env.API_URL, 'g');

// [GET] House detail
exports.getHouseDetail = async (req, res, next) => {
  try {
    const houseDetail = await House.findById(req.params.houseId);

    res.status(200).json({
      message: req.t('success'),
      house: houseDetail,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [PUT] Update house detail
router.put('/house-detail/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  Validator.updateHouse,
  HouseController.putHouseDetail,
]);

// [GET] List of houses
exports.getListHouses = async (req, res, next) => {
    try {
      const listHouses = await House.find({ areaId: req.params.areaId });
  
      res.status(200).json({
        message: req.t('success'),
        houses: listHouses,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
