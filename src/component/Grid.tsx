import React from 'react'
import ImgModal from './ImgModal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Grid: React.FC<any> = ({ imgArr }) => {
  const history = useHistory();

  const onClickStoreImage = () => {
    history.push("/store/image");
  }
  return (
    <>
      <div className="grid-wrapper" >
        {imgArr.length == 1 &&
          <div className="single-grid-container">
            <ImgModal src={imgArr[0].url} width="100%" height="100%" />
          </div>
        }
        {imgArr.length == 2 &&
          <GridContainer>
            {imgArr.map((it: any) => <div><ImgModal src={it.url} height="100%" /></div>)}
          </GridContainer>
        }
        {imgArr.length == 3 &&
          <GridContainer>
            {imgArr.map((it: any, index: number) => {
              if (index == 0) return <div className="item1">
                <ImgModal src={it.url} height="100%" /></div>
              if (index == 2) return <div onClick={onClickStoreImage}>
                <span>더보기</span>
                <img className="plus-img" height="100%" src={it.url} />
              </div>
              else return <div><ImgModal src={it.url} height="100%" /></div>
            })}

          </GridContainer>}
      </div>
    </>
  )
}
export default Grid;
const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vw;
  grid-template-columns: 50% 50%;
  column-gap: 3px;
row-gap: 3px;
  cursor: pointer;

>div{
  display: flex;
  background-color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
span{
  z-index: 999;
  color: white;
  position: absolute;
  font-size: large;
}
.plus-img{
  opacity: 50%;
}
.item1{
  grid-row-start: 1;
  grid-row-end: 3;
}
img{
  object-fit: cover;
}
`