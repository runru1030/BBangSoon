import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import StoreList from '../component/StoreList';
type marker = {
    title: string,
    lat: number,
    lng: number,
    address: string,
    url: string
}
const Surrounding: React.FC = ({  }) => {
    const location = JSON.parse(window.localStorage.getItem("location")||`{
        si: "서울",
        gu: "",
        dong: "",
        latitude: 33.450701,
        longitude: 126.570667,
        detail: ""
      }`);
    const [markerArr, setMarkerArr] = React.useState<marker[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [address, setAddress] = React.useState<string>("");
    const [addressList, setAddressList] = React.useState<any[]>([]);
    const [loc, setLoc] = React.useState({ title: "", lat: location.latitude, lng: location.longitude } as {
        title: string,
        lat: number,
        lng: number,
    });
    const [curLoc, setCurLoc] = React.useState({ title: "", lat: location.latitude, lng: location.longitude } as {
        title: string,
        lat: number,
        lng: number,
    });
    const [isEnd, setIsEnd] = React.useState<boolean>();
    const [curpage, setCurPage] = React.useState<number>(1);
    //const [storeArr,setStoreArr]= React.useState<store[]>([]);

    const onClickChange = () => {
        setIsOpen(true);
    }
    const onClick = (id: any) => {
        setLoc({ title: addressList[id].place_name, lat: addressList[id].y, lng: addressList[id].x })
        setAddress(addressList[id].place_name)
        setAddressList([]);
    }
    const onClickNext = () => {
        getStoreApi(curpage + 1);
    }
    const onSubmit = (event: any) => {
        event.preventDefault();
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                size: 15
            }
        }).then(res => {
            setAddressList(res.data.documents)
        })
    }
    const getStoreApi = (page: number) => {
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=베이커리`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                y: loc.lat,
                x: loc.lng,
                page: page,
                size: 15,
                radius: 500,
                sort: "distance"
            }
        }).then(res => {
            console.log(res.data);
            
            setIsEnd(res.data.meta.is_end);
            setCurPage(page + 1);
            if (page == 1) {
                setMarkerArr(res.data.documents.map((it: any) => ({ title: it.place_name, lng: it.x, lat: it.y, address: it.address_name, url: it.place_url})));
            }
            else {
                setMarkerArr([...markerArr, ...res.data.documents.map((it: any) => ({ title: it.place_name, lng: it.x, lat: it.y , address: it.address_name, url: it.place_url}))]);

            }
        })
    }
    React.useEffect(() => {
        getStoreApi(1);

    }, [loc])
    return (<div>
        <Header><FontAwesomeIcon icon={faMapMarkerAlt} /> 내 주변 <span onClick={onClickChange}>위치 검색</span></Header>
        <div>
            {isOpen && <form onSubmit={onSubmit}>
                <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                <input type="submit" value="검색" />
            </form>}

            {addressList.length == 0 ? <>
            <Map loc={loc} setLoc={setLoc} curLoc={curLoc} markerArr={markerArr} />
            <div className="scroll-list">
                {markerArr.map((store) =>
                    <StoreList store={store}/>
                )}
                {!isEnd && <button className="more-btn" onClick={onClickNext}>더 보기</button>}
            </div></>
                : <div>{addressList.map((it: any, idx: number) => <List id={"" + idx} onClick={(event) => onClick(event.currentTarget.id)}>{it.place_name}</List>)}
                </div>}

        </div>
        <Nav />
    </div>);
}
export default Surrounding;
const Header = styled.header`
position: sticky;
display: flex;
align-items: center;
padding: 20px;
top: 0px;
border-bottom: solid thin #d0d0d0;
font-weight:bold;
span{
    font-size: x-small;
    font-weight: normal;
    flex: 1;
    text-align: end;
    
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