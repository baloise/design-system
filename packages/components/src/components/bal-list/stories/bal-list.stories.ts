import docs from './bal-list.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalList,
  BalListItem,
  BalListItemContent,
  BalListItemIcon,
  BalListItemTitle,
  BalListItemSubtitle,
  BalListItemAccordionHead,
  BalListItemAccordionBody,
  BalIcon,
  BalButton,
} from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  component: BalList,
  subcomponents: {
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemIcon,
    BalListItemTitle,
    BalListItemSubtitle,
    BalListItemAccordionHead,
    BalListItemAccordionBody,
    BalIcon,
    BalButton,
  },
  docs,
  args: {
    disabled: false,
    border: true,
  },
})

export default component.story

const excludedControls = ['inverted']

export const Basic = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Title</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item>
  <bal-list-item-content>
    <bal-list-item-title>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta laudantium voluptatum veritatis nisi,
      neque deserunt repellat quae tempore, ea facere, eaque magni vero incidunt iusto voluptates?
      Minus quis temporibus consequatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Dicta laudantium voluptatum veritatis nisi, neque deserunt repellat quae tempore, ea facere,
      eaque magni vero incidunt iusto voluptates? Minus quis temporibus consequatur?
    </bal-list-item-title>
  </bal-list-item-content>
</bal-list-item>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Two-line item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item clickable>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item disabled>
    <bal-list-item-content>
      <bal-list-item-title>Disabled item</bal-list-item-title>
      <bal-list-item-subtitle>Subtitle</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
</bal-list>`,
})
Basic.args = {
  border: true,
  size: '',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const NativeList = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <ul class="is-list">
    <li>List Item 1</li>
    <li>List Item 2</li>
  </ul>
  <ul class="is-list has-bullet-circle">
    <li>Green Circle List Item 1</li>
    <li>Green Circle List Item 3</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-purple">
    <li>Purple Circle List Item 1</li>
    <li>Purple Circle List Item 3</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-red">
    <li>Red Circle List Item 1</li>
    <li>Red Circle List Item 3</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-yellow">
    <li>Yellow Circle List Item 1</li>
    <li>Yellow Circle List Item 3</li>
  </ul>
  <ol class="is-list">
    <li>Numbered List Item 1</li>
    <li>Numbered List Item 2</li>
  </ol>
  <ul class="is-list has-bullet-check">
    <li>Checked List Item 1</li>
    <li>Checked List Item 2</li>
  </ul>
  <ul class="is-list has-bullet-close">
    <li class="has-opacity-50">Close List Item 1</li>
    <li class="has-opacity-50">Close List Item 2</li>
  </ul>
  <ul class="is-list has-bullets">
    <li class="has-bullet-check">Checked List Item 1</li>
    <li class="has-bullet-check has-bullet-green">Green Checked List Item 1</li>
    <li class="has-bullet-close has-opacity-50">Close List Item 2</li>
    <li class="has-bullet-close has-opacity-50 has-bullet-red">Red Close List Item 2</li>
  </ul>
  <div class="has-background-blue p-x-small">
    <ul class="is-list has-bullets is-inverted">
      <li class="has-bullet-check">Inverted checked List Item 1</li>
      <li class="has-bullet-close has-opacity-50">Inverted close List Item 2</li>
    </ul>
  </div>
</div>`,
})
NativeList.args = {
  border: true,
}
NativeList.parameters = { ...component.sourceCode(NativeList), controls: { exclude: excludedControls } }

export const LinkedList = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item clickable href="www.baloise.com" target="_blank">
  <bal-list-item-content>
    <bal-list-item-title>Internal Link</bal-list-item-title>
  </bal-list-item-content>
  <bal-list-item-icon right>
    <bal-icon name="nav-go-right" size="x-small"></bal-icon>
  </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item clickable href="www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>External Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="link" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item disabled clickable href="http://www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>Disabled Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>`,
})
LinkedList.args = {
  border: true,
}
LinkedList.parameters = { ...component.sourceCode(LinkedList), controls: { exclude: excludedControls } }

export const DownloadList = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="picture"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Picture</bal-list-item-title>
      <bal-list-item-subtitle>PNG - 140KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="video"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Video File</bal-list-item-title>
      <bal-list-item-subtitle>MP4 - 61MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="audio"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Audio File</bal-list-item-title>
      <bal-list-item-subtitle>MP3 - 3MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item disabled>
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Disabled Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>`,
})
DownloadList.args = {
  border: true,
  size: 'large',
}
DownloadList.parameters = { ...component.sourceCode(DownloadList), controls: { exclude: excludedControls } }

export const AccordionList = args => ({
  components: { ...component.components, BalIcon, BalListItemAccordionHead, BalListItemAccordionBody },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item accordion>
    <bal-list-item-accordion-head accordion-open>
      <bal-list-item-content>
        <bal-list-item-title>
        Wie ermittle ich die Versicherungssumme meines Hausrats?</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body content-space="normal">
    Die Versicherungssumme hängt von der Anzahl Zimmer sowie der Anzahl Personen im Haushalt ab. Ein weiterer wichtiger Punkt ist der Einrichtungsstandard. Geben Sie diese Informationen in unseren Prämienrechner ein. Anhand von Durchschnittswerten erhalten Sie dann einen Vorschlag für die passende Versicherungssumme. Oder nutzen Sie unser Formular «Ermittlung der Versicherungssumme für den Hausrat», um den genauen Betrag zu berechnen.    </bal-list-item-accordion-body>
  </bal-list-item>
  <bal-list-item accordion>
    <bal-list-item-accordion-head>
      <bal-list-item-content>
        <bal-list-item-title>Was deckt die Haushaltversicherung?</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body content-space="normal">
    Die Haushaltversicherung deckt Schäden an Ihren persönlichen beweglichen Sachen (Hausrat) sowie Schäden, die Sie Drittpersonen zufügen (Haftpflicht). Mit verschiedenen Zusatzdeckungen können Sie den Versicherungsschutz abrunden.
    </bal-list-item-accordion-body>
</bal-list-item>
</bal-list>`,
})
AccordionList.args = {
  border: true,
  size: 'small',
}
AccordionList.parameters = { ...component.sourceCode(AccordionList), controls: { exclude: excludedControls } }

export const AccordionListNested = args => ({
  components: { ...component.components, BalIcon, BalListItemAccordionHead, BalListItemAccordionBody },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item accordion>
    <bal-list-item-accordion-head icon="nav-go-down">
      <bal-list-item-content>
        <bal-list-item-title level="x-large">Switzerland</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body>

      <bal-list border size="small">
        <bal-list-item accordion sub-accordion-item>
          <bal-list-item-accordion-head icon="nav-go-down">
            <bal-list-item-content>
              <bal-list-item-title level="large">Basel</bal-list-item-title>
            </bal-list-item-content>
          </bal-list-item-accordion-head>
          <bal-list-item-accordion-body>

            <bal-list border size="small">
              <bal-list-item accordion sub-accordion-item>
                <bal-list-item-accordion-head icon="nav-go-down">
                  <bal-list-item-content>
                    <bal-list-item-title>Aeschengraben</bal-list-item-title>
                  </bal-list-item-content>
                </bal-list-item-accordion-head>
                <bal-list-item-accordion-body>
                  <p class="py-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </bal-list-item-accordion-body>
              </bal-list-item>
            </bal-list>

          </bal-list-item-accordion-body>
        </bal-list-item>
        <bal-list-item accordion sub-accordion-item>
          <bal-list-item-accordion-head icon="nav-go-down">
            <bal-list-item-content>
              <bal-list-item-title level="large">Zürich</bal-list-item-title>
            </bal-list-item-content>
          </bal-list-item-accordion-head>
          <bal-list-item-accordion-body>

            <bal-list border size="small">
              <bal-list-item accordion sub-accordion-item>
                <bal-list-item-accordion-head icon="nav-go-down">
                  <bal-list-item-content>
                    <bal-list-item-title level="h5">Limmatplazt</bal-list-item-title>
                  </bal-list-item-content>
                </bal-list-item-accordion-head>
                <bal-list-item-accordion-body>
                  <p class="py-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </bal-list-item-accordion-body>
              </bal-list-item>
            </bal-list>

          </bal-list-item-accordion-body>
        </bal-list-item>
      </bal-list>
    </bal-list-item-accordion-body>
  </bal-list-item>

  <bal-list-item accordion>
    <bal-list-item-accordion-head icon="nav-go-down">
      <bal-list-item-content>
        <bal-list-item-title level="x-large">Belgium</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body>
      <bal-list border size="small">
        <bal-list-item accordion sub-accordion-item>
          <bal-list-item-accordion-head icon="nav-go-down">
            <bal-list-item-content>
              <bal-list-item-title level="large">Brüssel</bal-list-item-title>
            </bal-list-item-content>
          </bal-list-item-accordion-head>
          <bal-list-item-accordion-body>
            <p class="py-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </bal-list-item-accordion-body>
        </bal-list-item>
      </bal-list>
    </bal-list-item-accordion-body>
  </bal-list-item>
</bal-list>`,
})
AccordionListNested.args = {
  border: true,
  accordionOneLevel: true,
}
AccordionListNested.parameters = {
  ...component.sourceCode(AccordionListNested),
  controls: { exclude: excludedControls },
}

export const AccordionListGrouped = args => ({
  components: { ...component.components, BalIcon, BalListItemAccordionHead, BalListItemAccordionBody },
  setup: () => ({ args }),
  template: `<div class="columns">
  <div class="column">
  <bal-list v-bind="args">
  <bal-list-item accordion>
    <bal-list-item-accordion-head>
      <bal-list-item-icon>
        <bal-icon name="account"></bal-icon>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Accordion List Item</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body accordion-group="bubu" content-alignment="space-between">
      <div class="py-normal">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <bal-button color="primary" icon="plus">Primary</bal-button>
      </div>
    </bal-list-item-accordion-body>
  </bal-list-item>
</bal-list>
  </div>
  <div class="column">
  <bal-list v-bind="args">
  <bal-list-item accordion>
    <bal-list-item-accordion-head>
      <bal-list-item-icon>
        <bal-icon name="account"></bal-icon>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Accordion List Item</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body accordion-group="bubu" content-alignment="space-between">
      <div class="py-normal">
        <p class="py-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <bal-button color="primary" icon="plus">Primary</bal-button>
      </div>
    </bal-list-item-accordion-body>
  </bal-list-item>
</bal-list>
  </div>
  </div>`,
})
AccordionListGrouped.args = {
  border: true,
}
AccordionListGrouped.parameters = {
  ...component.sourceCode(AccordionListGrouped),
  controls: { exclude: excludedControls },
}
