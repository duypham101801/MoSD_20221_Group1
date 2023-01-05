const mongoose = require('mongoose');
const config = require('config');

const HouseFile = require('../models/house_file');

exports.HouseFileSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('635742556f67ce2d4996da98'),
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                title: 'Bảng giá phòng',
                description: 'Bảng giá phòng',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                title: 'Bảng tiện ích trong phòng',
                description: 'Bảng giá tiện ích',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await HouseFile.create({
                _id: data[i]._id,
                houseId: data[i].houseId,
                title: data[i].title,
                urlThumb: config.get('seed.urlThumb'),
                urlFile: config.get('seed.urlFile'),
                description: data[i].description,
            });
        }

        console.log(" (*) House's file is seeded!");
    } catch (error) {
        console.log(error);
    }
};