const express = require('express');
const service = require('../../../service/index/frame');
const service2 = require('../../../service/crowdFunding/crowdFunding');
const router = express.Router();

router.get('/get', (req, res, next) => {
    const {/*frameId: moduleId,*/ merchantId, page, templetId} = req.query;
    service.getFrame(req, {
        /*moduleId,*/ merchantId, page, templetId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/add', (req, res, next) => {
    const {moduleContent, merchantId, page, templetId} = req.body;
    service.addFrame(req, {
        moduleContent, merchantId, page, templetId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

router.post('/set', (req, res, next) => {
    const {moduleId, moduleContent, merchantId,page,templetId} = req.body;
    service.setFrame(req, {
        moduleId, moduleContent, merchantId, page, templetId
    }).then((body) => {
        res.json(body);
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;