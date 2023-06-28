"use strict";
exports.id = 990;
exports.ids = [990];
exports.modules = {

/***/ 64990:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ storeInfoAtoms),
/* harmony export */   Z: () => (/* binding */ StoreInfoProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_apis_Stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10616);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63542);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83721);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52115);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





const storeInfoAtoms = {
    storeAtom: (0,jotai__WEBPACK_IMPORTED_MODULE_3__/* .atom */ .cn)({
        id: 0,
        name: "",
        reviews: []
    })
};
function StoreInfoProvider(props) {
    const [storeInfo, setStoreInfo] = (0,jotai__WEBPACK_IMPORTED_MODULE_4__/* .useAtom */ .KO)(storeInfoAtoms.storeAtom);
    (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__/* .useQuery */ .a)([
        "getStore"
    ], {
        queryFn: async ()=>{
            return await _lib_apis_Stores__WEBPACK_IMPORTED_MODULE_1__/* .strapiStoresApi */ .M.getStore(props.storeId);
        },
        onSuccess: (res)=>{
            setStoreInfo({
                ...res.data
            });
        },
        onError: (err)=>{
            ;
        },
        retry: false,
        enabled: props.storeId !== undefined
    });
    (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__/* .useQuery */ .a)([
        "getStoreThumbNail"
    ], {
        queryFn: async ()=>{
            return await _lib_apis_Stores__WEBPACK_IMPORTED_MODULE_1__/* .strapiStoresApi */ .M.getStoreThumbNail(props.storeId);
        },
        onSuccess: (res)=>{
            setStoreInfo({
                ...storeInfo,
                store_imgs: res.data
            });
        },
        onError: (err)=>{
            ;
        },
        retry: false,
        enabled: props.storeId !== undefined
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: props.children
    });
}


/***/ }),

/***/ 10616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ strapiStoresApi)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92981);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const getNearbyStores = async ({ curr_x, curr_y })=>{
    try {
        const { data } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${"http://localhost:1337"}/api/nearby-stores?curr_x=${curr_x}&curr_y=${curr_y}`);
        return {
            data
        };
    } catch (error) {
        ;
        return {
            attributes: undefined
        };
    }
};
const getStore = async (storeId)=>{
    try {
        const { data: { data } } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${"http://localhost:1337"}/api/stores/${storeId}`);
        return {
            data: {
                id: data.id,
                ...data.attributes
            }
        };
    } catch (error) {
        ;
        return {
            attributes: undefined
        };
    }
};
const getStoreThumbNail = async (storeId)=>{
    try {
        const { data: { data } } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${"http://localhost:1337"}/api/store-imgs?filters[store][id][$eq]=${storeId}&pagination[limit]=3&populate=*`);
        return {
            data: data.map((d)=>d.attributes.img.data.attributes)
        };
    } catch (error) {
        ;
        return {
            attributes: undefined
        };
    }
};
const strapiStoresApi = {
    getNearbyStores,
    getStore,
    getStoreThumbNail
};


/***/ })

};
;