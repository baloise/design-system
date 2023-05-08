import docs from './bal-heading.docs.mdx'
import { withContent, BalComponentStory } from '../../../../stories/utils'
import { BalHeading } from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Typography/Heading',
  component: BalHeading,
  argTypes: {
    ...withContent(),
  },
  docs,
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
  template: `<div class="columns">
  <div class="column is-half has-background-yellow-1">
    <bal-heading level="h1">Heading 1</bal-heading>
    <bal-heading level="h2">Heading 2</bal-heading>
    <bal-heading level="h3">Heading 3</bal-heading>
    <bal-heading level="h4">Heading 4</bal-heading>
    <bal-heading level="h5">Heading 5</bal-heading>
  </div>
  <div class="column is-half has-background-yellow-2">
    <h1 class="title is-size-xxx-large">Heading 1</h1>
    <h2 class="title is-size-xx-large">Heading 2</h2>
    <h3 class="title is-size-x-large">Heading 3</h3>
    <h4 class="title is-size-large">Heading 4</h4>
    <h5 class="title is-size-normal">Heading 5</h5>
  </div>

</div>
  `,
})
Levels.parameters = { ...component.sourceCode(Levels), controls: { exclude: excludedControls } }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <bal-heading level="h4" space="none">Default / Primary</bal-heading>
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
  <div class="has-background-blue-1 is-flex mb-small">
    <bal-heading level="h4" space="all">All</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-small">
    <bal-heading level="h4" space="none">None</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-small">
    <bal-heading level="h4" space="top">Top</bal-heading>
  </div>
  <div class="has-background-blue-1 is-flex mb-small">
    <bal-heading level="h4" space="bottom">Bottom</bal-heading>
  </div>
</div>
  `,
})
Spacing.parameters = { ...component.sourceCode(Spacing), controls: { exclude: excludedControls } }

export const AutoLevel = Template.bind({})
AutoLevel.args = {
  content:
    'This heading is actual a H1 level, but since it requires more than one line we shrink it until it matches or is the same level as the auto-level.',
  level: 'h1',
  autoLevel: 'h5',
  subtitle: false,
  space: 'bottom',
  color: '',
  inverted: false,
}
AutoLevel.parameters = { ...component.sourceCode(AutoLevel), controls: { exclude: excludedControls } }

export const CSSUtilities = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <h1 class="title is-size-xxx-large">Heading 1</h1>
  <h2 class="title is-size-xx-large">Heading 2</h2>
  <h3 class="title is-size-x-large">Heading 3</h3>
  <h4 class="title is-size-large">Heading 4</h4>
  <h5 class="title is-size-normal">Heading 5</h5>
</div>
  `,
})
CSSUtilities.parameters = { ...component.sourceCode(CSSUtilities), controls: { exclude: excludedControls } }
