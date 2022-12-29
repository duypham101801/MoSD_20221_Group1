const mongoose = require('mongoose');
const districtSchema = new mongoose.Schema({
	provinceId: {
		type: Number,
		require: true,
		ref: 'Province',
	},
	id: {
		type: Number,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	type: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
	default: Date.now(),
	},
});

districtSchema.statics.provinceAPI = function () {
	return this.aggregate([
	{
		$group: {
			_id: '$provinceId',
			districts: { $push: { id: '$id', name: '$name' } },
		},
	},
	{
		$lookup: {
			from: 'provinces',
			localField: '_id',
			foreignField: 'id',
			as: 'province',
		},
	},
	{
		$unwind: '$province',
	},
	{
		$project: {
			_id: 0,
			name: '$province.name',
			id: '$province.id',
			districts: 1,
		},
	},
	{
		$sort: { id: 1 },
	},
	]);
};

districtSchema.statics.queryDistricts = function (provinceId) {
	return this.aggregate([
	{
		$match: {
			provinceId: parseInt(provinceId, 10),
		},
	},
	{
		$sort: { id: 1 },
	},
	{
		$project: {
			_id: 0,
			name: 1,
			id: 1,
		},
	},
	]);
};

const District = mongoose.model('District', districtSchema);
module.exports = District;
