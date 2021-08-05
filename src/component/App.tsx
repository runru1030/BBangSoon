import * as React from 'react';
import './App.css';
import AppRouter from './Router';

function App() {
  
  type pos = {
    si: string,
    gu: string,
    dong: string,
    locationX: Number,
    locationY: Number,
    detail: string
  }
  
  const [location, setLocation] = React.useState<pos>({
    si: "",
    gu: "",
    dong: "",
    locationX: 0,
    locationY: 0,
    detail:"" 
  });
  const kakao = (window as any).kakao;
  let geocoder = new kakao.maps.services.Geocoder();
  
  let callback = (result: any, status: any )=> {
    if (status === kakao.maps.services.Status.OK) {
    setLocation({
      si: result[0].address.region_1depth_name,
      gu: result[0].address.region_2depth_name,
      dong: result[0].address.region_3depth_name,
      locationX: result[0].address.x,
      locationY: result[0].address.y,
      detail: result[0].address.address_name
    })
  }
  };
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let coord = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  },[])
  return (
    <AppRouter si={location.si} />
  );
}

export default App;
