
const SET_STORE_INFO = 'store/SET_STORE_INFO'; // 로그아웃

type storeObj={
    id:number,
    address:string|null,
    storeName:string|null,
    telephone:string|null,
    x:number|null,
    y:number|null,
    place_url:string|null,
    reviewCnt:number|null,
    avgStar:number|null,
}
const initialState = {
    storeObj: null,
  };
export const setStoreInfo = (storeObj:storeObj|null) => {
    return {
        type: SET_STORE_INFO,
        storeObj
    };
};
export default  function store(state = initialState, action:any) {
    switch (action.type) {
        case SET_STORE_INFO:
            return {...state,
                storeObj: action.storeObj
                };
        default:
            return state;
    }
};