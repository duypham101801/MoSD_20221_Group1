const { validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

const District = require('../models/district');
const Location = require('../models/location');
const Province = require('../models/province');

const ServerException = require('../utils/ServerException');

/*** GET PROVINCES TO SEARCH ***/

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

// [GET] List districts
exports.getListDistricts = async (req, res, next) => {
  try {
    const districts = await Location.findDistricts(req.query.provinceName);

    res.status(200).send(districts[0]);
  } catch (error) {
    return next(new ServerException(error));
  }
};



