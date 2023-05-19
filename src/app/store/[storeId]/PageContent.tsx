"use client";
import { atom } from "jotai";
import ImgViewer from "./components/ImgViewer";
import MapInfo from "./components/MapInfo";
import MenuInfo from "./components/MenuInfo";
import Review from "./components/Review";
import StoreInfo from "./components/StoreInfo";
import { StrapiStoreType } from "./StoreInfoProvider";
export interface StoreState {
  store: DBStoreType;
  loc: {
    title: string;
    y: number;
    x: number;
  };
}
export interface DBStoreType extends StrapiStoreType {
  Reviews?: [] | null;
  Visits?: [] | null;
  Wishes?: [] | null;
  StoreImgs?: { imageUrl: string }[] | null;
  Menus?: [] | null;
  site?: string;
}

export const openedStoreInfoAtom = atom<"map" | "detail" | "menu" | "review">(
  "detail"
);

const PageContent = () => {
  return (
    <div>
      <ImgViewer />
      <StoreInfo />
      <MapInfo />
      <MenuInfo />
      <Review />
    </div>
  );
};
export default PageContent;
