const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const FileController = require('../controllers/fileController');
const Validator = require('../validators/fileValidator');
const { uploadFile } = require('../middleware/uploadFile');
const Authorization = require('../middleware/authorization');

/****************************--AREA FILE--****************************/

// [POST] Add area's file
router.post('/area/add-file/:areaId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area')),
  uploadFile.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  Validator.addAreaFile,
  FileController.postAddFile(config.get('type.area')),
]);

// [GET] list of area's files
router.get('/area/list-files/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  FileController.getListFiles(config.get('type.area')),
]);

// [GET] Area's file detail
router.get('/area/file-detail/:fileId', [
  ResourceValidator.checkData(config.get('paramId.area_file')),
  FileController.getFileDetail(config.get('type.area')),
]);

// [PUT] Update area's file
router.put('/area/file-detail/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_file')),
  Validator.updateAreaFile,
  FileController.putFileDetail(config.get('type.area')),
]);

// [PUT] Change file's thumb
router.put('/area/change-thumb/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_file')),
  uploadFile.single('thumb'),
  FileController.putChangeThumb(config.get('type.area')),
]);

// [PUT] Change file
router.put('/area/change-file/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_file')),
  uploadFile.single('file'),
  FileController.putChangeFile(config.get('type.area')),
]);

// [DELETE] Delete file
router.delete('/area/delete-file/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.area_file')),
  FileController.deleteFile(config.get('type.area')),
]);

/****************************--HOUSE FILE--****************************/
// [POST] Add house's file
router.post('/house/add-file/:houseId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house')),
  uploadFile.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  Validator.addHouseFile,
  FileController.postAddFile(config.get('type.house')),
]);

// [GET] List of house's file
router.get('/house/list-files/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  FileController.getListFiles(config.get('type.house')),
]);

// [GET] House's file detail
router.get('/house/file-detail/:fileId', [
  ResourceValidator.checkData(config.get('paramId.house_file')),
  FileController.getFileDetail(config.get('type.house')),
]);

// [PUT] Update house's file
router.put('/house/file-detail/:fileId', [
  Authorization.authenToken(['sale']),
  Validator.updateHouseFile,
  FileController.putFileDetail(config.get('type.house')),
]);

// [PUT] Change file's thumb
router.put('/house/change-thumb/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_file')),
  uploadFile.single('thumb'),
  FileController.putChangeThumb(config.get('type.house')),
]);

// [PUT] Change file
router.put('/house/change-file/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_file')),
  uploadFile.single('file'),
  FileController.putChangeFile(config.get('type.house')),
]);

// [DELETE] Delete file
router.delete('/house/delete-file/:fileId', [
  Authorization.authenToken(['sale']),
  ResourceValidator.checkData(config.get('paramId.house_file')),
  FileController.deleteFile(config.get('type.house')),
]);

module.exports = router;
