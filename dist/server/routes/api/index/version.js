const express = require('express');
const service = require('../../../service/index/version');
const router = express.Router();

router.get('/get', (req, res, next) => {
  const {versionId:templetId}=req.query;
  //console.warn({templetId});
  service.getVersion(req,{templetId}).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});


router.get('/list', (req, res, next) => {
  const {merchantId}=req.query;
  service.getVersionList(req,{merchantId}).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});



router.post('/delete', (req, res, next) => {
  const {versionId:templetId,merchantId} = req.body;
  service.deleteVersion(req, {templetId,merchantId}).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/add', (req, res, next) => {
  const {versionName:templetName,merchantId} = req.body;
  service.addVersion(req, {
    templetName,merchantId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/setStatus', (req, res, next) => {
  const {versionId:templetId,merchantId} = req.body;
  //console.log({templetId,merchantId});
  service.setVersionActive(req, {
    templetId,merchantId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

