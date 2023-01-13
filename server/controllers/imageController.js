const fs = require('fs');
const config = require('config');

const AreaImage = require('../models/area_image');
const HouseImage = require('../models/house_image');

const ServerException = require('../utils/ServerException');

const RE = new RegExp(process.env.API_URL, 'g');

// [POST] Add new image
exports.postAddImage = (type) => {
  return async (req, res, next) => {
    try {
      const { categoryId, descImage } = req.body;
      const pathImage = req.file.path.replace(/\\/g, '/');
      let imageCreated;
      if (type === config.get('type.area')) {
        imageCreated = await AreaImage.create({
          areaId: req.params.areaId,
          categoryId,
          url: `${process.env.API_URL}${pathImage.replace(/public/, '')}`,
          description: descImage,
        });
      } else {
        imageCreated = await HouseImage.create({
          houseId: req.params.houseId,
          categoryId,
          url: `${process.env.API_URL}${pathImage.replace(/public/, '')}`,
          description: descImage,
        });
      }

      res.status(201).json({
        message: req.t('create_succes'),
        image: imageCreated,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [GET] List of images
exports.getListImages = (type) => {
  return async (req, res, next) => {
    try {
      let listImages;
      if (type === config.get('type.area')) {
        listImages = await AreaImage.findAreaImages(req.params.areaId);
      } else {
        listImages = await HouseImage.findHouseImages(req.params.houseId);
      }

      res.status(200).json({
        message: req.t('success'),
        images: listImages,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [GET] List of images (v1)
exports.getListImagesV1 = (type) => {
  return async (req, res, next) => {
    try {
      let listImages;
      if (type === config.get('type.area')) {
        listImages = await AreaImage.findAreaImagesV1(req.params.areaId);
      } else {
        listImages = await HouseImage.findHouseImagesV1(req.params.houseId);
      }

      res.status(200).json({
        message: req.t('success'),
        images: listImages,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [GET] Image detail
exports.getImageDetail = (type) => {
  return async (req, res, next) => {
    try {
      let imageDetail;
      if (type === config.get('type.area')) {
        imageDetail = await AreaImage.findById(req.params.imageId);
      } else {
        imageDetail = await HouseImage.findById(req.params.imageId);
      }

      res.status(200).json({
        message: req.t('success'),
        image: imageDetail,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [PUT] Update image information
exports.putImageDetail = (type) => {
  return async (req, res, next) => {
    try {
      const { categoryId, descImage } = req.body;

      if (type === config.get('type.area')) {
        await AreaImage.findByIdAndUpdate(req.params.imageId, {
          categoryId,
          description: descImage,
        });
      } else {
        await HouseImage.findByIdAndUpdate(req.params.imageId, {
          categoryId,
          description: descImage,
        });
      }

      res.status(200).json({
        message: req.t('update_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [PUT] Change image
exports.putChangeImage = (type) => {
  return async (req, res, next) => {
    try {
      const pathImage = req.file.path.replace(/\\/g, '/');

      const imageId = req.params.imageId;
      if (type === config.get('type.area')) {
        checkImage = await AreaImage.findById(imageId);
        const oldPathImage = checkImage.url.replace(RE, 'public');
        if (fs.existsSync(oldPathImage)) {
          fs.unlinkSync(oldPathImage);
        }

        await AreaImage.findByIdAndUpdate(imageId, {
          url: `${process.env.API_URL}${pathImage.replace(/public/, '')}`,
        });
      } else {
        checkImage = await HouseImage.findById(imageId);
        const oldPathImage = checkImage.url.replace(RE, 'public');
        if (fs.existsSync(oldPathImage)) {
          fs.unlinkSync(oldPathImage);
        }

        await HouseImage.findByIdAndUpdate(imageId, {
          url: `${process.env.API_URL}${pathImage.replace(/public/, '')}`,
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

// [DELETE] Delete image
exports.deleteImage = (type) => {
  return async (req, res, next) => {
    try {
      const imageId = req.params.imageId;
      if (type === config.get('type.area')) {
        checkImage = await AreaImage.findById(imageId);
        const pathImage = checkImage.url.replace(RE, 'public');

        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage);
        }

        await AreaImage.findByIdAndDelete(imageId);
      } else {
        checkImage = await HouseImage.findById(imageId);
        const pathImage = checkImage.url.replace(RE, 'public');

        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage);
        }

        await HouseImage.findByIdAndDelete(imageId);
      }

      res.status(200).json({
        message: req.t('delete_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};
