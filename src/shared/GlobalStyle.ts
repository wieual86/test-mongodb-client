import { createGlobalStyle } from "styled-components";

import Theme from "shared/Theme";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${Theme.theme.background}
    hyphens: auto;
    overflow-wrap: break-word;
    background-attachment: fixed;
    margin: 0;
  }
  *, *:before, *:after {
    box-sizing:border-box;
  }
  div, ul, li {
    background-color: inherit;
  }
  button, a {
    display: inline-block;
    background: transparent;
    border: none !important;
    outline: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: inherit;
    text-decoration: none;
    vertical-align: middle;
  }
`;

export default GlobalStyle;
