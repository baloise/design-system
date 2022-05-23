import docs from './bal-stage.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalStage } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Stage',
  component: BalStage,
  docs,
  args: {
    color: 'red',
    inverted: false,
    hasShape: true,
  },
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Subtitle</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const StageWithImage = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-image src="https://www.baloise.ch/.imaging/mte/baloise-theme/1920/dam/baloise-ch/magazin/privatkunden/header/fahrzeuge-reisen/Skipass-versichern.jpg/jcr:content/Skipass%20versichern.jpg"></bal-stage-image>
  <bal-stage-body>
    <bal-stage-back-link href="#">Link</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
StageWithImage.args = {}
StageWithImage.parameters = { ...component.sourceCode(StageWithImage) }

export const StageWithBackLink = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#">Link</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Subtitle</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
StageWithBackLink.args = {}
StageWithBackLink.parameters = { ...component.sourceCode(StageWithBackLink) }
