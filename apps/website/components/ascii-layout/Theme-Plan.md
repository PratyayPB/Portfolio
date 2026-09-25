# Implementation Plan: Theme Adjustments for ASCII Layout

Here is the plan to achieve the two distinct goals while keeping their logic completely separate.

## 1. `#main-content` Background Change (Light Mode: #f7f7f7)
We will target the center panel strictly via CSS so its styling remains completely isolated from the side panels.

**File:** `apps/website/components/ascii-layout/ascii-layout.css`
*   **Action:** Update the `.ascii-center` (which has `id="main-content"`) CSS rule.
*   **Logic:** 
    *   Set the default background color to `#f7f7f7` for light mode.
    *   Use the `.dark` selector to revert the background to the global dark mode variable (`var(--background)`) when dark mode is active.

## 2. Invert `AsciiSidePanel` Colors (Light Mode: White BG / Black Fluid)
We will manage the side panel colors directly within the React component using theme state and Tailwind classes. This keeps it entirely separate from the `#main-content` logic.

**File:** `apps/website/components/ascii-layout/ascii-layout.css`
*   **Action:** Remove the hardcoded `background-color: #09090b;` from `.ascii-side` so we can control it via Tailwind.

**File:** `apps/website/components/ascii-layout/AsciiSidePanel.tsx`
*   **Action:** Re-introduce the `useTheme` hook to detect light/dark mode.
*   **Background Logic:** 
    *   Update the container `div`'s class list to use `bg-white dark:bg-zinc-950`. This handles the background inversion purely through Tailwind.
*   **Foreground/Fluid Logic:** 
    *   Dynamically set the ASCII glyph color: `isDark ? "#fafafa" : "#000000"`.
    *   Restore the ASCII engine variables for light mode visibility: 
        *   `contrast: isDark ? 0.08 : 1.2`
        *   `brightness: isDark ? 0 : 0.5`
    *   Update the canvas opacity class to `opacity-80 dark:opacity-60` for better blending in both modes.

---
*Ready to proceed? I can apply these changes immediately.*
