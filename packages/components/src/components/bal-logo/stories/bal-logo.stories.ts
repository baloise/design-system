import docs from './bal-logo.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalLogo } from '../../../../.storybook/vue/components'
import { configArgTypes, configDefaultArgs, reduceConfigArgs, setConfig } from '../../../stories/utils/config'

const component = BalComponentStory({
  title: 'Components/Logo',
  component: BalLogo,
  docs,
  argTypes: {
    ...configArgTypes,
  },
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
  template: `<bal-logo v-bind="args"></bal-logo>`,
})

export const BaloiseGroup = Template.bind({})
BaloiseGroup.args = {
  brand: 'group',
  color: 'blue',
}
BaloiseGroup.parameters = { ...component.sourceCode(BaloiseGroup) }

export const BaloiseInsurance = Template.bind({})
BaloiseInsurance.args = {
  brand: 'insurance',
  color: 'blue',
}
BaloiseInsurance.parameters = { ...component.sourceCode(BaloiseInsurance) }

export const BaloiseSoba = Template.bind({})
BaloiseSoba.args = {
  brand: 'soba',
  color: 'blue',
}
BaloiseSoba.parameters = { ...component.sourceCode(BaloiseSoba) }
