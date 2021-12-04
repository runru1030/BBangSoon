import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import Search from './Search';
import { resultState } from '../../routes/Main';
import { Header } from '../Header';
interface props {
    setAddressList: React.Dispatch<React.SetStateAction<resultState[]>>
}
const HeaderCmp: React.FC<props> = ({ setAddressList }) => {
    const [isOpen, setIsOpen] = useState(false);     //검색창 open      
    const onClickSearch = () => {
        setIsOpen(prev => !prev);
    }
    return (<>
        <Header>
            <Wrapper><FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도</Wrapper>
            <SearchBtn onClick={onClickSearch}>위치 검색</SearchBtn>
        </Header>
        {isOpen && <Search setIsOpen={setIsOpen} setAddressList={setAddressList} />}
    </>);
}
export default HeaderCmp;
const Wrapper = styled.div``
const SearchBtn = styled.button`
    all: unset;
    font-size: x-small;
    font-weight: normal;
    flex: 1;
    text-align: end;
    color: ${props => props.theme.color.blue};
`