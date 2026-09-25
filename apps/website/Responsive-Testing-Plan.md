# Responsive Design & Testing Plan

This plan outlines the strategy to test and adjust the application across standard device sizes, ensuring components are fluid, accessible, and readable on all viewports.

## 1. Target Breakpoints (Tailwind Standards)
We will use Tailwind CSS's default mobile-first breakpoints to standardize our testing and development:

*   **Mobile (Default - No prefix):** `< 640px` (e.g., iPhone SE, Galaxy S22)
*   **Large Mobile / Small Tablet (`sm`):** `640px - 767px`
*   **Tablet (`md`):** `768px - 1023px` (e.g., iPad Mini, iPad Air portrait)
*   **Laptop (`lg`):** `1024px - 1279px` (e.g., iPad Pro landscape, MacBook Air)
*   **Desktop (`xl`):** `1280px - 1535px`
*   **Large Screens (`2xl`):** `1536px+`

## 2. Component Adaptation Strategy

### A. The Core Layout (`AsciiLayout` & `AsciiSidePanel`)
*   **Mobile (`< 768px`):** The side ASCII panels take up valuable screen real estate. The existing CSS already attempts to hide these (`grid-template-columns: 0 100% 0`). We must verify that the `<canvas>` rendering completely pauses or unmounts on mobile to save battery and CPU.
*   **Tablet (`md` to `lg`):** Side panels can scale down (e.g., 15% width) or font sizes of the ASCII fluid should be adjusted to prevent layout breakage.
*   **Action Items:** 
    *   Check if `AsciiSidePanel` respects `hidden md:block` Tailwind classes.
    *   Ensure the `#main-content` container expands to 100% width and has adequate padding (e.g., `px-4 md:px-8`) on mobile.

### B. Greeting Preloader
*   **Mobile:** The `w-60` width on the `DynamicText` container might be tight on very small screens (like iPhone SE - 320px). 
*   **Action Items:** 
    *   Update typography to scale: `text-xl md:text-2xl xl:text-3xl`.
    *   Ensure the overlay (`fixed inset-0`) accounts for mobile browser address bars (using `100dvh` instead of `100vh`).

### C. Navigation & Dock
*   **Mobile:** Standard desktop navbars often overflow. 
*   **Action Items:** 
    *   Ensure the `mobile-drawer.tsx` properly activates on `< 768px`.
    *   Verify touch targets in the dock/navigation are at least `44x44px` to meet WCAG accessibility standards.
    *   Ensure the theme toggle is easily accessible from the mobile drawer.

### D. Typography & Readability
*   **Action Items:**
    *   Implement fluid typography or responsive text utilities (e.g., `text-base md:text-lg`).
    *   Check contrast ratios in both light and dark mode, especially on mobile where screen glare is common.
    *   Limit paragraph widths (`max-w-prose`) on large desktops so text isn't exhaustingly wide to read.

## 3. Testing Methodology

### Step 1: Emulated Viewport Testing (DevTools)
1.  Open Chrome/Firefox/Edge DevTools.
2.  Enable Device Toolbar.
3.  Test explicitly on: 
    *   **iPhone SE** (320px width) - *Checks absolute minimum limits.*
    *   **iPhone 14 Pro Max** (430px width) - *Standard modern mobile.*
    *   **iPad Mini / iPad Air** (768px / 820px) - *Tablet layouts.*
    *   **Responsive Handle:** Drag the screen size from 320px to 1920px slowly to catch any layout snapping issues or overflow bugs.

### Step 2: Accessibility & Visibility Checks
1.  **Lighthouse Audit:** Run a mobile accessibility and performance audit via Chrome DevTools.
2.  **Keyboard Navigation:** Use `Tab` to navigate through the mobile layout (especially the drawer) to ensure focus states are visible and logical.
3.  **Zoom Check:** Zoom the page to 200% on desktop to simulate low-vision users and ensure the layout doesn't break.

### Step 3: Physical Device Testing (Network Sharing)
*   Run the app using `next dev --experimental-https` or local network IP (e.g., `192.168.x.x:6969`).
*   Open the app on a physical iOS and Android device to test true touch responsiveness, scroll behavior, and safe area insets (notches/dynamic islands).

## 4. Next Steps for Implementation
If you approve this plan, we will execute it systematically:
1.  **Audit:** I will scan the current `home` features, `Navigation`, and `AsciiLayout` files for missing responsive Tailwind prefixes.
2.  **Fix Layouts:** Apply `flex-col`, `grid-cols-1 md:grid-cols-2`, and `p-4 md:p-8` utility updates across major components.
3.  **Refine Touch Targets:** Ensure all buttons have minimum sizes.
4.  **Confirm Viewports:** Verify that `layout.tsx` has correct viewport meta tags (`width=device-width, initial-scale=1, maximum-scale=1` for preventing forced zoom on inputs).
