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
    <p>{{ args.content }}</p>
  </div>
</bal-footer>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Footer Content',
  hideLinks: false,
  hideLanguageSelection: false,
  showSocialMedia: false,
}
Basic.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
}

export const FooterOfGermany = Template.bind({})
FooterOfGermany.args = {
  hideLinks: false,
  hideLanguageSelection: true,
  showSocialMedia: true,
  region: 'DE',
  language: 'de',
}
FooterOfGermany.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(FooterOfGermany),
}
