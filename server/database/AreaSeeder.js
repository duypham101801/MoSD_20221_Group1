const mongoose = require('mongoose');
const config = require('config');

const Area = require('../models/area');

exports.AreaSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('6353a77ce2ef37899679b70c'),
                provinceId: 1,
                districtId: 271,
                name: 'Royal Homestay',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                _id: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                provinceId: 17,
                districtId: 148,
                name: 'Onsen Villas Resort, Dân Hòa, Kỳ Sơn, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                _id: mongoose.Types.ObjectId('635736996881536ea399f34a'),
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                provinceId: 17,
                districtId: 159,
                name: 'Hasu Village, Lạc Thủy, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
                __v: 0,
            },
        
            {
                provinceId: 17,
                districtId: 159,
                name: 'Hasu Village, Lạc Thủy, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
        
            {
                provinceId: 17,
                districtId: 156,
                name: 'Hasu Village, Mai Châu, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
                __v: 0,
            },
            {
                provinceId: 17,
                districtId: 156,
                name: 'Hasu Village, Mai Châu, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
                __v: 0,
            },
            {
                provinceId: 17,
                districtId: 156,
                name: 'Hasu Village, Mai Châu, Hoà Bình',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
                __v: 0,
            },
        
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
        
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 34,
            },
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 20,
            },
            {
                provinceId: 17,
                districtId: 148,
                name: 'Hasu Village, Mông Hóa, Kỳ Sơn, Hoà Bình, Việt Nam',
                minPrice: '3400000',
                maxPrice: '4500000',
                capacity: 20,
            },
        ];

        for (let i = 0; i < data.length; i++){
            await Area.create({
                _id: data[i]._id,
                provinceId: data[i].provinceId,
                districtId: data[i].districtId,
                name: data[i].name,
                minPrice: data[i].minPrice,
                maxPrice: data[i].maxPrice,
                capacity: data[i].capacity,
                urlAvatar: config.get('seed.urlAvatar'),
                description:
                    'Chúng tôi cố gắng để mọi thứ trở nên tự nhiên và đơn giản theo truyền thống Nhật Bản. Những gam màu nhã nhặn từ vật liệu thiên nhiên và những họa tiết mang hơi thở của văn hóa Nhật Bản là những điều mà mỗi người sẽ cảm nhận khi đặt chân đến nơi đây. Sự sang trọng không thể hiện trong những sắc màu rực rỡ mà tinh thế, thanh lịch và khiêm nhường như nét văn hóa lâu đời của Nhật Bản.',
                urlVideo: 'https://youtu.be/Z4qcleYmvJg',
            });
        }

        console.log(' (*) Area is seeded!');
    } catch (error) {
        console.log(error);
    }
};