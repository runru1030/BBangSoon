import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import StoreList from '../component/StoreList';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const StoreMap = () => {
    /* location */
    const location = useSelector((state: any) => state.user.location)
    const [loc, setLoc] = useState({ title: "", y: location.y, x: location.x } as {
        title: string,
        y: number,
        x: number,
    }); //지도 중심 좌표
    const [curLoc, setCurLoc] = useState({ title: "", y: location.y, x: location.x } as {
        title: string,
        y: number,
        x: number,
    }); //내 위치 좌표

    /* 지도 결과 */
    const [markerArr, setMarkerArr] = useState<any[]>([]);
    const [isEnd, setIsEnd] = useState<boolean>();
    const [curpage, setCurPage] = useState<number>(1);
    const onClickNext = () => {
        getStoreApi(curpage + 1);
    }

    /* search */
    const [isOpen, setIsOpen] = useState<boolean>(false);     //검색창 open
    const [search, setSearch] = useState<string>("");         //위치 검색어
    const [addressList, setAddressList] = useState<any[]>([]);//위치 검색 결과 arr
    const onClickSearch = () => {
        setIsOpen(true);
    }
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: { size: 15 }
        }).then(res => {
            setAddressList(res.data.documents)
        })
        setIsOpen(false);
    }
    const onClickResult = (id: number) => {
        setLoc({ title: addressList[id].place_name, y: addressList[id].y, x: addressList[id].x })
        setSearch(addressList[id].place_name)
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

            var arr = res.data.documents.filter((it: any) => (it.category_group_code == "CE7" && it.category_name.split(" > ")[2] != "커피전문점") || it.category_name.split(" > ")[1] == "간식");
            if (page != 1) {
                arr = [...markerArr, ...arr];
            }
            setMarkerArr(arr);
            axios.post("/store/list", arr.map((store: any) => ({ id: store.id }))).then(res => {
                setMarkerArr(arr.map((store: any, idx: number) => ({ ...store, ...res.data[idx] })));
                arr = arr.map((store: any, idx: number) => ({ ...store, ...res.data[idx] }));
                arr.forEach(async (element: any, i: number) => {
                    if (element.avgStar == null) {
                        await axios.post("/storeCrawl/count", { id: element.id, url: element.place_url }).then(res => {
                            arr[i] = { ...arr[i], ...res.data };
                            setMarkerArr([...arr]);
                        })
                    }
                });
            })
        })
    }

    return (<div className="surrounding">
        <Header>
            <div><FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도</div>
            <span onClick={onClickSearch}>위치 검색</span>
        </Header>
        <div>
            {isOpen &&
                /* 검색창 */
                <form onSubmit={onSubmit}>
                    <input type="text" value={search} placeholder="위치 검색" onChange={(event) => setSearch(event.target.value)} />
                    <input type="submit" id="search" style={{ "display": "none" }} />
                    <label htmlFor="search" id="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </label>
                </form>}
            {addressList.length == 0 ?
                /* map view */
                <><Map loc={loc} setLoc={setLoc} curLoc={curLoc} markerArr={markerArr} />
                    <div className="scroll-list">
                        {markerArr.map((store) =>
                            <StoreList store={store} />
                        )}
                        {!isEnd && <button className="more-btn" onClick={onClickNext}>더 보기</button>}
                    </div></>
                :
                /* search result Arr */
                <div>{addressList.map((it: any, idx: number) =>
                    <List id={"" + idx} onClick={(event) => onClickResult(parseInt(event.currentTarget.id))}>{it.place_name}</List>)}
                </div>}
        </div>
        <Nav />
    </div>);
}
export default StoreMap;
const Header = styled.header`
position: sticky;
display: flex;
align-items: center;
padding: 10px 20px;
top: 0px;
font-size: medium;
border-bottom: solid thin #e9e9e9;
background-color: white;
color:#6f6f6f;
span{
    font-size: x-small;
    font-weight: normal;
    flex: 1;
    text-align: end;
    color: #46A6FF;
    
}
`
const List = styled.div`
width: 100%;
display: flex;
align-items: center;
padding: 20px;
height: 30px;
border-top: solid thin #eeeeee;
`