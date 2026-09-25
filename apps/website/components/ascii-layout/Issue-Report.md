# Issue Analysis & Fix Plan

## 1. Analysis of the Issue

The issue you're experiencing when switching to light mode happens for two main reasons:

1. **Shared Background Styling:** Both your center content (`#main-content`) and the left/right ASCII side panels rely on the exact same global CSS variable (`--background`) for their background color. 
   - In `AsciiSidePanel.tsx`, the container has the Tailwind class `bg-background`.
   - In `ascii-layout.css`, the `.ascii-side` class sets `background-color: var(--background, #ffffff)`.
   - When you switch to light mode, `--background` becomes white. As a result, both the main content and the side panels turn white simultaneously.

2. **Visual Overlap (Bleeding):** Because both the main content and the side panels share the exact same background color in light mode, the visual boundary between them disappears. Even though the main content has a `box-shadow` (`.ascii-center`), the lack of contrast makes it look like the ASCII panels are overlapping or bleeding into the main content area.

## 2. Plan to Fix It

To achieve the desired effect (main content turning white in light mode, while side panels stay distinctly separated and maintain their intended background), we need to decouple their styles.

### Step-by-Step Fix:

**Step 1: Update `AsciiSidePanel.tsx` classes**
- Remove `bg-background` from the container `div`.
- Add a specific color class that you want the side panels to retain (e.g., `bg-zinc-950` or a specific dark hex).

**Step 2: Hardcode ASCII Text Color (Optional but recommended)**
- If the side panel is going to stay dark in light mode, the ASCII characters drawn on the canvas must stay light to be visible. 
- In `AsciiSidePanel.tsx`, modify `effectiveGlyphColor` so it doesn't switch to black in light mode, ensuring it's always readable against your dark side panel.

**Step 3: Clean up `ascii-layout.css`**
- Remove `background-color: var(--background, #ffffff);` from the `.ascii-side` block so it doesn't override or conflict with our new Tailwind classes in the React component.

This plan will ensure the light/dark mode toggle perfectly controls your `#main-content` while keeping your ASCII side panels distinct and preventing any visual overlap.
