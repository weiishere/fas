webpackJsonp([8,3],{112:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=o(r),u=function(){return a["default"].createElement("footer",{className:"footer-assist"},a["default"].createElement("div",{className:"footer"},a["default"].createElement("div",{className:"container"},a["default"].createElement("p",{className:"copyright"},"Copyright © 2016-2017 京东金融科技业务部前端"))))};t["default"]=u},113:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=o(r),u=n(2),c=o(u),l=function(){var e=document.location.pathname,t="/context";return a["default"].createElement("nav",{className:"header-nav"},a["default"].createElement("a",{href:t+"/home",className:(0,c["default"])("header-nav-item",e.indexOf(t+"/home")!==-1?"active":"")},"Home"),a["default"].createElement("a",{href:t+"/page1/module1",className:(0,c["default"])("header-nav-item",e.indexOf(t+"/page1")!==-1?"active":"")},"Page1"),a["default"].createElement("a",{href:t+"/page2/person",className:(0,c["default"])("header-nav-item",e.indexOf(t+"/page2")!==-1?"active":"")},"Page2"),a["default"].createElement("a",{href:t+"/about",className:(0,c["default"])("header-nav-item",e.indexOf(t+"/about")!==-1?"active":"")},"About"))};t["default"]=l},2:function(e,t,n){var o,r;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=typeof o;if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o))e.push(n.apply(null,o));else if("object"===r)for(var u in o)a.call(o,u)&&o[u]&&e.push(u)}}return e.join(" ")}var a={}.hasOwnProperty;void 0!==e&&e.exports?e.exports=n:(o=[],void 0!==(r=function(){return n}.apply(t,o))&&(e.exports=r))}()},450:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(0),a=o(r),u=n(7),c=n(101),l=o(c),i=n(96),s=o(i),f=n(527),d=o(f),p=n(526),m=o(p);n(52),l["default"].polyfill(),(0,u.render)(a["default"].createElement(s["default"],{routes:d["default"],reducers:m["default"],basename:"/context/page1"}),document.getElementById("layout"))},52:function(e,t){},520:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){return{caches:e.get("caches"),module1:e.get("module1"),module2:e.get("module2")}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),s=o(i),f=n(31),d=n(44),p=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"getChildContext",value:function(){return{dispatch:this.props.dispatch}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.location,o=e.caches,r=e.module1,a=e.module2,u=n.pathname,c=u.indexOf("/module1")!==-1?{location:n,caches:o,module1:r}:{location:n,caches:o,module2:a};return s["default"].createElement("div",{className:"container mt-1"},s["default"].createElement("ul",{className:"nav nav-tabs mb-2"},s["default"].createElement("li",{className:"nav-item"},s["default"].createElement(d.Link,{className:"nav-link",activeClassName:"active",to:"/module1"},"Module1")),s["default"].createElement("li",{className:"nav-item"},s["default"].createElement(d.Link,{className:"nav-link",activeClassName:"active",to:"/module2"},"Module2"))),t&&s["default"].cloneElement(t,c))}}]),t}(i.Component);p.propTypes={children:i.PropTypes.node,location:i.PropTypes.object,dispatch:i.PropTypes.func,caches:i.PropTypes.object,module1:i.PropTypes.object,module2:i.PropTypes.object},p.childContextTypes={dispatch:i.PropTypes.func},t["default"]=(0,f.connect)(c)(p)},521:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=o(r),u=function(e){var t=e.children,n=e.module1;return a["default"].createElement("div",null,t&&a["default"].cloneElement(t,{module1:n}))};u.propTypes={children:r.PropTypes.node,module1:r.PropTypes.object},t["default"]=u},522:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Com2=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(0),i=o(l),s=n(58);n(554);var f=t.Com2=function(e){function t(){var e,n,o,u;r(this,t);for(var c=arguments.length,l=Array(c),i=0;i<c;i++)l[i]=arguments[i];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.toast=function(){o.context.dispatch((0,s.setToast)({content:"Module-1 Com-2"}))},u=n,a(o,u)}return u(t,e),c(t,[{key:"render",value:function(){return i["default"].createElement("div",{className:"container"},i["default"].createElement("h3",{className:"mb-1"},"Module-1 Com-2"),i["default"].createElement("button",{className:"btn btn-primary",onClick:this.toast},"Toast"))}}]),t}(l.Component);f.contextTypes={dispatch:l.PropTypes.func},t["default"]=f},523:function(e,t,n){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Map)(),t=arguments[1],n=t.type,o=t.context;switch(n){case"module-1-hello":return e.set("context",o);default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(18);t["default"]=o},524:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Com1=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(0),i=o(l),s=n(58);n(555);var f=t.Com1=function(e){function t(){var e,n,o,u;r(this,t);for(var c=arguments.length,l=Array(c),i=0;i<c;i++)l[i]=arguments[i];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.toast=function(){o.context.dispatch((0,s.setToast)({content:"Module-2 Com-1"}))},u=n,a(o,u)}return u(t,e),c(t,[{key:"render",value:function(){return i["default"].createElement("div",{className:"container"},i["default"].createElement("h3",{className:"mb-1"},"Module-2 Com-1"),i["default"].createElement("button",{className:"btn btn-primary",onClick:this.toast},"Toast"))}}]),t}(l.Component);f.contextTypes={dispatch:l.PropTypes.func},t["default"]=f},525:function(e,t,n){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Map)(),t=arguments[1],n=t.type,o=t.context;switch(n){case"module-1-hello":return e.set("context",o);default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(18);t["default"]=o},526:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(66),a=n(97),u=o(a),c=n(98),l=o(c),i=n(71),s=o(i),f=n(523),d=o(f),p=n(525),m=o(p);t["default"]=(0,r.combineReducers)({routing:u["default"],toast:l["default"],caches:s["default"],module1:d["default"],module2:m["default"]})},527:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=o(r),u=n(44),c=n(92),l=o(c),i=n(520),s=o(i),f=n(521),d=o(f),p=n(522),m=o(p),h=n(524),y=o(h),v=a["default"].createElement(u.Route,{path:"/",component:l["default"]},a["default"].createElement(u.Route,{path:"page1",component:s["default"]},a["default"].createElement(u.Route,{path:"module1",component:d["default"]},a["default"].createElement(u.IndexRoute,{components:m["default"]})),a["default"].createElement(u.Route,{path:"module2",component:y["default"]})));t["default"]=v},554:function(e,t){},555:function(e,t){},58:function(e,t,n){"use strict";function o(){return{type:"set_toast",content:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",effect:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"enter",time:arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3}}function r(){return{type:"clear_toast",effect:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"leave"}}Object.defineProperty(t,"__esModule",{value:!0}),t.setToast=o,t.clearToast=r},71:function(e,t,n){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Map)({menukey:"/crowdFunding"}),t=arguments[1];switch(t.type){case"set_cache":return e.set(t.key,t.value);case"remove_cache":var n=t.keys,o=void 0===n?[]:n,a=e;return o.forEach(function(e){a=a.remove(e)}),a;case"clear_cache":return e.clear();case"set_menu":return e.set("menukey",t.payload);default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var r=n(18)},746:function(e,t,n){e.exports=n(450)},92:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e){return{toast:e.get("toast")}}Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),s=o(i),f=n(31),d=n(2),p=o(d),m=n(113),h=o(m),y=n(112),v=o(y),b=n(58),_=t.App=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"componentDidUpdate",value:function(){var e=this,t=this.props,n=t.toast,o=t.dispatch;n&&"enter"===n.get("effect")&&(this.toastTimeoutId&&clearTimeout(this.toastTimeoutId),this.toastTimeoutId=setTimeout(function(){o((0,b.clearToast)()),e.toastTimeoutId=null},n.get("time")))}},{key:"renderToast",value:function(){var e=this.props.toast,t=e.get("content"),n=e.get("effect");return s["default"].createElement("div",{className:(0,p["default"])("toast-panel",n||"")},s["default"].createElement("div",{className:"toast"},t))}},{key:"render",value:function(){var e=this.props.children;return s["default"].createElement("div",{className:"main"},this.renderToast(),s["default"].createElement(h["default"],null),e,s["default"].createElement(v["default"],null))}}]),t}(i.Component);_.propTypes={children:i.PropTypes.node,toast:i.PropTypes.object,dispatch:i.PropTypes.func.isRequired},t["default"]=(0,f.connect)(c)(_)}},[746]);