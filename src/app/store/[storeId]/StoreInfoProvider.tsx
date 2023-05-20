import { strapiStoresApi } from "@lib/apis/Stores";
import { useQuery } from "@tanstack/react-query";
import { atom, createStore, Provider } from "jotai";
import React from "react";

export interface StoreImg {
  id: number;
  attributes: {
    url: string;
  };
}
export interface StrapiStoreType {
  store_id: number;
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
    store_id: 0,
    name: "",
    Reviews: [],
  }),
};

const StoreInfoStore = createStore();

export default function StoreInfoProvider(props: {
  children: React.ReactNode | React.ReactNode[];
  storeId: string;
}) {
  useQuery(["getStore"], {
    queryFn: async () => {
      return await strapiStoresApi.getStore(props.storeId);
    },
    onSuccess: (res: any) => {
      console.log(res.data);

      StoreInfoStore.set(storeInfoAtoms.storeAtom, {
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

  return <Provider store={StoreInfoStore}>{props.children}</Provider>;
}
