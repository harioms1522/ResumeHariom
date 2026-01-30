# Theme System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    src/config/themeConfig.ts                │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │   THEME_PALETTES (6 complete themes)              │   │
│  │   • matrixGreen                                    │   │
│  │   • cyberpunkPurple                                │   │
│  │   • oceanBlue                                      │   │
│  │   • sunsetGradient                                 │   │
│  │   • neonMulti                                      │   │
│  │   • slate                                          │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ⚡ ACTIVE_THEME = 'matrixGreen' ← CHANGE THIS LINE!      │
│                                                             │
│  Helper Functions:                                          │
│  • getActiveTheme()                                         │
│  • getScrollbarColors(mode)                                 │
│  • getBackdropColor(mode)                                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ imports
                            ▼
    ┌───────────────────────────────────────────────────┐
    │                   Consumers                        │
    ├───────────────────────────────────────────────────┤
    │                                                    │
    │  src/context/ThemeContext.tsx                     │
    │  └─► Creates MUI themes for light + dark modes    │
    │                                                    │
    │  src/components/CodeBlock.tsx                      │
    │  └─► Code block backgrounds & colors              │
    │                                                    │
    │  src/components/Header.tsx                         │
    │  └─► Header backdrop color                        │
    │                                                    │
    │  src/pages/Home.tsx                                │
    │  └─► Meta theme-color tag                         │
    │                                                    │
    │  src/App.tsx                                       │
    │  └─► Scrollbar CSS variables                      │
    │                                                    │
    │  src/index.css                                     │
    │  └─► Global scrollbar styles                      │
    └───────────────────────────────────────────────────┘
                            │
                            │ applies
                            ▼
    ┌───────────────────────────────────────────────────┐
    │              All Components Update!                │
    ├───────────────────────────────────────────────────┤
    │  • Buttons       • Backgrounds    • Scrollbars    │
    │  • Text          • Code blocks    • Shadows       │
    │  • Links         • Headers        • Meta tags     │
    │  • Cards         • Hover states   • Both modes    │
    └───────────────────────────────────────────────────┘
```

## Data Flow

1. **Single Source of Truth**: All color definitions in `themeConfig.ts`
2. **One Line Switch**: Change `ACTIVE_THEME` constant
3. **Automatic Propagation**: All components import from config
4. **Instant Update**: Save file → Refresh browser → Done!

## Theme Structure

Each theme contains:

```typescript
{
  name: "Theme Name",
  light: {
    primary: "#hex",      // Main brand color
    secondary: "#hex",    // Accent color
    accent: "#hex",       // Highlight color (optional)
    backgroundDefault: "#hex",
    backgroundPaper: "#hex",
    textPrimary: "#hex",
    textSecondary: "#hex",
    shadowColor: "rgba(...)"
  },
  dark: {
    // Same structure, optimized for dark backgrounds
  },
  meta: {
    themeColor: "#hex",   // Browser UI color
    description: "..."    // Theme description
  }
}
```

## Why This Works

✅ **No hardcoded colors** - Everything imports from one file  
✅ **Type-safe** - TypeScript ensures valid theme names  
✅ **DRY principle** - Define once, use everywhere  
✅ **Hot reload friendly** - Changes reflect immediately  
✅ **Extensible** - Add new themes easily  
✅ **Maintainable** - Update colors in one place  

## Example Usage

```typescript
// In any component:
import { getActiveTheme } from '../config/themeConfig';

const theme = getActiveTheme();
const primaryColor = theme.dark.primary; // '#10b981' for matrixGreen
```

## File Dependencies

```
themeConfig.ts
    ├─► ThemeContext.tsx (MUI theme provider)
    ├─► CodeBlock.tsx (code styling)
    ├─► Header.tsx (header backdrop)
    ├─► Home.tsx (meta tags)
    ├─► App.tsx (scrollbar injection)
    └─► index.css (scrollbar styles)
```

All files automatically stay in sync with the active theme!
