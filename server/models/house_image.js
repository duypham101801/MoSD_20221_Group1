const mongoose = require('mongoose');
const houseImageSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'House',
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'CategoryImageHouse',
  },
  url: {
    type: String,
    required: true,
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

houseImageSchema.statics.findHouseImages = function (houseId) {
  return this.aggregate([
    {
      $match: {
        houseId: mongoose.Types.ObjectId(houseId),
      },
    },
    {
      $lookup: {
        from: 'categoryimagehouses',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $group: {
        _id: '$category.name',
        list: {
          $push: {
            _id: '$_id',
            url: '$url',
            desc: '$description',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        list: 1,
      },
    },
  ]);
};

houseImageSchema.statics.findHouseImagesV1 = function (houseId) {
  return this.aggregate([
    {
      $match: {
        houseId: mongoose.Types.ObjectId(houseId),
      },
    },
    {
      $lookup: {
        from: 'categoryimagehouses',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $project: {
        category: '$category.name',
        url: 1,
        description: 1,
      },
    },
    {
      $unwind: '$category',
    },
  ]);
};

const HouseImage = mongoose.model('HouseImage', houseImageSchema);
module.exports = HouseImage;
