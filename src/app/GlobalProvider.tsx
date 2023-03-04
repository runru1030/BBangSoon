"use client";

import { setLocationInfo } from "@store/user";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// interface GlobalUserState extends UserResponseBody {
//   setUser: (user: Omit<GlobalUserState, "setUser" | "reset">) => void;
//   reset: () => void;
// }

// const initUserState: UserResponseBody = {
//   userId: "",
//   email: "",
//   name: "",
//   emailVerified: false,
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// export const useGlobalUserStore = create(
//   persist<GlobalUserState>(
//     (set) => ({
//       ...initUserState,
//       setUser: (user) => set(user),
//       reset: () => set(initUserState),
//     }),
//     {
//       name: "GlobalUser",
//     },
//   ),
// );


export default function GlobalProvider(props: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    /* GPS */
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
          },
          params: {
            y: position.coords.latitude,
            x: position.coords.longitude,
          },
        })
        .then((res) => {
          dispatch(
            setLocationInfo({
              si: res.data.documents[0].address.region_1depth_name,
              y: position.coords.latitude,
              x: position.coords.longitude,
            })
          );
        });
    });
  }, []);
  return <>{props.children}</>;
}
