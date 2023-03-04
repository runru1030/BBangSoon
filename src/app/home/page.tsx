"use client"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Header } from "../../components/Header";
import LocList from "../../components/LocList";
import Ranking from "./components/Ranking";
import Nav from "../../components/Nav";
import { StoreType } from "../../components/StoreList";
import { RootState } from "../../store";
import { getStore, getStoreList } from "../../utils/KakaoLocalAPI";
import Search from "./components/Search";
import StoreImg from "@components/StoreImg";
export interface resultState extends StoreType {
  category_group_code: string;
  category_name: string;
}
const Page = () => {
  /* location */
  // const location = useSelector((state: RootState) => state.user.location);
  const [changeSi, setChangeSi] = useState(false);
  const onClickLoc = () => {
    setChangeSi(true);
  };

  /* search */
  const [search, setSearch] = useState("");
  const [resultArr, setResultArr] = useState<resultState[]>([]); //search result Arr
  const [curpage, setCurPage] = React.useState(1); //search page
  const [isEnd, setIsEnd] = React.useState<boolean>(); //page end

  //카카오 검색 API
  const getStoreKakao = (page: number) => {
    getStore(page, resultArr, search).then((res: any) => {
      setResultArr(res.resultArr);
      setIsEnd(res.isEnd);
      setCurPage((p) => p + 1);
      getStoreList(res.resultArr, setResultArr);
    });
  };

  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faMapMarkerAlt} onClick={onClickLoc} />{" "}
        {/* {location?.si} */}
      </Header>
      {changeSi ? (
        <LocList setChangeSi={setChangeSi} />
      ) : (
        <>
          {/* <Search
            search={search}
            setSearch={setSearch}
            setResultArr={setResultArr}
            getStoreKakao={getStoreKakao}
          />
          {resultArr.length == 0 ? (
            <Ranking />
          ) : (
            <StoreImg
              resultArr={resultArr}
              curpage={curpage}
              isEnd={isEnd}
              getStoreKakao={getStoreKakao}
            />
          )} */}
        </>
      )}
      <Nav />
    </Container>
  );
};
export default Page;
const Container = styled.div``;
