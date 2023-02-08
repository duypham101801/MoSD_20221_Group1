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

// [PUT] Change avatar
exports.putChangeAvatar = async (req, res, next) => {
  try {
    const pathAvatar = req.file.path.replace(/\\/g, '/');
    let checkHouse = await House.findById(req.params.houseId);

    const oldPathAvatar = checkHouse.urlAvatar.replace(RE, 'public');
    if (fs.existsSync(oldPathAvatar)) {
      fs.unlinkSync(oldPathAvatar);
    }

    await House.findByIdAndUpdate(req.params.houseId, {
      urlAvatar: `${process.env.API_URL}${pathAvatar.replace(/public/, '')}`,
    });

    res.status(200).json({
      message: req.t('change_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [DELETE] Delete house
exports.deleteHouse = async (req, res, next) => {
  try {
    const houseId = req.params.houseId;

    const house = await House.findById(houseId);
    const houseFiles = await HouseFile.find({ houseId });
    const houseImages = await HouseImage.find({ houseId });

    if (houseFiles.length > 0) {
      houseFiles.map((file) => {
        const pathFile = file.urlFile.replace(RE, 'public');
        const pathThumb = file.urlThumb.replace(RE, 'public');

        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }
        if (fs.existsSync(pathThumb)) {
          fs.unlinkSync(pathThumb);
        }
      });

      await HouseFile.deleteMany({ houseId });
    }

    if (houseImages.length > 0) {
      houseImages.map((image) => {
        const pathImage = image.url.replace(RE, 'public');
        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage);
        }
      });
      await HouseImage.deleteMany({ houseId });
    }

    const pathAvatar = house.urlAvatar.replace(RE, 'public');
    if (fs.existsSync(pathAvatar)) {
      fs.unlinkSync(pathAvatar);
    }
    await House.findByIdAndDelete(houseId);

    res.status(200).json({
      message: req.t('delete_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};
