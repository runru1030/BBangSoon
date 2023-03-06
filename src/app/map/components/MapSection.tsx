import { userInfoAtoms } from "@app/GlobalProvider";
import { resultState } from "@app/home/PageContent";
import Map from "@components/Map";
import StoreList from "@components/StoreItem";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { getStoreList, getStoreMap } from "src/utils/KakaoLocalAPI";
import styled from "styled-components";
import { mapLocationAtom } from "../PageContent";

const MapSection = () => {
  const location = useAtomValue(userInfoAtoms.locationAtom);
  const [mapLocation, setMapLocation] = useAtom(mapLocationAtom);

  const [markerArr, setMarkerArr] = useState<resultState[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>();
  const [curpage, setCurPage] = useState(1);

  useEffect(() => {
    getStoreApi(1);
  }, [mapLocation]);

  const getStoreApi = (page: number) => {
    getStoreMap(page, markerArr, mapLocation).then((res: any) => {
      setMarkerArr(res.resultArr);
      setIsEnd(res.isEnd);
      setCurPage((p) => p + 1);
      getStoreList(res.resultArr, setMarkerArr);
    });
  };

  return (
    <>
      <Map
        loc={mapLocation}
        setLoc={setMapLocation}
        curLoc={{
          title: "",
          y: location.y,
          x: location.x,
        }}
        markerArr={markerArr}
      />
      <ScrollDiv className="col-container">
        {markerArr.map((store) => (
          <StoreList store={store} key={store.id} />
        ))}
        {!isEnd && (
          <MoreBtn className="more-btn" onClick={() => getStoreApi(curpage)}>
            더 보기
          </MoreBtn>
        )}
      </ScrollDiv>
    </>
  );
};
export default MapSection;

const MoreBtn = styled.button`
  all: unset;
  color: #46a6ff;
  text-align: center;
  width: 100%;
`;
const ScrollDiv = styled.div`
  overflow: scroll;
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
`;
