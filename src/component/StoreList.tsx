import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBreadSlice, faMapMarkerAlt, faRedo, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Map from '../component/Map';
import Nav from '../component/Nav';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const StoreList: React.FC<any> = ({store, children}) => {
    const history= useHistory();
    const storeInfo={id : store.id, storeName: store.place_name,  address:store.road_address_name?store.road_address_name:store.address_name, telephone:store.phone,url:store.place_url}
    const onClick = () => {
        window.localStorage.setItem("store", JSON.stringify({...storeInfo ,x: store.x, y:store.y, reviewCnt:store.reviewCnt, avgStar:store.avgStar  }))
        axios.post("/storeCrawl", storeInfo).then(res=>
            {
                if(res.data){
                    window.localStorage.setItem("store", JSON.stringify({...res.data,...storeInfo ,x: store.x, y:store.y, reviewCnt:store.reviewCnt, avgStar:store.avgStar }))
                }
                history.push("/store");
            })
        
    }
 
    return (<Store onClick={onClick}>
        {children}
        <span id="storeName">{store.place_name?store.place_name:store.storeName}</span>
        <div>
        <span>{store.avgStar==null?<FontAwesomeIcon icon={faSpinner}/>:store.reviewCnt}</span>
        <span id="small">리뷰</span>
        </div>
        <div>
        <span>{store.avgStar==null?<FontAwesomeIcon icon={faSpinner}/>:store.avgStar.toFixed(1)}</span>
        <span id="small">평점</span>
        </div>
            <FontAwesomeIcon icon={faBreadSlice} color={ "#ece9e2"} id="visit"/>
    </Store>);
}
export default StoreList;
const Store = styled.div`
width: 100vw;
max-width: 100vw;
display: flex;
align-items: center;
padding: 20px 0px;
height: 30px;
border-top: solid thin #eeeeee;
#storeName{
    flex: 0.6;
    margin-left: 20px;
}
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
    margin-top: 10px;
    color: #636363;
}
div>#small{
    font-size: xx-small;
}
div, #visit{
    flex: 0.15;
}
`