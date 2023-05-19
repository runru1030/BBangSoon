"use client";
import { userInfoAtoms } from "@app/GlobalProvider";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Header } from "../../components/Header";
import LocList from "../../components/LocList";
import Ranking from "./components/Ranking";
import SearchStore from "./components/SearchStore";
export interface resultState extends StrapiStoreType {
  category_group_code: string;
  category_name: string;
}
const PageContent = () => {
  const location = useAtomValue(userInfoAtoms.locationAtom);
  const [changeLocMode, setChangeLocMode] = useState(false);

  return (
    <>
      <Header onClick={() => setChangeLocMode(true)}>
        <FontAwesomeIcon icon={faMapMarkerAlt} /> {location?.si}
      </Header>

      <div className={clsx(changeLocMode ? "hidden" : "visible")}>
        <SearchStore />
        <Ranking />
      </div>

      <div className={clsx(changeLocMode ? "visible" : "hidden")}>
        <LocList setChangeLocMode={setChangeLocMode} />
      </div>
    </>
  );
};
export default PageContent;
