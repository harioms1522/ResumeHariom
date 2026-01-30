import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext({});

import { ReactNode } from 'react';

const fontFamily = '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0f172a',
        },
        secondary: {
            main: '#475569',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#475569',
        },
    },
    typography: {
        fontFamily,
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f1f5f9',
        },
        secondary: {
            main: '#94a3b8',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
        },
    },
    typography: {
        fontFamily,
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                },
            },
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
