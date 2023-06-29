"use client";
import { atom } from "jotai";
import ImgViewer from "./components/ImgViewer";
import MapInfo from "./components/MapInfo";
import MenuInfo from "./components/MenuInfo";
import Review from "./components/Review";
import StoreInfo from "./components/StoreInfo";
import { StrapiStoreType } from "./StoreInfoProvider";

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
      <Review />
    </div>
  );
};
export default PageContent;
