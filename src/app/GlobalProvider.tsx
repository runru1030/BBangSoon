"use client";

import useAuth from "@components/hooks/useAuth";
import useGeoLocation from "@components/hooks/useGeoLocation";
import { atom, Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { atomWithReset } from "jotai/utils";
import React from "react";

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
  userAtom: atomWithReset<user>({
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
  useAuth();
  useGeoLocation();
  return (
    <Provider>
      <DevTools />
      {props.children}
    </Provider>
  );
}
