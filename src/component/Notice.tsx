import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Notice: React.FC = () => {
  return (<>
    <NoticeDiv className="row-container">
      <div className="col-container phone-view">
        <div className="row-container notice-part">
          <img src="logo.png" width="15%" />
          <div className="col-container">
            <span>빵순은 현재 모바일 기기에서만 이용 가능합니다.</span>
            <span>모바일 기기에서 빵순을 이용해보세요!</span></div></div>
        <img src="prototype2.png" width="70%" />
      </div>
      <div className="col-container text-view">
        <div className="col-container wrapper">
          <div className="list row-container">
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 빵집 랭킹 확인</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" />  빵 지도 서비스</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 나만의 빵집 기록 서비스</span>
            <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" id="icon" /> 관심 빵집 등록</span>
          </div>
          <div className="text-part">
            <p>
              현재 인기있는 빵집 '랭킹'을 확인해보고,<br />
              '빵지도'를 이용하여 내 주위의 빵집들과 원하는 지역의 빵집들을 살펴봐요!</p>
            <p>
              로그인하여, 나의 리뷰 & 관심 빵집 등록 & 방문 빵집 등록등 '나만의 기록 서비스'를 경험해보세요!</p>
          </div>
          <div className="row-container prototype-view">
            <div className="rounding-img">
              <img src="main.png" />
            </div>
            <div className="rounding-img">
              <img src="storemap.png" />
            </div>
            <div className="rounding-img">
              <img src="store.png" />
            </div>
          </div>
        </div>

      </div>
    </NoticeDiv>
  </>)
}
export default Notice;
const NoticeDiv = styled.div`
  font-size: medium;
  font-weight: lighter;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  align-items: flex-start;
.phone-view{
  flex: 0.35;
  margin-top: 100px;
  align-items: center;
}
.text-view{
  flex: 0.7;
  align-items: center;
}
.notice-part{
  width: 90%;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  color: #636363;
  margin-left: 10px;
}
.wrapper{
  width: 90%;
  border-radius: 20px;
  box-shadow: -10px 5px 30px 10px #46a6ff18;
  margin-top:50px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
}
.rounding-img{
  border-radius: 15px;
  width: 25%;
  padding: 5px 0;
  box-shadow: -5px 10px 10px 10px #00000017;
  overflow: hidden;
  justify-content: center;
}
.rounding-img img{
  width: 100%;
}
.text-view .list{
  gap: 30px;
  margin-top: 50px;
  margin-bottom: 30px;
  justify-content: center;
  padding: 10px 20px;
  border-bottom: solid thin #46A6FF;
  border-top: solid thin #46A6FF;
}
.text-view .text-part{
  font-size: small;
  color: #9e9e9e;
  width: 70%;
  margin-left: 50px;
  margin-bottom: 30px;
}
.text-view .text-part p:nth-child(2){
  margin-left: 50px;
}
.text-view .list #icon{
  margin-right: 5px;
}
.text-view .prototype-view{
  width: 85%;
  justify-content: center;
}

`