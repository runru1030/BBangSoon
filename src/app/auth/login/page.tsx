"use client";
import useAuthKakao from "@components/hooks/useAuthKakao";
import {
  faBook,
  faBreadSlice,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
const Page = () => {
  const { isLoading } = useAuthKakao();
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
          className={clsx("relative", isLoading && "pointer-events-none")}
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=http://localhost:3000/auth/login&response_type=code`}
        >
          <Image
            src="/assets/kakao_login.png"
            id="kakao-login-btn"
            width="250"
            height="100"
            alt="kakao"
          />
          {isLoading && (
            <div className="absolute w-full h-full bg-[#FEE500] top-0 flex items-center justify-center rounded-lg">
              <div className="flex justify-center gap-1">
                <div className="h-1 w-1 animate-zoomIn rounded-full bg-gray-400 animate-infinite" />
                <div className="h-1 w-1 animate-zoomIn rounded-full bg-gray-400 animate-infinite animate-delay-150" />
                <div className="h-1 w-1 animate-zoomIn rounded-full bg-gray-400 animate-infinite animate-delay-300" />
              </div>
            </div>
          )}
        </Link>
      </Randing>
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
