import React,{ useContext } from "react";
import { ThemeContext } from "../contextApi/ThemeContext";
import styled from "styled-components";
export default function Header(){
    const {toggleTheme} = useContext(ThemeContext);

    return(
        <HeaderStyle>
            <h1>Pokedex</h1>
            <Button onClick={toggleTheme}>Light/Dark</Button>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin:15px
`;

const Button = styled.button`
    margin-top: 20px;
  padding: 12px 20px;
  background: #1f2122ff;
  color: white;
  border: 1px solid #ccccccff;
  border-radius: 12px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #ccccccff;
    background: #333536a6;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
    
    &:focus {
    outline: none;
    border-color: #ccccccff; 
  }
`;