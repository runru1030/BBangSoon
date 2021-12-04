import { faBook, faBreadSlice, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const onClickNav = (e: React.MouseEvent) => {
        history.push("/" + e.currentTarget.id);
    }
    return (<><BottomNav>
        <Wrapper id="" onClick={onClickNav}>
            <FontAwesomeIcon icon={faBreadSlice} id="icon" color={location.pathname == "/" ? "#e2c26e" : "#6f6f6f"} />
            <span>홈</span>
        </Wrapper>
        <Wrapper id="storemap" onClick={onClickNav}>
            <FontAwesomeIcon id="icon" icon={faMapMarkerAlt} color={location.pathname == "/storemap" ? "#46A6FF" : "#6f6f6f"} />
            <span>빵 지도</span>
        </Wrapper>

        <Wrapper id="wish" onClick={onClickNav}>
            <FontAwesomeIcon id="icon" icon={faHeart} color={location.pathname == "/wish" ? "#f89573" : "#6f6f6f"} />
            <span>관심</span>
        </Wrapper>
        <Wrapper id="feed" onClick={onClickNav}>
            <FontAwesomeIcon id="icon" icon={faBook} color={location.pathname == "/feed" ? "#46A6FF" : "#6f6f6f"} />
            <span>일지</span>
        </Wrapper>
    </BottomNav>
    </>
    )

}

export default Nav;
const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;  
    #icon{
        font-size: large;
        margin-bottom: 5px;
    }
    span{
        font-size: xx-small;
        margin-top: 5px;
    }
`
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
    border-top: ${props => `solid thin` + props.theme.color.border_grey};
    background-color: white;
`