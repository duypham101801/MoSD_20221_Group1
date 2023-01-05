const mongoose = require('mongoose');
const config = require('config');

const House = require('../models/house');

exports.HouseSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('635739796881536ea399f376'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: 'VILLA 2PN',
                type: '2PN',
                price: '3800000',
                info: 'Villa 2 phòng ngủ. Tiêu chuẩn 4NL+2TE<6t. Gồm ăn sáng',
                count: 4,
            },
            {
                _id: mongoose.Types.ObjectId('635739bc6881536ea399f37a'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: '2PN BỂ SỤC RIÊNG',
                type: '2PN',
                price: '4800000',
                info: 'Villa 2 phòng ngủ (bể sục đá)',
                count: 4,
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: 'VILLA 4PN',
                type: '2PN',
                price: '3800000',
                info: 'Villa 2 phòng ngủ. Tiêu chuẩn 4NL+2TE<6t. Gồm ăn sáng',
                count: 4,
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: '4PN BỂ SỤC RIÊNG',
                type: '2PN',
                price: '4800000',
                info: 'Villa 2 phòng ngủ (bể sục đá)',
                count: 4,
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: 'VILLA 3PN',
                type: '2PN',
                price: '3800000',
                info: 'Villa 2 phòng ngủ. Tiêu chuẩn 4NL+2TE<6t. Gồm ăn sáng',
                count: 4,
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                name: '3PN BỂ SỤC RIÊNG',
                type: '2PN',
                price: '4800000',
                info: 'Villa 2 phòng ngủ (bể sục đá)',
                count: 4,
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await House.create({
                _id: data[i]._id,
                areaId: data[i].areaId,
                name: data[i].name,
                urlAvatar: config.get('seed.urlAvatar'),
                type: data[i].type,
                price: data[i].price,
                info: data[i].info,
                count: data[i].count,
            });
        }

        console.log(' (*) House is seeded!');
    } catch (error) {
        console.log(error);
    }
};