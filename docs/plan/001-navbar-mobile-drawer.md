# Navbar Mobile Drawer — Implementation Plan

**Status:** Approved  
**Date:** 2026-06-10  
**Component:** `ds-navbar`  
**Feature:** Right-side drawer menu for mobile/tablet viewports

---

## Overview

Add accessible right-side drawer menu to `ds-navbar` for mobile/tablet (≤desktop). Drawer uses semantic `<aside role="dialog">` with focus trapping, backdrop close, keyboard escape, and slide-in animation. Menu content provided via slots; state controlled internally and externally.

**Scope:** Feature addition to existing navbar component  
**Complexity:** Medium (new props, state management, focus-trap integration, animation)  
**Estimated Effort:** 3–4 phases

---

## Design Decisions

1. **Drawer Pattern:** Semantic `<aside role="dialog" aria-modal="true">` (accessible, search-engine friendly)
2. **Content via Slots:** Two `<slot>` elements for menu content (light DOM → WCAG AA + SEO)
3. **State Binding:** Internal `isDrawerOpen` state + external `@Prop() drawerOpen` + custom events
4. **Focus Management:** `focus-trap` library for keyboard safety (trap focus, Escape key, restore trigger focus)
5. **Close Triggers:** Backdrop click, Escape key, burger button click (all delegate to close handler)
6. **Animation:** Slide-in from right (400px max) using CSS transitions + `--ds-` tokens
7. **Inert Background:** `aria-hidden="true"` on main content when drawer open; prevent body scroll

---

## Technical Decisions

| Aspect                    | Decision                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **State Hook**            | `@State() isDrawerOpen: boolean = false` + `@Prop({ mutable: true }) drawerOpen?: boolean` with `@Watch()` |
| **Focus Container**       | `ref` on `drawer-panel` div; pass to `focus-trap` on open                                                  |
| **Animations**            | CSS `transition: transform` on `drawer-panel`; `--_drawer-slide-in: translate(0)` / `translate(100%)`      |
| **Responsive Breakpoint** | Leverage existing `isTouch` pattern; show drawer on mobile/tablet, hide ≥desktop                           |
| **Event Dispatch**        | Custom event: `drawer-state-changed` with `{ isOpen: boolean }` detail                                     |
| **Dependencies**          | Add `focus-trap` npm package (if not already in deps)                                                      |

---

## Accessibility Compliance (WCAG 2.2 AA)

| Requirement             | Implementation                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Keyboard Navigation** | ESC closes drawer; focus trapped within; burger button restores focus on close                                              |
| **Screen Reader**       | `aria-modal="true"` + `aria-labelledby="drawer-title"` on `<aside>`; `aria-expanded` on burger; `aria-controls="drawer-id"` |
| **Focus Management**    | focus-trap library ensures focus stays in drawer while open; restore on close                                               |
| **Semantic HTML**       | Native `<aside>`, `<button>`, `<nav>` in slots; `role="dialog"` explicit                                                    |
| **Color Contrast**      | Backdrop + drawer panel use `--ds-color-*` tokens; verify 4.5:1 WCAG AA                                                     |
| **Touch Targets**       | Close button ≥44×44px; burger button ≥44×44px per WCAG 2.1 Level AAA (mobile best practice)                                 |

---

## Responsive Behavior

| Viewport                                | Behavior                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Mobile/Tablet** (≤768px or `isTouch`) | Burger button visible; drawer hidden (off-screen); drawer opens on-demand                        |
| **Desktop** (>768px)                    | Burger button + drawer hidden; horizontal nav shown (existing behavior)                          |
| **Animation**                           | Slide-in from right edge over 300ms (CSS variable: `--_drawer-slide-duration`); backdrop fade-in |

---

## SEO Considerations

- **Light DOM Slots:** Menu content is in light DOM → search engines crawl links naturally
- **Semantic HTML:** `<nav aria-label="Main menu">` in slots is SEO-friendly
- **No JavaScript Walls:** Content not hidden behind JS-only rendering ✓

---

## Browser Support

- All modern browsers supporting: ES2020, CSS Grid, CSS Custom Properties, Shadow DOM, `focus-trap`
- Fallback: Drawer always visible on unsupported (graceful degradation)

---

## Style Guide Alignment

- **CSS Variables:** All colors/spacing use `--ds-*` tokens from `packages/tokens`
- **Mobile-First:** Base styles for 320px; `@include media(desktop)` to hide on desktop
- **Private Variables:** Drawer-specific vars use `--_drawer-*` prefix (non-public)
- **Naming:** Follow `listenTo*`, `*Changed`, `handle*` conventions for methods
- **Slots:** Light DOM content in `<slot name="menu">` and `<slot name="menu-footer">` (to be finalized in Phase 1)

---

## Risks & Mitigations

| Risk                                    | Mitigation                                                                                            |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Focus-trap + Shadow DOM slots**       | Test keyboard nav through slotted content; use `ref` on panel; focus-trap works with passed container |
| **Background scroll while drawer open** | Set `document.body.style.overflow = 'hidden'` on open; restore on close                               |
| **Backdrop click outside drawer**       | Ensure backdrop `<div>` is direct child of `<aside>`; add click handler to backdrop only              |
| **aria-hidden propagation**             | Add `aria-hidden="true"` to main nav/content wrapper when drawer open; remove on close                |
| **Mobile Safari focus behavior**        | Test on iOS; may need explicit focus() call + iOS-specific focus management                           |

---

## Related Documentation

- **ARCHITECTURE.md** → Web component patterns, slot usage, Shadow DOM best practices
- **STYLE_GUIDE.md** → CSS variable naming, mobile-first SCSS, component conventions
- **CONTRIBUTING.md** → Accessibility requirements, testing checklist
- **packages/core/CONTEXT.md** → Navbar component scope, existing patterns

---

## Phases

### Phase 1: Design Review & Props Setup

**Goal:** Finalize API, slot names, and focus-trap integration approach

**Tasks:**

- [ ] Finalize `@Prop()` names: `drawerOpen?`, `drawerPlacement='right'`?
- [ ] Confirm slot names: `menu`, `menu-footer` or `drawer-nav`, `drawer-actions`?
- [ ] Create lightweight ADR if focus-trap + slots integration differs from standard pattern
- [ ] Update navbar `CONTEXT.md` with drawer feature scope

**Dependencies:** None

**Acceptance Criteria:**

- [ ] Prop API documented in interfaces
- [ ] Slot structure defined and agreed
- [ ] ADR (if needed) checked into `docs/adrs/`

---

### Phase 2: Component State & Markup

**Goal:** Implement drawer DOM structure, props, state, and open/close handlers

**Tasks:**

- [ ] Add `@Prop() drawerOpen?: boolean` and `@State() isDrawerOpen: boolean` to navbar.tsx
- [ ] Add `@Watch()` on `drawerOpen` to sync with internal state
- [ ] Render drawer markup (aside, backdrop, panel, close button, slots) in render function
- [ ] Implement `openDrawer()`, `closeDrawer()`, `toggleDrawer()` methods
- [ ] Add event emission: `drawer-state-changed` on state change
- [ ] Add keyboard listener: ESC key closes drawer
- [ ] Add backdrop click listener: closes drawer

**Dependencies:** Phase 1

**Acceptance Criteria:**

- [ ] Drawer markup renders in Shadow DOM with slots for content
- [ ] Props/state sync correctly (internal + external)
- [ ] ESC key closes drawer
- [ ] Backdrop click closes drawer
- [ ] Burger button click opens/closes drawer
- [ ] Custom event fires on state change

---

### Phase 3: Accessibility & Focus Management

**Goal:** Wire focus-trap library, ARIA attributes, and background inertness

**Tasks:**

- [ ] Install `focus-trap` npm package (if not already present)
- [ ] Import focus-trap in navbar.tsx
- [ ] Add ARIA attributes: `aria-modal="true"`, `aria-labelledby="drawer-title"`, `aria-controls="drawer-id"` on aside
- [ ] Update burger button: `aria-expanded`, `aria-controls`
- [ ] On drawer open: initialize focus-trap on panel div; move focus to close button or panel
- [ ] On drawer close: deactivate focus-trap; restore focus to burger button
- [ ] Add `aria-hidden="true"` to main nav/content when drawer open (coordinate with navbar structure)
- [ ] Prevent background scroll: `document.body.style.overflow` management
- [ ] Test keyboard nav: Tab, Shift+Tab, ESC, focus restore

**Dependencies:** Phase 2

**Acceptance Criteria:**

- [ ] Focus-trap active while drawer open; inactive when closed
- [ ] ESC closes drawer + restores focus to burger
- [ ] Tab/Shift+Tab navigate within drawer only while open
- [ ] Screen reader announces drawer as modal dialog
- [ ] Background page is inert (aria-hidden + focus trapped)
- [ ] Touch devices: focus behavior tested on iOS/Android

---

### Phase 4: Animation & Styling

**Goal:** Implement slide-in animation, backdrop fade, and responsive visibility

**Tasks:**

- [ ] Add SCSS to navbar.host.scss: drawer positioning (fixed, right: 0, z-index)
- [ ] Add SCSS: drawer-panel translate animation (100% → 0% on open)
- [ ] Add SCSS: backdrop fade-in/out (opacity 0 → var(--\_backdrop-opacity))
- [ ] Add SCSS: max-width 400px, responsive height (100vh or content-aware)
- [ ] Add CSS variables: `--_drawer-slide-duration` (300ms default), `--_backdrop-color`, `--_backdrop-opacity`
- [ ] Add `@include media(desktop)` rule: hide burger + drawer when ≥desktop
- [ ] Leverage existing `isTouch` pattern for mobile-first visibility
- [ ] Test animations: smooth, no jank, accessible (prefers-reduced-motion respected)

**Dependencies:** Phase 3

**Acceptance Criteria:**

- [ ] Drawer slides in from right edge (400px max width)
- [ ] Backdrop fades in behind drawer
- [ ] Animation duration is customizable via CSS variable
- [ ] Desktop (≥desktop breakpoint): drawer hidden, burger hidden
- [ ] Mobile-first: drawer visible by default (in markup), hidden via CSS on desktop
- [ ] Animations respect `prefers-reduced-motion` (no animation if user prefers)

---

### Phase 5: Manual Testing & Documentation

**Goal:** Verify implementation with manual testing and update documentation

**Manual Testing Checklist:**

- [ ] **Mobile (375px width):** Open/close drawer via burger button
- [ ] **Mobile:** Close drawer via backdrop click
- [ ] **Mobile:** Close drawer via ESC key
- [ ] **Mobile:** Close drawer via close button (×)
- [ ] **Mobile:** Click menu link → drawer closes
- [ ] **Mobile:** Verify animation slides in from right (smooth, no jank)
- [ ] **Mobile:** Verify backdrop fades in/out with drawer
- [ ] **Keyboard:** Tab/Shift+Tab navigate within drawer only while open
- [ ] **Keyboard:** Focus moves to close button when drawer opens
- [ ] **Keyboard:** Focus returns to burger button when drawer closes
- [ ] **Accessibility:** Screen reader announces drawer as modal dialog
- [ ] **Accessibility:** All ARIA attributes correct (aria-modal, aria-expanded, aria-controls, aria-labelledby)
- [ ] **Desktop (1024px+ width):** Burger button hidden
- [ ] **Desktop:** Drawer hidden
- [ ] **Desktop:** Menu shows inline (existing behavior preserved)
- [ ] **Motion:** Users with prefers-reduced-motion see instant transitions (0.01s)
- [ ] **Touch targets:** Burger button ≥44×44px, close button ≥44×44px

**Documentation Tasks:**

- [x] Update navbar `CONTEXT.md` with drawer feature scope
- [x] Document drawer CSS variables and animation timing
- [x] Document ARIA attributes and accessibility approach

**Dependencies:** Phase 4

**Acceptance Criteria:**

- [ ] All manual tests pass (user verification)
- [ ] No regressions in existing navbar features
- [ ] CONTEXT.md updated with drawer implementation details

---

## Next Steps

1. **Phase 1 Review** → Finalize prop API and slot names
2. **Phases 2–5 Sequential** → Each phase gates the next; test incrementally
3. **Post-Completion:**
   - Run `/ds-test-component` to auto-generate test files (unit, visual, a11y, e2e)
   - Run `/ds-document-component` to create Storybook documentation
   - Update root `CONTRIBUTING.md` with drawer feature in component checklist
