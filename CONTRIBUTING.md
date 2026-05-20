# 📖 Contributing to Helvetia Design System

Thank you for your interest in contributing! This document covers the contribution workflow — git, PRs, and community guidelines.

For setup, architecture, and code standards, see the dedicated documentation files linked at the bottom.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Git Workflow](#git-workflow)
- [Reporting Issues](#reporting-issues)
- [Fixing a Bug](#fixing-a-bug)
- [Creating a Feature](#creating-a-feature)
- [Adding a New Component](#adding-a-new-component)
- [Adding Icons](#adding-icons)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Security](#security)
- [Further Reading](#further-reading)
- [License](#license)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- **Node.js**: >=24 <25
- **npm**: >=11.0.0

### Setup

```bash
git clone https://github.com/baloise/design-system.git
cd design-system
npm ci
```

For full setup instructions, troubleshooting, and dev server details, see [DEVELOPMENT.md](DEVELOPMENT.md).

## Git Workflow

### Branch Naming

Use descriptive prefixes for branch names:

- `feat/<name>` — new features or components
- `fix/<name>` — bug fixes
- `chore/<name>` — maintenance tasks
- `docs/<name>` — documentation updates

### Commit Messages

Write clear, descriptive commit messages:

```
feat: add button component with primary and secondary variants
fix: resolve focus state contrast issue on tag component
docs: update contribution guidelines
```

### Creating a Pull Request

1. **Create a changeset** if your changes affect end users:

   ```bash
   npm run changeset
   ```

   - `patch` — bug fixes, non-breaking style tweaks
   - `minor` — new features, new components
   - `major` — breaking changes (prop renames, removed elements, behavior changes)

   See [ARCHITECTURE.md — Changesets and Versioning](ARCHITECTURE.md#release-and-versioning) for how changesets flow into the release pipeline.

2. **Open a PR against the `next` branch**
   - Include a descriptive title
   - Reference related issues if applicable
   - Ensure all checks pass (`npm run lint && npm run format`)

3. **Address review feedback** before merging

### Bot Commands

Post these as a PR comment to trigger automation:

| Command               | Effect                                                                                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/update-screenshots` | Regenerates visual regression snapshots and commits them to your branch. Use after intentional visual changes.                                                                                      |
| `/snapshot`           | Publishes a snapshot npm version from your branch so you can test it in a real project before merging. See [Snapshot Versions](ARCHITECTURE.md#snapshot-versions-testing-before-merge) for details. |
| `/cib`                | Post on an **issue** to auto-create a correctly named branch for it.                                                                                                                                |

## Reporting Issues

Start any contribution (bug fix or feature) by creating a GitHub issue:

1. Go to [github.com/baloise/design-system/issues](https://github.com/baloise/design-system/issues)
2. Click **New Issue**
3. Choose **Bug Report** or **Feature Request**
4. Provide a clear title and description
5. Add labels and assign to a milestone if applicable

Once the issue is created, use the `/cib` command in a comment on that issue to auto-generate a branch:

```
/cib
```

This creates a properly named branch (e.g., `feat/button-hover-state`) and opens a PR automatically.

## Fixing a Bug

1. **Create an issue** describing the bug (see [Reporting Issues](#reporting-issues))
2. **Create a branch** via the `/cib` comment on the issue
3. **Write a failing test** that reproduces the bug:
   - Add a test case in the component's test file
   - Verify it fails with the current code
4. **Fix the bug** to make the test pass
5. **Add a changeset**:

   ```bash
   npm run changeset
   ```

   - Choose `patch` for this bug fix

6. **Finalize your PR**:
   - Ensure all checks pass: `npm run lint && npm run format && npm test`
   - Get approval from a core team member
   - Merge to `next`

## Creating a Feature

1. **Create an issue** describing the feature (see [Reporting Issues](#reporting-issues))
2. **Create a branch** via the `/cib` comment on the issue
3. **Implement the feature** following [STYLE_GUIDE.md](STYLE_GUIDE.md)
4. **Add visual tests**:
   - Identify which parts of the UI your feature affects
   - Create or update visual regression tests in the component's `.visual.play.ts` file
   - These automated screenshots verify the feature looks correct
5. **Add component tests**:
   - Write tests covering all critical functionality
   - Include both positive scenarios (expected use) and negative scenarios (edge cases, error handling)
   - Use Page Objects for component interactions
   - See [ARCHITECTURE.md — Testing Strategy](ARCHITECTURE.md#testing-strategy) for patterns
6. **Add a changeset**:

   ```bash
   npm run changeset
   ```

   - Choose `minor` for new features or `major` for breaking changes

7. **Finalize your PR**:
   - Ensure all checks pass: `npm run lint && npm run format && npm test`
   - Get approval from a core team member
   - Merge to `next`

## Adding a New Component

See [ARCHITECTURE.md — New Component Checklist](ARCHITECTURE.md#new-component-checklist) for the full step-by-step checklist.

Key requirements:

- Use `ds-` prefix and Shadow DOM
- Implement `ComponentInterface` and `Loggable`
- Write unit, interaction, visual, and accessibility tests
- Add Storybook documentation

## Adding Icons

Icons are stored in two packages depending on their source and usage:

### UI Icons

**Source:** [Streamline Icons](https://www.streamlinehq.com/icons/core-solid) (16×16 SVG)

**Location:** `packages/icons/src/assets`

### Brand Icons

**Source:** [Baloise Brand Portal](https://brand.baloise.com/) (all colors, all sizes)

**Location:** `packages/brand-icons/src/assets`

### Adding a New Icon

1. Download the icon(s) from the appropriate source
2. Place the SVG file(s) in the correct `src/assets` directory
3. Optimize SVG files for web:

   ```bash
   npm run optimize
   ```

4. Create a changeset documenting the icon addition:

   ```bash
   npm run changeset
   ```

5. Open a PR with a descriptive title (e.g., `feat: add copy and download UI icons`)

## Code Standards

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for naming conventions, prop patterns, CSS variable cascade, and what to avoid.

Run these before every PR:

```bash
npm run lint      # Check for violations
npm run format    # Auto-fix formatting
npm run spell     # Spell check
```

## Testing

See [ARCHITECTURE.md — Testing Strategy](ARCHITECTURE.md#testing-strategy) for required test types, Page Object patterns, and test file locations.

```bash
npm test                         # Unit tests
npm run play                     # Playwright UI explorer
npm run play -- --grep="<name>"  # Single test
```

## Security

Please review our [Security Policy](SECURITY.md) before reporting vulnerabilities. Do not open public issues for security bugs — use the private advisory process described there.

## Further Reading

- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Setup, dev servers, building, testing commands
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Workspace structure, component patterns, CSS variables, testing strategy
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** — Code standards and naming conventions
- **[SECURITY.md](SECURITY.md)** — Security policy and vulnerability reporting
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Community standards

## License

By contributing, you agree that your contributions will be licensed under the same license as this project.
