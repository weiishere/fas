'use strict'
const utils = require('../../helper/utils');
const global = require('../../global');
exports.getHotFundList = (req,data)=>{
  return utils.remotePostJSON({
    url:`${global.apis.getHotFundList}`,
    req,
    data
  })
}
exports.getFund = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.getFund}`,
    req,
    data
  });
};

exports.addFund = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.addFund}`,
    req,
    data
  });
};

exports.updateFund = (req,data) => {
  return utils.remotePostJSON({
    url: `${global.apis.updateFund}`,
    req,
    data
  });
};