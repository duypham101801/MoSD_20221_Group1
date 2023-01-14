const config = require('config');

const Location = require('../models/location');

exports.LocationSeeder = async function() {
    try {
        const data = [
            {
                provinceName: 'Tỉnh Hòa Bình',
                districtName: 'Thành phố Hòa Bình',
                countArea: 5,
            },
            {
                provinceName: 'Thành phố Hà Nội',
                districtName: 'Huyện Ba Vì',
                countArea: 1,
            },
            {
                provinceName: 'Tỉnh Hòa Bình',
                districtName: 'Huyện Lạc Thủy',
                countArea: 2,
            },
            {
                provinceName: 'Tỉnh Hòa Bình',
                districtName: 'Huyện Mai Châu',
                countArea: 3,
            },
        ];

        for (let i = 0; i < data.length; i++) {
            await Location.create({
                provinceName: data[i].provinceName,
                districtName: data[i].districtName,
                countArea: data[i].countArea,
            });
        }

        console.log(' (*) Location is seeded!');
    } catch (error) {
        console.log(error);
    }
};