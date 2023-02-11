const { validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

const District = require('../models/district');
const Location = require('../models/location');
const Province = require('../models/province');

const ServerException = require('../utils/ServerException');

/*** GET PROVINCES TO SEARCH ***/

// [GET] List locations
exports.getListLocations = async (req, res, next) => {
  try {
    const locations = await Location.findLocationValid();

    res.status(200).send(locations);
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] List provinces
exports.getListProvinces = async (req, res, next) => {
  try {
    const locations = await Location.find(
      { countArea: { $gt: 0 } },
      { _id: 0, provinceName: 1 },
    );

    let provinces = [];
    if (locations.length > 0) {
      locations.forEach((province) => {
        if (!provinces.includes(province.provinceName)) {
          provinces.push(province.provinceName);
        }
      });
    }

    res.status(200).json({
      provinces,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] List provinces
exports.getListDistricts = async (req, res, next) => {
  try {
    const districts = await Location.findDistricts(req.query.provinceName);

    res.status(200).send(districts[0]);
  } catch (error) {
    return next(new ServerException(error));
  }
};

/*** GET PROVINCES TO ADD AREA ***/

// [GET] Provinces API ( full province, district)
exports.getQueryLocations = async (req, res, next) => {
  try {
    const locations = await District.provinceAPI();

    res.status(200).send(locations);
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Get provinces
exports.getQueryProvinces = async (req, res, next) => {
  try {
    const provinces = await Province.queryProvinces();
    res.status(200).send(provinces);
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Get district
exports.getQueryDistricts = async (req, res, next) => {
  try {
    const districts = await District.queryDistricts(req.query.provinceId);
    res.status(200).send(districts);
  } catch (error) {
    return next(new ServerException(error));
  }
};