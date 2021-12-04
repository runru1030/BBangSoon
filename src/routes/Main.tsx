import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { StoreType } from '../component/StoreList';
import { useSelector } from 'react-redux';
import LocList from '../component/LocList';
import { RootState } from '../modules';
import Search from '../component/Main/Search';
import Ranking from '../component/Main/Ranking';
import Store from '../component/Main/Store';
import { Header } from '../component/Header';
export interface resultState extends StoreType {
    category_group_code: string,
    category_name: string

}
const Main: React.FC = () => {
    /* location */
    const location = useSelector((state: RootState) => state.user.location);
    const [changeSi, setChangeSi] = useState(false);
    const onClickLoc = () => {
        setChangeSi(true);
    }

    /* search */
    const [search, setSearch] = useState("");
    const [resultArr, setResultArr] = useState<resultState[]>([]);  //search result Arr
    const [curpage, setCurPage] = React.useState(1);//search page
    const [isEnd, setIsEnd] = React.useState<boolean>();    //page end

    //카카오 검색 API
    const getStoreKakao = (page: number) => {
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                page: page,
                category_group_code: "CE7, FD6"
            }
        }).then(res => {
            setIsEnd(res.data.meta.is_end);
            setCurPage(page + 1);
            var arr = res.data.documents.filter((it: resultState) => it.category_group_code == "CE7" || it.category_name.split(" > ")[1] == "간식");
            setResultArr(res.data.documents.filter((it: resultState) => it.category_group_code == "CE7" || it.category_name.split(" > ")[1] == "간식"));

            axios.post("/store/list", arr.map((store: resultState) => ({ id: store.id }))).then(res => {
                setResultArr(arr.map((store: resultState, idx: number) => ({ ...store, ...res.data[idx] })));
                arr = arr.map((store: resultState, idx: number) => ({ ...store, ...res.data[idx] }));

                arr.forEach(async (element: resultState, i: number) => {
                    if (element.avgStar == null) {
                        await axios.post("/storeCrawl/count", { id: element.id, url: element.place_url }).then(res => {
                            arr[i] = { ...arr[i], ...res.data };
                            setResultArr([...arr]);
                        });
                    }
                });
            })
        })
    }
    return (
        <Container>
            <Header><FontAwesomeIcon icon={faMapMarkerAlt} onClick={onClickLoc} /> {location?.si}</Header>
            {changeSi ?
                <LocList setChangeSi={setChangeSi} />
                :
                <><Search search={search} setSearch={setSearch} setResultArr={setResultArr} getStoreKakao={getStoreKakao} />
                    {resultArr.length == 0 ?
                        <Ranking />
                        :
                        <Store resultArr={resultArr} curpage={curpage} isEnd={isEnd} getStoreKakao={getStoreKakao} />}</>}
            <Nav />
        </Container>)
}
export default Main;
const Container = styled.div`
`
