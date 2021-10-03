
const SET_REVIEW_INFO = 'review/SET_USER_INFO'; 

type review={
    id:number,
    reviewImg: string | null,
    content: string | null,
    star: number,
    nickName: string,
    date: Date,
    StoreId:number,
}
const initialState = {
    review: {
        id:0,
        star: 0,
        nickName: 0,
        date: new Date(),
        StoreId:0,
    }
  };
export const setReviewInfo= (review:review) => {
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