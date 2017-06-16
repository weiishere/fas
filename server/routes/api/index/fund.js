const express = require('express');
const service = require('../../../service/index/fund');
const router = express.Router();

router.get('/get', (req, res, next) => {
  const {fundId} = req.query;
  service.getFund(req, {
    fundId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/add', (req, res, next) => {
  const {fundContent, merchantId} = req.body;
  service.addFund(req, {
    fundContent, merchantId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/update', (req, res, next) => {
  const {fundId,fundContent} = req.body;
  service.updateFund(req, {
    fundId,fundContent
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});
router.get('/hotFundList',(req,res,next)=>{
  const {merchantId} = req.query;
  service.getHotFundList(req,{merchantId}).then((body)=>{
    res.json(body);
  }).catch((err)=>{
    next(err);
  })
})
module.exports = router;