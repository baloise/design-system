# Remove `bal-` Prefix from Component Files and Namespaces

**Date:** 2026-04-08
**Status:** Approved

## Goal

Remove the `bal-`/`Bal` prefix from all component source files, folders, Page Objects, Storybook entries, type namespaces, and event names. The HTML custom element tags (`bal-button`, `bal-tag`, etc.) keep their `bal-` prefix unchanged.

---

## Naming Rules

### What changes

| Before | After |
|---|---|
| `packages/core/src/components/bal-button/` | `…/button/` |
| `bal-button.tsx`, `bal-button.host.scss`, etc. | `button.tsx`, `button.host.scss`, etc. |
| `bal-button.po.ts` → class `BalButton` | `button.po.ts` → class `Button` |
| `docs/src/components/bal-button/bal-button.stories.ts` | `…/button/button.stories.ts` |
| `namespace BalProps` + `namespace BalEvents` | merged into `namespace DS` |
| `BalProps.BalButtonColor` | `DS.ButtonColor` |
| `BalEvents.BalButtonClickDetail` | `DS.ButtonClickDetail` |
| `const balButton = new BalButton(…)` | `const dsButton = new Button(…)` |
| `@Event() balClick` / `'balClick'` strings | `@Event() dsClick` / `'dsClick'` |
| `balNavigate`, `balBlur`, `balFocus`, etc. | `dsNavigate`, `dsBlur`, `dsFocus`, etc. |

### What does NOT change

- HTML tag names: `<bal-button>`, `@Component({ tag: 'bal-button' })`, CSS selectors
- Stencil-generated types: `HTMLBalButtonElement`
- CSS variable names: `--ds-button-*`, `--mod-button-*`
- Package names: `@baloise/ds-core`, `@baloise/ds-playwright`
- This is a clean break — no backwards-compat re-exports

---

## Affected Areas

### 1. Component folders and files

`packages/core/src/components/` — every `bal-*` top-level folder renamed to drop `bal-` prefix. Nested sub-component folders follow the same rule (e.g. `bal-button-group` → `button-group`). All files inside renamed likewise.

Files renamed per component:
- `bal-button.tsx` → `button.tsx`
- `bal-button.host.scss` → `button.host.scss`
- `bal-button.style.scss` → `button.style.scss`
- `bal-button.interfaces.ts` → `button.interfaces.ts`
- `bal-button.spec.ts` → `button.spec.ts`
- `bal-button.component.play.ts` → `button.component.play.ts`
- `bal-button.a11y.play.ts` → `button.a11y.play.ts`
- `bal-button.visual.play.ts` → `button.visual.play.ts`
- `bal-button.style.html` → `button.style.html`
- `bal-button.visual.html` → `button.visual.html`
- Plus any other component-specific files (`.i18n.ts`, `.data.ts`, `.const.ts`, `.controller.ts`, etc.)

Snapshot directories (e.g. `bal-button.visual.play.ts-snapshots`) renamed to match.

### 2. Page Objects

`packages/playwright/src/lib/components/` — rename `bal-*.po.ts` → `*.po.ts`. Update `index.ts` re-exports. PO class names: `BalButton` → `Button`, `BalTag` → `Tag`, etc.

### 3. Storybook

`docs/src/components/` — rename `bal-*` folders and `bal-*.stories.ts` / `bal-*.mdx` files inside them.

### 4. Styles

`packages/styles/src/generated/components.scss` — update all `@use` import paths from `bal-*/bal-*.style.scss` → `*/  *.style.scss`.

### 5. `interfaces.d.ts`

`packages/core/src/interfaces.d.ts`:
- Replace `declare namespace BalProps {}` + `declare namespace BalEvents {}` with single `declare namespace DS {}`
- Update all import paths: `./components/bal-button/bal-button.interfaces` → `./components/button/button.interfaces`

---

## Implementation Approach (Staged)

### Stage 1 — Script: folder and file renames

A Node.js script traverses all affected directories and uses `fs.renameSync` to rename folders and files, stripping the `bal-` prefix from names. Safe to run multiple times (idempotent check: skip if target already exists).

### Stage 2 — Script: content updates (safe patterns)

A second pass over all `.ts`, `.tsx`, `.scss`, `.mdx`, `.html` files applies these substitutions using explicit regex patterns that avoid touching HTML tag names inside template strings:

1. `styleUrl: 'bal-*.host.scss'` → `styleUrl: '*.host.scss'`
2. Import/require paths containing `bal-*/bal-*` → `*/  *`
3. `@use '…bal-*/bal-*.style.scss'` → `@use '…*/  *.style.scss'`
4. PO class names: `class BalButton` → `class Button`, `new BalButton(` → `new Button(`
5. Variable names: `const balButton` / `let balButton` / `balButton.` → `dsButton`
6. `@Event() balClick` property declarations → `@Event() dsClick` (only in `.tsx` files, not template strings)
7. Event strings in tests: `spyOnEvent('balClick')` → `spyOnEvent('dsClick')`
8. `index.ts` exports: `from './bal-*.po'` → `from './  *.po'`

### Stage 3 — Targeted: namespace consolidation

Per `*.interfaces.ts` file:
- Merge `namespace BalProps { … }` and `namespace BalEvents { … }` blocks into a single `namespace DS { … }` block
- Strip `Bal` prefix from all type and interface names inside (e.g. `BalButtonColor` → `ButtonColor`, `BalButtonCustomEvent` → `ButtonCustomEvent`)

Per `.tsx`/`.ts` consumer files:
- `BalProps.BalButtonColor` → `DS.ButtonColor`
- `BalEvents.BalButtonClickDetail` → `DS.ButtonClickDetail`

---

## Risk Notes

- **Event name change** (`balClick` → `dsClick`) is a breaking API change for all consumers listening to these events via `addEventListener` or framework bindings.
- **Snapshot files** may need regeneration after file renames since Playwright snapshot directories are named after the test file.
- **`HTMLBalButtonElement`** references inside `BalEvents` interface targets are Stencil-generated and remain unchanged since the HTML tag is unchanged.
