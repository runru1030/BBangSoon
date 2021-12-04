import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import StoreList, { StoreType } from '../component/StoreList';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../modules';
import styled from 'styled-components';
import { Header } from '../component/Header';
const Wish: React.FC = () => {
  const history = useHistory();
  const { userObj } = useSelector((state: RootState) => ({ userObj: state.user.userObj, }));
  const { isLoggedin } = useSelector((state: RootState) => ({ isLoggedin: state.user.isLoggedin }));

  const [storeArr, setStoreArr] = useState<StoreType[]>([]);

  useEffect(() => {
    //로그인 처리
    !isLoggedin && history.push("/auth");
    axios.get(`/user/wishArr/${userObj.id}`).then(res => {
      setStoreArr(res.data);
    })
  }, [])
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faHeart} color="#f89573" />
        <span>관심 매장</span>
      </Header>
      {storeArr.map((store: StoreType) => <StoreList store={store} />)}
      <Nav />
    </Container>)
}
export default Wish;
const Container=styled.div``