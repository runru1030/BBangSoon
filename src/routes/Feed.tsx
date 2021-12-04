import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import HeaderCmp from '../component/Feed/HeaderCmp';
import Review from '../component/Feed/Review';
import Nav from '../component/Nav';
import StoreList, { StoreType } from '../component/StoreList';
import { RootState } from '../modules';

export interface reviewType {
  id: number,
  star: number,
  content: string,
  date: Date,
  reviewImg: string | null,
  StoreId: number
}
const Feed: React.FC = () => {
  const history = useHistory();
  const { userObj } = useSelector((state: RootState) => ({ userObj: state.user.userObj, }))
  const { isLoggedin } = useSelector((state: RootState) => ({ isLoggedin: state.user.isLoggedin }))
  const [reviewArr, setReviewArr] = useState<reviewType[]>([]) //유저의 리뷰arr

  /* 순례 리스트 */
  const [isDetailVisit, setIsDetailVisit] = useState(false);
  const [visitId, setVisitId] = useState<number[]>([])   //유저의 순례리스트 매장 ID 
  const [visitArr, setVisitArr] = useState<StoreType[]>([]) //유저의 순례리스트 매장


  /* 순례 리스트 */
  const onClickHandler = (event: React.MouseEvent): void => {
    event.currentTarget.id == 'visit' ?
      axios.post(`/store/list`, visitId)
        .then(res => {
          setVisitArr(res.data);
          setIsDetailVisit(true);
        })
      : setIsDetailVisit(false);
  }

  useEffect(() => {
    //로그인 처리
    !isLoggedin && history.push("/auth");
    axios.get(`/user/feed/${userObj.id}`).then(res => {
      setReviewArr(res.data.Reviews)
      setVisitId(res.data.Visits.map((it: { StoreId: number }) => (it.StoreId)))
    })
  }, []);

  return (
    <>
      <HeaderCmp reviewArr={reviewArr} visitCnt={visitId.length} onClickHandler={onClickHandler} />
      <Label>{isDetailVisit ? "순례 리스트" : "방문 일지"}</Label>
      {isDetailVisit ?
        visitArr.map((store: StoreType) => <StoreList store={store} />)
        :
        <Review reviewArr={reviewArr} />}
        <Nav/>
    </>)
}
export default Feed;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing:border-box;
`