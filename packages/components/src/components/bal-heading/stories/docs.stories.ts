import docs from './readme.docs.mdx'
import { stencilArgType, withContent, withSoureCode, BalComponentStory } from '../../../stories/utils'
import { BalHeading } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalHeading,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

const Template = args => ({
  components: { BalHeading },
  setup: () => ({ args }),
  template: `<bal-heading v-bind="args">{{ args.content }}</bal-heading>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Heading',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Subtitle = Template.bind({})
Subtitle.args = {
  content: 'Subtitle',
  level: 'h3',
  subtitle: true,
  space: 'none',
}
Subtitle.parameters = { ...component.sourceCode(Subtitle) }
