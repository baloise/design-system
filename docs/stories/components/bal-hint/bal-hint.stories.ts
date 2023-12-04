import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalHint & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Hint',
  args: {
    small: true,
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-hint' }),
  },
  ...withRender(
    () => `<bal-hint class="mt-xx-large">
  <bal-hint-title>Spider-Man</bal-hint-title>
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15
    (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies, television shows, and
    video game adaptations set in the Marvel Universe.
  </bal-hint-text>
</bal-hint>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const TooltipHint = Story({
  ...withRender(
    ({ ...args }) => `<bal-hint class="mt-large" ${props(args)}>
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko.
  </bal-hint-text>
</bal-hint>`,
  ),
})

export const FieldHint = Story({
  ...withRender(
    () => `<bal-field expanded="true" class="mt-x-large">
  <bal-field-label>Firstname</bal-field-label>
  <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
  <bal-field-control>
    <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
</bal-field>`,
  ),
})
