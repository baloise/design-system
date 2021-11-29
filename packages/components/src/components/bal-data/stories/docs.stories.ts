import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalData, BalDataItem, BalDataLabel, BalDataValue } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Data',
  component: BalData,
  subcomponents: {
    BalDataItem,
    BalDataLabel,
    BalDataValue,
  },
  argTypes: generateArgType('bal-data'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalData, BalDataItem, BalDataLabel, BalDataValue },
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

export const Horizontal = args => ({
  components: { BalData, BalDataItem, BalDataLabel, BalDataValue },
  setup: () => ({ args }),
  template: `<bal-card>
    <bal-card-content>
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
    </bal-card-content>
  </bal-card>`,
})
Horizontal.args = {
  border: false,
  horizontal: true,
}
