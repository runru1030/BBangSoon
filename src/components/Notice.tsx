import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Notice: React.FC = () => {
  return (<>
    <NoticeDiv className="row-container">
      <Prototype className="col-container">
        <Text className="row-container">
          <img src="logo.png" width="15%" />
          <div className="col-container">
            <span>빵순은 현재 모바일 기기에서만 이용 가능합니다.</span>
            <span>모바일 기기에서 빵순을 이용해보세요!</span>
          </div>
        </Text>
        <img src="prototype2.png" width="70%" />
      </Prototype>
      <Content className="col-container">
        <Wrapper className="col-container">
          <ContentList className="row-container">
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 빵집 랭킹 확인</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" />  빵 지도 서비스</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 나만의 빵집 기록 서비스</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 관심 빵집 등록</span>
          </ContentList>
          <ContentDetail>
            <p>
              현재 인기있는 빵집 &apos 랭킹&apos 을 확인해보고,<br />
              &apos 빵지도&apos 를 이용하여 내 주위의 빵집들과 원하는 지역의 빵집들을 살펴봐요!</p>
            <p>
              로그인하여, 나의 리뷰 & 관심 빵집 등록 & 방문 빵집 등록등 &apos 나만의 기록 서비스&apos 를 경험해보세요!</p>
          </ContentDetail>
          <ImgContainer className="row-container">
            <ImgWarpper>
              <img src="main.png" />
            </ImgWarpper>
            <ImgWarpper>
              <img src="storemap.png" />
            </ImgWarpper>
            <ImgWarpper>
              <img src="store.png" />
            </ImgWarpper>
          </ImgContainer>
        </Wrapper>

      </Content>
    </NoticeDiv>
  </>)
}
export default Notice;
const Prototype = styled.div`
  flex: 0.35;
  margin-top: 100px;
  align-items: center;
`
const Content = styled.div`
  flex: 0.7;
  align-items: center;
`
const Text = styled.div`
  width: 90%;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  color: #636363;
  margin-left: 10px;
`
const Wrapper = styled.div`
  width: 90%;
  border-radius: 20px;
  box-shadow: -10px 5px 30px 10px #46a6ff18;
  margin-top:50px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
`
const ImgWarpper = styled.div`
  border-radius: 15px;
  width: 25%;
  padding: 5px 0;
  box-shadow: -5px 10px 10px 10px #00000017;
  overflow: hidden;
  justify-content: center;
  img{
    width: 100%;
  }
`
const ContentList = styled.div`
  gap: 30px;
  margin-top: 50px;
  margin-bottom: 30px;
  justify-content: center;
  padding: 10px 20px;
  border-bottom: solid thin #46A6FF;
  border-top: solid thin #46A6FF;
  #icon{
    margin-right: 5px;
  }
`
const ContentDetail = styled.div`
  font-size: small;
  color: #9e9e9e;
  width: 70%;
  margin-left: 50px;
  margin-bottom: 30px;
  p:nth-child(2){
    margin-left: 50px;
  }
`
const ImgContainer = styled.div`
  width: 85%;
  justify-content: center;
`
const NoticeDiv = styled.div`
  font-size: medium;
  font-weight: lighter;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  align-items: flex-start;
`