"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "../../components/Nav";
import { RootState } from "../../store";
import { getStoreList, getStoreMap } from "../../utils/KakaoLocalAPI";
import { resultState } from "../home/page";
import Header from "./components/Header";
import MapView from "./components/MapView";

const Page = () => {
  /* location */
  // const location = useSelector((state: RootState) => state.user.location);
  const location = {
    si: "서울",
    y: 37.556428224476505,
    x: 126.97150576481177,
  };
  const [loc, setLoc] = useState({ title: "", y: location?.y, x: location?.x}); //지도 중심 좌표
  /* 지도 결과 */
  const [markerArr, setMarkerArr] = useState<resultState[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>();
  const [curpage, setCurPage] = useState(1);
  const [addressList, setAddressList] = useState<resultState[]>([]); //위치 검색 결과 arr

  const onClickResult = (id: number) => {
    setLoc({
      title: addressList[id].place_name,
      y: addressList[id].y||0,
      x: addressList[id].x||0,
    });
    setAddressList([]);
  };

  useEffect(() => {
    getStoreApi(1);
  }, [loc]);

  //store 지도 검색 API
  const getStoreApi = (page: number) => {
    getStoreMap(page, markerArr, loc).then((res: any) => {
      setMarkerArr(res.resultArr);
      setIsEnd(res.isEnd);
      setCurPage((p) => p + 1);
      getStoreList(res.resultArr, setMarkerArr);
    });
  };

  return (
    <div>
      <Header setAddressList={setAddressList} />
      <div>
        {addressList.length == 0 ? (
          <MapView
            markerArr={markerArr}
            isEnd={isEnd}
            curpage={curpage}
            getStoreApi={getStoreApi}
          />
        ) : (
          <div>
            {addressList.map((it: resultState, idx: number) => (
              <List
                id={"" + idx}
                onClick={(event) =>
                  onClickResult(parseInt(event.currentTarget.id))
                }
              >
                {it.place_name}
              </List>
            ))}
          </div>
        )}
      </div>
      <Nav />
    </div>
  );
};
export default Page;
const List = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  height: 30px;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
`;
