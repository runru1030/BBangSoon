import { strapiStoresApi } from "@lib/apis/Stores";
import { useQuery } from "@tanstack/react-query";
import { atom, createStore, Provider, useSetAtom } from "jotai";
import React from "react";

export interface StoreImg {
  id: number;
  attributes: {
    url: string;
  };
}
export interface StrapiStoreType {
  id: number;
  name: string;
  road_address_name?: string;
  phone?: string;
  loc_x?: number;
  loc_y?: number;
  store_url?: string;
  Reviews?: [] | null;
  Visits?: [] | null;
  Wishes?: [] | null;
  store_imgs?: StoreImg[] | null;
  Menus?: [] | null;
}

export const storeInfoAtoms = {
  storeAtom: atom<StrapiStoreType>({
    id: 0,
    name: "",
    Reviews: [],
  }),
};

export default function StoreInfoProvider(props: {
  children: React.ReactNode | React.ReactNode[];
  storeId: string;
}) {
  const setStoreInfo = useSetAtom(storeInfoAtoms.storeAtom);
  useQuery(["getStore"], {
    queryFn: async () => {
      return await strapiStoresApi.getStore(props.storeId);
    },
    onSuccess: (res: any) => {
      setStoreInfo({
        ...res.data,
        store_imgs: res.data.store_imgs.data.slice(0, 3),
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
    retry: false,
    enabled: props.storeId !== undefined,
  });

  return <>{props.children}</>;
}
