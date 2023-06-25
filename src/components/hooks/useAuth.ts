import { userInfoAtoms } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [jwtToken, setJwtToken] = useState(null);

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
      console.error(err);
      resetUserAtom();
      window.localStorage.removeItem("token");
    },
    enabled: !!jwtToken,
    retry: false,
  });

  useEffect(() => {
    const token = JSON.parse(
      window?.localStorage.getItem("token") || "null"
    )?.access_token;

    if (token) {
      setJwtToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  return;
};

export default useAuth;
