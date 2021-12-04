import {faGlobe, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { DBStoreType } from "../../routes/Store";

interface props{
    onClick:React.MouseEventHandler<HTMLDivElement>, 
    isOpen:{
        map: boolean;
        detail: boolean;
        menu: boolean;
        review: boolean;
    }
}
const StoreInfo: React.FC<props> = ({onClick, isOpen}) => {
    const storeInfo: DBStoreType = useSelector((state: RootState) => state.store.storeObj);

    return (
        <Wrapper>
            <Label id="detail" onClick={onClick} style={isOpen.detail ? { "color": "#46A6FF" } : undefined}>상세정보</Label>
            {isOpen.detail && 
            <DetailDiv className="col-container">
                <div>
                    <span id="label"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                    <span>{storeInfo.address_name}</span>
                </div>
                <div>
                    <span id="label"><FontAwesomeIcon icon={faPhoneAlt} /></span>
                    <a href={"tel:" + storeInfo.phone}>{storeInfo.phone}</a>
                </div>
                {storeInfo.site && <div>
                    <span id="label"><FontAwesomeIcon icon={faGlobe} /></span>
                    <a href={"https://" + storeInfo.site}>{storeInfo.site}</a>
                </div>}
            </DetailDiv>}
        </Wrapper>
    )
}
export default StoreInfo;
const Wrapper=styled.div``
const DetailDiv = styled.div`
    div{
    padding: 15px;
    font-weight: lighter;
    font-size: small;
        border-top: ${props => `solid thin` + props.theme.color.border_grey};
    }
    & > div:nth-child(1){
    border: none;
    }
    #label{
    color: #b3b3b3;
    margin-right: 10px;
    font-size: large;
    }
`
const Label = styled.div`
    font-size: medium;
    padding: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing:border-box;
`