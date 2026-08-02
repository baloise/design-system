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

## Date Field (ds-date)

`ds-date` is a form control that mirrors `ds-input`'s field structure and look,
adding a calendar-icon trigger that opens a date-picker popup. Shared vocabulary:

- **Model value** — the canonical `value` (ISO `YYYY-MM-DD` string). Locale-
  independent, sortable, form-safe. This is what a form submits and what
  attribute reflection exposes.
- **Display value** — the localized string the user sees and types in the masked
  field (e.g. `13.07.2026` for CH). Derived from DS locale config; never the
  model value. **luxon** bridges display ⇄ model.
- **Trigger** — the calendar-icon `<button>` at the end of the field. It is the
  **only** gesture that opens/toggles the popup; focusing the text input just
  places the typing cursor. `disabled` turns both off; `readonly` is display-only.
- **Popup** — the calendar dialog, rendered **inside the shadow root** with
  air-datepicker's stylesheet adopted via `adoptedStyleSheets`. Open/close and
  outside-click are owned by `ds-date` (not air-datepicker's document listener).

Library choices (air-datepicker, imask) and the shadow-root integration are
recorded in [docs/adr/0001-ds-date-external-datepicker-libraries.md](../../docs/adr/0001-ds-date-external-datepicker-libraries.md).

## Input Slider (ds-input-slider)

`ds-input-slider` is the web-component-only migration of the old
`bal-input-slider`: a form control backed by the **noUiSlider** library
(rendered on a plain `<div part="slider">`, no native `<input>` anywhere in
the shadow root), using the same `Field` wrapper/`AttachInternals()` pattern
as `ds-input`/`ds-number-input`. Shared vocabulary:

- **Model value** — `value: number`, always a concrete number, never `null`
  or `''`. A slider can never truly be "empty" (it always resolves to a
  real value), so there is no empty/nullable state to represent. When no
  `value` is supplied it defaults to `min`.
- **Slider** — the noUiSlider-owned `<div id="slider" part="slider">`. It is
  the single source of interaction (pointer drag, keyboard) and carries
  noUiSlider's own built-in ARIA (`role="slider"`, `aria-valuemin/max/now`,
  `tabindex`) on its handle. `ds-input-slider` wires `aria-labelledby`/
  `aria-describedby` onto the handle to connect it to the `Field`'s label/
  description, the same way `ds-select`'s `SelectPickerController` wires its
  trigger — see `connectLabelToTrigger()` in `select.picker.ts` for the
  precedent.
- **Picker controller** — `InputSliderPickerController`
  (`input-slider.picker.ts`) wraps the noUiSlider instance, mirroring
  `SelectPickerController`'s shape (init in `componentDidLoad`, `destroy()`
  in `disconnectedCallback`, `setValue()`/`setDisabled()`/`focus()`/
  `blur()`/`updateRange()` as its public API). `input-slider.utils.ts`
  stays pure functions only (`clampValue`, `resolveInitialValue`,
  step/decimals helpers).
- **No `FormControl`** — unlike `ds-input`/`ds-number-input`, this component
  does not use the shared `FormControl` helper (`form-control.ts`), because
  `FormControl` assumes a real `nativeEl: HTMLInputElement |
HTMLTextAreaElement` to focus/blur/read from. `ds-input-slider` manages
  `internals.setFormValue()`, `initialValue`/reset, and click-passthrough
  directly in `input-slider.tsx`, the same way `ds-select` does.
- **Event mapping** — noUiSlider's own event set replaces native
  `input`/`change`: `update` (fires continuously, incl. every drag/keyboard
  step) maps to `dsInput`; `set` (fires once per discrete interaction —
  pointer release, a completed keyboard step, or a programmatic `.set()`
  call) maps to `dsChange`. `set` was chosen over noUiSlider's `change`
  event because `change` only fires for real user interaction — a
  programmatic `.set()` call (used by `picker.setValue()` and by
  `DsInputSlider`'s `fill()` test helper) never fires it, only `update` +
  `set`. This preserves
  [ADR-0006](../../docs/adr/0006-ds-input-slider-change-commit.md)'s
  commit-on-discrete-interaction semantics with a different event source;
  see [ADR-0007](../../docs/adr/0007-ds-input-slider-nouislider.md) for why
  the event source changed at all.
- **Programmatic sets don't re-emit events** — `InputSliderPickerController`
  guards `setValue()` with a `suppressEvents` flag so an external `value`
  prop change (e.g. an Angular `ControlValueAccessor.writeValue()`) does not
  cascade back into firing `dsInput`/`dsChange`, mirroring how the old
  native input's JSX-driven attribute updates never dispatched DOM events
  either. Only real user interaction — or a test calling
  `target.noUiSlider.set()` directly, bypassing the controller — emits
  those events.
- **Value precision** — noUiSlider is configured with a `format: { to, from
}` pair that rounds to the decimal precision implied by `step` (e.g.
  `step="0.5"` → 1 decimal, `step="1"` → integers), so emitted values never
  carry floating-point noise from internal percentage math.
- **Clamping** — `min`/`max` are typed as `@Type('number')` (not `string`,
  unlike `ds-input`/`ds-number-input`'s pass-through min/max) because the
  component's own logic depends on them: `value` is clamped into
  `[min, max]` via `@Watch('min')`/`@Watch('max')`, so the component's state
  of truth never drifts from what noUiSlider renders.
- **Post-mount prop reactivity** — `@Watch('value')`/`@Watch('min')`/
  `@Watch('max')`/`@Watch('step')` push changes into the live noUiSlider
  instance (`picker.setValue()`/`picker.updateRange()`), since noUiSlider
  (unlike a JSX-rendered native input) does not pick up prop changes for
  free through Stencil's vdom diff — its config is frozen after `.create()`
  until explicitly updated.
- **Continuous mode** — `step` defaults to `1`. A continuous/free-form
  slider is expressed via the standard HTML-derived convention `step="any"`,
  which maps to omitting noUiSlider's `step` option entirely (its default is
  already continuous) — not a special `0` sentinel (the old component's
  `step = 0` convention is dropped).
- **`readonly` behaves as `disabled`** — noUiSlider has no native concept of
  read-only either. `ds-input-slider` follows the existing `ds-checkbox`
  convention (`disabled={this.disabled || this.readonly}`) and treats the
  two as equivalent for this control. Disabling is done via noUiSlider's own
  attribute-based mechanism (`setAttribute('disabled', '')` /
  `removeAttribute('disabled')` on the slider target — there is no
  `.disable()`/`.enable()` JS call).
- **Commit-on-`change`, not blur** — diverges from the shared `FormControl`
  blur-commit convention; see
  [ADR-0006](../../docs/adr/0006-ds-input-slider-change-commit.md).
- **`color` vs. `brand-color`** — general naming convention for bal→ds
  migrations: if an old `bal-*` component had a `color` prop meaning brand/
  theme color, it is renamed to `brand-color` on the `ds-*` version, freeing
  up `color` for the `Field`-state semantics (`primary | success | warning |
danger`) shared with `ds-input`/`ds-number-input`. `bal-input-slider` had
  no brand `color` prop, but `ds-input-slider` gained its own `brand-color`
  (`yellow | purple | red | green | ''`) — unlike the bal-era meaning, it only
  recolors the `.noUi-connect` fill (via a `linear-gradient` from the `-4`
  shade on the left to the `-2` shade on the right), leaving track, thumb,
  and label/description untouched. It's independent of `color`/`invalid`,
  which still drive the `Field`-state classes.
- **No tick marks in this MVP** — the old component's `hasTicks` prop (BEM
  `<div>`s per step) is dropped; visuals are out of scope for this pass. A
  future visual pass should evaluate noUiSlider's `pips` feature for tick
  marks rather than resurrecting the old div-based approach.
- **Dual-thumb (min+max range) is out of scope** — this component is
  single-thumb only, matching `bal-input-slider`'s original scope exactly,
  even though noUiSlider itself supports multi-handle ranges.
- **Visual design** — `input-slider.host.scss` overrides noUiSlider's stock
  cosmetic defaults (grey/bordered track, white bordered handle, teal
  connect) via `.noUi-target`/`.noUi-connect`/`.noUi-handle` selectors, using
  lightweight `--input-slider-*` SCSS component variables that point
  directly at **global color tokens** — the same pattern `ds-checkbox`/
  `ds-radio`/`ds-toggle` use (`--ds-global-color-primary-5` for the
  checked/active fill, `--ds-global-color-grey-3` for the unchecked/inactive
  fill), not a dedicated `packages/tokens` entry. `connect: 'lower'` (set in
  `input-slider.picker.ts`) renders the active/filled track segment via
  noUiSlider's own `.noUi-connect` element; the remainder shows the plain
  track background — this is the "progress bar" look, not a second DS
  concept. The shared `form.container()` mixin (`form.mixin.scss`) gained a
  `$bordered: false` parameter for this component's unboxed look, reusable
  by any future no-box control. noUiSlider's own base CSS
  (`nouislider/dist/nouislider.css`) is still imported for the structural
  position plumbing pointer-dragging depends on; only its cosmetic layer is
  overridden.

## Global Configuration (`DesignSystem.config`)

`packages/core/src/global/config/` holds the singleton `config` (a `Config`
instance, exposed at runtime as `window.DesignSystem.config`) that drives
brand/region/language/icons/animation/etc. across all components. Consuming
apps bootstrap it either via JS (`initializeDesignSystem(userConfig)` /
`setupDsConfig(userConfig)`) or, for markup-only setups, via a `<meta>` tag:

```html
<meta name="design-system-config" data-brand="helvetia" data-region="CH" data-language="de" />
```

`setupDsConfig` merges three sources, **lowest to highest precedence**:

1. `defaultConfig` (`config.default.ts`)
2. `configFromMetaTag(win)` (`config.meta.ts`) — reads the `<meta
name="design-system-config">` tag's `data-*` attributes, but **only**
   an explicit allowlist (`DS_CONFIG_META_ATTRIBUTE_MAP` in
   `config.const.ts`): `brand`, `region`, `language`, `fallbackLanguage`,
   `allowedLanguages` (comma-separated), `animated` (`"false"` → `false`,
   anything else → `true`). Never spreads `dataset` wholesale — this
   keeps the config's shape/type guarantees intact even if a CMS editor
   or injected markup adds unrelated `data-*` attributes.
3. the `userConfig` object passed to `initializeDesignSystem`/`setupDsConfig`
   — always wins; this is how frameworks, Storybook, and tests override

Icons, `httpFormSubmit`, `legalLinks`, `legalText`, and `socialLinks` are
**not** meta-tag-configurable — they're either structured/nested data (not
representable in a flat `data-*` attribute) or considered JS-only
behavioral config. See
[docs/adr/0002-ds-config-meta-tag.md](../../docs/adr/0002-ds-config-meta-tag.md)
for the full rationale.

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
- [[apps/storybook|apps/storybook/CONTEXT.md]] — Storybook documentation
- [[root|CONTEXT.md]] — Repository-level concepts
