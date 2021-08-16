
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

type locationProps = {
  loc: {
    title: string,
    lat: number,
    lng: number
  }|null,
  setLoc: any|null,
  curLoc: {
    title: string,
    lat: number,
    lng: number
  },
  markerArr: any[],

}
declare global {
  interface Window {
    naver: any;
  }
}
const Map: React.FC<locationProps> = ({ loc, setLoc, curLoc, markerArr }) => {
  const location=useLocation();
  const [mapCenter, setMapcenter] = React.useState({ title: "", lat: loc?.lat, lng: loc?.lng } as {
    title: string,
    lat: number,
    lng: number
  })
  React.useEffect(() => {
    map();

  }, [loc, markerArr])
  const onClick = () => {
    setLoc(mapCenter)
  }
  const map = () => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(loc?.lat, loc?.lng),
      zoom: 15,
    });
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(curLoc.lat, curLoc.lng),
      map: map,
      icon: {
        content: `<img src="curLoc.png" width="20px"/>`,
      }
    });
    markerArr.map((el) => {

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(el.y, el.x),
        map: map,
      });
      var contentString = `
       <div ><div id="info">
       <span>${el.place_name}</span>
       <span>${el.address_name}</span>
       </div></div> 
      `;
      var infowindow = new window.naver.maps.InfoWindow({
        content: contentString,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: 'transperant',
      });
      window.naver.maps.Event.addListener(marker, "click", function (event: any) {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
    });
    window.naver.maps.Event.addListener(map, 'dragend', function () {

      // 지도 중심좌표를 얻어옵니다 
      var latlng = map.getCenter();
      setMapcenter(({ title: "", lat: latlng._lat, lng: latlng._lng }))


    });
  }
  return (<>
    {location.pathname=="/surrounding"&&<div onClick={onClick} className="re-search-btn">
      <FontAwesomeIcon icon={faRedo}/>
      <span>현 위치 검색</span>
      </div>}
    <div id="map" style={{
      width: '100%',
      height: '300px'
    }
    }>

    </div></>);
}
export default Map;