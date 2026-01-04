import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../utils/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        // Apply colors
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Apply styles
        root.style.setProperty('--radius', theme.styles.radius);

        // Apply font
        // Note: In a real app, we'd load the font dynamically. 
        // For now, we assume standard fonts or imported ones.
        root.style.fontFamily = theme.styles.font;

    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
