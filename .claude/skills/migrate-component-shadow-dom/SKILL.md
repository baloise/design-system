---
name: migrate-component-shadow-dom
description: Use when converting a Baloise DS component from BEM/non-shadow to Shadow DOM — enables shadow:true, rewrites render with IDs/parts/host classes, and replaces BEM SCSS with vars.local + hybrid.styles + host class selectors. Follows migrate-component-rename.
---

# Migrate Component — Shadow DOM

Second-pass migration. Assumes `migrate-component-rename` is complete (tag is `ds-*`, `shadow: true` is set).

## Step 1 — Add `formAssociated` (form fields only)

If the component is a form control (has `value`, emits change, participates in `<form>`):

```ts
@Component({
  tag: 'ds-checkbox-group',
  styleUrl: 'checkbox-group.host.scss',
  shadow: true,
  formAssociated: true,
})
```

## Step 2 — Replace Render Elements with IDs + Parts + Host Classes

In Shadow DOM, internal elements are targeted by `id` in SCSS and exposed externally via `part`. Variant state (disabled, vertical, size…) is expressed as CSS classes on `<Host>` — this keeps the same `.is-*` class names that the global stylesheet uses, enabling the hybrid pattern without reflecting props as attributes.

```tsx
// Before — BEM class names
render() {
  const block = BEM.block('checkbox-group')
  const innerEl = block.element('inner')
  return (
    <Host class={{ ...block.class() }}>
      <div class={{
        ...innerEl.class(),
        ...innerEl.modifier('vertical').class(this.vertical),
        ...innerEl.modifier('wide').class(this.wide),
      }}>
        <slot></slot>
      </div>
    </Host>
  )
}

// After — IDs for SCSS, parts for external consumers, host classes for variants
render() {
  return (
    <Host
      class={{
        'is-vertical': this.vertical,
        'is-wide': this.wide,
        'is-disabled': !!this.disabled,
      }}
    >
      <div id="inner" part="inner">
        <slot></slot>
      </div>
    </Host>
  )
}
```

Rules:

- One `id` per named inner element — used in SCSS as `#inner { ... }`
- Add `part` to every element a consumer might need to style externally
- Map each boolean/variant prop to an `.is-*` class on `<Host>`
- Remove all `BEM.block()` / `BEM.element()` / `BEM.modifier()` usage and the BEM import

## Step 3 — Rewrite `*.style.scss`

Replace the old `@include block(name)` structure with the hybrid four-layer variable system.

### File header

```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../hybrid' as hybrid;
@use '../../vars' as vars;

$use-host: false !default;
$name: checkbox-group;
$css-selector: '.checkbox-group'; // global stylesheet selector
```

### CSS variables block

`vars.local(name, default)` generates the four-layer private variable:
`--_name: var(--name, var(--mod-name, <default>))`

```scss
@include vars.hybrid($name, $css-selector, $use-host) {
  @include vars.local(checkbox-group-gap, var(--ds-checkbox-group-space-gap));
  @include vars.local(checkbox-group-direction, row);
  // one line per themeable visual property
}
```

Token names follow `--ds-<component>-<property>` — use the `design-tokens` skill to look them up.

### Basic styles block

Host mode targets the `:host` and internal `#id` selectors. Non-host mode targets descendant class selectors.

```scss
@include hybrid.styles($css-selector, $use-host) {
  display: flex;
  flex-direction: var(--_checkbox-group-direction);
  gap: var(--_checkbox-group-gap);
}

@include hybrid.host($use-host) {
  :host {
    display: flex;
    flex-direction: var(--_checkbox-group-direction);
    gap: var(--_checkbox-group-gap);
  }

  #inner {
    display: flex;
    flex-wrap: wrap;
  }
}
```

### Modifier variants

Both modes use `.is-*` class names — on the element itself (global CSS) or on `:host` (shadow DOM). Set `--mod-*` variables inside the modifier to override the private variable:

```scss
// Before (BEM)
@include modifier(vertical) {
  flex-direction: column;
}

// After
@include hybrid.styles($css-selector, $use-host) {
  &.is-vertical {
    --mod-checkbox-group-direction: column;
  }
}

@include hybrid.host($use-host) {
  :host(.is-vertical) {
    --mod-checkbox-group-direction: column;
  }
}
```

### Parts styling

```scss
@include hybrid.host($use-host) {
  :host::part(inner) {
    display: inline-flex;
    align-items: center;
  }
}
```

## Step 4 — Update `*.host.scss`

Import the style with `$use-host: true` so only `:host` branches compile:

```scss
@use './checkbox-group.style' with (
  $use-host: true
);
```

Add host-only overrides (disabled, focus ring, etc.) directly here — not in style.scss:

```scss
@use './checkbox-group.style' with (
  $use-host: true
);

:host(.is-disabled) {
  pointer-events: none;
  cursor: default;
}
```

## Step 5 — Remove BEM References

Search and remove:

- `import { BEM } from '../../../utils/bem'`
- All `BEM.block()`, `.element()`, `.modifier()` calls
- All `class={{ ... }}` spreads generated from BEM
- Old `@include block()` / `@include element()` / `@include modifier()` in SCSS

## Step 6 — Verify

```bash
npx tsc --noEmit -p packages/core/tsconfig.json 2>&1 | grep "error TS" | grep -v "TS6305\|TS6306"
```

Start the dev server and visually confirm the component renders correctly:

```bash
npm start
```

## Reference Components

| Component  | Pattern                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `ds-tag`   | Simple hybrid — `tag.style.scss` for color/shape/size variants          |
| `ds-input` | Complex hybrid with mixin file — `input.mixin.scss` + `input.host.scss` |

## What This Skill Does NOT Cover

- FormControl / `formAssociated` internals (`setValue`, `internals.setValidity`)
- Slot wiring and `slotchange` listeners
- SCSS token variable naming (use `design-tokens` skill)
- Test rewrites
- Storybook docs
