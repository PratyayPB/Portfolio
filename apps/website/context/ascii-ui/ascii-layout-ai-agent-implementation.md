# ASCII Side-Panel Layout --- AI Agent Implementation Plan

## Objective

Implement a full-viewport page layout matching the supplied reference
image:

-   The page occupies **100% of the viewport height**.
-   The layout has three horizontal regions:
    -   Left ASCII-effect panel
    -   Center content panel
    -   Right ASCII-effect panel
-   The center panel is white and contains the application's actual page
    content.
-   The left and right panels have a light-gray background with an
    animated ASCII visual effect.
-   The ASCII effect must remain behind the content and must never
    interfere with the center UI.
-   The implementation must be responsive, performant, accessible, and
    cleanly integrated into the existing application.

The supplied reference image is the visual source of truth for the
overall composition.

------------------------------------------------------------------------

# 1. First: Inspect the Existing Codebase

Before changing code:

1.  Identify the framework and routing structure.
2.  Determine whether this is a Next.js App Router or Pages Router
    application.
3.  Inspect:
    -   `package.json`
    -   existing global styles
    -   Tailwind configuration, if present
    -   existing layout components
    -   existing page/layout hierarchy
    -   existing reusable UI components
4.  Determine where the requested layout should be integrated.
5.  Reuse the project's existing conventions instead of introducing a
    parallel styling or component architecture.
6.  Do not rewrite unrelated code.
7.  Do not modify existing application behavior unless required by this
    feature.

If the project already has a layout shell, extend it rather than
creating a second competing application shell.

------------------------------------------------------------------------

# 2. Reference Visual Requirements

Use the supplied image as the visual reference.

The intended desktop composition is approximately:

``` text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ASCII                  CENTER CONTENT              ASCII   │
│   PANEL                    PANEL                     PANEL   │
│                                                              │
│                         CONTENT HERE                         │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Initial desktop proportions:

``` text
Left     ≈ 20%
Center   ≈ 60%
Right    ≈ 20%
```

Use CSS Grid as the primary layout mechanism:

``` css
grid-template-columns: 20% 60% 20%;
```

Do not use hard-coded pixel widths for these three regions.

The exact proportions may be tuned after visual comparison with the
supplied image.

------------------------------------------------------------------------

# 3. Required Component Architecture

Create a reusable layout abstraction.

Recommended structure:

``` text
components/
└── ascii-layout/
    ├── AsciiLayout.tsx
    ├── AsciiSidePanel.tsx
    └── ascii-layout.css
```

Adapt the naming/location to the project's existing conventions if
necessary.

## `AsciiLayout`

Responsibilities:

-   Own the full viewport layout.
-   Render left ASCII panel.
-   Render center content.
-   Render right ASCII panel.
-   Accept `children`.
-   Keep ASCII implementation details out of the page component.

Desired conceptual API:

``` tsx
<AsciiLayout>
  {children}
</AsciiLayout>
```

## `AsciiSidePanel`

Responsibilities:

-   Render the container used by Asciify.
-   Initialize the ASCII background on mount.
-   Clean up the ASCII background on unmount.
-   Keep the canvas behind optional panel content.
-   Avoid leaking event listeners or animation loops.

Do not put the Asciify lifecycle directly into unrelated page
components.

------------------------------------------------------------------------

# 4. Install and Use Asciify

Use the Asciify package documented at:

https://asciify.org/docs/backgrounds/fluid

Install the required package using the project's package manager.

For npm:

``` bash
npm install asciify-engine
```

If the project uses another package manager, use its equivalent command.

Before implementation, verify the currently installed package API
against the project's installed version.

Do not blindly assume an API if the installed version differs from the
documentation.

------------------------------------------------------------------------

# 5. Client-Side Boundary

If this is a Next.js application using Server Components:

`AsciiSidePanel` must be a Client Component because the animation
requires browser APIs.

Use:

``` tsx
"use client";
```

Only mark the smallest necessary component as client-side.

Do not unnecessarily convert the entire application/page tree into a
Client Component.

------------------------------------------------------------------------

# 6. Asciify Lifecycle

Use the React lifecycle pattern:

``` tsx
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!containerRef.current) return;

  const { destroy } = asciiBackground(
    containerRef.current,
    {
      // configuration
    }
  );

  return () => {
    destroy();
  };
}, []);
```

The exact API/configuration must be confirmed against the current
Asciify documentation/package version.

Important:

-   Initialize only after the DOM element exists.
-   Do not initialize during render.
-   Do not initialize repeatedly on every render.
-   Clean up on unmount.
-   Ensure React Strict Mode does not leave duplicate canvases/animation
    loops.
-   Do not manually create a second canvas if Asciify creates one.

------------------------------------------------------------------------

# 7. ASCII Effect

The requested design uses an animated ASCII-style background.

Start with a subtle effect rather than a visually aggressive one.

Potential effects to evaluate from the Asciify documentation include:

-   Fluid
-   Silk
-   Wave
-   Noise
-   Morph

Because the requested reference specifically points to the Fluid
background documentation, use the Fluid effect as the initial
implementation unless the current documentation/API indicates otherwise.

The effect should feel like a background texture, not the primary
content.

Initial visual goals:

-   low visual intensity
-   subtle animation
-   readable ASCII characters
-   light-gray/neutral overall appearance
-   no distraction from the center content
-   no excessive contrast

Tune the following according to the actual API:

``` text
opacity
font size
speed
color scheme
interaction
density/resolution
```

Do not invent unsupported configuration properties.

------------------------------------------------------------------------

# 8. Layout CSS

The outer layout should occupy the entire viewport.

Preferred baseline:

``` css
.ascii-layout {
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  overflow: hidden;
}
```

Use `100dvh` rather than only `100vh` where appropriate so mobile
browser viewport behavior is handled better.

## Side panels

``` css
.ascii-side {
  position: relative;
  overflow: hidden;
  background: #d9d9d9;
}
```

The exact background should be tuned to the reference image and existing
design system.

## Center panel

``` css
.ascii-center {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #ffffff;
}
```

The center must remain visually clean and white.

------------------------------------------------------------------------

# 9. Layering / Z-Index

The ASCII canvas must stay behind any panel content.

Use a structure similar to:

``` text
Side Panel
├── ASCII canvas/background
└── optional content
```

The canvas/background should not cover interactive UI.

If the Asciify API supports a z-index option, use it appropriately.

If necessary, use CSS:

``` css
.ascii-side > canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
```

Only add selectors like this if they are compatible with how Asciify
actually creates and positions its canvas.

Do not rely on fragile selectors if the library already manages
positioning.

------------------------------------------------------------------------

# 10. Pointer Interaction

The ASCII effect is decorative.

If interaction is enabled:

-   it must not block clicks on application UI
-   the canvas should generally use:

``` css
pointer-events: none;
```

unless the Asciify implementation specifically requires pointer events
on the canvas itself.

If interaction is required by the selected effect, verify how the
library expects pointer events to be handled before disabling them.

The center application content must always remain fully interactive.

------------------------------------------------------------------------

# 11. Center Content

The center panel should not use absolute positioning just to center the
placeholder content.

Use:

``` css
display: flex;
align-items: center;
justify-content: center;
```

Example:

``` tsx
<main className="ascii-center">
  <div>
    CONTENT HERE
  </div>
</main>
```

The actual application content should replace the placeholder without
requiring changes to the ASCII implementation.

------------------------------------------------------------------------

# 12. Prevent Page Scrolling

The requested composition is viewport-based.

Ensure the outer shell does not accidentally create a page-level
scrollbar.

Check:

-   body margin
-   root element height
-   application layout height
-   `overflow`
-   fixed headers or surrounding layouts

If the page is intended to be exactly one viewport tall:

``` css
html,
body {
  height: 100%;
}
```

Only add global rules if they do not conflict with the existing
application.

Prefer local layout rules when possible.

Do not globally disable scrolling if the application's center content
legitimately needs to scroll.

If the center content needs scrolling, structure it as:

``` text
Viewport shell
├── fixed/non-scrolling ASCII side panels
└── center panel
    └── independently scrollable content
```

For example:

``` css
.ascii-center {
  min-height: 0;
  overflow-y: auto;
}
```

Choose this based on the existing page's requirements.

------------------------------------------------------------------------

# 13. Responsive Behavior

Desktop:

``` text
20% | 60% | 20%
```

Tablet:

Consider approximately:

``` text
15% | 70% | 15%
```

Mobile:

Prefer giving the application content the full width and
reducing/removing side ASCII panels.

Possible strategy:

``` css
@media (max-width: 768px) {
  .ascii-layout {
    grid-template-columns: 0 100% 0;
  }
}
```

If the project has an established breakpoint system, use it instead of
introducing arbitrary breakpoints.

An alternative is to retain narrow side panels if the design requires
them.

The chosen behavior should prioritize:

1.  usable content width
2.  no horizontal scrolling
3.  good mobile performance
4.  preserving the visual identity

------------------------------------------------------------------------

# 14. Accessibility

Treat the ASCII animation as decorative.

It should not communicate information required to understand or operate
the application.

Do not put meaningful text inside the animated canvas.

Respect reduced-motion preferences.

Where practical, implement:

``` css
@media (prefers-reduced-motion: reduce) {
  /* substantially reduce or disable animation */
}
```

If Asciify provides a reduced-motion option, prefer using the library's
supported configuration rather than fighting its animation loop with CSS
alone.

The actual application content must remain standard accessible DOM.

------------------------------------------------------------------------

# 15. Performance Requirements

The ASCII effect is animated, so performance matters.

Follow these rules:

-   Avoid unnecessary duplicate animation loops.
-   Do not initialize Asciify on every render.
-   Clean up on unmount.
-   Avoid expensive React state updates for every animation frame.
-   Keep animation state inside the canvas/library.
-   Avoid rendering two independent ASCII engines if one shared
    implementation can produce the same visual result.
-   Test on lower-powered devices.
-   Test resizing.
-   Test navigation away from and back to the page.
-   Test React Strict Mode.

If both side panels use exactly the same visual effect, consider whether
one shared renderer/background layer can cover both side regions while
the center panel sits above it.

However, prefer the simpler architecture unless performance testing
shows a real benefit.

------------------------------------------------------------------------

# 16. Optional Optimization: Single Background Renderer

If two independent Asciify instances cause unnecessary CPU/GPU work,
consider:

``` text
┌─────────────────────────────────────────────┐
│              ONE ASCII BACKGROUND           │
│                                             │
│   ┌──────────── CENTER CONTENT ──────────┐  │
│   │                                      │  │
│   │                UI                    │  │
│   │                                      │  │
│   └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

In this architecture:

-   One ASCII background spans the entire outer shell.
-   Center content is rendered above it with a white background.
-   The visible ASCII effect remains only on the sides.

Do not implement this optimization initially unless it simplifies the
code or is needed for performance.

Start with the clearer `AsciiSidePanel` abstraction.

------------------------------------------------------------------------

# 17. Visual Validation

After implementation, compare the running application against the
supplied reference image.

Check:

### Geometry

-   Does the shell fill the viewport?
-   Are the side panels approximately 20% each?
-   Is the center approximately 60%?
-   Is the center content truly centered?

### Colors

-   Side panels match the light-gray appearance.
-   Center is white.
-   ASCII effect is subtle enough.

### ASCII effect

-   It is visible.
-   It remains behind content.
-   It is not clipped incorrectly.
-   It does not create unexpected scrollbars.
-   It does not overflow into the center panel.

### Motion

-   Animation is smooth.
-   No noticeable flickering.
-   No duplicated canvases.
-   No animation continues after unmount.

### Responsiveness

Test at least:

``` text
1440 × 900
1280 × 720
1024 × 768
768 × 1024
390 × 844
```

Do not treat these exact dimensions as mandatory if the project has its
own supported breakpoints; they are validation sizes.

------------------------------------------------------------------------

# 18. Avoid These Implementation Mistakes

Do NOT:

-   put all logic in the page component
-   initialize Asciify during render
-   create a new animation on every React render
-   forget cleanup
-   use absolute positioning for the entire three-column layout
-   use fixed pixel widths for the three major regions
-   allow the ASCII canvas to intercept application clicks
-   globally disable scrolling without checking the application's
    content needs
-   introduce a new CSS framework
-   rewrite existing global styles unnecessarily
-   modify unrelated application components
-   duplicate dependencies
-   use unsupported Asciify configuration properties
-   claim an effect is implemented according to the docs without
    verifying the installed API

------------------------------------------------------------------------

# 19. Suggested Implementation Steps for the AI Agent

Execute the task in this order.

## Step 1 --- Inspect

Inspect the repository and identify:

-   framework
-   routing
-   styling system
-   root layout
-   existing page structure
-   package manager
-   whether Asciify is already installed

Report the relevant files before modifying them.

## Step 2 --- Install dependency

Install `asciify-engine` only if it is not already available.

Do not install duplicate/alternative ASCII libraries.

## Step 3 --- Create the layout component

Create the reusable `AsciiLayout` component.

Implement:

``` text
Left ASCII
Center children
Right ASCII
```

## Step 4 --- Create the side-panel component

Create `AsciiSidePanel`.

Use `useRef` and `useEffect`.

Initialize Asciify only after mount.

Return the library's cleanup function.

## Step 5 --- Add Fluid effect

Configure the Fluid effect using only options supported by the installed
version/documentation.

Start subtle.

## Step 6 --- Integrate with the existing page

Wrap the target page/content with:

``` tsx
<AsciiLayout>
  ...
</AsciiLayout>
```

Do not duplicate existing page content.

## Step 7 --- Style

Match the reference:

-   full viewport
-   20/60/20 desktop composition
-   light-gray side regions
-   white center
-   centered content
-   hidden overflow where appropriate

## Step 8 --- Responsive behavior

Add appropriate breakpoints based on the existing design system.

## Step 9 --- Accessibility

Implement reduced-motion behavior if supported.

Ensure ASCII is decorative.

## Step 10 --- Test

Run the project's:

-   type checking
-   linting
-   build
-   relevant tests

Fix all errors introduced by the implementation.

## Step 11 --- Visual QA

Run the application and compare against the supplied reference.

Tune:

-   proportions
-   ASCII density
-   opacity
-   speed
-   colors
-   spacing

Do not change unrelated UI.

------------------------------------------------------------------------

# 20. Definition of Done

The implementation is complete only when all of the following are true:

-   [ ] The page occupies the viewport correctly.
-   [ ] Desktop layout has left/center/right regions.
-   [ ] Center region is approximately 60%.
-   [ ] Side regions are approximately 20% each.
-   [ ] Center background is white.
-   [ ] Side backgrounds are light gray.
-   [ ] Animated ASCII Fluid effect is visible in the side regions.
-   [ ] ASCII effect does not cover center content.
-   [ ] Center content is horizontally and vertically centered.
-   [ ] ASCII canvas does not interfere with UI interaction.
-   [ ] Asciify initializes only on the client.
-   [ ] Asciify is cleaned up correctly.
-   [ ] React Strict Mode does not create persistent duplicate canvases.
-   [ ] No unwanted page-level horizontal scrolling occurs.
-   [ ] Responsive behavior works on smaller screens.
-   [ ] Reduced-motion behavior is considered.
-   [ ] TypeScript has no new errors.
-   [ ] Linting passes.
-   [ ] Production build passes.
-   [ ] No unrelated files/features are changed unnecessarily.
-   [ ] The implementation follows the existing project's architecture
    and styling conventions.

------------------------------------------------------------------------

# 21. Final Deliverable

After implementation, provide a concise summary containing:

1.  Files created.
2.  Files modified.
3.  Dependency changes.
4.  How the ASCII effect was integrated.
5.  Responsive behavior.
6.  Validation commands executed.
7.  Any remaining limitations or visual tuning that may be desirable.

Do not provide a generic implementation summary if the implementation
was not actually completed. Report the actual repository changes and
validation results.

------------------------------------------------------------------------

# Reference Documentation

Asciify Fluid background:

https://asciify.org/docs/backgrounds/fluid

Asciify background documentation:

https://asciify.org/docs/backgrounds

Use the documentation as the source of truth for the current API and
configuration options.
