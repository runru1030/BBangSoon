import { userInfoAtoms } from "@app/GlobalProvider";
import { StoreName, Wrapper } from "@components/Header";
import { faBreadSlice, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
import { storeInfoAtoms } from "../StoreInfoProvider";

interface props {
  isStoreImg?: boolean;
}
const Header: React.FC<props> = ({ isStoreImg }) => {
  const router = useRouter();
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);

  /* wish & visit */
  const [isVisit, setIsVisit] = useState(
    storeInfo.Visits
      ? storeInfo.Visits.findIndex(
          (i: { UserId: number }) => i.UserId == userAtom.id
        ) != -1
      : false
  );
  const [isWish, setIsWish] = useState(
    storeInfo.Wishes
      ? storeInfo.Wishes.findIndex(
          (i: { UserId: number }) => i.UserId == userAtom.id
        ) != -1
      : false
  );
  const onClickFeature = (e: React.MouseEvent): void => {
    if (!userAtom.id) return router.push("/auth/login");
    
    const {
      currentTarget: { id },
    } = e;
    switch (id) {
      case "visit":
        isVisit
          ? axios
              .delete(`/user/visit/${userAtom.id}/${storeInfo.id}`)
              .then((res) => res.data.success && setIsVisit(false))
          : axios
              .get(`/user/visit/${userAtom.id}/${storeInfo.id}`)
              .then((res) => res.data.success && setIsVisit(true));
        break;
      case "wish":
        isWish
          ? axios
              .delete(`/user/wish/${userAtom.id}/${storeInfo.id}`)
              .then((res) => res.data.success && setIsWish(false))
          : axios
              .get(`/user/wish/${userAtom.id}/${storeInfo.id}`)
              .then((res) => res.data.success && setIsWish(true));
        break;
    }
  };

  return (
    <StyledHeader>
      <StoreName>{storeInfo.name}</StoreName>
      <Wrapper>
        <span>{storeInfo.reviewCnt}</span>
        <span id="small">리뷰</span>
      </Wrapper>
      <Wrapper>
        <span>{storeInfo.avgStar?.toFixed(1)}</span>
        <span id="small">평점</span>
      </Wrapper>
      <FontAwesomeIcon
        id="visit"
        onClick={onClickFeature}
        icon={faBreadSlice}
        color={isVisit ? "#e2c26e" : "#bfbfbf"}
      />
      <FontAwesomeIcon
        id="wish"
        onClick={onClickFeature}
        icon={faHeart}
        color={isWish ? "#f89573" : "#bfbfbf"}
      />
    </StyledHeader>
  );
};
export default Header;
const StyledHeader = styled.header`
  position: sticky;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  top: 0px;
  font-size: medium;
  border-bottom: ${(props) => `solid thin` + props.theme.color.border_grey};
  background-color: white;
  color: #6f6f6f;
  z-index: 999;
  gap: 10px;
  box-sizing: border-box;
  #visit {
    flex: 0.1;
  }
`;
