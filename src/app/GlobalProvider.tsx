"use client";

import useAuth from "@components/hooks/useAuth";
import useGeoLocation from "@components/hooks/useGeoLocation";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import React from "react";

interface user {
  id: number;
  email: string | null;
  userName: string;
  kakaoToken?: string;
}
export interface location {
  si: string;
  y: number;
  x: number;
}
export const userInfoAtoms = {
  userAtom: atomWithReset<user>({
    id: 0,
    email: null,
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
    <>
      {/* <DevTools /> */}
      {props.children}
    </>
  );
}
