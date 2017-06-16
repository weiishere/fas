import fetch from '../utils/fetch';
import {message} from 'antd';
const PAGE_CARD_STATUS_CHANGE='page_card_status_change';
const GET_PAGE_LIST='get_page_list';
const SAVE_BANNER='save_banner';
const SAVE_FUND='save_fund';
const ADD_BANNER='add_banner';
const REMOVE_BANNER='remove_banner';
const UPDATE_BANNER='update_banner';
const ADD_FUND='add_fund';
const REMOVE_FUND='remove_fund';
const UPDATE_FUND='update_fund';
const ADD_PERSON='add_person';
const HOT_FUND_LIST='hot_fund_list';
const UPDATE_STRUCTURE='update_structure';
const VERSION_ID='version_id';
const ADD_STRUCTURE='add_structure';
const DEFAULT_STRUCTURE='default_structure';
export const versionInfoActionTypes={
  PAGE_CARD_STATUS_CHANGE,
  GET_PAGE_LIST,
  SAVE_BANNER,
  SAVE_FUND,
  ADD_BANNER,
  REMOVE_BANNER,
  ADD_FUND,
  REMOVE_FUND,
  ADD_PERSON,
  UPDATE_STRUCTURE,
  HOT_FUND_LIST,
  VERSION_ID,
  ADD_STRUCTURE,
  UPDATE_FUND,
  UPDATE_BANNER,
  DEFAULT_STRUCTURE
}

export function pageCardStatusChange(pageData){
  return {
    type:PAGE_CARD_STATUS_CHANGE,
    data:pageData
  }
}
export function banner(bannerData) {
  return {
    type:SAVE_BANNER,
    data:bannerData
  }
}
export function fund(fundData) {
  return {
    type:SAVE_FUND,
    data:fundData
  }
}
export function addBanner(id) {
  return {
    type:ADD_BANNER,
    data:[{
      bannerId:id,
      bannerContent:[]
    }]
  }
}
export function removeBanner(id) {
  return {
    type:REMOVE_BANNER,
    data:{
      bannerId:id
    }
  }
}
export function updateBanner(banner) {
  return {
    type:UPDATE_BANNER,
    data:banner
  }
}
export function addFund(id) {
  return {
    type:ADD_FUND,
    data:[{
      fundId:id,
      fundContent:[]
    }]
  }
}
export function removeFund(id) {
  return {
    type:REMOVE_FUND,
    data:{
      fundId:id
    }
  }
}
export function updateFund(fundList) {
  return {
    type:UPDATE_FUND,
    data:fundList
  }
}
export function hotFundList(list) {
  return {
    type:HOT_FUND_LIST,
    data:list
  }
}
export function getHotFundList(merchantId) {
  return function (dispatch, getState) {
    fetch(dispatch,{
      url:'/fas-sys/api/index/fund/hotFundList?merchantId='+merchantId,
      type:'get'
    }).then((data)=>{
      dispatch(hotFundList(data.data));
    }).catch((err)=>{

    })
  }

}
export const getModuleData=(dispatch,moduleContent)=>{
  let fetchArr=[];
  for(let i=0;i<moduleContent.length;i++){
    let one=moduleContent[i],
      options={
        type:'get',
        data:{}
      }
    if(one.module==='banner'){
      options.url='/fas-sys/api/index/banner/get';
      options.data.bannerId=one.id;
    }else if(one.module==='fund'){
      options.url='/fas-sys/api/index/fund/get';
      options.data.fundId=one.id;
    }else if(one.module==='person'){
      continue;
    }
    fetchArr.push(fetch(dispatch,options));
  }
  return fetchArr;
}
export const getFrameData=({templetId,merchantId,page})=>{
  return function (dispatch, getState) {
    fetch(dispatch,{
      type:'get',
      url:'/fas-sys/api/index/frame/get',
      data:{
        templetId,
        merchantId,
        page
      }
    }).then((data)=>{
      let origin=data.data;
      if(origin){
        try{
          origin.moduleContent=JSON.parse(origin.moduleContent);
        }catch (e){
          origin.moduleContent=[];
        }
        if(origin.moduleContent){
          //获取所有模块数据
          Promise.all(getModuleData(dispatch,origin.moduleContent)).then((data)=>{
            let fundList=[],banner=[];
            for(let i=0;i<data.length;i++){
              let one=data[i].data||{};
              if(one.bannerId!==undefined){
                try{
                  one.bannerContent=JSON.parse(one.bannerContent)||[];
                }catch (e){
                  one.bannerContent=[];
                }

                banner.push(one)
              }else if(one.fundId!==undefined){
                try{
                  one.fundContent=JSON.parse(one.fundContent)||[];
                }catch(e){
                  one.fundContent=[];
                }
                fundList.push(one);
              }
            }
            dispatch(updateFund(fundList));
            dispatch(updateBanner(banner));
            message.success('获取配置成功!')
          }).catch((err)=>{
            message.error(err);
          })
        }
      }else{
        origin={
          page:page,
          moduleContent:[]
        }
        message.success('获取配置成功!')
      }
      dispatch(updateStructure(Object.assign({},origin,{
        page:page
      })));
      dispatch(updateFund([]));
      dispatch(updateBanner([]));
    }).catch((err)=>{
      message.error(err);
    })
  }
}
export function updateStructure(structure) {
  return {
    type:UPDATE_STRUCTURE,
    data:structure
  }
}
export function addStructure(structure) {
  return {
    type:ADD_STRUCTURE,
    data:structure
  }
}
export function defaultStructure() {
  return {
    type:DEFAULT_STRUCTURE,
    data:{
      moduleContent:[]
    }
  }
}


