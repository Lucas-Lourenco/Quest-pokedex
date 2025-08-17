import React,{ createContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const themas = {
    light: {
        background: '#f0f0f0',
        color: '#000',
        
    },
    dark: {
        background: '#333',
        color: '#fff',
        
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themas.light);

    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === themas.light ? themas.dark : themas.light
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {props.children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
    
}