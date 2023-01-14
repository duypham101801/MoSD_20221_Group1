const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
	provinceName: {
		type: String,
		require: true,
	},
	districtName: {
		type: String,
		require: true,
	},
	countArea: {
		type: Number,
	default: 0,
	},
	createdAt: {
		type: Date,
	default: Date.now(),
	},
});

locationSchema.statics.findLocationValid = function () {
	return this.aggregate([
	{
		$match: {
			countArea: { $gt: 0 },
		},
	},
	{
		$group: {
			_id: '$provinceName',
			districts: { $push: '$districtName' },
		},
	},
	{
		$project: {
			_id: 0,
			province: '$_id',
			districts: '$districts',
		},
	},
	{
		$sort: { province: 1 },
	},
	]);
};

locationSchema.statics.findDistricts = function (provinceName) {
	return this.aggregate([
	{
		$match: {
			provinceName,
			countArea: { $gt: 0 },
		},
	},
	{
		$group: {
			_id: '$provinceName',
			districts: { $push: '$districtName' },
		},
	},
	{
		$project: {
			_id: 0,
			districts: '$districts',
		},
	},
	]);
};

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
