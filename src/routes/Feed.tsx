import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBackspace, faBackward, faBreadSlice, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import StoreList from '../component/StoreList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setLoggedInfo } from '../modules/user';
const Feed = () => {
  const [reviewArr, setReviewArr] = useState<any[]>([])
  const [visitId, setVisitId] = useState<any[]>([])
  const [visitArr, setVisitArr] = useState<any[]>([])
  const { userObj } = useSelector((state: any) => ({ userObj: state.user.userObj, }))
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isDetailVisit, setIsDetailVisit] = useState<boolean>(false);
  const [review, setReview] = useState<any>({});
  const [store, setStore] = useState<any>({});
  const { isLoggedin } = useSelector((state: any) => ({
    isLoggedin: state.user.isLoggedin,
  }))
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    !isLoggedin && history.push("/auth");
    axios.get(`/user/feed/${userObj.id}`).then(res => {
      setReviewArr(res.data.Reviews)
      setVisitId(res.data.Visits.map((it: any) => (it.StoreId)))
      console.log(res.data.Visits.map((it: any) => (it.StoreId)));

    })
  }, [])
  const onClicName = () => {
    setIsOpenModal(true);
  }
  const onClick = (review: any | null) => {
    if (!isDetail) {
      axios.post(`/store/${review.StoreId}`).then(res => setStore(res.data))
      setIsDetail(true);
      setReview(review)
    }
    else {
      setIsDetail(false)
    }
  }
  const onClickVisit = () => {
    setIsDetail(false);
    axios.post(`/store/list`, visitId)
      .then(res => {
        setVisitArr(res.data)
        console.log(res.data);

      })
    setIsDetailVisit(true);
  }
  const onClickFeed = () => {
    setIsDetailVisit(false);
    setIsDetail(false)

  }
  const onClickLogout = () => {
    let token = JSON.parse(window.localStorage.getItem("token") || "");
    axios.post("/auth/logout", {
      Headers: { 'Authorization': `${token?.access_token}` }
    }).then(res => {
      if (res.status == 200) {
        dispatch(setLoggedInfo(userObj, false));
        window.localStorage.removeItem("token");
        history.push("/")
      }

    })

  }
  const wrapperRef = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  })
  const handleClickOutside = (event: any) => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
      setIsOpenModal(false);
    }
    else {
      setIsOpenModal(true);

    }
  }
  return (
    <div className="feed container">
      <Header className="row-container">
        {isDetail &&
          <span id="back" onClick={onClick}><FontAwesomeIcon icon={faArrowLeft} /></span>}
        <span onClick={onClicName}>{userObj.nickName}</span>
        {isOpenModal && <div className="logout-modal" onClick={onClickLogout} ref={wrapperRef}>로그아웃</div>}
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
      </Header>

      {!isDetail ? <><Label>{isDetailVisit ? "순례 리스트" : "방문 일지"}</Label>
        {isDetailVisit ? <>{visitArr.map((store: any) => <StoreList store={store} />)}</> : <Grid>
          {reviewArr.map((review: any) => <div onClick={() => onClick(review)}>
            {review.reviewImg ? <div><img src={review.reviewImg} /></div> : <div><img src="bread.png" width="40%" /></div>
            }

          </div>)}
        </Grid>}
        <Nav />
      </> :
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
            </div>
            <div className="top-wrapper">{review.content}</div>

          </div>


        </Detail>

      }
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
}
.content #date{
  font-size: small;
  color: #636363;
}
#star{
  gap: 5px;
  margin-right: 10px;
  font-size: large;
}
#date{
  flex: 1;
  text-align: end;
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
}`

