# CONTEXT — packages/core (Web Components)

This document captures domain language, architectural patterns, and key concepts specific to the core component package.

## Overview

**packages/core** is the primary source of truth for all UI components in the design system. It uses **Stencil.js** to author web components that compile to multiple output targets:

- Web Components (standard custom elements)
- Angular bindings (auto-generated wrapper components)
- React bindings (auto-generated hooks/components)
- TypeScript type definitions for all frameworks

## Core Concepts

### Component Authoring

- **Stencil components** are written as TypeScript classes (`.tsx` + `.scss`) in `packages/core/src/components/`
- Each component implements `ComponentInterface` and `Loggable` interfaces
- Components use `@Prop()`, `@Event()`, `@Method()`, `@Listen()`, `@Watch()` decorators from Stencil

### Component Lifecycle

1. **Authoring** → `.tsx` + `.scss` in `packages/core/src/components/<name>/`
2. **Compilation** → Stencil compiler transpiles to web components in `dist/`
3. **Output targets** → Additional targets (Angular, React, Web) generate bindings
4. **Distribution** → Built artifacts published to npm as `@baloise/ds-core`

### Component Types

The system supports **three component architectures**:

#### 1. Web-Component-Only (`ds-*`)

- **Has**: `.host.scss` file (Shadow DOM styles)
- **No**: `.style.scss` file
- **Usage**: Custom element with Shadow DOM encapsulation and full JavaScript interactivity
- **Example**: `<ds-button color="primary">Click me</ds-button>`
- **Skills**: Full story generation, interactive controls, all test types
- **Identification**: Check for `.host.scss` only (not `.style.scss`)

#### 2. CSS-Only

- **Has**: `.style.scss` file (global CSS classes)
- **No**: `.host.scss` file
- **Usage**: Plain HTML elements with CSS classes, no JavaScript
- **Example**: `<button class="button is-primary">Click me</button>`
- **Skills**: No stories, limited tests (visual + a11y only)
- **Identification**: Check for `.style.scss` only (not `.host.scss`)

#### 3. Hybrid

- **Has**: Both `.host.scss` (Shadow DOM) and `.style.scss` (global CSS)
- **Usage**: Supports both web component mode and CSS-only mode
- **Example**: Works as both `<ds-button>` and `<button class="button">`
- **Skills**: Minimal stories (no prop controls), limited tests
- **Identification**: Check for both `.host.scss` AND `.style.scss`

All three types share styling logic via the `*.style.scss` → `*.host.scss` pattern where applicable.

**How to Identify Component Type Programmatically:**

```javascript
// Check for SCSS files in component directory
const hasHostScss = fs.existsSync(`${componentPath}/${componentName}.host.scss`)
const hasStyleScss = fs.existsSync(`${componentPath}/${componentName}.style.scss`)

if (hasHostScss && !hasStyleScss) return 'web-component-only'
if (!hasHostScss && hasStyleScss) return 'css-only'
if (hasHostScss && hasStyleScss) return 'hybrid'
```

### Design Tokens Integration

Components reference design tokens (`--ds-*` CSS variables) for:

- Colors, spacing, fonts, shadows, z-index values
- All theming is token-driven; direct color values should not appear in component CSS

## Notable Patterns

### Naming Conventions

- **Custom element prefix**: `ds-` (e.g., `<ds-button>`, `<ds-card>`)
- **Event naming**: `ds<Name>` (e.g., `dsChange`, `dsCloseClick`)
- **Handler naming**: `listenTo<Event>` (@Listen), `<Prop>Changed` (@Watch), `handle<Event>` (DOM handlers)
- **CSS classes**: `.is-<state>` for states (e.g., `.is-disabled`, `.is-primary`), `.mod-<variant>` for modifiers

### CSS Variable Cascade

Components use a **four-layer CSS variable system** that enables customization while maintaining Shadow DOM encapsulation:

```
--_component-prop        (private, computed only)
  → --component-prop     (public, consumer override)
    → --mod-component    (modifier, from .is-* classes)
      → --ds-token       (design token default)
```

| Layer            | Prefix   | Owner             | Purpose                                                   |
| ---------------- | -------- | ----------------- | --------------------------------------------------------- |
| **Private**      | `--_`    | System (computed) | Internal CSS rule values, never override from outside     |
| **Public**       | `--`     | Consumer          | Component instance override, set from outside Shadow DOM  |
| **Modifier**     | `--mod-` | System (variants) | Set by variant classes like `.is-primary`, `.is-disabled` |
| **Design Token** | `--ds-`  | Design System     | Figma default value, only changed via token updates       |

**How It Works:**

When you set a CSS property with `vars.local()`:

```scss
// In component SCSS:
@include vars.local(tag-color, var(--ds-alias-text-color-primary));

// Generates:
// --_tag-color: var(--tag-color, var(--mod-tag-color, var(--ds-alias-text-color-primary)))
```

When the component renders:

1. **Private value** (`--_tag-color`) is computed from the cascade
2. CSS rules use the private variable internally
3. Modifiers override via `--mod-tag-color` (when `.is-primary` class is set)
4. Consumers override via `--tag-color` (from outside)
5. Falls back to design token `--ds-alias-text-color-primary` if nothing is set

### Component Variable Naming

Component variables use consistent naming:

- **Component-level property**: `--component-<css-property>` → `--tag-color`
- **Element-level property**: `--component-<element>-<css-property>` → `--button-label-font-family`

The same naming pattern applies to private (`--_`) and modifier (`--mod-`) layers:

```scss
--_tag-color              // private component-level
--_button-label-font-family    // private element-level
--mod-tag-color           // modifier component-level
--mod-button-label-font-family // modifier element-level
```

**Requirement:** Component variables must always reference **alias tokens** or **component tokens** from `packages/tokens`. Never hard-code values or reference global tokens directly.

### Common Component Variables

Most components expose these variable groups:

**Color Variables:**

- `--{component}-color` — text color
- `--{component}-bg` — background color
- `--{component}-border` — border color

**Spacing Variables:**

- `--{component}-px` — horizontal padding
- `--{component}-py` — vertical padding
- `--{component}-m` — margin (sometimes)

**Typography Variables:**

- `--{component}-font-size` — text size
- `--{component}-font-weight` — text weight
- `--{component}-font-family` — typeface

**Border & Radius:**

- `--{component}-radius` — border radius
- `--{component}-border-width` — border thickness

### Customizing Components

Components can be customized at multiple levels:

**Override a Single Component Instance:**

```html
<ds-tag style="--tag-color: var(--ds-alias-text-color-danger);"> Custom Color </ds-tag>
```

**Override via JavaScript:**

```javascript
const tag = document.querySelector('ds-tag')
tag.style.setProperty('--tag-color', 'var(--ds-alias-text-color-success)')
```

**Override Multiple Instances via CSS:**

```css
.warning-context ds-tag {
  --tag-color: var(--ds-alias-text-color-warning);
  --tag-bg: var(--ds-alias-bg-color-warning-light);
}
```

**Override via Slot Parent:**

```html
<div style="--tag-color: var(--ds-alias-text-color-info);">
  <ds-tag>Info Tag</ds-tag>
</div>
```

### Shadow DOM Encapsulation

Component CSS variables respect Shadow DOM boundaries:

**Inside Shadow DOM (component author):**

- Uses `--_private` variables in CSS rules
- Modifiers set `--mod-` variables via `.is-*` classes
- Design tokens provide `--ds-` defaults

**Outside Shadow DOM (consumer):**

- Can only set public `--` variables on the host element
- Changes cascade into the component via the public layer
- Private variables are isolated and cannot be accessed

### Best Practices for Component Variables

**Do:**

- ✅ Use design token values when overriding (e.g., `--ds-alias-text-color-*`)
- ✅ Override at the appropriate scope (single element, class, global)
- ✅ Use `-device` suffix for responsive values
- ✅ Check component documentation for available variables

**Don't:**

- ❌ Try to access or set `--_private` variables (they're isolated in Shadow DOM)
- ❌ Set hardcoded hex colors; use tokens instead
- ❌ Override `--mod-` variables directly (let classes set them)
- ❌ Override `--ds-` tokens from outside (only change via design system)

### Component Organization

Each component directory contains:

- `component.tsx` — component logic and render
- `component.interfaces.ts` — types, enums, interfaces
- `component.host.scss` — web component styles (Shadow DOM)
- `component.style.scss` — shared styles (both modes)
- `test/` — unit tests (spec), interaction tests (.component.play.ts), visual tests (.visual.play.ts), a11y tests (.a11y.play.ts)

## Navigation Pattern (ds-navbar)

### Three-Section Horizontal Layout

The navbar component (`ds-navbar`) uses a **three-section layout**:

1. **Brand** (`slot="brand"`) — Logo, wordmark, or branding element (left, always visible)
2. **Menu** (`slot="menu-start"` + `slot="menu-end"`) — Navigation links (center and right on desktop)
3. **Actions** (part of `slot="menu-end"`) — Action buttons, login, etc. (right on desktop)

**Desktop Layout (≥ tablet breakpoint `--ds-alias-breakpoint-tablet`):**

```
[Brand] ·· [Menu-Start Links] [Menu-End Links/Buttons]
```

**Mobile Layout (< tablet breakpoint):**

```
[Brand] [Hamburger Button]
         ↓ opens dialog ↓
        [Menu-Start + Menu-End + Actions, stacked vertically]
```

### Responsive Behavior

- **Breakpoint detection:** Use `@ListenToBreakpoints()` decorator (see `snackbar.tsx` pattern)
- **State tracking:** `@State() isMobile = dsBreakpoints.isMobile` — syncs with viewport size
- **Conditional rendering:** Mobile menu (hamburger + dialog) only renders when `isMobile === true`
- **Auto-close on resize:** When viewport crosses into desktop breakpoint, menu closes automatically

### Mobile Menu Implementation

- **Native `<dialog>` element:** Full-height modal panel (not overlay div)
- **Focus trap:** Automatic via native `<dialog>` (no manual library needed)
- **Scroll lock:** Automatic via native `<dialog>` (prevents body scroll when open)
- **Internal scrolling:** Dialog content scrolls internally (`overflow-y: auto`) when taller than viewport
- **Close triggers:**
  - Click `<a>` tag inside menu (link navigation)
  - Click hamburger button again (toggle)
  - Press Esc key (native dialog behavior)
  - Viewport resize to desktop (auto-close)

### Semantic Navigation Structure

- **Element:** `<nav role="navigation" aria-label="Main navigation">`
- **Links:** Consumer provides native `<a>` tags in slots (no wrapper components, no tabs)
- **SEO benefit:** Semantic structure crawlable by search engines; native links are indexable
- **Hamburger button:** `<button>` with `aria-label`, `aria-expanded`, `aria-controls` attributes

### Public API

**Props:**

- `open: boolean` (default `false`) — Controls mobile menu visibility; synchronized with internal state

**Methods:**

- `toggleMenu()` → `Promise<void>` — Toggle menu open/closed
- `openMenu()` → `Promise<void>` — Open menu
- `closeMenu()` → `Promise<void>` — Close menu

**Events:**

- `dsMenuOpenStart` — Emitted when menu starts opening
- `dsMenuOpenEnd` — Emitted when menu finishes opening
- `dsMenuCloseStart` — Emitted when menu starts closing
- `dsMenuCloseEnd` — Emitted when menu finishes closing

### Mobile Drawer Implementation

The navbar uses a right-side drawer menu on mobile/tablet viewports. The drawer is implemented with an `<aside role="dialog">` that:

- **Slides in from the right** using CSS transforms (GPU-accelerated)
- **Uses focus-trap library** for keyboard accessibility and focus management
- **Closes via multiple triggers:** ESC key, backdrop click, close button, burger button click, or menu link click
- **Prevents background interaction:** aria-hidden on nav, document scroll locked, focus trapped in drawer
- **Respects prefers-reduced-motion:** Transitions become instant (0.01s) for users with motion preferences

**Drawer Structure:**

```
<aside role="dialog" aria-modal="true" aria-labelledby="drawer-title">
  <div class="drawer-backdrop"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <h2 id="drawer-title">Menu</h2>
      <button class="drawer-close">×</button>
    </div>
    <div class="drawer-content">
      <slot name="menu-start"></slot>
      <slot name="menu-end"></slot>
    </div>
  </div>
</aside>
```

**CSS Variables:**

- `--navbar-drawer-max-width` (default: 400px) — Drawer panel width
- `--navbar-drawer-slide-duration` (default: 300ms) — Animation duration for slide-in/out
- `--navbar-drawer-backdrop-color` — Backdrop overlay color (RGB)
- `--navbar-drawer-backdrop-opacity` (default: 0.5) — Backdrop opacity when open

**ARIA Attributes:**

- `aside[aria-modal="true"]` — Announces drawer as modal dialog
- `aside[aria-labelledby="drawer-title"]` — Links drawer to its title heading
- `button[aria-expanded]` — Indicates menu open/closed state
- `button[aria-controls="drawer-menu"]` — Links burger button to drawer

**Keyboard Behavior:**

- **Tab/Shift+Tab:** Navigate within drawer only (focus trapped)
- **Escape:** Close drawer and return focus to burger button
- **Enter/Space:** Activate links and buttons within drawer

**Responsive Behavior:**

- **Mobile/Tablet (≤tablet breakpoint):** Drawer visible, burger button visible
- **Desktop (>tablet breakpoint):** Drawer hidden, burger button hidden, menu content shown inline
- Auto-closes drawer when viewport resizes from mobile to desktop

### State Management Pattern

- **`isMobile: boolean`** — Breakpoint state (synced via `@ListenToBreakpoints()`)
- **`isMenuOpen: boolean`** — Mobile menu visibility state
- **Prop watchers:** Changes to `open` prop sync to `isMenuOpen` and emit lifecycle events
- **Side effects:** Close menu automatically when `isMobile` changes from `true` → `false` (viewport resize)

### Design Differences from Predecessor (bal-navbar)

| Aspect      | bal-navbar                                         | ds-navbar                                              |
| ----------- | -------------------------------------------------- | ------------------------------------------------------ |
| Structure   | Sub-components (bal-navbar-brand, bal-navbar-menu) | Named slots (brand, menu-start, menu-end)              |
| Navigation  | `bal-tabs` component with JS-based routing         | Native `<a>` tags (semantic, SEO-friendly)             |
| Mobile menu | Custom scroll lock + event coordination            | Native `<dialog>` (automatic focus trap + scroll lock) |
| API         | Multiple interfaces (app/simple), custom props     | Single interface (MVP), slot-based                     |
| Scope       | Full-featured (colors, variants, containers)       | MVP (structure, responsive, accessibility)             |

### Implemented Features (MVP+)

- [x] Mobile drawer menu with focus trap and keyboard support
- [x] Accessible right-side drawer with backdrop
- [x] ARIA modal dialog attributes and announcements
- [x] prefers-reduced-motion support for animations
- [x] CSS variables for drawer customization (width, duration, colors)

### Future Enhancements (Out of Scope)

- [ ] Color themes and styling variants
- [ ] Multiple interface types (app, website, etc.)
- [ ] Container width options (fluid, compact, etc.)
- [ ] Custom hamburger icon or styling
- [ ] Sub-components if composition needs evolve
- [ ] Animated hamburger icon transitions (current: SVG path swap)

## Key Constraints

- **Shadow DOM encapsulation** — Styles do not leak in/out
- **No framework-specific code** — Components must work in vanilla JS, React, Angular, Vue, etc.
- **Accessibility first** — WCAG 2.2 AA compliance is mandatory
- **Responsive by default** — Components must work 320px–2560px
- **Immutable props** — All @Prop() use `readonly`
- **No external dependencies** — Keep bundle size minimal

## Testing Requirements

| Test Type   | File Pattern         | Framework        | Purpose                           |
| ----------- | -------------------- | ---------------- | --------------------------------- |
| Unit        | `.spec.ts`           | Vitest           | Logic, prop validation, utilities |
| Interaction | `.component.play.ts` | Playwright       | User interactions, events         |
| Visual      | `.visual.play.ts`    | Playwright       | Visual regression detection       |
| A11y        | `.a11y.play.ts`      | Playwright + axe | WCAG 2.2 AA compliance            |

All tests mount via Page Objects from `@baloise/ds-playwright`.

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/tokens|packages/tokens/CONTEXT.md]] — Design tokens reference
- [[packages/playwright|packages/playwright/CONTEXT.md]] — Testing library
- [[packages/css|packages/css/CONTEXT.md]] — Global styles
- [[docs|docs/CONTEXT.md]] — Storybook documentation
- [[root|CONTEXT.md]] — Repository-level concepts
