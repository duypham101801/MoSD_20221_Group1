const { validationResult } = require('express-validator');
const config = require('config');
const fs = require('fs');

const ValidationException = require('../utils/ValidationException');
const ServerException = require('../utils/ServerException');

const CategoryImageArea = require('../models/category_image_area');
const CategoryImageHouse = require('../models/category_image_house');
const AreaImage = require('../models/area_image');
const HouseImage = require('../models/house_image');

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