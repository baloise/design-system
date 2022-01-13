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
  args: {
    color: '',
    flat: false,
    square: false,
  },
})

export default component.story

const excludedControls = ['inverted', 'flatMobile']

export const Basic = args => ({
  components: { ...component.components, BalButton, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args" class="p-5">
  <bal-heading level="h5" space="none">BaloiseCombi</bal-heading>
  <p>Police number 70/2.937.458</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
  <bal-button-group position="right" class="mt-6">
    <bal-button color="info" outlined>Secondary Action</bal-button>
    <bal-button>Main Action</bal-button>
  </bal-button-group>
</bal-card>`,
})
Basic.args = {
  color: '',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const ServiceCard = args => ({
  components: { ...component.components, BalButton, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args" class="p-5">
  <bal-heading level="h5" space="none">BaloiseCombi</bal-heading>
  <p>Police number 70/2.937.458</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
  <bal-button-group position="right" class="mt-6">
    <bal-button color="info" outlined>Secondary Action</bal-button>
    <bal-button>Main Action</bal-button>
  </bal-button-group>
</bal-card>`,
})
ServiceCard.args = {
  color: 'grey',
  flat: true,
  square: true,
}
ServiceCard.parameters = { ...component.sourceCode(ServiceCard), controls: { exclude: excludedControls } }

export const ListCard = args => ({
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
  <bal-heading title level="h5" space="bottom">Title</bal-heading>
  <bal-list border class="mt-4">
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
  <bal-button-group position="right" class="mt-6">
    <bal-button type="is-link">More</bal-button>
  </bal-button-group>
</bal-card>`,
})
ListCard.parameters = { ...component.sourceCode(ListCard), controls: { exclude: excludedControls } }

export const AccordionCard = args => ({
  components: { ...component.components, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <bal-heading level="h5" space="none">BaloiseCombi</bal-heading>
    <p>Police number 70/2.937.458</p>
  </div>
  <bal-accordion card>
    <p class="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
  </bal-card>`,
})
AccordionCard.parameters = { ...component.sourceCode(AccordionCard) }

export const SummaryCard = args => ({
  components: { ...component.components, BalHeading, BalButton, BalData, BalDataItem, BalDataLabel, BalDataValue },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <bal-heading level="h6" space="none">Insured vehicle</bal-heading>
    <bal-heading level="h5" space="none">Cupra Ateca</bal-heading>
    <p>
      Running time: 21.07.2019 - 21.07.2021
    </p>
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

  <bal-button color="primary-light" bottom-rounded icon="edit" expanded>Edit</bal-button>
  </bal-card>`,
})
SummaryCard.args = {
  flat: true,
  border: true,
}
SummaryCard.parameters = { ...component.sourceCode(SummaryCard), controls: { exclude: excludedControls } }

export const PackageCard = args => ({
  components: { ...component.components, BalCheckbox, BalAccordion, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <div class="p-5">
    <div class="is-flex is-justify-content-center	is-align-items-center">
      <img class="is-hidden-touch" style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
      <div class="is-flex-grow-1 px-3">
        <bal-heading level="h5" space="none">Baustein Parkschaden <small class="is-hidden-touch">(+ CHF 11.30)</small></bal-heading>
        <bal-text space="none" class="is-hidden-desktop">+ CHF 11.30</bal-text>
        <bal-text class="is-hidden-touch" space="none">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</bal-text>
      </div>
      <bal-checkbox :value="true" interface="switch"></bal-checkbox>
    </div>
    <div class="is-hidden-desktop my-5 has-background-grey-1 p-1 is-flex is-justify-content-center">
      <img class="" style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
    </div>
    <bal-text space="all" class="is-hidden-desktop">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</bal-text>
  </div>
  <bal-accordion card open-label="Details einblenden" close-label="Details ausblenden">
  <p class="p-5">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
  </p>
  </bal-accordion>

</bal-card>`,
})
PackageCard.parameters = { ...component.sourceCode(PackageCard), controls: { exclude: excludedControls } }
