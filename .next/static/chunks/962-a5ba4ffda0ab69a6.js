"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[962],{5962:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(7986),i=n(6429),o=n(4978),a=n(8344),u=n(3435);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return w}});var l=n(6927),d=n(5909)._(n(6006)),c=l._(n(2930)),s=n(2325),f=n(6374),p=n(168);n(7653);var g=l._(n(5840)),m={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function h(e){return void 0!==e.default}function v(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function y(e,t,n,o,a,u,l){e&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch(function(){}).then(function(){if(e.parentElement&&e.isConnected){if("blur"===n&&u(!0),null==o?void 0:o.current){var t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});var l=!1,d=!1;o.current(i._(r._({},t),{nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:function(){return l},isPropagationStopped:function(){return d},persist:function(){},preventDefault:function(){l=!0,t.preventDefault()},stopPropagation:function(){d=!0,t.stopPropagation()}}))}(null==a?void 0:a.current)&&a.current(e)}}))}function b(e){var t=a._(d.version.split("."),2),n=t[0],r=t[1],i=parseInt(n,10),o=parseInt(r,10);return i>18||18===i&&o>=3?{fetchPriority:e}:{fetchpriority:e}}var _=(0,d.forwardRef)(function(e,t){var n=e.imgAttributes,a=e.heightInt,u=e.widthInt,l=(e.qualityInt,e.className),c=e.imgStyle,s=e.blurStyle,f=e.isLazy,p=e.fetchPriority,g=e.fill,m=e.placeholder,h=e.loading,v=e.srcString,_=(e.config,e.unoptimized),w=(e.loader,e.onLoadRef),S=e.onLoadingCompleteRef,j=e.setBlurComplete,C=e.setShowAltText,P=(e.onLoad,e.onError),z=o._(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fetchPriority","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadRef","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return h=f?"lazy":h,d.default.createElement("img",i._(r._(i._(r._({},z,b(p)),{loading:h,width:u,height:a,decoding:"async","data-nimg":g?"fill":"1",className:l,style:r._({},c,s)}),n),{ref:(0,d.useCallback)(function(e){t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(P&&(e.src=e.src),e.complete&&y(e,v,m,w,S,j,_))},[v,m,w,S,j,P,_,t]),onLoad:function(e){y(e.currentTarget,v,m,w,S,j,_)},onError:function(e){C(!0),"blur"===m&&j(!0),P&&P(e)}}))}),w=(0,d.forwardRef)(function(e,t){var n,l,y,w=e.src,S=e.sizes,j=e.unoptimized,C=void 0!==j&&j,P=e.priority,z=void 0!==P&&P,E=e.loading,x=e.className,O=e.quality,I=e.width,M=e.height,k=e.fill,A=e.style,R=e.onLoad,L=e.onLoadingComplete,D=e.placeholder,N=void 0===D?"empty":D,U=e.blurDataURL,F=e.fetchPriority,q=e.layout,T=e.objectFit,B=e.objectPosition,W=(e.lazyBoundary,e.lazyRoot,o._(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoad","onLoadingComplete","placeholder","blurDataURL","fetchPriority","layout","objectFit","objectPosition","lazyBoundary","lazyRoot"])),H=(0,d.useContext)(p.ImageConfigContext),G=(0,d.useMemo)(function(){var e=m||H||f.imageConfigDefault,t=u._(e.deviceSizes).concat(u._(e.imageSizes)).sort(function(e,t){return e-t}),n=e.deviceSizes.sort(function(e,t){return e-t});return i._(r._({},e),{allSizes:t,deviceSizes:n})},[H]),V=W.loader||g.default;delete W.loader;var $="__next_img_default"in V;if($){if("custom"===G.loader)throw Error('Image with src "'+w+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{var J=V;V=function(e){return e.config,J(o._(e,["config"]))}}if(q){"fill"===q&&(k=!0);var Y={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[q];Y&&(A=r._({},A,Y));var Q={responsive:"100vw",fill:"100vw"}[q];Q&&!S&&(S=Q)}var K="",X=v(I),Z=v(M);if("object"==typeof(n=w)&&(h(n)||void 0!==n.src)){var ee=h(w)?w.default:w;if(!ee.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(ee));if(!ee.height||!ee.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(ee));if(l=ee.blurWidth,y=ee.blurHeight,U=U||ee.blurDataURL,K=ee.src,!k){if(X||Z){if(X&&!Z){var et=X/ee.width;Z=Math.round(ee.height*et)}else if(!X&&Z){var en=Z/ee.height;X=Math.round(ee.width*en)}}else X=ee.width,Z=ee.height}}var er=!z&&("lazy"===E||void 0===E);(!(w="string"==typeof w?w:K)||w.startsWith("data:")||w.startsWith("blob:"))&&(C=!0,er=!1),G.unoptimized&&(C=!0),$&&w.endsWith(".svg")&&!G.dangerouslyAllowSVG&&(C=!0),z&&(F="high");var ei=a._((0,d.useState)(!1),2),eo=ei[0],ea=ei[1],eu=a._((0,d.useState)(!1),2),el=eu[0],ed=eu[1],ec=v(O),es=Object.assign(k?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:T,objectPosition:B}:{},el?{}:{color:"transparent"},A),ef="blur"===N&&U&&!eo?{backgroundSize:es.objectFit||"cover",backgroundPosition:es.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'+(0,s.getImageBlurSvg)({widthInt:X,heightInt:Z,blurWidth:l,blurHeight:y,blurDataURL:U,objectFit:es.objectFit})+'")'}:{},ep=function(e){var t=e.config,n=e.src,r=e.unoptimized,i=e.width,o=e.quality,a=e.sizes,l=e.loader;if(r)return{src:n,srcSet:void 0,sizes:void 0};var d=function(e,t,n){var r=e.deviceSizes,i=e.allSizes;if(n){for(var o=/(^|\s)(1?\d?\d)vw/g,a=[];l=o.exec(n);l)a.push(parseInt(l[2]));if(a.length){var l,d,c=.01*(d=Math).min.apply(d,u._(a));return{widths:i.filter(function(e){return e>=r[0]*c}),kind:"w"}}return{widths:i,kind:"w"}}return"number"!=typeof t?{widths:r,kind:"w"}:{widths:u._(new Set([t,2*t].map(function(e){return i.find(function(t){return t>=e})||i[i.length-1]}))),kind:"x"}}(t,i,a),c=d.widths,s=d.kind,f=c.length-1;return{sizes:a||"w"!==s?a:"100vw",srcSet:c.map(function(e,r){return l({config:t,src:n,quality:o,width:e})+" "+("w"===s?e:r+1)+s}).join(", "),src:l({config:t,src:n,quality:o,width:c[f]})}}({config:G,src:w,unoptimized:C,width:X,quality:ec,sizes:S,loader:V}),eg=w,em=(0,d.useRef)(R);(0,d.useEffect)(function(){em.current=R},[R]);var eh=(0,d.useRef)(L);(0,d.useEffect)(function(){eh.current=L},[L]);var ev=r._({isLazy:er,imgAttributes:ep,heightInt:Z,widthInt:X,qualityInt:ec,className:x,imgStyle:es,blurStyle:ef,loading:E,config:G,fetchPriority:F,fill:k,unoptimized:C,placeholder:N,loader:V,srcString:eg,onLoadRef:em,onLoadingCompleteRef:eh,setBlurComplete:ea,setShowAltText:ed},W);return d.default.createElement(d.default.Fragment,null,d.default.createElement(_,i._(r._({},ev),{ref:t})),z?d.default.createElement(c.default,null,d.default.createElement("link",r._({key:"__nimg-"+ep.src+ep.srcSet+ep.sizes,rel:"preload",as:"image",href:ep.srcSet?void 0:ep.src,imageSrcSet:ep.srcSet,imageSizes:ep.sizes,crossOrigin:W.crossOrigin,referrerPolicy:W.referrerPolicy},b(F)))):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4626:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return r}});var r=n(6927)._(n(6006)).default.createContext({})},7290:function(e,t){function n(e){var t=void 0===e?{}:e,n=t.ampFirst,r=t.hybrid,i=t.hasQuery;return void 0!==n&&n||void 0!==r&&r&&void 0!==i&&i}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return n}})},2930:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(7986);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{defaultHead:function(){return c},default:function(){return g}});var i=n(6927),o=n(5909)._(n(6006)),a=i._(n(9488)),u=n(4626),l=n(6436),d=n(7290);function c(e){void 0===e&&(e=!1);var t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(7653);var f=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,i,a,u,l=t.inAmpMode;return e.reduce(s,[]).reverse().concat(c(l).reverse()).filter((n=new Set,i=new Set,a=new Set,u={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var l=0,d=f.length;l<d;l++){var c=f[l];if(e.props.hasOwnProperty(c)){if("charSet"===c)a.has(c)?t=!1:a.add(c);else{var s=e.props[c],p=u[c]||new Set;("name"!==c||!r)&&p.has(s)?t=!1:(p.add(s),u[c]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!l&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r._({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,o.default.cloneElement(e,i)}return o.default.cloneElement(e,{key:n})})}var g=function(e){var t=e.children,n=(0,o.useContext)(u.AmpStateContext),r=(0,o.useContext)(l.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:p,headManager:r,inAmpMode:(0,d.isInAmpMode)(n)},t)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2325:function(e,t){function n(e){var t=e.widthInt,n=e.heightInt,r=e.blurWidth,i=e.blurHeight,o=e.blurDataURL,a=e.objectFit,u=r||t,l=i||n,d=o.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return u&&l?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 "+u+" "+l+"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='"+(r&&i?"1":"20")+"'/%3E"+d+"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='"+o+"'/%3E%3C/svg%3E":"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='"+("contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' x='0' y='0' height='100%25' width='100%25' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return n}})},168:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImageConfigContext",{enumerable:!0,get:function(){return o}});var r=n(6927)._(n(6006)),i=n(6374),o=r.default.createContext(i.imageConfigDefault)},6374:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{VALID_LOADERS:function(){return n},imageConfigDefault:function(){return r}});var n=["default","imgix","cloudinary","akamai","custom"],r={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"inline",remotePatterns:[],unoptimized:!1}},5840:function(e,t){function n(e){var t=e.config,n=e.src,r=e.width,i=e.quality;return t.path+"?url="+encodeURIComponent(n)+"&w="+r+"&q="+(i||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),n.__next_img_default=!0;var r=n},9488:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});var r=n(5909)._(n(6006)),i=r.useLayoutEffect,o=r.useEffect;function a(e){var t=function(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(a(t,e))}},n=e.headManager,a=e.reduceComponentsToState;return i(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),i(function(){return n&&(n._pendingUpdate=t),function(){n&&(n._pendingUpdate=t)}}),o(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null}},7653:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return n}});var n=function(e){}}}]);