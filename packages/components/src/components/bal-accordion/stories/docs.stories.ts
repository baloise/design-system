import docs from './readme.docs.mdx'
import { stencilArgType, withContent } from '../../../stories/utils'
import { BalAccordion } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Accordion',
  component: BalAccordion,
  argTypes: {
    ...stencilArgType('bal-accordion'),
    ...withContent(),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalAccordion },
  setup: () => ({ args }),
  template: `<bal-accordion v-bind="args" class="box">
    <p class="p-4">
     {{ args.content }}
    </p>
  </bal-accordion>`,
})

export const Basic = Template.bind({})
Basic.args = {
  openLabel: 'Show detail',
  closeLabel: 'Show detail',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
