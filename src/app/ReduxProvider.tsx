"use client";

import reduxStore from "@store/index";
import React from "react";
import { Provider } from "react-redux";

// TODO 제거하고 Jotai Provider 추가하기
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
