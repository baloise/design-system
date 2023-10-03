import { JsonDocsComponent } from '@stencil/core/internal'
import { existsSync, writeFileSync } from 'fs'
import path from 'path'

export const createStory = (docsPath: string, component: JsonDocsComponent) => {
  const clearAndUpper = text => text.replace(/-/, '').toUpperCase()
  const toPascalCase = text => text.replace(/(^\w|-\w)/g, clearAndUpper)

  const tag = component.tag
  const name = toPascalCase(component.tag.slice(3))

  const metaPath = path.join(docsPath, `${tag}.stories.ts`)
  const mdxPath = path.join(docsPath, `${tag}.mdx`)

  if (tag !== 'bal-notices') {
    if (!existsSync(metaPath)) {
      writeFileSync(metaPath, generateMeta(tag, name))
    }

    if (!existsSync(mdxPath)) {
      writeFileSync(mdxPath, generateMdx(tag, name))
    }
  }
}

const generateMeta = (tag: string, name: string) => `
import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.Bal${name} & { content: string }

const meta: Meta<Args> = {
  title: 'Components/${name}',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: '${tag}' }),
  },
  ...withRender(({ content, ...args }) => \`<${tag} \${props(args)}>\${content}</${tag}>\`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Secondary = Story({
  args: {
    // place props here
  },
})
`

const generateMdx = (tag: string, name: string) => `
import { Canvas, Meta, Markdown } from '@storybook/blocks'
import { Banner, Lead, PlaygroundBar, StoryHeading } from '../../../.storybook/blocks'
import * as ${name}Stories from './${tag}.stories'

<Meta of={${name}Stories} />

<StoryHeading of={${name}Stories.Basic} hidden></StoryHeading>

<Banner of={${name}Stories} />

<Lead>**TODO** Place a lead text here.</Lead>

<Canvas of={${name}Stories.Basic} sourceState="shown" />

<PlaygroundBar of={${name}Stories.Basic}></PlaygroundBar>

{/* STORIES */}
{/* ------------------------------------------------------ */}

<StoryHeading of={${name}Stories.Secondary}></StoryHeading>

<Canvas of={${name}Stories.Secondary} sourceState="shown" />

{/* ------------------------------------------------------ */}

## Component API

import api from './api.md?raw'

<Markdown>{api}</Markdown>

## Integration

import integration from '../../snippets/integration.md?raw'

<Markdown>{integration}</Markdown>

import theming from './theming.md?raw'

<Markdown>{theming}</Markdown>

import testing from './testing.md?raw'

<Markdown>{testing}</Markdown>
`
