# ⚙️ Development Guide

This guide covers local development setup and common workflows for the Helvetia Design System.

## Table of Contents

- [Quick Start](#quick-start)
- [Development Servers](#development-servers)
- [Building](#building)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Versioning and Publishing](#versioning-and-publishing)
- [Project Structure](#project-structure)
- [Style and Best Practices](#style-and-best-practices)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Environment Variables](#environment-variables)
- [Further Reading](#further-reading)
- [Need Help?](#need-help)

## Quick Start

### Prerequisites

- **Node.js**: >=24 <25 (check with `node --version`)
- **npm**: >=11.0.0 (check with `npm --version`)
- **Git**: for cloning and version control

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/baloise/design-system.git
cd design-system

# Install dependencies (use ci for reproducible builds)
npm ci

# Start development
npm start                # Core components dev server (http://localhost:3333)
npm run docs             # Storybook documentation (http://localhost:6006)
```

The dev servers support hot reloading — changes to components and styles are reflected immediately.

## Development Servers

### Core Components Dev Server

```bash
npm start
```

Starts the Stencil dev server at http://localhost:3333. Useful for:

- Testing components in isolation
- Checking Shadow DOM and style encapsulation
- Validating web component functionality

The server watches for changes and hot-reloads.

### Storybook Documentation

```bash
npm run docs
```

Starts Storybook at http://localhost:6006. Useful for:

- Viewing component documentation and stories
- Testing components with different prop combinations
- Verifying accessibility and visual design
- Writing and testing component stories

## Building

```bash
# Build everything
npm run build

# Build specific packages
npm run build -- --filter=@baloise/ds-core     # Web components
npm run build -- --filter=@baloise/ds-tokens   # Design tokens
npm run build -- --filter=@baloise/ds-css      # Styles

# Build docs for production
npm run build:docs
```

Builds are cached by Turborepo — only changed packages rebuild.

## Testing

### Unit Tests

```bash
npm test                           # Run all tests
npm test -- --watch                # Watch mode
npm test -- --workspace=<pkg> --testFile=<path>  # Single file
```

Framework: **Vitest** with jsdom environment

### Component Interaction Tests

```bash
npm run play                       # Playwright UI explorer
npm run play -- --grep="button"    # Specific test
npm run play -- --debug            # Debug mode
```

Framework: **Playwright** with custom matchers

### Visual Regression Tests

```bash
npm run play -- --grep="visual"          # Run visual tests
npm run play -- --update-snapshots       # Update baselines
```

Snapshots are stored in `e2e/` directory and committed to git.

### All Tests

```bash
npm run test:ci    # Run unit + Playwright tests (CI mode)
```

## Code Quality

```bash
npm run lint       # Check all packages for issues
npm run format     # Auto-format code (fixes whitespace, line endings, etc.)
npm run spell      # Spell check with cspell
```

Always run these before pushing:

```bash
npm run lint && npm run format && npm run spell
```

## Versioning and Publishing

### Create a Changeset

Before opening a PR, create a changeset for user-facing changes:

```bash
npm run changeset
```

Follow the prompts to:

1. Select affected packages
2. Choose version bump (`patch`, `minor`, or `major`)
3. Write a clear summary

The changeset is committed to `.changeset/` and reviewed during PR.

### Publish (Maintainers Only)

```bash
npm run publish     # Publishes all packages with pending changesets
```

## Project Structure

For details on workspace layout, package purposes, and build architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Style and Best Practices

For code standards, naming conventions, and component patterns, see:

- [STYLE_GUIDE.md](STYLE_GUIDE.md) — Quick reference
- [ARCHITECTURE.md](ARCHITECTURE.md) — Component patterns and system design

## Common Tasks

### Add a New Component

See [CONTRIBUTING.md#adding-a-new-component](CONTRIBUTING.md#adding-a-new-component) for the full checklist.

### Update Design Tokens

Tokens are defined in `packages/tokens/src/` and compiled via Style Dictionary:

```bash
npm run tokens     # Rebuild token outputs
```

Tokens sync to `@baloise/ds-tokens` package and are imported by components.

### Update Global Styles

Global styles live in `packages/css/dist/css`:

```bash
npm run css        # Rebuild CSS
```

Outputs to `@baloise/ds-css` package.

### Create Storybook Stories

New components should have `.stories.ts` files in `docs/src/components/<component>/`:

```bash
npm run docs       # Start Storybook to preview stories
```

See existing stories for patterns and helpers.

## Troubleshooting

### Dependencies won't install

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm ci
```

### Dev server not updating

```bash
# Restart the dev server
npm start    # or npm run docs
```

### Build failures

Check for TypeScript errors:

```bash
npm run build -- --verbose
```

### Tests failing locally but passing in CI

Ensure your Node version matches the `engines` field in `package.json`:

```bash
node --version   # Should be >=24 <25
```

### Port already in use

Dev servers use ports 3333 (core) and 6006 (docs). If busy, either:

- Kill the process using the port
- Check `.storybook/main.ts` and `stencil.config.ts` for port config

## Environment Variables

Key environment variables used during development:

| Variable                | Purpose            | Values                  |
| ----------------------- | ------------------ | ----------------------- |
| `IS_DS_DEVELOPMENT`     | Enable dev mode    | `true`                  |
| `DS_TESTING`            | Unit test mode     | `true`                  |
| `DS_PLAYWRIGHT_TESTING` | E2E test mode      | `true`                  |
| `BAL_DOCUMENTATION`     | Doc site build     | `true`                  |
| `DS_RELEASE`            | Production release | `true`                  |
| `CI`                    | CI environment     | `true` (auto-set in CI) |

These are typically managed by npm scripts and `stencil.config.ts`.

## Further Reading

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — System design, component lifecycle, build system
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution workflow, PR process, testing requirements
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** — Code standards and naming conventions
- **[Security Policy](SECURITY.md)** — Security reporting and best practices

## Need Help?

- **Errors during setup?** Check the [troubleshooting section](#troubleshooting) above
- **Architecture and design?** See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Contributing guidelines?** See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Issues or discussions?** Open an issue on [GitHub](https://github.com/baloise/design-system)

Happy coding! 🚀
