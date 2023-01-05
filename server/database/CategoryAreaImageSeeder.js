const mongoose = require('mongoose');

const CategoryAreaImage = require('../models/category_image_area');

exports.CategoryAreaSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                name: 'Ảnh Vị Trí Các Căn',
            },
            {
                _id: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                name: 'Ảnh Quang Cảnh',
            },
            {
                _id: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                name: 'Ảnh Các Dịch Vụ',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await CategoryAreaImage.create({
                _id: data[i]._id,
                name: data[i].name,
            });
        }

        console.log(" (*) Area's image category is seeded!");
    } catch (error) {
        console.log(error);
    }
};