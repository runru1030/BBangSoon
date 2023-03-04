import {
  faBook,
  faBreadSlice,
  faHeart,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Nav: React.FC = () => {
  const pathname = usePathname();
  return (
    <BottomNav>
      <StyledLink href="/home">
        <FontAwesomeIcon
          icon={faBreadSlice}
          id="icon"
          color={pathname == "/" ? "#e2c26e" : "#6f6f6f"}
        />
        <span>홈</span>
      </StyledLink>
      <StyledLink href="/map">
        <FontAwesomeIcon
          id="icon"
          icon={faMapMarkerAlt}
          color={pathname == "/storemap" ? "#46A6FF" : "#6f6f6f"}
        />
        <span>빵 지도</span>
      </StyledLink>

      <StyledLink href="/wish">
        <FontAwesomeIcon
          id="icon"
          icon={faHeart}
          color={pathname == "/wish" ? "#f89573" : "#6f6f6f"}
        />
        <span>관심</span>
      </StyledLink>
      <StyledLink href="/feed">
        <FontAwesomeIcon
          id="icon"
          icon={faBook}
          color={pathname == "/feed" ? "#46A6FF" : "#6f6f6f"}
        />
        <span>일지</span>
      </StyledLink>
    </BottomNav>
  );
};

export default Nav;
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  #icon {
    font-size: large;
    margin-bottom: 5px;
  }
  span {
    font-size: xx-small;
    margin-top: 5px;
  }
`;
const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 20%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
  background-color: white;
`;
