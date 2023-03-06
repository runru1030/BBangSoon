import Header from "@app/store/[storeId]/components/Header";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "./Grid";
import ImgModal from "./ImgModal";
import Nav from "./Nav";
interface img {
  imageUrl: string;
}
const StoreImg = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);
  const [storeImgArr, setStoreImgArr] = useState<img[]>([]);

  useEffect(() => {
    axios.post(`/store/image/${storeInfo.id}`).then((res) => {
      setStoreImgArr(res.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header isStoreImg={true} />
        <Wrapper className="col-container">
          <Wrapper>
            <Label style={{ color: "#46A6FF" }}>
              사진 <span id="side">{"총 " + storeImgArr.length + "장"}</span>
            </Label>
            <Grid>
              {storeImgArr.map((img: img) => (
                <div className="container">
                  <ImgModal src={img.imageUrl} width="100%" />
                </div>
              ))}
            </Grid>
          </Wrapper>
        </Wrapper>
        <Nav />
      </Container>
    </>
  );
};
export default StoreImg;
const Container = styled.div``;
const Wrapper = styled.div``;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 90%;
  #side {
    text-align: end;
    font-size: xx-small;
    color: #6f6f6f;
    flex: 1;
  }
`;
