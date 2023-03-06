import { userInfoAtoms } from "@app/GlobalProvider";
import Map from "@components/Map";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import styled from "styled-components";
import { DBStoreType, openedStoreInfoAtom } from "../PageContent";
import { storeInfoAtoms } from "../StoreInfoProvider";
const MapInfo = () => {
  const storeInfo: DBStoreType = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);
  const location = useAtomValue(userInfoAtoms.locationAtom);

  return (
    <Wrapper>
      <Label
        id="map"
        onClick={() => setOpenedStoreInfo("map")}
        className={clsx(openedStoreInfo === "map" ? "text-blue" : "")}
      >
        지도
        {openedStoreInfo === "map" && (
          <Navi className="navi-wrapper">
            <a
              href={"https://map.kakao.com/link/roadview/" + storeInfo.id}
              id="navi"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#46A6FF" />
              <span>길찾기</span>
            </a>
          </Navi>
        )}
      </Label>
      {openedStoreInfo === "map" && storeInfo.x && storeInfo.y && (
        <div>
          <Map
            loc={{
              title: storeInfo.place_name || "",
              y: storeInfo.y,
              x: storeInfo.x,
            }}
            setLoc={null}
            curLoc={{
              title: "",
              y: location.y,
              x: location.x,
            }}
            markerArr={[storeInfo]}
          />
        </div>
      )}
    </Wrapper>
  );
};
export default MapInfo;
const Wrapper = styled.div``;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;
const Navi = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  #navi {
    margin-right: 5px;
    border: solid thin #fae100;
    border-radius: 25px;
    padding: 3px 10px;
    display: flex;
    align-items: center;
    font-size: small;
    gap: 5px;
    color: black;
    transform: translate(10px);
  }
`;
