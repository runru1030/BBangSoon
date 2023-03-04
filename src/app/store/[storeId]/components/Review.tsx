import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { DBStoreType } from "../page";
import ReviewForm from "@components/ReviewForm";
import ReviewList, { reviewProps } from "@components/ReviewList";
import { useRouter } from "next/navigation";
interface props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isOpen: {
    map: boolean;
    detail: boolean;
    menu: boolean;
    review: boolean;
  };
}
const Review: React.FC<props> = ({ onClick, isOpen }) => {
  const router = useRouter();
  const { userObj, isLoggedin } = useSelector((state: RootState) => ({
    userObj: state.user.userObj,
    isLoggedin: state.user.isLoggedin,
  }));

  const storeInfo: DBStoreType = useSelector(
    (state: RootState) => state.store.storeObj
  );

  /* 리뷰 작성 */
  const [isWrite, setIsWrite] = useState(false);
  const onClickWrite = () => {
    isLoggedin ? setIsWrite((prev) => !prev) : router.push("/auth");
  };

  return (
    <Wrapper>
      <Label
        id="review"
        onClick={onClick}
        style={isOpen.review ? { color: "#46A6FF" } : undefined}
      >
        <span>리뷰</span>
        <span onClick={onClickWrite} id="side">
          {isWrite ? "취소" : "작성하기"}
        </span>
      </Label>
      {isWrite && <ReviewForm storeId={storeInfo.id} setIsWrite={setIsWrite} />}
      {isOpen.review && storeInfo.Reviews && (
        <div>
          {storeInfo.Reviews.map((review: reviewProps["review"]) => (
            <ReviewList review={review} userId={userObj.id} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default Review;
const Wrapper = styled.div``;
const Label = styled.div<{ path?: string }>`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  span {
    flex: 1;
  }
  #side {
    flex: 0.2;
    text-align: end;
    font-size: xx-small;
    color: #6f6f6f;
  }
`;
