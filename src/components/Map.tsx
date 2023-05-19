import { StoreState } from "@app/store/[storeId]/PageContent";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface locationProps {
  loc: StoreState["loc"];
  setLoc: React.Dispatch<React.SetStateAction<StoreState["loc"]>> | null;
  curLoc: StoreState["loc"];
  markerArr: StrapiStoreType[];
}
declare global {
  interface Window {
    kakao: any;
  }
}
const Map: React.FC<locationProps> = ({ loc, setLoc, curLoc, markerArr }) => {
  const pathname = usePathname();
  const [mapCenter, setMapcenter] = useState<StoreState["loc"]>({
    title: "",
    y: loc.y,
    x: loc.x,
  });
  useEffect(() => {
    map();
  }, [loc, markerArr]);

  const onClickReSearch = () => {
    setLoc && setLoc(mapCenter);
  };

  /* 카카오 지도 생성 */
  const map = () => {
    let container = document.getElementById("mapContainer");
    let options = {
      center: new window.kakao.maps.LatLng(loc?.y, loc?.x),
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);
    /* 내위치 마커 */
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(curLoc?.y, curLoc?.x),
      image: new window.kakao.maps.MarkerImage(
        "/assets/curLoc.png",
        new window.kakao.maps.Size(20, 20)
      ),
      clickable: true,
    });
    /* store 마커 */
    markerArr.map((el) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.loc_y, el.loc_x),
        title: el.name,
        clickable: true,
      });
      const contentString = `
       <div><div id="info">
       <span>${el.name}</span>
       <span>${el.road_address_name}</span>
       </div></div>
      `;
      var overlay = new window.kakao.maps.CustomOverlay({
        content: contentString,
        map: map,
        position: marker.getPosition(),
      });
      overlay.setMap(null);
      /* info-window 클릭 이벤트 */
      window.kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });
      window.kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent: any) {
          var latlng = mouseEvent.latLng;
          if (latlng != marker.getPosition()) {
            overlay.setMap(null);
          }
        }
      );
    });
    /* 지도 중심 좌표 */
    window.kakao.maps.event.addListener(map, "center_changed", function () {
      var center = map.getCenter();
      setMapcenter({ title: "", y: center.getLat(), x: center.getLng() });
    });
  };
  return (
    <>
      {pathname == "/map" && (
        <ReSearchBtn onClick={onClickReSearch}>
          <FontAwesomeIcon icon={faRedo} />
          <span>현 위치 검색</span>
        </ReSearchBtn>
      )}
      <MapDiv
        id="mapContainer"
        style={{
          width: "100%",
          height: "300px",
        }}
      ></MapDiv>
    </>
  );
};
export default Map;
const ReSearchBtn = styled.div`
  color: ${(props) => props.theme.color.blue};
  display: flex;
  align-items: center;
  background-color: white;
  position: absolute;
  z-index: 9;
  font-size: small;
  padding: 5px 10px;
  border-radius: 20px;
  margin-left: 50%;
  transform: translate(-50%, 10px);
  gap: 5px;
`;
const MapDiv = styled.div`
  #info {
    font-size: small;
    border: solid #dcdcdc;
    border: solid #46a6ff;
    background-color: rgb(255, 255, 255);
    padding: 5px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(40%, -130%);
    box-shadow: 2px 2px 2px 2px #46a6ff33;
  }
  #info > span:nth-child(1) {
    color: #46a6ff;
  }
`;
