# ds-lint-component Reference

Detailed rules and patterns for component linting.

## Divider Comment Format

### Structure

Each section divider is a JSDoc comment with:

1. Opening `/**`
2. Section name line: `   * SECTION_NAME`
3. Dash line: `   * ─────────────────────────────────────────────────────` (≈53 Unicode dashes)
4. Closing `   */`

```tsx
/**
 * PUBLIC PROPERTY API
 * ─────────────────────────────────────────────────────
 */
```

### Sections (In Order)

Only include sections that have content:

1. **PUBLIC PROPERTY API** — Contains `@Prop()` and `@Event()` declarations
2. **LIFECYCLE** — Contains lifecycle hooks: `connectedCallback()`, `componentWillLoad()`, `componentWillUpdate()`, `componentDidRender()`
3. **PUBLIC LISTENERS** — Contains `@Listen()` decorated methods
4. **PUBLIC METHODS** — Contains `@Method()` decorated public async methods
5. **EVENT HANDLERS** — Contains private event handlers and DOM event handlers (arrow functions or private methods with `handleX` naming)
6. **PRIVATE METHODS** — Contains other private helper methods
7. **RENDER** — Contains `render()` method

### Detection Logic

- **PUBLIC PROPERTY API** → Component has `@Prop()` or `@Event()` decorators
- **LIFECYCLE** → Component has `connectedCallback`, `componentWillLoad`, `componentWillUpdate`, or `componentDidRender` methods
- **PUBLIC LISTENERS** → Component has `@Listen()` decorated methods
- **PUBLIC METHODS** → Component has `@Method()` decorated methods
- **EVENT HANDLERS** → Component has private event handlers or DOM handlers
- **PRIVATE METHODS** → Component has other private methods (not event handlers)
- **RENDER** → Component has `render()` method (always present in Stencil)

---

## Prop Validation Rules

### Decorator Pattern

Every `@Prop()` should have a validation decorator directly above it. Validation runs automatically
on load and whenever the prop changes — there is **no** `setupValidation` call and no lifecycle wiring:

```tsx
@Prop()
@Type('string')
readonly label: string = ''
```

### Validator Type Matching

Match the validator to the prop type:

| Prop Type  | Validator            | Condition |
| ---------- | -------------------- | --------- |
| `string`   | `@Type('string')`    | Always    |
| `number`   | `@Type('number')`    | Always    |
| `boolean`  | `@Type('boolean')`   | Always    |
| `EnumType` | `@OneOf(ENUM_CONST)` | Always    |

`@OneOf` takes the const array directly (not spread): `@OneOf(BUTTON_SIZES)`.

For a **required** prop (must never be empty), add `@Required()` above the type/enum check. Empty
values (`undefined`, `null`, `''`, `NaN`) are skipped by every validator except `@Required()`.

### Type Matching Examples

**✅ Correct:**

```tsx
@Prop()
@Type('string')
readonly name: string = ''

@Prop()
@OneOf(BUTTON_SIZES)
readonly size: ButtonSize = ''

@Prop({ reflect: true })
@Required()
@OneOf(BUTTON_COLORS)
readonly color: ButtonColor = 'primary'
```

**✗ Incorrect:**

```tsx
@Prop()
@Type('boolean')  // ← type mismatch (prop is string)
readonly name: string = ''

@Prop()
@OneOf(BUTTON_SIZES)
readonly text: string = ''  // ← validator doesn't match type (string, not enum)
```

### Finding Enum Constants

For enum props, parse the corresponding `.interfaces.ts` file:

**File:** `button.interfaces.ts`

```ts
export const BUTTON_COLORS = ['primary', 'secondary'] as const
export type ButtonColor = (typeof BUTTON_COLORS)[number]
```

**Usage in component:** Match `ButtonColor` type to `BUTTON_COLORS` const.

**Naming convention:** `TypeName` → `TYPE_NAMEs` (capitalized type becomes ALL_CAPS plural const).

---

## Empty-String Sentinel Rule

See STYLE_GUIDE.md "Props": optional `@OneOf` enum props must use `undefined` (optional `?:`), never `= ''`, as the "not set" value. The enum's `CONST_ARRAY` must only contain real domain values.

### Detection

A prop is flagged (`empty-string-sentinel`, warn) when it has `@OneOf(...)` and a literal `= ''` or `= ""` default, and is **not** already optional:

```tsx
@Prop()
@OneOf(BUTTON_SIZES)
readonly size: ButtonSize = ''   // ⚠ flagged
```

Required props (`@Required()`) with a real default (e.g. `= 'primary'`) are never flagged — this rule only applies to the "optional, no value selected" case.

### Fix (`--fix`)

Two mechanical edits, applied together:

1. Rewrite the prop declaration: `size: ButtonSize = ''` → `size?: ButtonSize` (preserves `readonly` if present).
2. Strip the `''` sentinel out of the matching `CONST_ARRAY` in `.interfaces.ts` (found via the `@OneOf(ARRAY_NAME)` argument, searched across every `*.interfaces.ts` file in the component directory).

The array is only touched if step 1 actually matched — if the prop declaration doesn't match the expected pattern (e.g. a non-standard shape), the fix is skipped for that prop and reported so it isn't half-applied (a stray `= ''` referencing a type that no longer contains `''` is worse than not fixing it).

### Flagged, not fixed

Making a prop optional can break code that assumed it was always a string. These are reported as `empty-string-usage` / `unsafe-optional-access` warnings, for manual follow-up:

- Any line in the same `.tsx` referencing `this.<prop>` alongside a `''`/`""` literal (e.g. `normalizeDeprecatedTShirtSize(this.px) || ''`)
- Any line calling a method/property directly off the prop (`this.<prop>.split(...)`) — `hasValue()` is a plain `boolean`, not a TS type guard, so this becomes a real `strict: true` type error once the prop is optional
- `apps/storybook/src/components/<name>/*.stories.ts` and `*.doc-config.ts`
- `packages/playwright/src/lib/components/<name>*.po.ts`
- `*.spec.ts` files inside the component directory

After running `--fix` on a component with this rule, always run `tsc --noEmit` before considering the migration done.

---

## Validation Errors & Warnings

### Errors (Phase 1 always reports)

- Missing validation decorator (`@Type`/`@OneOf`) on `@Prop()`
- Validator type mismatch (e.g., `@Type('boolean')` on a string prop)
- Divider comment formatting incorrect or misplaced

### Warnings (Phase 1 reports but Phase 2 may skip)

- Complex prop type (union, object) cannot be automatically validated → requires manual review
- Enum prop missing matching const in `.interfaces.ts` → skips enum validation

### Edge Cases

**Union types:**

```tsx
@Prop()
readonly value: string | number = ''  // ← Cannot auto-validate
```

**Object types:**

```tsx
@Prop()
readonly config: SomeObject = {}  // ← Cannot auto-validate
```

**Missing interfaces file:**

```tsx
@Prop()
@OneOf(BUTTON_SIZES)
readonly size: ButtonSize = ''  // ← If BUTTON_SIZES not found in interfaces.ts, warn
```

---

## Phase 2: Fix Operations

### Divider Comments

**Add missing:**

```tsx
// If component has @Listen() but no PUBLIC LISTENERS divider:
/**
 * PUBLIC LISTENERS
 * ─────────────────────────────────────────────────────
 */
```

**Fix formatting:**

- Correct dash count to ≈53 Unicode dashes
- Fix spacing/indentation
- Reorder sections if out of order

### Validators

**Add decorator:**

```tsx
// Before
@Prop()
readonly label: string = ''

// After
@Prop()
@Type('string')
readonly label: string = ''
```

**Fix type mismatch:**

```tsx
// Before
@Prop()
@Type('number')  // ← wrong type
readonly size: ButtonSize = ''

// After
@Prop()
@OneOf(BUTTON_SIZES)
readonly size: ButtonSize = ''
```

### Imports

When adding validators:

- Verify `@utils` import exists
- Add to existing import if already imported: `import { Type, OneOf, ... } from '@utils'`
- Do **not** create new imports; add to existing `@utils` import

---

## File Structure

### Component Discovery

Given component name (e.g., `button`), scan:

- `packages/core/src/components/<name>/<name>.tsx` — Main component
- `packages/core/src/components/<name>/**/*.tsx` — Sub-components (e.g., `carousel/carousel.tsx`, `carousel/carousel-item.tsx`)

### Interfaces File

For each `.tsx` file, look for corresponding `.interfaces.ts`:

- `button.tsx` → `button.interfaces.ts`
- `carousel/carousel.tsx` → `carousel/carousel.interfaces.ts`
- `carousel/carousel-item.tsx` → `carousel/carousel-item.interfaces.ts`

If missing, warn but continue with non-enum validation.

---

## Reporting Format

### Phase 1 Output (Check)

Report to terminal/Claude with tree structure:

```
component-name/
├─ component.tsx
│  ✓ Dividers: Present sections correctly ordered
│  ✓ Props: All N props have validators
├─ sub-component.tsx
│  ⚠ Dividers: PUBLIC METHODS section missing (but @Method() present)
│  ✗ Props: "size" (ButtonSize) has @Type('string') — type mismatch
```

### Phase 2 Output (Fix)

Summary of changes:

```
✓ carousel/carousel-item.tsx
  • Added PUBLIC LISTENERS divider comment
  • Fixed validator: "value" now @Type('string')
  • Added @OneOf(BUTTON_SIZES) to "size" prop
```
