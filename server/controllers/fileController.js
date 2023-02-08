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

// [POST] Add new file
exports.postAddFile = (type) => {
  return async (req, res, next) => {
    try {
      const { fileTitle, fileDesc } = req.body;
      const pathThumb = req.files.thumb[0].path.replace(/\\/g, '/');
      const pathFile = req.files.file[0].path.replace(/\\/g, '/');

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        fs.unlinkSync(pathThumb);
        fs.unlinkSync(pathFile);
        return next(new ValidationException(errors.array()));
      }

      let fileCreate;
      if (type === config.get('type.area')) {
        fileCreate = await AreaFile.create({
          areaId: req.params.areaId,
          title: fileTitle,
          urlThumb: `${process.env.API_URL}${pathThumb.replace(/public/, '')}`,
          urlFile: `${process.env.API_URL}${pathFile.replace(/public/, '')}`,
          description: fileDesc,
        });
      } else {
        fileCreate = await HouseFile.create({
          houseId: req.params.houseId,
          title: fileTitle,
          urlThumb: `${process.env.API_URL}${pathThumb.replace(/public/, '')}`,
          urlFile: `${process.env.API_URL}${pathFile.replace(/public/, '')}`,
          description: fileDesc,
        });
      }

      res.status(201).json({
        message: req.t('create_success'),
        file: fileCreate,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

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

// [GET] File detail
exports.getFileDetail = (type) => {
  return async (req, res, next) => {
    try {
      let fileDetail;
      if (type === config.get('type.area')) {
        fileDetail = await AreaFile.findById(req.params.fileId);
      } else {
        fileDetail = await HouseFile.findById(req.params.fileId);
      }

      res.status(200).json({
        message: req.t('success'),
        file: fileDetail,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [PUT] Update file detail
exports.putFileDetail = (type) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationException(errors.array()));
      }

      const { fileTitle, fileDesc } = req.body;

      if (type === config.get('type.area')) {
        await AreaFile.findByIdAndUpdate(req.params.fileId, {
          title: fileTitle,
          description: fileDesc,
        });
      } else {
        await HouseFile.findByIdAndUpdate(req.params.fileId, {
          title: fileTitle,
          description: fileDesc,
        });
      }

      res.status(201).json({
        message: req.t('update_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};