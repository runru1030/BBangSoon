import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocationInfo, setLoggedInfo } from '../modules/user';
import AppRouter from './Router';
//위치 GPS, loding 화면
const App: React.FC = () => {
  const dispatch = useDispatch();

  const loding = sessionStorage.getItem("loding") || "";
  const [isLoding, setIsLoding] = useState(loding == "false" ? false : true);

  const token = JSON.parse(window.localStorage.getItem("token") || "null")?.access_token;
  useEffect(() => {
    /* Loding view */
    if (isLoding == true) {
      sessionStorage.setItem("loding", "false")
      setTimeout(() => {
        setIsLoding(false);
      }, 3000)
    }
    /* 자동 로그인 */
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      sendJwtTokenToServer();
    }
    /* GPS */
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

  /* 자동 로그인 */
  const sendJwtTokenToServer = () => {
    axios.post('/auth/kakao')
      .then(res => {
        if (res.status == 200) {
          const user = res.data.user;
          dispatch(setLoggedInfo(user, true));
        }
        else {
          window.alert("로그인에 실패하였습니다.");
          dispatch(setLoggedInfo(null, false));
          window.localStorage.removeItem("token");
        }
      })
  }
  return (<>
    <AppRouter isLoding={isLoding} /></>
  );
}

export default App;
