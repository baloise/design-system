import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalHint, BalHintText, BalHintTitle } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Hint',
  component: BalHint,
  subcomponent: { BalHintText, BalHintTitle },
  argTypes: generateArgType('bal-hint'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalHint, BalHintText, BalHintTitle },
  setup: () => ({ args }),
  template: `<bal-hint v-bind="args">
  <bal-hint-title>Spider-Man</bal-hint-title>
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15
    (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies, television shows, and
    video game adaptations set in the Marvel Universe.
  </bal-hint-text>
</bal-hint>`,
})
Basic.args = {}

export const FieldHint = args => ({
  components: { BalHint, BalHintText, BalHintTitle },
  setup: () => ({ args }),
  template: `<bal-field expanded>
  <bal-field-label required>Firstname</bal-field-label>
  <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
  <bal-field-control>
    <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
</bal-field>`,
})
FieldHint.args = {}
