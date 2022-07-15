import docs from './bal-stage.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalStage } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Stage',
  component: BalStage,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Subtitle</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
Basic.args = {
  color: 'red',
  inverted: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const StageWithImage = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
StageWithImage.args = {
  images:
    'https://via.placeholder.com/320x180 mobile, https://via.placeholder.com/769x250 tablet, https://www.baloise.ch/.imaging/mte/baloise-theme/1920/dam/baloise-ch/magazin/privatkunden/header/fahrzeuge-reisen/Skipass-versichern.jpg/jcr:content/Skipass%20versichern.jpg desktop',
}
StageWithImage.parameters = { ...component.sourceCode(StageWithImage) }

export const StageWithShape = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Subtitle</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
StageWithShape.args = {
  color: 'green',
  inverted: false,
  hasShape: true,
  shapeVariation: '2',
  shapeRotation: '90',
}
StageWithShape.parameters = { ...component.sourceCode(StageWithShape) }
