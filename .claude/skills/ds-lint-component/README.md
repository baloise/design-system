# ds-lint-component

**Audit and auto-fix Stencil components against the design system style guide.**

Runs 14 design-system-specific checks — focusing on Stencil patterns, validators, loggers, and TypeScript structure. No duplication with ESLint.

## Quick Start

```bash
/ds-lint-component button
```

## 14 Checks Performed

**Check 0:** Import aliases (@utils/@global instead of relative paths)  
**Check 1:** Const arrays with derived types in interfaces.ts  
**Check 2:** Type annotations on @Prop() declarations  
**Check 3:** State props (disabled, value, etc.) have reflect: true  
**Check 4:** validateProps() method called from lifecycle hooks  
**Check 8:** @Event() uses ds prefix  
**Check 9:** DsComponentInterface + Logger contract  
**Check 11:** Section dividers organize class body  
**Check 14:** @Prop() and @Watch() placed together  
**Check 16:** Component tag has ds- prefix  
**Check 17:** One-sentence component description  
**Check 18:** @slot/@part tags match render()  
**Check 19:** CSS classes not attribute selectors (warn only)  
**Check 20:** Enum props use = '' default

## What Gets Auto-Fixed

✅ Import aliases (relative → @utils/@global)  
✅ Missing validateProps() method  
✅ Missing DsComponentInterface implementation  
✅ Missing section dividers  
✅ Event naming (add ds prefix)  
✅ Component description  
✅ Type annotations  
✅ reflect attributes on state props

## What Gets Warned (Not Fixed)

⚠️ **CSS attribute selectors** — warn user to replace with classes  
⚠️ **Missing @slot/@part tags** — warn to add documentation

## Files Analyzed

- **Primary:** `<component>.tsx` (required)
- **Optional:** `<component>.interfaces.ts` (for Check 1)
- **Optional:** `<component>.host.scss`, `<component>.style.scss` (for Check 19 warnings)

## Key Requirements

**Every component MUST have:**

- Logger (@Logger decorator + createLogger method)
- validateProps() method (called from connectedCallback + componentWillUpdate)
- DsComponentInterface implementation (includes Loggable)
- Section dividers

**Form components MUST also have:**

- FormControlInterface
- @AttachInternals() internals!: ElementInternals

## Example Output

```
✓ Scanning ds-button

Violations found (5):
  1. Relative imports from utils (use @utils)
  2. Missing validateProps() method
  3. Missing DsComponentInterface implementation
  4. Missing section dividers: PUBLIC PROPERTY API, LIFECYCLE
  5. Event 'change' missing ds prefix

Applying fixes...
  ✓ Fixed import aliases
  ✓ Added validateProps() method
  ✓ Added DsComponentInterface implementation
  ✓ Added section dividers
  ✓ Fixed event names

Summary: 1 file modified, 5 violations fixed.

⚠️  Check button.host.scss for attribute selectors

✅ Style guide audit complete!
```

## No ESLint Duplication

This skill skips checks already covered by ESLint:

- Naming conventions (listenTo*, propChanged, handle*)
- private method visibility
- JSDoc requirements (general)
- Alphabetical ordering
- async @Method() declarations

Run `npm run lint` separately for those rules.

## Usage Notes

The skill:

1. Analyzes the component file
2. Reports all violations BEFORE fixing
3. Applies fixes in a single pass
4. Confirms what was changed
5. Warns (doesn't fix) SCSS issues

Use this to ensure every component meets design system standards automatically.
