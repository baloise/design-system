# CONTEXT — Helvetia Design System Repository

This document captures the domain language, architectural patterns, and key concepts that govern the entire design system monorepo.

## Overview

**Helvetia Design System** is a Turborepo-based monorepo that builds a standards-based design system on Stencil.js. The system outputs Web Components, Angular bindings, React bindings, and comprehensive documentation.

## Core Principles

Every decision in this system adheres to these principles (from ARCHITECTURE.md):

- **Accessibility**: WCAG 2.2 AA compliance is non-negotiable
- **Simplicity**: HTML > CSS > JavaScript (solve with the simplest tool)
- **Responsiveness**: Support 320px–2560px viewports seamlessly
- **Standards Compliance**: Follow W3C best practices, avoid framework-specific solutions
- **Compatibility**: Only use features that are baseline widely available (webstatus.dev + caniuse.com)
- **Inclusion**: Ensure components and docs are usable by people with diverse abilities

## Key Concepts

### Monorepo Architecture
- **Turborepo** orchestrates build tasks and caching across packages
- **Workspaces** (in `packages/` and `libs/`) are independently versioned and published
- **Task caching** ensures only changed packages rebuild

### Release Process
- Changes are merged into `next` branch
- **Changesets** (`.changeset/*.md` files) document changes as `patch` | `minor` | `major`
- **Changeset Release PR** aggregates all changesets and bumps version
- **npm publish** happens automatically when Release PR is merged
- **LTS support** — `main` branch is a parallel long-term support release line

### CI/CD Workflow
- **Continuous** workflow runs on every push and PR (lint, test, build)
- **prepare-release** workflow creates/updates Release PR
- **release** workflow publishes to npm with provenance
- **snapshots** can be published from PR branches for early testing
- **CodeQL security** analysis runs on schedule

## Notable Constraints

- **No breaking changes without major version bump** — consumers depend on stable APIs
- **Backward compatibility required** — deprecate before removing features
- **Web standards only** — no framework-specific solutions in core
- **Self-contained assets** — no external CDNs, all assets bundled

## Related Contexts

See [CONTEXT-MAP.md](CONTEXT-MAP.md) for package-specific contexts:
- [[packages/core|packages/core/CONTEXT.md]] — Stencil components
- [[packages/tokens|packages/tokens/CONTEXT.md]] — Design tokens
- [[packages/css|packages/css/CONTEXT.md]] — Global styles
- [[packages/assets|packages/assets/CONTEXT.md]] — Fonts & icons
- [[packages/playwright|packages/playwright/CONTEXT.md]] — E2E testing
- [[docs|docs/CONTEXT.md]] — Storybook documentation
- [[libs|libs/CONTEXT.md]] — Internal utilities
