"use client";
import { userInfoAtoms } from "@app/GlobalProvider";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header";
// import StoreList, { StoreType } from "../../components/StoreItem";
const Page = () => {
  const router = useRouter();
  const userAtom = useAtomValue(userInfoAtoms.userAtom);

  const [storeArr, setStoreArr] = useState<StrapiStoreType[]>([]);

  useEffect(() => {
    //로그인 처리
    !userAtom.id && router.push("/auth/login");
    axios.get(`/user/wishArr/${userAtom.id}`).then((res) => {
      setStoreArr(res.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faHeart} color="#f89573" />
        <span>관심 매장</span>
      </Header>
      {/* {storeArr.map((store: StrapiStoreType) => (
        <StoreList store={store} />
      ))} */}
    </Container>
  );
};
export default Page;
const Container = styled.div``;
