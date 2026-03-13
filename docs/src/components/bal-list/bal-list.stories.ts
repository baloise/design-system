import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  StoryFactory,
  lorem1,
  props,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalList & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/List',
  args: {
    ...withDefaultContent(lorem1),
    border: true,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-list' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<bal-list ${props(args)}>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Title</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>
        ${content}
      </bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Two-line item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item clickable="true">
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item disabled="true">
    <bal-list-item-content>
      <bal-list-item-title>Disabled item</bal-list-item-title>
      <bal-list-item-subtitle>Subtitle</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
</bal-list>
  `,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const UnorderedList = Story({
  ...withRender(
    () => `<div>
  <ul class="unordered-list">
    <li>List Item 1</li>
    <li>List Item 2</li>
  </ul>
  <ul class="unordered-list has-bullet-circle">
    <li>Green Circle List Item 1</li>
    <li>Green Circle List Item 3</li>
  </ul>
  <ul class="unordered-list has-bullet-circle is-purple">
    <li>Purple Circle List Item 1</li>
    <li>Purple Circle List Item 3</li>
  </ul>
  <ul class="unordered-list has-bullet-circle is-red">
    <li>Red Circle List Item 1</li>
    <li>Red Circle List Item 3</li>
  </ul>
  <ul class="unordered-list has-bullet-circle is-yellow">
    <li>Yellow Circle List Item 1</li>
    <li>Yellow Circle List Item 3</li>
  </ul>
  <ul class="unordered-list has-icon-check">
    <li>Checked List Item 1</li>
    <li>Checked List Item 2</li>
  </ul>
  <ul class="unordered-list has-icon-close">
    <li class="opacity-half">Close List Item 1</li>
    <li class="opacity-half">Close List Item 2</li>
  </ul>
  <ul class="unordered-list has-icons">
    <li class="has-icon-check">Checked List Item 1</li>
    <li class="has-icon-check is-success">Green Checked List Item 1</li>
    <li class="has-icon-close opacity-half">Close List Item 2</li>
    <li class="has-icon-close opacity-half is-danger">Red Close List Item 2</li>
  </ul>
</div>
  `,
  ),
})

export const OrderedList = Story({
  ...withRender(
    () => `<div>
  <ol class="ordered-list">
    <li>Mix flour, baking powder, sugar, and salt.</li>
    <li>In another bowl, mix eggs, milk, and oil.</li>
    <li>Stir both mixtures together.</li>
    <li>Fill muffin tray 3/4 full.</li>
  </ol>
  <ol class="ordered-list is-alpha">
    <li>Mix flour, baking powder, sugar, and salt.</li>
    <li>In another bowl, mix eggs, milk, and oil.</li>
    <li>Stir both mixtures together.</li>
    <li>Fill muffin tray 3/4 full.</li>
  </ol>
</div>`,
  ),
})

export const DescriptionList = Story({
  ...withRender(
    () => `<div>
  <dl class="description-list">
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    <dt>Morgawr</dt>
    <dd>A sea serpent</dd>
    <dt>Owlman</dt>
    <dd>A giant owl-like creature.</dd>
  </dl>
</div>`,
  ),
})

export const LinkedList = Story({
  args: {
    border: true,
    content: undefined,
  },
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-list-item clickable="true" href="www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>Internal Link</bal-list-item-title>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item clickable="true" href="www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>External Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="link" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item disabled="true" clickable="true" href="http://www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>Disabled Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>
  `,
  ),
})

export const DownloadList = Story({
  args: {
    border: true,
    size: 'large',
    content: undefined,
  },
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-list-item clickable="true">
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable="true">
    <bal-list-item-icon>
      <bal-icon name="picture"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Picture</bal-list-item-title>
      <bal-list-item-subtitle>PNG - 140KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable="true">
    <bal-list-item-icon>
      <bal-icon name="video"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Video File</bal-list-item-title>
      <bal-list-item-subtitle>MP4 - 61MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable="true">
    <bal-list-item-icon>
      <bal-icon name="audio"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Audio File</bal-list-item-title>
      <bal-list-item-subtitle>MP3 - 3MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item disabled="true">
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Disabled Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right="true">
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>
  `,
  ),
})

export const AccordionList = Story({
  args: {
    border: true,
    size: 'small',
    content: undefined,
  },
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-list-item accordion>
    <bal-list-item-accordion-head accordion-open>
      <bal-list-item-content>
        <bal-list-item-title>
        Wie ermittle ich die Versicherungssumme meines Hausrats?
        </bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body content-space="normal">
    Die Versicherungssumme hängt von der Anzahl Zimmer sowie der Anzahl Personen im Haushalt ab. Ein weiterer wichtiger Punkt ist der Einrichtungsstandard. Geben Sie diese Informationen in unseren Prämienrechner ein. Anhand von Durchschnittswerten erhalten Sie dann einen Vorschlag für die passende Versicherungssumme. Oder nutzen Sie unser Formular «Ermittlung der Versicherungssumme für den Hausrat», um den genauen Betrag zu berechnen.    </bal-list-item-accordion-body>
  </bal-list-item>
  <bal-list-item accordion="true">
    <bal-list-item-accordion-head>
      <bal-list-item-content>
        <bal-list-item-title>
        Was deckt die Haushaltversicherung?
        </bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body content-space="normal">
    Die Haushaltversicherung deckt Schäden an Ihren persönlichen beweglichen Sachen (Hausrat) sowie Schäden, die Sie Drittpersonen zufügen (Haftpflicht). Mit verschiedenen Zusatzdeckungen können Sie den Versicherungsschutz abrunden.
    </bal-list-item-accordion-body>
  </bal-list-item>
</bal-list>
  `,
  ),
})

export const AccordionListNested = Story({
  args: {
    border: true,
    accordionOneLevel: true,
    content: undefined,
  },
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-list-item accordion="true">
    <bal-list-item-accordion-head icon="nav-go-down">
      <bal-list-item-content>
        <bal-list-item-title level="x-large">Switzerland</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body>

      <bal-list border size="small">
        <bal-list-item accordion="true" sub-accordion-item="true">
          <bal-list-item-accordion-head icon="nav-go-down">
            <bal-list-item-content>
              <bal-list-item-title level="large">Basel</bal-list-item-title>
            </bal-list-item-content>
          </bal-list-item-accordion-head>
          <bal-list-item-accordion-body>

            <bal-list border size="small">
              <bal-list-item accordion="true" sub-accordion-item="true">
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
        <bal-list-item accordion="true" sub-accordion-item="true">
          <bal-list-item-accordion-head icon="nav-go-down">
            <bal-list-item-content>
              <bal-list-item-title level="large">Zürich</bal-list-item-title>
            </bal-list-item-content>
          </bal-list-item-accordion-head>
          <bal-list-item-accordion-body>

            <bal-list border size="small">
              <bal-list-item accordion="true" sub-accordion-item="true">
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

  <bal-list-item accordion="true">
    <bal-list-item-accordion-head icon="nav-go-down">
      <bal-list-item-content>
        <bal-list-item-title level="x-large">Belgium</bal-list-item-title>
      </bal-list-item-content>
    </bal-list-item-accordion-head>
    <bal-list-item-accordion-body>
      <bal-list border size="small">
        <bal-list-item accordion="true" sub-accordion-item="true">
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
</bal-list>
  `,
  ),
})

export const AccordionListGrouped = Story({
  args: {
    border: true,
    content: undefined,
  },
  ...withRender(
    ({ ...args }) => `
<div class="columns">
  <div class="column">
    <bal-list ${props(args)}>
      <bal-list-item accordion="true">
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
      <bal-list-item accordion="true">
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
</div>
  `,
  ),
})
