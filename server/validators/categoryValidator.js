const { body } = require('express-validator');
const CategoryImageArea = require('../models/category_image_area');
const CategoryImageHouse = require('../models/category_image_house');

exports.categoryAreaImage = [
  body('categoryName')
    .not()
    .isEmpty()
    .withMessage('required_category')
    .bail()
    .custom(async (categoryName, { req }) => {
      const categoryId = req.params.categoryId || null;
      const checkCategory = await CategoryImageArea.findOne({
        _id: { $ne: categoryId },
        name: categoryName,
      });

      if (checkCategory) {
        return Promise.reject('existed_category');
      }
      return true;
    }),
];

exports.categoryHouseImage = [
  body('categoryName')
    .not()
    .isEmpty()
    .withMessage('required_category')
    .bail()
    .custom(async (categoryName, { req }) => {
      const categoryId = req.params.categoryId || null;
      const checkCategory = await CategoryImageHouse.findOne({
        _id: { $ne: categoryId },
        name: categoryName,
      });

      if (checkCategory) {
        return Promise.reject('existed_category');
      }
      return true;
    }),
];
