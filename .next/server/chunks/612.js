"use strict";
exports.id = 612;
exports.ids = [612];
exports.modules = {

/***/ 7612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7877);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8195);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3103);






const Map = ({ loc , setLoc , curLoc , markerArr  })=>{
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const [mapCenter, setMapcenter] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        title: "",
        y: loc.y,
        x: loc.x
    });
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        map();
    }, [
        loc,
        markerArr
    ]);
    const onClickReSearch = ()=>{
        setLoc && setLoc(mapCenter);
    };
    /* 카카오 지도 생성 */ const map = ()=>{
        let container = document.getElementById("mapContainer");
        let options = {
            center: new window.kakao.maps.LatLng(loc?.y, loc?.x),
            level: 5
        };
        const map = new window.kakao.maps.Map(container, options);
        /* 내위치 마커 */ new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(curLoc?.y, curLoc?.x),
            image: new window.kakao.maps.MarkerImage("curLoc.png", new window.kakao.maps.Size(20, 20)),
            clickable: true
        });
        /* store 마커 */ markerArr.map((el)=>{
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(el.y, el.x),
                title: el.title,
                clickable: true
            });
            const contentString = `
       <div><div id="info">
       <span>${el.place_name}</span>
       <span>${el.address_name}</span>
       </div></div>
      `;
            var overlay = new window.kakao.maps.CustomOverlay({
                content: contentString,
                map: map,
                position: marker.getPosition()
            });
            overlay.setMap(null);
            /* info-window 클릭 이벤트 */ window.kakao.maps.event.addListener(marker, "click", function() {
                overlay.setMap(map);
            });
            window.kakao.maps.event.addListener(map, "click", function(mouseEvent) {
                var latlng = mouseEvent.latLng;
                if (latlng != marker.getPosition()) {
                    overlay.setMap(null);
                }
            });
        });
        /* 지도 중심 좌표 */ window.kakao.maps.event.addListener(map, "center_changed", function() {
            var center = map.getCenter();
            setMapcenter({
                title: "",
                y: center.getLat(),
                x: center.getLng()
            });
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            pathname == "/storemap" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ReSearchBtn, {
                onClick: onClickReSearch,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__/* .faRedo */ .XSV
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "현 위치 검색"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MapDiv, {
                id: "mapContainer",
                style: {
                    width: "100%",
                    height: "300px"
                }
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);
const ReSearchBtn = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"].div.withConfig */ .ZP.div.withConfig({
    componentId: "sc-ffbc2fef-0"
})`
  color: ${(props)=>props.theme.color.blue};
  display: flex;
  align-items: center;
  background-color: white;
  position: absolute;
  z-index: 9;
  font-size: small;
  padding: 5px 10px;
  border-radius: 20px;
  margin-left: 50%;
  transform: translate(-50%, 10px);
  gap: 5px;
`;
const MapDiv = styled_components__WEBPACK_IMPORTED_MODULE_5__/* ["default"].div.withConfig */ .ZP.div.withConfig({
    componentId: "sc-ffbc2fef-1"
})`
  #info {
    font-size: small;
    border: solid #dcdcdc;
    border: solid #46a6ff;
    background-color: rgb(255, 255, 255);
    padding: 5px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(40%, -130%);
    box-shadow: 2px 2px 2px 2px #46a6ff33;
  }
  #info > span:nth-child(1) {
    color: #46a6ff;
  }
`;


/***/ })

};
;