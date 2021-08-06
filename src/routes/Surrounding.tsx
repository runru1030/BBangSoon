import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';

type locationProps = {
    location: {
        si: string,
        gu: string,
        dong: string,
        latitude: number,
        longitude: number,
        detail: string
    }
}
type marker = {
    title: string,
    lat: number,
    lng: number
}
const Surrounding: React.FC<locationProps> = ({ location }) => {
    const [markerArr, setMarkerArr] = React.useState<marker[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [address, setAddress] = React.useState<string>("");
    const [addressList, setAddressList] = React.useState<any[]>([]);
    const [loc, setLoc] = React.useState<marker>({ title: "", lat: location.latitude, lng: location.longitude });
    //const [storeArr,setStoreArr]= React.useState<store[]>([]);
    const onClickChange = () => {
        setIsOpen(true);
    }
    const onClick = (id: any) => {
        setLoc({ title: addressList[id].place_name, lat: addressList[id].y, lng: addressList[id].x })
        setAddress(addressList[id].place_name)
        setAddressList([]);
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
    const getStoreApi = () => {
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=베이커리`, {
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            params: {
                y: loc.lat,
                x: loc.lng,
                size: 15,
                radius: 500,
                sort: "distance"
            }
        }).then(res => {
            console.log(res);
            setMarkerArr(res.data.documents.map((it: any) => ({ title: it.place_name, lng: it.x, lat: it.y })));
        })
    }
    React.useEffect(() => {
        getStoreApi();
    }, [loc])
    return (<div>
        <header><FontAwesomeIcon icon={faMapMarkerAlt} /> 내 주변 <span onClick={onClickChange}>위치 검색</span></header>
        <div>
            {isOpen && <form onSubmit={onSubmit}>
                <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                <input type="submit" value="검색" />
            </form>}

            {addressList.length == 0 ? <><Map loc={loc} markerArr={markerArr} /><div>
                {markerArr.map((store) =>
                    <span>{store.title}</span>
                )}
            </div></>
                : <div>{addressList.map((it: any, idx: number) => <span id={"" + idx} onClick={(event) => onClick(event.currentTarget.id)}>{it.place_name}</span>)}
                </div>}

        </div>
        <Nav />
    </div>);
}
export default Surrounding;