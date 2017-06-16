const express = require('express');
const fs=require('fs');
const path=require('path');
const service = require('../../../service/index/banner');
const multer=require('multer');
const storage=multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null,path.resolve(__dirname,'../../../uploads'))
  },
  filename:function (req, file, cb) {
    let fileFormat=(file.originalname).split('.');
    const suffix=Date.now()+'.'+fileFormat[fileFormat.length-1];
    cb(null,file.fieldname+'-'+suffix);
  }
})
const upload = multer({
  limits:{
    fieldSize:'10mb'
  },
  storage:storage
})
const router = express.Router();

router.get('/get', (req, res, next) => {
  const {bannerId} = req.query;
  service.getBanner(req, {
    bannerId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/add', (req, res, next) => {
  const {bannerContent, merchantId} = req.body;
  service.addBanner(req, {
    bannerContent, merchantId
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/update', (req, res, next) => {
  const {bannerId,bannerContent} = req.body;
  service.updateBanner(req, {
    bannerId,bannerContent
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/uploadImg',upload.single('file'),(req,res,next)=>{
  const readable=fs.createReadStream(req.file.path,{
    autoClose:true
  })
  readable.on('close',function () {
    fs.unlink(req.file.path);
  })
  readable.on('error',function () {
    fs.unlink(req.file.path);
  })
  const formData={
    merchantId:req.body.merchantId,
    file:readable
  }
  service.uploadImg(req,formData).then((body)=>{
    res.send(body);
  }).catch((err) => {
    next(err);
    fs.unlink(req.file.path);
  })
})
router.get('/getImgList',(req,res,next)=>{
  const {merchantId}=req.query;
  service.getImgList(req,{merchantId}).then((body)=>{
    res.json(body);
  }).catch((err)=>{
    next(err);
  })
})
module.exports = router;