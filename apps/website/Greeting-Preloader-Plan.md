# Component Integration Plan: Greeting Preloader

## 0. Project Environment Status
* **TypeScript & Tailwind CSS:** Already installed and configured across the workspace (`@repo/design-system` and `apps/website`).
* **Shadcn UI:** Configured via `packages/design-system/components.json`.
* **Component Path:** The workspace uses a monorepo setup. UI components are stored in `packages/design-system/components/ui`, not `/components/ui`. 
  * *Why `packages/design-system/components/ui`?* Using a shared design system package ensures consistency across multiple apps in a monorepo (like `apps/website`, dashboards, etc.) and allows components to be imported cleanly via `@repo/design-system`.

## 1. Required Dependencies
**Existing:** 
- `react`, `lucide-react` (available, though not explicitly used in this component).
- `framer-motion` (The project currently uses `motion: ^12.4.2`, which is the latest Framer Motion, but installing `framer-motion` specifically prevents module resolution errors).

**To Install:**
```bash
# Since this is a monorepo, install these in the design-system package (or website app):
pnpm --filter design-system add gsap framer-motion
```

## 2. Component Analysis & State
**Arguments / Props:**
- `DynamicTextProps`:
  - `onComplete` (optional function) - Callback when animation finishes.
  - `greetingList` (optional array) - Custom array of `{ text, language }`.
  - `intervalMs` (optional number) - Speed of greeting transitions (default: 300).
- `GreetingPreloader Props`:
  - `greetings`, `intervalMs` - Passed down to DynamicText.
  - `fullPage` (boolean, default: true) - Decides if it overlays the whole screen or just its container.

**State Management:**
- `DynamicText`: Uses local `useState` (`currentIndex`, `isAnimating`) to iterate through greetings.
- `GreetingPreloader`: Uses local `useState` (`done`) to unmount itself when complete.
- **Hooks:** Uses `useEffect` for `setInterval` (greeting rotation) and GSAP DOM manipulations. `useRef` captures elements for GSAP timelines.

## 3. Context Providers & Hooks
No additional context providers are required. The component uses `"use client"` because it requires browser APIs (DOM for GSAP, `window`, `setInterval`) and standard React state hooks.

## 4. Architectural Questions & Considerations

* **What data/props will be passed to this component?**
  * You can pass custom `greetings={[{text: "...", language: "..."}]}` if you want to swap the defaults, but passing no props is perfectly valid (defaults to `defaultGreetings`).
* **Are there any specific state management requirements?**
  * No external state manager (like Redux or Zustand) is needed. The internal component state is entirely self-sufficient for the mounting/unmounting lifecycle.
* **Are there any required assets (images, icons, etc.)?**
  * None required. It purely relies on text and CSS.
* **What is the expected responsive behavior?**
  * It uses Tailwind's `fixed inset-0` or `absolute inset-0` coupled with flexbox centering. It will natively scale to full screen on any device size.
* **What is the best place to use this component in the app?**
  * If `fullPage={true}`, place it at the root layout or root page level (e.g., inside `apps/website/app/page.tsx`). 

## 5. Potential Issues to Address During Integration
**High Coupling (GSAP Selectors):** 
The component has hardcoded DOM IDs (`#navbar`, `#main-content h1`, `#projectHeader`, `#hr`). 
*If these IDs do not exist on your page, GSAP will fail silently or throw warnings.* It's recommended to change these to refs passed via props, or ensure those specific IDs exist in your `page.tsx` layout when you mount it.

---

## 6. Execution Steps (Ready to Copy/Paste)

1. Create the component file:
   **Path:** `packages/design-system/components/ui/components-preloaders-greetings.tsx`
2. Create the demo file (optional, for testing):
   **Path:** `apps/website/components/greeting-demo.tsx`
3. Run the installation command for `gsap` and `framer-motion`.

*Shall I execute the creation of these files and the installation of the dependencies for you?*
