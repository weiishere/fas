const SERVER_URL = process.env.SERVER_URL;
const SERVER_URL_CF = process.env.SERVER_URL_CF;
const global = {};
const generateUrl=(path)=>{
  return `${SERVER_URL}${path}`
}
const generateUrl2=(path)=>{
  return `${SERVER_URL_CF}${path}`
}
global.apis = {
  page1List: generateUrl('page1/list'),
  personPaging: generateUrl('person/paging'),
  personSave: generateUrl('person/save'),
  filmAll: generateUrl('film/all'),
  filmPopularity: generateUrl('film/popularity'),

  getVersion:generateUrl('getTemplet'),
  getVersionList:generateUrl('getTempletList'),
  deleteVersion:generateUrl('delTemplet'),
  addVersion:generateUrl('addTemplet'),
  setVersionActive:generateUrl('modifyStatus'),

  getFrame:generateUrl('getModule'),
  addFrame:generateUrl('addModule'),
  setFrame:generateUrl('modifyModule'),

  addBanner:generateUrl('addBanner'),
  getBanner:generateUrl('queryByBannerId'),
  updateBanner:generateUrl('modifyBanner'),
  uploadImg:generateUrl('uploadBannerImg '),
  getImgList:generateUrl('getImgList '),

  addFund:generateUrl('addFund'),
  getFund:generateUrl('queryByFundId'),
  updateFund:generateUrl('modifyFund'),
  getHotFundList:generateUrl('getFundList'),

  getProjectList:generateUrl2('queryProjectRecord'),
  getProject:generateUrl2('queryProjectDetails'),
  getRecord:generateUrl2('queryProjectRecordDetails'),
  addProject:generateUrl2('addProjectDetails'),
  deleteProject:generateUrl2('projectDelete'),
  offlineProject:generateUrl2('projectOffline')
};

module.exports = global;