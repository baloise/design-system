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

- `/ds-test-component` — Generate component tests (visual, a11y, component, unit)
- `/ds-document-component` — Generate component documentation
- `/ds-lint-component` — Lint and fix component compliance
- `/ds-sync-vars` — Sync component variables to design tokens

**Features:**

- Scans `origin/main` for old `bal-*` component API
- Detects form components, i18n needs, animations automatically
- Generates component types: wc-only, hybrid, css-only
- Parses design tokens and comments available options
- ElementInternals + form integration for form components
- Deprecation markers for backwards-compatibility conflicts
- Browser support validation (latest 2 major versions)
- Reduces code duplication via component composition

[→ Full documentation](./.claude/skills/ds-create-component/README.md)

---

### ds-lint-component

**Lint and fix Helvetia Design System components for style guide compliance.**

```bash
/ds-lint-component <component-name>
/ds-lint-component <component-name> --fix
```

Checks and auto-fixes:

- **Prop Validation** — Every `@Prop()` has matching `@Validate*` decorator with correct types
- **Divider Comments** — Section dividers formatted correctly and in proper order
- **Lifecycle Hooks** — `setupValidation(this)` called in `connectedCallback()` and `componentWillUpdate()`
- **Documentation** — JSDoc comments for props, events, methods, slots, and parts

**Phases:**

- **Check** — Report violations to terminal and context
- **Fix** — Auto-correct issues and write changes to files

[→ Full documentation](./.claude/skills/ds-lint-component/README.md)

---

### ds-test-component

**Auto-generate all test files for design system components.**

```bash
/ds-test-component <component-name>
```

Generates comprehensive test coverage in one command:

- **Visual Tests** (`button.visual.html`, `button.visual.play.ts`) — Visual regression testing with variant sections
- **Accessibility Tests** (`button.a11y.play.ts`) — Axe-core checks, semantic validation, contrast verification
- **Component Tests** (`button.component.play.ts`) — Event emissions, prop changes, state transitions
- **Page Object** (`button.po.ts`) — Reusable Playwright selectors and assertions
- **Unit Tests** (`button.util.spec.ts`) — Tests for utility functions

**Features:**

- Auto-detects component props, events, slots, parts, and states
- Shows checklist for visual props and slot variations
- Extracts section names from existing visual.html
- Generates comprehensive accessibility coverage
- Creates page objects with readonly part locators
- Generates realistic test assertions, not stubs

[→ Full documentation](./.claude/skills/ds-test-component/README.md)

---

### ds-sync-vars

**Sync component CSS variables to design tokens.**

```bash
/ds-sync-vars <component-name>
```

Automatically maps CSS variables to design tokens:

- **Parsing** — Extracts variables from `@include vars.local()` calls in SCSS files
- **Mapping** — Links to existing Alias tokens using semantic rules (font-family → Text.Family, gap → Space, etc.)
- **Detection** — Identifies hardcoded values, ambiguous mappings, missing tokens
- **Creation** — Generates component tokens in `Base.tokens.json`
- **Regeneration** — Runs `npm run tokens` to update all token outputs

**Features:**

- Handles web-component and sub-component variables separately
- Auto-matches hardcoded pixel values to Space scales (0.5rem → Space.XS)
- Prefers Alias tokens, warns about new token creation
- Shows markdown table checklist for review
- Supports hybrid and CSS-only components

[→ Full documentation](./.claude/skills/ds-sync-vars/README.md)

---

### ds-document-component

**Auto-generate Storybook documentation for design system components.**

```bash
/ds-document-component <component-name>
```

Generates comprehensive component documentation:

- **6 MDX Files** — Overview, Usage, Variants, Styling, Accessibility, Testing
- **Stories** — Interactive Storybook stories from visual test sections
- **Doc Config** — Component metadata (tag, name, category, subcomponents)
- **Sub-Components** — Auto-detects and documents sub-components separately

**Features:**

- Detects component type (web-component-only, hybrid, CSS-only)
- Extracts visual.html sections and shows checklist
- Generates MDX content from components.json + JSDoc + visual sections
- Creates interactive stories with full prop controls
- Handles sub-components with separate documentation directories
- Web-component-only: Full stories + all 6 MDX files
- Hybrid/CSS-only: No stories + placeholders for non-applicable docs

[→ Full documentation](./.claude/skills/ds-document-component/README.md)

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
