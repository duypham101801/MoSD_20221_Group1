const mongoose = require('mongoose');
const AreaFileSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Types.ObjectId,
    require: true,
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
});

const AreaFile = mongoose.model('AreaFile', AreaFileSchema);
module.exports = AreaFile;
