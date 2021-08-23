
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

type locationProps = {
  loc: {
    title: string,
    y: number,
    x: number
  }|null,
  setLoc: any|null,
  curLoc: {
    title: string,
    y: number,
    x: number
  },
  markerArr: any[],

}
declare global {
  interface Window {
    kakao: any;
  }
}
const Map: React.FC<locationProps> = ({ loc, setLoc, curLoc, markerArr }) => {
  const location=useLocation();
  const [mapCenter, setMapcenter] = React.useState({ title: "", lat: loc?.y, lng: loc?.x } as {
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
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(loc?.y, loc?.x),
      level: 5
    };
    
    const map = new window.kakao.maps.Map(container, options);
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(curLoc?.y, curLoc?.x),
      image: new window.kakao.maps.MarkerImage("curLoc.png", new window.kakao.maps.Size(20, 20), ),
      clickable: true 
    });
    markerArr.map((el) => {

      const marker=new window.kakao.maps.Marker({
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
    window.kakao.maps.event.addListener(marker, 'click', function() {
      overlay.setMap(map);
  });
  window.kakao.maps.event.addListener(map, 'click', function(mouseEvent:any) {        
    var latlng = mouseEvent.latLng;
    if(latlng!=marker.getPosition() ){
      
      overlay.setMap(null);
    }
    
});
    });
    window.kakao.maps.event.addListener(map, 'center_changed', function () {
      // 지도 중심좌표를 얻어옵니다 
      var center = map.getCenter();
      console.log(center);
      
      setMapcenter(({ title: "", lat: center.getLat(), lng: center.getLng() }))
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