import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Nav from '../component/Nav';
import HeaderCmp from '../component/StoreMap/HeaderCmp';
import MapView from '../component/StoreMap/MapView';
import { RootState } from '../modules';
import { getStoreList, getStoreMap } from '../utils/KakaoLocalAPI';
import { resultState } from './Main';

const StoreMap :React.FC= () => {
    /* location */
    const location = useSelector((state: RootState) => state.user.location);
    const [loc, setLoc] = useState({ title: "", y: location.y, x: location.x }); //지도 중심 좌표
    /* 지도 결과 */
    const [markerArr, setMarkerArr] = useState<resultState[]>([]);
    const [isEnd, setIsEnd] = useState<boolean>();
    const [curpage, setCurPage] = useState(1);
    const [addressList, setAddressList] = useState<resultState[]>([]);//위치 검색 결과 arr

    const onClickResult = (id: number) => {
        setLoc({ title: addressList[id].place_name, y: addressList[id].y, x: addressList[id].x });
        setAddressList([]);
    }

    useEffect(() => {
        getStoreApi(1);
    }, [loc]);

    //store 지도 검색 API
    const getStoreApi = (page: number) => {
        getStoreMap(page, markerArr, loc).then((res:any)=>{
            setMarkerArr(res.resultArr);
            setIsEnd(res.isEnd);
            setCurPage(p=>p+1);
            getStoreList(res.resultArr, setMarkerArr);
        });
    }

    return (
        <Container>
            <HeaderCmp setAddressList={setAddressList}/>
            <Wrapper>
                {addressList.length == 0 ?
                    <MapView markerArr={markerArr} isEnd={isEnd} curpage={curpage} getStoreApi={getStoreApi} />
                    :
                    <Wrapper>
                        {addressList.map((it: resultState, idx: number) =>
                            <List id={"" + idx} onClick={(event) => onClickResult(parseInt(event.currentTarget.id))}>{it.place_name}</List>)}
                    </Wrapper>}
            </Wrapper>
            <Nav />
        </Container>);
}
export default StoreMap;
const Wrapper = styled.div``
const Container = styled.div``
const List = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
    height: 30px;
    border-top: ${props => `solid thin` + props.theme.color.border_grey};
`