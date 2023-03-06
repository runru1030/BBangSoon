import { userInfoAtoms } from "@app/GlobalProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useAuthKakao = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams?.get("code");

  const setUserAtom = useSetAtom(userInfoAtoms.userAtom);
  const resetUserAtom = useResetAtom(userInfoAtoms.userAtom);

  const getKakaoToken = useMutation({
    mutationFn: async (code: string) => {
      const data = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_KEY || "",
        redirect_uri: "http://localhost:3000/auth/login",
        code,
      };
      const queryString = Object.keys(data)
        .map((key) => `${key}=${data[key as keyof typeof data]}`)
        .join("&");
      return await axios.post(
        "https://kauth.kakao.com/oauth/token",
        queryString,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
    },
    onSuccess: (res: any) => {
      putKakaoTokenToServer.mutate(res.data.access_token);
    },
    retry: false,
  });

  const putKakaoTokenToServer = useMutation({
    mutationFn: async (token: string) => {
      return await axios.put("/api/auth/kakao", {
        access_token: token,
      });
    },
    onSuccess: (res: any) => {
      const { jwt, user } = res.data;

      if (res.status == 201 || res.status == 200) {
        setUserAtom(user);
        window.localStorage.setItem(
          "token",
          JSON.stringify({
            access_token: jwt,
          })
        );
        axios.defaults.headers.common["Authorization"] = `${jwt}`;
        router.push("/home");
      } else {
        window.alert("로그인에 실패하였습니다.");
        resetUserAtom();
      }
    },
  });

  useEffect(() => {
    if (query) {
      getKakaoToken.mutate(query);
    }
  }, [query]);
  return {
    isLoading: getKakaoToken.isLoading || putKakaoTokenToServer.isLoading,
  };
};

export default useAuthKakao;
