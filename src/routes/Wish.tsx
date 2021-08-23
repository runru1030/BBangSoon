import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBackspace, faBackward, faBreadSlice, faHeart, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import StoreList from '../component/StoreList';
import { useSelector } from 'react-redux';
const Wish = () => {
  const [storeArr, setStoreArr] = useState<any[]>([])
  const { userObj } = useSelector((state: any) => ({ userObj: state.user.userObj, }))
  React.useEffect(() => {
    axios.get(`/user/wishArr/${userObj.id}`).then(res => {
        console.log(res.data);
        
         axios.post('/store/list',res.data).then(result=>{
            console.log(result.data)
            setStoreArr(res.data.map((store:any, idx:number)=>({...store, ...result.data[idx]})))}
            ) 

    })
  }, [])
  return (
    <div className="feed container">
      <Header className="row-container">
        <span id="">빵지순례 위시리스트</span>
          <FontAwesomeIcon icon={faHeart} color="#f89573"/>
      </Header>
        {storeArr.map((store:any)=><StoreList store={store}/>)}
      
      <Nav />
    </div>)
}
export default Wish;
const Header = styled.header`
width: 90%;
position: sticky;
padding: 20px 20px;
top: 0px;
border-bottom: solid thin #e9e9e9;
color: #6f6f6f;
gap: 10px;
`