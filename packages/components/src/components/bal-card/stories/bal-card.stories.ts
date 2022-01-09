import docs from './bal-card.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalCard,
  BalButton,
  BalHeading,
  BalAccordion,
  BalData,
  BalDataLabel,
  BalDataValue,
  BalDataItem,
  BalList,
  BalListItem,
  BalListItemTitle,
  BalListItemContent,
  BalListItemIcon,
  BalIcon,
  BalCheckbox,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalCard,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalButton, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args" class="p-5">
  <bal-heading title level="h4" space="none">BaloiseCombi</bal-heading>
  <bal-heading subtitle level="h5" space="bottom" color="hint">Police number 70/2.937.458</bal-heading>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
  <div class="field is-grouped is-grouped-right mt-5">
    <p class="control">
      <bal-button color="info" outlined>Secondary Action</bal-button>
    </p>
    <p class="control">
      <bal-button>Main Action</bal-button>
    </p>
  </div>
</bal-card>`,
})
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithList = args => ({
  components: {
    ...component.components,
    BalButton,
    BalHeading,
    BalListItemIcon,
    BalIcon,
    BalList,
    BalListItem,
    BalListItemTitle,
    BalListItemContent,
  },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args" class="p-5">
  <bal-heading title level="h4" space="none">Title</bal-heading>
  <bal-list border>
    <bal-list-item>
      <bal-list-item-content>
        <bal-list-item-title>News A</bal-list-item-title>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-large"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
    <bal-list-item>
      <bal-list-item-content>
        <bal-list-item-title>News B</bal-list-item-title>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-large"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
  </bal-list>
  <div class="field is-grouped is-grouped-right mt-5">
    <p class="control">
      <bal-button type="is-link">More</bal-button>
    </p>
  </div>
</bal-card>`,
})
WithList.parameters = { ...component.sourceCode(WithList) }

export const WithAccordion = args => ({
  components: { ...component.components, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <bal-heading title level="h4" space="none">BaloiseCombi</bal-heading>
    <bal-heading subtitle level="h5" space="none" color="hint">Police number 70/2.937.458</bal-heading>
  </div>
  <bal-accordion>
    <p class="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
  </bal-card>`,
})
WithAccordion.parameters = { ...component.sourceCode(WithAccordion) }

export const Summary = args => ({
  components: { ...component.components, BalHeading, BalButton, BalData, BalDataItem, BalDataLabel, BalDataValue },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <bal-heading title level="h5" space="none">Insured vehicle</bal-heading>
    <bal-heading title level="h4" space="none">Cupra Ateca</bal-heading>
    <bal-heading subtitle level="h5" space="bottom" color="hint">
      Running time: 21.07.2019 - 21.07.2021
    </bal-heading>
    <bal-data horizontal>
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
  </div>

  <bal-button color="primary-light" bottom-r  ounded icon="edit" expanded>Edit</bal-button>
  </bal-card>`,
})
Summary.parameters = { ...component.sourceCode(Summary) }

export const Service = args => ({
  components: { ...component.components, BalCheckbox, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <div class="is-flex is-justify-content-center	is-align-items-center">
      <img style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
      <div class="is-flex-grow-1 px-2">
        <bal-heading title level="h4" space="none">Baustein Parkschaden <small class="is-hidden-touch">(+ CHF 11.30)</small></bal-heading>
        <bal-heading subtitle level="h5" space="none" class="is-hidden-desktop">+ CHF 11.30</bal-heading>
        <p class="has-text-blue-light-text is-hidden-touch">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
      </div>
      <bal-checkbox :value="true" interface="switch"></bal-checkbox>
    </div>
    <p class="mt-2 has-text-blue-light-text is-hidden-desktop">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
  </div>
  <bal-accordion card open-label="Details einblenden" close-label="Details ausblenden">
  <p class="p-5 has-text-blue-light-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
  </p>
  </bal-accordion>

</bal-card>`,
})
Service.parameters = { ...component.sourceCode(Service) }
