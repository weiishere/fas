'use strict'
const utils = require('../../helper/utils');
const global = require('../../global');

exports.getBanner = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.getBanner}`,
    req,
    data
  });
};

exports.addBanner = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.addBanner}`,
    req,
    data
  });
};

exports.updateBanner = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.updateBanner}`,
    req,
    data
  });
};
exports.uploadImg = (req,data) => {
  return utils.remotePostJSON({
    url:`${global.apis.uploadImg}`,
    req,
    data
  })
}
exports.getImgList = (req,data) => {
  return utils.remotePostJSON({
    url:`${global.apis.getImgList}`,
    req,
    data
  })
}