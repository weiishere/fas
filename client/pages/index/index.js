import promise from 'es6-promise';
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Route, IndexRoute} from 'react-router';
import Root from '../../Root';
import App from './App';
import VersionInfo from './version-info/VersionInfo';
import '../../common/less/main.less';
import reducers from './reducer';
const WrapVersionInfo=(WrappedComponent)=>{
  return class extends Component{
    render(){
      return <WrappedComponent {...this.props}></WrappedComponent>
    }
  }
}
// Promise 兼容性处理
promise.polyfill();
const routes = (
  <Route path="/index" component={App}>
    <IndexRoute component={VersionInfo}/>
    <Route path=':id' component={WrapVersionInfo(VersionInfo)}></Route>
  </Route>
);
render(
  <Root routes={routes} reducers={reducers} basename="/fas-sys"/>,
  document.getElementById('layout')
);
