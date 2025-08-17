import React,{ useContext } from "react";
import { ThemeContext } from "../contextApi/ThemeContext";
import Header from "./Header";

export default function Layout({ children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ background: theme.background, color: theme.color,
        
            
        }}>
            <Header />
            {children}
        </div>
    );
}