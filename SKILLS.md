# 🤖 Claude Code Skills

This repository includes custom **Claude Code skills** to automate common component development tasks. Skills are invoked via `/skill-name` commands in Claude Code.

## Available Skills

### ds-create-component

**Generate a new design system component with full TDD scaffolding, backwards compatibility, and test infrastructure.**

```bash
/ds-create-component <component-name>
```

Creates a complete component scaffold with:

- Component stub (`component.tsx`, `component.interfaces.ts`)
- Styling files (`.host.scss`, `.style.scss`)
- Internationalization support (if needed)
- Backwards-compatible API from old `bal-*` components
- Design token integration with available token comments
- Animation handling with dsConfig wiring
- TDD red-phase test scaffolding (tests fail initially)
- Auto-export to `packages/core/src/index.ts`

Then orchestrates:

- `/ds-sync-component-tests` — Generate component interaction tests
- `/ds-sync-visual-tests` — Generate visual regression tests
- `/ds-sync-a11y-tests` — Generate accessibility tests

**Features:**

- Scans `origin/main` for old `bal-*` component API
- Detects form components, i18n needs, animations automatically
- Generates component types: wc-only, hybrid, css-html
- Parses design tokens and comments available options
- ElementInternals + form integration for form components
- Deprecation markers for backwards-compatibility conflicts
- Browser support validation (latest 2 major versions)
- Reduces code duplication via component composition

[→ Full documentation](./.claude/skills/ds-create-component/README.md)

---

### ds-sync-visual-tests

**Generate and maintain visual regression test files for components.**

```bash
/ds-sync-visual-tests <component-name>
```

Analyzes component props and automatically creates `.visual.html`, `.style.html`, and `.visual.play.ts` test files with proper organization and structure.

**Features:**

- Parses component `@Prop()` declarations (skips `@internal`, `@deprecated`)
- Detects component type (hybrid, web-component, HTML/CSS)
- Interactive prop and pattern selection
- Auto-generates trigger buttons for interactive components
- Merges with existing files intelligently
- Formats and lints output

[→ Full documentation](./.claude/skills/ds-sync-visual-tests/README.md)

---

### ds-sync-a11y-tests

**Generate and maintain WCAG AA accessibility test files for components.**

```bash
/ds-sync-a11y-tests <component-name>
```

Analyzes component props and automatically creates `.a11y.play.ts` test files with accessibility audit coverage.

**Features:**

- Extracts enum constants from interfaces (`*_COLORS`, `*_SIZES`, `*_VARIANTS`, etc.)
- Detects form components automatically
- Creates describe blocks per enum category
- Includes form state tests (disabled, invalid, required, readonly, checked)
- Uses sensible defaults per component type
- Ensures WCAG 2.2 AA compliance (EAA standards)
- Formats and lints output

[→ Full documentation](./.claude/skills/ds-sync-a11y-tests/README.md)

---

### ds-sync-component-tests

**Generate TDD test infrastructure: Page Objects, component interaction tests, and util unit tests.**

```bash
/ds-sync-component-tests <component-name>
```

Analyzes component structure and generates coordinated test files for TDD workflow.

**Generates:**

- **Page Object** (`.po.ts`) — Typed wrapper with action & assertion methods for `@baloise/ds-playwright`
- **Component Test** (`.component.play.ts`) — Playwright tests for events, state, and methods
- **Util Test** (`.util.spec.ts`) — Vitest unit tests with full branch coverage (if util file exists)

**Features:**

- Detects all `@Event()`, `@Prop()`, `@Method()` declarations
- Extracts locators from JSDoc + shadow DOM
- Generates event spy tests with TODO placeholders for expected values
- Creates state tests (disabled, readonly, checked, value)
- Includes form reset test for form components
- Full branch coverage for util functions
- Auto-comments TODOs for incomplete coverage
- Updates `packages/playwright/src/lib/components/index.ts` to export PO
- TDD-ready: test structure generated, user fills in assertions

**Who uses Page Objects:**

- Internal component tests (Playwright)
- Published as public API in `@baloise/ds-playwright` for design system customers

[→ Full documentation](./.claude/skills/ds-sync-component-tests/README.md)

---

### ds-lint-component

**Audit and auto-fix Stencil components against the design system style guide.**

```bash
/ds-lint-component <component-name>
```

Runs 14 design-system-specific checks (no ESLint duplication) and auto-fixes violations.

**Checks:**

- Import aliases (@utils/@global)
- Type annotations on @Prop()
- reflect attribute for state props
- validateProps() method
- @Event() ds prefix
- ComponentInterface + Loggable
- Section dividers
- @Prop()/@Watch() placement
- Component tag naming
- Component description
- @slot/@part documentation
- CSS classes over attribute selectors
- Enum props with = '' default

**Features:**

- Reports violations before fixing
- Auto-fixes 12+ checks
- Warns on SCSS issues (don't fix)
- Skips ESLint-covered rules (naming, visibility, async methods)
- Fast feedback loop for style guide compliance

[→ Full documentation](./.claude/skills/ds-lint-component/README.md)

---

### ds-vars-to-tokens

**Analyze and sync a component's CSS variables with the design token JSON.**

```bash
/ds-vars-to-tokens <component-name>
```

Ensures every `--ds-*` CSS variable reference in SCSS is properly wrapped in a component-specific design token, maintaining the token architecture.

**Analyzes:**

- `<component>.style.scss` — primary component styles (if exists)
- `<component>.host.scss` — host element styles (if exists)
- `<component>.mixin.scss` — shared SCSS mixins (if exist)

**Detects & Fixes:**

- ✗ `vars.local()` with direct alias/global refs (e.g., `var(--ds-color-primary-4)`)
- ✗ Direct alias/global refs in CSS rules (not wrapped in `vars.local()`)
- ⚠️ Hardcoded `vars.local()` literals (candidates for tokenization)
- ℹ️ Modifier vars referencing missing design tokens (reported)

**Features:**

- Parses component SCSS for all CSS variable patterns
- Validates against `Base.tokens.json` (source of truth)
- Interactive confirmation before applying changes
- Auto-derives JSON paths from CSS variable names
- Creates missing component tokens
- Updates SCSS to use component tokens
- Always rebuilds with `npm run tokens` to ensure consistency

[→ Full documentation](./.claude/skills/ds-vars-to-tokens/README.md)

---

## Using Claude Code Skills

Skills are available when working in this repository with Claude Code. They're stored in `.claude/skills/` and provide specialized capabilities for design system development.

### How to invoke a skill

```bash
/skill-name [arguments]
```

Skills can be invoked from:

- Claude Code chat
- Claude Code CLI (`claude code` command)
- VS Code extension

### Discovering skills

List available skills in Claude Code:

- In chat: type `/` and see skill suggestions
- CLI: `claude code /find-skills` for help discovering skills

## Creating New Skills

To add a skill to this repo:

1. Create a directory under `.claude/skills/<skill-name>/`
2. Add `SKILL.md` with CLI/harness metadata
3. Add `README.md` with full documentation
4. Implement the skill logic
5. Link it in this file (SKILLS.md)

For detailed guidance, see [ARCHITECTURE.md](./ARCHITECTURE.md) and existing skills in `.claude/skills/`.

---

## Related

- [DEVELOPMENT.md](./DEVELOPMENT.md) — Local setup and development workflow
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Contribution guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design and patterns
