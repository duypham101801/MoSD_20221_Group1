const mongoose = require('mongoose');

const AreaImage = require('../models/area_image');

exports.AreaImageSeeder = async function() {
    try {
        const data = [
            {
                _id: mongoose.Types.ObjectId('635738606881536ea399f366'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-night-out-003-1536x1024.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                _id: mongoose.Types.ObjectId('6357388e6881536ea399f36b'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                _id: mongoose.Types.ObjectId('635df3a2a4f5c017259466ee'),
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/11/24/856975/Phong-Canh-2.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/11/24/856975/Phong-Canh-2.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://ktmt.vnmediacdn.com/stores/news_dataimages/nguyenthiluan/082020/02/17/in_article/5840_bai_bien_cat_trang_1-1596268568003.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://media.suckhoecong.vn/thumb_x800x450/Images/Uploaded/Share/2017/12/10/ngam-nhung-buc-anh-phong-canh-dep-den-nghet-tho11512880481.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://3.bp.blogspot.com/-e9xRarXuBws/XvRCUGjOLVI/AAAAAAAAgHI/uP5RP9unDjMdavrac4_lSR8W39hNRq7lgCNcBGAsYHQ/s1600/7091dc01dd178138ac66ef0d5fecb368.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b86cdf735bfb2c445f4'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-night-out-003-1536x1024.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://thietkemythuat.com/wp-content/uploads/postlogoeduvn38.png',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2021/02/fantasy-landscape-iPhone-wallpaper-idownloadblog-IEDITWALLS20.11.25104226-@tantago-727x1536-1.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('635745df6f67ce2d4996dac6'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-night-out-003-1536x1024.jpg',
                description: 'Ảnh ban đêm dưới ánh đèn',
            },
            {
                areaId: mongoose.Types.ObjectId('6356b693bab1522f1bd13ba3'),
                categoryId: mongoose.Types.ObjectId('63539b74cdf735bfb2c445f0'),
                url: 'https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg',
                description: 'Ảnh ban ngày',
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await AreaImage.create({
                _id: data[i]._id,
                areaId: data[i].areaId,
                categoryId: data[i].categoryId,
                url: data[i].url,
                description: data[i].description,
            });
        }

        console.log(" (*) Area's image is seeded!");
    } catch (error) {
        console.log(error);
    }
};