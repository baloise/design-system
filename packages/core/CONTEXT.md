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
