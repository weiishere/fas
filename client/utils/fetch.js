import 'isomorphic-fetch';
import perfect from './perfect';
// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  credentials: 'include', //设置该属性可以把 cookie 信息传到后台
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

// 检查请求是否成功
function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param body //往后台传递的 json 参数
 * @param method // 请求 type  get post delete header put
 * @param options // 可选参数项
 * @returns {Promise.<TResult>}
 */
function callApi({url, body = {}, method = 'get', options = {}}) {
  if (!url) {
    const error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  let fullUrl = '';
  //如果是绝对路径，则直接发请求
  if (url.indexOf('http') === 0) {
    fullUrl = url;
  } else {
    fullUrl = `${url}`;
  }

  const _options = {method, ...defaultOptions, ...options};

  if (method !== 'get' && method !== 'head') {
    //数据为 null 不要传到后台
    Object.keys(body).forEach((item) => {
      if (body[item] === null || body[item] === '') {
        delete body[item];
      }
    });
    _options.body = perfect.stringifyJSON(body);
  }
  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response.ok || json.code!=='00000') {
        // 根据后台实际返回数据来定义错误格式
        const error = new Error(json.msg || '获取数据出错');
        error.code = json.code;
        return Promise.reject(json.msg || '获取数据出错', error);
      }
      return json;
    }).catch((error) => {
      return Promise.reject(error||'网络错误');
    });
}

export default callApi;
