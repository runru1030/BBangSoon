import * as React from 'react';
import GoogleLogin from 'react-google-login';
import queryString from 'query-string';
import axios from 'axios';
import styled from 'styled-components';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBreadSlice, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLoggedInfo } from '../modules/user';
import { useHistory } from 'react-router-dom';
const Login = (props: any) => {
  const kauthUrl=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=http://192.168.10.8:3000/auth&response_type=code`
  const query = queryString.parse(window.location.search);
  const dispatch= useDispatch();
  const history= useHistory();
 
  React.useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
        
    }

  }, []);
  const getKakaoTokenHandler = async (code:string) => {
    const data:any = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_uri: "http://192.168.10.8:3000/auth",
      code: code
    };
    const queryString = Object.keys(data)
      .map((k:any)=> encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');
    axios.post('https://kauth.kakao.com/oauth/token', queryString, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      console.log(res);
      sendKakaoTokenToServer(res.data.access_token)
    });
  }
  //일반 로그인
  const sendKakaoTokenToServer = (token:string ) => {
    axios.post('/auth/kakao',{access_token: token})
      .then(res => {
        if (res.status == 201 || res.status == 200) {
          console.log(res.data);
          const user =res.data.user;
          dispatch(setLoggedInfo(user, true))
              
          window.localStorage.setItem("token", JSON.stringify({
            access_token: res.data.jwt
          })); 
          //axios.defaults.headers.common["Authorization"] = `${res.data.jwt}`;
          history.goBack();
          }
        else {
          window.alert("로그인에 실패하였습니다.");
        }
      })
  }

  return (<>
    <Randing className="container">
    <span>로그인으로, 더많은 서비스를 이용할 수 있어요!</span>
    <div className="list col-container">
      
      <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon"/> 빵지순례 방문 확인</span>
        <span><FontAwesomeIcon icon={faBook} color="#7e7e7e" id="icon"/> 빵지순례 방문 일지</span>
        <span><FontAwesomeIcon icon={faHeart} color="#f89573" id="icon"/> 관심 빵집 등록</span>
    </div>
      <img src="logo.png" width="40%"/>
      <span>감편로그인으로 3초만에 로그인</span>
      <a href={kauthUrl}>
                    <img src="kakao_login.png" id="kakao-login-btn" width="250px" /></a>

    </Randing>
    <Nav/></>
  );
};

export default Login;   
const Randing=styled.div`
margin-top: 100px;
>span{
  font-weight: lighter;
  font-size: large;
}
.list{
  align-items: flex-start;
  font-weight: lighter;
  margin: 30px;
}
.list span{
  margin: 5px 0;
}
.list #icon{
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: large;
}
span:nth-child(4){
  font-size: small;
  margin: 50px;
}
`