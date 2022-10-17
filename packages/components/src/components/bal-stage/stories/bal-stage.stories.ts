import docs from './bal-stage.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import {
  BalStage,
  BalStageBody,
  BalStageImage,
  BalStageBackLink,
  BalButtonGroup,
  BalButton,
  BalHeading,
  BalText,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Stage',
  component: BalStage,
  subcomponents: {
    BalStageBody,
    BalStageImage,
    BalStageBackLink,
  },
  argTypes: {
    ...withContent(),
    shadow: {
      description: 'Adds a blur shadow to the stage body elements',
      table: {
        category: 'content',
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
  },
  docs,
})

export default component.story

const excludedControls = ['hasShape']

export const Basic = args => ({
  components: { ...component.components, BalHeading },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
Basic.args = {
  content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
  size: '',
  color: 'green',
  shape: true,
}
Basic.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const SmallStage = args => ({
  components: { ...component.components, BalHeading },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
SmallStage.args = {
  content: 'Small title',
  size: 'small',
  color: 'purple',
  shape: true,
}
SmallStage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(SmallStage),
  controls: { exclude: excludedControls },
}

export const LargeStage = args => ({
  components: { ...component.components, BalHeading },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
LargeStage.args = {
  content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
  size: 'large',
  color: 'red',
  shape: true,
}
LargeStage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(LargeStage),
  controls: { exclude: excludedControls },
}

export const StageWithImage = args => ({
  components: { ...component.components, BalButtonGroup, BalButton, BalHeading, BalText },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-image src-set="https://via.placeholder.com/768x250 768w, https://via.placeholder.com/1536x500 1536w, https://via.placeholder.com/1023x300 1023w, https://www.baloise.ch/.imaging/mte/baloise-theme/1920/dam/baloise-ch/magazin/privatkunden/header/fahrzeuge-reisen/Skipass-versichern.jpg/jcr:content/Skipass%20versichern.jpg 2400w"></bal-stage-image>
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5" :shadow="args.shadow" :inverted="args.inverted">Zurück</bal-stage-back-link>
    <bal-heading class="mb-8" space="none" :shadow="args.shadow" :inverted="args.inverted">{{ args.content }}</bal-heading>
    <bal-heading space="none" level="h5" :shadow="args.shadow" :inverted="args.inverted">Pensionsplanungsevent</bal-heading>
    <bal-text :inverted="args.inverted" :shadow="args.shadow">
      Auch wenn Ihre Pensionierung noch in weiter Ferne liegt, die grundlegenden Fragen dazu lohnt es sich bereits heute zu stellen.
    </bal-text>
    <bal-button-group class="mt-2">
      <bal-button :shadow="args.shadow" :inverted="args.inverted">Mehr dazu</bal-button>
      <bal-button :shadow="args.shadow" :inverted="args.inverted" color="link">Optional Link</bal-button>
    </bal-button-group>
  </bal-stage-body>
</bal-stage>`,
})
StageWithImage.args = {
  content: 'Das Beste aus Versicherung und Bank',
  size: 'large',
  shadow: true,
  inverted: true,
}
StageWithImage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(StageWithImage),
  controls: { exclude: excludedControls },
}
