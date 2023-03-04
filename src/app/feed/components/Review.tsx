import { Grid } from "@components/Grid";
import { setReviewInfo } from "@store/review";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reviewType } from "../page";

interface props {
  reviewArr: reviewType[];
}
const Review: React.FC<props> = ({ reviewArr }) => {
  const rptier = useRouter();
  const dispatch = useDispatch();

  /* 방문 일지 */
  const onClickReview = (review: reviewType) => {
    dispatch(setReviewInfo(review));
    rptier.push("/feed/review");
  };

  return (
    <Grid isFeed>
      {reviewArr.map((review: reviewType) => (
        <Wrapper onClick={() => onClickReview(review)}>
          {review.reviewImg ? (
            <ReviewWrapper className="container">
              <img src={review.reviewImg} />
            </ReviewWrapper>
          ) : (
            <ReviewWrapper className="container">
              <img src="bread.png" id="bread" />
            </ReviewWrapper>
          )}
        </Wrapper>
      ))}
    </Grid>
  );
};
export default Review;
const Wrapper = styled.div``;
const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
`;
