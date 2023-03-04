import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import StoreList from "../../../components/StoreList";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
interface rankingState {
  id: number;
  place_name: string;
  reviewCnt: number;
  avgStar: number;
  totalStar: number;
}
const Ranking: React.FC = () => {
  /* location */
  // const location = useSelector((state: RootState) => state.user.location);

  /* ranking */
  const colorList = ["#FF764A", "#46A6FF", "#46A6FF"]; //ranking num's color
  const [reviewRank, setReviewRank] = useState<rankingState[]>([]); //ranking top 20's store Arr
  const [isMore, setIsMore] = useState(false);
  const onClickMore = () => {
    setIsMore(true);
  };

  // useEffect(() => {
  //   //위치기준 랭킹 top 20
  //   axios.get(`/store/rankReview/${location?.si}`).then((res) => {
  //     setReviewRank(res.data);
  //   });
  // }, [location]);

  return (
    <Wrapper className="col-container">
      <Label>랭킹</Label>
      {reviewRank.map(
        (store: rankingState, idx: number) =>
          (idx < 10 || isMore) && (
            <>
              <div className="row-container">
                <StoreList store={store}>
                  <RankNum color={idx < 3 ? colorList[idx] : "black"}>
                    {idx + 1}
                  </RankNum>
                </StoreList>
              </div>
              {idx == 9 && !isMore && (
                <Button onClick={onClickMore}>더보기</Button>
              )}
            </>
          )
      )}
    </Wrapper>
  );
};
export default Ranking;
const RankNum = styled.span`
  font-size: large;
  margin-left: 20px;
  color: ${(props) => props.color};
`;
const Wrapper = styled.div`
  width: 100%;
  margin-right: 0;
  margin-bottom: 100px;
`;
const Button = styled.button`
  align-items: center;
  width: 100%;
  text-align: center;
  flex: 1;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
  padding: 10px 0;
  font-size: small;
`;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: solid thin #eeeeee;
  width: 100%;
  box-sizing: border-box;
`;
