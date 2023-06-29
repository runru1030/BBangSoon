exports.id = 105;
exports.ids = [105];
exports.modules = {

/***/ 60202:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 90125, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 86249, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 97844, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 61522, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 13100, 23))

/***/ }),

/***/ 44754:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7649, 23))

/***/ }),

/***/ 84588:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 84594));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9315));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 46443))

/***/ }),

/***/ 84594:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ GlobalProvider),
  userInfoAtoms: () => (/* binding */ userInfoAtoms)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/@tanstack/react-query/build/lib/useQuery.mjs + 6 modules
var useQuery = __webpack_require__(63542);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(92981);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
// EXTERNAL MODULE: ./node_modules/jotai/esm/react.mjs
var react = __webpack_require__(52115);
// EXTERNAL MODULE: ./node_modules/jotai/esm/react/utils.mjs
var utils = __webpack_require__(12620);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./src/components/hooks/useAuth.ts






const useAuth = ()=>{
    const [jwtToken, setJwtToken] = (0,react_.useState)(null);
    const setUserAtom = (0,react/* useSetAtom */.b9)(userInfoAtoms.userAtom);
    const user = (0,react/* useAtomValue */.Dv)(userInfoAtoms.userAtom);
    const resetUserAtom = (0,utils/* useResetAtom */.oC)(userInfoAtoms.userAtom);
    (0,useQuery/* useQuery */.a)([
        "getAuth"
    ], {
        queryFn: async ()=>{
            return await axios_default().get("/api/auth", {
                headers: {
                    Authorization: `${jwtToken}`
                }
            });
        },
        onSuccess: (res)=>{
            setUserAtom(res.data.user);
        },
        onError: (err)=>{
            ;
            resetUserAtom();
            window.localStorage.removeItem("token");
        },
        enabled: !!jwtToken,
        retry: false
    });
    (0,react_.useEffect)(()=>{
        const token = JSON.parse(window?.localStorage.getItem("token") || "null")?.access_token;
        if (token) {
            setJwtToken(token);
            (axios_default()).defaults.headers.common["Authorization"] = `${token}`;
        }
    }, []);
    return;
};
/* harmony default export */ const hooks_useAuth = (useAuth);

;// CONCATENATED MODULE: ./src/components/hooks/useGeoLocation.ts





const useGeoLocation = ()=>{
    const setLocationAtom = (0,react/* useSetAtom */.b9)(userInfoAtoms.locationAtom);
    const [position, setPosition] = (0,react_.useState)(undefined);
    (0,useQuery/* useQuery */.a)([
        "getLocation"
    ], {
        queryFn: async ()=>await axios_default().get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
                headers: {
                    Authorization: `KakaoAK ${"c752b603e559baec62bada612899f613"}`
                },
                params: {
                    y: position?.coords.latitude,
                    x: position?.coords.longitude
                }
            }),
        onSuccess: ({ data })=>{
            setLocationAtom({
                si: data.documents[0].address.region_1depth_name,
                y: position?.coords.latitude || 0,
                x: position?.coords.longitude || 0
            });
        },
        onError: (error)=>{
            ;
        },
        enabled: position !== undefined
    });
    (0,react_.useEffect)(()=>{
        navigator.geolocation.getCurrentPosition(setPosition);
    }, []);
    return;
};
/* harmony default export */ const hooks_useGeoLocation = (useGeoLocation);

// EXTERNAL MODULE: ./node_modules/jotai/esm/vanilla.mjs
var vanilla = __webpack_require__(83721);
// EXTERNAL MODULE: ./node_modules/jotai/esm/vanilla/utils.mjs
var vanilla_utils = __webpack_require__(87602);
;// CONCATENATED MODULE: ./src/app/GlobalProvider.tsx
/* __next_internal_client_entry_do_not_use__ userInfoAtoms,default auto */ 





const userInfoAtoms = {
    userAtom: (0,vanilla_utils/* atomWithReset */.rw)({
        id: 0,
        email: null,
        userName: ""
    }),
    locationAtom: (0,vanilla/* atom */.cn)({
        si: "서울",
        y: 37.556428224476505,
        x: 126.97150576481177
    })
};
function GlobalProvider(props) {
    hooks_useAuth();
    hooks_useGeoLocation();
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: props.children
    });
}


/***/ }),

/***/ 9315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReactQueryProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88591);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98417);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


// DEVELOPMENT모드일때 networkMode: always
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__/* .QueryClient */ .S({
    defaultOptions: {
        queries: {
            networkMode:  false ? 0 : "online"
        }
    }
});
function ReactQueryProvider({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__/* .QueryClientProvider */ .aH, {
        client: queryClient,
        children: children
    });
}


/***/ }),

/***/ 46443:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootStyleRegistry)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./src/styles/theme.tsx
const theme = {
    color: {
        blue: "#46A6FF",
        red: "#FF764A",
        border_grey: "#eeeeee"
    }
};


// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.cjs.js
var styled_components_cjs = __webpack_require__(3103);
;// CONCATENATED MODULE: ./src/app/RootStyleRegistry.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




function RootStyleRegistry({ children }) {
    const [styledComponentsStyleSheet] = (0,react_.useState)(()=>new styled_components_cjs/* ServerStyleSheet */.qH());
    (0,navigation.useServerInsertedHTML)(()=>{
        const styles = styledComponentsStyleSheet.getStyleElement();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styledComponentsStyleSheet.instance?.clearTag();
        return styles;
    });
    if (false) {}
    return /*#__PURE__*/ jsx_runtime_.jsx(styled_components_cjs/* StyleSheetManager */.LC, {
        sheet: styledComponentsStyleSheet.instance,
        children: /*#__PURE__*/ jsx_runtime_.jsx(styled_components_cjs/* ThemeProvider */.f6, {
            theme: theme,
            children: children
        })
    });
}


/***/ }),

/***/ 69666:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17877);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78195);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14889);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55089);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31621);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3103);









const Nav = ()=>{
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.usePathname)();
    const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(true);
    const beforeScrollY = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        window.addEventListener("touchmove", handleScroll);
        return ()=>{
            window.removeEventListener("touchmove", handleScroll);
        };
    }, []);
    const handleScroll = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_3__.throttle)((e)=>{
            const currentScrollY = e.touches[0].screenY;
            if (beforeScrollY.current > currentScrollY) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            beforeScrollY.current = currentScrollY;
        }, 250), [
        beforeScrollY
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(BottomNav, {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()(visible ? "visible" : "invisible"),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledLink, {
                href: "/home",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__/* .faBreadSlice */ .MV6,
                        id: "icon",
                        color: pathname == "/" ? "#e2c26e" : "#6f6f6f"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "홈"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledLink, {
                href: "/map",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                        id: "icon",
                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__/* .faMapMarkerAlt */ .FGq,
                        color: pathname == "/storemap" ? "#46A6FF" : "#6f6f6f"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "빵 지도"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledLink, {
                href: "/wish",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                        id: "icon",
                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__/* .faHeart */ .m6i,
                        color: pathname == "/wish" ? "#f89573" : "#6f6f6f"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "관심"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledLink, {
                href: "/feed",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                        id: "icon",
                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__/* .faBook */ .FL8,
                        color: pathname == "/feed" ? "#46A6FF" : "#6f6f6f"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "일지"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nav);
const StyledLink = (0,styled_components__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP)((next_link__WEBPACK_IMPORTED_MODULE_4___default())).withConfig({
    componentId: "sc-dd9f45bc-0"
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  #icon {
    font-size: large;
    margin-bottom: 5px;
  }
  span {
    font-size: xx-small;
    margin-top: 5px;
  }
`;
const BottomNav = styled_components__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP.div.withConfig({
    componentId: "sc-dd9f45bc-1"
})`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 20%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-top: ${(props)=>`solid thin` + props.theme.color.border_grey};
  background-color: white;
  z-index: 100;
`;


/***/ }),

/***/ 83659:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(7887);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(98360);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(21313);
;// CONCATENATED MODULE: ./src/app/GlobalProvider.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/jihyeon/Documents/project/BBangSoon/src/app/GlobalProvider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["userInfoAtoms"];


/* harmony default export */ const GlobalProvider = (__default__);
;// CONCATENATED MODULE: ./src/app/ReactQueryProvider.tsx

const ReactQueryProvider_proxy = (0,module_proxy.createProxy)(String.raw`/Users/jihyeon/Documents/project/BBangSoon/src/app/ReactQueryProvider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: ReactQueryProvider_esModule, $$typeof: ReactQueryProvider_$$typeof } = ReactQueryProvider_proxy;
const ReactQueryProvider_default_ = ReactQueryProvider_proxy.default;


/* harmony default export */ const ReactQueryProvider = (ReactQueryProvider_default_);
;// CONCATENATED MODULE: ./src/app/RootStyleRegistry.tsx

const RootStyleRegistry_proxy = (0,module_proxy.createProxy)(String.raw`/Users/jihyeon/Documents/project/BBangSoon/src/app/RootStyleRegistry.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: RootStyleRegistry_esModule, $$typeof: RootStyleRegistry_$$typeof } = RootStyleRegistry_proxy;
const RootStyleRegistry_default_ = RootStyleRegistry_proxy.default;


/* harmony default export */ const RootStyleRegistry = (RootStyleRegistry_default_);
;// CONCATENATED MODULE: ./src/app/layout.tsx






async function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "ko",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("head", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "shortcut icon",
                        href: "/favicon.png"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        src: "https://developers.kakao.com/sdk/js/kakao.js"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        type: "text/javascript",
                        src: `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${"5eb17c9c458e2a30689b7c0628a5f056"}`
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "BBangSoon"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(ReactQueryProvider, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(RootStyleRegistry, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(GlobalProvider, {
                            children: children
                        })
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 73292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Loading)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(10993);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/LoadingScreen.tsx


const LoadingScreen = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-full h-screen flex flex-col items-center mt-[150px]",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "font-light mb-20 text-lg",
                children: "빵순이를 위한 빵지순례 도우미 웹앱"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: "/assets/logo.png",
                width: "60",
                height: "60",
                alt: "logo"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "font-light absolute bottom-[50px] text-sm",
                children: "\xa9 2021 . keeper . all right reserved"
            })
        ]
    });
};
/* harmony default export */ const components_LoadingScreen = (LoadingScreen);

;// CONCATENATED MODULE: ./src/app/loading.tsx


function Loading() {
    return /*#__PURE__*/ jsx_runtime_.jsx(components_LoadingScreen, {});
}


/***/ }),

/***/ 98360:
/***/ (() => {



/***/ })

};
;