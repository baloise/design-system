import docs from './bal-stage.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalStage } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Stage',
  component: BalStage,
  docs,
  args: {
    color: 'red',
    size: 'medium',
  },
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-heading space="none">Title</bal-heading>
    <bal-heading space="none" subtitle level="h2">Subtitle</bal-heading>
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
    <bal-heading space="none">Title Title</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
StageWithImage.args = {}
StageWithImage.parameters = { ...component.sourceCode(StageWithImage) }
