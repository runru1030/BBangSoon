import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import StoreList, { StoreType } from '../component/StoreList';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Header, SearchForm } from '../assets/styles/global-style';
import { RootState } from '../modules';
import { resultState } from './Main';

const StoreMap = () => {
    /* location */
    const location = useSelector((state: RootState) => state.user.location)
    const [loc, setLoc] = useState({ title: "", y: location.y, x: location.x }); //지도 중심 좌표
    const [curLoc, setCurLoc] = useState({ title: "", y: location.y, x: location.x }); //내 위치 좌표

    /* 지도 결과 */
    const [markerArr, setMarkerArr] = useState<StoreType[]>([]);
    const [isEnd, setIsEnd] = useState<boolean>();
    const [curpage, setCurPage] = useState(1);
    const onClickNext = () => {
        getStoreApi(curpage + 1);
    }

    /* search */
    const [isOpen, setIsOpen] = useState(false);     //검색창 open
    const [search, setSearch] = useState("");         //위치 검색어
    const [addressList, setAddressList] = useState<resultState[]>([]);//위치 검색 결과 arr
    const onClickSearch = () => {
        setIsOpen(prev => !prev);
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
                        })
                    }
                });
            })
        })
    }

    return (<div className="surrounding">
        <Header>
            <div><FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도</div>
            <span onClick={onClickSearch} id="search">위치 검색</span>
        </Header>
        <div>
            {isOpen &&
                /* 검색창 */
                <SearchForm onSubmit={onSubmit} isAbsolute={true} className="container">
                    <input type="text" value={search} placeholder="위치 검색" onChange={(event) => setSearch(event.target.value)} />
                    <input type="submit" id="search" style={{ "display": "none" }} />
                    <label htmlFor="search" id="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </label>
                </SearchForm>}
            {addressList.length == 0 ?
                /* map view */
                <><Map loc={loc} setLoc={setLoc} curLoc={curLoc} markerArr={markerArr} />
                    <ScrollDiv className="col-container">
                        {markerArr.map((store) =>
                            <StoreList store={store} />
                        )}
                        {!isEnd && <MoreBtn className="more-btn" onClick={onClickNext}>더 보기</MoreBtn>}
                    </ScrollDiv></>
                :
                /* search result Arr */
                <div>{addressList.map((it: resultState, idx: number) =>
                    <List id={"" + idx} onClick={(event) => onClickResult(parseInt(event.currentTarget.id))}>{it.place_name}</List>)}
                </div>}
        </div>
        <Nav />
    </div>);
}
export default StoreMap;

const List = styled.div`
width: 100%;
display: flex;
align-items: center;
padding: 20px;
height: 30px;
border-top: ${props => `solid thin` + props.theme.color.border_grey};
`
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