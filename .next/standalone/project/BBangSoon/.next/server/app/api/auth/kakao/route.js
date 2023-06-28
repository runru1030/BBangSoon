"use strict";
(() => {
var exports = {};
exports.id = 590;
exports.ids = [590];
exports.modules = {

/***/ 46517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 97783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 28530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 54426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 40252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 41808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 85477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 24404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 33491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/auth/kakao/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  PUT: () => (PUT)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(35387);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(29267);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(53614);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
;// CONCATENATED MODULE: ./src/lib/apis/AuthUsersApis.ts

const getUser = async (email)=>{
    try {
        const { data: { data } } = await axios_default().get(`${"http://localhost:1337"}/api/auth-users?filters[email][$eq]=${email}`);
        return {
            attributes: {
                id: data[0].id,
                ...data[0].attributes
            }
        };
    } catch (error) {
        ;
        return {
            attributes: undefined
        };
    }
};
const createUser = async ({ userInfo, kakaoToken })=>{
    try {
        const { data: { data } } = await axios_default().post("${process.env.NEXT_PUBLIC_DOMAIN}/api/auth-users", {
            data: {
                ...userInfo,
                kakaoToken
            }
        });
        return {
            attributes: data.attributes
        };
    } catch (error) {
        ;
        return {
            attributes: undefined
        };
    }
};
const strapiAuthUsersApi = {
    getUser,
    createUser
};

// EXTERNAL MODULE: ./node_modules/request/index.js
var request = __webpack_require__(14005);
var request_default = /*#__PURE__*/__webpack_require__.n(request);
;// CONCATENATED MODULE: ./src/app/api/auth/utils/KakaoAuth.ts

/* harmony default export */ const KakaoAuth = ({
    getProfile (accessToken) {
        return new Promise((resolve, reject)=>{
            request_default()({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                url: "https://kapi.kakao.com/v2/user/me",
                method: "GET"
            }, (error, response, body)=>{
                if (!error && response.statusCode === 200) {
                    resolve(body);
                }
                reject(error);
            });
        });
    }
});

// EXTERNAL MODULE: ./src/app/api/auth/utils/util.ts
var util = __webpack_require__(67063);
;// CONCATENATED MODULE: ./src/app/api/auth/kakao/route.ts



async function PUT(req) {
    try {
        const { access_token } = await req.json();
        if (!access_token) return new Response("token 없음.", {
            status: 401
        });
        const result = await KakaoAuth.getProfile(access_token);
        const kakaoUser = JSON.parse(result).kakao_account;
        const userInfo = {
            email: kakaoUser.email,
            userName: kakaoUser.profile.nickname,
            id: -1
        };
        // const { attributes } = await strapiAuthUsersApi.getUser(userInfo.email);
        const attributes = {
            id: 8
        };
        userInfo.id = attributes.id;
        if (!attributes) {
            const { attributes: created_attributes } = await strapiAuthUsersApi.createUser({
                userInfo,
                kakaoToken: access_token
            });
            userInfo.id = created_attributes.id;
        }
        return new Response(JSON.stringify({
            success: true,
            jwt: util/* jwtUtil */.I.getJWTToken(userInfo),
            user: {
                ...userInfo
            }
        }), {
            status: !attributes ? 201 : 200
        });
    } catch (err) {
        return new Response("test", {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fauth%2Fkakao%2Froute&name=app%2Fapi%2Fauth%2Fkakao%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fkakao%2Froute.ts&appDir=%2FUsers%2Fjihyeon%2FDocuments%2Fproject%2FBBangSoon%2Fsrc%2Fapp&appPaths=%2Fapi%2Fauth%2Fkakao%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/auth/kakao/route","pathname":"/api/auth/kakao","filename":"route","bundlePath":"app/api/auth/kakao/route"},"resolvedPagePath":"/Users/jihyeon/Documents/project/BBangSoon/src/app/api/auth/kakao/route.ts","nextConfigOutput":"standalone"}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/auth/kakao/route"

    

/***/ }),

/***/ 67063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ jwtUtil)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39518);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const getJWTToken = (userInfo)=>{
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({
        ...userInfo
    }, process.env.NEXT_SERVER_JWT_SECRET || "", {
        issuer: "bbangsoon"
    });
};
const getJWTUser = (jwtToken)=>{
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(jwtToken, process.env.NEXT_SERVER_JWT_SECRET || "", {
        ignoreExpiration: true
    });
};
const jwtUtil = {
    getJWTToken,
    getJWTUser
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [683,850,81], () => (__webpack_exec__(33491)));
module.exports = __webpack_exports__;

})();