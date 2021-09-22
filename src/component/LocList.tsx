import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationInfo } from '../modules/user';
type child={
    setChangeSi:React.Dispatch<React.SetStateAction<boolean>>
}
const LocList :React.FC<child> = ({setChangeSi}) => {
    const location = useSelector((state: any) => state.user.location);
    const dispatch= useDispatch();
    const onClick = (si:string) => {
       dispatch(setLocationInfo({...location, si:si }))
       setChangeSi(false);
    }
    const siArr=["서울","부산", "대구","인천", "광주" ,"대전" , "울산", "세종", "경기", "강원", "충북", "충남","전북","전남","경북","경남","제주"]
    return (<div className="grid-container">
        {siArr.map((it:string)=><Store onClick={(e)=>onClick(it)}>{it}</Store>)}
    </div>);
}
export default LocList;
const Store = styled.div`
display: flex;
align-items: center;
padding: 35px 0;
border-bottom: solid thin #eeeeee;
border-right: solid thin #eeeeee;
font-weight: lighter;
`