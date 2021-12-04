import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { DBStoreType } from "../../routes/Store";

interface props {
    onClick: React.MouseEventHandler<HTMLDivElement>,
    isOpen: {
        map: boolean;
        detail: boolean;
        menu: boolean;
        review: boolean;
    }
}
const MenuInfo: React.FC<props> = ({ onClick, isOpen }) => {
    const storeInfo: DBStoreType = useSelector((state: RootState) => state.store.storeObj);

    return (
        <Wrapper>
            <Label id="menu" onClick={onClick} style={isOpen.menu ? { "color": "#46A6FF" } : undefined} >메뉴</Label>
            {isOpen.menu && <div>
                {storeInfo.Menus?.map((menu: any) => 
                <Label>
                    <span id="tit">{menu.tit}</span>
                    <span id="price">{menu.price}</span>
                </Label>)}
            </div>}
        </Wrapper>
    )
}
export default MenuInfo;
const Wrapper = styled.div``
const Label = styled.div`
    font-size: medium;
    padding: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing:border-box;
    span{
        flex:1;
    }
    #tit{
        color: #636363;
        font-weight: lighter;
    }
    #price{
        flex: 1;
        text-align: end;
        color: #46A6FF;
    }
`
