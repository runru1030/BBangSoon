import { reviewType } from "../routes/Feed";

const SET_REVIEW_INFO = 'review/SET_USER_INFO'; 

const initialState = {
    review: {
        id:0,
        star: 0,
        nickName: 0,
        date: new Date(),
        StoreId:0,
    }
  };
export const setReviewInfo= (review:reviewType) => {
    return {
        type: SET_REVIEW_INFO,
        review
    };
};
export default  function review(state = initialState, action:any) {
    switch (action.type) {
        case SET_REVIEW_INFO:
            return { ...state,review: action.review  };
        default:
            return state;
    }
};