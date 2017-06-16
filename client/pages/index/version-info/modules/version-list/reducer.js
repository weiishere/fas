import { Map,fromJS } from 'immutable';
function versionList(state = Map({
  'versionList':
  [
    //  {
    //   id:"1",
    //   name:'版本1',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"2",
    //   name:'版本2',
    //   status:1,
    //   creator:"测试账号2"
    // },{
    //   id:"3",
    //   name:'版本3',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"4",
    //   name:'版本4',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"5",
    //   name:'版本1',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"6",
    //   name:'版本2',
    //   status:1,
    //   creator:"测试账号2"
    // },{
    //   id:"7",
    //   name:'版本3',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"8",
    //   name:'版本4',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"9",
    //   name:'版本3',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"10",
    //   name:'版本4',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"11",
    //   name:'版本1',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"12",
    //   name:'版本2',
    //   status:1,
    //   creator:"测试账号2"
    // },{
    //   id:"13",
    //   name:'版本3',
    //   status:0,
    //   creator:"测试账号1"
    // },{
    //   id:"14",
    //   name:'版本4',
    //   status:0,
    //   creator:"测试账号1"
    // }
  ],'visibleVersionList':true
}), action) {
  switch (action.type) {
    case 'get_version_list':
      return state.set('versionList', action.versionList)
    case 'set_version_status':
      return state.set('versionList', action.versionList)
    case 'delete_version':
      let index=10;
      for(let i=0;i<state.get('versionList').length;i++){
        if(state.get('versionList')[i].templetId==action.oldId){
          index=i;
          break;
        }
      }
      let _arr= fromJS({'versionList':state.get('versionList')}).deleteIn(['versionList',index]).toJS();
      return Map(_arr);
    case 'visible_VersionList':
      return state.set('visibleVersionList',action.visible);
    default:
      return state;
  }
}
export default versionList