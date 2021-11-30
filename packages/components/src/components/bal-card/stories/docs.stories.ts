import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import {
  BalCard,
  BalCardActions,
  BalCardButton,
  BalCardContent,
  BalCardHead,
  BalCardHeading,
  BalCardSteps,
  BalCardSubtitle,
  BalCardTitle,
} from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Card',
  component: BalCard,
  subcomponents: {
    BalCardActions,
    BalCardButton,
    BalCardContent,
    BalCardHead,
    BalCardHeading,
    BalCardSteps,
    BalCardSubtitle,
    BalCardTitle,
  },
  argTypes: generateArgType('bal-card'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalCard },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

  <bal-card-content> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </bal-card-content>

  <bal-card-actions>
    <bal-button>Main Action</bal-button>
    <bal-button color="info" outlined>Secondary Action</bal-button>
  </bal-card-actions>
</bal-card>`,
})

export const WithList = args => ({
  components: { BalCard },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-title>News</bal-card-title>
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

  <bal-card-actions right>
    <bal-button type="is-link">More</bal-button>
  </bal-card-actions>
</bal-card>`,
})

export const WithAccordion = args => ({
  components: { BalCard },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

  <bal-accordion card>
    <p class="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
</bal-card>`,
})

export const Summary = args => ({
  components: { BalCard },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-heading>Insured vehicle</bal-card-heading>
  <bal-card-title>Cupra Ateca</bal-card-title>
  <bal-card-subtitle>Running time: 21.07.2019 - 21.07.2021</bal-card-subtitle>

  <bal-card-content>
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
  </bal-card-content>

  <bal-card-button icon="edit">Edit</bal-card-button>
</bal-card>`,
})

export const Service = args => ({
  components: { BalCard },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-head>
    <img src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
    <div>
      <h4 class="title is-size-4">Baustein Parkschaden <small class="is-hidden-touch">(+ CHF 11.30)</small></h4>
      <h5 class="subtitle is-size-5 is-hidden-desktop">+ CHF 11.30</h5>
      <p class="has-text-blue-light-text is-hidden-touch">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
    </div>
    <bal-checkbox checked interface="switch"></bal-checkbox>
  </bal-card-head>

  <bal-card-content class="is-hidden-desktop">
    <p class="has-text-blue-light-text">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
  </bal-card-content>

  <bal-accordion card open-label="Details einblenden" close-label="Details ausblenden">
    <p class="p-4 has-text-blue-light-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  </bal-accordion>
</bal-card>`,
})
