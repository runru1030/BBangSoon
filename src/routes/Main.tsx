import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBreadSlice, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import StoreList from '../component/StoreList';
type LocationProps = {
    location: {
        si: string,
        gu: string,
        dong: string,
        latitude: Number,
        longitude: Number,
        detail: string
    }
}
const Main: React.FC<LocationProps> = ({ location }) => {
    const [reviewRank, setReviewRank]=useState([]);
    const colorList=["#FF764A", "#46A6FF","#46A6FF"];
    React.useEffect(() => {
        //서버 랭킹 store 리스트 get
        axios.get(`/store/rankReview/${location.si}`).then(res=>{
            setReviewRank(res.data)
        })
    }, [location])
    return (
        <div className="main container">
            <Header><FontAwesomeIcon icon={faMapMarkerAlt} /> {location?.si}</Header>
           <form>
                <input type="text" placeholder="매장 검색"/>
            </form>
            <div className="reviewRank-wrapper">
                <Label>랭킹 TOP10</Label>
                {reviewRank.map((store:any, idx:number)=>idx<5&&<div className="row-container reviewRank">
                    
                    <StoreList store={store} children={<span id="rank-num" style={{"color":idx<3?colorList[idx]:"black"}}>{idx+1}</span>}/>
                    </div>)}
                <span><FontAwesomeIcon icon={faBreadSlice}/> 순위</span>
            </div> 
            <Nav /> 
        </div>)
}
export default Main;

const Header=styled.header`
width: 100%;
position: sticky;
padding: 10px 30px;
top: 0px;
border-bottom: solid thin #d0d0d0;
  color: #6f6f6f;
`
const Label = styled.div`
width: 90%;
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