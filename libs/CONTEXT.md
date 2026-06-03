# CONTEXT — libs (Internal Libraries & Tools)

This document captures domain language, architectural patterns, and key concepts specific to the internal libraries.

## Overview

**libs** contains internal utilities, build tools, and code generation infrastructure:

- **output-target-angular** — Generates Angular component bindings from Stencil components
- **output-target-web** — Generates Web Component output target for Stencil
- **eslint-plugin** — Custom ESLint rules and config for the design system
- **Additional utilities** — Shared helpers, types, and build scripts

These libraries support the design system's build process and are not published to npm for external use.

## Core Concepts

### Output Target Pattern
An **output target** is a Stencil compiler plugin that transforms the built components into a different format.

Each output target:

1. **Consumes** the compiled web components from `packages/core/dist/`
2. **Transforms** them into a framework-specific binding
3. **Generates** new files (e.g., Angular component wrappers, React hooks)
4. **Outputs** to the target format's dist folder

### Output Targets in This System

#### Web Component Output Target (`output-target-web`)
- **Purpose:** Generate standard Web Components
- **Output:** Custom elements that work in any HTML/framework
- **Consumed by:** Vanilla JS, frameworks, any web environment

#### Angular Output Target (`output-target-angular`)
- **Purpose:** Generate Angular component wrappers for Stencil components
- **Pattern:** Each Stencil component gets an Angular wrapper component
- **Output:** Angular components that accept inputs, emit outputs, expose methods
- **Consumed by:** Angular applications using the design system

**Example binding flow:**
```
Stencil component: <ds-button [label]="label" (dsClick)="onClick()"></ds-button>
        ↓
Compiled to web component: <ds-button></ds-button>
        ↓
Angular binding: <balButton [label]="label" (dsClick)="onClick()"></balButton>
```

### ESLint Plugin

The custom ESLint plugin provides:

- **Design system rules** — Enforce component and code patterns specific to DS
- **Shared config** — Consistent linting rules across all packages
- **Auto-fix capability** — Some rules can automatically correct violations

Rules enforce:
- Naming conventions (component names, event names, prop names)
- Component structure (required interfaces, lifecycle hooks)
- Import patterns (no circular dependencies, proper workspace imports)
- Test requirements (all components need tests)

## Notable Patterns

### Generation Scripts

Output targets use generation scripts to:

1. **Parse** the component metadata (props, events, methods)
2. **Template** generate wrapper code
3. **Write** output files

Generation is idempotent — running multiple times produces the same output.

### Configuration

Output targets are registered in `packages/core/stencil.config.ts`:

```typescript
export const config: Config = {
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@baloise/ds-core',
      outputType: 'component',
      directivesProxyFile: '../angular/src/directives/proxies.ts'
    }),
    webOutputTarget(),
    // ... other targets
  ]
}
```

### File Organization

Each library in `libs/` follows this pattern:

```
libs/<library>/
  src/
    index.ts            # Public exports
    lib/                # Implementation
  README.md             # Library documentation
  package.json          # Package metadata
```

## Key Constraints

- **Not published to npm** — Internal use only; versioning doesn't follow semver
- **Dependent on Stencil** — Output targets are tightly coupled to Stencil's architecture
- **Generative code** — Output target code is auto-generated; don't manually edit generated files
- **Workspace coordination** — Changes to component structure (props, events) may require updates to output targets
- **Build order matters** — Output targets run after Stencil compilation; they're part of the build pipeline

## Maintenance Notes

### When to Update Output Targets

- Component adds/removes/renames `@Prop()` or `@Event()`
- Stencil version is upgraded
- Angular or React binding strategy needs to change

### Regeneration

After modifying an output target, rebuild the system:

```bash
npm run build
```

This runs Stencil compiler, which invokes all registered output targets.

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:
- [[packages/core|packages/core/CONTEXT.md]] — Components providing metadata for binding generation
- [[root|CONTEXT.md]] — Repository-level concepts
