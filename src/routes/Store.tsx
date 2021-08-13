import { faMapMarkedAlt, faMapMarkerAlt, faPhone, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Nav from "../component/Nav";
const Store = () => {
    const store = JSON.parse(window.localStorage.getItem("store") || "");
    const [isOpen, setIsOpen] = useState({
        detail: false,
        menu: false,
        review: false,
    })
    useEffect(()=>{
        axios.post("/store/review",{url: store.url,StoreId:store.id }).then(res=>{
            window.localStorage.setItem("store", JSON.stringify({...store, Reviews:res.data}))
        })
    },[])
    const onClick = (label: string) => {
        setIsOpen({
            detail: false,
            menu: false,
            review: false,
            [label]: true
        })
    }
    return (<>
        <div className="store">
            <Header><span>{store.storeName}</span></Header>
            <div>
                <Label onClick={(event) => onClick("detail")} style={isOpen.detail?{"color":"#46A6FF"}:undefined}>상세정보</Label>
                {isOpen.detail && <Container className="detail">
                    <div>
                        <span id="label"><FontAwesomeIcon icon={faMapMarkerAlt}/></span>
                        <span>{store.fullAddress}</span>
                    </div>
                    <div>
                        <span id="label"><FontAwesomeIcon icon={faPhoneAlt}/></span>
                        <a href={"tle:"+store.telephone}>{store.telephone}</a>
                    </div>
                </Container>}
            </div>
            <div>
                <Label onClick={(event) => onClick("menu")} style={isOpen.menu?{"color":"#46A6FF"}:undefined}>메뉴</Label>
                {isOpen.menu && <div>
                    {store.Menus.map((menu: any) => <Label className="list">
                        <span id="tit">{menu.tit}</span>
                        <span id="price">{menu.price}</span>
                    </Label>)}
                </div>}
            </div>
            <div>
                <Label onClick={(event) => onClick("review")} style={isOpen.review?{"color":"#46A6FF"}:undefined}>리뷰</Label>
                {isOpen.review &&store.Reviews&& <div>
                    {store.Reviews.map((review: any) => <Label className="list">
                        <span id="tit">{review.star}</span>
                        <span id="price">{review.content}</span>
                    </Label>)}
                </div>}
            </div>
            <Nav/>
        </div>
    </>)
}
export default Store;
const Header = styled.header`
position: sticky;
display: flex;
align-items: center;
padding: 20px;
top: 0px;
border-bottom: solid thin #d0d0d0;
font-weight:bold;
`
const Label = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #dddddd;
`
const Container = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #dddddd;
`