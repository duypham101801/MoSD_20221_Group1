const mongoose = require('mongoose');
const categoryImageHouseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryImageHouse = mongoose.model('CategoryImageHouse', categoryImageHouseSchema);
module.exports = CategoryImageHouse;
