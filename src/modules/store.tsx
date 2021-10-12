import { StoreType } from "../component/StoreList";

const SET_STORE_INFO = 'store/SET_STORE_INFO'; // 로그아웃

const initialState = {
    storeObj: null,
  };
export const setStoreInfo = (storeObj:StoreType|null) => {
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