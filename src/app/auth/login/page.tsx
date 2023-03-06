"use client";
import { userInfoAtoms } from "@app/GlobalProvider";
import {
  faBook,
  faBreadSlice,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import Nav from "../../../components/Nav";
const Page = () => {
  const setUserAtom = useSetAtom(userInfoAtoms.userAtom);
  const searchParams = useSearchParams();
  const query = searchParams?.get("code");
  const router = useRouter();

  useEffect(() => {
    sendKakaoTokenToServer("");
    if (query) {
      getKakaoTokenHandler(query);
    }
  }, [query]);

  /* 카카오 로그인 token 발급 REST API */
  const getKakaoTokenHandler = async (code: string) => {
    const data: any = {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_KEY,
      redirect_uri: "http://localhost:3000/auth/login",
      code,
    };
    const queryString = Object.keys(data)
      .map(
        (k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
      )
      .join("&");
    axios
      .post("https://kauth.kakao.com/oauth/token", queryString, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        sendKakaoTokenToServer(res.data.access_token);
      });
  };
  /* 일반 로그인 */
  const sendKakaoTokenToServer = async (token: string) => {
    const res = await axios.put("/auth/api", {
      access_token: "WkcPYc7p7-Tf7bP8SbLRPH7tY0bwvqz7-BXwWp40Cj102gAAAYa17JNl",
    });
    const { jwt, user } = res.data;

    if (res.status == 201 || res.status == 200) {
      setUserAtom(user);
      window.localStorage.setItem(
        "token",
        JSON.stringify({
          access_token: jwt,
        })
      );
      axios.defaults.headers.common["Authorization"] = `${jwt}`;
      router.push("/home");
    } else {
      window.alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <div>
      <Randing className="col-container items-center py-8">
        <Label>로그인으로, 더 많은 서비스를 이용할 수 있어요!</Label>
        <Wrapper className="col-container">
          <List>
            <FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" />{" "}
            빵지순례 방문 기록
          </List>
          <List>
            <FontAwesomeIcon icon={faBook} color="#7e7e7e" id="icon" /> 빵지순례
            방문 일지
          </List>
          <List>
            <FontAwesomeIcon icon={faHeart} color="#f89573" id="icon" /> 관심
            빵집 등록
          </List>
        </Wrapper>
        <Image src="/assets/logo.png" width="200" height="100" alt="logo" />
        <span>간편로그인으로 3초만에 로그인</span>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=http://localhost:3000/auth/login&response_type=code`}
        >
          <Image
            src="/assets/kakao_login.png"
            id="kakao-login-btn"
            width="250"
            height="100"
            alt="kakao"
          />
        </Link>
      </Randing>
      <Nav />
    </div>
  );
};

export default Page;
const Randing = styled.div`
  margin-top: 50px;
  span:nth-child(4) {
    font-size: small;
    margin: 50px;
  }
`;
const Wrapper = styled.div`
  align-items: flex-start;
  font-weight: lighter;
  margin: 30px;
`;
const Label = styled.span`
  font-weight: lighter;
  font-size: large;
`;
const List = styled.span`
  margin: 5px 0;
  display: flex;

  #icon {
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: large;
  }
`;
