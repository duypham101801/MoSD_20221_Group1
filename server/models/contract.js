const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Area'
  },
  houseId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'House'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
