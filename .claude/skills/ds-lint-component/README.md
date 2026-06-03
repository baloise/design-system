# ds-lint-component Skill

## Overview

This skill provides a structured approach for linting and fixing Helvetia Design System components according to the STYLE_GUIDE standards.

## Files

- **SKILL.md** — User-facing skill documentation with quick start, workflows, and examples
- **REFERENCE.md** — Detailed technical rules for component validation, validator types, divider formatting, and fix operations
- **index.js** — Entry point (stub for reference)
- **implementation.js** — Core linting logic with prop analysis, divider checking, and validation rules

## Usage

The skill is invoked by Claude via:

```bash
/ds-lint-component button
/ds-lint-component carousel --fix
```

Claude parses the skill definitions and uses the reference documentation to:

1. **Analyze** the component's TypeScript code structure
2. **Check** for violations (missing validators, incorrect divider formatting, missing setupValidation calls)
3. **Report** violations to the user in a human-readable format
4. **Fix** violations using the fix operations documented in REFERENCE.md

## Implementation Status

- ✅ SKILL.md — Complete user documentation
- ✅ REFERENCE.md — Complete validation rules and fix patterns
- 🔄 implementation.js — Reference implementation (can be enhanced with full AST parsing)

## Extending the Implementation

The `implementation.js` includes basic regex-based pattern matching. For production use, consider:

1. **TypeScript AST Parsing** — Use `@typescript-eslint/parser` for accurate AST analysis
2. **Decorator Detection** — Improve `@Validate*` decorator detection and type matching
3. **File Rewriting** — Enhance the `fixFile()` function to actually apply fixes
4. **Enum Constant Discovery** — Parse `.interfaces.ts` files to find enum constants

## References

- [STYLE_GUIDE.md](../../STYLE_GUIDE.md) — Component standards
- [ARCHITECTURE.md](../../ARCHITECTURE.md) — Component patterns and validation strategy
- [packages/core/CONTEXT.md](../../packages/core/CONTEXT.md) — Component architecture details
