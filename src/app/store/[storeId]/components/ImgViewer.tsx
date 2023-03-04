import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import { useSelector } from "react-redux";
import { DBStoreType } from "../page";
import { RootState } from "@store/index";

const ImgViewer: React.FC = () => {
  const storeInfo: DBStoreType = useSelector(
    (state: RootState) => state.store.storeObj
  );

  return (
    <Wrapper>
      {!storeInfo.StoreImgs || storeInfo.StoreImgs.length == 0 ? (
        <NomImg className="non-img container">
          <img src="bread.png" width="40%" />
          <span>{storeInfo.place_name}</span>
        </NomImg>
      ) : (
        <Grid
          imgArr={storeInfo.StoreImgs.map((img) => ({ url: img.imageUrl }))}
        />
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
