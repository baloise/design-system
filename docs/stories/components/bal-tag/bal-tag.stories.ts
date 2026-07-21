import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import {
  withContent,
  withComponentControls,
  props,
  StoryFactory,
  withRender,
  withDefaultContent,
  lorem1,
} from '../../utils'

type Args = JSX.BalTag & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Tag',
  args: {
    ...withDefaultContent(),
    color: undefined,
    closable: false,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-tag' }),
  },
  ...withRender(({ content, ...args }) => `<bal-tag ${props(args)}>${content}</bal-tag>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Closable = Story({
  args: {
    closable: true,
  },
})

export const TagGroup = Story({
  ...withRender(
    () => `
<bal-tag-group>
  <bal-tag>Primary</bal-tag>
  <bal-tag color="success">Success</bal-tag>
  <bal-tag color="danger">Danger</bal-tag>
</bal-tag-group>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `
<bal-tag-group>
  <bal-tag color="">Default</bal-tag>
  <bal-tag color="primary">Primary</bal-tag>
  <bal-tag color="info">Info</bal-tag>
  <bal-tag color="success">Success</bal-tag>
  <bal-tag color="warning">Warning</bal-tag>
  <bal-tag color="danger">Danger</bal-tag>
</bal-tag-group>
<br>
<bal-tag-group>
  <bal-tag color="purple">Purple</bal-tag>
  <bal-tag color="red">Red</bal-tag>
  <bal-tag color="yellow">Yellow</bal-tag>
  <bal-tag color="green">Green</bal-tag>
</bal-tag-group>
<br>
<bal-tag-group>
  <bal-tag color="purple" light="true">Purple</bal-tag>
  <bal-tag color="red" light="true">Red</bal-tag>
  <bal-tag color="yellow" light="true">Yellow</bal-tag>
  <bal-tag color="green" light="true">Green</bal-tag>
</bal-tag-group>
<br>
<bal-tag-group>
  <bal-tag disabled="true">Disabled</bal-tag>
</bal-tag-group>
    `,
  ),
})

export const TagCard = Story({
  ...withRender(
    () => `
<bal-card class="mt-normal">
  <bal-tag color="red">Default tag</bal-tag>
  <bal-card-title>Card Title</bal-card-title>
  <bal-card-content>${lorem1}</bal-card-content>
</bal-card>
<br>
<bal-card class="mt-normal">
  <bal-tag color="red" position="center" size="large">Centered tag</bal-tag>
  <bal-card-title>Card Title</bal-card-title>
  <bal-card-content>${lorem1}</bal-card-content>
</bal-card>
      `,
  ),
})
