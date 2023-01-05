const Area = require('../models/area');
const AreaFile = require('../models/area_file');
const AreaImage = require('../models/area_image');
const House = require('../models/house');
const HouseFile = require('../models/house_file');
const HouseImage = require('../models/house_image');
const CategoryImageArea = require('../models/category_image_area');
const CategoryImageHouse = require('../models/category_image_house');
const User = require('../models/user');
const Province = require('../models/province');
const District = require('../models/district');
const Location = require('../models/location');

exports.DeleteAllDB = async function () {
  try {
    const prom1 = Area.deleteMany();
    const prom2 = AreaFile.deleteMany();
    const prom3 = AreaImage.deleteMany();
    const prom4 = House.deleteMany();
    const prom5 = HouseFile.deleteMany();
    const prom6 = HouseImage.deleteMany();
    const prom7 = CategoryImageArea.deleteMany();
    const prom8 = CategoryImageHouse.deleteMany();
    const prom9 = User.deleteMany();
    const prom10 = Province.deleteMany();
    const prom11 = District.deleteMany();
    const prom12 = Location.deleteMany();

    await Promise.all([prom1, prom2, prom3, prom4, prom5, prom6, prom7, prom8, prom9, prom10, prom11, prom12]);
    console.log('ALL DATABASE IS DELETED!');
  } catch (error) {
    console.log(error);
  }
};
