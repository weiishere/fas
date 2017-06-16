const express = require('express');
const service = require('../../../service/crowdFunding/crowdFunding');
const router = express.Router();
const logger = require('../../../helper/mylogger').Logger;

router.post('/list', (req, res, next) => {
    const {projectId,projectCondition,projectType,sequenceList,pageSize,pageNum,merchantId} = req.body;
    service.getProjectList(req, {
        projectId,projectCondition,projectType,sequenceList,pageSize,pageNum,merchantId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/get', (req, res, next) => {
    const {projectId} = req.body;
    service.getProject(req, {
        projectId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});
router.post('/getRecord', (req, res, next) => {
    const {projectId,merchantId} = req.body;
    service.getRecord(req, {
        projectId,merchantId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/addProject', (req, res, next) => {
    //logger.info(req.body);
    const {projectId,beginTime,endTime,projectName,extensionUrl,projectType,merchantId,projectShowStatus,projectStatus,amount,belongType} = req.body;
    service.addProject(req, {
        projectId,beginTime,endTime,projectName,extensionUrl,projectType,merchantId,projectShowStatus,projectStatus,amount,belongType
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/deleteProject', (req, res, next) => {
    //logger.info(req.body);
    const {projectId,merchantId} = req.body;
    service.deleteProject(req, {
        projectId,merchantId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/offlineProject', (req, res, next) => {
    const {projectId,merchantId,projectShowStatus} = req.body;
    service.offlineProject(req, {
        projectId,merchantId,projectShowStatus
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;