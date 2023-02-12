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
