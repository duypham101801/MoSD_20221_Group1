const mongoose = require('mongoose');

const HouseImage = require('../models/house_image');

exports.HouseImageSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('635743266f67ce2d4996daab'),
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                _id: mongoose.Types.ObjectId('635743776f67ce2d4996dab1'),
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('63539c59cdf735bfb2c44606'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },

            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/hasu-in-phongngu1-001-1536x1152.jpg',
                description: 'Giường ngủ phong cách Ả rập',
            },
            {
                houseId: mongoose.Types.ObjectId('635739796881536ea399f376'),
                categoryId: mongoose.Types.ObjectId('6356a11dc4f1a74ae0bfdd9f'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-inside-012-2048x1365.jpg',
                description: 'Bàn trà phong cách Nhật Bản',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await HouseImage.create({
                _id: data[i]._id,
                houseId: data[i].houseId,
                categoryId: data[i].categoryId,
                url: data[i].url,
                description: data[i].description,
            });
        }

        console.log(" (*) House's image is seeded!");
    } catch (error) {
        console.log(error);
    }
};
