import React,{Component} from 'react';
export function merchantIdInject(WrappedComponent) {
  return class extends Component{
    getInstance=(instance)=>{
      this.instance=instance;
    }
    render(){
      const getCookie=(name)=>
      {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      }
      const getQueryString=(name)=> {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }
      const setCookie=(name, value)=> {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      }
      const isLoginStatus=(isCookie=true)=>{
        if(isCookie)
          return (getCookie('loginName')&&getCookie('merchantId')&&getCookie('auth'))?true:false;
        else
          return (getQueryString('loginName')&&getQueryString('merchantId')&&getQueryString('auth'))?true:false;
      }
      //debugger
      if(isLoginStatus()&&isLoginStatus(false)){
        //两者都有

        console.log(getQueryString('loginName'));
        location.href=location.href.split('?')[0];
      }else if(!isLoginStatus()&&isLoginStatus(false)){
        //只有query无cookie
        if(getCookie('loginJdpay')){
          setCookie('loginName',getQueryString('loginName'));
          setCookie('auth',getQueryString('auth'));
          setCookie('merchantId',getQueryString('merchantId'));
        }else{
          location.href=location.href.split('?')[0];
        }
      }else if(isLoginStatus(false)&&!isLoginStatus()){
        //有cookie无query
      }else if(!isLoginStatus(false)&&!isLoginStatus()){
        //两者皆无
        setCookie('loginJdpay','true');
        debugger
        location.href='http://172.25.50.13:8888/account/auth?redirect='+decodeURIComponent(location.href);
      }

      // debugger
      // if(!isLoginStatus()){
      //   if(!isLoginStatus(false)){
      //     setCookie('loginJdpay','true');
      //     location.href='http://ft.jdpay.com:8888/account/auth?redirect='+decodeURIComponent(location.href);
      //   }else{
      //     if(getCookie('loginJdpay')){
      //       setCookie('loginName',getQueryString('loginName'));
      //       setCookie('auth',getQueryString('auth'));
      //       setCookie('merchantId',getQueryString('merchantId'));
      //     }else{
      //       //可能是非法query
      //       setCookie('loginJdpay','true');
      //       location.href='http://ft.jdpay.com:8888/account/auth?redirect='+decodeURIComponent(location.href);
      //     }
      //   }
      // }else{
      //   //验证cookie合法
      //   // if(getCookie('loginJdpay')){
      //   //   location.href=location.href.split('?')[0];
      //   // }
      // }
      const userInfo = {
        loginName:getCookie('loginName'),
        merchantId:getCookie('merchantId'),
        auth:getCookie('auth')
      }
      return <WrappedComponent ref={this.getInstance} {...userInfo} {...this.props}/>
    }
  }
}
