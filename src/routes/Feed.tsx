import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList from '../component/StoreList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setLoggedInfo } from '../modules/user';
import { setReviewInfo } from '../modules/review';
const Feed = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userObj } = useSelector((state: any) => ({ userObj: state.user.userObj, }))
  const { isLoggedin } = useSelector((state: any) => ({ isLoggedin: state.user.isLoggedin }))

  const [reviewArr, setReviewArr] = useState<any[]>([])     //유저의 리뷰arr

  /* 방문 일지 */
  const onClickReview = (review: any | null) => {
    dispatch(setReviewInfo(review));
    history.push("/feed/review");
  }

  /* 순례 리스트 */
  const [isDetailVisit, setIsDetailVisit] = useState<boolean>(false);
  const [visitId, setVisitId] = useState<any[]>([])   //유저의 순례리스트 매장 ID 
  const [visitArr, setVisitArr] = useState<any[]>([]) //
  const onClickVisit = () => {
    axios.post(`/store/list`, visitId)
      .then(res => {
        setVisitArr(res.data)
      })
  }

  /* Logout */
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLImageElement>(null);
  const onClicName = () => {
    setIsOpenModal(true);
  }
  const onClickLogout = () => {
    axios.post("/auth/logout").then(res => {
      if (res.status == 200) {
        dispatch(setLoggedInfo(userObj, false));
        window.localStorage.removeItem("token");
        history.push("/")
      }
    })
  }
  //외부영역 클릭 감지
  const handleClickOutside = (event: any) => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
      setIsOpenModal(false);
    }
    else {
      setIsOpenModal(true);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })


  useEffect(() => {
    //로그인 처리
    !isLoggedin && history.push("/auth");
    axios.get(`/user/feed/${userObj.id}`).then(res => {
      setReviewArr(res.data.Reviews)
      setVisitId(res.data.Visits.map((it: any) => (it.StoreId)))
    })
  }, [])

  const onClickFeed = () => {
    setIsDetailVisit(false);
  }
  return (
    <div className="feed container">
      <Header className="row-container"><>
            <span onClick={onClicName}>{userObj.nickName}</span>
            {isOpenModal && 
            <div className="logout-modal" ref={wrapperRef}>
              <span onClick={onClickLogout} >로그아웃</span>
              <span>닉네임 변경</span>
              </div>}

            <div className="row-container content" >
              <div className="col-container" onClick={onClickFeed} >
                <span id="bold">{reviewArr.length}</span>
                <span>일지</span>
              </div>
              <div className="row-container visit" onClick={onClickVisit} >
                <span><FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" /></span>
                <span id="text">{visitId.length}</span>
              </div>
            </div>
          </>
      </Header>
      <Label>{isDetailVisit ? "순례 리스트" : "방문 일지"}</Label>
        {isDetailVisit ?
          /* 순례 리스트 page */
          <>{visitArr.map((store: any) => <StoreList store={store} />)}</>
          :
          /* 일지 page */
          <Grid>
            {reviewArr.map((review: any) => <div onClick={() => onClickReview(review)}>
              {review.reviewImg ? <div className="container"><img src={review.reviewImg} /></div> : <div className="container"><img src="bread.png" id="bread" /></div>}</div>)}
          </Grid>
        }
        <Nav />
    </div>)
}
export default Feed;
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
const Header = styled.header`
width: 90%;
position: sticky;
background-color: white;
padding: 10px 20px;
top: 0px;
border-bottom: solid thin #eeeeee;
color: #6f6f6f;
.col-container{
  justify-content: center;
  align-items: center;
  font-size: x-small;
}
.row-container{
  gap: 10px;
}
#bold{
  font-weight: bold;
  font-size: large;
}
.content{
  flex: 1;
  justify-content: flex-end;
}
.visit{
  margin-left: 20px;
  font-size: x-large;
  align-items: center;
  margin-bottom: 5px;
}
.visit #text{
  position: absolute;
  right: 20px;
  transform: translate(-100%);
  color: white;
  font-size: medium;
}

`
const Label = styled.div`
font-size: medium;
padding: 15px;
display: flex;
align-items: center;
justify-content: center;
border-bottom: solid thin #eeeeee;
width: 90%;
`
const Grid = styled.div`
display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 33vw);
  grid-auto-rows: 33vw;
  gap: 1px;
  >div{
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: solid thin #e9e9e9;
}
img{
  width: 40vw;
  object-fit: cover;
}
#bread{
  width: 50%;
}
`

