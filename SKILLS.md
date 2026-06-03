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
