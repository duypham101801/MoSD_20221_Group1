const mongoose = require('mongoose');
const HouseFileSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'House',
  },
  title: {
    type: String,
    require: true,
  },
  urlThumb: {
    type: String,
    require: true,
  },
  urlFile: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: Date,
});

const HouseFile = mongoose.model('HouseFile', HouseFileSchema);
module.exports = HouseFile;
