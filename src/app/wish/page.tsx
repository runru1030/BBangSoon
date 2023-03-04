"use client"
import Nav from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import StoreList, { StoreType } from "../../components/StoreList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const { userObj } = useSelector((state: RootState) => ({
    userObj: state.user.userObj,
  }));
  const { isLoggedin } = useSelector((state: RootState) => ({
    isLoggedin: state.user.isLoggedin,
  }));

  const [storeArr, setStoreArr] = useState<StoreType[]>([]);

  useEffect(() => {
    //로그인 처리
    !isLoggedin && router.push("/auth/login");
    axios.get(`/user/wishArr/${userObj.id}`).then((res) => {
      setStoreArr(res.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faHeart} color="#f89573" />
        <span>관심 매장</span>
      </Header>
      {storeArr.map((store: StoreType) => (
        <StoreList store={store} />
      ))}
      <Nav />
    </Container>
  );
};
export default Page;
const Container = styled.div``;
