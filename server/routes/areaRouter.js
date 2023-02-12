const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const AreaController = require('../controllers/areaController');
const Validator = require('../validators/areaValidator');
const { uploadImage } = require('../middleware/uploadImage');
const Authorization = require('../middleware/authorization');

// [GET] Search areas (guest)
router.get('/search/results', [AreaController.getSearchAreas]);

// [GET] List of areas (sale)
router.get('/list-areas', [AreaController.getListAreas]);

// [POST] Add new area
router.post('/add-area', [
  Authorization.authenToken(['sale']),
  uploadImage.single('avatar'),
  Validator.addArea,
  AreaController.postAddArea,
]);

// [PUT] Change area's avatar
router.put('/change-avatar/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  uploadImage.single('avatar'),
  AreaController.putChangeAvatar,
]);

// [GET] Area detail
router.get('/area-detail/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  AreaController.getAreaDetail,
]);

// [PUT] Update area detail
router.put('/area-detail/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  Validator.updateArea,
  AreaController.putAreaDetail,
]);

// [DELETE] Delete area
router.delete('/delete-area/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  AreaController.deleteArea,
]);

module.exports = router;
