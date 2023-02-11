const express = require('express');
const router = express.Router();
const config = require('config');
const multer = require('multer');

const ResourceValidator = require('../middleware/resourceValidator');
const ImageController = require('../controllers/imageController');
const { uploadImage } = require('../middleware/uploadImage');
const upload = uploadImage.single('image');
const Authorization = require('../middleware/authorization');
const HttpException = require('../utils/HttpException');
const ValidationException = require('../utils/ValidationException');

// [POST] Add area's image
router.post('/area/add-image/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  upload,
  ImageController.postAddImage(config.get('type.area')),
]);

// [GET] List of images
router.get('/area/list-images/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  ImageController.getListImages(config.get('type.area')),
]);

// [GET] List of images (v1 điều chỉnh)
router.get('/area/list-images-v1/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  ImageController.getListImagesV1(config.get('type.area')),
]);

// [GET] Image detail
router.get('/area/image-detail/:imageId', [
  ResourceValidator.checkData(config.get('paramId.area_image')),
  ImageController.getImageDetail(config.get('type.area')),
]);

// [PUT] Update image's infomation
router.put('/area/image-detail/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_image')),
  ImageController.putImageDetail(config.get('type.area')),
]);

// [PUT] Change image
router.put('/area/change-image/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_image')),
  upload,
  ImageController.putChangeImage(config.get('type.area')),
]);

// [DELETE] Delete image
router.delete('/area/delete-image/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_image')),
  ImageController.deleteImage(config.get('type.area')),
]);

/***************** House Image *******************/

// [POST] Add house's image
router.post('/house/add-image/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  upload,
  ImageController.postAddImage(config.get('type.house')),
]);

// // [GET] List of images
router.get('/house/list-images/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  ImageController.getListImages(config.get('type.house')),
]);

// [GET] List of images (v1 điều chỉnh)
router.get('/house/list-images-v1/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  ImageController.getListImagesV1(config.get('type.house')),
]);

// [GET] Image detail
router.get('/house/image-detail/:imageId', [
  ResourceValidator.checkData(config.get('paramId.house_image')),
  ImageController.getImageDetail(config.get('type.house')),
]);

// [PUT] Update image's infomation
router.put('/house/image-detail/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_image')),
  ImageController.putImageDetail(config.get('type.house')),
]);

// [PUT] Change image
router.put('/house/change-image/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_image')),
  upload,
  ImageController.putChangeImage(config.get('type.house')),
]);

// [DELETE] Delete image
router.delete('/house/delete-image/:imageId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_image')),
  ImageController.deleteImage(config.get('type.house')),
]);

module.exports = router;