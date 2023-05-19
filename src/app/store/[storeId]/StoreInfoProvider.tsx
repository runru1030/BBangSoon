import { atom, Provider } from "jotai";
import React from "react";

export interface StrapiStoreType {
  storeId: number;
  name: string;
  road_address_name?: string;
  phone?: string;
  loc_x?: number;
  loc_y?: number;
  store_url?: string;
}
export const storeInfoAtoms = {
  storeAtom: atom<StrapiStoreType>({
    storeId: 0,
    name: "",
  }),
};

export default function StoreInfoProvider(props: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <Provider>{props.children}</Provider>;
}
