const { validationResult } = require("express-validator");
const fs = require("fs");
const config = require("config");

const Area = require("../models/area");
const House = require("../models/house");
const AreaFile = require("../models/area_file");
const HouseFile = require("../models/house_file");

const ServerException = require("../utils/ServerException");
const ValidationException = require("../utils/ValidationException");

const RE = new RegExp(process.env.API_URL, "g");

// [GET] List of files
exports.getListFiles = (type) => {
  return async (req, res, next) => {
    try {
      let listFiles;
      if (type === config.get('type.area')) {
        listFiles = await AreaFile.find({ areaId: req.params.areaId });
      } else {
        listFiles = await HouseFile.find({ houseId: req.params.houseId });
      }

      res.status(200).json({
        message: req.t('success'),
        files: listFiles,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};