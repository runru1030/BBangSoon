
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList from '../component/StoreList';
import {  useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import StarCmp from '../component/StarCmp';
import { ReviewCmp } from '../assets/styles/global-style';
const Review = () => {
  const history = useHistory();
  const { review } = useSelector((state: any) => ({ review: state.review.review, }))
  const [store, setStore] = useState<any>({});              // DetailReview's store

  const onClickDel = () => {
    axios.delete(`/store/review/${review.id}`).then(() => {
      history.push("/feed");
    }
    );
  }
  useEffect(() => {
    axios.post(`/store/${review.StoreId}`).then(res => setStore(res.data))

  }, [])
  return (
    <Detail className="review-detail">
      <StoreList store={store} />
      {review.reviewImg && <div className="img-wrapper"><img src={review.reviewImg} /></div>}
      <ReviewCmp className="col-container">
      <div className="row-container wrapper">
            <StarCmp reviewStar={review.star}/>
          <span id="date">{new Date(review.date).getFullYear()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getDate()}</span>
          <span onClick={onClickDel} id="del-btn2">삭제</span>
        </div>
        <span id="content">{review.content}</span>
      </ReviewCmp>
      <Nav/>
    </Detail>
  )
}
export default Review;
const Detail = styled.div`
width: 100%;
.img-wrapper{
  width: 100vw;
  height: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-wrapper img{
  width: 100%;
  object-fit: cover;
}
#del-btn2{
    margin-left: 10px;
    font-size: small;
    color: #aaaaaa;
}
#date{
  flex: 1;
  text-align: end;
  font-weight: lighter;
}
`

