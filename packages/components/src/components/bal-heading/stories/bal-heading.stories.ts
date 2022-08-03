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

const excludedControls = []

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

export const Levels = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <bal-heading level="h1" space="bottom">Heading 1</bal-heading>
  <bal-heading level="h2" space="bottom">Heading 2</bal-heading>
  <bal-heading level="h3" space="bottom">Heading 3</bal-heading>
  <bal-heading level="h4" space="bottom">Heading 4</bal-heading>
  <bal-heading level="h5" space="none">Heading 5</bal-heading>
</div>
  `,
})
Levels.parameters = { ...component.sourceCode(Levels), controls: { exclude: excludedControls } }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <bal-heading level="h4" space="none">Default</bal-heading>
  <bal-heading color="primary" level="h4" space="none">Primary</bal-heading>
  <bal-heading color="info" level="h4" space="none">Info</bal-heading>
  <bal-heading color="success" level="h4" space="none">Success</bal-heading>
  <bal-heading color="warning" level="h4" space="none">Warning</bal-heading>
  <bal-heading color="danger" level="h4" space="none">Danger</bal-heading>
</div>
  `,
})
Colors.parameters = { ...component.sourceCode(Colors), controls: { exclude: excludedControls } }

export const Spacing = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <div class="has-background-blue-1 is-flex mb-3">
    <bal-heading level="h4" space="all">All</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-3">
    <bal-heading level="h4" space="none">None</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-3">
    <bal-heading level="h4" space="top">Top</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-3">
    <bal-heading level="h4" space="bottom">Bottom</bal-heading>
  </div>
</div>
  `,
})
Spacing.parameters = { ...component.sourceCode(Spacing), controls: { exclude: excludedControls } }
