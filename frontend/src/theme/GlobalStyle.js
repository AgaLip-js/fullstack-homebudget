import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*:focus {
  outline: none;
}
body{
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    height: 100%;
    width: 100%;
    background-color: #e8f3f9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    color: black;

}
*::-webkit-scrollbar {
  width: 10px;
background-color: #05273B;

}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #05273B; 
  border-radius: 10px;

}
 
*::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 10px;
  outline: 1px solid #05273B;

  &:hover{
 
  }
}
`;

export default GlobalStyle;
