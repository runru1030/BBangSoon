import { userInfoAtoms } from "@app/GlobalProvider";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
import Map from "@components/Map";
import StoreList from "@components/StoreItem";
import { strapiStoresApi } from "@lib/apis/Stores";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import styled from "styled-components";
import { mapLocationAtom } from "../PageContent";

const MapSection = () => {
  const location = useAtomValue(userInfoAtoms.locationAtom);
  const [mapLocation, setMapLocation] = useAtom(mapLocationAtom);

  const [storeArr, setStoreArr] = useState<StrapiStoreType[]>([]);

  useQuery(["getNearbyStores"], {
    queryFn: async () => {
      return await strapiStoresApi.getNearbyStores({
        curr_x: mapLocation.x,
        curr_y: mapLocation.y,
      });
    },
    onSuccess: (res: any) => {
      setStoreArr(res.data);
    },
    onError: (err: any) => {
      console.error(err);
    },
    retry: false,
    enabled: mapLocation.x !== 0,
  });

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
          <StoreList store={store} key={store.id} />
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
