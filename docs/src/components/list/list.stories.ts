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
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-list' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<bal-list ${props(args)}>
  <bal-item label="Item 1"></bal-item>
  <bal-item label="Item 2" description="This is a description for item"></bal-item>
  <bal-item>
    <div slot="content">
      <h5>Item 3</h5>
      <span>This is a description for item</span>
    </div>
  </bal-item>
  <bal-item label="Item 4" description="This is a description for item">
    <bal-icon slot="icon" name="file"></bal-icon>
  </bal-item>
</bal-list>
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

export const CssBasic = Story({
  ...withRender(
    ({ content, ...args }) => ` <ul class="list">
    <li class="item">
      <h5 class="item-title">Item 2</h5>
    </li>
    <li class="item">
      <div class="item-content">
        <h5 class="item-title">Item 2</h5>
        <span class="item-text">This is a description for item</span>
      </div>
    </li>
    <li class="item">
      <div class="item-content">
        <h5 class="item-title">Item 3</h5>
        <span class="item-text">This is a description for item</span>
      </div>
    </li>
    <li class="item">
      <bal-icon name="file"></bal-icon>
      <div class="item-content">
        <h5 class="item-title">Item 3</h5>
        <span class="item-text">This is a description for item</span>
      </div>
    </li>
  </ul>
  `,
  ),
})

export const LinkedList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-item variant="link" label="Internal Link" href="www.baloise.com" target="_blank"></bal-item>
  <bal-item
    variant="link"
    action-icon="link-external"
    label="External Link"
    description="Description"
    href="www.baloise.com"
    target="_blank"
  ></bal-item>
  <bal-item
    disabled
    variant="link"
    action-icon="link-external"
    label="Disabled Link"
    description="Description"
    href="www.baloise.com"
    target="_blank"
  ></bal-item>
</bal-list>
  `,
  ),
})

export const LinkedListCss = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
        <ul class="list">
          <li>
            <a class="item" href="www.baloise.com" target="_blank">
              <span class="item-content">Internal Link</span>
              <bal-icon name="nav-go-right"></bal-icon>
            </a>
          </li>
          <li>
            <a class="item" href="www.baloise.com" target="_blank">
              <span class="item-content">
                <span class="item-title">External Link</span>
                <span class="item-text">Description</span>
              </span>
              <bal-icon name="link"></bal-icon>
            </a>
          </li>
          <li>
            <a class="item is-disabled" aria-disabled="true" tabindex="-1">
              <span class="item-content">
                <span class="item-title">Disabled Link</span>
                <span class="item-text">Description</span>
              </span>
              <bal-icon name="link" disabled></bal-icon>
            </a>
          </li>
        </ul>
  `,
  ),
})

export const DownloadList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-item variant="button" action-icon="download" label="Document" description="PDF - 98KB">
    <bal-icon name="file" slot="icon"></bal-icon>
  </bal-item>
  <bal-item variant="button" action-icon="download" label="Picture" description="PNG - 140KB">
    <bal-icon name="picture" slot="icon"></bal-icon>
  </bal-item>
  <bal-item variant="button" action-icon="download" label="Video" description="MP4 - 61MB">
    <bal-icon name="video" slot="icon"></bal-icon>
  </bal-item>
  <bal-item variant="button" action-icon="download" label="Audio" description="MP3 - 5MB">
    <bal-icon name="audio" slot="icon"></bal-icon>
  </bal-item>
  <bal-item disabled variant="button" action-icon="download" label="Disabled Document" description="PDF - 98KB">
    <bal-icon name="file" slot="icon"></bal-icon>
  </bal-item>
</bal-list>
  `,
  ),
})

export const DownloadListCss = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
      <ul class="list">
          <li>
            <button class="item">
              <bal-icon name="file"></bal-icon>
              <span class="item-content">
                <span class="item-title">Document</span>
                <span class="item-text">PDF - 98KB</span>
              </span>
              <bal-icon name="download" size="small"></bal-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <bal-icon name="picture"></bal-icon>
              <span class="item-content">
                <span class="item-title">Picture</span>
                <span class="item-text">PNG - 140KB</span>
              </span>
              <bal-icon name="download" size="small"></bal-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <bal-icon name="video"></bal-icon>
              <span class="item-content">
                <span class="item-title">Video</span>
                <span class="item-text">MP4 - 61MB</span>
              </span>
              <bal-icon name="download" size="small"></bal-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <bal-icon name="audio"></bal-icon>
              <span class="item-content">
                <span class="item-title">Audio</span>
                <span class="item-text">MP3 - 5MB</span>
              </span>
              <bal-icon name="download" size="small"></bal-icon>
            </button>
          </li>
          <li>
            <button class="item is-disabled" disabled>
              <bal-icon name="file" disabled></bal-icon>
              <span class="item-content">
                <span class="item-title">Disabled Document</span>
                <span class="item-text">PDF - 98KB</span>
              </span>
              <bal-icon name="download" disabled size="small"></bal-icon>
            </button>
          </li>
        </ul>
  `,
  ),
})

export const AccordionList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-item
    accordion-group="group1"
    variant="accordion"
    label="Wie ermittle ich die Versicherungssumme meines Hausrats?"
  >
    <p slot="accordion-content">
      Die Versicherungssumme hängt von der Anzahl Zimmer sowie der Anzahl Personen im Haushalt ab. Ein weiterer
      wichtiger Punkt ist der Einrichtungsstandard. Geben Sie diese Informationen in unseren Prämienrechner ein.
      Anhand von Durchschnittswerten erhalten Sie dann einen Vorschlag für die passende Versicherungssumme. Oder
      nutzen Sie unser Formular «Ermittlung der Versicherungssumme für den Hausrat», um den genauen Betrag zu
      berechnen.
    </p>
  </bal-item>
  <bal-item
    accordion-group="group1"
    accordion-marker="plus-minus"
    variant="accordion"
    label="Wie ermittle ich die Versicherungssumme meines Hausrats?"
  >
    <p slot="accordion-content">
      Die Versicherungssumme hängt von der Anzahl Zimmer sowie der Anzahl Personen im Haushalt ab. Ein weiterer
      wichtiger Punkt ist der Einrichtungsstandard. Geben Sie diese Informationen in unseren Prämienrechner ein.
      Anhand von Durchschnittswerten erhalten Sie dann einen Vorschlag für die passende Versicherungssumme. Oder
      nutzen Sie unser Formular «Ermittlung der Versicherungssumme für den Hausrat», um den genauen Betrag zu
      berechnen.
    </p>
  </bal-item>
</bal-list>
  `,
  ),
})

export const AccordionListNested = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<bal-list ${props(args)}>
  <bal-item variant="accordion" label="Switzerland" label-level="h4">
    <bal-list slot="accordion-content" class="ml-large">
      <bal-item variant="accordion" label="Bern">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </bal-item>
      <bal-item variant="accordion" label="Zurich">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </bal-item>
      <bal-item variant="accordion" label="Geneva">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </bal-item>
    </bal-list>
  </bal-item>
  <bal-item variant="accordion" label="Belgium" label-level="h4">
    <bal-list slot="accordion-content" class="ml-large">
      <bal-item variant="accordion" label="Brüssel">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </bal-item>
      <bal-item variant="accordion" label="Antwerpen">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
    </bal-list>
  </bal-item>
</bal-list>
  `,
  ),
})

export const OrderedList = Story({
  args: {
    ordered: true,
  },
  ...withRender(
    ({ ...args }) => `
        <bal-list ${props(args)}>
          <bal-item variant="link" href="www.baloise.com" target="_blank">
            <bal-badge color="green" size="lg" slot="icon">
              <bal-icon name="check"></bal-icon>
            </bal-badge>
            <div slot="content">
              <h5>Item 1</h5>
              <span>This is a description for item</span>
            </div>
          </bal-item>

          <bal-item label="Item 2" description="This is a description for item">
            <bal-badge color="purple" size="lg" slot="icon">2</bal-badge>
          </bal-item>

          <bal-item label="Item 3" description="This is a description for item">
            <bal-badge color="purple" size="lg" slot="icon">
              <bal-icon name="document"></bal-icon>
            </bal-badge>
          </bal-item>

          <bal-item label="Item 4" description="This is a description for item" disabled>
            <bal-badge color="purple" size="lg" slot="icon">4</bal-badge>
          </bal-item>
        </bal-list>
  `,
  ),
})

export const UnorderedListCss = Story({
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

export const OrderedListCss = Story({
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

export const DescriptionListCss = Story({
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
