import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "./EditForm";
import { reviewType } from "../page";
import { RootState } from "@store/index";
import { setLoggedInfo } from "@store/user";
import { Header } from "@components/Header";
import { useRouter } from "next/navigation";

interface props {
  reviewArr: reviewType[];
  visitCnt: number;
  onClickHandler: React.MouseEventHandler<HTMLDivElement>;
}
const HeaderCmp: React.FC<props> = ({
  reviewArr,
  visitCnt,
  onClickHandler,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userObj } = useSelector((state: RootState) => ({
    userObj: state.user.userObj,
  }));

  const [isOpenModal, setIsOpenModal] = useState(false);
  const onClickName = () => {
    setIsOpenModal(true);
  };

  const wrapperRef = React.useRef<HTMLImageElement>(null);

  //외부영역 클릭 감지
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target as Node)) {
      setIsOpenModal(false);
    } else {
      setIsOpenModal(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  /* 닉네임 변경 */
  const [editNick, setEditNick] = useState(false);
  const onClickEditNick = () => {
    setEditNick((prev) => !prev);
    setIsOpenModal(false);
  };
  /* Logout */
  const onClickLogout = () => {
    axios.post("/auth/logout").then((res) => {
      if (res.status == 200) {
        dispatch(setLoggedInfo(userObj, false));
        window.localStorage.removeItem("token");
        router.push("/");
      }
    });
  };
  return (
    <>
      <Header className="row-container">
        <span onClick={onClickName}>{userObj.nickName}</span>
        {isOpenModal && (
          <Modal className="col-container" ref={wrapperRef}>
            <span onClick={onClickLogout}>로그아웃</span>
            <span onClick={onClickEditNick}>닉네임 변경</span>
          </Modal>
        )}

        <Content className="row-container">
          <FeedWrapper
            className="col-container"
            id="feed"
            onClick={onClickHandler}
          >
            <span id="bold">{reviewArr.length}</span>
            <span>일지</span>
          </FeedWrapper>
          <VisitWrapper
            className="row-container"
            id="visit"
            onClick={onClickHandler}
          >
            <span>
              <FontAwesomeIcon icon={faBreadSlice} color="#e2c26e" />
            </span>
            <span id="text">{visitCnt}</span>
          </VisitWrapper>
        </Content>
      </Header>
      {editNick && (
        <EditForm setEditNick={setEditNick} onClickEditNick={onClickEditNick} />
      )}
    </>
  );
};
export default HeaderCmp;

const Modal = styled.div`
  padding: 10px 15px;
  gap: 10px;
  border: solid thin ${(props) => props.theme.color.blue};
  position: absolute;
  background-color: white;
  margin-left: 60px;
  margin-top: 30px;
  border-radius: 5px;
  font-size: medium;
  font-weight: lighter;
  font-size: x-small;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  justify-content: flex-end;
  #bold {
    font-weight: bold;
    font-size: large;
  }
`;

const VisitWrapper = styled.div`
  margin-left: 20px;
  font-size: x-large;
  align-items: center;
  margin-bottom: 5px;
  #text {
    position: absolute;
    right: 20px;
    transform: translate(-100%);
    color: white;
    font-size: medium;
  }
`;
const FeedWrapper = styled.div`
  align-items: center;
  font-size: small;
`;
