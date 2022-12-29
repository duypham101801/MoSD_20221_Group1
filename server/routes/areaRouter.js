const express = require('express');
const router = express.Router();
const config = require('config');
const AreaController = require('../controllers/areaController');


// [GET] Search areas (guest)
router.get('/search/results', [AreaController.getSearchAreas]);
module.exports = router;
 