"use client";
import {
  faBook,
  faBreadSlice,
  faHeart,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { throttle } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const Nav: React.FC = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      throttle((e) => {
        const currentScrollY = e.touches[0].screenY;
        if (beforeScrollY.current > currentScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 250),
    [beforeScrollY]
  );
  return (
    <div
      className={clsx(
        visible ? "visible" : "invisible",
        "sticky bottom-0 left-0 flex w-full justify-around bg-white py-2.5"
      )}
    >
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
    </div>
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
