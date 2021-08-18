import { faBreadSlice, faMapMarkedAlt, faMapMarkerAlt, faPhone, faPhoneAlt, faPlus, faRoute, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
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
type img={
    imageUrl:string
}
const StoreImg = () => {
    const storeInfo = JSON.parse(window.localStorage.getItem("store") || "");

    const [storeImgArr, setStoreImgArr] = useState<any>([]);
    
   
   
    useEffect(()=>{
        axios.post(`/store/image/${storeInfo.id}`).then(res=>{
            setStoreImgArr(res.data);
            console.log(res.data);
            
        })
    },[])
        
    return (<>
        <div className="store">
        <Header >
        <span id="storeName">{storeInfo.storeName}</span>
        <div>
        <span>{storeInfo.reviewCnt}</span>
        <span id="small">리뷰</span>
        </div>
        <div>
        <span>{storeInfo.avgStar.toFixed(1)}</span>
        <span id="small">평점</span>
        </div>
            <FontAwesomeIcon icon={faBreadSlice} color={ "#e2c26e"} id="visit"/>
    </Header>

    <div className="store-img"> 
            <div>
                <Label style={ { "color": "#46A6FF" } }>사진 <span id="side">{"총 "+storeImgArr.length+"장"}</span></Label>
                <div className="grid">
                {storeImgArr.map((img:img)=>
                    <div>
                    <ImgModal src={img.imageUrl} width="100%"/></div>
                )}
                </div>
                
            </div>
           
            </div>
            <Nav />
        </div>
    </>)
}
export default StoreImg;

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

#side{
    flex: 1;
}`