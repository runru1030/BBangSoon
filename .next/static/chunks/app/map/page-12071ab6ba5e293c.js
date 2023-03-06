(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[883],{6153:function(n,t,e){Promise.resolve().then(e.bind(e,739))},739:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return z}});var r=e(5147),o=e(6118),i=e(9268),a=e(6006),c=e(5732),s=e(4522),u=e(8814),l=e(9),d=e(3380),f=e(8741),p=e.n(f),h=e(2040);function m(){var n=(0,o.Z)(['\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  position: absolute;\n  z-index: 99;\n  margin-top: 10px;\n  input[type="text"] {\n    border: ',";\n    border-radius: 5px;\n    padding: 10px 20px;\n    box-shadow: 2px 2px 10px 2px #46a6ff1e;\n    width: 85%;\n    background-color: white;\n  }\n"]);return m=function(){return n},n}function x(){var n=(0,o.Z)(["\n  position: absolute;\n  transform: translate(42vw, 50%);\n  color: ",";\n"]);return x=function(){return n},n}var g=function(n){var t=n.setIsOpen,e=n.setAddressList,o=(0,r.Z)((0,a.useState)(""),2),c=o[0],s=o[1];return(0,i.jsxs)(v,{onSubmit:function(n){n.preventDefault(),p().get("https://dapi.kakao.com/v2/local/search/keyword.json?query=".concat(c),{headers:{Authorization:"KakaoAK ".concat(h.env.REACT_APP_KAKAO_REST_KEY)},params:{size:15}}).then(function(n){e(n.data.documents)}),t(!1)},children:[(0,i.jsx)("input",{type:"text",value:c,placeholder:"위치 검색",onChange:function(n){return s(n.target.value)}}),(0,i.jsx)("input",{type:"submit",id:"search",style:{display:"none"}}),(0,i.jsx)(w,{htmlFor:"search",children:(0,i.jsx)(d.G,{icon:l.wn1})})]})},v=c.ZP.form.withConfig({componentId:"sc-78a3af21-0"})(m(),function(n){return"solid thin"+n.theme.color.blue}),w=c.ZP.label.withConfig({componentId:"sc-78a3af21-1"})(x(),function(n){return n.theme.color.blue});function y(){var n=(0,o.Z)(["\n    position: sticky;\n    display: flex;\n    align-items: center;\n    padding: 10px 20px;\n    top: 0px;\n    font-size: medium;\n    border-bottom: ",";\n    background-color: white;\n    color:#6f6f6f;\n    z-index:999;\n    gap: 10px;\n    box-sizing: border-box;\n    #visit{\n        flex: 0.1;\n    }\n"]);return y=function(){return n},n}function b(){var n=(0,o.Z)(["\n  all: unset;\n  font-size: x-small;\n  font-weight: normal;\n  flex: 1;\n  text-align: end;\n  color: ",";\n"]);return b=function(){return n},n}var Z=function(n){var t=n.setAddressList,e=(0,r.Z)((0,a.useState)(!1),2),o=e[0],c=e[1];return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(j,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(d.G,{icon:l.FGq})," 빵 지도"]}),(0,i.jsx)(k,{onClick:function(){c(function(n){return!n})},children:"위치 검색"})]}),o&&(0,i.jsx)(g,{setIsOpen:c,setAddressList:t})]})},j=c.ZP.header.withConfig({componentId:"sc-5ec11f57-0"})(y(),function(n){return"solid thin"+n.theme.color.border_grey}),k=c.ZP.button.withConfig({componentId:"sc-5ec11f57-1"})(b(),function(n){return n.theme.color.blue}),_=e(2640),A=e(8872);function C(){var n=(0,o.Z)(["\n  all: unset;\n  color: #46a6ff;\n  text-align: center;\n  width: 100%;\n"]);return C=function(){return n},n}function S(){var n=(0,o.Z)(["\n  overflow: scroll;\n  padding-bottom: 100px;\n  width: 100%;\n  height: 100%;\n  max-height: 100vh;\n  overflow: auto;\n"]);return S=function(){return n},n}var P=function(n){var t=n.markerArr,e=n.isEnd,o=n.curpage,c=n.getStoreApi,s={si:"서울",y:37.556428224476505,x:126.97150576481177},u=(0,r.Z)((0,a.useState)({title:"",y:s.y,x:s.x}),2),l=u[0],d=u[1],f=(0,r.Z)((0,a.useState)({title:"",y:s.y,x:s.x}),2),p=f[0];return f[1],(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(_.Z,{loc:l,setLoc:d,curLoc:p,markerArr:t}),(0,i.jsxs)(I,{className:"col-container",children:[t.map(function(n){return(0,i.jsx)(A.Z,{store:n})}),!e&&(0,i.jsx)(E,{className:"more-btn",onClick:function(){c(o)},children:"더 보기"})]})]})},E=c.ZP.button.withConfig({componentId:"sc-2874ea78-0"})(C()),I=c.ZP.div.withConfig({componentId:"sc-2874ea78-1"})(S());function L(){var n=(0,o.Z)(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  height: 30px;\n  border-top: ",";\n"]);return L=function(){return n},n}var z=function(){var n={si:"서울",y:37.556428224476505,x:126.97150576481177},t=(0,r.Z)((0,a.useState)({title:"",y:null==n?void 0:n.y,x:null==n?void 0:n.x}),2),e=t[0],o=t[1],c=(0,r.Z)((0,a.useState)([]),2),l=c[0],d=c[1],f=(0,r.Z)((0,a.useState)(),2),p=f[0],h=f[1],m=(0,r.Z)((0,a.useState)(1),2),x=m[0],g=m[1],v=(0,r.Z)((0,a.useState)([]),2),w=v[0],y=v[1],b=function(n){o({title:w[n].place_name,y:w[n].y||0,x:w[n].x||0}),y([])};(0,a.useEffect)(function(){j(1)},[e]);var j=function(n){(0,u.L$)(n,l,e).then(function(n){d(n.resultArr),h(n.isEnd),g(function(n){return n+1}),(0,u.dX)(n.resultArr,d)})};return(0,i.jsxs)("div",{children:[(0,i.jsx)(Z,{setAddressList:y}),(0,i.jsx)("div",{children:0==w.length?(0,i.jsx)(P,{markerArr:l,isEnd:p,curpage:x,getStoreApi:j}):(0,i.jsx)("div",{children:w.map(function(n,t){return(0,i.jsx)(O,{id:""+t,onClick:function(n){return b(parseInt(n.currentTarget.id))},children:n.place_name})})})}),(0,i.jsx)(s.Z,{})]})},O=c.ZP.div.withConfig({componentId:"sc-e089ae7-0"})(L(),function(n){return"solid thin"+n.theme.color.border_grey})},2640:function(n,t,e){"use strict";var r=e(5147),o=e(6118),i=e(9268),a=e(9),c=e(3380),s=e(6008),u=e(6006),l=e(5732);function d(){var n=(0,o.Z)(["\n  color: ",";\n  display: flex;\n  align-items: center;\n  background-color: white;\n  position: absolute;\n  z-index: 9;\n  font-size: small;\n  padding: 5px 10px;\n  border-radius: 20px;\n  margin-left: 50%;\n  transform: translate(-50%, 10px);\n  gap: 5px;\n"]);return d=function(){return n},n}function f(){var n=(0,o.Z)(["\n  #info {\n    font-size: small;\n    border: solid #dcdcdc;\n    border: solid #46a6ff;\n    background-color: rgb(255, 255, 255);\n    padding: 5px 10px;\n    border-radius: 10px;\n    display: flex;\n    flex-direction: column;\n    transform: translate(40%, -130%);\n    box-shadow: 2px 2px 2px 2px #46a6ff33;\n  }\n  #info > span:nth-child(1) {\n    color: #46a6ff;\n  }\n"]);return f=function(){return n},n}t.Z=function(n){var t=n.loc,e=n.setLoc,o=n.curLoc,l=n.markerArr,d=(0,s.usePathname)(),f=(0,r.Z)((0,u.useState)({title:"",y:t.y,x:t.x}),2),m=f[0],x=f[1];(0,u.useEffect)(function(){g()},[t,l]);var g=function(){var n=document.getElementById("mapContainer"),e={center:new window.kakao.maps.LatLng(null==t?void 0:t.y,null==t?void 0:t.x),level:5},r=new window.kakao.maps.Map(n,e);new window.kakao.maps.Marker({map:r,position:new window.kakao.maps.LatLng(null==o?void 0:o.y,null==o?void 0:o.x),image:new window.kakao.maps.MarkerImage("curLoc.png",new window.kakao.maps.Size(20,20)),clickable:!0}),l.map(function(n){var t=new window.kakao.maps.Marker({map:r,position:new window.kakao.maps.LatLng(n.y,n.x),title:n.title,clickable:!0}),e='\n       <div><div id="info">\n       <span>'.concat(n.place_name,"</span>\n       <span>").concat(n.address_name,"</span>\n       </div></div>\n      "),o=new window.kakao.maps.CustomOverlay({content:e,map:r,position:t.getPosition()});o.setMap(null),window.kakao.maps.event.addListener(t,"click",function(){o.setMap(r)}),window.kakao.maps.event.addListener(r,"click",function(n){n.latLng!=t.getPosition()&&o.setMap(null)})}),window.kakao.maps.event.addListener(r,"center_changed",function(){var n=r.getCenter();x({title:"",y:n.getLat(),x:n.getLng()})})};return(0,i.jsxs)(i.Fragment,{children:["/storemap"==d&&(0,i.jsxs)(p,{onClick:function(){e&&e(m)},children:[(0,i.jsx)(c.G,{icon:a.XSV}),(0,i.jsx)("span",{children:"현 위치 검색"})]}),(0,i.jsx)(h,{id:"mapContainer",style:{width:"100%",height:"300px"}})]})};var p=l.ZP.div.withConfig({componentId:"sc-ffbc2fef-0"})(d(),function(n){return n.theme.color.blue}),h=l.ZP.div.withConfig({componentId:"sc-ffbc2fef-1"})(f())},4522:function(n,t,e){"use strict";var r=e(6118),o=e(9268),i=e(9),a=e(3380),c=e(5846),s=e.n(c),u=e(6008);e(6006);var l=e(5732);function d(){var n=(0,r.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  #icon {\n    font-size: large;\n    margin-bottom: 5px;\n  }\n  span {\n    font-size: xx-small;\n    margin-top: 5px;\n  }\n"]);return d=function(){return n},n}function f(){var n=(0,r.Z)(["\n  position: fixed;\n  bottom: 0;\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  gap: 20%;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0;\n  border-top: ",";\n  background-color: white;\n"]);return f=function(){return n},n}t.Z=function(){var n=(0,u.usePathname)();return(0,o.jsxs)(h,{children:[(0,o.jsxs)(p,{href:"/home",children:[(0,o.jsx)(a.G,{icon:i.MV6,id:"icon",color:"/"==n?"#e2c26e":"#6f6f6f"}),(0,o.jsx)("span",{children:"홈"})]}),(0,o.jsxs)(p,{href:"/map",children:[(0,o.jsx)(a.G,{id:"icon",icon:i.FGq,color:"/storemap"==n?"#46A6FF":"#6f6f6f"}),(0,o.jsx)("span",{children:"빵 지도"})]}),(0,o.jsxs)(p,{href:"/wish",children:[(0,o.jsx)(a.G,{id:"icon",icon:i.m6i,color:"/wish"==n?"#f89573":"#6f6f6f"}),(0,o.jsx)("span",{children:"관심"})]}),(0,o.jsxs)(p,{href:"/feed",children:[(0,o.jsx)(a.G,{id:"icon",icon:i.FL8,color:"/feed"==n?"#46A6FF":"#6f6f6f"}),(0,o.jsx)("span",{children:"일지"})]})]})};var p=(0,l.ZP)(s()).withConfig({componentId:"sc-41971ab-0"})(d()),h=l.ZP.div.withConfig({componentId:"sc-41971ab-1"})(f(),function(n){return"solid thin"+n.theme.color.border_grey})},8872:function(n,t,e){"use strict";var r=e(6118),o=e(9268);e(6006);var i=e(3380),a=e(9),c=e(5732),s=e(6628),u=e(850),l=e(6008);function d(){var n=(0,r.Z)(["\n  width: 100vw;\n  max-width: 100vw;\n  display: flex;\n  align-items: center;\n  padding: 20px 0px;\n  height: 30px;\n  border-top: ",";\n"]);return d=function(){return n},n}function f(){var n=(0,r.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: large;\n  color: #636363;\n  #small {\n    font-size: xx-small;\n  }\n"]);return f=function(){return n},n}function p(){var n=(0,r.Z)(["\n  gap: 20px;\n  margin-right: 20px;\n"]);return p=function(){return n},n}function h(){var n=(0,r.Z)(["\n  flex: 1;\n  margin-left: 20px;\n"]);return h=function(){return n},n}t.Z=function(n){var t=n.store,e=n.children,r=(0,l.useRouter)(),c=(0,s.I0)();return(0,o.jsxs)(m,{onClick:function(){c((0,u.J)({id:t.id,address_name:t.road_address_name?t.road_address_name:t.address_name,place_name:t.place_name,phone:t.phone,x:t.x,y:t.y,place_url:t.place_url,reviewCnt:t.reviewCnt,avgStar:t.avgStar})),r.push("/store")},children:[e,(0,o.jsx)(v,{children:t.place_name}),(0,o.jsxs)(g,{className:"row-container",children:[(0,o.jsxs)(x,{children:[(0,o.jsx)("span",{children:null==t.avgStar?(0,o.jsx)(i.G,{icon:a.LM3}):t.reviewCnt}),(0,o.jsx)("span",{id:"small",children:"리뷰"})]}),(0,o.jsxs)(x,{children:[(0,o.jsx)("span",{children:null==t.avgStar?(0,o.jsx)(i.G,{icon:a.LM3}):t.avgStar.toFixed(1)}),(0,o.jsx)("span",{id:"small",children:"평점"})]})]})]})};var m=c.ZP.div.withConfig({componentId:"sc-291e5525-0"})(d(),function(n){return"solid thin"+n.theme.color.border_grey}),x=c.ZP.div.withConfig({componentId:"sc-291e5525-1"})(f()),g=c.ZP.div.withConfig({componentId:"sc-291e5525-2"})(p()),v=c.ZP.span.withConfig({componentId:"sc-291e5525-3"})(h())},850:function(n,t,e){"use strict";e.d(t,{J:function(){return c},Z:function(){return s}});var r=e(1838),o=e(6325),i="store/SET_STORE_INFO",a={storeObj:null},c=function(n){return{type:i,storeObj:n}};function s(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1?arguments[1]:void 0;return t.type===i?(0,o.Z)((0,r.Z)({},n),{storeObj:t.storeObj}):n}},8814:function(n,t,e){"use strict";e.d(t,{bh:function(){return m},dX:function(){return x},L$:function(){return g}});var r,o,i=e(5907),a=e(1838),c=e(4762),s=e(4175),u=e(1022);function l(n){return function(n){if(Array.isArray(n))return(0,c.Z)(n)}(n)||(0,s.Z)(n)||(0,u.Z)(n)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=e(9365),f=e(8741),p=e.n(f),h=e(2040),m=(r=(0,i.Z)(function(n,t,e){var r,o;return(0,d.__generator)(this,function(i){switch(i.label){case 0:return[4,p().get("https://dapi.kakao.com/v2/local/search/keyword.json?query=".concat(e),{headers:{Authorization:"KakaoAK ".concat(h.env.REACT_APP_KAKAO_REST_KEY)},params:{page:n,category_group_code:"CE7, FD6"}}).then(function(e){r=e.data.documents.filter(function(n){return"CE7"==n.category_group_code||"간식"==n.category_name.split(" > ")[1]}),o=e.data.meta.is_end,1!=n&&(r=l(t).concat(l(r)))})];case 1:return i.sent(),[2,new Promise(function(n,t){n({isEnd:o,resultArr:r})})]}})}),function(n,t,e){return r.apply(this,arguments)}),x=function(n,t){p().post("/store/list",n.map(function(n){return{id:n.id}})).then(function(e){var r,o=n.map(function(n,t){return(0,a.Z)({},n,e.data[t])});t(o),o.forEach((r=(0,i.Z)(function(n,e){return(0,d.__generator)(this,function(r){switch(r.label){case 0:if(null!==n.avgStar)return[3,2];return[4,p().post("/storeCrawl/count",{id:n.id,url:n.place_url}).then(function(n){o[e]=(0,a.Z)({},o[e],n.data),t(l(o))})];case 1:r.sent(),r.label=2;case 2:return[2]}})}),function(n,t){return r.apply(this,arguments)}))})},g=(o=(0,i.Z)(function(n,t,e){var r,o;return(0,d.__generator)(this,function(i){switch(i.label){case 0:return[4,p().get("https://dapi.kakao.com/v2/local/search/keyword.json?query=디저트",{headers:{Authorization:"KakaoAK ".concat(h.env.REACT_APP_KAKAO_REST_KEY)},params:{y:e.y,x:e.x,category_group_code:"CE7, FD6",page:n,size:15,radius:500,sort:"distance"}}).then(function(e){r=e.data.documents.filter(function(n){return"CE7"==n.category_group_code&&"커피전문점"!=n.category_name.split(" > ")[2]||"간식"==n.category_name.split(" > ")[1]}),o=e.data.meta.is_end,1!=n&&(r=l(t).concat(l(r)))})];case 1:return i.sent(),[2,new Promise(function(n,t){n({isEnd:o,resultArr:r})})]}})}),function(n,t,e){return o.apply(this,arguments)})},4762:function(n,t,e){"use strict";function r(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=Array(t);e<t;e++)r[e]=n[e];return r}e.d(t,{Z:function(){return r}})},5907:function(n,t,e){"use strict";function r(n,t,e,r,o,i,a){try{var c=n[i](a),s=c.value}catch(n){e(n);return}c.done?t(s):Promise.resolve(s).then(r,o)}function o(n){return function(){var t=this,e=arguments;return new Promise(function(o,i){var a=n.apply(t,e);function c(n){r(a,o,i,c,s,"next",n)}function s(n){r(a,o,i,c,s,"throw",n)}c(void 0)})}}e.d(t,{Z:function(){return o}})},4175:function(n,t,e){"use strict";function r(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}e.d(t,{Z:function(){return r}})},5147:function(n,t,e){"use strict";e.d(t,{Z:function(){return i}});var r=e(4175),o=e(1022);function i(n,t){return function(n){if(Array.isArray(n))return n}(n)||(0,r.Z)(n,t)||(0,o.Z)(n,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1022:function(n,t,e){"use strict";e.d(t,{Z:function(){return o}});var r=e(4762);function o(n,t){if(n){if("string"==typeof n)return(0,r.Z)(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);if("Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return(0,r.Z)(n,t)}}}},function(n){n.O(0,[626,137,91,701,744],function(){return n(n.s=6153)}),_N_E=n.O()}]);