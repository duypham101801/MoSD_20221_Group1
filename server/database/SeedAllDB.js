const UserSeeder = require('./UserSeeder');
const ProvinceSeeder = require('./ProvinceSeeder');
const LocationSeeder = require('./LocationSeeder');
const DistrictSeeder = require('./DistrictSeeder');
const AreaSeeder = require('./AreaSeeder');
const CategoryAreaImageSeeder = require('./CategoryAreaImageSeeder');
const CategoryHouseImageSeeder = require('./CategoryHouseImageSeeder');
const AreaFileSeeder = require('./AreaFileSeeder');
const AreaImageSeeder = require('./AreaImageSeeder');
const HouseSeeder = require('./HouseSeeder');
const HouseFileSeeder = require('./HouseFileSeeder');
const HouseImageSeeder = require('./HouseImageSeeder');


exports.SeedAllDB = async () => {
  try {
    prom1 = await UserSeeder.UserSeeder();
    prom2 = await ProvinceSeeder.ProvinceSeeder();
    prom3 = await LocationSeeder.LocationSeeder();
    prom4 = await DistrictSeeder.DistrictSeeder();
    prom5 = await AreaSeeder.AreaSeeder();
    prom6 = await CategoryAreaImageSeeder.CategoryAreaSeeder();
    prom7 = await CategoryHouseImageSeeder.CategoryHouseSeeder();
    prom8 = await AreaFileSeeder.AreaFileSeeder();
    prom9 = await AreaImageSeeder.AreaImageSeeder();
    prom10 = await HouseSeeder.HouseSeeder();
    prom11 = await HouseFileSeeder.HouseFileSeeder();
    prom12 = await HouseImageSeeder.HouseImageSeeder();

    await Promise.all([prom1, prom2, prom3, prom4, prom5, prom6, prom7, prom8, prom9, prom10, prom11, prom12]);
    console.log('\nALL DATABASE IS SEEDED!');
  } catch (error) {
    console.log(error);
  }
};
