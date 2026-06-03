# ds-test-component Skill

## Overview

This skill auto-generates comprehensive test suites for Helvetia Design System components. When invoked with a component name, it generates all test files needed for complete coverage: visual tests, accessibility tests, component behavior tests, page objects, and unit tests.

## Files

- **SKILL.md** — User-facing skill documentation with quick start, workflows, and examples
- **REFERENCE.md** — Detailed technical rules for each test file type generation
- **README.md** — This file, explaining the skill structure and implementation

## Implementation Status

- ✅ SKILL.md — Complete user documentation
- ✅ REFERENCE.md — Complete generation rules and examples
- 🔄 Implementation — To be completed using the rules in REFERENCE.md

## Generated Test Files

The skill generates up to 6 files per component:

1. **visual.html** — Test fixture with variant sections (basic, enums, states, slots)
2. **visual.play.ts** — Playwright visual regression tests
3. **a11y.play.ts** — Comprehensive accessibility tests (axe + semantic + contrast)
4. **component.play.ts** — Event and behavior tests
5. **button.po.ts** — Page object with part locators and assertions
6. **button.util.spec.ts** — Unit tests for utility functions (if .util.ts exists)

## How the Skill Works

1. **Parse component** → Discovers props, events, slots, parts, states
2. **Show checklists** → User confirms which visual props and slots to test
3. **Generate files** → Creates all test files with proper structure
4. **Report** → Lists generated files with test counts

## Key Generation Rules

### Visual Tests
- **Basic section** — Auto-detect common props (label, icon, placeholder)
- **Enum sections** — One section per enum prop showing all values
- **State sections** — One section per state (disabled, loading, invalid, etc.)
- **Slot sections** — One section per detected slot with auto-generated demo content

### A11y Tests
- **Axe-core** — Automated accessibility violation detection
- **Semantic** — ARIA labels, roles, heading hierarchy, keyboard nav
- **Contrast** — WCAG AA compliance checks (4.5:1 text, 3:1 large text)

### Component Tests
- **Events** — Auto-discover @Event decorators, test firing
- **States** — Auto-discover boolean props, test state assertions
- **Slots** — Test slot content renders correctly
- **Value** — Test value prop assertion if present

### Page Object
- **Part locators** — readonly properties for each @part JSDoc tag
- **Action methods** — click(), focus(), hover(), etc.
- **State assertions** — assertToBeDisabled(), assertToBeLoading(), etc.
- **Value assertion** — hasValue() method if component has value prop

### Unit Tests
- **Happy paths** — Valid inputs → expected outputs
- **Edge cases** — undefined, null, empty string, invalid values
- **Type variations** — Multiple input types handled correctly

## References

- [STYLE_GUIDE.md](../../STYLE_GUIDE.md) — Component standards
- [ARCHITECTURE.md](../../ARCHITECTURE.md) — Component patterns
- [packages/playwright/CONTEXT.md](../../packages/playwright/CONTEXT.md) — Testing library details
- Existing button tests — examples at `packages/core/src/components/button/test/`
