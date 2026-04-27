---
name: migrate-component-rename
description: >
  Use when migrating a bal-* Baloise DS component to the ds-* standard for the
  rename, tag, stylesheet mode, interface namespace, and import fix steps only.
  Does NOT cover shadow DOM, FormControl, SCSS variables, tests, or Storybook docs.
  No Git commits.
---

# Migrate Component — Rename, Tag, Interfaces, Imports

Handles **only** the first-pass mechanical migration. Stop here; other skills handle shadow DOM, FormControl, SCSS tokens, tests, and docs.

## Step 1 — Ask: Hybrid or Web-Component-Only?

Before touching any files, ask the user:

> "Is this component **hybrid** (works as both a web component with Shadow DOM and as CSS-only via the global stylesheet) or **web-component-only** (Shadow DOM, no global CSS fallback)?"

- **Hybrid** → keep `.host.scss` + `.style.scss` + `.mixin.scss`
- **Web-component-only** → keep only `.host.scss`; delete `.style.scss`, `.mixin.scss`, and remove the component's `@import` from `packages/styles/src/generated/components.scss`

## Step 2 — Rename Files

Use `git mv` to preserve history. Rename the directory and every file inside it.

```bash
# Directory
git mv packages/core/src/components/bal-<name> \
        packages/core/src/components/<name>

# Main files
git mv packages/core/src/components/<name>/bal-<name>.tsx           <name>.tsx
git mv packages/core/src/components/<name>/bal-<name>.interfaces.ts <name>.interfaces.ts
git mv packages/core/src/components/<name>/bal-<name>.host.scss     <name>.host.scss

# Hybrid only:
git mv packages/core/src/components/<name>/bal-<name>.style.scss    <name>.style.scss
git mv packages/core/src/components/<name>/bal-<name>.mixin.scss    <name>.mixin.scss

# Test files (inside test/ subdirectory)
git mv packages/core/src/components/<name>/test/bal-<name>.spec.ts           test/<name>.spec.ts
git mv packages/core/src/components/<name>/test/bal-<name>.visual.html       test/<name>.visual.html
git mv packages/core/src/components/<name>/test/bal-<name>.style.html        test/<name>.style.html
git mv packages/core/src/components/<name>/test/bal-<name>.component.play.ts test/<name>.component.play.ts
git mv packages/core/src/components/<name>/test/bal-<name>.visual.play.ts    test/<name>.visual.play.ts
git mv packages/core/src/components/<name>/test/bal-<name>.a11y.play.ts      test/<name>.a11y.play.ts
```

Also rename the PO file if it exists:

```bash
git mv packages/playwright/src/lib/components/bal-<name>.po.ts \
        packages/playwright/src/lib/components/<name>.po.ts
```

## Step 3 — Fix the Component Decorator

In `<name>.tsx`, update the `@Component` decorator:

```ts
// Before
@Component({
  tag: 'bal-<name>',
  styleUrl: 'bal-<name>.host.scss',
  shadow: false,
})

// After
@Component({
  tag: 'ds-<name>',
  styleUrl: '<name>.host.scss',
  shadow: true,          // will be addressed in the shadow-DOM skill
  formAssociated: true,  // only if the component is a form field
})
```

## Step 4 — Fix the Interfaces File

The old structure used two separate namespaces (`BalProps`, `BalEvents`). Merge everything into a single `DS` namespace.

**Before:**

```ts
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type TextareaWrap = 'hard' | 'soft' | 'off'
}

namespace BalEvents {
  export interface BalTextareaChangeDetail { ... }
  export type BalTextareaChange = CustomEvent<BalTextareaChangeDetail>
}
```

**After:**

```ts
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  // --- Props types (was BalProps) ---
  export type TextareaWrap = 'hard' | 'soft' | 'off'

  // --- Event types (was BalEvents) ---
  export interface TextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDs<Name>Element   // e.g. HTMLDsTextareaElement
  }

  export type TextareaChangeDetail = string | null
  export type TextareaChange = TextareaCustomEvent<TextareaChangeDetail>
  // ... remaining events
}
```

Rules:

- Drop the `Bal` prefix from every exported type name (`BalTextareaWrap` → `TextareaWrap`, `BalTextareaChangeDetail` → `TextareaChangeDetail`).
- Rename `HTMLBal<Name>Element` → `HTMLDs<Name>Element` in the `CustomEvent` target.
- One `namespace DS { }` block — no separate `BalProps`/`BalEvents` blocks.

## Step 5 — Fix Imports & Type References in the .tsx File

### Remove date-testid

Remove all data-testid in the jsx render function.

### Remove old namespace imports

Old code typically imported or referenced `BalProps`/`BalEvents` as global declarations or explicit imports. Delete any lines like:

```ts
import { BalProps } from '../../interfaces'
import { BalEvents } from '../../interfaces'
```

The `DS` namespace is declared globally via the triple-slash reference in `<name>.interfaces.ts` — no import needed.

### Rename type usages

Replace every occurrence in the `.tsx` file:

| Old                               | New                     |
| --------------------------------- | ----------------------- |
| `BalProps.<Name>Wrap`             | `DS.<Name>Wrap`         |
| `BalEvents.Bal<Name>ChangeDetail` | `DS.<Name>ChangeDetail` |
| `BalEvents.Bal<Name>Change`       | `DS.<Name>Change`       |
| `HTMLBal<Name>Element`            | `HTMLDs<Name>Element`   |
| `bal-<name>` (in strings / JSX)   | `ds-<name>`             |

### Fix relative import paths

Any import that referenced the old filename must be updated:

```ts
// Before
import '../../bal-spinner/bal-spinner'
import { something } from '../bal-input/bal-input.utils'

// After
import '../../spinner/spinner'
import { something } from '../input/input.utils'
```

### Fix styleUrl in host.scss @use / @forward

If `.host.scss` or `.style.scss` reference old filenames via `@use` or `@forward`, rename those too:

```scss
// Before
@use 'bal-<name>.mixin' as mixin;

// After
@use '<name>.mixin' as mixin;
```

## Step 6 — Verify

```bash
# TypeScript check (fast)
npx tsc --noEmit -p packages/core/tsconfig.json

# Unit tests for this component
npx nx run core:test --testFile=packages/core/src/components/<name>/test/<name>.spec.ts
```

Fix any remaining `bal-` references or type errors before continuing to the next migration skill.

## What This Skill Does NOT Cover

- Shadow DOM internals (`shadow: true` render changes, slot wiring)
- FormControl refactor (`FormInput` → `FormControl`)
- BEM removal and `id`/`part` attribute adoption
- SCSS token variables (`--ds-input-*`, `vars.local` mixin)
- New props: `label`, `description`, `color`, `invalidText`
- Test rewrites (`*.component.play.ts`, `*.a11y.play.ts`, `*.visual.play.ts`)
- Storybook stories and MDX docs
- PO creation in `packages/playwright`

These are handled by separate follow-on skills.
