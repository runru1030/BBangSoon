import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import SearchSection from "./SearchSection";
const Header = () => {
  return (
    <StyledHeader>
      <div>
        <FontAwesomeIcon icon={faMapMarkerAlt} /> 빵 지도
      </div>
      <SearchSection.triggerBtn />
    </StyledHeader>
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
  border-bottom: ${(props) => `solid thin` + props.theme.color.border_grey};
  background-color: white;
  color: #6f6f6f;
  z-index: 999;
  gap: 10px;
  box-sizing: border-box;
  #visit {
    flex: 0.1;
  }
`;
