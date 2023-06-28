import { strapiStoresApi } from "@lib/apis/Stores";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import React from "react";

export interface StoreImg {
  name: string;
  url: string;
}
export interface StrapiStoreType {
  id: number;
  name: string;
  road_address_name?: string;
  phone?: string;
  loc_x?: number;
  loc_y?: number;
  store_url?: string;
  reviews?: [] | null;
  Visits?: [] | null;
  Wishes?: [] | null;
  store_imgs?: StoreImg[] | null;
  Menus?: [] | null;
}

export const storeInfoAtoms = {
  storeAtom: atom<StrapiStoreType>({
    id: 0,
    name: "",
    reviews: [],
  }),
};

export default function StoreInfoProvider(props: {
  children: React.ReactNode | React.ReactNode[];
  storeId: string;
}) {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtoms.storeAtom);
  useQuery(["getStore"], {
    queryFn: async () => {
      return await strapiStoresApi.getStore(props.storeId);
    },
    onSuccess: (res: any) => {
      setStoreInfo({
        ...res.data,
      });
    },
    onError: (err: any) => {
      console.error(err);
    },
    retry: false,
    enabled: props.storeId !== undefined,
  });

  useQuery(["getStoreThumbNail"], {
    queryFn: async () => {
      return await strapiStoresApi.getStoreThumbNail(props.storeId);
    },
    onSuccess: (res: any) => {
      setStoreInfo({
        ...storeInfo,
        store_imgs: res.data,
      });
    },
    onError: (err: any) => {
      console.error(err);
    },
    retry: false,
    enabled: props.storeId !== undefined,
  });

  return <>{props.children}</>;
}
