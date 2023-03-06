import { userInfoAtoms } from "@app/GlobalProvider";
import { useAtom } from "jotai";
import * as React from "react";
import styled from "styled-components";
interface props {
  setChangeLocMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const siArr = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주특별자치도",
];
const LocList: React.FC<props> = ({ setChangeLocMode }) => {
  const [location, setLocation] = useAtom(userInfoAtoms.locationAtom);

  return (
    <GridContainer>
      {siArr.map((si: string) => (
        <Store
          key={si}
          onClick={() => {
            setLocation({ ...location, si: si });
            setChangeLocMode(false);
          }}
        >
          {si}
        </Store>
      ))}
    </GridContainer>
  );
};
export default LocList;
const Store = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 0;
  border-bottom: ${(props) => `solid thin` + props.theme.color.border_grey};
  border-right: ${(props) => `solid thin` + props.theme.color.border_grey};
  font-size: 18px;
  transition: 0.3s;
  &:active {
    filter: brightness(80%);
  }
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  padding-bottom: 64px;
  grid-template-columns: 50% 50%;
  column-gap: 3px;
  row-gap: 3px;
  cursor: pointer;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
  & > div {
    display: flex;
    background-color: white;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
`;
