import docs from './readme.docs.mdx'
import { stencilArgType, withContent } from '../../../stories/utils'
import { BalFooter } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Footer',
  component: BalFooter,
  argTypes: {
    ...stencilArgType('bal-footer'),
    ...withContent(),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalFooter },
  setup: () => ({ args }),
  template: `<bal-footer v-bind="args">
  <div class="container">{{ args.content }}</div>
</bal-footer>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Footer Content',
  hideLinks: true,
}

export const WithLinks = Template.bind({})
WithLinks.args = {
  content: '',
  locale: 'en',
  hideLinks: false,
}
