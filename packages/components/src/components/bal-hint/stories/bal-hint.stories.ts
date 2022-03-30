import docs from './bal-hint.docs.mdx'
import { withContent, BalComponentStory } from '../../../stories/utils'
import {
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInput,
  BalField,
  BalFieldControl,
  BalFieldMessage,
  BalFieldLabel,
  BalFieldHint,
} from '../../../../.storybook/vue/components'
import { configArgTypes, configDefaultArgs, reduceConfigArgs, setConfig } from '../../../stories/utils/config'

const component = BalComponentStory({
  title: 'Components/Hint',
  component: BalHint,
  status: 'stable',
  subcomponents: { BalHintText, BalHintTitle },
  argTypes: {
    ...withContent(),
    ...configArgTypes,
  },
  args: {
    ...configDefaultArgs,
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<bal-hint v-bind="args" class="mt-6">
  <bal-hint-title>Spider-Man</bal-hint-title>
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15
    (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies, television shows, and
    video game adaptations set in the Marvel Universe.
  </bal-hint-text>
  </bal-hint>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const TooltipHint = args => ({
  components: { ...component.components },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<bal-hint v-bind="args" class="mt-6">
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko.
  </bal-hint-text>
  </bal-hint>`,
})
TooltipHint.args = {
  small: true,
}
TooltipHint.parameters = { ...component.sourceCode(TooltipHint) }

export const FieldHint = args => ({
  components: {
    ...component.components,
    BalInput,
    BalField,
    BalFieldControl,
    BalFieldMessage,
    BalFieldLabel,
    BalFieldHint,
  },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<bal-field expanded class="mt-7">
  <bal-field-label>Firstname</bal-field-label>
  <bal-field-hint v-bind="args" subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
  <bal-field-control>
    <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
  </bal-field>`,
})
FieldHint.args = {}
FieldHint.parameters = { ...component.sourceCode(FieldHint) }
