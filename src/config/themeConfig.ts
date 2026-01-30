/**
 * Centralized Theme Configuration
 * Change the entire website color scheme by updating the ACTIVE_THEME constant below
 */

export type ColorPalette = {
    name: string;
    light: {
        primary: string;
        secondary: string;
        accent?: string;
        backgroundDefault: string;
        backgroundPaper: string;
        textPrimary: string;
        textSecondary: string;
        shadowColor: string;
    };
    dark: {
        primary: string;
        secondary: string;
        accent?: string;
        backgroundDefault: string;
        backgroundPaper: string;
        textPrimary: string;
        textSecondary: string;
        shadowColor: string;
    };
    meta: {
        themeColor: string; // For meta tags
        description: string;
    };
};

/**
 * Available Theme Palettes
 */
export const THEME_PALETTES: Record<string, ColorPalette> = {
    matrixGreen: {
        name: 'Matrix Green',
        light: {
            primary: '#059669',        // Emerald 600
            secondary: '#10b981',      // Emerald 500
            accent: '#65a30d',         // Lime 600
            backgroundDefault: '#f0fdf4', // Green 50
            backgroundPaper: '#ffffff',
            textPrimary: '#064e3b',    // Emerald 900
            textSecondary: '#047857',  // Emerald 700
            shadowColor: 'rgba(5,150,105,0.08)',
        },
        dark: {
            primary: '#10b981',        // Emerald 500
            secondary: '#34d399',      // Emerald 400
            accent: '#84cc16',         // Lime 500
            backgroundDefault: '#0a0f0a', // Very dark green-black
            backgroundPaper: '#0f1e13',   // Dark forest green
            textPrimary: '#ecfdf5',    // Emerald 50
            textSecondary: '#6ee7b7',  // Emerald 300
            shadowColor: 'rgba(16,185,129,0.15)',
        },
        meta: {
            themeColor: '#10b981',
            description: 'Matrix-inspired emerald green tech aesthetic',
        },
    },

    cyberpunkPurple: {
        name: 'Cyberpunk Purple',
        light: {
            primary: '#7c3aed',        // Violet 600
            secondary: '#a78bfa',      // Violet 400
            accent: '#06b6d4',         // Cyan 500
            backgroundDefault: '#faf5ff', // Violet 50
            backgroundPaper: '#ffffff',
            textPrimary: '#5b21b6',    // Violet 900
            textSecondary: '#6d28d9',  // Violet 800
            shadowColor: 'rgba(124,58,237,0.08)',
        },
        dark: {
            primary: '#a78bfa',        // Violet 400
            secondary: '#c4b5fd',      // Violet 300
            accent: '#22d3ee',         // Cyan 400
            backgroundDefault: '#0a0612', // Deep purple-black
            backgroundPaper: '#1a0f2e',   // Dark purple
            textPrimary: '#f5f3ff',    // Violet 50
            textSecondary: '#ddd6fe',  // Violet 200
            shadowColor: 'rgba(167,139,250,0.15)',
        },
        meta: {
            themeColor: '#a78bfa',
            description: 'Futuristic cyberpunk purple and cyan',
        },
    },

    oceanBlue: {
        name: 'Ocean Blue',
        light: {
            primary: '#0284c7',        // Sky 600
            secondary: '#0ea5e9',      // Sky 500
            accent: '#06b6d4',         // Cyan 500
            backgroundDefault: '#f0f9ff', // Sky 50
            backgroundPaper: '#ffffff',
            textPrimary: '#0c4a6e',    // Sky 900
            textSecondary: '#075985',  // Sky 800
            shadowColor: 'rgba(2,132,199,0.08)',
        },
        dark: {
            primary: '#0ea5e9',        // Sky 500
            secondary: '#38bdf8',      // Sky 400
            accent: '#22d3ee',         // Cyan 400
            backgroundDefault: '#020617', // Very dark blue-black
            backgroundPaper: '#0c1929',   // Dark ocean blue
            textPrimary: '#f0f9ff',    // Sky 50
            textSecondary: '#7dd3fc',  // Sky 300
            shadowColor: 'rgba(14,165,233,0.15)',
        },
        meta: {
            themeColor: '#0ea5e9',
            description: 'Modern ocean blue and cyan',
        },
    },

    sunsetGradient: {
        name: 'Sunset Gradient',
        light: {
            primary: '#ea580c',        // Orange 600
            secondary: '#f97316',      // Orange 500
            accent: '#ec4899',         // Pink 500
            backgroundDefault: '#fff7ed', // Orange 50
            backgroundPaper: '#ffffff',
            textPrimary: '#7c2d12',    // Orange 900
            textSecondary: '#9a3412',  // Orange 800
            shadowColor: 'rgba(234,88,12,0.08)',
        },
        dark: {
            primary: '#f97316',        // Orange 500
            secondary: '#fb923c',      // Orange 400
            accent: '#f472b6',         // Pink 400
            backgroundDefault: '#0f0a08', // Deep warm black
            backgroundPaper: '#1f130d',   // Dark warm brown
            textPrimary: '#ffedd5',    // Orange 100
            textSecondary: '#fed7aa',  // Orange 200
            shadowColor: 'rgba(249,115,22,0.15)',
        },
        meta: {
            themeColor: '#f97316',
            description: 'Warm sunset orange and pink gradient',
        },
    },

    neonMulti: {
        name: 'Neon Multicolor',
        light: {
            primary: '#d946ef',        // Fuchsia 500
            secondary: '#06b6d4',      // Cyan 500
            accent: '#eab308',         // Yellow 500
            backgroundDefault: '#faf5ff', // Fuchsia 50
            backgroundPaper: '#ffffff',
            textPrimary: '#701a75',    // Fuchsia 900
            textSecondary: '#86198f',  // Fuchsia 800
            shadowColor: 'rgba(217,70,239,0.08)',
        },
        dark: {
            primary: '#e879f9',        // Fuchsia 400
            secondary: '#22d3ee',      // Cyan 400
            accent: '#facc15',         // Yellow 400
            backgroundDefault: '#0a0a0f', // Very dark purple-black
            backgroundPaper: '#18101f',   // Dark purple
            textPrimary: '#fdf4ff',    // Fuchsia 50
            textSecondary: '#f0abfc',  // Fuchsia 300
            shadowColor: 'rgba(232,121,249,0.15)',
        },
        meta: {
            themeColor: '#e879f9',
            description: 'Bold neon multicolor with pink, cyan, and yellow',
        },
    },

    slate: {
        name: 'Professional Slate',
        light: {
            primary: '#0f172a',        // Slate 900
            secondary: '#475569',      // Slate 600
            backgroundDefault: '#fafafa',
            backgroundPaper: '#ffffff',
            textPrimary: '#0f172a',    // Slate 900
            textSecondary: '#475569',  // Slate 600
            shadowColor: 'rgba(0,0,0,0.06)',
        },
        dark: {
            primary: '#f1f5f9',        // Slate 100
            secondary: '#94a3b8',      // Slate 400
            backgroundDefault: '#0f172a', // Slate 900
            backgroundPaper: '#1e293b',   // Slate 800
            textPrimary: '#f1f5f9',    // Slate 100
            textSecondary: '#94a3b8',  // Slate 400
            shadowColor: 'rgba(0,0,0,0.2)',
        },
        meta: {
            themeColor: '#0f172a',
            description: 'Classic professional slate gray',
        },
    },
};

/**
 * ⚡ CHANGE THIS LINE TO SWITCH THEMES ⚡
 * Available options: 'matrixGreen', 'cyberpunkPurple', 'oceanBlue', 'sunsetGradient', 'neonMulti', 'slate'
 */
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'matrixGreen';

/**
 * Get the currently active theme palette
 */
export const getActiveTheme = (): ColorPalette => {
    return THEME_PALETTES[ACTIVE_THEME];
};

/**
 * Helper to get scrollbar colors based on theme
 */
export const getScrollbarColors = (mode: 'light' | 'dark') => {
    const theme = getActiveTheme();
    const palette = mode === 'dark' ? theme.dark : theme.light;
    
    return {
        track: palette.backgroundDefault,
        thumb: palette.primary,
    };
};

/**
 * Helper to get rgba backdrop color for header
 */
export const getBackdropColor = (mode: 'light' | 'dark') => {
    const theme = getActiveTheme();
    if (mode === 'dark') {
        // Extract RGB from hex and add opacity
        const bg = theme.dark.backgroundDefault;
        const r = parseInt(bg.slice(1, 3), 16);
        const g = parseInt(bg.slice(3, 5), 16);
        const b = parseInt(bg.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 0.82)`;
    } else {
        return 'rgba(255, 255, 255, 0.82)';
    }
};
