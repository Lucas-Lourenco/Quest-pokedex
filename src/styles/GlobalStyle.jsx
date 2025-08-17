
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: sans-serif;
  }

  button {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border: ${({ theme }) => theme.border};
    cursor: pointer;
   
    
    border-radius: 5px;
  }

  a {
  
   
    text-decoration: none;
    color: inherit;
  }
`;
