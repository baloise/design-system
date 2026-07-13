<a href="https://design.baloise.dev" target="blank">
    <img src="https://raw.githubusercontent.com/baloise/design-system/next/docs/src/assets/images/banner.svg?sanitize=true" alt="Helvetia Design System" />
</a>

<p>
  <a href="https://github.com/baloise/design-system/actions/workflows/continuous.yml">
    <img src="https://github.com/baloise/design-system/actions/workflows/continuous.yml/badge.svg?branch=next" alt="Continuous" />
  </a>
  <a href="https://github.com/baloise/design-system/actions/workflows/security.yml">
    <img src="https://github.com/baloise/design-system/actions/workflows/security.yml/badge.svg?branch=next" alt="Security" />
  </a>
  <a href="https://www.npmjs.com/package/@baloise/ds-core">
    <img src="https://img.shields.io/npm/v/@baloise/ds-core" alt="NPM" />
  </a>
  <a href="https://www.npmjs.com/package/@baloise/ds-core">
    <img src="https://img.shields.io/bundlephobia/min/@baloise/ds-core" alt="Bundle Size" />
  </a>
  <a href="https://github.com/baloise/design-system/blob/next/LICENSE">
    <img src="https://img.shields.io/github/license/baloise/design-system" alt="License" />
  </a>
</p>

Built with accessibility and simplicity in mind, the Helvetia Design System provides UI components and a clearly defined visual style for building web applications.

## Core Principles

- **Accessibility** — WCAG 2.2 AA compliant, keyboard navigation, screen reader support
- **Simplicity** — HTML → CSS → JavaScript approach, minimal complexity
- **Responsiveness** — Works seamlessly from 320px to 2560px viewports
- **Standards Compliance** — W3C best practices, modern web standards
- **Compatibility** — Browser support verified via webstatus.dev and caniuse.com
- **Inclusion** — Designed for diverse abilities and technologies

## Installation

Install the core design system package via npm:

```bash
npm install @baloise/ds-core
```

Then import the CSS and component loader in your application:

```html
<link rel="stylesheet" href="node_modules/@baloise/ds-css/dist/css/design-system.css" />
<script type="module" src="node_modules/@baloise/ds-core/dist/design-system/design-system.esm.js"></script>
```

For framework-specific integrations, see the [Quick Start guide](https://design.baloise.dev/?path=/docs/development-getting-started--documentation).

## Quick Start

Use any design system component in your HTML:

```html
<ds-button>Click me</ds-button>
<ds-card>
  <ds-heading level="2">Welcome</ds-heading>
  <p>Start building with the Helvetia Design System</p>
</ds-card>
```

Explore all available components, design tokens, and examples in the [component library](https://design.baloise.dev).

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](https://github.com/baloise/design-system/blob/next/CONTRIBUTING.md) guide to learn about:

- Reporting bugs and requesting features
- Development setup and workflow
- Creating new components
- Testing and code quality standards
- Semantic versioning and changesets

Follow our [Code of Conduct](https://github.com/baloise/design-system/blob/next/CODE_OF_CONDUCT.md) for all interactions.

## Learn More

- **[Documentation](https://design.baloise.dev)** — Component library, design tokens, and interactive examples in Storybook
- **[Quick Start](https://design.baloise.dev/?path=/docs/development-getting-started--documentation)** — Get started with the design system in your project
- **[CHANGELOG.md](https://github.com/baloise/design-system/blob/next/CHANGELOG.md)** — Release notes, version history, and changes for each version
- **[ARCHITECTURE.md](https://github.com/baloise/design-system/blob/next/ARCHITECTURE.md)** — System design, workspace structure, component lifecycle, web components patterns, CSS variables, testing strategy
- **[DEVELOPMENT.md](https://github.com/baloise/design-system/blob/next/DEVELOPMENT.md)** — Local setup, dev servers, building, testing, troubleshooting
- **[CONTRIBUTING.md](https://github.com/baloise/design-system/blob/next/CONTRIBUTING.md)** — Contribution workflow, PR process, component checklist, accessibility requirements
- **[STYLE_GUIDE.md](https://github.com/baloise/design-system/blob/next/STYLE_GUIDE.md)** — Code standards, naming conventions, best practices
- **[SECURITY.md](https://github.com/baloise/design-system/blob/next/SECURITY.md)** — Security policy, vulnerability reporting, and compliance guidelines
- **[CODE_OF_CONDUCT.md](https://github.com/baloise/design-system/blob/next/CODE_OF_CONDUCT.md)** — Community standards and expectations

## License

This project is licensed under the Apache License 2.0. See [LICENSE](https://github.com/baloise/design-system/blob/next/LICENSE) for details.
