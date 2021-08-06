import axios from 'axios';
import * as React from 'react';
type marker = {
  title: string,
  lat: number,
  lng: number
}
type locationProps = {
  loc: marker,
  markerArr: marker[]
}
declare global {
  interface Window {
    kakao: any;
  }
}
const Map: React.FC<locationProps> = ({ loc, markerArr }) => {

  React.useEffect(() => {
    map();
  }, [loc, markerArr])

  const map = () => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(loc.lat, loc.lng),
      level: 5
    };
    const map = new window.kakao.maps.Map(container, options);
    markerArr.map((el) => {

      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });
    });
    window.kakao.maps.event.addListener(map, 'center_changed', function () {

      var latlng = map.getCenter();
      console.log();


    });
  }
  return (<div id="map" style={{
    width: '100%',
    height: '300px'
  }
  }>

  </div>);
}
export default Map;