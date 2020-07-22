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
`;

export default GlobalStyle;
