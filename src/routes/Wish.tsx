import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import StoreList from '../component/StoreList';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
type storeObj = {
  id: number,
  storeName: string | null,
  reviewCnt: number | null,
  avgStar: number | null,
}
const Wish = () => {
  const { userObj } = useSelector((state: any) => ({ userObj: state.user.userObj, }))
  const { isLoggedin } = useSelector((state: any) => ({
    isLoggedin: state.user.isLoggedin,
}))
  const history=useHistory();

  const [storeArr, setStoreArr] = useState<storeObj[]>([])

  React.useEffect(() => {
    //로그인 처리
    !isLoggedin&&history.push("/auth");

    axios.get(`/user/wishArr/${userObj.id}`).then(res => {
        setStoreArr(res.data)
    })
  }, [])
  return (
    <div className="feed container">
      <Header className="row-container">
        <span id="">위시리스트</span>
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