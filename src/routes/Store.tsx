import { faBreadSlice, faGlobe, faHeart, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Grid from "../component/Grid";
import Map from "../component/Map";
import Nav from "../component/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReviewList from "../component/ReviewList";
import ReviewForm from "../component/ReviewForm";
import { setStoreInfo } from "../modules/store";

const Store = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userObj, isLoggedin } = useSelector((state: any) => ({
        userObj: state.user.userObj,
        isLoggedin: state.user.isLoggedin,
    }))

    const location = useSelector((state: any) => state.user.location);
    const [curLoc, setCurLoc] = React.useState<loc>({ title: "", y: location.y, x: location.x });   //내 위치

    const storeInfo: storeObj = useSelector((state: any) => state.store.storeObj);

    /* wish & visit */
    const [isVisit, setIsVisit] = useState(storeInfo.Visits ? storeInfo.Visits.findIndex((i: any) => i.UserId == userObj.id) != -1 : false);
    const [isWish, setIsWish] = useState(storeInfo.Wishes ? storeInfo.Wishes.findIndex((i: any) => i.UserId == userObj.id) != -1 : false);
    const onClickFeature = (id: string) => {
        if (!isLoggedin) {
            history.push("/auth");
        }
        else {
            if (id == "visit") {
                isVisit ?
                    axios.delete(`/user/visit/${userObj.id}/${storeInfo.id}`).then(res => res.data.success && setIsVisit(false))
                    :
                    axios.get(`/user/visit/${userObj.id}/${storeInfo.id}`).then(res => res.data.success && setIsVisit(true))
            }
            else {
                isWish ?
                    axios.delete(`/user/wish/${userObj.id}/${storeInfo.id}`).then(res => res.data.success && setIsWish(false))
                    :
                    axios.get(`/user/wish/${userObj.id}/${storeInfo.id}`).then(res => res.data.success && setIsWish(true))
            }
        }
    }

    /* 아코디언 feature */
    const [isOpen, setIsOpen] = useState({
        map: false,
        detail: true,
        menu: false,
        review: false,
    })
    const onClick = (label: string) => {
        setIsOpen({
            map: false,
            detail: false,
            menu: false,
            review: false,
            [label]: true
        })
    }

    /* 리뷰 작성 */
    const [isWrite, setIsWrite] = useState(false);
    const onClickWrite = () => {
        isLoggedin ? setIsWrite(false) : history.push("/auth")
        setIsWrite(prev => !prev);
    }

    /* store 정보 REST API*/
    useEffect(() => {

        axios.post(`/storeCrawl`, storeInfo).then(res => {
            dispatch(setStoreInfo({ ...storeInfo, ...res.data }));

        })
        const update = setInterval(() => {
            axios.post(`/storeCrawl`, storeInfo).then(res => {
                dispatch(setStoreInfo({ ...storeInfo, ...res.data }));
            })
        }, 10000);
        return () => {
            clearInterval(update);
        }
    }, [])

    return (<>
        <Header >
            <span id="storeName">{storeInfo.storeName}</span>
            <div>
                <span>{storeInfo.reviewCnt}</span>
                <span id="small">리뷰</span>
            </div>
            <div>
                <span>{storeInfo.avgStar?.toFixed(1)}</span>
                <span id="small">평점</span>
            </div>
            <FontAwesomeIcon onClick={() => onClickFeature("visit")} icon={faBreadSlice} color={isVisit ? "#e2c26e" : "#bfbfbf"} id="visit" />
            <FontAwesomeIcon onClick={() => onClickFeature("wish")} icon={faHeart} color={isWish ? "#f89573" : "#bfbfbf"} id="wish" />
        </Header>

        <div className="store">
            {/* 크롤링 로딩 view */
                (!storeInfo.Reviews || storeInfo.Reviews.length == 0) && <Loding>
                    <img width="50%" src="loding.gif" />
                    <span>외부 사이트로부터 데이터를 가져오는 중 입니다</span>
                </Loding>}
            {/* store Image view */}
            <div className="img-viewer">
                {storeInfo.StoreImgs?.length == 1 && <Grid imgArr={[{ url: storeInfo.StoreImgs[0].imageUrl }]} />}
                {storeInfo.StoreImgs?.length == 2 && <Grid imgArr={[{ url: storeInfo.StoreImgs[0].imageUrl }, { url: storeInfo.StoreImgs[1].imageUrl }]} />}
                {storeInfo.StoreImgs?.length == 3 && <Grid imgArr={[{ url: storeInfo.StoreImgs[0].imageUrl }, { url: storeInfo.StoreImgs[1].imageUrl }, { url: storeInfo.StoreImgs[2].imageUrl }]} />}
                {storeInfo.StoreImgs?.length == 0 && <div className="non-img">
                    <img src="bread.png" width="40%" />
                    <span>{storeInfo.storeName}</span>
                </div>}
            </div>
            {/* store info view */}
            <div>
                <Label onClick={(event) => onClick("detail")} style={isOpen.detail ? { "color": "#46A6FF" } : undefined}>상세정보</Label>
                {isOpen.detail && <Container className="detail">
                    <div>
                        <span id="label"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                        <span>{storeInfo.address}</span>
                    </div>
                    <div>
                        <span id="label"><FontAwesomeIcon icon={faPhoneAlt} /></span>
                        <a href={"tel:" + storeInfo.telephone}>{storeInfo.telephone}</a>
                    </div>
                    {storeInfo.site && <div>
                        <span id="label"><FontAwesomeIcon icon={faGlobe} /></span>
                        <a href={"https://" + storeInfo.site}>{storeInfo.site}</a>
                    </div>}
                </Container>}
            </div>
            {/* store's map view */}
            <div>
                <Label onClick={(event) => onClick("map")} style={isOpen.map ? { "color": "#46A6FF" } : undefined}>지도
                    {isOpen.map && <div className="navi-wrapper">
                        <a href={"https://map.kakao.com/link/roadview/" + storeInfo.id} id="navi">
                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#46A6FF" />
                            <span>길찾기</span></a>
                    </div>}
                </Label>
                {isOpen.map && <div className="map">
                    <Map loc={{
                        title: storeInfo.storeName || "",
                        y: storeInfo.y,
                        x: storeInfo.x,
                    }} setLoc={null} curLoc={curLoc} markerArr={[{ ...storeInfo, place_name: storeInfo.storeName, address_name: storeInfo.address }]} />
                </div>}
            </div>
            {/* store's menu view */}
            <div>
                <Label onClick={(event) => onClick("menu")} style={isOpen.menu ? { "color": "#46A6FF" } : undefined}>메뉴</Label>
                {isOpen.menu && <div>
                    {storeInfo.Menus?.map((menu: any) => <Label className="list">
                        <span id="tit">{menu.tit}</span>
                        <span id="price">{menu.price}</span>
                    </Label>)}
                </div>}
            </div>
            {/* store's review view */}
            <div className="review-wrapper">
                <Label onClick={(event) => onClick("review")} style={isOpen.review ? { "color": "#46A6FF" } : undefined}>
                    <span>리뷰</span>
                    <span onClick={onClickWrite} id="side">{isWrite ? "취소" : "작성하기"}</span>
                </Label>
                {/* writing review's form */}
                {isWrite && <ReviewForm storeId={storeInfo.id} setIsWrite={setIsWrite} />}
                {isOpen.review && storeInfo.Reviews && <div>
                    {storeInfo.Reviews.map((review: any) => <ReviewList review={review} userId={userObj.id} />)}
                </div>}
            </div>
            <Nav />
        </div>
    </>)
}
export default Store;
type storeObj = {
    id: number,
    address: string | null,
    storeName: string | null,
    telephone: string | null,
    site: string | null,
    x: number,
    y: number,
    reviewCnt: number | null,
    avgStar: number | null,
    Reviews: [] | null,
    Visits: [] | null,
    Wishes: [] | null,
    StoreImgs: any[] | null,
    Menus: [] | null,
}
type loc = {
    title: string,
    y: number,
    x: number,
}
const Header = styled.header`
position: sticky;
z-index:999;
top: 0;
width: 100%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
padding: 10px 20px ;
gap: 10px;
border-bottom: solid thin #eeeeee;
box-sizing: border-box;
#storeName{
    flex: 0.7;
}
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
    margin-top: 10px;
    color: #636363;
}
div>#small{
    font-size: xx-small;
}
div, #visit{
    flex: 0.1;
}

`
const Label = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #eeeeee;
  display: flex;
  align-items: center;
span{
    flex:1;
}
#side{
    flex: 0.2;
}
`
const Container = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #eeeeee;
`
const Loding = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
position: fixed;
background-color: #ffffffda;
top: 0;
z-index: 10000;
img{
    margin-top: 150px;
}
span{
    margin-top: 50px;
}
`