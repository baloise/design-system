import docs from './bal-footer.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalFooter } from '../../../../.storybook/vue/generated/components'
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
  <div class="container">
    <bal-logo color="white"></bal-logo>
    <p class="mt-x-small">{{ args.content }}</p>
  </div>
</bal-footer>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Footer Content',
  hideLinks: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const FooterOfGermany = Template.bind({})
FooterOfGermany.args = {
  hideLinks: false,
  hideLanguageSelection: true,
  region: 'DE',
  language: 'de',
}
FooterOfGermany.parameters = { ...component.sourceCode(FooterOfGermany) }
