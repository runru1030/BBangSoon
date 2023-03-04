"use strict";
exports.id = 598;
exports.ids = [598];
exports.modules = {

/***/ 9598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L$": () => (/* binding */ getStoreMap),
/* harmony export */   "bh": () => (/* binding */ getStore),
/* harmony export */   "dX": () => (/* binding */ getStoreList)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2981);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const getStore = async (page, storeArr, search)=>{
    let arr;
    let isEnd;
    ;
    await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`, {
        headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`
        },
        params: {
            page: page,
            category_group_code: "CE7, FD6"
        }
    }).then((res)=>{
        arr = res.data.documents.filter((it)=>it.category_group_code == "CE7" || it.category_name.split(" > ")[1] == "간식");
        isEnd = res.data.meta.is_end;
        if (page != 1) {
            arr = [
                ...storeArr,
                ...arr
            ];
        }
    });
    return new Promise((resolve, reject)=>{
        resolve({
            isEnd: isEnd,
            resultArr: arr
        });
    });
};
const getStoreList = (storeArr, setArr)=>{
    axios__WEBPACK_IMPORTED_MODULE_0___default().post("/store/list", storeArr.map((store)=>({
            id: store.id
        }))).then((res)=>{
        const resArr = storeArr.map((store, idx)=>({
                ...store,
                ...res.data[idx]
            }));
        setArr(resArr);
        resArr.forEach(async (element, i)=>{
            if (element.avgStar === null) {
                await axios__WEBPACK_IMPORTED_MODULE_0___default().post("/storeCrawl/count", {
                    id: element.id,
                    url: element.place_url
                }).then((res)=>{
                    resArr[i] = {
                        ...resArr[i],
                        ...res.data
                    };
                    setArr([
                        ...resArr
                    ]);
                });
            }
        });
    });
};
const getStoreMap = async (page, markerArr, loc)=>{
    let arr;
    let isEnd;
    await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=디저트`, {
        headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`
        },
        params: {
            y: loc.y,
            x: loc.x,
            category_group_code: "CE7, FD6",
            page: page,
            size: 15,
            radius: 500,
            sort: "distance"
        }
    }).then((res)=>{
        arr = res.data.documents.filter((it)=>it.category_group_code == "CE7" && it.category_name.split(" > ")[2] != "커피전문점" || it.category_name.split(" > ")[1] == "간식");
        isEnd = res.data.meta.is_end;
        if (page != 1) {
            arr = [
                ...markerArr,
                ...arr
            ];
        }
    });
    return new Promise((resolve, reject)=>{
        resolve({
            isEnd: isEnd,
            resultArr: arr
        });
    });
};


/***/ })

};
;