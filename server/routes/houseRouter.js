const express = require('express');
const router = express.Router();
const config = require('config');


const HouseController = require('../controllers/houseController');

// [GET] List of houses
router.get('/list-houses/:areaId', [
    ResourceValidator.checkData(config.get('paramId.area')),
    HouseController.getListHouses,
  ]);