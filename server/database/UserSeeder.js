require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.UserSeeder = async function() {
  try {
    const data = [
      {
        _id: mongoose.Types.ObjectId("63536c4ac283db80849f60d5"),
        email: "admin@gmail.com", // 12345678
        name: "Anh Nguyễn Thế",
        phone: "0987654321",
        role: config.get("role.admin"),
      },
      {
        _id: mongoose.Types.ObjectId("6353996526705194525e1043"),
        email: "editor@gmail.com", // 123456789
        name: "Nguyễn Thế Trung",
        phone: "0987654321",
        role: config.get("role.editor"),
      },
      {
        _id: mongoose.Types.ObjectId("6353993e26705194525e103f"),
        email: "sale@gmail.com", // 123456789
        name: "Nguyễn Thế Trung",
        phone: "0987654321",
        role: config.get("role.sale"),
      },
      {
        _id: mongoose.Types.ObjectId("6357ef9627f89e3238d20185"),
        email: "trungnguyenthe@gmail.com",
        name: "Nguyễn Thế Trung",
        phone: "0987654321",
        role: config.get("role.sale"),
      },
      {
        _id: mongoose.Types.ObjectId("6357efa027f89e3238d20189"),
        email: "trungnguyen1998@gmail.com",
        name: "Nguyễn Thế Trung",
        phone: "0987654321",
        password:
          "$2b$10$/GVZNx4xbFW/lnTRCa.Wo.dbyQdOojJG9yBNOKxeGet6HV7Z4sRka",
        role: config.get("role.sale"),
      },
    ];

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('123456789', salt);

    for (let i = 0; i < data.length; i++) {
      await User.create({
        _id: data[i]._id,
        email: data[i].email,
        name: data[i].name,
        phone: data[i].phone,
        password: hash,
        role: data[i].role,
      });
    }

    console.log(' (*) User is seeded!');
  } catch (error) {
    console.log(error);
  }
};
