const express = require('express');
const router = express.Router();
const config = require('config');
const AreaController = require('../controllers/areaController');
const ResourceValidator = require('../middleware/resourceValidator');
const Validator = require('../validators/areaValidator');


// [GET] Search areas (guest)
router.get('/search/results', [AreaController.getSearchAreas]);
module.exports = router;

// [GET] Area detail
router.get('/area-detail/:areaId', [
  ResourceValidator.checkData(config.get('paramId.area')),
  AreaController.getAreaDetail,
]);