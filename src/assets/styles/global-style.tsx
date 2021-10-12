import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`

  ${normalize}
    *{
      outline: none; 
      font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
    }
    body{
    padding: 0;
    margin: 0;
    width: 100vw;
    }
    a{
    all: unset;
    }
    .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
    }
    .row-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    }
    .col-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    }
    input[type=text]{
    all: unset;
    padding: 5px 10px;
    font-size: medium;
    }
`;

export default GlobalStyle;

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
#search{
    font-size: x-small;
    font-weight: normal;
    flex: 1;
    text-align: end;
    color: #46A6FF;
}
.col-container{
  justify-content: center;
  align-items: center;
  font-size: x-small;
}
.row-container{
  gap: 10px;
}
#bold{
  font-weight: bold;
  font-size: large;
}
.content{
  flex: 1;
  justify-content: flex-end;
}
.visit{
  margin-left: 20px;
  font-size: x-large;
  align-items: center;
  margin-bottom: 5px;
}
.visit #text{
  position: absolute;
  right: 20px;
  transform: translate(-100%);
  color: white;
  font-size: medium;
}
z-index:999;
gap: 10px;
box-sizing: border-box;
#storeName{
    flex: 0.7;
}
.wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
    margin-top: 10px;
    color: #636363;
}
.wrapper>#small{
    font-size: xx-small;
}
.wrapper, #visit{
    flex: 0.1;
}

`
export const Label = styled.div<{ path?: string  }>`
font-size: medium;
padding: 15px;
display: flex;
align-items: center;
${props => props.path != "main" &&
        `border-bottom: solid thin #eeeeee;
`}
${props => props.path == "feed" &&
        `justify-content: center;`}
width: 90%;
span{
    flex:1;
}
#side{
    flex: 0.2;
  text-align: end;
  font-size: xx-small;
  color: #6f6f6f;
}
${props => props.path=="storeImg"&&
`#side{
    flex: 1;
}`}
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

export const ReviewCmp = styled.div`
align-items: flex-start;
width: 90%;
font-size: medium;
padding: 15px;
border-top: ${props=>`solid thin`+props.theme.color.border_grey};
>div{
  padding: 10px 0;
}
#date,#content{
    font-weight: lighter;
}
.wrapper{
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
}
.wrapper >#del-btn{
    flex: 1;
    text-align: end;
    font-size: small;
    color: #aaaaaa;
}
.detail span{
  margin-right: 5px;
  color: #6f6f6f;
}
.reviewImg{
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
`

export const SearchForm=styled.form<{ isAbsolute?:boolean }>`
margin: 20px 0;
justify-content: center;
${props=>props.isAbsolute&&`
  width:100%;
  position: absolute;
  z-index: 99;
  margin-top: 10px;`}
input[type=text]{
  border: ${props=>`solid thin`+props.theme.color.blue};
  border-radius: 5px;
  padding: 10px 20px ;
  box-shadow: 2px 2px 10px 2px #46a6ff1e;
  width: 85%;
  background-color: white;
}
#search-btn{
position: absolute;
transform: translate(42vw);
color: ${props=>props.theme.color.blue};
}
`

export const Grid = styled.div<{ isFeed : boolean }>`
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
  >div{
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