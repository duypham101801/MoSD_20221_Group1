const { ObjectId } = require('mongodb');
const config = require('config');

const Area = require('../models/area');
const House = require('../models/house');
const AreaFile = require('../models/area_file');
const HouseFile = require('../models/house_file');
const AreaImage = require('../models/area_image');
const HouseImage = require('../models/house_image');
const CategoryImageArea = require('../models/category_image_area');
const CategoryImageHouse = require('../models/category_image_house');
const User = require('../models/user');
const ResourceUnavailable = require('../utils/ResourceUnavailable');

exports.checkData = (paramId) => {
  return async (req, res, next) => {
    let dataID =
      req.params.areaId ||
      req.params.houseId ||
      req.params.fileId ||
      req.params.imageId ||
      req.params.categoryId ||
      req.params.userId;

    if (ObjectId.isValid(dataID)) {
      let checkData;
      switch (paramId) {
        case config.get('paramId.area'):
          checkData = await Area.findById(dataID);
          break;
        case config.get('paramId.house'):
          checkData = await House.findById(dataID);
          break;
        case config.get('paramId.user'):
          checkData = await User.findById(dataID);
          break;
        case config.get('paramId.category_area'):
          checkData = await CategoryImageArea.findById(dataID);
          break;
        case config.get('paramId.category_house'):
          checkData = await CategoryImageHouse.findById(dataID);
          break;
        case config.get('paramId.area_file'):
          checkData = await AreaFile.findById(dataID);
          break;
        case config.get('paramId.area_image'):
          checkData = await AreaImage.findById(dataID);
          break;
        case config.get('paramId.house_file'):
          checkData = await HouseFile.findById(dataID);
          break;
        case config.get('paramId.house_image'):
          checkData = await HouseImage.findById(dataID);
          break;
        default:
          return next(new HttpException(403, 'request_invalid'));
      }
      if (!checkData) {
        return next(new ResourceUnavailable());
      }
      next();
    } else {
      return next(new ResourceUnavailable());
    }
  };
};