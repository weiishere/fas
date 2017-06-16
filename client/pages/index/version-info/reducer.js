import {versionInfoActionTypes} from './action';
import {combineReducers} from 'redux-immutable';
const pageList=function (state=[
  {
    page:'index',
    alias:"基金超市首页",
    active:true
  }
],action){
  switch (action.type){
    case versionInfoActionTypes.GET_PAGE_LIST:
      return action.data;
    case versionInfoActionTypes.PAGE_CARD_STATUS_CHANGE:
      let pageList = Object.assign([],state.get('pageList'));
      for(let i=0;i<pageList.length;i++){
        pageList[i].active=false;
        if(pageList[i].pageName===action.data.pageName){
          pageList[i].active=true;
        }
      }
      return state.set('pageList',pageList);
    default:
      return state;
  }
}
const banner=function (state = [
//   {
//   bannerId:'b1',
//   bannerContent:[
//     {imgUrl:'b1_测试',jumpUrl:''},
//     {imgUrl:'b1_测试2',jumpUrl:''},
//     {imgUrl:'b1_测试3',jumpUrl:''}
//     ]
// },{
//   bannerId:'b2',
//   bannerContent:[
//     {imgUrl:'b2_测试1',jumpUrl:''},
//     {imgUrl:'b2_测试3',jumpUrl:''},
//     {imgUrl:'b2_测试5',jumpUrl:''}]
// }
],action) {
  switch (action.type){
    case versionInfoActionTypes.SAVE_BANNER:
      let flag=false;
      state.map((item, index, arrSelf)=>{
        if(item.bannerId===action.data.bannerId){
          flag=true;
          item.bannerContent=action.data.bannerContent
        }
      })
      if(!flag){
        state.push(action.data);
      }
      return [].concat(state);
    case versionInfoActionTypes.ADD_BANNER:
      const temp=state.concat(action.data);
      return temp;
    case versionInfoActionTypes.REMOVE_BANNER:
      for(let i=0;i<state.length;i++){
        if(state[i].bannerId===action.data.bannerId){
          state.splice(i,1)
          break;
        }
      }
      return [].concat(state);
    case versionInfoActionTypes.UPDATE_BANNER:
      return action.data;
    default:
      return state;
  }
}
const modules=function (state = [
  {module:'banner',name:'banner模块',className:'banner'},
  {module:'person',name:'个人信息模块',className:'person'},
  {module:'fund',name:"基金模块",className:'fund'}],action) {
  return state;
}
const structure=function (state={
  templateId:'',
  moduleId:'',
  // moduleContent:[{id:"b1",module:'banner'},{id:'p1',module:'person'},{id:'f1',module:'fund'},{id:'b2',module:'banner'}],
  merchantId:'',
  page:''
},action) {
  switch (action.type){
    case versionInfoActionTypes.UPDATE_STRUCTURE:
      let temp=Object.assign({},state,action.data);
      return temp;
    case versionInfoActionTypes.ADD_STRUCTURE:
      return Object.assign({},state,action.data);
    case versionInfoActionTypes.DEFAULT_STRUCTURE:
      return action.data;
    default:
      return state;
  }
}

const fund=function (state=[
//   {
//   fundId:'f1',
//   fundContent:[{
//     fundId:'1',
//     fundName:"测试基金一",
//
//   },{
//     fundId:'2',
//     fundName:'测试基金二'
//   }]
// }
],action) {
  switch (action.type){
    case versionInfoActionTypes.SAVE_FUND:
      let flag=false;
      state.map((item,index,arrSelf)=>{
        if(item.fundId===action.data.fundId){
          flag=true;
          item.fundContent=action.data.fundContent;
        }
      })
      if(!flag){
        state.push(action.data);
      }
      return [].concat(state);
    case versionInfoActionTypes.ADD_FUND:
      const temp=state.concat(action.data);
      return temp;
    case versionInfoActionTypes.REMOVE_FUND:
      for(let i=0;i<state.length;i++){
        if(state[i].fundId===action.data.fundId){
          state.splice(i,1)
          break;
        }
      }
      return [].concat(state);
    case versionInfoActionTypes.UPDATE_FUND:
      return action.data;
    default:
      return state;
      ;
  }
}
const hotFundList=function (state = [
//   {
//   fundId:"1",
//   fundName:"测试基金一",
//   fundHot:0,
//   fundType:'',
//   id:'',
//   annualYieldRange:''
// }
],action) {
  switch (action.type){
    case versionInfoActionTypes.HOT_FUND_LIST:
      return [].concat(action.data)
    default:
      return state;
  }
}
const person=function (state = {},action) {
  return state
}
const page=function (state = '', action) {
  return state;
}
const versionInfo=combineReducers({
  pageList,
  banner,
  modules,
  structure,
  fund,
  hotFundList,
  page
})
export default versionInfo;