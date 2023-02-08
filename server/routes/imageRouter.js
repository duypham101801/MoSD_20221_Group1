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


// [GET] List of images (v1 điều chỉnh)
router.get('/area/list-images-v1/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  ImageController.getListImagesV1(config.get('type.area')),
]);

/***************** House Image *******************/


// [GET] List of images (v1 điều chỉnh)
router.get('/house/list-images-v1/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  ImageController.getListImagesV1(config.get('type.house')),
]);


module.exports = router;
