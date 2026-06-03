---
name: ds-document-component
description: Auto-generates Storybook documentation for design system components. Reads component metadata, analyzes visual test files, and creates MDX documentation + interactive stories. Use when creating or updating component documentation.
---

# Document Component

Auto-generates Storybook documentation for Helvetia Design System components.

## Quick Start

Document a component and generate all documentation files:

```bash
ds-document-component button
```

Process:
1. Read component metadata from `components.json`
2. Detect component type (web-component-only, hybrid, or CSS-only)
3. Extract visual.html sections and show checklist
4. User selects which sections to document
5. Preview generation plan
6. Generate MDX files + stories + doc config

Output:
```
✅ Generated documentation for button

Created files:
  docs/src/components/button/
    ✓ 1-Overview.mdx
    ✓ 2-Usage.mdx
    ✓ 3-Variants.mdx
    ✓ 4-Styling.mdx
    ✓ 5-Accessibility.mdx
    ✓ 6-Testing.mdx
    ✓ button.stories.ts (9 stories: Basic, Shadow, Badge, Colors, Dashed, Inverted, Sizes, Flat, Rounded)
    ✓ button.doc-config.ts

  docs/src/components/button/button-group/
    ✓ 1-Overview.mdx
    ✓ 2-Usage.mdx
    ✓ 3-Variants.mdx
    ✓ 4-Styling.mdx
    ✓ 5-Accessibility.mdx
    ✓ 6-Testing.mdx
    ✓ button-group.stories.ts (4 stories)
    ✓ button-group.doc-config.ts
```

## How It Works

### 1. Component Detection

Reads `components.json` to find component metadata (props, events, slots). Checks file structure to determine architecture:
- Only `.host.scss` → **Web-component-only** (full stories + all 6 MDX files)
- Only `.style.scss` → **CSS-only** (no stories; a11y + styling MDX, others placeholder)
- Both files → **Hybrid** (minimal stories; a11y + styling MDX, others placeholder)

### 2. Visual Section Selection

Extracts all `<section data-testid="...">` from `packages/core/src/components/[component]/test/[component].visual.html`. Shows checklist:

```
## Visual Sections Found

Select which sections to document:
  ☑ Basic
  ☑ Shadow
  ☑ Badge
  ☐ Link
  ☑ Colors
  ☑ Dashed
  ☑ Inverted
  ☑ Sizes
  ☐ Wide
  ☐ Long Content
  ☑ Flat
  ☑ Rounded

Proceed? (y/n)
```

User checks/unchecks sections. Selected sections become story exports in `[component].stories.ts`.

### 3. Generation Preview

Shows what will be created before writing files:

```
## Generation Plan

### button (web-component-only)
  • Generate 6 MDX files
  • Generate stories.ts with 9 sections
  • Generate doc-config.ts

### button-group (web-component-only)
  • Generate 6 MDX files
  • Generate stories.ts with 4 sections
  • Generate doc-config.ts

Proceed? (y/n)
```

### 4. File Generation

Creates:

**MDX Files** (numbered 1-6):
- `1-Overview.mdx` — What is this component, when to use it
- `2-Usage.mdx` — How to use, basic props, events
- `3-Variants.mdx` — Visual variations from selected sections
- `4-Styling.mdx` — CSS variables, theming, customization
- `5-Accessibility.mdx` — WCAG compliance, keyboard nav, screen readers
- `6-Testing.mdx` — How to test, common assertions

**stories.ts**:
- One story export per selected visual section
- Story names with emoji prefixes: `🧩 ComponentVersion` and `🌍 HTMLVersion`
- Full prop controls from components.json
- Interactive Storybook UI

**doc-config.ts**:
- Component metadata (tag, name, description, category)
- Sub-component references

### 5. Sub-Components

Auto-detects subdirectories with `.tsx` files. Each sub-component gets its own documentation directory:

```
docs/src/components/button/
├── 1-Overview.mdx
├── ... (5 more MDX)
├── button.stories.ts
├── button.doc-config.ts
└── button-group/          ← Sub-component, auto-detected
    ├── 1-Overview.mdx
    ├── ... (5 more MDX)
    ├── button-group.stories.ts
    └── button-group.doc-config.ts
```

---

## MDX Content

Files are generated with AI-written content sourced from:

- **components.json** — Props, events, slots, methods
- **JSDoc comments** — Component description, prop docs, examples
- **visual.html sections** — Visual variations and their names

**For web-component-only:** All 6 MDX files have full content  
**For hybrid/CSS-only:** Files 4-5 (Styling, Accessibility) have full content; others are placeholders

---

## Stories Structure

Example generated `button.stories.ts`:

```typescript
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsButton & { slot: string }

const tag = 'ds-button'

const meta: Meta<Args> = {
  title: 'Components/Button/Variants',
  args: { slot: 'Button' },
  argTypes: {
    ...withComponentControls({ tag }),
  },
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ slot, ...args }) => `<ds-button ${props(args)}>${slot}</ds-button>`),
})
Basic.storyName = '🧩 Basic'

export const Shadow = Story({
  ...withRender(({ slot, ...args }) => `<ds-button icon="plus" shadow ${props(args)}>${slot}</ds-button>`),
})
Shadow.storyName = '🧩 Shadow'

// ... more stories from selected sections
```

---

## Examples

### Example 1: Web-Component-Only

```bash
ds-document-component button
```

Component type: **web-component-only** (has .host.scss only)

Generate:
- 6 full MDX files with rich content
- stories.ts with all selected sections as interactive stories
- Sub-component (button-group) documentation

### Example 2: CSS-Only Component

```bash
ds-document-component label
```

Component type: **CSS-only** (has .style.scss only)

Generate:
- 6 MDX files:
  - 1-Overview, 2-Usage, 3-Variants, 6-Testing → Placeholders ("Not applicable for CSS-only")
  - 4-Styling, 5-Accessibility → Full content
- No stories.ts (CSS-only has no interactive component)

### Example 3: Hybrid Component

```bash
ds-document-component accordion
```

Component type: **hybrid** (has both .host.scss and .style.scss)

Generate:
- 6 MDX files (same as CSS-only: a11y + styling full, others placeholder)
- Minimal stories.ts (no full prop controls)

---

## What Gets Generated

✅ Component metadata extraction from components.json  
✅ Intelligent component type detection  
✅ Visual.html section parsing with user selection  
✅ Interactive checklist for sections  
✅ Generation preview before file write  
✅ 6 numbered MDX files with AI-written content  
✅ TypeScript story files with Storybook controls  
✅ Component doc-config.ts with metadata  
✅ Automatic sub-component detection & documentation  
✅ Separate documentation per sub-component  

❌ Git operations (just creates files, user commits)  
❌ npm commands (user runs `npm run docs` to preview)  
❌ Figma sync (Figma metadata handled separately)  

---

## Related

See [REFERENCE.md](REFERENCE.md) for technical details on MDX content templates, story generation rules, and sub-component detection.
