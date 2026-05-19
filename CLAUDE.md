# CLAUDE.md — AI Assistant Instructions

This file guides AI assistants when working with code in this repository.

## Quick Reference

### Core Principles

The design system prioritizes:
- **Accessibility** (WCAG 2.2 AA)
- **Simplicity** (HTML → CSS → JavaScript)
- **Responsiveness** (320px–2560px)
- **Standards Compliance** (W3C best practices)
- **Compatibility** (webstatus.dev + caniuse.com)
- **Inclusion** (diverse abilities and technologies)

For comprehensive architecture and design philosophy, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Commands

```bash
# Development
npm start                  # Start core components in dev mode (IS_DS_DEVELOPMENT=true)
npm run docs               # Start Storybook documentation

# Build
npm run build              # Build all packages (respects turbo cache)
npm run tokens             # Build design tokens only
npm run css                # Build styles only

# Testing
npm test                   # Run all Vitest unit tests (--watch=false)
npm run play               # Open Playwright UI test explorer

# Run single Vitest test
npm run test -- --workspace=<project> --testFile=<path>

# Run single Playwright test
npm run play -- --grep="<test name>"

# Linting & Formatting
npm run lint               # Lint all packages
npm run format             # Auto-format code (enforces LF line endings)
npm run spell              # Spell check with cspell

# Version management
npm run changeset          # Create a changeset entry before publishing
```

## Documentation

For comprehensive technical information, see the dedicated documentation files:

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — System design, workspace structure, component lifecycle, web components patterns, CSS variables, testing strategy
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Local setup, dev servers, building, testing, troubleshooting
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution workflow, PR process, component checklist, accessibility requirements
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** — Code standards, naming conventions, best practices
- **[SECURITY.md](SECURITY.md)** — Security policy and guidelines
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Community standards

## Key Guidelines

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for detailed code standards and best practices.

**Quick Rules:**
- Use `ds-` prefix for all custom elements
- All components must implement `ComponentInterface` and `Loggable`
- Follow naming conventions: `listenTo*`, `*Changed`, `handle*` for event handlers
- Use `readonly` for all immutable `@Prop()` values
- Avoid JavaScript for tasks that HTML/CSS can solve
- Avoid attribute selectors in SCSS; use CSS classes
- Use CSS variable cascade: private (`--_`), public (`--`), modifier (`--mod-`), token (`--ds-`)
- Always avoid security issues; follow best practices for web development

See [ARCHITECTURE.md](ARCHITECTURE.md) for comprehensive coverage of:
- Component file structure
- Hybrid component model
- Stencil style guide and patterns
- CSS variable cascade system
- Web components best practices

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- New component checklist
- Testing requirements
- Accessibility standards (WCAG 2.2 AA)
- Release process and changesets
