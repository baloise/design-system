import docs from './bal-heading.docs.mdx'
import { withContent, BalComponentStory } from '../../../stories/utils'
import { BalHeading } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalHeading,
  argTypes: {
    ...withContent(),
  },
  docs,
  status: 'stable',
})

export default component.story

const excludedControls = ['visualLevel']

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-heading v-bind="args">{{ args.content }}</bal-heading>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Heading',
  level: 'h1',
  subtitle: false,
  space: 'bottom',
  color: '',
  inverted: false,
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const Subtitle = Template.bind({})
Subtitle.args = {
  content: 'Subtitle',
  level: 'h3',
  subtitle: true,
  space: 'bottom',
  color: '',
  inverted: false,
}
Subtitle.parameters = { ...component.sourceCode(Subtitle), controls: { exclude: excludedControls } }
