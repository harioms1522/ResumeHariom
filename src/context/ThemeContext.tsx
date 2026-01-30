import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getActiveTheme } from '../config/themeConfig';

export const ThemeContext = createContext({});

import { ReactNode } from 'react';

const fontFamily = '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif';

// Get the active theme configuration
const activeTheme = getActiveTheme();

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: activeTheme.light.primary,
        },
        secondary: {
            main: activeTheme.light.secondary,
        },
        background: {
            default: activeTheme.light.backgroundDefault,
            paper: activeTheme.light.backgroundPaper,
        },
        text: {
            primary: activeTheme.light.textPrimary,
            secondary: activeTheme.light.textSecondary,
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
                    boxShadow: `0 1px 3px ${activeTheme.light.shadowColor}`,
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: activeTheme.dark.primary,
        },
        secondary: {
            main: activeTheme.dark.secondary,
        },
        background: {
            default: activeTheme.dark.backgroundDefault,
            paper: activeTheme.dark.backgroundPaper,
        },
        text: {
            primary: activeTheme.dark.textPrimary,
            secondary: activeTheme.dark.textSecondary,
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
                    boxShadow: `0 1px 3px ${activeTheme.dark.shadowColor}`,
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
