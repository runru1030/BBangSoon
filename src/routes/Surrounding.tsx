import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import StoreList from '../component/StoreList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
type marker = {
    title: string,
    lat: number,
    lng: number,
    address: string,
    url: string
}
const Surrounding= () => {
    const location = useSelector((state:any)=> state.user.location)
    const [markerArr, setMarkerArr] = React.useState<any[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [address, setAddress] = React.useState<string>("");
    const [addressList, setAddressList] = React.useState<any[]>([]);
    const [loc, setLoc] = React.useState({ title: "", y: location.y, x: location.x } as {
        title: string,
        y: number,
        x: number,
    });
    const [curLoc, setCurLoc] = React.useState({ title: "", y: location.y, x: location.x } as {
        title: string,
        y: number,
        x: number,
    });
    const [isEnd, setIsEnd] = React.useState<boolean>();
    const [curpage, setCurPage] = React.useState<number>(1);
  
    
    const onClickChange = () => {
        setIsOpen(true);
    }
    const onClick = (id: any) => {
        setLoc({ title: addressList[id].place_name, y: addressList[id].y, x: addressList[id].x })
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
        setIsOpen(false);
    }
    const getStoreApi = (page: number) => {
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=디저트`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                y: loc.y,
                x: loc.x,
                category_group_code:"CE7, FD6",
                page: page,
                size: 15,
                radius: 500,
                sort: "distance"
            }
        }).then(res => {
            setIsEnd(res.data.meta.is_end);
            setCurPage(page + 1);
            var arr=res.data.documents.filter((it:any)=>(it.category_group_code=="CE7"&&it.category_name.split(" > ")[2]!="커피전문점")||it.category_name.split(" > ")[1]=="간식");
            if (page != 1) {
                arr=[...markerArr, ...arr];
            }
            setMarkerArr(arr);
            axios.post("/store/list", arr.map((store:any)=>({id: store.id}))).then(res=>{
                setMarkerArr(arr.map((store:any, idx:number)=>({...store, ...res.data[idx]})))
                arr=arr.map((store:any, idx:number)=>({...store, ...res.data[idx]}))
                arr.forEach(async(element:any, i:number) => {
                    if(element.avgStar==null){
                    await axios.post("/storeCrawl/count", {id: element.id, url:element.place_url}).then(res=>{
                        arr[i]={...arr[i], ...res.data};
                        
                        setMarkerArr([...arr])
                    })
                }
                });
            })
        })
    }
    React.useEffect(() => {
        getStoreApi(1);

    }, [loc])
    return (<div className="surrounding">
        <Header>
            <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도
            </div> 
            <span onClick={onClickChange}>위치 검색</span></Header>
        <div>
            {isOpen && <form onSubmit={onSubmit}>
                <input type="text" value={address} placeholder="위치 검색" onChange={(event) => setAddress(event.target.value)} />
                
                <input type="submit" id="search" style={{"display":"none"}}/>
                <label htmlFor="search" id="search-btn">
                    <FontAwesomeIcon icon={faSearch}/>
                </label>
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