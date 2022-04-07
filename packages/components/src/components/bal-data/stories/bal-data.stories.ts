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
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>Value</bal-data-value>
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
    <div>
      <bal-data-item>
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
    </div>
    <bal-data-item>
      <bal-data-label>Label</bal-data-label>
      <bal-data-value>Value</bal-data-value>
    </bal-data-item>
    <bal-data-item>
      <bal-data-label>Label</bal-data-label>
      <bal-data-value>Value</bal-data-value>
    </bal-data-item>
  </bal-data>
</bal-card>`,
})
Horizontal.args = {
  border: false,
  horizontal: true,
}
Horizontal.parameters = { ...component.sourceCode(Horizontal) }

export const DataTypes = args => ({
  components: { ...component.components, BalCard, BalCardContent, BalInput, BalHint, BalHintText, BalHintTitle },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-card-content>
    <bal-data v-bind="args">
      <bal-data-item>
        <bal-data-label>Label</bal-data-label>
        <bal-data-value>A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Multiline Label</bal-data-label>
        <bal-data-value multiline>A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>List Value</bal-data-label>
        <bal-data-value multiline>
          <ul class="is-list ml-4">
            <li>Value 1</li>
            <li>Value 2</li>
          </ul>
        </bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Editable</bal-data-label>
        <bal-data-value editable>Value</bal-data-value>
      </bal-data-item>
      <bal-data-item disabled>
        <bal-data-label>Disabled</bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>
          With a hint
          <bal-hint>
            <bal-hint-title>Spider-Man</bal-hint-title>
            <bal-hint-text>
              Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing
              Fantasy #15 (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies,
              television shows, and video game adaptations set in the Marvel Universe.
            </bal-hint-text>
          </bal-hint>
        </bal-data-label>
        <bal-data-value>Value</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card-content>
</bal-card>`,
})
DataTypes.args = {
  border: true,
  horizontal: false,
}
DataTypes.parameters = { ...component.sourceCode(DataTypes) }
