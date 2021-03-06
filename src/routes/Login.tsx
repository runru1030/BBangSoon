import queryString from 'query-string';
import axios from 'axios';
import styled from 'styled-components';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBreadSlice, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLoggedInfo } from '../modules/user';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=http://localhost:3000/auth&response_type=code`;
  const query = queryString.parse(window.location.search);
  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);
  /* 카카오 로그인 token 발급 REST API */
  const getKakaoTokenHandler = async (code: string) => {
    const data: any = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_uri: "http://localhost:3000/auth",
      code: code
    };
    const queryString = Object.keys(data)
      .map((k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');
    axios.post('https://kauth.kakao.com/oauth/token', queryString, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      sendKakaoTokenToServer(res.data.access_token)
    });
  }
  /* 일반 로그인 */
  const sendKakaoTokenToServer = (token: string) => {
    axios.post('/auth/kakao', { access_token: token })
      .then(res => {
        if (res.status == 201 || res.status == 200) {
          const user = res.data.user;
          dispatch(setLoggedInfo(user, true))
          window.localStorage.setItem("token", JSON.stringify({
            access_token: res.data.jwt
          }));
          axios.defaults.headers.common["Authorization"] = `${res.data.jwt}`;
          history.go(-2);
        }
        else {
          window.alert("로그인에 실패하였습니다.");
        }
      })
  }

  return (<>
    <Randing className="container">
      <Label>로그인으로, 더 많은 서비스를 이용할 수 있어요!</Label>
      <Wrapper className="col-container">
        <List><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 빵지순례 방문 기록</List>
        <List><FontAwesomeIcon icon={faBook} color="#7e7e7e" id="icon" /> 빵지순례 방문 일지</List>
        <List><FontAwesomeIcon icon={faHeart} color="#f89573" id="icon" /> 관심 빵집 등록</List>
      </Wrapper>
      <img src="logo.png" width="40%" />
      <span>간편로그인으로 3초만에 로그인</span>
      <a href={kauthUrl}><img src="kakao_login.png" id="kakao-login-btn" width="250px" /></a>
    </Randing>
    <Nav /></>
  );
};

export default Login;
const Randing = styled.div`
  margin-top: 50px;
  span:nth-child(4){
    font-size: small;
    margin: 50px;
  }
`
const Wrapper = styled.div`
  align-items: flex-start;
  font-weight: lighter;
  margin: 30px;
`
const Label = styled.span`
  font-weight: lighter;
  font-size: large;
`
const List = styled.span`
  margin: 5px 0;
  #icon{
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: large;
  }
`