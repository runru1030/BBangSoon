import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList from '../component/StoreList';
import { useSelector } from 'react-redux';
import LocList from '../component/LocList';
const Main = () => {
    /* location */
    const location = useSelector((state: any) => state.user.location);
    const [changeSi, setChangeSi] = useState<boolean>(false);
    const onClickLoc = () => {
        setChangeSi(true);
    }

    /* search */
    const [search, setSearch] = useState<string>("");       //검색창 검색어
    const [resultArr, setResultArr] = useState<any[]>([]);  //search result Arr
    const [curpage, setCurPage] = React.useState<number>(1);//search page
    const [isEnd, setIsEnd] = React.useState<boolean>();    //page end
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;
        setSearch(value);
        if (value == "") setResultArr([]);
    }
    const onSubmit = (event: any) => {
        event.preventDefault();
        setResultArr([]);
        getStoreKakao(1);
    }
    const onClickNext = () => {
        getStoreKakao(curpage + 1);
    }

    /* ranking */
    const colorList = ["#FF764A", "#46A6FF", "#46A6FF"];    //ranking num's color
    const [reviewRank, setReviewRank] = useState([]);       //ranking top 20's store Arr
    const [isMore, setIsMore] = useState<boolean>(false);
    const onClickMore = () => {
        setIsMore(true);
    }



    useEffect(() => {
        //위치기준 랭킹 top 20
        axios.get(`/store/rankReview/${location?.si}`).then(res => {
            setReviewRank(res.data)
        })
    }, [location]);

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
            var arr = res.data.documents.filter((it: any) => it.category_group_code == "CE7" || it.category_name.split(" > ")[1] == "간식");
            setResultArr(res.data.documents.filter((it: any) => it.category_group_code == "CE7" || it.category_name.split(" > ")[1] == "간식"));

            axios.post("/store/list", arr.map((store: any) => ({ id: store.id }))).then(res => {
                setResultArr(arr.map((store: any, idx: number) => ({ ...store, ...res.data[idx] })));
                arr = arr.map((store: any, idx: number) => ({ ...store, ...res.data[idx] }));

                arr.forEach(async (element: any, i: number) => {
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
        <div className="main container">
            <Header><FontAwesomeIcon icon={faMapMarkerAlt} onClick={onClickLoc} /> {location?.si}</Header>
            {changeSi ?
                <LocList setChangeSi={setChangeSi} />
                :
                <><form onSubmit={onSubmit}>
                        <input type="text" value={search} onChange={onChange} placeholder="매장 검색" />
                        <input type="submit" id="search" style={{ "display": "none" }} />
                        <label htmlFor="search" id="search-btn"><FontAwesomeIcon icon={faSearch} /></label>
                    </form>

                    {resultArr.length == 0 ?
                        <div className="col-container main-wrapper">
                            <Label>랭킹</Label>
                            {reviewRank.map((store: any, idx: number) => (idx < 10 || (isMore)) && <><div className="row-container reviewRank">
                                <StoreList store={store} children={<span id="rank-num" style={{ "color": idx < 3 ? colorList[idx] : "black" }}>{idx + 1}</span>} />
                            </div>
                                {idx == 9 && !isMore && <span className="more-btn" onClick={onClickMore}>더보기</span>}
                            </>)}
                        </div>
                        :
                        <div className="main-wrapper">
                            {resultArr.map((result: any) => <StoreList store={result} />)}
                            {!isEnd && <button className="more-btn" onClick={onClickNext}>더 보기</button>}
                        </div>}</>
            }
            <Nav />
        </div>)
}
export default Main;

const Header = styled.header`
width: 90%;
position: sticky;
padding: 10px 20px;
top: 0px;
color: #6f6f6f;
background-color: white;
`
const Label = styled.div`
font-size: medium;
padding: 15px;
display: flex;
align-items: center;
span{
    flex:1;
}
#side{
    flex: 0.2;
}
`