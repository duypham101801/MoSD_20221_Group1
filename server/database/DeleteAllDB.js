const Area = require('../models/area');
const User = require('../models/user');
const Province = require('../models/province');
const District = require('../models/district');
const Location = require('../models/location');

exports.DeleteAllDB = async function () {
  try {
    const prom1 = Area.deleteMany();
    const prom2 = User.deleteMany();
    const prom3 = Province.deleteMany();
    const prom4 = District.deleteMany();
    const prom5 = Location.deleteMany();

    await Promise.all([prom1, prom2, prom3, prom4, prom5]);
    console.log('ALL DATABASE IS DELETED!');
  } catch (error) {
    console.log(error);
  }
};
