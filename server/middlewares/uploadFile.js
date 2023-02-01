const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ValidationException = require('../utils/ValidationException');

const MAX_SIZE = 5 * 1024 * 1024; // 5mb
const storageFile = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (file.fieldname === 'thumb') {
      cb(null, 'public/images/thumb');
    }
    if (file.fieldname === 'file') {
      cb(null, 'public/files');
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
  if (file.fieldname === 'thumb') {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      let error = [
        {
          param: file.fieldname,
          msg: 'invalid_file_type',
        },
      ];
      cb(new ValidationException(error));
    }
    let size = +req.rawHeaders.slice(-1)[0];
    if (size >= MAX_SIZE) {
      let error = [
        {
          param: file.fieldname,
          msg: 'file_too_large',
        },
      ];
      cb(new ValidationException(error));
    }
    cb(null, true);
  }
  if (file.fieldname === 'file') {
    if (
      file.mimetype !== 'application/pdf' &&
      file.mimetype !== 'application/msword' &&
      file.mimetype !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      let error = [
        {
          param: file.fieldname,
          msg: 'invalid_file_type',
        },
      ];
      cb(new ValidationException(error));
    }
    let size = +req.rawHeaders.slice(-1)[0];
    if (size >= MAX_SIZE) {
      let error = [
        {
          param: file.fieldname,
          msg: 'file_too_large',
        },
      ];
      cb(new ValidationException(error));
    }
    cb(null, true);
  }
};

const uploadFile = multer({
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
  storage: storageFile,
});

module.exports = { uploadFile };
