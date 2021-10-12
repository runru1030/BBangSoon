import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationInfo } from '../modules/user';
import { RootState } from '../modules';
interface props {
  setChangeSi: React.Dispatch<React.SetStateAction<boolean>>
}
const LocList: React.FC<props> = ({ setChangeSi }) => {
  const location = useSelector((state: RootState) => state.user.location);
  const dispatch = useDispatch();
  const onClick = (si: string) => {
    dispatch(setLocationInfo({ ...location, si: si }))
    setChangeSi(false);
  }
  const siArr = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주특별자치도"]
  return (<GridContainer>
    {siArr.map((it: string) => <Store onClick={(e) => onClick(it)}>{it}</Store>)}
  </GridContainer>);
}
export default LocList;
const Store = styled.div`
display: flex;
align-items: center;
padding: 35px 0;
border-bottom: ${props => `solid thin` + props.theme.color.border_grey};
border-right: ${props => `solid thin` + props.theme.color.border_grey};
font-weight: lighter;
`

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vw;
  grid-template-columns: 50% 50%;
  column-gap: 3px;
row-gap: 3px;
  cursor: pointer;
border-top: ${props => `solid thin` + props.theme.color.border_grey};
>div{
  display: flex;
  background-color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
`