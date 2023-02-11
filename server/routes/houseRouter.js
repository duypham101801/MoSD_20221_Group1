const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const HouseController = require('../controllers/houseController');
const Validator = require('../validators/houseValidator');
const { uploadImage } = require('../middleware/uploadImage');
const Authorization = require('../middleware/authorization');

// [POST] Add new house
router.post('/add-house/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  uploadImage.single('avatar'),
  Validator.addHouse,
  HouseController.postAddHouse,
]);

// [GET] List of houses
router.get('/list-houses/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  HouseController.getListHouses,
]);

// [GET] House detail
router.get('/house-detail/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  HouseController.getHouseDetail,
]);

// [PUT] Update house detail
router.put('/house-detail/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  Validator.updateHouse,
  HouseController.putHouseDetail,
]);

// [PUT] Change house's avatar
router.put('/change-avatar/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  uploadImage.single('avatar'),
  HouseController.putChangeAvatar,
]);

// [DELETE] Delete house
router.delete('/delete-house/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  HouseController.deleteHouse,
]);

module.exports = router;
