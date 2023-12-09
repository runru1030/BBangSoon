import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import styled from "styled-components";
import { StrapiStoreType, openedStoreInfoAtom, storeInfoAtoms } from "../StoreInfoProvider";

const MenuInfo = () => {
  const storeInfo: StrapiStoreType = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);

  return (
    <Wrapper>
      <Label
        id="menu"
        onClick={() => setOpenedStoreInfo("menu")}
        className={clsx(openedStoreInfo === "menu" ? "text-blue" : "")}
      >
        메뉴
      </Label>
      {openedStoreInfo === "menu" && (
        <div>
          {storeInfo.Menus?.map((menu: any) => (
            <Label key={menu.tit}>
              <span id="tit">{menu.tit}</span>
              <span id="price">{menu.price}</span>
            </Label>
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default MenuInfo;
const Wrapper = styled.div``;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  span {
    flex: 1;
  }
  #tit {
    color: #636363;
    font-weight: lighter;
  }
  #price {
    flex: 1;
    text-align: end;
    color: #46a6ff;
  }
`;
