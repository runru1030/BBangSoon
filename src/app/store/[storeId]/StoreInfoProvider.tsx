import { atom, Provider } from "jotai";
import React from "react";

export interface StoreType {
  id: number;
  road_address_name?: string;
  address_name?: string;
  place_name: string;
  phone?: string;
  x?: number;
  y?: number;
  place_url?: string;
  reviewCnt?: number;
  avgStar?: number;
}
export const storeInfoAtoms = {
  storeAtom: atom<StoreType>({
    id: 0,
    place_name: "",
  }),
};

export default function StoreInfoProvider(props: {
  children: React.ReactNode| React.ReactNode[];
}) {
  return <Provider>{props.children}</Provider>;
}
