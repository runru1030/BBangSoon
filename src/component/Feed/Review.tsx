import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setReviewInfo } from '../../modules/review';
import { reviewType } from '../../routes/Feed';
import styled from 'styled-components';
import { Grid } from '../Grid';

interface props {
    reviewArr: reviewType[],
}
const Review: React.FC<props> = ({ reviewArr }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    /* 방문 일지 */
    const onClickReview = (review: reviewType) => {
        dispatch(setReviewInfo(review));
        history.push("/feed/review");
    }

    return (
        <Grid isFeed>
            {reviewArr.map((review: reviewType) =>
                <Wrapper onClick={() => onClickReview(review)}>
                    {review.reviewImg ?
                        <ReviewWrapper className="container"><img src={review.reviewImg} /></ReviewWrapper>
                        :
                        <ReviewWrapper className="container"><img src="bread.png" id="bread" /></ReviewWrapper>}</Wrapper>
            )}
        </Grid>
    )
}
export default Review;
const Wrapper=styled.div``
const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;

`

