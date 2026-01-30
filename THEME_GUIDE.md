# 🎨 Theme Configuration System

This project uses a centralized theme configuration system that allows you to change the entire website's color scheme with a **single line change**.

## Quick Start: Changing Themes

To change your website's theme, simply update one line in `src/config/themeConfig.ts`:

```typescript
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'matrixGreen';
```

Change `'matrixGreen'` to any of the available theme names below.

## 🎨 Available Themes

### 1. Matrix Green (`matrixGreen`)
**Current Active Theme**
- Matrix-inspired emerald green tech aesthetic
- Perfect for: Developer portfolios, tech projects
- Colors: Emerald greens with lime accents

### 2. Cyberpunk Purple (`cyberpunkPurple`)
- Futuristic cyberpunk purple and cyan
- Perfect for: Creative tech, gaming portfolios
- Colors: Deep purples with cyan accents

### 3. Ocean Blue (`oceanBlue`)
- Modern ocean blue and cyan
- Perfect for: Professional tech, corporate
- Colors: Sky blues with cyan highlights

### 4. Sunset Gradient (`sunsetGradient`)
- Warm sunset orange and pink gradient
- Perfect for: Creative portfolios, design-focused sites
- Colors: Oranges with pink accents

### 5. Neon Multi (`neonMulti`)
- Bold neon multicolor with pink, cyan, and yellow
- Perfect for: Bold creative statements, art portfolios
- Colors: Fuchsia, cyan, and yellow neons

### 6. Professional Slate (`slate`)
- Classic professional slate gray (original theme)
- Perfect for: Traditional professional portfolios
- Colors: Neutral slate grays

## How It Works

The theme system is built on three layers:

### 1. **Theme Config** (`src/config/themeConfig.ts`)
Central configuration file containing all theme palettes. Each theme defines:
- Light mode colors
- Dark mode colors
- Shadow effects
- Meta theme color for browser UI

### 2. **Theme Context** (`src/context/ThemeContext.tsx`)
Material-UI theme provider that pulls colors from the active theme config and applies them throughout the app.

### 3. **Component Integration**
Components automatically inherit theme colors through:
- MUI theme tokens (`'primary.main'`, `'text.primary'`, etc.)
- Theme config helpers for special cases (scrollbars, backdrops)

## Creating Custom Themes

To add your own theme:

1. Open `src/config/themeConfig.ts`
2. Add a new entry to `THEME_PALETTES`:

```typescript
myCustomTheme: {
    name: 'My Custom Theme',
    light: {
        primary: '#your-color',
        secondary: '#your-color',
        accent: '#your-color',
        backgroundDefault: '#your-color',
        backgroundPaper: '#ffffff',
        textPrimary: '#your-color',
        textSecondary: '#your-color',
        shadowColor: 'rgba(r,g,b,0.08)',
    },
    dark: {
        primary: '#your-color',
        secondary: '#your-color',
        accent: '#your-color',
        backgroundDefault: '#your-color',
        backgroundPaper: '#your-color',
        textPrimary: '#your-color',
        textSecondary: '#your-color',
        shadowColor: 'rgba(r,g,b,0.15)',
    },
    meta: {
        themeColor: '#your-color',
        description: 'Your theme description',
    },
},
```

3. Update `ACTIVE_THEME` to use your new theme:

```typescript
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'myCustomTheme';
```

## Color Guidelines

### Light Theme Colors
- **Primary**: Main brand color (buttons, links)
- **Secondary**: Accent color (hover states, secondary actions)
- **Accent**: Highlight color (active states, special elements)
- **Background Default**: Page background
- **Background Paper**: Card/section backgrounds
- **Text Primary**: Main text color
- **Text Secondary**: Less prominent text

### Dark Theme Colors
Follow the same structure but optimized for dark backgrounds.

### Best Practices
- Ensure WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI elements)
- Test both light and dark modes
- Use darker backgrounds and brighter text for dark mode
- Add subtle transparency to shadows with rgba()

## Files Using Theme Config

The following files automatically pull from `themeConfig.ts`:

- ✅ `src/context/ThemeContext.tsx` - Main theme provider
- ✅ `src/components/CodeBlock.tsx` - Code block styling
- ✅ `src/components/Header.tsx` - Header backdrop
- ✅ `src/pages/Home.tsx` - Meta theme color
- ✅ `src/App.tsx` - Scrollbar colors
- ✅ `src/index.css` - CSS variable integration

## Switching Themes on Production

To change themes in production:

1. Edit `src/config/themeConfig.ts`
2. Change the `ACTIVE_THEME` constant
3. Commit and push:
   ```bash
   git add src/config/themeConfig.ts
   git commit -m "Switch to [theme-name] theme"
   git push
   ```
4. Your build system will automatically deploy the new theme

## Seasonal Theme Switching

You can programmatically switch themes based on conditions:

```typescript
// In themeConfig.ts
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 9 && month <= 11) return 'sunsetGradient'; // Fall
  if (month >= 3 && month <= 5) return 'oceanBlue'; // Spring
  return 'matrixGreen'; // Default
};

export const ACTIVE_THEME = getCurrentSeason();
```

## Troubleshooting

**Q: Theme not updating after change?**
- Clear your browser cache or hard refresh (Ctrl+Shift+R)
- Restart the dev server if in development

**Q: Some colors not changing?**
- Check if any components have hardcoded colors
- Use browser dev tools to inspect which CSS is being applied

**Q: Contrast issues?**
- Test with WebAIM Contrast Checker
- Adjust text colors for better readability

## Contributing Themes

Have a great theme to share? Add it to `THEME_PALETTES` and submit a PR!

---

**Pro Tip**: Preview all themes locally by temporarily switching `ACTIVE_THEME` and refreshing the page. No need to restart the dev server!
