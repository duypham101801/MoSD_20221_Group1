const UserSeeder = require('./UserSeeder');
const ProvinceSeeder = require('./ProvinceSeeder');
const LocationSeeder = require('./LocationSeeder');
const DistrictSeeder = require('./DistrictSeeder');
const AreaSeeder = require('./AreaSeeder');


exports.SeedAllDB = async () => {
  try {
    prom1 = await UserSeeder.UserSeeder();
    prom2 = await ProvinceSeeder.ProvinceSeeder();
    prom3 = await LocationSeeder.LocationSeeder();
    prom4 = await DistrictSeeder.DistrictSeeder();
    prom5 = await AreaSeeder.AreaSeeder();
  

    await Promise.all([prom1, prom2, prom3, prom4, prom5]);
    console.log('\nALL DATABASE IS SEEDED!');
  } catch (error) {
    console.log(error);
  }
};
