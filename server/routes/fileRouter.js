const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const FileController = require('../controllers/fileController');

// [GET] List of house's file
router.get('/house/list-files/:houseId', [
  ResourceValidator.checkData(config.get('paramId.house')),
  FileController.getListFiles(config.get('type.house')),
]);