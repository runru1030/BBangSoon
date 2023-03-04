import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import { resultState } from "../../home/page";
interface props {
  setAddressList: React.Dispatch<React.SetStateAction<resultState[]>>;
}
const Header: React.FC<props> = ({ setAddressList }) => {
  const [isOpen, setIsOpen] = useState(false); //검색창 open
  const onClickSearch = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <StyledHeader>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도
        </div>
        <SearchBtn onClick={onClickSearch}>위치 검색</SearchBtn>
      </StyledHeader>
      {isOpen && (
        <Search setIsOpen={setIsOpen} setAddressList={setAddressList} />
      )}
    </>
  );
};
export default Header;
const StyledHeader = styled.header`
    position: sticky;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    top: 0px;
    font-size: medium;
    border-bottom: ${props => `solid thin` + props.theme.color.border_grey};
    background-color: white;
    color:#6f6f6f;
    z-index:999;
    gap: 10px;
    box-sizing: border-box;
    #visit{
        flex: 0.1;
    }
`
const SearchBtn = styled.button`
  all: unset;
  font-size: x-small;
  font-weight: normal;
  flex: 1;
  text-align: end;
  color: ${(props) => props.theme.color.blue};
`;
