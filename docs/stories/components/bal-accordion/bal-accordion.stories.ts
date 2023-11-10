import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import {
  props,
  withRender,
  withContent,
  withDefaultContent,
  withComponentControls,
  StoryFactory,
  lorem1,
} from '../../utils'
import { balBrandIconCarGreen } from '@baloise/design-system-brand-icons'

type Args = JSX.BalAccordion & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Containment/Accordion',
  args: {
    ...withDefaultContent(lorem1),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-accordion' }),
  },
  ...withRender(
    ({ content }) => `<bal-accordion>
  <bal-accordion-summary>
    <bal-stack>
      <bal-icon svg='${balBrandIconCarGreen}' color="auto" size="large"></bal-icon>
      <bal-content>
        <bal-label>Label Heading</bal-label>
        <bal-text size="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos at repellendus
          vitae voluptates
          officiis qui tempore. Veniam ab sed nostrum excepturi dignissimos maxime itaque optio tempore,
          officiis enim, exercitationem ex.
        </bal-text>
      </bal-content>
      <bal-checkbox interface="switch"></bal-checkbox>
      <bal-accordion-trigger></bal-accordion-trigger>
    </bal-stack>
  </bal-accordion-summary>
  <bal-accordion-details>
    <p class="py-medium">${content}</p>
  </bal-accordion-details>
</bal-accordion>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const ButtonAccordion = Story({
  args: {
    card: true,
  },
  ...withRender(
    ({ content, ...args }) => `<bal-card>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
  <bal-accordion ${props(args)}>
    <bal-accordion-details>
      <p class="py-medium">${content}</p>
    </bal-accordion-details>
    <bal-accordion-summary>
      <bal-accordion-trigger button open-icon="edit" open-label="Bearbeiten" close-label="Schliessen" close-icon="close"></bal-accordion-trigger>
    </bal-accordion-summary>
  </bal-accordion>
</bal-card>`,
  ),
})

export const OldVersion = Story({
  args: {
    openIcon: 'edit',
    openLabel: 'Bearbeiten',
    closeLabel: 'Schliessen',
    closeIcon: 'close',
  },
  ...withRender(
    ({ content, ...args }) => `<bal-accordion ${props(args)}>
  <p class="py-medium">${content}</p>
</bal-accordion>`,
  ),
})
