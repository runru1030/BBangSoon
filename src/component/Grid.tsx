import styled from "styled-components";

export const Grid = styled.div<{ isFeed ?: boolean }>`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(3, 33vw);
    grid-auto-rows: 33vw;
    gap: 1px;
    div{
        overflow: hidden;
    }
    .img{
        height: 100%;
        object-fit: cover;
    }
  ${props=>props.isFeed&&`
    &>div{
        width: 100%;
        height: 100%;
        display: flex;
        background-color: white;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        border: solid thin #e9e9e9; 
    }
    img{
        width: 40vw;
    }
`}
    #bread{
    width: 50%;
    }
`