"use strict";
(() => {
var exports = {};
exports.id = 932;
exports.ids = [932];
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

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 63201:
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

// NAMESPACE OBJECT: ./src/app/api/auth/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(35387);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(29267);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./src/app/api/auth/utils/util.ts
var util = __webpack_require__(67063);
;// CONCATENATED MODULE: ./src/app/api/auth/route.ts

async function GET(req) {
    try {
        if (!req.headers.get("authorization")) return new Response("token 없음.", {
            status: 401
        });
        const jwtUser = util/* jwtUtil */.I.getJWTUser(req.headers.get("authorization"));
        const userInfo = {
            email: jwtUser.email,
            userName: jwtUser.userName,
            id: -1
        };
        // const { attributes } = await strapiAuthUsersApi.getUser(userInfo.email);
        const attributes = {
            id: 8
        };
        userInfo.id = attributes.id;
        if (!attributes) return new Response("user 없음.", {
            status: 404
        });
        return new Response(JSON.stringify({
            success: true,
            jwt: util/* jwtUtil */.I.getJWTToken(userInfo),
            user: {
                ...userInfo
            }
        }), {
            status: 200
        });
    } catch (err) {
        return new Response("test", {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fauth%2Froute&name=app%2Fapi%2Fauth%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2Froute.ts&appDir=%2FUsers%2Fjihyeon%2FDocuments%2Fproject%2FBBangSoon%2Fsrc%2Fapp&appPaths=%2Fapi%2Fauth%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/auth/route","pathname":"/api/auth","filename":"route","bundlePath":"app/api/auth/route"},"resolvedPagePath":"/Users/jihyeon/Documents/project/BBangSoon/src/app/api/auth/route.ts","nextConfigOutput":"standalone"}
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

    const originalPathname = "/api/auth/route"

    

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [683,850], () => (__webpack_exec__(63201)));
module.exports = __webpack_exports__;

})();