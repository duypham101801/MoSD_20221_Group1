const mongoose = require('mongoose');
const categoryImageAreaSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryImageArea = mongoose.model('CategoryImageArea', categoryImageAreaSchema);
module.exports = CategoryImageArea;
