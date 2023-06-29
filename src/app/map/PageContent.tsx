"use client";
import { userInfoAtoms } from "@app/GlobalProvider";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import Header from "./components/Header";
import MapSection from "./components/MapSection";
import SearchSection from "./components/SearchSection";

export interface kakaoLocation {
  title: string;
  y: number;
  x: number;
}
export const mapLocationAtom = atom<kakaoLocation>({
  title: "",
  y: 0,
  x: 0,
});

const PageContent = () => {
  const location = useAtomValue(userInfoAtoms.locationAtom);
  const setMapLocation = useSetAtom(mapLocationAtom);

  useEffect(() => {
    setMapLocation({ title: "", x: location.x, y: location.y });
  }, []);

  return (
    <>
      <Header />
      <div className="relative">
        <MapSection />
        <SearchSection />
      </div>
    </>
  );
};
export default PageContent;
