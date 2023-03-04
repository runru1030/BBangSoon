const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const SET_LOCATION_INFO = 'user/SET_LOCATION_INFO'; //위치 정보 설정
const SET_USER_INFO = 'user/SET_USER_INFO'; 

interface userObj{
    userId:number,
    nickName:string,
}
interface location{
    si: string,
    y: number,
    x: number,
  }
const initialState = {
    userObj: {
        id: 0,
        nickName: "",
      },
    location:{
        si: "서울",
        y: 37.556428224476505,
        x: 126.97150576481177
      },
    isLoggedin: false,
  };
export const setLoggedInfo = (userObj:userObj|null, isLoggedin:boolean) => {
    return {
        type: SET_LOGGED_INFO,
        userObj,
        isLoggedin
    };
};

export const setUserInfo= (userObj:userObj) => {
    return {
        type: SET_USER_INFO,
        userObj
    };
};
export const setLocationInfo= (location:location) => {
    return {
        type: SET_LOCATION_INFO,
        location
    };
};
export default  function user(state = initialState, action:any) {
    switch (action.type) {
        case SET_LOGGED_INFO:
            return {...state,
                userObj: action.userObj,
                isLoggedin: action.isLoggedin
                };
        case SET_USER_INFO:
            return { ...state,userObj: action.userObj  };
        case SET_LOCATION_INFO:
            return { ...state,location: action.location  };
        default:
            return state;
    }
};