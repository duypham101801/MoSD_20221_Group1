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

// [POST] Add new house
exports.postAddHouse = async (req, res, next) => {
  try {
    const pathAvatar = req.file.path.replace(/\\/g, '/');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      fs.unlinkSync(pathAvatar);
      return next(new ValidationException(errors.array()));
    }
    const { houseName, houseType, housePrice, houseInfo, houseCount } =
      req.body;

    const houseCreated = await House.create({
      areaId: req.params.areaId,
      name: houseName,
      urlAvatar: `${process.env.API_URL}${pathAvatar.replace(/public/, '')}`,
      type: houseType,
      price: housePrice,
      info: houseInfo,
      count: parseInt(houseCount, 10),
    });

    res.status(201).json({
      message: req.t('create_success'),
      house: houseCreated,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [PUT] Update house detail
exports.putHouseDetail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const { houseName, houseType, housePrice, houseInfo, houseCount } =
      req.body;

    await House.findByIdAndUpdate(req.params.houseId, {
      name: houseName,
      type: houseType,
      price: housePrice,
      info: houseInfo,
      count: houseCount,
    });

    res.status(200).json({
      message: req.t('update_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};
