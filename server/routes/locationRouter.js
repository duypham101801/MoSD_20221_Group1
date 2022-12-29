const express = require('express');
const router = express.Router();

const LocationController = require('../../../TraveloServer/controllers/locationController');

/******************* GET PROVINCES TO SEARCH *******************/

// [GET] List of provinces
router.get('/list-provinces', [LocationController.getListProvinces]);

// [GET] List of districts
router.get('/list-districts', [LocationController.getListDistricts]);

module.exports = router;
