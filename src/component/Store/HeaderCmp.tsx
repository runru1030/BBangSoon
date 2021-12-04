import { faBreadSlice, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../modules";
import { DBStoreType } from "../../routes/Store";
import { Header, StoreName, Wrapper } from "../Header";

interface props {
    isStoreImg?: boolean
}
const HeaderCmp: React.FC<props> = ({ isStoreImg }) => {
    const history = useHistory();
    const { userObj, isLoggedin } = useSelector((state: RootState) => ({
        userObj: state.user.userObj,
        isLoggedin: state.user.isLoggedin,
    }))
    const storeInfo: DBStoreType = useSelector((state: RootState) => state.store.storeObj);

    /* wish & visit */
    const [isVisit, setIsVisit] = useState(storeInfo.Visits ? storeInfo.Visits.findIndex((i: { UserId: number }) => i.UserId == userObj.id) != -1 : false);
    const [isWish, setIsWish] = useState(storeInfo.Wishes ? storeInfo.Wishes.findIndex((i: { UserId: number }) => i.UserId == userObj.id) != -1 : false);
    const onClickFeature = (e: React.MouseEvent): void => {
        if (!isLoggedin) {
            history.push("/auth");
        }
        else {
            if (e.currentTarget.id == "visit") {
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

    return (
        <Header>
            <StoreName>{storeInfo.place_name}</StoreName>
            <Wrapper>
                <span>{storeInfo.reviewCnt}</span>
                <span id="small">리뷰</span>
            </Wrapper>
            <Wrapper>
                <span>{storeInfo.avgStar?.toFixed(1)}</span>
                <span id="small">평점</span>
            </Wrapper>
            {!isStoreImg &&
                <>
                    <FontAwesomeIcon id="visit" onClick={onClickFeature} icon={faBreadSlice} color={isVisit ? "#e2c26e" : "#bfbfbf"} />
                    <FontAwesomeIcon id="wish" onClick={onClickFeature} icon={faHeart} color={isWish ? "#f89573" : "#bfbfbf"} />
                </>}
        </Header>
    )
}
export default HeaderCmp;

