import {faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { DBStoreType, StoreState } from "../../routes/Store";
import Map from "../Map";

interface props{
    onClick:React.MouseEventHandler<HTMLDivElement>, 
    isOpen:{
        map: boolean;
        detail: boolean;
        menu: boolean;
        review: boolean;
    }
}
const MapInfo: React.FC<props> = ({onClick, isOpen}) => {
    const storeInfo: DBStoreType = useSelector((state: RootState) => state.store.storeObj);

    const location = useSelector((state: RootState) => state.user.location);
    const [curLoc, setCurLoc] = React.useState<StoreState["loc"]>({ title: "", y: location.y, x: location.x });   //내 위치
    return (
        <Wrapper>
        <Label id="map" onClick={onClick} style={isOpen.map ? { "color": "#46A6FF" } : undefined} >지도
            {isOpen.map &&
                <Navi className="navi-wrapper">
                    <a href={"https://map.kakao.com/link/roadview/" + storeInfo.id} id="navi">
                        <FontAwesomeIcon icon={faMapMarkerAlt} color="#46A6FF" />
                        <span>길찾기</span>
                    </a>
                </Navi>}
        </Label>
        {isOpen.map && (storeInfo.x && storeInfo.y) && <div>
            <Map loc={{
                title: storeInfo.place_name || "",
                y: storeInfo.y,
                x: storeInfo.x,
            }} setLoc={null} curLoc={curLoc} markerArr={[storeInfo]} />
        </div>}
        </Wrapper>
    )
}
export default MapInfo;
const Wrapper=styled.div``
const Label = styled.div`
    font-size: medium;
    padding: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing:border-box;
`
const Navi = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  #navi{
  margin-right: 5px;
  border: solid thin #FAE100;
  border-radius: 25px;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  font-size: small;
  gap: 5px;
  color: black;
  transform: translate(10px);
}
`