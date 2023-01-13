const express = require('express');
const router = express.Router();
const config = require('config');

const CategoryController = require('../controllers/categoryController');

/***************************** AREA *****************************/

// [GET] List area's categories
router.get('/area/list-categories', [
  CategoryController.getListCategories(config.get('type.area')),
]);

/***************************** HOUSE *****************************/

// [GET] List house's category
router.get('/house/list-categories', [
  CategoryController.getListCategories(config.get('type.house')),
]);