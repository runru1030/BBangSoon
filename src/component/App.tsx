import axios from 'axios';
import * as React from 'react';
import AppRouter from './Router';
type pos = {
  si: string,
  gu: string,
  dong: string,
  latitude: number,
  longitude: number,
  detail: string
}

function App() {
  const [location, setLocation] = React.useState<pos>({
    si: "서울",
    gu: "",
    dong: "",
    latitude: 33.450701,
    longitude: 126.570667,
    detail: ""
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
        headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
        params: {
          y: position.coords.latitude,
          x: position.coords.longitude
        }
      }).then(res => {
        setLocation({
          si: res.data.documents[0].address.region_1depth_name,
          gu: res.data.documents[0].address.region_2depth_name,
          dong: res.data.documents[0].address.region_3depth_name,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          detail: res.data.documents[0].address.address_namee,
        })
        window.localStorage.setItem("location", JSON.stringify({
          si: res.data.documents[0].address.region_1depth_name,
          gu: res.data.documents[0].address.region_2depth_name,
          dong: res.data.documents[0].address.region_3depth_name,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          detail: res.data.documents[0].address.address_namee,
        }))
      }
      )
    });
  }, [])
  return (
    <AppRouter location={location} />
  );
}

export default App;
