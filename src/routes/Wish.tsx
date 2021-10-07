import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import StoreList from '../component/StoreList';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Header } from '../assets/styles/global-style';
type storeObj = {
  id: number,
  storeName: string | null,
  reviewCnt: number | null,
  avgStar: number | null,
}
const Wish = () => {
  const history=useHistory();
  const { userObj } = useSelector((state: any) => ({ userObj: state.user.userObj, }))
  const { isLoggedin } = useSelector((state: any) => ({isLoggedin: state.user.isLoggedin}))

  const [storeArr, setStoreArr] = useState<storeObj[]>([])

  useEffect(() => {
    //로그인 처리
    !isLoggedin&&history.push("/auth");

    axios.get(`/user/wishArr/${userObj.id}`).then(res => {
        setStoreArr(res.data)
    })
  }, [])
  return (
    <div className="feed">
      <Header className="row-container">
          <FontAwesomeIcon icon={faHeart} color="#f89573"/>
        <span id="">관심 매장</span>
      </Header>
        {storeArr.map((store:any)=><StoreList store={store}/>)}
      <Nav />
    </div>)
}
export default Wish;