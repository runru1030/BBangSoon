import { userInfoAtoms } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";

const useAuth = () => {
  const jwtToken = JSON.parse(
    window.localStorage.getItem("token") || "null"
  )?.access_token;
  const setUserAtom = useSetAtom(userInfoAtoms.userAtom);
  const user = useAtomValue(userInfoAtoms.userAtom);
  const resetUserAtom = useResetAtom(userInfoAtoms.userAtom);

  useQuery(["getAuth"], {
    queryFn: async () => {
      return await axios.get("/api/auth", {
        headers: { Authorization: `${jwtToken}` },
      });
    },
    onSuccess: (res: any) => {
      setUserAtom(res.data.user);
    },
    onError: (err: any) => {
      console.log(err);
      resetUserAtom();
      window.localStorage.removeItem("token");
    },
    enabled: !!jwtToken,
    retry: false,
  });

  useEffect(() => {
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = `${jwtToken}`;
    }
  }, [jwtToken]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return;
};

export default useAuth;
