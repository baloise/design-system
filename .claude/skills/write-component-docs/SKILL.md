---
name: write-component-docs
description: Use when writing or generating Storybook documentation for a Baloise Design System component — creates stories.ts and .mdx from visual HTML sections
---

# Write Component Docs

Generates exactly **one** `<component>.stories.ts` and **one** `<component>.mdx` per component in `docs/src/components/<component>/`. All selected stories are exports inside the single stories file; all Canvas blocks are sections inside the single MDX file.

## Process

```dot
digraph docs {
  "Read visual.html sections" [shape=box];
  "style.html exists?" [shape=diamond];
  "Read style.html sections" [shape=box];
  "Present checkbox list to user" [shape=box];
  "User selects stories" [shape=box];
  "style.html has matching sections?" [shape=diamond];
  "Generate stories: HTML + WebComponent variants" [shape=box];
  "Generate stories: WebComponent only" [shape=box];
  "Write stories.ts + .mdx" [shape=box];

  "Read visual.html sections" -> "style.html exists?";
  "style.html exists?" -> "Read style.html sections" [label="yes"];
  "style.html exists?" -> "Present checkbox list to user" [label="no"];
  "Read style.html sections" -> "Present checkbox list to user";
  "Present checkbox list to user" -> "User selects stories";
  "User selects stories" -> "style.html has matching sections?" [label="for each"];
  "style.html has matching sections?" -> "Generate stories: HTML + WebComponent variants" [label="yes"];
  "style.html has matching sections?" -> "Generate stories: WebComponent only" [label="no"];
  "Generate stories: HTML + WebComponent variants" -> "Write stories.ts + .mdx";
  "Generate stories: WebComponent only" -> "Write stories.ts + .mdx";
}
```

## Step 1 — Read HTML sections

Parse `data-testid` attributes from `<section>` elements in:

- `packages/core/src/components/<component>/test/<component>.visual.html` — web component markup
- `packages/core/src/components/<component>/test/<component>.style.html` — CSS-only HTML (if exists)

## Step 2 — Present checkbox list

Show ALL sections from `visual.html` as a numbered checkbox list:

```
Which sections should become stories?

[ ] 1. basic
[ ] 2. disabled
[ ] 3. invalid
[ ] 4. colors
...

(enter numbers separated by commas, or "all")
```

Wait for user selection before proceeding.

## Step 3 — Generate ONE `<component>.stories.ts`

**One file. All selected story exports go inside it.**

### Meta block (always present)

```typescript
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX<PascalCaseTag> & { content: string }

const tag = '<ds-component>'

const meta: Meta<Args> = {
  title: 'Components/<Category>/<Name>',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(({ content, ...args }) => `<ds-component ${props(args)}>${content}</ds-component>`),
}

export default meta

const Story = StoryFactory<Args>(meta)
```

### Story naming — web component is the default

**Web component stories** use the plain PascalCase export name. The display name is set via `storyName` with the emoji at the **end**.
**HTML/CSS stories** use the plain name + `Html` suffix. Same pattern with 🌍 at the end.

**Never use `name:` inside the `Story({})` config object.** Always set the display name via `ExportName.storyName` after the story definition.

```typescript
// Web component variant
export const Basic = Story({
  ...withRender(({ content, ...args }) => `<ds-component ${props(args)}>${content}</ds-component>`),
})
Basic.storyName = '🧩 Basic'

// HTML/CSS variant
export const BasicHtml = Story({
  ...withRender(() => `<!-- inner HTML from style.html basic section -->`),
})
BasicHtml.storyName = '🌍 Basic'
```

If `style.html` doesn't exist, export only the web component story (no `Html` variant):

```typescript
export const Slots = Story({
  ...withRender(() => `<!-- inner HTML from visual.html slots section -->`),
})
Slots.storyName = '🧩 Slots'
```

### Additional stories

For each selected section (after basic):

- **If matching section exists in `style.html`**: two exports — `<SectionName>` (WC, 🧩) and `<SectionName>Html` (CSS/HTML from style.html, 🌍)
- **If no match in `style.html`**: one export using web component markup from visual.html (🧩 only)

Inner HTML comes directly from the respective HTML file section — copy it verbatim, stripping only the outer `<section>` wrapper and `<span>` label.

## Step 4 — Generate ONE `<component>.mdx`

**One file. All selected story Canvas blocks go inside it as sections.**

### Fixed structure

```mdx
import { Canvas, Markdown, Meta } from '@storybook/addon-docs/blocks'
import { Banner, BasicStoryTabs, Footer, Lead, PlaygroundBar, StoryHeading, TokenOverview } from '../../../.storybook/blocks'
import * as <ComponentName>Stories from './<component>.stories'

<Meta of={<ComponentName>Stories} />

<StoryHeading of={<ComponentName>Stories.Basic} hidden></StoryHeading>

<Banner of={<ComponentName>Stories} />

<Lead>**<ComponentName>** [one-line description — ask user if not obvious]</Lead>

<BasicStoryTabs tag="<component-name>" htmlStory={<ComponentName>Stories.BasicHtml} webComponentStory={<ComponentName>Stories.Basic} index={1} />

<PlaygroundBar of={<ComponentName>Stories.Basic}></PlaygroundBar>
```

`index={1}` on `BasicStoryTabs` makes the Web Component tab the default (shown first).

If `style.html` doesn't exist (web component only), replace `BasicStoryTabs` with:

```mdx
<Canvas of={<ComponentName>Stories.Basic} sourceState={'shown'} />
```

### Story sections

For each selected story (after basic) **with both HTML and WC variants**, use `BasicStoryTabs` with `noGuide`:

```mdx
{/* ------------------------------------------------------ */}

<StoryHeading of={<ComponentName>Stories.<StoryName>}></StoryHeading>

<BasicStoryTabs tag="<component-name>" htmlStory={<ComponentName>Stories.<StoryName>Html} webComponentStory={<ComponentName>Stories.<StoryName>} index={1} noGuide />
```

For sections with **WC only** (no matching style.html section):

```mdx
{/* ------------------------------------------------------ */}

<StoryHeading of={<ComponentName>Stories.<StoryName>}></StoryHeading>

<Canvas of={<ComponentName>Stories.<StoryName>} sourceState={'shown'} />
```

### Fixed footer (always at end)

```mdx
{/* ------------------------------------------------------ */}

## Component API

import api from './api.md?raw'

<Markdown>{api}</Markdown>

## CSS Variables

<TokenOverview component="<component-name>" />

## Integration

import integration from '../../snippets/integration.md?raw'

<Markdown>{integration}</Markdown>

<Footer />
```

## Naming Conventions

| Section `data-testid`  | WC export            | `storyName`                 | HTML export              | `storyName`                 |
| ---------------------- | -------------------- | --------------------------- | ------------------------ | --------------------------- |
| `basic`                | `Basic`              | `'🧩 Basic'`                | `BasicHtml`              | `'🌍 Basic'`                |
| `no-wrap`              | `NoWrap`             | `'🧩 No Wrap'`              | `NoWrapHtml`             | `'🌍 No Wrap'`              |
| `be-enterprise-number` | `BeEnterpriseNumber` | `'🧩 Be Enterprise Number'` | `BeEnterpriseNumberHtml` | `'🌍 Be Enterprise Number'` |

- Convert kebab-case testid to PascalCase for export names
- WC stories: plain PascalCase export + `ExportName.storyName = '🧩 Label'`
- HTML stories: PascalCase + `Html` suffix + `ExportName.storyName = '🌍 Label'`
- Emoji goes at the **start** of the storyName string

## Key Patterns from Existing Stories

- `withDefaultContent()` provides the `content` arg (slot text)
- `withContent()` / `withComponentControls({ tag })` populate argTypes
- `withRender(fn)` wraps the render function
- `props(args)` serialises Stencil props to HTML attribute string
- `cssClasses({...}, args, 'base-class')` maps props to CSS modifier classes (needed when CSS story has modifier logic)
- `createCssMappings(tag)` + `css(prop, fn)` for CSS class mappings — only needed when the HTML-only story has dynamic modifiers
- `StoryFactory<Args>(meta)` returns the `Story()` helper
- Story inner HTML should be the raw section content, not wrapped in `<section>`

## Output — exactly two files per component

| File                                                     | Contents                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `docs/src/components/<component>/<component>.stories.ts` | `meta` default export + ALL selected story named exports                               |
| `docs/src/components/<component>/<component>.mdx`        | Banner, BasicStoryTabs/Canvas, ALL selected story sections, API + TokenOverview footer |

**Never create separate files per story.** Create the `docs/src/components/<component>/` directory if it doesn't exist. Do NOT create or edit `api.md` (auto-generated by Stencil).
