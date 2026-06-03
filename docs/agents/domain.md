# Domain Docs Layout

This file describes how domain knowledge is organized and consumed by agent skills.

## Overview

The Helvetia Design System is a **multi-context monorepo**. This means:

- Each major package has its own `CONTEXT.md` file
- Each `CONTEXT.md` documents the domain language, key concepts, and architectural patterns specific to that package
- A `CONTEXT-MAP.md` file at the root maps all contexts

## What Goes in CONTEXT.md?

Each `CONTEXT.md` should document:

### 1. **Domain Language**
- Key terms and concepts specific to that package
- What they mean and how they relate to each other
- Examples of correct usage

**Example from packages/tokens/CONTEXT.md:**
> "A **token** is a named design value (color, spacing, font size, etc.) that can be referenced throughout the system. Tokens are organized in three layers: Global (raw values), Alias (consumer-facing abstractions), and Component (per-component overrides)."

### 2. **Architectural Patterns**
- Key decisions and constraints specific to the package
- How this package interacts with others
- Dependencies and assumptions

**Example from packages/core/CONTEXT.md:**
> "Components are authored as Stencil.js web components in the Shadow DOM. They output to three targets: Web Components, Angular bindings, and React bindings. The component lifecycle flows through Stencil's authoring → build → binding generation steps."

### 3. **Notable Conventions**
- Naming conventions unique to this package
- File structure patterns
- Code organization rules

**Example from packages/css/CONTEXT.md:**
> "CSS utility classes follow a `.<property>-<value>` pattern (e.g., `.bg-primary`, `.text-lg`). All utilities are generated from design tokens and follow a consistent responsive design breakpoint system."

## How Agents Use These Files

Skills like `improve-codebase-architecture`, `diagnose`, and `tdd` read `CONTEXT.md` files to:

- Understand the domain so they can frame decisions correctly
- Avoid suggesting solutions that violate package-specific constraints
- Use the correct terminology when discussing architecture
- Know which files and patterns to look for when investigating issues

For example:
- `tdd` skill reads `packages/core/CONTEXT.md` to understand component lifecycle before writing tests
- `diagnose` skill reads `packages/tokens/CONTEXT.md` to understand token structure when debugging a token-related bug
- `improve-codebase-architecture` reads multiple `CONTEXT.md` files to understand how packages interact

## Structure

Each `CONTEXT.md` should be concise (500–1000 words) and focus on:

- ✅ Domain language (nouns, key concepts)
- ✅ Architectural patterns (how things work together)
- ✅ Notable conventions (naming, file structure, constraints)
- ❌ Don't repeat content from ARCHITECTURE.md, STYLE_GUIDE.md, or DEVELOPMENT.md
- ❌ Don't document individual APIs or functions (that's what code and comments are for)

## Contexts in This Repository

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for the full list of contexts and which package each covers.

## Maintaining Domain Docs

- **Keep them current** — Update `CONTEXT.md` when architectural decisions change
- **Collaborate with agents** — Use the `grill-with-docs` skill to refine terminology and decisions as the codebase evolves
- **Link related concepts** — Use `[[context-name]]` to reference other contexts in the monorepo
- **Example-driven** — Include short, concrete examples of correct patterns and terminology
