import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { StoreImg } from "../StoreInfoProvider";
interface props {
  imgArr: StoreImg[];
}
const ImgGridContainer: React.FC<props> = ({ imgArr }) => {
  const router = useRouter();

  const onClickStoreImage = () => {
    // router.push("/store/image");
  };
  return (
    <Wrapper>
      {imgArr.length == 1 && (
        <Wrapper>
          <Image
            src={`http://localhost:1337${imgArr[0].attributes.url}`}
            width="100"
            height="100"
            alt="img-1"
          />
        </Wrapper>
      )}
      {imgArr.length == 2 && (
        <GridContainer>
          {imgArr.map((img) => (
            <ImgWrapper key={img.id}>
              <Image
                src={`http://localhost:1337${img.attributes.url}`}
                height="100"
                width="100"
                alt="img-2"
              />
            </ImgWrapper>
          ))}
        </GridContainer>
      )}
      {imgArr.length == 3 && (
        <GridContainer>
          {imgArr.map((img, index) => {
            if (index == 0)
              return (
                <ImgWrapper isBigger key={img.id}>
                  <Image
                    src={`http://localhost:1337${img.attributes.url}`}
                    width="100"
                    height="100"
                    alt="img-1"
                  />
                </ImgWrapper>
              );
            if (index == 2)
              return (
                <ImgWrapper onClick={onClickStoreImage} key={img.id}>
                  <span>더보기</span>
                  <MoreImg
                    className="plus-img"
                    alt="img-more"
                    src={`http://localhost:1337${img.attributes.url}`}
                    width="100"
                    height="100"
                  />
                </ImgWrapper>
              );
            else
              return (
                <ImgWrapper key={img.id}>
                  <Image
                    src={`http://localhost:1337${img.attributes.url}`}
                    width="100"
                    height="100"
                    alt="img"
                  />
                </ImgWrapper>
              );
          })}
        </GridContainer>
      )}
    </Wrapper>
  );
};
export default ImgGridContainer;
const Wrapper = styled.div``;
const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vw;
  grid-template-columns: 50% 50%;
  cursor: pointer;
  span {
    z-index: 999;
    color: white;
    position: absolute;
    font-size: large;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const ImgWrapper = styled.div<{ isBigger?: boolean }>`
  display: flex;
  background-color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.isBigger &&
    `
    grid-row-start: 1;
    grid-row-end: 3;
  `}
`;
const MoreImg = styled(Image)`
  opacity: 50%;
`;
