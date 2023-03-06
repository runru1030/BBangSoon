import React from 'react'
import ImgModal from '../../../../components/ImgModal';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
interface props {
  imgArr: { url: string }[]
}
const ImgGridContainer: React.FC<props> = ({ imgArr }) => {
  const router = useRouter();

  const onClickStoreImage = () => {
    // router.push("/store/image");
  }
  return (
    <Wrapper>
      {imgArr.length == 1 &&
        <Wrapper>
          <ImgModal src={imgArr[0].url} width="100%" height="100%" />
        </Wrapper>
      }
      {imgArr.length == 2 &&
        <GridContainer>
          {imgArr.map(it => <ImgWrapper><ImgModal src={it.url} height="100%" /></ImgWrapper>)}
        </GridContainer>
      }
      {imgArr.length == 3 &&
        <GridContainer>
          {imgArr.map((it, index) => {
            if (index == 0)
              return <ImgWrapper isBigger><ImgModal src={it.url} height="100%" /></ImgWrapper>
            if (index == 2)
              return <ImgWrapper onClick={onClickStoreImage}>
                <span>더보기</span>
                <MoreImg className="plus-img" height="100%" src={it.url} />
              </ImgWrapper>
            else return <ImgWrapper><ImgModal src={it.url} height="100%" /></ImgWrapper>
          })}
        </GridContainer>}
    </Wrapper>
  )
}
export default ImgGridContainer;
const Wrapper = styled.div``
const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vw;
  grid-template-columns: 50% 50%;
  column-gap: 3px;
  row-gap: 3px;
  cursor: pointer;
  span{
    z-index: 999;
    color: white;
    position: absolute;
    font-size: large;
  }
  img{
    object-fit: cover;
  }
`
const ImgWrapper = styled.div<{isBigger?:boolean}>`
  display: flex;
  background-color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  ${props=>props.isBigger&&`
    grid-row-start: 1;
    grid-row-end: 3;
  `}
`
const MoreImg=styled.img`
  opacity: 50%;
`