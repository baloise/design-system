---
name: ds-lint-component
description: Lint and fix Helvetia Design System components for style guide compliance. Checks prop validation coverage, divider comment formatting, and lifecycle hook setup. Use when building or reviewing DS components, or when user asks to lint/check a component.
---

# Lint Component

Checks and fixes Helvetia Design System components against the STYLE_GUIDE. Two phases: **Check** (report violations) and **Fix** (auto-correct issues).

## Quick Start

Check a component for violations:

```bash
ds-lint-component button
```

Output: Human-readable report of violations (to terminal and Claude context).

Fix violations:

```bash
ds-lint-component button --fix
```

Output: Summary of changes written to files.

## What Gets Checked

**Design Tokens**
- Component styles use `--ds-alias-*` tokens (approved alias tokens)
- Component styles use `--ds-component-*` tokens (component-specific tokens)
- Component styles use `--_*` tokens (private/local variables)
- Global `--ds-*` tokens are only allowed in `vars.local()` setup context as defaults
- Flags usage of old or non-existent global tokens directly in styles

**Documentation**
- Every `@Prop` has a JSDoc comment immediately before it
- Every `@Event` has a JSDoc comment immediately before it
- Every `@Method` has a JSDoc comment immediately before it
- Every `@slot` is documented in the component-level JSDoc with a description
- Every `@part` is documented in the component-level JSDoc with a description

**Divider Comments**
- Section dividers exist only for sections with content
- Format: Unicode dashes, correct spacing
- Sections appear in order: PUBLIC PROPERTY API → LIFECYCLE → PUBLIC LISTENERS → PUBLIC METHODS → EVENT HANDLERS → PRIVATE METHODS → RENDER

**Prop Validation**
- Every `@Prop()` has a matching `@Validate*` decorator
- Validator type matches prop type (string → `ValidateEmptyOrType('string')`, enum → `ValidateEmptyOrOneOf(...)`)
- `setupValidation(this)` called in both `connectedCallback()` and `componentWillUpdate()`

**Type Matching Rules**
- Primitive props → `ValidateEmptyOrType('string'|'number'|'boolean')`
- Enum props → `ValidateEmptyOrOneOf(...CONST_ARRAY)` via `.interfaces.ts`
- Complex types (union, object) → Flagged as unable to validate; manual review required
- `Required*` validators allowed only when prop default is never empty

## Workflow

### Phase 1: Check (Report)

```bash
ds-lint-component button
```

Scans component and sub-components (e.g., `carousel` scans `carousel/carousel.tsx` and `carousel/carousel-item.tsx`). Reports to terminal:

```
✓ carousel/carousel.tsx
  ✓ Documentation: All props, events, methods documented
  ✓ Dividers: Present sections correctly ordered
  ✓ Props: All 12 props have validators
  ✓ setupValidation: Called in connectedCallback() and componentWillUpdate()

⚠ carousel/carousel-item.tsx
  ⚠ Missing JSDoc documentation for @Prop "disabled"
  ⚠ Missing JSDoc documentation for @Event "dsChange"
  ✗ Dividers: PUBLIC LISTENERS section missing (but @Listen() methods present)
  ✗ Props: "value" (string) has ValidateEmptyOrType('number') — type mismatch
  ✗ setupValidation: Missing from componentWillUpdate()
```

### Phase 2: Fix (Auto-Correct)

```bash
ds-lint-component button --fix
```

Auto-corrects issues:

- ✅ Adds missing JSDoc comments for `@Prop`, `@Event`, and `@Method` decorators
- ✅ Adds/fixes divider comments with correct formatting
- ✅ Adds missing `@Validate*` decorators (matches types via `.interfaces.ts`)
- ✅ Adds/fixes `setupValidation(this)` calls
- ✅ Creates `connectedCallback()` or `componentWillUpdate()` if needed (when component has props)
- ✅ Writes changes to `.tsx` files

Reports summary of changes:

```
✓ carousel/carousel.tsx
  • Added setupValidation() to componentWillUpdate()

✓ carousel/carousel-item.tsx
  • Added JSDoc for @Prop "disabled"
  • Added JSDoc for @Event "dsChange"
  • Added PUBLIC LISTENERS divider comment
  • Fixed validator: "value" now ValidateEmptyOrType('string')
  • Created connectedCallback() with setupValidation()
```

## Examples

### Example 1: Button Component

Check button:
```bash
ds-lint-component button
```

If button is compliant, no violations reported.

### Example 2: Carousel with Sub-Components

Check carousel and carousel-item together:
```bash
ds-lint-component carousel
```

Reports violations in both `carousel/carousel.tsx` and `carousel/carousel-item.tsx`.

### Example 3: Fix with Auto-Create Lifecycle Hook

If a component has props but no `connectedCallback()`, `--fix` creates it:

**Before:**
```tsx
@Component({ tag: 'ds-example', shadow: true })
export class Example {
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  render() { /* ... */ }
}
```

**After:**
```tsx
@Component({ tag: 'ds-example', shadow: true })
export class Example {
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  connectedCallback(): void {
    setupValidation(this)
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  render() { /* ... */ }
}
```

## Warnings & Limitations

- **Complex types:** Unions and object types flagged for manual review; skill cannot auto-validate
- **Missing `.interfaces.ts`:** Enum validation skipped with warning if interfaces file not found
- **Validator type inference:** Relies on `.interfaces.ts` naming convention (`ButtonColor` → `BUTTON_COLORS`)

## Related

See [STYLE_GUIDE.md](../../STYLE_GUIDE.md) for component standards.
