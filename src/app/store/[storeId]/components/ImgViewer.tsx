import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { storeInfoAtoms } from "../StoreInfoProvider";
import Grid from "./ImgGridContainer";

const ImgViewer: React.FC = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);

  return (
    <Wrapper>
      {!storeInfo.store_imgs || storeInfo.store_imgs.length == 0 ? (
        <NomImg className="non-img container">
          <Image
            src="/assets/bread.png"
            alt="non-img"
            width="100"
            height="100"
          />
          <span>{storeInfo.name}</span>
        </NomImg>
      ) : (
        <Grid imgArr={storeInfo.store_imgs} />
      )}
    </Wrapper>
  );
};
export default ImgViewer;
const Wrapper = styled.div``;
const NomImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  span {
    margin-top: 30px;
  }
`;
