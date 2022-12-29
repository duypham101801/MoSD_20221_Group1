const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const Area = require('../models/area');
const Province = require('../models/province');
const District = require('../models/district');
const Location = require('../models/location');
const House = require('../models/house');
const AreaFile = require('../models/area_file');
const AreaImage = require('../models/area_image');
const ServerException = require('../utils/ServerException');
const ValidationException = require('../utils/ValidationException');

const RE = new RegExp(process.env.API_URL, 'g');

/** Manage Area
 * [GET] Guest search areas
 * [GET] Sale filter areas
 * [POST] Add area
 * [PUT] Upload avatar
 * [GET] Area detail
 * [PUT] Update area
 * [DELETE] Delete area
 */

// [POST] Guest search areas
exports.getSearchAreas = async (req, res, next) => {
  try {
    const provinceName = req.query.provinceName
      ? req.query.provinceName
      : 'Tỉnh Hòa Bình';
    const districtName = req.query.districtName ? req.query.districtName : null;
    const minCapacity = req.query.minCapacity ? req.query.minCapacity : '1';

    const searchResultAreas = await Area.searchAreas(
      provinceName,
      districtName,
      minCapacity,
    );

    res.status(200).json({
      message: req.t('success'),
      areas: searchResultAreas,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Sale filter areas
exports.getListAreas = async (req, res, next) => {
  try {
    const provinceName = req.query.provinceName
      ? req.query.provinceName
      : 'Tỉnh Hòa Bình';
    const districtName = req.query.districtName
      ? req.query.districtName
      : 'Thành phố Hòa Bình';

    const filterResultAreas = await Area.findAreas(provinceName, districtName);

    res.status(200).json({
      message: req.t('success'),
      areas: filterResultAreas,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [POST] Add area
exports.postAddArea = async (req, res, next) => {
  try {
    const pathAvatar = req.file.path.replace(/\\/g, '/');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      fs.unlinkSync(pathAvatar);
      return next(new ValidationException(errors.array()));
    }

    const {
      provinceName,
      districtName,
      areaName,
      minPrice,
      maxPrice,
      areaCapacity,
      areaDesc,
      areaVideo,
    } = req.body;

    let province = await Province.findOne({ name: provinceName });
    let district = await District.findOne({
      provinceId: province.id,
      name: districtName,
    });

    let location = await Location.findOne({
      provinceName: province.name,
      districtName: district.name,
    });

    if (!location) {
      location = await Location.create({
        provinceName: province.name,
        districtName: district.name,
      });
    }

    const area = await Area.create({
      provinceId: province.id,
      districtId: district.id,
      name: areaName,
      urlAvatar: `${process.env.API_URL}${pathAvatar.replace(/public/, '')}`,
      minPrice: minPrice,
      maxPrice: maxPrice,
      capacity: parseInt(areaCapacity, 10),
      description: areaDesc,
      urlVideo: areaVideo,
    });

    await Location.findByIdAndUpdate(location._id, {
      countArea: location.countArea + 1,
    });

    res.status(201).json({
      message: req.t('create_success'),
      area,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [PUT] Change avatar
exports.putChangeAvatar = async (req, res, next) => {
  try {
    const pathAvatar = req.file.path.replace(/\\/g, '/');
    let area = await Area.findById(req.params.areaId);

    const oldPathAvatar = area.urlAvatar.replace(RE, 'public');
    if (fs.existsSync(oldPathAvatar)) {
      fs.unlinkSync(oldPathAvatar);
    }

    await Area.findByIdAndUpdate(req.params.areaId, {
      urlAvatar: `${process.env.API_URL}${pathAvatar.replace(/public/, '')}`,
    });

    res.status(200).json({
      message: req.t('change_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Area detail
exports.getAreaDetail = async (req, res, next) => {
  try {
    const areaDetail = await Area.findById(req.params.areaId);
    res.status(200).json({
      message: req.t('success'),
      area: areaDetail,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [PUT] Update area
exports.putAreaDetail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const { areaName, minPrice, maxPrice, areaCapacity, areaDesc, areaVideo } =
      req.body;

    await Area.findByIdAndUpdate(req.params.areaId, {
      name: areaName,
      minPrice: minPrice,
      maxPrice: maxPrice,
      capacity: parseInt(areaCapacity, 10),
      description: areaDesc,
      urlVideo: areaVideo,
    });

    res.status(200).json({
      message: req.t('update_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [DELETE] Delete area
exports.deleteArea = async (req, res, next) => {
  try {
    const areaId = req.params.areaId;
    const area = await Area.findById(areaId);
    const areaFiles = await AreaFile.find({ areaId });
    const areaImages = await AreaImage.find({ areaId });
    const listHouses = await House.find({ areaId });

    const province = await Province.findOne({ id: area.provinceId });
    const district = await District.findOne({ id: area.districtId });
    let location = await Location.findOne({
      provinceName: province.name,
      districtName: district.name,
    });

    /***** Delete area's avatar storage *****/
    const pathAvatar = area.urlAvatar.replace(RE, 'public');

    if (fs.existsSync(pathAvatar)) {
      fs.unlinkSync(pathAvatar);
    }

    /***** Delete area's file storage *****/
    if (areaFiles.length > 0) {
      areaFiles.map((file) => {
        const pathFile = file.urlFile.replace(RE, 'public');
        const pathThumb = file.urlThumb.replace(RE, 'public');

        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }
        if (fs.existsSync(pathThumb)) {
          fs.unlinkSync(pathThumb);
        }
      });

      // Delete all area's file
      await AreaFile.deleteMany({ areaId });
    }

    /***** Delete area's image storage*****/
    if (areaImages.length > 0) {
      areaImages.map((image) => {
        const pathImage = image.url.replace(RE, 'public');
        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage);
        }
      });
      // Delete all area's image
      await AreaImage.deleteMany({ areaId });
    }

    /***** Delete area's houses *****/
    if (listHouses.length > 0) {
      listHouses.map(async (house) => {
        const houseId = house._id;
        await axios.delete(
          `${process.env.API_URL}/api/house/delete-house/${houseId}`,
          {
            headers: {
              authorization: req.headers['authorization'],
            },
          },
        );
      });
    }

    // Delete area
    await Area.findByIdAndDelete(areaId);

    // Update countArea
    await Location.findByIdAndUpdate(location._id, {
      countArea: location.countArea - 1,
    });

    res.status(200).json({
      message: req.t('delete_success'),
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};
