const mongoose = require('mongoose');

const CategoryHouseImage = require('../models/category_image_house');

exports.CategoryHouseSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                name: 'Ảnh Nội Thất',
            },
            {
                _id: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                name: 'Ảnh Bên Ngoài Căn',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await CategoryHouseImage.create({
                _id: data[i]._id,
                name: data[i].name,
            });
        }

        console.log(" (*) House's image category is seeded!");
    } catch (error) {
        console.log(error);
    }
};