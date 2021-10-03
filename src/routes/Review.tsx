
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList from '../component/StoreList';
import {  useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
      <div className="col-container content">
        <div className="top-wrapper row-container">
          <span id="star" className="row-container">
            <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 1 ? "#e2c26e" : "#cabfa3"} />
            <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 2 ? "#e2c26e" : "#cabfa3"} />
            <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 3 ? "#e2c26e" : "#cabfa3"} />
            <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 4 ? "#e2c26e" : "#cabfa3"} />
            <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 5 ? "#e2c26e" : "#cabfa3"} />
          </span>
          <span id="date">{new Date(review.date).getFullYear()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getDate()}</span>
          <span onClick={onClickDel} id="del-btn">삭제</span>
        </div>
        <div className="top-wrapper">{review.content}</div>
      </div>
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
.content{
  padding: 15px;
  font-weight: lighter;
}
.content #date{
  font-size: small;
  color: #636363;
}
#del-btn{
    margin-left: 10px;
    font-size: small;
    color: #aaaaaa;
}
#star{
  gap: 5px;
  margin-right: 10px;
  font-size: large;
    background-color: #f3ecdc;
    padding: 5px 10px;
    border-radius: 5px;
}
#date{
  flex: 1;
  text-align: end;
  font-weight: lighter;
}
.top-wrapper{
  margin-bottom: 20px;
}
`

