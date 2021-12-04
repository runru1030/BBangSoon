import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Nav from '../component/Nav';
import { StoreType } from '../component/StoreList';
import HeaderCmp from '../component/StoreMap/HeaderCmp';
import MapView from '../component/StoreMap/MapView';
import { RootState } from '../modules';
import { resultState } from './Main';

const StoreMap :React.FC= () => {
    /* location */
    const location = useSelector((state: RootState) => state.user.location);
    const [loc, setLoc] = useState({ title: "", y: location.y, x: location.x }); //지도 중심 좌표
    /* 지도 결과 */
    const [markerArr, setMarkerArr] = useState<StoreType[]>([]);
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
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=디저트`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                y: loc.y,
                x: loc.x,
                category_group_code: "CE7, FD6",
                page: page,
                size: 15,
                radius: 500,
                sort: "distance"
            }
        }).then(res => {
            setIsEnd(res.data.meta.is_end);
            setCurPage(page + 1);

            var arr = res.data.documents.filter((it: resultState) => (it.category_group_code == "CE7" && it.category_name.split(" > ")[2] != "커피전문점") || it.category_name.split(" > ")[1] == "간식");
            if (page != 1) {
                arr = [...markerArr, ...arr];
            }
            setMarkerArr(arr);
            axios.post("/store/list", arr.map((store: resultState) => store.id)).then(res => {
                setMarkerArr(arr.map((store: resultState, idx: number) => ({ ...store, ...res.data[idx] })));
                arr = arr.map((store: resultState, idx: number) => ({ ...store, ...res.data[idx] }));

                arr.forEach(async (element: resultState, i: number) => {
                    if (element.avgStar == null) {
                        await axios.post("/storeCrawl/count", { id: element.id, url: element.place_url }).then(res => {
                            arr[i] = { ...arr[i], ...res.data };
                            setMarkerArr([...arr]);
                        });
                    }
                });
            });
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