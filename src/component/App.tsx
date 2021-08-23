import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationInfo, setLoggedInfo } from '../modules/user';
import AppRouter from './Router';
type pos = {
  si: string,
  gu: string,
  dong: string,
  latitude: number,
  longitude: number,
  detail: string
}

const App=()=>{
  const loding = sessionStorage.getItem("loding") || "";
  const [isLoding, setIsLoding] = useState<boolean>(loding == "false" ? false : true);
  
  const location = useSelector((state:any)=> state.user.location)
  const isToken= window.localStorage.getItem("token")
  const token= isToken?JSON.parse(window.localStorage.getItem("token")||"").access_token:null;
  const dispatch= useDispatch();
  React.useEffect(() => {
    if (isLoding == true) {
      sessionStorage.setItem("loding", "false")
      setTimeout(() => {
        setIsLoding(false);
      }, 3000)
    }
    if(token){
      axios.defaults.headers.common["Authorization"] = `${token}`;
      sendJwtTokenToServer();
    }
    //gps
    navigator.geolocation.getCurrentPosition((position) => {
      axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
        headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
        params: {
          y: position.coords.latitude,
          x: position.coords.longitude
        }
      }).then(res => {
        dispatch(setLocationInfo({
          si: res.data.documents[0].address.region_1depth_name,
          y: position.coords.latitude,
          x: position.coords.longitude,
        }))
      }
      )
    });
  }, [])
  //자동로그인
  const sendJwtTokenToServer = () => {
    axios.post('/auth/kakao')
      .then(res => {
        
        if ( res.status == 200) {
          const user=res.data.user;
          dispatch(setLoggedInfo(user, true));
        }
        else {
          window.alert("로그인에 실패하였습니다.");
          dispatch(setLoggedInfo(null, false));
          window.localStorage.removeItem("token");
        }
      })
  }
  return (
    <AppRouter  isLoding={isLoding} />
  );
}

export default App;
