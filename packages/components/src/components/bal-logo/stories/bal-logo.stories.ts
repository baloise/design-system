import docs from './bal-logo.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalLogo } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Logo',
  component: BalLogo,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
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
