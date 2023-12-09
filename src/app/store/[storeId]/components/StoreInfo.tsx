import {
  faGlobe,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import styled from "styled-components";
import { openedStoreInfoAtom, storeInfoAtoms } from "../StoreInfoProvider";

const StoreInfo = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);

  return (
    <div className="border-b border-gray-1000">
      <div
        id="detail"
        onClick={() => setOpenedStoreInfo("detail")}
        className={clsx(
          "flex items-center p-3",
          openedStoreInfo === "detail" ? "text-blue" : ""
        )}
      >
        상세정보
      </div>
      {openedStoreInfo === "detail" && (
        <DetailDiv className="col-container">
          <div>
            <span className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
            <span>{storeInfo.road_address_name}</span>
          </div>
          <div>
            <span className="icon">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </span>
            <a href={"tel:" + storeInfo.phone}>{storeInfo.phone}</a>
          </div>

          {storeInfo.store_url && (
            <div>
              <span className="icon">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              <Link
                href={storeInfo.store_url}
                target="_blank"
                className="truncate w-full"
              >
                {storeInfo.store_url}
              </Link>
            </div>
          )}
        </DetailDiv>
      )}
    </div>
  );
};
export default StoreInfo;
const DetailDiv = styled.div`
  div {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    font-weight: lighter;
    font-size: small;
  }
  & > div:nth-child(1) {
    border: none;
  }
  .icon {
    color: #b3b3b3;
    margin-right: 10px;
    font-size: medium;
  }
`;
