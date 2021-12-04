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
import { getStore, getStoreList } from '../utils/KakaoLocalAPI';
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
        getStore(page, resultArr ,search).then((res:any)=>{
            setResultArr(res.resultArr);
            setIsEnd(res.isEnd);
            setCurPage(p=>p+1);
            getStoreList(res.resultArr, setResultArr);
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
