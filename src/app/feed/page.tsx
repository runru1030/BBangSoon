"use client";
import { userInfoAtoms } from "@app/GlobalProvider";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import StoreList, { StrapiStoreType } from "../../components/StoreItem";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
import HeaderCmp from "./components/HeaderCmp";

export interface reviewType {
  id: number;
  star: number;
  content: string;
  date: Date;
  reviewImg: string | null;
  StoreId: number;
}
const Page = () => {
  const router = useRouter();
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const [reviewArr, setReviewArr] = useState<reviewType[]>([]); //유저의 리뷰arr

  /* 순례 리스트 */
  const [isDetailVisit, setIsDetailVisit] = useState(false);
  const [visitId, setVisitId] = useState<number[]>([]); //유저의 순례리스트 매장 ID
  const [visitArr, setVisitArr] = useState<StrapiStoreType[]>([]); //유저의 순례리스트 매장

  /* 순례 리스트 */
  const onClickHandler = (event: React.MouseEvent): void => {
    event.currentTarget.id == "visit"
      ? axios.post(`/store/list`, visitId).then((res) => {
          setVisitArr(res.data);
          setIsDetailVisit(true);
        })
      : setIsDetailVisit(false);
  };

  useEffect(() => {
    //로그인 처리
    !userAtom.id && router.push("/auth/login");
    axios.get(`/user/feed/${userAtom.id}`).then((res) => {
      setReviewArr(res.data.Reviews);
      setVisitId(res.data.Visits.map((it: { StoreId: number }) => it.StoreId));
    });
  }, []);

  return (
    <>
      <HeaderCmp
        reviewArr={reviewArr}
        visitCnt={visitId.length}
        onClickHandler={onClickHandler}
      />
      <Label>{isDetailVisit ? "순례 리스트" : "방문 일지"}</Label>
      {/* {isDetailVisit ? (
        visitArr.map((store: StrapiStoreType) => <StoreList store={store} />)
      ) : (
        <Review reviewArr={reviewArr} />
      )} */}
    </>
  );
};
export default Page;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
