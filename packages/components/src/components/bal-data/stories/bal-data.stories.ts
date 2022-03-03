import docs from './bal-data.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalCard,
  BalCardContent,
  BalInput,
  BalHint,
  BalHintText,
  BalHintTitle,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalData,
  subcomponents: {
    BalDataItem,
    BalDataLabel,
    BalDataValue,
  },
  status: 'stable',
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalCard, BalCardContent, BalInput, BalHint, BalHintText, BalHintTitle },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-card-content>
    <bal-data v-bind="args">
      <bal-data-item>
        <bal-data-label>Tony</bal-data-label>
        <bal-data-value>Stark</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Maria</bal-data-label>
        <bal-data-value editable>Hill</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Natasha</bal-data-label>
        <bal-data-value>
          <bal-input value="Romanoff"></bal-input>
        </bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Matt</bal-data-label>
        <bal-data-value editable>
          <bal-input value="Murdock"></bal-input>
        </bal-data-value>
      </bal-data-item>
      <bal-data-item disabled>
        <bal-data-label>Nick</bal-data-label>
        <bal-data-value>Fury</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>
          Peter
          <bal-hint>
            <bal-hint-title>Spider-Man</bal-hint-title>
            <bal-hint-text>
              Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing
              Fantasy #15 (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies,
              television shows, and video game adaptations set in the Marvel Universe.
            </bal-hint-text>
          </bal-hint>
        </bal-data-label>
        <bal-data-value>Parker</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card-content>
</bal-card>`,
})
Basic.args = {
  border: true,
  horizontal: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Horizontal = args => ({
  components: { ...component.components, BalCard },
  setup: () => ({ args }),
  template: `<bal-card class="p-5">
  <bal-data v-bind="args">
    <bal-data-item>
      <bal-data-label>Tony</bal-data-label>
      <bal-data-value>Stark</bal-data-value>
    </bal-data-item>
    <bal-data-item>
      <bal-data-label>Steve</bal-data-label>
      <bal-data-value>Rogers</bal-data-value>
    </bal-data-item>
    <bal-data-item>
      <bal-data-label>Stephen</bal-data-label>
      <bal-data-value>Strange</bal-data-value>
    </bal-data-item>
  </bal-data>
</bal-card>`,
})
Horizontal.args = {
  border: false,
  horizontal: true,
}
Horizontal.parameters = { ...component.sourceCode(Horizontal) }
