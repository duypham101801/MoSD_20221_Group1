const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Area',
  },
  name: {
    type: String,
    required: true,
  },
  urlAvatar: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    require: true,
    default: 'Liên hệ',
  },
  info: {
    type: String,
    require: true,
  },
  count: {
    type: Number,
    requrie: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const House = mongoose.model('House', houseSchema);
module.exports = House;
