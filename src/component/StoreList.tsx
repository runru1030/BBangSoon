import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStoreInfo } from '../modules/store';
export interface StoreType {
    id: number,
    road_address_name?: string,
    address_name?: string,
    place_name: string,
    phone?: string,
    x?: number,
    y?: number,
    place_url?: string,
    reviewCnt?: number,
    avgStar?: number,
}
interface StoreListProps {
    store: StoreType,
    children?: HTMLElement | React.ReactElement
}
const StoreList: React.FC<StoreListProps> = ({ store, children }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(setStoreInfo({
            id: store.id,
            address_name: store.road_address_name ? store.road_address_name : store.address_name,
            place_name: store.place_name,
            phone: store.phone,
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
        <StoreName>{store.place_name}</StoreName>
        <Wrapper className="row-container">
            <Block>
                <span>{store.avgStar == null ? <FontAwesomeIcon icon={faSpinner} /> : store.reviewCnt}</span>
                <span id="small">리뷰</span>
            </Block>
            <Block>
                <span>{store.avgStar == null ? <FontAwesomeIcon icon={faSpinner} /> : store.avgStar.toFixed(1)}</span>
                <span id="small">평점</span>
            </Block>
        </Wrapper>
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
    border-top: ${props => `solid thin` + props.theme.color.border_grey};
`
const Block=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: large;
    color: #636363;
    #small{
        font-size: xx-small;
    }
`
const Wrapper=styled.div`
    gap: 20px;
    margin-right:20px;
`
const StoreName=styled.span`
    flex: 1;
    margin-left: 20px;
`