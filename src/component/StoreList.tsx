import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
type storeCp = {
    store: {
        title: string,
        lat: number,
        lng: number,
        address: string,
        url:string
    }
}
const StoreList: React.FC<storeCp> = ({store}) => {
    const history= useHistory();
    const onClick = (id: any) => {
        axios.post("/store", {storeName: store.title, address:store.address, url:store.url}).then(res=>{
            window.localStorage.setItem("store", JSON.stringify({...res.data, url: store.url}))
            history.push("/store");
        })
    }

 
    return (<Store onClick={onClick}>{store.title}</Store>);
}
export default StoreList;
const Store = styled.div`
width: 100%;
display: flex;
align-items: center;
padding: 20px;
height: 30px;
border-top: solid thin #eeeeee;
`