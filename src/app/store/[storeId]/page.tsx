"use client"
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Nav from "../../../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@components/StoreList";
import { RootState } from "@store/index";
import { setStoreInfo } from "@store/store";
import Header from "./components/Header";
import ImgViewer from "./components/ImgViewer";
import StoreInfo from "./components/StoreInfo";
import MapInfo from "./components/MapInfo";
import MenuInfo from "./components/MenuInfo";
import Review from "./components/Review";
export interface StoreState {
  store: DBStoreType;
  loc: {
    title: string;
    y: number;
    x: number;
  };
}
export interface DBStoreType extends StoreType {
  Reviews?: [] | null;
  Visits?: [] | null;
  Wishes?: [] | null;
  StoreImgs?: { imageUrl: string }[] | null;
  Menus?: [] | null;
  site?: string;
}
const Page = () => {
  const dispatch = useDispatch();
  const storeInfo: DBStoreType = useSelector(
    (state: RootState) => state.store.storeObj
  );

  /* 아코디언 feature */
  const [isOpen, setIsOpen] = useState({
    map: false,
    detail: true,
    menu: false,
    review: false,
  });
  const onClick = (e: React.MouseEvent) => {
    setIsOpen({
      map: false,
      detail: false,
      menu: false,
      review: false,
      [e.currentTarget.id]: true,
    });
  };

  /* store 정보 REST API*/
  useEffect(() => {
    axios.post(`/storeCrawl`, storeInfo).then((res) => {
      dispatch(setStoreInfo({ ...storeInfo, ...res.data }));
    });
    const update = setInterval(() => {
      axios.post(`/storeCrawl`, storeInfo).then((res) => {
        dispatch(setStoreInfo({ ...storeInfo, ...res.data }));
      });
    }, 10000);
    return () => {
      clearInterval(update);
    };
  }, []);

  return (
    <>
      <Header />

      <Wrapper>
        {(!storeInfo.Reviews || storeInfo.Reviews.length == 0) && (
          <Loding>
            <img width="50%" src="loding.gif" />
            <span>외부 사이트로부터 데이터를 가져오는 중 입니다</span>
          </Loding>
        )}
        <ImgViewer />
        <StoreInfo onClick={onClick} isOpen={isOpen} />
        <MapInfo onClick={onClick} isOpen={isOpen} />
        <MenuInfo onClick={onClick} isOpen={isOpen} />
        <Review onClick={onClick} isOpen={isOpen} />
        <Nav />
      </Wrapper>
    </>
  );
};
export default Page;
const Wrapper = styled.div``;
const Loding = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  background-color: #ffffffda;
  top: 0;
  z-index: 10000;
  img {
    margin-top: 150px;
  }
  span {
    margin-top: 50px;
  }
`;
