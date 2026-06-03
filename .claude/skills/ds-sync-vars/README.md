# ds-sync-vars Skill

## Overview

This skill automatically syncs component CSS variables to design tokens in the tokens package.

**Invocation:** `ds-sync-vars button`

**What it does:**

1. Parses component SCSS files (`style.scss`, `host.scss`)
2. Extracts CSS variable definitions from `@include vars.local()` calls
3. Analyzes each variable and maps to Alias tokens
4. Detects edge cases (hardcoded values, missing tokens, ambiguous mappings)
5. Shows a checklist of proposed changes
6. (Future) Creates component tokens in `Base.tokens.json` and regenerates

## Files

- **SKILL.md** — User-facing documentation with quick start and examples
- **REFERENCE.md** — Detailed technical documentation and mapping rules
- **README.md** — This file
- **index.js** — CLI entry point
- **implementation.js** — Core logic (parsing, analysis, reporting)

## Implementation Status

✅ **Complete:**

- SCSS file parsing (`@include vars.local()` extraction)
- Variable analysis and semantic mapping
- Edge case detection (hardcoded values, existing tokens)
- Checklist reporting as markdown table

🔄 **In Progress:**

- User confirmation flow
- Component token creation in `Base.tokens.json`
- Auto-regeneration (`npm run tokens`)
- Sub-component handling refinement

❌ **Not Yet:**

- Interactive selection for ambiguous mappings
- Figma metadata synchronization
- Git integration

## Core Mappings

Hard-coded semantic mappings from CSS property names to design token categories:

```javascript
MAPPINGS = {
  'font-family': { category: '🔤 Text', subcategory: 'Family' },
  'font-weight': { category: '🔤 Text', subcategory: 'Weight' },
  'gap': { category: '↔️ Space', ... },
  'radius': { category: '🔘 Border', subcategory: 'Radius' },
  'shadow': { category: '🌫️ Shadow', ... },
  // ... etc
}
```

Space scales auto-matched for hardcoded pixel values:

```javascript
SPACE_SCALES = {
  '0.5rem': 'Space.XS',
  '1rem': 'Space.SM',
  '1.5rem': 'Space.MD',
  '2rem': 'Space.LG',
  // ... etc
}
```

## Example Usage

```bash
$ ds-sync-vars button

📋 Syncing component variables: button

## Analyzing button

  ✓ button-font-family
  ✓ button-gap
  ⚠ button-custom-color
  ✗ button-unknown

📋 Review Changes

### button

| Variable | Status | Category | Action |
|----------|--------|----------|--------|
| button-font-family | ✓ | 🔤 Text | Create component token |
| button-gap | ✓ | ↔️ Space | Create component token |
| button-custom-color | ⚠ | — | Warn: hardcoded (suggest Space.MD) |
| button-unknown | ✗ | — | No mapping found |

✅ Analysis complete.
```

## Next Steps

1. Implement user confirmation flow
2. Implement token creation in `Base.tokens.json`
3. Implement `npm run tokens` auto-regeneration
4. Handle interactive selection for ambiguous mappings
5. Support sub-components with separate token sections

## Related Context

- Token naming conventions: [REFERENCE.md](REFERENCE.md)
- Token architecture: `packages/tokens/CONTEXT.md`
- Component style patterns: `packages/core/src/components/button/button.style.scss`
