const express = require('express');
const router = express.Router();
const config = require('config');

const ResourceValidator = require('../middleware/resourceValidator');
const CategoryController = require('../controllers/categoryController');
const Validator = require('../validators/categoryValidator');
const Authorization = require('../middleware/authorization');

/***************************** AREA CATEGORY *****************************/
// [POST] Add category for area
router.post('/area/add-category', [
  Authorization.authenToken(['editor']),
  Validator.categoryAreaImage,
  CategoryController.postAddCategory(config.get('type.area')),
]);

// [GET] List area's categories
router.get('/area/list-categories', [
  CategoryController.getListCategories(config.get('type.area')),
]);

// [GET] Category detail
router.get('/area/category-detail/:categoryId', [
  ResourceValidator.checkData(config.get('paramId.category_area')),
  CategoryController.getCategoryDetail(config.get('type.area')),
]);

// [PUT] Update area's category
router.put('/area/category-detail/:categoryId', [
  Authorization.authenToken(['editor']),
  ResourceValidator.checkData(config.get('paramId.category_area')),
  Validator.categoryAreaImage,
  CategoryController.putCategoryDetail(config.get('type.area')),
]);

// [DELETE] Delete area's category
router.delete('/area/delete-category/:categoryId', [
  Authorization.authenToken(['editor']),
  ResourceValidator.checkData(config.get('paramId.category_area')),
  CategoryController.deleteCategory(config.get('type.area')),
]);

/*****************************HOUSE CATEGORY*****************************/

// [POST] Add category for house
router.post('/house/add-category', [
  Authorization.authenToken(['editor']),
  Validator.categoryHouseImage,
  CategoryController.postAddCategory(config.get('type.house')),
]);

// [GET] List house's category
router.get('/house/list-categories', [
  CategoryController.getListCategories(config.get('type.house')),
]);

// [GET] Category detail
router.get('/house/category-detail/:categoryId', [
  ResourceValidator.checkData(config.get('paramId.category_house')),
  CategoryController.getCategoryDetail(config.get('type.house')),
]);

// [PUT] Update house's category
router.put('/house/category-detail/:categoryId', [
  Authorization.authenToken(['editor']),
  ResourceValidator.checkData(config.get('paramId.category_house')),
  Validator.categoryHouseImage,
  CategoryController.putCategoryDetail(config.get('type.house')),
]);

// [DELETE] Delete house's category
router.delete('/house/delete-category/:categoryId', [
  Authorization.authenToken(['editor']),
  ResourceValidator.checkData(config.get('paramId.category_house')),
  CategoryController.deleteCategory(config.get('type.house')),
]);

module.exports = router;