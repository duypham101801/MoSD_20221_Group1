const { validationResult } = require('express-validator');
const config = require('config');
const fs = require('fs');

const ValidationException = require('../utils/ValidationException');
const ServerException = require('../utils/ServerException');

const CategoryImageArea = require('../models/category_image_area');
const CategoryImageHouse = require('../models/category_image_house');
const AreaImage = require('../models/area_image');
const HouseImage = require('../models/house_image');
const RE = new RegExp(process.env.API_URL, 'g');

// [POST] Add category
exports.postAddCategory = (type) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationException(errors.array()));
      }

      let category;
      if (type === config.get('type.area')) {
        category = await CategoryImageArea.create({
          name: req.body.categoryName,
        });
      } else {
        category = await CategoryImageHouse.create({
          name: req.body.categoryName,
        });
      }

      res.status(201).json({
        message: req.t('create_success'),
        category: category,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [GET] List of categories
exports.getListCategories = (type) => {
  return async (req, res, next) => {
    try {
      let listCategory;
      if (type === config.get('type.area')) {
        listCategory = await CategoryImageArea.find();
      } else {
        listCategory = await CategoryImageHouse.find();
      }

      res.status(200).json({
        message: req.t('success'),
        categories: listCategory,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [GET] Category detail
exports.getCategoryDetail = (type) => {
  return async (req, res, next) => {
    try {
      let category;
      if (type === config.get('type.area')) {
        category = await CategoryImageArea.findById(req.params.categoryId);
      } else {
        category = await CategoryImageHouse.findById(req.params.categoryId);
      }

      res.status(200).json({
        message: req.t('success'),
        category,
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};

// [PUT] Update category detail
exports.putCategoryDetail = (type) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationException(errors.array()));
      }

      if (type === config.get('type.area')) {
        await CategoryImageArea.findByIdAndUpdate(req.params.categoryId, {
          name: req.body.categoryName,
        });
      } else {
        await CategoryImageHouse.findByIdAndUpdate(req.params.categoryId, {
          name: req.body.categoryName,
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

exports.deleteCategory = (type) => {
  return async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      if (type === config.get('type.area')) {
        const areaImages = await AreaImage.find({ categoryId });
        if (areaImages.length > 0) {
          areaImages.map((image) => {
            const pathImage = image.url.replace(RE, 'public');
            if (fs.existsSync(pathImage)) {
              fs.unlinkSync(pathImage);
            }
          });
          // Delete all area's image include categoryId
          await AreaImage.deleteMany({ categoryId });
        }
        await CategoryImageArea.findByIdAndDelete(categoryId);
      } else {
        const houseImages = await HouseImage.find({ categoryId });
        if (houseImages.length > 0) {
          houseImages.map((image) => {
            const pathImage = image.url.replace(RE, 'public');
            if (fs.existsSync(pathImage)) {
              fs.unlinkSync(pathImage);
            }
          });
          // Delete all house's image include categoryId
          await HouseImage.deleteMany({ categoryId });
        }
        await CategoryImageHouse.findByIdAndDelete(categoryId);
      }

      res.status(200).json({
        message: req.t('delete_success'),
      });
    } catch (error) {
      return next(new ServerException(error));
    }
  };
};