"use client";

import axios from "axios";
import { atom, Provider, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { DevTools } from "jotai-devtools";

interface user {
  id: number | null;
  userName: string;
  kakaoToken?: string;
}
interface location {
  si: string;
  y: number;
  x: number;
}
export const userInfoAtoms = {
  userAtom: atom<user>({
    id: null,
    userName: "",
  }),
  locationAtom: atom<location>({
    si: "서울",
    y: 37.556428224476505,
    x: 126.97150576481177,
  }),
};

export default function GlobalProvider(props: { children: React.ReactNode }) {
  const setLocationAtom = useSetAtom(userInfoAtoms.locationAtom);
  const geolocationPositionCallback = async (position: GeolocationPosition) => {
    try {
      const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
          },
          params: {
            y: position.coords.latitude,
            x: position.coords.longitude,
          },
        }
      );
      setLocationAtom({
        si: data.documents[0].address.region_1depth_name,
        y: position.coords.latitude,
        x: position.coords.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geolocationPositionCallback);
  }, []);

  return (
    <Provider>
      <DevTools />
      {props.children}
    </Provider>
  );
}
