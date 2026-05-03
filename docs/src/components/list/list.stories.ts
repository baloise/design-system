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
  title: 'Components/List',
  args: {
    ...withDefaultContent(lorem1),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-list' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<ds-list ${props(args)}>
  <ds-item label="Item 1"></ds-item>
  <ds-item label="Item 2" description="This is a description for item"></ds-item>
  <ds-item>
    <div slot="content">
      <h5>Item 3</h5>
      <span>This is a description for item</span>
    </div>
  </ds-item>
  <ds-item label="Item 4" description="This is a description for item">
    <ds-icon slot="icon" name="file"></ds-icon>
  </ds-item>
</ds-list>
</ds-list>
  `,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
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
      <ds-icon name="file"></ds-icon>
      <div class="item-content">
        <h5 class="item-title">Item 3</h5>
        <span class="item-text">This is a description for item</span>
      </div>
    </li>
  </ul>
  `,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const LinkedList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<ds-list ${props(args)}>
  <ds-item variant="link" label="Internal Link" href="www.helvetia.com" target="_blank"></ds-item>
  <ds-item
    variant="link"
    action-icon="link-external"
    label="External Link"
    description="Description"
    href="www.helvetia.com"
    target="_blank"
  ></ds-item>
  <ds-item
    disabled
    variant="link"
    action-icon="link-external"
    label="Disabled Link"
    description="Description"
    href="www.helvetia.com"
    target="_blank"
  ></ds-item>
</ds-list>
  `,
  ),
})
LinkedList.storyName = '🧩 Linked List'

export const LinkedListHtml = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
        <ul class="list">
          <li>
            <a class="item" href="www.helvetia.com" target="_blank">
              <span class="item-content">Internal Link</span>
              <ds-icon name="nav-go-right"></ds-icon>
            </a>
          </li>
          <li>
            <a class="item" href="www.helvetia.com" target="_blank">
              <span class="item-content">
                <span class="item-title">External Link</span>
                <span class="item-text">Description</span>
              </span>
              <ds-icon name="link"></ds-icon>
            </a>
          </li>
          <li>
            <a class="item is-disabled" aria-disabled="true" tabindex="-1">
              <span class="item-content">
                <span class="item-title">Disabled Link</span>
                <span class="item-text">Description</span>
              </span>
              <ds-icon name="link" disabled></ds-icon>
            </a>
          </li>
        </ul>
  `,
  ),
})
LinkedListHtml.storyName = '🌍 Linked List'

export const DownloadList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<ds-list ${props(args)}>
  <ds-item variant="button" action-icon="download" label="Document" description="PDF - 98KB">
    <ds-icon name="file" slot="icon"></ds-icon>
  </ds-item>
  <ds-item variant="button" action-icon="download" label="Picture" description="PNG - 140KB">
    <ds-icon name="picture" slot="icon"></ds-icon>
  </ds-item>
  <ds-item variant="button" action-icon="download" label="Video" description="MP4 - 61MB">
    <ds-icon name="video" slot="icon"></ds-icon>
  </ds-item>
  <ds-item variant="button" action-icon="download" label="Audio" description="MP3 - 5MB">
    <ds-icon name="audio" slot="icon"></ds-icon>
  </ds-item>
  <ds-item disabled variant="button" action-icon="download" label="Disabled Document" description="PDF - 98KB">
    <ds-icon name="file" slot="icon"></ds-icon>
  </ds-item>
</ds-list>
  `,
  ),
})
DownloadList.storyName = '🧩 Download List'

export const DownloadListHtml = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
      <ul class="list">
          <li>
            <button class="item">
              <ds-icon name="file"></ds-icon>
              <span class="item-content">
                <span class="item-title">Document</span>
                <span class="item-text">PDF - 98KB</span>
              </span>
              <ds-icon name="download" size="small"></ds-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <ds-icon name="picture"></ds-icon>
              <span class="item-content">
                <span class="item-title">Picture</span>
                <span class="item-text">PNG - 140KB</span>
              </span>
              <ds-icon name="download" size="small"></ds-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <ds-icon name="video"></ds-icon>
              <span class="item-content">
                <span class="item-title">Video</span>
                <span class="item-text">MP4 - 61MB</span>
              </span>
              <ds-icon name="download" size="small"></ds-icon>
            </button>
          </li>
          <li>
            <button class="item">
              <ds-icon name="audio"></ds-icon>
              <span class="item-content">
                <span class="item-title">Audio</span>
                <span class="item-text">MP3 - 5MB</span>
              </span>
              <ds-icon name="download" size="small"></ds-icon>
            </button>
          </li>
          <li>
            <button class="item is-disabled" disabled>
              <ds-icon name="file" disabled></ds-icon>
              <span class="item-content">
                <span class="item-title">Disabled Document</span>
                <span class="item-text">PDF - 98KB</span>
              </span>
              <ds-icon name="download" disabled size="small"></ds-icon>
            </button>
          </li>
        </ul>
  `,
  ),
})
DownloadListHtml.storyName = '🌍 Download List'

export const AccordionList = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<ds-list ${props(args)}>
  <ds-item
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
  </ds-item>
  <ds-item
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
  </ds-item>
</ds-list>
  `,
  ),
})
AccordionList.storyName = '🧩 Accordion List'

export const AccordionListNested = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<ds-list ${props(args)}>
  <ds-item variant="accordion" label="Switzerland" label-level="h4">
    <ds-list slot="accordion-content" class="ml-large">
      <ds-item variant="accordion" label="Bern">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </ds-item>
      <ds-item variant="accordion" label="Zurich">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </ds-item>
      <ds-item variant="accordion" label="Geneva">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </ds-item>
    </ds-list>
  </ds-item>
  <ds-item variant="accordion" label="Belgium" label-level="h4">
    <ds-list slot="accordion-content" class="ml-large">
      <ds-item variant="accordion" label="Brüssel">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
      </ds-item>
      <ds-item variant="accordion" label="Antwerpen">
        <p slot="accordion-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, distinctio laborum. Numquam
          similique amet necessitatibus delectus tempora vitae, aut obcaecati modi quos totam hic reprehenderit
          quo maiores dicta reiciendis illum?
        </p>
    </ds-list>
  </ds-item>
</ds-list>
  `,
  ),
})
AccordionListNested.storyName = '🧩 Accordion List Nested'

export const OrderedList = Story({
  args: {
    ordered: true,
  },
  ...withRender(
    ({ ...args }) => `
        <ds-list ${props(args)}>
          <ds-item variant="link" href="www.helvetia.com" target="_blank">
            <ds-badge color="green" size="lg" slot="icon">
              <ds-icon name="check"></ds-icon>
            </ds-badge>
            <div slot="content">
              <h5>Item 1</h5>
              <span>This is a description for item</span>
            </div>
          </ds-item>

          <ds-item label="Item 2" description="This is a description for item">
            <ds-badge color="purple" size="lg" slot="icon">2</ds-badge>
          </ds-item>

          <ds-item label="Item 3" description="This is a description for item">
            <ds-badge color="purple" size="lg" slot="icon">
              <ds-icon name="document"></ds-icon>
            </ds-badge>
          </ds-item>

          <ds-item label="Item 4" description="This is a description for item" disabled>
            <ds-badge color="purple" size="lg" slot="icon">4</ds-badge>
          </ds-item>
        </ds-list>
  `,
  ),
})
OrderedList.storyName = '🧩 Ordered List'

export const UnorderedListHtml = Story({
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
UnorderedListHtml.storyName = '🌍 Unordered List'

export const OrderedListHtml = Story({
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
OrderedListHtml.storyName = '🌍 Ordered List'

export const DescriptionListHtml = Story({
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
DescriptionListHtml.storyName = '🌍 Description List'
