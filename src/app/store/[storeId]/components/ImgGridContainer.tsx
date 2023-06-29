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
            src={`${process.env.NEXT_PUBLIC_DOMAIN}${imgArr[0].url}`}
            width="100"
            height="100"
            alt="img-1"
            unoptimized={true}
          />
        </Wrapper>
      )}
      {imgArr.length == 2 && (
        <GridContainer>
          {imgArr.map((img) => (
            <ImgWrapper key={img.name}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}${img.url}`}
                height="100"
                width="100"
                alt="img-2"
                unoptimized={true}
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
                <ImgWrapper isBigger key={img.name + index}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}${img.url}`}
                    width="100"
                    height="100"
                    alt="img-1"
                    unoptimized={true}
                  />
                </ImgWrapper>
              );
            if (index == 2)
              return (
                <ImgWrapper onClick={onClickStoreImage} key={img.name + index}>
                  <span>더보기</span>
                  <MoreImg
                    className="plus-img"
                    alt="img-more"
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}${img.url}`}
                    width="100"
                    height="100"
                    unoptimized={true}
                  />
                </ImgWrapper>
              );
            else
              return (
                <ImgWrapper key={img.name + index}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}${img.url}`}
                    width="100"
                    height="100"
                    alt="img"
                    unoptimized={true}
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
