import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext({});

import { ReactNode } from 'react';

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

    const theme = useMemo(()=>
        createTheme({
            palette: {
                mode: themeMode,
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
        }), [themeMode]
    );


    const toggleTheme = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value = useMemo(() => ({ themeMode, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
