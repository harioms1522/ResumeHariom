# 🚀 Quick Start: Change Your Website Theme in 30 Seconds

## Step 1: Open the Theme Config
Open this file: `src/config/themeConfig.ts`

## Step 2: Find Line 209
Look for this line:
```typescript
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'matrixGreen';
```

## Step 3: Replace the Theme Name
Change `'matrixGreen'` to one of these:

```typescript
'cyberpunkPurple'   // 🟣 Purple & cyan futuristic
'oceanBlue'         // 🔵 Professional blue
'sunsetGradient'    // 🌅 Warm orange/pink
'neonMulti'         // 🎨 Bold multicolor
'slate'             // ⚫ Classic gray
```

## Step 4: Save & Refresh
Save the file and refresh your browser. Done! ✨

## Example

**Before:**
```typescript
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'matrixGreen';
```

**After:**
```typescript
export const ACTIVE_THEME: keyof typeof THEME_PALETTES = 'cyberpunkPurple';
```

Your entire website is now purple! 🎉

## Need More Info?
- See `THEME_COLORS.md` for color previews
- See `THEME_GUIDE.md` for detailed docs
- See `THEME_EXAMPLES.md` for copy-paste examples
