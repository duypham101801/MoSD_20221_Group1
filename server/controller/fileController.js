const { validationResult } = require('express-validator');
const fs = require('fs');
const config = require('config');

const Area = require('../models/area');
const House = require('../models/house');
const AreaFile = require('../models/area_file');
const HouseFile = require('../models/house_file');

const ServerException = require('../utils/ServerException');
const ValidationException = require('../utils/ValidationException');

const RE = new RegExp(process.env.API_URL, 'g');




// [PUT] Change thumb
exports.putChangeThumb = (type) => {
  return async (req, res, next) => {
    try {
      const pathThumb = req.file.path.replace(/\\/g, '/');
      const fileId = req.params.fileId;
      if (type === config.get('type.area')) {
        const checkFile = await AreaFile.findById(fileId);
        const oldPathThumb = checkFile.urlThumb.replace(RE, 'public');
        if (fs.existsSync(oldPathThumb)) {
          fs.unlinkSync(oldPathThumb);
        }
        await AreaFile.findByIdAndUpdate(fileId, {
          urlThumb: `${process.env.API_URL}${pathThumb.replace(/public/, '')}`,
        });
      } else {
        const checkFile = await HouseFile.findById(fileId);
        const oldPathThumb = checkFile.urlThumb.replace(RE, 'public');
        if (fs.existsSync(oldPathThumb)) {
          fs.unlinkSync(oldPathThumb);
        }
        await HouseFile.findByIdAndUpdate(fileId, {
          urlThumb: `${process.env.API_URL}${pathThumb.replace(/public/, '')}`,
        });
      }

      await res.status(200).json({
        message: req.t('change_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [PUT] Change file
exports.putChangeFile = (type) => {
  return async (req, res, next) => {
    try {
      const pathFile = req.file.path.replace(/\\/g, '/');
      const fileId = req.params.fileId;
      if (type === config.get('type.area')) {
        const checkFile = await AreaFile.findById(fileId);
        const oldPathFile = checkFile.urlFile.replace(RE, 'public');
        if (fs.existsSync(oldPathFile)) {
          fs.unlinkSync(oldPathFile);
        }
        await AreaFile.findByIdAndUpdate(fileId, {
          urlFile: `${process.env.API_URL}${pathFile.replace(/public/, '')}`,
        });
      } else {
        const checkFile = await HouseFile.findById(fileId);
        const oldPathFile = checkFile.urlFile.replace(RE, 'public');
        if (fs.existsSync(oldPathFile)) {
          fs.unlinkSync(oldPathFile);
        }
        await AreaFile.findByIdAndUpdate(fileId, {
          urlFile: `${process.env.API_URL}${pathFile.replace(/public/, '')}`,
        });
      }

      res.status(200).json({
        message: req.t('change_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [DELETE] Delete file
exports.deleteFile = (type) => {
  return async (req, res, next) => {
    try {
      const fileId = req.params.fileId;
      if (type === config.get('type.area')) {
        const checkFile = await AreaFile.findById(fileId);
        const pathFile = checkFile.urlFile.replace(RE, 'public');
        const pathThumb = checkFile.urlThumb.replace(RE, 'public');
        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }
        if (fs.existsSync(pathThumb)) {
          fs.unlinkSync(pathThumb);
        }
        await AreaFile.findByIdAndDelete(fileId);
      } else {
        const checkFile = await HouseFile.findById(fileId);
        const pathFile = checkFile.urlFile.replace(RE, 'public');
        const pathThumb = checkFile.urlThumb.replace(RE, 'public');
        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }
        if (fs.existsSync(pathThumb)) {
          fs.unlinkSync(pathThumb);
        }
        await HouseFile.findByIdAndDelete(fileId);
      }

      res.status(200).json({
        message: req.t('delete_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};