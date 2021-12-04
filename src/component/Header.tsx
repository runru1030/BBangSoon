import styled from "styled-components";

export const Header = styled.header`
    position: sticky;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    top: 0px;
    font-size: medium;
    border-bottom: ${props => `solid thin` + props.theme.color.border_grey};
    background-color: white;
    color:#6f6f6f;
    z-index:999;
    gap: 10px;
    box-sizing: border-box;
    #visit{
        flex: 0.1;
    }
`
export const StoreName=styled.span`
    flex: 0.7;
`
export const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
    margin-top: 10px;
    color: #636363;
        flex: 0.1;
    #small{
        font-size: xx-small;
    }
`