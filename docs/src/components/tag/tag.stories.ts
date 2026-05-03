import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  props,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalTag & { content: string }

const tag = 'ds-tag'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Tag',
  args: {
    ...withDefaultContent(),
    color: undefined,
    closable: false,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-tag' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<span ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('size', (size: string) => `is-${size}`),
      },
      args,
      'tag',
    )}>
  ${
    args.icon
      ? `
  <ds-icon name="${args.icon}" size="small"></ds-icon>`
      : ''
  }${content}${
    args.closable
      ? `
  <ds-close></ds-close>`
      : ''
  }
</span>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ content, ...args }) => `<ds-tag ${props(args)}>${content}</ds-tag>`),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

export const Closable = Story({
  ...withRender(({ content, ...args }) => `<ds-tag closable>${content}</ds-tag>`),
})
Closable.storyName = '🧩 Closable'

export const ClosableHtml = Story({
  args: {
    closable: true,
  },
})
ClosableHtml.storyName = '🌍 Closable'

export const TagGroup = Story({
  ...withRender(
    () => `
<div class="tags">
  <ds-tag>Primary</ds-tag>
  <ds-tag color="success">Success</ds-tag>
  <ds-tag color="danger">Danger</ds-tag>
</div>`,
  ),
})
TagGroup.storyName = '🧩 Tag Group'

export const TagGroupHtml = Story({
  ...withRender(
    () => `
<div class="tags">
  <span class="tag">Primary</span>
  <span class="tag is-success">Success</span>
  <span class="tag is-danger">Danger</span>
</div>`,
  ),
})
TagGroupHtml.storyName = '🌍 Tag Group'

export const Colors = Story({
  ...withRender(
    () => `
<div class="tags">
  <ds-tag>Default</ds-tag>
  <ds-tag color="primary">Primary</ds-tag>
  <ds-tag color="info">Info</ds-tag>
  <ds-tag color="success">Success</ds-tag>
  <ds-tag color="warning">Warning</ds-tag>
  <ds-tag color="danger">Danger</ds-tag>
</div>
<br>
<div class="tags">
  <ds-tag color="purple-dark">Purple</ds-tag>
  <ds-tag color="red-dark">Red</ds-tag>
  <ds-tag color="yellow-dark">Yellow</ds-tag>
  <ds-tag color="green-dark">Green</ds-tag>
</div>
<br>
<div class="tags">
  <ds-tag color="purple">Purple</ds-tag>
  <ds-tag color="red">Red</ds-tag>
  <ds-tag color="yellow">Yellow</ds-tag>
  <ds-tag color="green">Green</ds-tag>
</div>
<br>
<div class="tags">
  <ds-tag color="purple-light">Purple</ds-tag>
  <ds-tag color="red-light">Red</ds-tag>
  <ds-tag color="yellow-light">Yellow</ds-tag>
  <ds-tag color="green-light">Green</ds-tag>
</div>
<br>
<div class="tags">
  <ds-tag color="disabled">Disabled</ds-tag>
</div>
    `,
  ),
})
Colors.storyName = '🧩 Colors'

export const ColorsHtml = Story({
  ...withRender(
    () => `
<div class="tags">
  <span class="tag">Default</span>
  <span class="tag is-primary">Primary</span>
  <span class="tag is-info">Info</span>
  <span class="tag is-success">Success</span>
  <span class="tag is-warning">Warning</span>
  <span class="tag is-danger">Danger</span>
</div>
<br>
<div class="tags">
  <span class="tag is-purple-dark">Purple</span>
  <span class="tag is-red-dark">Red</span>
  <span class="tag is-yellow-dark">Yellow</span>
  <span class="tag is-green-dark">Green</span>
</div>
<br>
<div class="tags">
  <span class="tag is-purple">Purple</span>
  <span class="tag is-red">Red</span>
  <span class="tag is-yellow">Yellow</span>
  <span class="tag is-green">Green</span>
</div>
<br>
<div class="tags">
  <span class="tag is-purple-light">Purple</span>
  <span class="tag is-red-light">Red</span>
  <span class="tag is-yellow-light">Yellow</span>
  <span class="tag is-green-light">Green</span>
</div>
<br>
<div class="tags">
  <span class="tag is-disabled">Disabled</span>
</div>
    `,
  ),
})
ColorsHtml.storyName = '🌍 Colors'
