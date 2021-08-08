import { faHome, faMapMarkerAlt, faPeopleArrows, faPersonBooth, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Nav = () => {
    const history = useHistory();
    const location = useLocation();
    const onClickSurr = () => {
        history.push("/surrounding");
    }
    const onClickHome = () => {
        history.push("/");
    }
    const onClickMy = () => {
        history.push("/surrounding");
    }
    return (
        <BottomNav>
            <div id="surrounding" onClick={onClickSurr}>
                <FontAwesomeIcon id="icon" icon={faMapMarkerAlt} />
                <span>내 주변</span>
            </div>
            <div id="home" onClick={onClickHome}>
                <FontAwesomeIcon id="icon" icon={faHome} />
                <span>홈</span>
            </div>
            <div>
                <FontAwesomeIcon id="icon" icon={faUser} />
                <span id="mypage">마이페이지</span>
            </div>
        </BottomNav>
    )

}

export default Nav;

const BottomNav = styled.div`

position: fixed;
bottom: 0;
display:flex;
width: 100%;
flex-direction: row;
gap:25%;
align-items:center;
justify-content: center;
padding: 15px 0;
border-top:solid thin #d0d0d0 ;
background-color: white;
div{
    display:flex;
    flex-direction:column;
    align-items: center;
    
}
#icon{
    font-size: large;
    margin-bottom: 5px;
}
span{
    font-size: xx-small;
}

`