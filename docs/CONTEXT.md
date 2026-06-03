# CONTEXT — docs (Storybook Documentation)

This document captures domain language, architectural patterns, and key concepts specific to the documentation package.

## Overview

**docs** is the Storybook site that documents the design system. It includes:

- **Component stories** — Interactive examples for each component
- **MDX documentation** — Written guides with live component examples
- **Design token gallery** — Visual showcase of colors, spacing, typography
- **Usage guides** — Best practices and patterns for consumers
- **API references** — Component props, events, and methods

The site is built with **Storybook + Vite** and deployed to `design.baloise.dev`.

## Core Concepts

### Stories
A **story** is an isolated example of a component in a specific state. Stories are:

- **Interactive** — users can change props and see the component respond in real-time
- **Isolated** — each story is independent; no state leaks between stories
- **Documented** — each story has a title, description, and controls
- **Browseable** — organized in a sidebar for easy navigation

Story files use the **StoryFactory** utility for consistent structure:

```typescript
// tag.stories.ts
import { html } from 'lit'
import { StoryFactory } from '@storybook/html'

const story = new StoryFactory<TagStoryArgs>('ds-tag')

export default story.meta({
  title: 'Components/Tag',
  description: 'Removable tag component'
})

export const Default = story.story(({ label }) => html`
  <ds-tag label="${label}"></ds-tag>
`)
```

### MDX Documentation
MDX files (`.mdx`) combine Markdown text with live JSX code blocks:

```mdx
# Tag Component

The tag component is used to display removable labels.

<Canvas>
  <Story of={TagStories.Default} />
</Canvas>

## Usage

Tags can display in different states:

- **Default** — basic tag with label
- **Disabled** — non-interactive tag
- **Custom icon** — tag with custom icon
```

### Design Token Showcase
Components include a `<TokenOverview>` block that reads from the token JSON and renders:

- All CSS variables belonging to the component
- Their current values
- Links to the token definitions
- Instructions for overriding tokens

```mdx
## Design Tokens

<TokenOverview component="tag" />
```

This allows consumers to discover all themeable values for a component.

### Organization Structure
Documentation is organized by type:

```
docs/
  src/
    components/          # Component stories + MDX docs
      <component>/
        <component>.stories.ts      # Story definitions
        <component>.mdx             # MDX documentation
    patterns/            # Usage patterns and best practices
    guides/              # Written guides and tutorials
    tokens/              # Design token gallery
```

## Notable Patterns

### Story File Organization

Stories follow a consistent pattern:

1. **Meta** — Register the story with title, description, and default args
2. **Stories** — Define individual stories (Default, Disabled, Large, etc.)
3. **Args** — Type-safe prop definitions for StoryArgs
4. **Decorators** — Wrap stories with layout, background, or other context

### Canvas & Controls

Each story has:

- **Canvas** — The live interactive component
- **Controls** — Interactive prop inputs that update the component in real-time
- **Actions** — Event log showing events fired by the component
- **Accessibility** — Axe scan showing a11y violations (if any)

### Responsive Stories

Stories can show the component at multiple breakpoints:

```typescript
export const Responsive = story.story(({ label }) => html`
  <style>
    @media (max-width: 768px) {
      ds-tag { font-size: 0.875rem; }
    }
  </style>
  <ds-tag label="${label}"></ds-tag>
`)
```

## Key Constraints

- **Storybook HTML + Vite** — No React/Vue/Angular in stories (vanilla HTML/Lit)
- **Live components only** — Stories render actual components, not mocks
- **Comprehensive coverage** — Every public component must have at least one story
- **Accessibility tested** — All stories are Axe-scanned for accessibility issues
- **Mobile-first presentation** — Stories must render correctly 320px–2560px

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:
- [[packages/core|packages/core/CONTEXT.md]] — Components being documented
- [[packages/tokens|packages/tokens/CONTEXT.md]] — Token gallery and theming
- [[root|CONTEXT.md]] — Repository-level concepts
