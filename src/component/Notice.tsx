import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Notice = () => {
  return (<>
    <div className="row-container notice-container">
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

    </div>
  </>)
}
export default Notice;