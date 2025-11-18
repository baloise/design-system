import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalData & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Data',
  args: {
    border: true,
    horizontal: false,
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-data' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-card>
  <bal-card-content>
    <bal-data ${props(args)}>
      <bal-data-item>
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card-content>
</bal-card>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Horizontal = Story({
  args: {
    horizontal: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-card class="p-medium">
    <bal-data ${props(args)}>
      <div>
        <bal-data-item>
          <bal-data-label>Label</bal-data-label>
          <bal-data-value>Value</bal-data-value>
        </bal-data-item>
      </div>
      <bal-data-item>
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card>`,
  ),
})

export const DataTypes = Story({
  ...withRender(
    ({ ...args }) => `<bal-card>
    <bal-card-content>
      <bal-data ${props(args)}>
        <bal-data-item>
          <bal-data-label>Label</bal-data-label>
          <bal-data-value>A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
        </bal-data-item>
        <bal-data-item>
          <bal-data-label>Multiline Label</bal-data-label>
          <bal-data-value multiline="true">A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
        </bal-data-item>
        <bal-data-item>
          <bal-data-label>List Value</bal-data-label>
          <bal-data-value multiline="true">
            <ul class="list ml-normal">
              <li>Value 1</li>
              <li>Value 2</li>
            </ul>
          </bal-data-value>
        </bal-data-item>
        <bal-data-item>
          <bal-data-label>Editable</bal-data-label>
          <bal-data-value editable>A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
        </bal-data-item>
        <bal-data-item>
        <bal-data-label>Editable Multiline</bal-data-label>
        <bal-data-value multiline="true" editable="true">A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
      </bal-data-item>
        <bal-data-item disabled>
          <bal-data-label>Disabled</bal-data-label>
          <bal-data-value>Value</bal-data-value>
        </bal-data-item>
        <bal-data-item>
          <bal-data-label>
            With a hint
            <bal-hint>
              <bal-hint-title>Spider-Man</bal-hint-title>
              <bal-hint-text>
                Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing
                Fantasy #15 (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies,
                television shows, and video game adaptations set in the Marvel Universe.
              </bal-hint-text>
            </bal-hint>
          </bal-data-label>
          <bal-data-value>Value</bal-data-value>
        </bal-data-item>
      </bal-data>
    </bal-card-content>
  </bal-card>`,
  ),
})
