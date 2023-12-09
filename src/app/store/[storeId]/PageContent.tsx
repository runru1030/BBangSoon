"use client";
import { atom } from "jotai";
import ImgViewer from "./components/ImgViewer";
import MapInfo from "./components/MapInfo";
import ReviewSection from "./components/ReviewSection";
import StoreInfo from "./components/StoreInfo";
import { useEffect } from "react";
import { useResetAtom } from "jotai/utils";
import { openedStoreInfoAtom } from "./StoreInfoProvider";

const PageContent = () => {
  const resetOpenedStoreInfoAtom = useResetAtom(openedStoreInfoAtom);
  useEffect(() => {
    return () => {
      resetOpenedStoreInfoAtom();
    };
  }, []);
  return (
    <div>
      <ImgViewer />
      <StoreInfo />
      <MapInfo />
      {/* <MenuInfo /> */}
      <ReviewSection />
    </div>
  );
};
export default PageContent;
