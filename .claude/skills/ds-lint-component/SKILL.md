---
name: ds-lint-component
description: Audit and auto-fix Stencil component files against the design system style guide
---

# ds-lint-component

Audit and auto-fix Stencil component files against the design system style guide. Runs 14 design-system-specific checks (excluding ESLint-covered rules).

## Usage

```bash
/ds-lint-component <component-name>
```

## What it does

1. **Analyzes component files:**
   - Primary: `<component>.tsx`
   - Optional: `<component>.interfaces.ts`, `<component>.host.scss`, `<component>.style.scss`

2. **Runs 14 design-system-specific checks:**
   - Check 0: Import aliases (@utils/@global)
   - Check 1: Const arrays with derived types
   - Check 2: Type annotations on @Prop()
   - Check 3: reflect attribute for state props
   - Check 4: validateProps() method
   - Check 8: ds prefix on events

- Check 9: DsComponentInterface + Logger contract
- Check 11: Section comment dividers
- Check 14: @Prop() + @Watch() together
- Check 16: ds- prefix on component tag
- Check 17: One-sentence component description
- Check 18: @slot and @part JSDoc tags
- Check 19: CSS classes over attribute selectors (warn only)
- Check 20: Enum props with = '' default

3. **Reports violations** before fixing
4. **Auto-fixes violations** in single Edit passes
5. **Confirms what was changed**

## Example

```bash
/ds-lint-component button
```

**Output:**

```
Violations found in button.tsx:
0. Missing import alias: imports from '../../utils/*' (use @utils)
1. Const arrays in interfaces.ts not exported flat (wrapped in namespace)
3. State prop 'value' missing reflect: true
4. Missing validateProps() method
8. Event 'change' missing ds prefix → dsChange
9. Missing DsComponentInterface implementation
11. Missing section dividers: PUBLIC PROPERTY API, LIFECYCLE
17. Missing component description on class JSDoc

Applying fixes...
  ✓ Fixed import aliases
  ✓ Added validateProps() method
  ✓ Added component description
  ✓ Added section dividers
  ✓ Added DsComponentInterface implementation

Summary: 4 files modified, 8 violations fixed.
No violations in interfaces.ts
Warning: Check button.host.scss for attribute selectors (CSS class selectors recommended)

✅ Style guide audit complete!
```

## Checks Performed

| Check | What it validates                                                        | Auto-fixes | SCSS      |
| ----- | ------------------------------------------------------------------------ | ---------- | --------- |
| 0     | Import from @utils/@global instead of relative paths                     | Yes        | -         |
| 1     | Const arrays with derived types in interfaces.ts                         | Yes        | -         |
| 2     | Type annotations on @Prop() declarations                                 | Yes        | -         |
| 3     | State props (disabled, value, etc.) have reflect: true                   | Yes        | -         |
| 4     | validateProps() method called from connectedCallback/componentWillUpdate | Yes        | -         |
| 8     | @Event() declarations use ds prefix                                      | Yes        | -         |
| 9     | DsComponentInterface implementation + @Logger/createLogger contract      | Yes        | -         |
| 11    | Section comment dividers organize class body                             | Yes        | -         |
| 14    | @Prop() and @Watch() declarations placed together                        | Yes        | -         |
| 16    | Component tag has ds- prefix, class name doesn't                         | Yes        | -         |
| 17    | One-sentence description on component class JSDoc                        | Yes        | -         |
| 18    | @slot and @part tags match render()                                      | Yes        | -         |
| 19    | CSS classes instead of attribute selectors                               | No         | Warn only |
| 20    | Enum props use = '' default instead of ?                                 | Yes        | -         |

## Key Requirements

**Every component MUST have:**

- ✅ Logger (@Logger decorator + createLogger method)
- ✅ validateProps() method (called from connectedCallback + componentWillUpdate)
- ✅ DsComponentInterface implementation (includes Loggable)
- ✅ Section dividers organizing class body

**Form components MUST have:**

- ✅ FormControlInterface
- ✅ @AttachInternals() internals!: ElementInternals

## No Duplication with ESLint

This skill focuses only on design-system-specific checks. The following are handled by ESLint and skipped:

- Naming conventions (listenTo*, propChanged, handle*)
- private method visibility
- JSDoc requirements (general)
- Alphabetical ordering
- async @Method() declarations

Run `npm run lint` to check those rules separately.

## Output Format

**Before fixing:**

```
Violations found in button.tsx:
0. Import violation message
1. Const array violation message
3. reflect attribute violation message
...

Applying fixes...
```

**After fixing:**

```
✓ Fixed import aliases
✓ Added validateProps() method
✓ Added component description

Summary: 3 files modified, 5 violations fixed.
```

**No violations:**

```
✅ No style guide violations found in button.tsx
```

## Requirements for Form Components

If the component implements `FormControlInterface`:

```ts
import { AttachInternals } from '@stencil/core'

export class MyInput implements ComponentInterface, FormControlInterface<string> {
  @AttachInternals() internals!: ElementInternals

  private validateProps() {
    // Validation for form control props
  }
}
```

The skill checks for this and adds it if missing.
