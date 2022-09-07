import docs from './bal-icon.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalIcon } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalIcon,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-icon v-bind="args"></bal-icon>`,
})

export const Basic = Template.bind({})
Basic.args = {
  name: 'info-circle',
  size: 'large',
  color: 'primary',
}
Basic.parameters = { ...component.sourceCode(Basic) }

const svg = `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.9987 0C6.71662 0 0 6.88563 0 15.3801C0 22.1751 4.29757 27.9391 10.2582 29.9727C11.0086 30.1144 11.2821 29.6395 11.2821 29.2316C11.2821 28.8672 11.2692 27.8994 11.2618 26.6163C7.08952 27.5454 6.2092 24.5543 6.2092 24.5543C5.52686 22.7774 4.54344 22.3044 4.54344 22.3044C3.18152 21.3508 4.64657 21.3697 4.64657 21.3697C6.15215 21.4783 6.94406 22.9549 6.94406 22.9549C8.28204 25.3049 10.4552 24.6261 11.3097 24.2324C11.446 23.2391 11.8337 22.5612 12.2619 22.177C8.9312 21.7889 5.42926 20.469 5.42926 14.5757C5.42926 12.897 6.014 11.5233 6.97351 10.4488C6.81881 10.0598 6.30404 8.49539 7.12082 6.37863C7.12082 6.37863 8.37961 5.96509 11.2453 7.95534C12.4414 7.61356 13.7251 7.44362 15.0004 7.43701C16.2749 7.44362 17.5576 7.61356 18.7556 7.95534C21.6194 5.96509 22.8764 6.37863 22.8764 6.37863C23.695 8.49539 23.1803 10.0598 23.0265 10.4488C23.9878 11.5233 24.568 12.897 24.568 14.5757C24.568 20.4841 21.0605 21.7842 17.7197 22.1647C18.2575 22.6396 18.7373 23.5781 18.7373 25.0132C18.7373 27.0686 18.7188 28.7274 18.7188 29.2316C18.7188 29.6432 18.9895 30.1219 19.7502 29.9718C25.7061 27.9334 30 22.1732 30 15.3801C30 6.88563 23.2834 0 14.9987 0Z"/></svg>`

export const SVG = Template.bind({})
SVG.args = {
  svg,
  size: 'large',
  color: 'primary',
}
SVG.parameters = { ...component.sourceCode(SVG) }

export const Sizes = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
<bal-icon name="date" size="xsmall"></bal-icon>
<bal-icon name="date" size="small"></bal-icon>
<bal-icon name="date"></bal-icon>
<bal-icon name="date" size="medium"></bal-icon>
<bal-icon name="date" size="large"></bal-icon>
<bal-icon name="date" size="xlarge"></bal-icon>`,
})
Sizes.parameters = { ...component.sourceCode(Sizes) }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
<bal-icon color="primary" name="github"></bal-icon>
<bal-icon color="grey" name="github"></bal-icon>
<bal-icon color="success" name="github"></bal-icon>
<bal-icon color="warning" name="github"></bal-icon>
<bal-icon color="danger" name="github"></bal-icon>`,
})
Colors.parameters = { ...component.sourceCode(Colors) }
