const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const FileController = require('../controllers/fileController');


// [GET] list of area's files
router.get('/area/list-files/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  FileController.getListFiles(config.get('type.area')),
]);

// [GET] List of house's file
router.get('/house/list-files/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  FileController.getListFiles(config.get('type.house')),
]);