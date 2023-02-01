const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ValidationException = require('../utils/ValidationException');

const MAX_SIZE = 5 * 1024 * 1024; // 5mb
const storageImage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'public/images/general');
    }
    if (file.fieldname === 'avatar') {
      cb(null, 'public/images/avatar');
    }
  },
  filename: function (req, file, cb) {
    const fileName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    let size = +req.rawHeaders.slice(-1)[0];
    if (size >= MAX_SIZE) {
      let error = [
        {
          param: file.fieldname,
          msg: 'file_too_large',
        },
      ];
      cb(new ValidationException(error));
    } else {
      cb(null, true);
    }
  } else {
    let error = [
      {
        param: file.fieldname,
        msg: 'invalid_file_type',
      },
    ];
    cb(new ValidationException(error));
  }
};

const uploadImage = multer({
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
  storage: storageImage,
});

module.exports = { uploadImage };
