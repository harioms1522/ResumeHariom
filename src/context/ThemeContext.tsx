import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext({});

import { ReactNode } from 'react';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#010342',
        },
        secondary: {
            main: '#ff64da',
        },
        background: {
            default: '#ffffff',
            paper: '#f0f0f0',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#64ffda',
        },
        secondary: {
            main: '#ff64da',
        },
        background: {
            default: '#0a192f',
            paper: '#112240',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
    

    const theme = useMemo(() =>
        themeMode === 'dark' ? darkTheme : lightTheme, [themeMode]
    );


    const toggleTheme = () => {
        localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light');
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedTheme) {
            setThemeMode(savedTheme);
        }
    }, []);

    const value = useMemo(() => ({ themeMode, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
