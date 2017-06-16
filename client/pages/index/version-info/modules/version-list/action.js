import fetch from '../../../utils/fetch'
import {message} from 'antd';
/**
 * 添加版本
 * @param versionName
 * @param merchantId
 * @param callback
 * @returns {Function}
 */
const addVersion = (versionName,merchantId,callback)=>{
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/index/version/add',
            type:'post',
            data:{versionName:versionName,merchantId:merchantId},
            success: function (json1) {
                fetch(dispatch, {
                    url: '/fas-sys/api/index/version/list?merchantId='+merchantId, success: function (json) {
                        dispatch({
                            type: 'get_version_list',
                            versionList: json.data
                        });
                        callback(json1.data.templetId);
                        message.success('添加版本成功！')
                    }, error: function () {
                        message.error('获取版本列表失败！')
                    }
                });
            }, error: function () {
            message.success('添加版本失败！')
          }
        });
    }
}
/**
 * 获取版本列表
 * @param merchantId
 * @returns {Function}
 */
const getVersionList = (merchantId)=>{
  return function (dispatch, getState) {
      fetch(dispatch, {
          url: '/fas-sys/api/index/version/list?merchantId='+merchantId,
        success: function (json) {
              dispatch({
                  type: 'get_version_list',
                  versionList: json.data
              });
          },
        error: function (error) {
              console.log(error);
          }
      });
  }
}
/**
 * 设置版本激活状态
 * @param versionId
 * @param merchantId
 * @param callback
 * @returns {Function}
 */
const  activateVersion=(versionId,merchantId,callback)=> {
  return function (dispatch,getState) {
    fetch(dispatch, {
        url: '/fas-sys/api/index/version/setStatus',
        type:'post',
        data:{merchantId:merchantId,versionId:versionId},
        success: function () {
            fetch(dispatch, {
              url: '/fas-sys/api/index/version/list?merchantId='+merchantId,
              success: function (json) {
                    dispatch({
                        type: 'get_version_list',
                        versionList: json.data
                    });
                    callback();
                }, error: function () {
                }
            });
        }, error: function () {
        }
    });
  }
}
/**
 * 删除版本
 * @param versionId
 * @param merchantId
 * @returns {Function}
 */
const deleteVersion=(versionId,merchantId,callback)=> {
  return function (dispatch,getState) {
    fetch(dispatch, {
        url: '/fas-sys/api/index/version/delete',
        type:'post',
        data:{merchantId:merchantId,versionId:versionId},
        success: function () {
          message.success('删除版本成功！');
            fetch(dispatch, {
                url: '/fas-sys/api/index/version/list?merchantId='+merchantId, success: function (json) {
                    dispatch({
                        type: 'get_version_list',
                        versionList: json.data
                    });
                    callback();
                }, error: function () {
                }
            });
        }, error: function () {
        message.error('删除版本失败！');
        }
    });
  }
}
const visibleVersionList=(visible)=>{
    return {
        type:'visible_VersionList',
        visible:visible
    }
}
export {addVersion,getVersionList, activateVersion,deleteVersion,visibleVersionList }

