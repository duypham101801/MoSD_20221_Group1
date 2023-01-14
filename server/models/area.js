const mongoose = require('mongoose');
const Province = require('./province');
const District = require('./district');

const areaSchema = new mongoose.Schema({
	provinceId: {
		type: Number,
		require: true,
		ref: 'Province',
	},
	districtId: {
		type: Number,
		require: true,
		ref: 'District',
	},
	name: {
		type: String,
		required: true,
	},
	urlAvatar: {
		type: String,
		required: true,
	},
	minPrice: {
		type: String,
		require: true,
	},
	maxPrice: {
		type: String,
		require: true,
	},
	capacity: {
		type: Number,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	urlVideo: {
		type: String,
		require: false,
	},
	createdAt: {
		type: Date,
	default: Date.now(),
	},
});

areaSchema.statics.searchAreas = async function (
	provinceName,
	districtName,
	capacity,
	) {
	let province = await Province.findOne({ name: provinceName });
	let district = await District.findOne({
		name: districtName,
		provinceId: province.id,
	});

	let query;

	if (!district) {
		query = {
			provinceId: province.id,
		};
	} else {
		query = {
			provinceId: province.id,
			districtId: district.id,
		};
	}

	capacity = parseInt(capacity, 10);
	return this.aggregate([
	{
		$match: {
			...query,
			capacity: { $gte: capacity },
		},
	},
	{
		$project: {
			name: 1,
			urlAvatar: 1,
			minPrice: 1,
			maxPrice: 1,
		},
	},
	]);
};

areaSchema.statics.findAreas = async function (provinceName, districtName) {
	const province = await Province.findOne({ name: provinceName });
	const district = await District.findOne({ name: districtName });
	return this.aggregate([
	{
		$match: {
			provinceId: province.id,
			districtId: district.id,
		},
	},
	{
		$project: {
			name: 1,
			province: province.name,
			district: district.name,
			minPrice: 1,
			maxPrice: 1,
		},
	},
	]);
};

const Area = mongoose.model('Area', areaSchema);
module.exports = Area;
