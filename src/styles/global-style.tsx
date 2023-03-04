import { createGlobalStyle } from "styled-components";
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
    button{
      all:unset;
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
