import docs from './bal-card.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalCard,
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalCardActions,
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
  BalListItemSubtitle,
  BalListItemContent,
  BalListItemIcon,
  BalIcon,
  BalCheckbox,
  BalInput,
  BalInputGroup,
  BalButtonGroup,
  BalText,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalCard,
  subcomponents: { BalCardTitle, BalCardSubtitle, BalCardContent, BalCardActions },
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

export const Teasers = args => ({
  components: {
    ...component.components,
    BalButton,
    BalHeading,
    BalText,
    BalIcon,
    BalInput,
    BalInputGroup,
    BalList,
    BalListItem,
    BalListItemTitle,
    BalListItemSubtitle,
    BalListItemContent,
    BalListItemIcon,
    BalButtonGroup,
  },
  setup: () => ({ args }),
  template: `<div class="columns is-multiline">
  <div class="column is-one-third">
    <bal-card  v-bind="args">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-align-items-center is-justify-content-start is-flex-direction-column">
          <bal-heading level="h4" space="none">Title & Title</bal-heading>
          <bal-heading subtitle level="h5" space="bottom" color="info">Subtitle</bal-heading>
          <img class="mb-4" style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
          <bal-button-group position="center" class="mt-auto">
            <bal-button color="link">Button</bal-button>
            <bal-text bold color="grey" class="is-flex is-align-items-center" style="min-height: 48px">|</bal-text>
            <bal-button color="link">Button</bal-button>
          </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card  v-bind="args">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-align-items-center is-justify-content-start is-flex-direction-column">
          <img class="mb-4" style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
          <bal-heading level="h4" space="bottom">Title & Title</bal-heading>
          <bal-button-group position="center" class="mt-auto">
            <bal-button expanded outlined color="info">Button</bal-button>
          </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card v-bind="args" color="info">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-justify-content-start is-flex-direction-column">
          <bal-heading color="white" level="h4" space="bottom">Title & Title</bal-heading>
          <bal-text color="white" class="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </bal-text>
          <bal-button-group position="center" class="mt-auto">
            <bal-button expanded outlined inverted color="info">Button</bal-button>
          </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card v-bind="args">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-align-items-center is-justify-content-start is-flex-direction-column">
          <img class="mb-4 has-opacity-60" style="max-width: 88px" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
          <bal-heading level="h4" space="bottom" class="has-opacity-60">Title & Title</bal-heading>
          <bal-button-group position="center" class="mt-auto">
            <bal-button outlined color="info">Button</bal-button>
          </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card v-bind="args">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-justify-content-start is-flex-direction-column">
          <div class="is-flex">
            <bal-heading class="is-flex-grow-1" level="h4" space="none">List</bal-heading>
            <a class="is-link">Show All</a>
          </div>
          <bal-list border size="large">
          <bal-list-item clickable href="www.baloise.com" target="_blank">
              <bal-list-item-content>
                  <bal-list-item-title>External Link</bal-list-item-title>
                  <bal-list-item-subtitle>Description</bal-list-item-subtitle>
              </bal-list-item-content>
              <bal-list-item-icon right>
                  <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
              </bal-list-item-icon>
          </bal-list-item>
          <bal-list-item disabled clickable href="http://www.baloise.com" target="_blank">
              <bal-list-item-content>
                  <bal-list-item-title>Disabled Link</bal-list-item-title>
                  <bal-list-item-subtitle>Description</bal-list-item-subtitle>
              </bal-list-item-content>
              <bal-list-item-icon right>
                  <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
              </bal-list-item-icon>
          </bal-list-item>
      </bal-list>
          <bal-button-group position="center" class="mt-auto">
            <bal-button expanded outlined color="info">Button</bal-button>
          </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card v-bind="args">
      <bal-card-content>
        <div style="min-height: 240px;" class="is-flex is-justify-content-start is-flex-direction-column">
          <bal-heading level="h4" space="bottom">Title & Title</bal-heading>
          <bal-input-group>
            <bal-icon size="small" name="search"></bal-icon>
            <bal-input placeholder="Placeholder"></bal-input>
            </bal-input-group>
            <bal-button-group position="center" class="mt-auto">
              <bal-button expanded outlined color="info" class="mt-4">Search</bal-button>
            </bal-button-group>
        </div>
        </bal-card-content>
    </bal-card>
  </div>
</div>
`,
})
Teasers.parameters = { ...component.sourceCode(Teasers) }

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

export const ClickableAndSelected = args => ({
  components: { ...component.components, BalButton, BalHeading },
  setup: () => ({ args }),
  template: `<bal-card v-bind="args">
  <bal-card-content>
    <div class="is-flex is-align-items-center is-justify-content-start is-flex-direction-column">
      <bal-heading level="h4">Hover me</bal-heading>
    </div>
    </bal-card-content>
</bal-card>`,
})
ClickableAndSelected.args = {
  clickable: true,
  selected: true,
}
ClickableAndSelected.parameters = { ...component.sourceCode(ClickableAndSelected) }
