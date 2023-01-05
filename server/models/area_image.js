const mongoose = require('mongoose');
const areaImageSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Area',
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'CategoryImageArea',
  },
  url: {
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

areaImageSchema.statics.findAreaImages = function (areaId) {
  return this.aggregate([
    {
      $match: {
        areaId: mongoose.Types.ObjectId(areaId),
      },
    },
    {
      $lookup: {
        from: 'categoryimageareas',
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

areaImageSchema.statics.findAreaImagesV1 = function (areaId) {
  return this.aggregate([
    {
      $match: {
        areaId: mongoose.Types.ObjectId(areaId),
      },
    },
    {
      $lookup: {
        from: 'categoryimageareas',
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

const AreaImage = mongoose.model('AreaImage', areaImageSchema);
module.exports = AreaImage;
