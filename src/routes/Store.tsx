import { faBreadSlice, faGlobe, faMapMarkedAlt, faMapMarkerAlt, faPhone, faPhoneAlt, faPlus, faRoute, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react"
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Grid from "../component/Grid";
import Map from "../component/Map";
import Nav from "../component/Nav";
import ImgModal from "../component/ImgModal";
const Store = () => {
    const storeInfo = JSON.parse(window.localStorage.getItem("store") || "");

    const [store, setStore] = useState<any>({});
    const [reviewImg, setReviewImg]=useState(null);
    const location = window.localStorage.getItem("location")?JSON.parse(window.localStorage.getItem("location")||""):
    {si: "서울",
    gu: "",
    dong: "",
    latitude: 37.5283169,
    longitude: 126.9294254,
    detail: ""};
    const [curLoc, setCurLoc] = React.useState({ title: "", lat: location.latitude, lng: location.longitude } as {
        title: string,
        lat: number,
        lng: number,
    });
    const [isOpen, setIsOpen] = useState({
        map: false,
        detail: true,
        menu: false,
        review: false,
    })
    const [isWrite, setIsWrite]=useState(false);
    const [newReview, setNewReview]=useState({
        content:"",
        star:0,
        attach:"",
        nickName:"익명",
    } as {content:string,
    star:number,
    attach:any,
    nickName:string})
    const onClickWrite = () => {
        setIsWrite(prev=>!prev);
    }
    const onClickStar = (idx:string) => {
        setNewReview({...newReview, star:parseInt(idx)});
    }
    const onClick = (label: string) => {
        setIsOpen({
            map: false,
            detail: false,
            menu: false,
            review: false,
            [label]: true
        })
        if(!isOpen.review)setIsWrite(false);
    }
    const onSubmit=(event:any)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('reviewImg', reviewImg||"");
        formData.append('content',newReview.content);
        formData.append('nickName',newReview.nickName);
        formData.append('star', newReview.star.toString());
        axios.post(`/store/review/${store.id}`,formData).then(res=>{
            setStore(res.data);
            window.localStorage.setItem("store", JSON.stringify({...store, ...res.data}))
           
        })
        setNewReview({
            content:"",
            star:0,
            attach:"",
            nickName:"익명",
        })
        setReviewImg(null);
        setIsWrite(false);
    }
    const onFileChange=(e:any)=>{
        const { target: { files } } = e;
        const theFile = files[0];
        setReviewImg(files[0])
        
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            setNewReview({...newReview,attach:finishedEvent.target?.result||""})
        };
        reader.readAsDataURL(theFile);
    }
    useEffect(()=>{
        axios.post(`/store/${storeInfo.id}`).then(res=>{
            setStore(res.data);
            console.log(res.data);
            
        })
        if(!storeInfo.Menus){
            const update = setInterval(()=>{
                axios.post(`/store/${storeInfo.id}`).then(res=>{
                    setStore(res.data);
                })
            },2000);
            return ()=>{
                clearInterval(update);
            }
            
    }
    },[])
        
    return (<>
        <div className="store">
        <Header >
        <span id="storeName">{storeInfo.storeName}</span>
        <div>
        <span>{store.reviewCnt}</span>
        <span id="small">리뷰</span>
        </div>
        <div>
        <span>{store.avgStar?.toFixed(1)}</span>
        <span id="small">평점</span>
        </div>
            <FontAwesomeIcon icon={faBreadSlice} color={ "#e2c26e"} id="visit"/>
    </Header>

            {!store.Reviews||store.Reviews.length<storeInfo.reviewCnt&&<Loding>
                <img width="50%" src="loding.gif"/>
                
                <span>외부 사이트로부터 데이터를 가져오는 중 입니다</span>
                </Loding>}
            <div className="img-viewer">
                {store.StoreImgs?.length==1&&<Grid imgArr={[{url: store.StoreImgs[0].imageUrl}]}/>}
                {store.StoreImgs?.length==2&&<Grid imgArr={[{url: store.StoreImgs[0].imageUrl},{url: store.StoreImgs[1].imageUrl}]}/>}
                {store.StoreImgs?.length==3&&<Grid imgArr={[{url: store.StoreImgs[0].imageUrl}, {url: store.StoreImgs[1].imageUrl}, {url: store.StoreImgs[2].imageUrl}]}/>}
                {store.StoreImgs?.length==0&&<div className="non-img">
                    <img src="bread.png" width="40%"/>
                    <span>{storeInfo.storeName}</span>
                    </div>}
                
            </div>
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
                    {store.site&&<div>
                        <span id="label"><FontAwesomeIcon icon={faGlobe} /></span>
                        <a href={"https://"+store.site}>{store.site}</a>
                    </div>}
                </Container>}
            </div>
            <div>
                <Label onClick={(event) => onClick("map")} style={isOpen.map ? { "color": "#46A6FF" } : undefined}>지도
                {isOpen.map&&<div className="navi-wrapper">
                    <a href={"https://map.kakao.com/link/roadview/" + storeInfo.id} id="navi"><img src="kakaoMap.png" width="20px"/><span>길찾기</span></a>
                    </div>}
                </Label>
                {isOpen.map && <div className="map">
                    <Map loc={{
                        title: store.storeName,
                        lat: store.y,
                        lng: store.x,
                    }} setLoc={null} curLoc={curLoc} markerArr={[{...store, place_name: store.storeName, address_name: store.address}]} />
                </div>}
            </div>
            
            <div>
                <Label onClick={(event) => onClick("menu")} style={isOpen.menu ? { "color": "#46A6FF" } : undefined}>메뉴</Label>
                {isOpen.menu && <div>
                    {store.Menus?.map((menu: any) => <Label className="list">
                        <span id="tit">{menu.tit}</span>
                        <span id="price">{menu.price}</span>
                    </Label>)}
                </div>}
            </div>
            <div className="review-wrapper">
                <Label onClick={(event) => onClick("review")} style={isOpen.review ? { "color": "#46A6FF" } : undefined}><span>리뷰</span><span onClick={onClickWrite} id="side">{isWrite?"취소":"작성하기"}</span></Label>
                {isWrite&&<>
                    <form onSubmit={onSubmit} className="review-form">
                        {newReview.attach&&<img src={newReview.attach} width="60%"/>}
                    <span id="star">
                                <FontAwesomeIcon id="1" icon={faBreadSlice} onClick={(event)=>onClickStar(event.currentTarget.id)} color={newReview.star >= 1 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon id="2" icon={faBreadSlice} onClick={(event)=>onClickStar(event.currentTarget.id)} color={newReview.star >= 2 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon id="3" icon={faBreadSlice} onClick={(event)=>onClickStar(event.currentTarget.id)} color={newReview.star >= 3 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon id="4" icon={faBreadSlice} onClick={(event)=>onClickStar(event.currentTarget.id)} color={newReview.star >= 4 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon id="5" icon={faBreadSlice} onClick={(event)=>onClickStar(event.currentTarget.id)} color={newReview.star >= 5 ? "#e2c26e" : "#cabfa3"} />
                            <span id="small">{newReview.star}</span>
                            <div className="wrapper">
                                    <label htmlFor="file">
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </label>
                                    <label htmlFor="submit" id="sbm-btn">
                                        <span>작성</span>
                                    </label>
                        </div>
                    
                            </span>
                        <TextareaAutosize id="content" placeholder="최대 300자 / 이미지 최대 1장" value={newReview.content} onChange={(event)=>setNewReview({...newReview, content:event.target.value.substring(0, 300)})} />
                        <input id="file" type="file" style={{"display": "none"}} onChange={onFileChange}/>
                        
                        <input id="submit" type="submit" value="제출" style={{"display": "none"}}/>
                    </form>
                </>}
                {isOpen.review && store.Reviews && <div>
                    {store.Reviews.map((review: any) => <List className="list review">
                        <div className="reviewImg">{review.reviewImg&&<ImgModal src={review.reviewImg}  width="200%"/>}</div>
                        <div className="star">
                            <span id="star">
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 1 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 2 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 3 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 4 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 5 ? "#e2c26e" : "#cabfa3"} />
                            </span>
                            <span>{review.star}</span>
                        </div>
                        <span id="">{review.content}</span>
                        <div className="detail">
                            <span id="nickName">{review.nickName}</span>
                            <span id="">{new Date(review.date).getFullYear()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getDate()}</span>
                        </div>
                    </List>)}
                </div>}
            </div>
            <Nav />
        </div>
    </>)
}
export default Store;

const Header = styled.header`
position: sticky;
top: 5px;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
height: 30px;
gap: 10px;
border-bottom: solid thin #eeeeee;
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
border-top: solid thin #dddddd;
  display: flex;
  align-items: center;
span{
    flex:1;
}
#side{
    flex: 0.2;
}
`
const List = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #dddddd;
  display: flex;
`
const Container = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #dddddd;
`
const Loding= styled.div`
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