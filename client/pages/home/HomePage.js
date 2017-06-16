import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hello, clearHello } from './action';
import { setToast } from '../../common/action/toast';
import './home.less';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func
  };

  helloHandle = (clear) => {
    return (e) => {
      e.stopPropagation();
      const {dispatch} = this.props;
      if (clear) {
        dispatch(clearHello());
      } else {
        dispatch(hello('开启 React Router Redux Immutable 之旅吧！'));
      }
    };
  };

  toastHandle = (e) => {
    e.stopPropagation();
    this.props.dispatch(setToast({
      content: '你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！'
    }));

    // fetch('/api/index/frame/?frameId=123456&&merchantId=2&page=3&versionId=1122',
    //   {
    //     method: 'GET',
    //     headers:{
    //         'Accept': 'application/json, text/javascript, */*;',
    //         'Content-Type': 'application/json; charset=utf-8'
    //     }
    //   }).then(data => {
    //     return data.json()
    //   }).then(list => {
    //     console.log(list);
    //   }).catch(error => {
    //     console.log(error);
    //   });
fetch('/api/index/version/add',
      {
        method: 'post',
        headers:{
            'Accept': 'application/json, text/javascript, */*;',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body:JSON.stringify({
          versionName:'示例模板4',
          merchantId:'123'
        })
      }).then(data => {
        return data.json()
      }).then(list => {
        console.log(list);
      }).catch(error => {
        console.log(error);
      });
  };

  render() {
    const {home} = this.props;
    return (
      <div className="home">
        <h1 className="mt-3">
          React Redux Router Immutable Webpack Less etc.
        </h1>
        <hr className="mt-2 mb-2" />
        <div>
          <h3 className="mb-1">{home.get('content')}</h3>
          <div className="btn-group">
            <button className="btn btn-info"
              onClick={this.helloHandle()}>欢迎您来到这里
            </button>
            <button className="btn btn-info"
              onClick={this.helloHandle(true)}>悄悄的离开
            </button>
            <button className="btn btn-primary"
              onClick={this.toastHandle}>Toast
            </button>
          </div>
        </div>
      </div>
            );
  }
}

function mapStateToProps(state, ownProps) {
  return {
              home: state.get('home')
  };
}


export default connect(mapStateToProps)(Home);
