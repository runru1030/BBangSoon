"use client";
import { atom } from "jotai";
import ImgViewer from "./components/ImgViewer";
import MapInfo from "./components/MapInfo";
import ReviewSection from "./components/ReviewSection";
import StoreInfo from "./components/StoreInfo";

export const openedStoreInfoAtom = atom<"map" | "detail" | "menu" | "review">(
  "detail"
);

const PageContent = () => {
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
