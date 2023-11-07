import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import {
  props,
  withRender,
  withContent,
  withDefaultContent,
  withComponentControls,
  StoryFactory,
  lorem1,
} from '../../utils'

type Args = JSX.BalStage & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Containment/Stage',
  args: {
    ...withDefaultContent(lorem1),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-stage' }),
  },
  ...withRender(({ content, ...args }) => `<bal-stage ${props(args)}>${content}</bal-stage>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-stage ${props(args)}>
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-medium">Back</bal-stage-back-link>
    <bal-heading class="mb-x-small" space="none">${content}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
  ),
  args: {
    size: '',
    color: 'green',
    shape: true,
  },
})

export const SmallStage = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-stage ${props(args)}>
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-medium">Back</bal-stage-back-link>
    <bal-heading class="mb-x-small" space="none">${content}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
  ),
  args: {
    content: 'Small title',
    size: 'small',
    color: 'purple',
    shape: true,
  },
})

export const LargeStage = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-stage ${props(args)}>
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-medium">Back</bal-stage-back-link>
    <bal-heading class="mb-x-small" space="none">${content}</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
    </bal-stage-body>
</bal-stage>`,
  ),
  args: {
    size: 'large',
    color: 'red',
    shape: true,
  },
})

export const StageWithImage = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-stage ${props(args)}>
    <bal-stage-image src-set="https://fastly.picsum.photos/id/626/1280/720.jpg?hmac=pHWhzQeCr1Zq8_NquZJ51qZ0xXa4psCZpoeJbaUbkWM"></bal-stage-image>
    <bal-stage-body>
      <bal-stage-back-link href="#" class="mb-medium" shadow="true" inverted="true">Zurück</bal-stage-back-link>
      <bal-heading class="mb-xx-large" space="none" shadow="true" inverted="true">${content}</bal-heading>
      <bal-heading space="none" level="h5" shadow="true" inverted="true">Pensionsplanungsevent</bal-heading>
      <bal-text inverted="true" shadow="true">
        Auch wenn Ihre Pensionierung noch in weiter Ferne liegt, die grundlegenden Fragen dazu lohnt es sich bereits heute zu stellen.
      </bal-text>
      <bal-button-group class="mt-x-small">
        <bal-button shadow="true" inverted="true">Mehr dazu</bal-button>
        <bal-button shadow="true" inverted="true" color="link">Optional Link</bal-button>
      </bal-button-group>
    </bal-stage-body>
  </bal-stage>`,
  ),
  args: {
    content: 'Das Beste aus Versicherung und Bank',
  },
})
