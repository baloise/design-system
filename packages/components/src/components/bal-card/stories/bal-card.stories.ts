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
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalCardActions,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalCard,
  subcomponents: [BalCardTitle, BalCardSubtitle, BalCardContent, BalCardActions],
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalButton, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
  <bal-card-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>
  <bal-card-actions position="right">
    <bal-button color="info" outlined>Secondary Action</bal-button>
    <bal-button>Main Action</bal-button>
  </bal-card-actions>
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
  template: `<bal-card v-bind="args">
  <bal-card-title>Title</bal-card-title>
  <bal-card-content>
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
  </bal-card-content>
  <bal-card-actions position="right">
    <bal-button color="info" outlined>Secondary Action</bal-button>
    <bal-button>Main Action</bal-button>
  </bal-card-actions>
</bal-card>`,
})
WithList.parameters = { ...component.sourceCode(WithList) }

export const WithAccordion = args => ({
  components: { ...component.components, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
  <bal-accordion card>
    <p class="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
  </bal-card>`,
})
WithAccordion.parameters = { ...component.sourceCode(WithAccordion) }

export const Summary = args => ({
  components: { ...component.components, BalHeading, BalButton, BalData, BalDataItem, BalDataLabel, BalDataValue },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-content class="is-bold has-text-blue">Insured vehicle</bal-card-content>
  <bal-card-title>Cupra Ateca</bal-card-title>
  <bal-card-subtitle>Running time: 21.07.2019 - 21.07.2021</bal-card-subtitle>
  <div class="p-5">
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
  <bal-card-button icon="edit">Edit</bal-card-button>
  </bal-card>`,
})
Summary.parameters = { ...component.sourceCode(Summary) }

export const Service = args => ({
  components: { ...component.components, BalCheckbox, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-content>
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
  </bal-card-content>
  <bal-accordion card open-label="Show more" close-label="Show less">
  <p class="p-5 has-text-blue-light-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
  </p>
  </bal-accordion>
</bal-card>`,
})
Service.parameters = { ...component.sourceCode(Service) }
