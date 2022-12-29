const mongoose = require('mongoose');
const provinceSchema = new mongoose.Schema({
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

provinceSchema.statics.queryProvinces = function () {
	return this.aggregate([
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

const Province = mongoose.model('Province', provinceSchema);
module.exports = Province;
