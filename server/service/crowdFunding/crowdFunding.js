'use strict'
const utils = require('../../helper/utils');
const global = require('../../global');
const logger = require('../../helper/mylogger').Logger;

exports.getProjectList = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.getProjectList}`,
        req,
        data
    });
};

exports.getProject = (req, data) => {
    logger.info(data);
    return utils.remotePostJSON({
        url: `${global.apis.getProject}`,
        req,
        data
    });
};

exports.getRecord = (req, data) => {
    //logger.info(data);
    return utils.remotePostJSON({
        url: `${global.apis.getRecord}`,
        req,
        data
    });
};

exports.addProject = (req, data) => {
    //logger.info(data);
    return utils.remotePostJSON({
        url: `${global.apis.addProject}`,
        req,
        data
    });
};

exports.deleteProject = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.deleteProject}`,
        req,
        data
    });
};

exports.offlineProject = (req, data) => {
    return utils.remotePostJSON({
        url: `${global.apis.offlineProject}`,
        req,
        data
    });
};


