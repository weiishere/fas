'use strict'
const utils = require('../../helper/utils');
const global = require('../../global');

exports.getFrame = (req,data) => {
    console.log(data);
    return utils.remotePostJSON({
        url: `${global.apis.getFrame}`,
        req,
        data
    });
};

exports.addFrame = (req,data) => {
    console.log(data);
    return utils.remotePostJSON({
        url: `${global.apis.addFrame}`,
        req,
        data
    });
};

exports.setFrame = (req,data) => {
    return utils.remotePostJSON({
        url: `${global.apis.setFrame}`,
        req,
        data
    });
};