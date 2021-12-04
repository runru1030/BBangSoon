import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Map from '../Map';
import StoreList, { StoreType } from '../StoreList';
import { RootState } from '../../modules';

interface props{
    markerArr:StoreType[], 
    isEnd:boolean|undefined, 
    curpage:number, 
    getStoreApi:Function
}
const MapView:React.FC<props> = ({markerArr, isEnd, curpage, getStoreApi}) => {
    /* location */
    const location = useSelector((state: RootState) => state.user.location)
    const [loc, setLoc] = useState({ title: "", y: location.y, x: location.x }); //지도 중심 좌표
    const [curLoc, setCurLoc] = useState({ title: "", y: location.y, x: location.x }); //내 위치 좌표

    const onClickNext = () => {
        getStoreApi(curpage + 1);
    }

    return (
        <>
            <Map loc={loc} setLoc={setLoc} curLoc={curLoc} markerArr={markerArr} />
            <ScrollDiv className="col-container">
                {markerArr.map((store) =>
                    <StoreList store={store} />
                )}
                {!isEnd && <MoreBtn className="more-btn" onClick={onClickNext}>더 보기</MoreBtn>}
            </ScrollDiv>
        </>);
}
export default MapView;

const MoreBtn = styled.button`
 all: unset;
  color: #46A6FF;
  text-align: center;
  width: 100%;
`
const ScrollDiv = styled.div`
  overflow: scroll;
  padding-bottom: 100px;
  width: 100%;
  height:100%;
  max-height: 100vh;
  overflow: auto;
  `