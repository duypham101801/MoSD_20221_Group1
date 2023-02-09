const express = require('express');
const router = express.Router();

const LocationController = require('../controllers/locationController');

/******************* GET PROVINCES TO SEARCH *******************/

// [GET] Api full provinces and districts
router.get('/list-locations', [LocationController.getListLocations]);

// [GET] List of provinces
router.get('/list-provinces', [LocationController.getListProvinces]);

// [GET] List of districts
router.get('/list-districts', [LocationController.getListDistricts]);

/******************* GET PROVINCES TO ADD AREA *******************/

// [GET] Api full provinces and districts
router.get('/provinces-api', [LocationController.getQueryLocations]);

// [GET] Api get provinces
router.get('/provinces-api/provinces', [LocationController.getQueryProvinces]);

// [GET] Api get districts
router.get('/provinces-api/districts', [LocationController.getQueryDistricts]);

module.exports = router;
