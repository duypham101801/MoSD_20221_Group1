const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const Area = require('../models/area');
const Province = require('../models/province');
const District = require('../models/district');
const Location = require('../models/location');

const ServerException = require('../utils/ServerException');

const RE = new RegExp(process.env.API_URL, 'g');

/** Manage Area
 * [GET] Guest search areas
 * [GET] Sale filter areas
 * [POST] Add area
 * [PUT] Upload avatar
 * [GET] Area detail
 * [PUT] Update area
 * [DELETE] Delete area
 */

// [POST] Guest search areas
exports.getSearchAreas = async (req, res, next) => {
  try {
    const provinceName = req.query.provinceName
      ? req.query.provinceName
      : 'Tỉnh Hòa Bình';
    const districtName = req.query.districtName ? req.query.districtName : null;
    const minCapacity = req.query.minCapacity ? req.query.minCapacity : '1';

    const searchResultAreas = await Area.searchAreas(
      provinceName,
      districtName,
      minCapacity,
    );

    res.status(200).json({
      message: req.t('success'),
      areas: searchResultAreas,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};

// [GET] Area detail
exports.getAreaDetail = async (req, res, next) => {
  try {
    const areaDetail = await Area.findById(req.params.areaId);
    res.status(200).json({
      message: req.t('success'),
      area: areaDetail,
    });
  } catch (error) {
    return next(new ServerException(error));
  }
};