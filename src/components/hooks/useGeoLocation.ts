import { userInfoAtoms } from "@app/GlobalProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const setLocationAtom = useSetAtom(userInfoAtoms.locationAtom);
  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
  );

  useQuery(["getLocation"], {
    queryFn: async () =>
      await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
          },
          params: {
            y: position?.coords.latitude,
            x: position?.coords.longitude,
          },
        }
      ),
    onSuccess: ({ data }: any) => {
      setLocationAtom({
        si: data.documents[0].address.region_1depth_name,
        y: position?.coords.latitude || 0,
        x: position?.coords.longitude || 0,
      });
    },
    onError: (error) => {
      console.error(error);
    },
    enabled: position !== undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
  }, []);

  return;
};

export default useGeoLocation;
