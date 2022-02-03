import docs from './bal-footer.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalFooter } from '../../../../.storybook/vue/components'
import { configArgTypes, configDefaultArgs, reduceConfigArgs, setConfig } from '../../../stories/utils/config'

const component = BalComponentStory({
  component: BalFooter,
  argTypes: {
    ...withContent(),
    ...configArgTypes,
  },
  docs,
  args: {
    ...configDefaultArgs,
  },
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<bal-footer v-bind="args">
  <div class="container">{{ args.content }}</div>
</bal-footer>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Footer Content',
  hideLinks: true,
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithLinks = Template.bind({})
WithLinks.args = {
  content: '',
  locale: 'en',
  hideLinks: false,
}
WithLinks.parameters = { ...component.sourceCode(WithLinks) }
