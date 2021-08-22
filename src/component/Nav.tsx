import { faBook, faBreadSlice, faHeart, faHome, faMapMarkerAlt, faPeopleArrows, faPersonBooth, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Nav = () => {
    const history = useHistory();
    const location = useLocation();
    
    const { isLoggedin } = useSelector((state:any) => ({
        isLoggedin: state.user.isLoggedin,
    }))
    const onClickSurr = () => {
        history.push("/surrounding");
    }
    const onClickHome = () => {
        history.push("/");
    }
    const onClickMy = () => {
        isLoggedin?history.push("/feed"):history.push("/auth");
    }
    return (<><BottomNav>
            <div id="surrounding" onClick={onClickSurr}>
                <FontAwesomeIcon id="icon" icon={faMapMarkerAlt}  color={location.pathname=="/surrounding"? "#46A6FF":"#6f6f6f"} />
                <span>빵 지도</span>
            </div>
            <div id="home" onClick={onClickHome}>
            <FontAwesomeIcon icon={faBreadSlice}  id="icon" color={location.pathname=="/"? "#e2c26e":"#6f6f6f"}/>
                <span>홈</span>
            </div>
            <div>
                <FontAwesomeIcon id="icon" icon={faHeart} color={location.pathname=="/mypage"? "#46A6FF":"#6f6f6f"}/>
                <span id="mypage">찜</span>
            </div>
            <div onClick={onClickMy}>
                <FontAwesomeIcon id="icon" icon={faBook} color={location.pathname=="/mypage"? "#46A6FF":"#6f6f6f"}/>
                <span id="mypage">일지</span>
            </div>
        </BottomNav>
        </>
    )

}

export default Nav;

const BottomNav = styled.div`

position: fixed;
bottom: 0;
display:flex;
width: 100%;
flex-direction: row;
gap:20%;
align-items:center;
justify-content: center;
padding: 10px 0;
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
    margin-top: 5px;
}

`