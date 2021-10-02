
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type locationProps = {
  //지도 중심 위치
  loc: loc,
  setLoc: React.Dispatch<React.SetStateAction<loc>>|null,
  //내 위치
  curLoc: loc,
  //매장 정보arr
  markerArr: any[],
}
type loc = {
  title: string,
  y: number,
  x: number
}
declare global {
  interface Window {
    kakao: any;
  }
}
const Map: React.FC<locationProps> = ({ loc, setLoc, curLoc, markerArr }) => {
  const location = useLocation();
  const [mapCenter, setMapcenter] = useState<loc>({ title: "", y: loc.y, x: loc.x });
  useEffect(() => {
    console.log(loc);
    
    map();
  }, [loc, markerArr])

  const onClickReSearch = () => {
    setLoc&&setLoc(mapCenter)
  }
  /* 카카오 지도 생성 */
  const map = () => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(loc?.y, loc?.x),
      level: 5
    };

    const map = new window.kakao.maps.Map(container, options);
    /* 내위치 마커 */
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(curLoc?.y, curLoc?.x),
      image: new window.kakao.maps.MarkerImage("curLoc.png", new window.kakao.maps.Size(20, 20),),
      clickable: true
    });
    /* store 마커 */
    markerArr.map((el) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.y, el.x),
        title: el.title,
        clickable: true
      });
      const contentString = `
       <div><div id="info">
       <span>${el.place_name}</span>
       <span>${el.address_name}</span>
       </div></div>
      `;
      var overlay = new window.kakao.maps.CustomOverlay({
        content: contentString,
        map: map,
        position: marker.getPosition()
      });
      overlay.setMap(null);
      /* info-window 클릭 이벤트 */
      window.kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });
      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
        var latlng = mouseEvent.latLng;
        if (latlng != marker.getPosition()) {
          overlay.setMap(null);
        }

      });
    });
    /* 지도 중심 좌표 */
    window.kakao.maps.event.addListener(map, 'center_changed', function () {
      var center = map.getCenter();
      setMapcenter(({ title: "", y: center.getLat(), x: center.getLng() }))
    });

  }
  return (<>
    {location.pathname == "/storemap" && 
    <ReSearchBtn onClick={onClickReSearch}><FontAwesomeIcon icon={faRedo} /><span>현 위치 검색</span></ReSearchBtn>}
    <div id="map" style={{
      width: '100%',
      height: '300px',
      zIndex: 99
    }
    }>

    </div></>);
}
export default Map;
const ReSearchBtn= styled.div`
color: #46A6FF;
display: flex;
align-items: center;
background-color: white;
position: absolute;
z-index: 999;
font-size: small;
padding: 5px 10px;
border-radius: 20px;
margin-left: 50%;
transform: translate(-50%, 10px);
gap: 5px;
`