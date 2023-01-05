const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const HouseController = require('../controllers/houseController');
const Validator = require('../validators/houseValidator');
const { uploadImage } = require('../middleware/uploadImage');
const Authorization = require('../middleware/authorization');


// [GET] House detail
router.get('/house-detail/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  HouseController.getHouseDetail,
]);

module.exports = router;

const HouseController = require('../controllers/houseController');

// [GET] List of houses
router.get('/list-houses/:areaId', [
    ResourceValidator.checkData(config.get('paramId.area')),
    HouseController.getListHouses,
  ]);
