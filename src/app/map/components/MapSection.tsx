import { userInfoAtoms } from "@app/GlobalProvider";
import { strapiUtil } from "@app/api/auth/utils/util";
import Map from "@components/Map";
import StoreList from "@components/StoreItem";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mapLocationAtom } from "../PageContent";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";

const MapSection = () => {
  const location = useAtomValue(userInfoAtoms.locationAtom);
  const [mapLocation, setMapLocation] = useAtom(mapLocationAtom);

  const [storeArr, setStoreArr] = useState<StrapiStoreType[]>([]);

  useEffect(() => {
    getStores();
  }, [mapLocation]);

  const getStores = async () => {
    const stores = await strapiUtil.getStrapiNearbyStores({
      curr_x: mapLocation.x,
      curr_y: mapLocation.y,
    });
    setStoreArr(stores);
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
        markerArr={storeArr}
      />
      <ScrollDiv className="col-container">
        {storeArr.map((store) => (
          <StoreList store={store} key={store.storeId} />
        ))}
        {storeArr.length === 0 && <span>지역 오픈 준비중</span>}
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
