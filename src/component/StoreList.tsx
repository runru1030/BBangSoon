import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStoreInfo } from '../modules/store';
const StoreList: React.FC<any> = ({ store, children }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(setStoreInfo({
            id: store.id,
            address: store.road_address_name ? store.road_address_name : store.address_name,
            storeName: store.place_name,
            telephone: store.phone,
            x: store.x,
            y: store.y,
            place_url: store.place_url,
            reviewCnt: store.reviewCnt,
            avgStar: store.avgStar,
        }))
        history.push("/store");
    }

    return (<Store onClick={onClick}>
        {children}
        <span id="storeName">{store.place_name ? store.place_name : store.storeName}</span>
        <div className="row-container">
            <div>
                <span>{store.avgStar == null ? <FontAwesomeIcon icon={faSpinner} /> : store.reviewCnt}</span>
                <span id="small">리뷰</span>
            </div>
            <div>
                <span>{store.avgStar == null ? <FontAwesomeIcon icon={faSpinner} /> : store.avgStar.toFixed(1)}</span>
                <span id="small">평점</span>
            </div>
        </div>
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
border-top: ${props=>`solid thin`+props.theme.color.border_grey};
#storeName{
    flex: 1;
    margin-left: 20px;
}
.row-container{
    gap: 15px;
    flex: 1;
    margin-right:20px;
    justify-content: flex-end;
}
.row-container>div{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
    color: #636363;
}
div>#small{
    font-size: xx-small;
}
div{
    flex: 0.2;
}
`