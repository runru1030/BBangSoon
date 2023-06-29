import { userInfoAtoms } from "@app/GlobalProvider";
import Map from "@components/Map";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { openedStoreInfoAtom } from "../PageContent";
import { storeInfoAtoms } from "../StoreInfoProvider";
const MapInfo = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);
  const location = useAtomValue(userInfoAtoms.locationAtom);

  return (
    <div className="border-b border-gray-1000">
      <div
        id="map"
        onClick={() => setOpenedStoreInfo("map")}
        className={clsx(
          "flex items-center p-3",
          openedStoreInfo === "map" ? "text-blue" : ""
        )}
      >
        지도
        {openedStoreInfo === "map" && (
          <div className="flex-1 flex justify-end">
            <Link
              href={`https://map.kakao.com/link/to/${storeInfo.name},${storeInfo.loc_y},${storeInfo.loc_x}`}
              id="navi"
              target="_blank"
              className="bg-gray-1100 text-xs flex items-center gap-1 px-2 py-1 rounded-2xl"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#46A6FF" />
              <span>길찾기</span>
            </Link>
          </div>
        )}
      </div>
      {openedStoreInfo === "map" && storeInfo.loc_x && storeInfo.loc_y && (
        <div>
          <Map
            loc={{
              title: storeInfo.name || "",
              y: storeInfo.loc_y,
              x: storeInfo.loc_x,
            }}
            setLoc={null}
            curLoc={{
              title: "",
              y: location.y,
              x: location.x,
            }}
            markerArr={[storeInfo]}
          />
        </div>
      )}
    </div>
  );
};
export default MapInfo;
