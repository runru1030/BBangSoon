"use strict";
exports.id = 481;
exports.ids = [481];
exports.modules = {

/***/ 2481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8195);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7877);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3103);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1894);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_5__);








const StoreList = ({ store , children  })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const onClick = ()=>{
        dispatch((0,_store_store__WEBPACK_IMPORTED_MODULE_4__/* .setStoreInfo */ .J)({
            id: store.id,
            address_name: store.road_address_name ? store.road_address_name : store.address_name,
            place_name: store.place_name,
            phone: store.phone,
            x: store.x,
            y: store.y,
            place_url: store.place_url,
            reviewCnt: store.reviewCnt,
            avgStar: store.avgStar
        }));
        router.push("/store");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Store, {
        onClick: onClick,
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StoreName, {
                children: store.place_name
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Wrapper, {
                className: "row-container",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Block, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: store.avgStar == null ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__/* .faSpinner */ .LM3
                                }) : store.reviewCnt
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                id: "small",
                                children: "리뷰"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Block, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: store.avgStar == null ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__/* .faSpinner */ .LM3
                                }) : store.avgStar.toFixed(1)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                id: "small",
                                children: "평점"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreList);
const Store = styled_components__WEBPACK_IMPORTED_MODULE_7__/* ["default"].div.withConfig */ .ZP.div.withConfig({
    componentId: "sc-291e5525-0"
})`
  width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  height: 30px;
  border-top: ${(props)=>`solid thin` + props.theme.color.border_grey};
`;
const Block = styled_components__WEBPACK_IMPORTED_MODULE_7__/* ["default"].div.withConfig */ .ZP.div.withConfig({
    componentId: "sc-291e5525-1"
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: #636363;
  #small {
    font-size: xx-small;
  }
`;
const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_7__/* ["default"].div.withConfig */ .ZP.div.withConfig({
    componentId: "sc-291e5525-2"
})`
  gap: 20px;
  margin-right: 20px;
`;
const StoreName = styled_components__WEBPACK_IMPORTED_MODULE_7__/* ["default"].span.withConfig */ .ZP.span.withConfig({
    componentId: "sc-291e5525-3"
})`
  flex: 1;
  margin-left: 20px;
`;


/***/ })

};
;