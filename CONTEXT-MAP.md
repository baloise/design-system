# Context Map — Helvetia Design System

This file maps the multi-context layout of this monorepo. Each context has its own `CONTEXT.md` file describing the domain language, key concepts, and architectural patterns specific to that package.

## Contexts

| Context                | Path                             | Purpose                                                                                 |
| ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| **Repository**         | `CONTEXT.md`                     | Core principles, build system, CI/CD, release process, Turborepo configuration          |
| **Core Components**    | `packages/core/CONTEXT.md`       | Stencil web components, component architecture, lifecycle, testing patterns             |
| **Design Tokens**      | `packages/tokens/CONTEXT.md`     | Three-layer token architecture, Style Dictionary, Figma integration, naming conventions |
| **CSS & Styles**       | `packages/css/CONTEXT.md`        | Global CSS, utility classes, responsive design, theming, CSS variable conventions       |
| **Assets**             | `packages/assets/CONTEXT.md`     | Fonts, icons, images, asset management, brand guidelines                                |
| **Playwright**         | `packages/playwright/CONTEXT.md` | E2E testing library, page objects, accessibility testing, visual regression             |
| **Documentation**      | `docs/CONTEXT.md`                | Storybook setup, documentation patterns, MDX authoring, component showcase              |
| **Internal Libraries** | `libs/CONTEXT.md`                | ESLint plugin, output targets (Angular), shared utilities, code generation              |

## How to Use This Map

When working on a feature or bug fix:

1. Identify which package(s) you're modifying
2. Read the corresponding `CONTEXT.md` file(s) to understand domain language and patterns
3. Use the context to frame decisions about architecture, naming, and testing

For example:

- Adding a new component → read `packages/core/CONTEXT.md` for component patterns
- Adding a new token → read `packages/tokens/CONTEXT.md` for token naming and structure
- Writing tests → read `packages/playwright/CONTEXT.md` for testing patterns
