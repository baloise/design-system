import { BrandIconCarGreen } from '@baloise/ds-assets/dist'
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

type Args = JSX.BalAccordion & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Containment/Accordion',
  args: {
    ...withDefaultContent(lorem1),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-accordion' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<ds-accordion ${props(args)}>
  <div slot="summary">Details</div>
  <div slot="content" class="py-base">${content}</div>
</ds-accordion>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    summaryTitle: true,
  },
})

export const PlusMarkerAccordion = Story({
  args: {
    marker: 'plus',
    summaryTitle: true,
  },
})

export const LeftMarkerAccordion = Story({
  args: {
    marker: 'plus-minus',
    markerPosition: 'left',
    summaryTitle: true,
  },
})

export const StackAccordion = Story({
  args: {},
  ...withRender(
    ({ content, ...args }) => `
<ds-card>
  <ds-card-content>
    <ds-accordion ${props(args)}>
      <div slot="summary" class="stack as-row">
        <ds-icon
          svg='&lt;svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" focusable="false" aria-hidden="true"&gt;&lt;path fill="none" d="M0 0h40v40H0z"/&gt;&lt;g&gt;&lt;path d="M27 28h5v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1zM8 28h5v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" fill="#000d6e"/&gt;&lt;rect x="31" y="14" width="3" height="2" rx="0.5" fill="#1b5951"/&gt;&lt;rect x="6" y="14" width="3" height="2" rx="0.5" fill="#1b5951"/&gt;&lt;path d="m31.69 20-1-3H9.33l-1 3A3.9 3.9 0 0 0 8 21.54V27h24v-5.46a3.9 3.9 0 0 0-.31-1.54M11.5 24a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5m17 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5" fill="#1b5951"/&gt;&lt;path d="M27.77 9.85A3 3 0 0 0 25 8H15a3 3 0 0 0-2.77 1.85L9.67 16h20.66Z" fill="#94e3d4"/&gt;&lt;/g&gt;&lt;/svg&gt;'
          tile
          tile-color="green"
          color="auto"
          size="lg"
          class="align-self-start"
        ></ds-icon>
        <div class="stack-content">
          <h5 class="title">Label Heading</h5>
          <span class="text is-sm">${content}</span>
        </div>
        <ds-switch></ds-switch>
      </div>
      <div slot="content" class="py-base">
        ${content}
        ${content}
      </div>
    </ds-accordion>
  </ds-card-content>
</ds-card>`,
  ),
})

export const AccordionGroup = Story({
  args: {},
  ...withRender(
    ({ content, ...args }) => `
<ds-accordion group="accordion-group">
  <div slot="summary">Accordion 1</div>
  <div slot="content" class="py-base bg-purple-2">${content}</div>
</ds-accordion>
<hr class="divider" />
<ds-accordion group="accordion-group">
  <div slot="summary">Accordion 2</div>
  <div slot="content" class="py-base bg-yellow-2">${content}</div>
</ds-accordion>
<hr class="divider" />
<ds-accordion group="accordion-group" open>
  <div slot="summary">Accordion 3</div>
  <div slot="content" class="py-base bg-red-2">${content}</div>
</ds-accordion>`,
  ),
})

export const AccordionButton = Story({
  args: {
    button: true,
    buttonExpanded: true,
    buttonColor: 'secondary',
    buttonLabelOpen: 'edit',
    buttonLabelClose: 'close',
  },
})
