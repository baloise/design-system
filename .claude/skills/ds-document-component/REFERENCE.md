# ds-document-component Reference

Detailed technical documentation for automated component documentation generation.

---

## Component Type Detection

### Algorithm

```javascript
function detectComponentType(componentName) {
  const componentPath = `packages/core/src/components/${componentName}`
  
  const hasHostScss = fs.existsSync(`${componentPath}/${componentName}.host.scss`)
  const hasStyleScss = fs.existsSync(`${componentPath}/${componentName}.style.scss`)
  
  if (hasHostScss && !hasStyleScss) return 'web-component-only'
  if (!hasHostScss && hasStyleScss) return 'css-only'
  if (hasHostScss && hasStyleScss) return 'hybrid'
  
  throw new Error(`Cannot determine component type for ${componentName}`)
}
```

### Type Rules

| Type | .host.scss | .style.scss | Stories | MDX |
|------|:----------:|:-----------:|---------|-----|
| Web-component-only | ✓ | ✗ | Full with controls | All 6 files, full content |
| Hybrid | ✓ | ✓ | Minimal (no controls) | 1,2,3,6 = placeholder; 4,5 = full |
| CSS-only | ✗ | ✓ | None | 1,2,3,6 = placeholder; 4,5 = full |

---

## Visual.html Section Extraction

### Pattern

```html
<section data-testid="basic">
  <span>Basic</span>
  <ds-button> Button </ds-button>
</section>
```

### Algorithm

1. Read `packages/core/src/components/[component]/test/[component].visual.html`
2. Parse HTML using regex or DOM parser
3. Extract all `<section data-testid="...">` elements
4. For each section:
   - Extract `data-testid` value as section name (e.g., "basic")
   - Extract inner HTML (everything between `<span>` and `</section>`)
   - Store as `{ name: "basic", html: "..." }`
5. Present checklist with section names

### Section Naming Rules

- Section name comes from `data-testid` attribute
- Display name: capitalize first letter (e.g., "basic" → "Basic")
- Story export name: same (e.g., `export const Basic = ...`)
- Story display name: add emoji prefix (e.g., `Basic.storyName = '🧩 Basic'`)

---

## Checklist Presentation

### User Interaction

```
## Visual Sections Found

Select which sections to document:
  ☑ Basic          (checked by default)
  ☑ Shadow         (checked by default)
  ☑ Badge          (checked by default)
  ☐ Link           (checked or unchecked?)
  ☑ Colors         (checked by default)
  ☑ Dashed         (checked by default)
  ☑ Inverted       (checked by default)
  ☑ Sizes          (checked by default)
  ☐ Wide           (checked or unchecked?)
  ☐ Long Content   (checked or unchecked?)
  ☑ Flat           (checked by default)
  ☑ Rounded        (checked by default)

Proceed? (y/n)
```

### Default Selection

All sections are checked by default (to document all variants). User can uncheck ones they don't want.

### Input Method

For CLI/Node implementation:
- Use `inquirer` or `prompts` npm package
- Checkboxes with arrow keys and spacebar
- Clear terminal output after confirmation

---

## Story File Generation

### Structure

```typescript
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender, props, cssClasses } from '../../utils'

type Args = JSX.DsButton & { slot: string }

const tag = 'ds-button'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Button/Variants',
  args: {
    slot: 'Button',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-button ${props(args)}>${slot}</ds-button>`),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ slot, ...args }) => `<ds-button ${props(args)}>${slot}</ds-button>`),
})
Basic.storyName = '🧩 Basic'

// Repeat for each selected section
```

### Per-Section Story Generation

For each selected visual.html section:

1. **Extract HTML:** Get the cleaned HTML from visual.html section
2. **Create story export:** 
   ```typescript
   export const [SectionName] = Story({
     ...withRender(({ slot, ...args }) => `[CLEANED_HTML_FROM_SECTION]`),
   })
   [SectionName].storyName = '🧩 [SectionName]'
   ```
3. **Add emoji prefix:** Always `🧩` for web-component-only, `🌍` for HTML examples (if applicable)

### HTML Cleaning Rules

When extracting HTML from visual.html sections:
- Remove `data-testid` attributes
- Remove `<span>Title</span>` header (metadata only, not visual)
- Remove test-only attributes or classes
- Keep structural HTML and component tags intact
- Trim whitespace

---

## MDX File Generation

### Template Structure

#### 1-Overview.mdx

```markdown
# Button

A clickable element with customizable styling and behavior.

## When to Use

- For primary actions (submit, confirm)
- For secondary actions (cancel, skip)
- For navigation links (use color="link")
- For grouped related actions (use ds-button-group)

## Quick Example

\`\`\`html
<ds-button color="primary">Click me</ds-button>
\`\`\`

## Components

- **ds-button** — Main button element
- **ds-button-group** — Container for grouped buttons
```

Sources:
- JSDoc comments from button.tsx
- components.json description
- Component name and category

#### 2-Usage.mdx

```markdown
# Usage

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "primary" | Button color variant |
| size | string | "md" | Button size |
| disabled | boolean | false | Disable the button |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| dsButtonClick | undefined | Emitted when button is clicked |

## Slots

| Slot | Description |
|------|-------------|
| default | Button content |

## Basic Example

\`\`\`html
<ds-button color="primary" @dsButtonClick="handleClick">
  Click me
</ds-button>
\`\`\`
```

Sources:
- components.json props, events, slots
- JSDoc comments from .tsx

#### 3-Variants.mdx

```markdown
# Variants

Explore different button configurations and states.

See the **Stories** tab for interactive examples:
- **Basic** — Default button style
- **Shadow** — Button with shadow effect
- **Colors** — All color variants
- **Sizes** — Size variations
- **Inverted** — Inverted colors for dark backgrounds
```

Sources:
- Selected visual.html section names
- Inferred from component props (size, color, etc.)

#### 4-Styling.mdx

```markdown
# Styling

## CSS Variables

The button component exposes these CSS variables:

\`\`\`css
--ds-button-font-family
--ds-button-font-size
--ds-button-color-primary-base-text
\`\`\`

Customize via:

\`\`\`css
ds-button {
  --ds-button-color-primary-base-text: #ff0000;
}
\`\`\`

## Color Variants

- `color="primary"` — Primary action
- `color="secondary"` — Secondary action
- `color="tertiary"` — Tertiary action
- `color="link"` — Link-style button

## Size Variants

- `size="sm"` — Small (dense)
- `size="md"` — Medium (default)
- `size="lg"` — Large
- `size="xl"` — Extra large
```

Sources:
- components.json props (especially enums like color, size)
- CSS variable definitions from component SCSS
- Design token references

#### 5-Accessibility.mdx

```markdown
# Accessibility

## WCAG 2.2 AA Compliance

This component meets WCAG 2.2 Level AA standards:

- ✓ Sufficient color contrast (4.5:1 ratio)
- ✓ Keyboard accessible (Tab, Enter, Space)
- ✓ Screen reader announcements
- ✓ Focus indicators visible

## Keyboard Navigation

| Key | Behavior |
|-----|----------|
| Tab | Focus button |
| Shift+Tab | Unfocus to previous element |
| Enter / Space | Activate button |

## Screen Reader Support

The button announces:
- Button label (visible text)
- State (disabled, if applicable)
- Icon alternative text (if present)

## Best Practices

- Always provide descriptive button text
- Use semantic HTML (`<button>` or `<a href="">`)
- Ensure sufficient color contrast
- Provide focus indicators
- Don't rely on color alone to convey meaning
```

Sources:
- Component structure (semantic HTML)
- WCAG 2.2 AA guidelines
- Component props (disabled state, etc.)

#### 6-Testing.mdx

```markdown
# Testing

## Visual Tests

See `packages/core/src/components/button/test/button.visual.html` for all visual states.

Run Playwright visual tests:

\`\`\`bash
npm run play -- --grep="button"
\`\`\`

## A11y Tests

Automated accessibility checks via axe-core:

```bash
npm run play -- --grep="button a11y"
\`\`\`

## Unit Tests

Test component behavior and props:

\`\`\`bash
npm test -- button
\`\`\`

## Common Test Cases

- [ ] Button renders with label
- [ ] Click event fires on click
- [ ] Disabled button doesn't emit click
- [ ] All color variants render correctly
- [ ] All size variants render correctly
```

Sources:
- Test file locations (visual.html, .play.ts files)
- Component props that need testing

#### For CSS-Only/Hybrid (1, 2, 3, 6 as Placeholder)

```markdown
# Overview

> **Note:** This is a CSS-only component. 
> 
> CSS-only components don't have interactive JavaScript behavior. 
> For styling guidance, see [Styling](./4-Styling.mdx). 
> For accessibility requirements, see [Accessibility](./5-Accessibility.mdx).

[Basic description from JSDoc]
```

---

## Sub-Component Detection

### Algorithm

```javascript
function detectSubComponents(componentName) {
  const componentPath = `packages/core/src/components/${componentName}`
  const entries = fs.readdirSync(componentPath)
  
  const subcomponents = entries.filter(entry => {
    const entryPath = path.join(componentPath, entry)
    const isDir = fs.statSync(entryPath).isDirectory()
    const hasTsx = fs.existsSync(path.join(entryPath, `${entry}.tsx`))
    return isDir && hasTsx
  })
  
  return subcomponents
}
```

Example: `button` → finds `button-group`

### Directory Structure

After generation:

```
docs/src/components/button/
├── 1-Overview.mdx
├── 2-Usage.mdx
├── 3-Variants.mdx
├── 4-Styling.mdx
├── 5-Accessibility.mdx
├── 6-Testing.mdx
├── button.stories.ts
├── button.doc-config.ts
└── button-group/
    ├── 1-Overview.mdx
    ├── 2-Usage.mdx
    ├── 3-Variants.mdx
    ├── 4-Styling.mdx
    ├── 5-Accessibility.mdx
    ├── 6-Testing.mdx
    ├── button-group.stories.ts
    └── button-group.doc-config.ts
```

### Visual.html for Sub-Components

For each sub-component:
1. Check if `[component]/[subcomponent]/test/[subcomponent].visual.html` exists
2. If yes: Parse sections and show checklist
3. If no: Show message "No visual.html found for [subcomponent]" and skip section selection

---

## doc-config.ts Generation

### Structure

```typescript
export interface DocConfig {
  tag: string
  name: string
  description: string
  since?: string
  category?: string
  subcomponents?: string[]
}

const config: DocConfig = {
  tag: 'ds-button',
  name: 'Button',
  description: 'A clickable element with customizable styling and behavior.',
  since: '1.0.0',
  category: 'Form',
  subcomponents: ['ds-button-group'],
}

export default config
```

### Data Sources

- `tag` — From components.json
- `name` — From components.json or humanized component name
- `description` — From components.json or JSDoc
- `category` — Inferred from component metadata or JSDoc
- `subcomponents` — Auto-detected sub-components

---

## Content Generation Sources

### Priority Order

For each piece of content, sources are checked in this order:

1. **JSDoc comments** from `.tsx` file (most authoritative)
2. **components.json** metadata (auto-generated from Stencil)
3. **Component structure** (inferred from props/events/slots)
4. **AI generation** (when source info is insufficient)

### JSDoc Parsing

Extract from button.tsx:

```typescript
/**
 * A clickable element with customizable styling and behavior.
 * 
 * @slot default - Button content
 * @part base - The button element
 * @part icon - The icon element (if present)
 */
@Component({
  tag: 'ds-button',
  ...
})
export class Button {
  /**
   * Button color variant.
   * @default "primary"
   */
  @Prop() color: ButtonColor = 'primary'

  /**
   * Emitted when button is clicked.
   */
  @Event() dsButtonClick: EventEmitter<void>
}
```

Extract:
- Class JSDoc for component description
- Property JSDoc for prop descriptions
- Event JSDoc for event descriptions
- Slot JSDoc for slot descriptions

---

## File Writing

### Output Locations

All files written to `docs/src/components/[component]/`:

- `1-Overview.mdx`
- `2-Usage.mdx`
- `3-Variants.mdx`
- `4-Styling.mdx`
- `5-Accessibility.mdx`
- `6-Testing.mdx`
- `[component].stories.ts`
- `[component].doc-config.ts`

For sub-components, files go to `docs/src/components/[component]/[subcomponent]/`.

### Error Handling

- If directory doesn't exist: Create it
- If file already exists: Ask user (overwrite? skip?)
- If visual.html not found: Show warning and skip section selection

---

## Implementation Notes

### Dependencies

- `fs` / `fs-extra` — File I/O
- `glob` — File pattern matching
- `inquirer` or `prompts` — Interactive CLI (checklist)
- No DOM parsing library needed (regex sufficient for simple HTML extraction)

### Assumptions

- Component exists in `packages/core/src/components/[component]/`
- Visual HTML file exists at `[component]/test/[component].visual.html`
- `components.json` is up-to-date (generated during build)
- MDX files can be overwritten (or user chooses)

### Performance

- Component detection: < 100ms
- Visual.html parsing: < 50ms per file
- Checklist UI: Interactive (user-driven)
- File writing: Batch write all files at once

