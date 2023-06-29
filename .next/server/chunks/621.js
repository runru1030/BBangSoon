"use strict";
exports.id = 621;
exports.ids = [621];
exports.modules = {

/***/ 92621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_store_storeId_StoreInfoProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64990);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3103);






const StoreItem = ({ store, children })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const setStoreInfo = (0,jotai__WEBPACK_IMPORTED_MODULE_4__/* .useSetAtom */ .b9)(_app_store_storeId_StoreInfoProvider__WEBPACK_IMPORTED_MODULE_1__/* .storeInfoAtoms */ .H.storeAtom);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Store, {
        onClick: ()=>{
            setStoreInfo(store);
            router.push(`/store/${store.id}`);
        },
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StoreName, {
                children: store.name
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Wrapper, {
                className: "row-container"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreItem);
const Store = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.div.withConfig({
    componentId: "sc-c2320ed8-0"
})`
  width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  height: 30px;
  border-top: ${(props)=>`solid thin` + props.theme.color.border_grey};
`;
const Block = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.div.withConfig({
    componentId: "sc-c2320ed8-1"
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: #636363;
`;
const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.div.withConfig({
    componentId: "sc-c2320ed8-2"
})`
  gap: 20px;
  margin-right: 20px;
`;
const StoreName = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.span.withConfig({
    componentId: "sc-c2320ed8-3"
})`
  flex: 1;
  margin-left: 20px;
`;


/***/ })

};
;