'use strict'
const utils = require('../../helper/utils');
const global = require('../../global');

exports.getVersion = (req,data) => {
    return utils.remotePostJSON({
        url: `${global.apis.getVersion}`,
        req,
        data
    });
};


exports.getVersionList = (req,data) => {
    return utils.remotePostJSON({
        url: `${global.apis.getVersionList}`,
        data,
        req
    });
};

exports.deleteVersion = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.deleteVersion}`,
        data,
        req
    });
};

exports.addVersion = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.addVersion}`,
        data,
        req
    });
};

exports.setVersionActive = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.setVersionActive}`,
        data,
        req
    });
};