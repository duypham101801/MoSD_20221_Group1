const mongoose = require('mongoose');
const config = require('config');

const AreaFile = require('../models/area_file');

exports.AreaFileSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('635737656881536ea399f356'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },
            {
                _id: mongoose.Types.ObjectId('635737dd6881536ea399f35c'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Nghỉ dưỡng ngoai ô hợp tác cùng pippip cung cấp dịch vụ xe đưa đón',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },

            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Nghỉ dưỡng ngoai ô hợp tác cùng pippip cung cấp dịch vụ xe đưa đón',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                title: 'Nghỉ dưỡng ngoai ô hợp tác cùng pippip cung cấp dịch vụ xe đưa đón',
                description: 'Mua 1 đêm tặng 1 đêm miễn phí tại Onsen Villas Hòa Bình',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await AreaFile.create({
                _id: data[i]._id,
                areaId: data[i].areaId,
                title: data[i].title,
                urlThumb: config.get('seed.urlThumb'),
                urlFile: config.get('seed.urlFile'),
                description: data[i].description,
            });
        }

        console.log(" (*) Area's file is seeded!");
    } catch (error) {
        console.log(error);
    }
};