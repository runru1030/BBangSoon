import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList from '../component/StoreList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setLoggedInfo, setUserInfo } from '../modules/user';
import { setReviewInfo } from '../modules/review';
import { Grid, Header, Label } from '../assets/styles/global-style';
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
    setIsDetailVisit(true);
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

  /* 닉네임 변경 */
  const [editNick, setEditNick] = useState<boolean>(false);
  const [newNick, setNewNick] = useState({ nickName: "", valid: false, error: "" } as { nickName: string, valid: boolean, error: string });
  const onClickEditNick = () => {
    setEditNick(prev => !prev);
    setIsOpenModal(false);
  }
  const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valNick = /\s/g;
    if (valNick.test(event.target.value)) {
      setNewNick({ nickName: event.target.value, valid: false, error: "사용 불가" });
    }
    else {
      setNewNick({ nickName: event.target.value, valid: true, error: "사용 가능" });
    }
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newNick.nickName == "" || !newNick.valid) {
        throw new Error("조건을 확인 해주세요.");
      }
      axios.patch(`/user/nickName/${userObj.id}/${newNick.nickName}`).then((res) => {
        res.status == 200 && dispatch(setUserInfo({ ...userObj, nickName: newNick.nickName }));
        setEditNick(false);
        setNewNick({ nickName: "", valid: false, error: "" });
      });
    }
    catch (error: unknown) {

      if (error instanceof Error) {
        alert(error.message);
      }
    }
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
    <div className="feed">
      <Header className="row-container"><>
        <span onClick={onClicName}>{userObj.nickName}</span>
        {isOpenModal &&
          <Modal className="col-container" ref={wrapperRef}>
            <span onClick={onClickLogout} >로그아웃</span>
            <span onClick={onClickEditNick}>닉네임 변경</span>
          </Modal>}

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
      {/* 닉네임 변경 form*/}
      {editNick && <Form className="container" valid={newNick.valid}>
        <div className="col-container wrapper">
          <img src="bread.png" width="50px" />
          <span>닉네임 변경</span>
          <form className="col-container" onSubmit={onSubmit}>
            {<span id="valid">{newNick.error}</span>}
            <input type="text" value={newNick.nickName} onChange={onChangeNick} placeholder={userObj.nickName + "(10자 이하, 공백불가)"} maxLength={10} />
            <div className="row-container">
              <input type="submit" value="수정" />
              <span onClick={onClickEditNick} id="quit">취소</span></div>
          </form>
        </div>
      </Form>}
      <Label path={"feed"}>{isDetailVisit ? "순례 리스트" : "방문 일지"}</Label>
      {isDetailVisit ?
        /* 순례 리스트 page */
        <>{visitArr.map((store: any) => <StoreList store={store} />)}</>
        :
        /* 일지 page */
        <Grid isFeed={true}>
          {reviewArr.map((review: any) => <div onClick={() => onClickReview(review)}>
            {review.reviewImg ? <div className="container"><img src={review.reviewImg} /></div> : <div className="container"><img src="bread.png" id="bread" /></div>}</div>)}
        </Grid>
      }
      <Nav />
    </div>)
}
export default Feed;

const Form = styled.div<{ valid: boolean }>`
position: absolute;
z-index: 99;
background-color: #2b2b2b71;
width: 100%;
height: 100vh;

.wrapper{
  margin-top: 200px;
  background-color: white;
  padding: 30px 50px;
  align-items: center;
  border-radius: 20px;
  border:solid thin ${props=>props.theme.color.blue};
}
form{
  margin-top: 30px;
  align-items: center;
  input[type=text]{
    width: 100%;
    border:solid thin ${props => props.valid ? props.theme.color.blue : props.theme.color.red};
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 10px 15px;
  }
  input[type=submit]{
    all: unset;
    color: #46A6FF;
  }
  >div{
    gap:20px;
  }
  #quit{
    color: grey;
  }
  #valid{
    color:${props => props.valid ? props.theme.color.blue : props.theme.color.red};
    font-size: small;
    margin-bottom: 20px;
  }
}
`
const Modal=styled.div`
padding: 10px 15px;
gap: 10px;
border: solid thin ${props=> props.theme.color.blue};
position: absolute;
background-color: white;
margin-left: 60px;
margin-top: 30px;
border-radius: 5px;
font-size: medium;
font-weight: lighter;`


