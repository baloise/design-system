import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsDate

const meta: Meta<Args> = {
  title: 'Components/Date/Variants',
  args: {
    label: 'Label',
    description: 'Description',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-date' }),
  },
  ...withRender(({ ...args }) => `<ds-date ${props(args)}></ds-date>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    label: 'Date of birth',
    description: 'Enter your date of birth',
    required: false,
  },
})
Basic.storyName = '🧩 Basic'

export const MinMax = Story({
  args: {
    label: 'Date',
    description: '2024-01-04 to 2024-12-24',
    min: '2024-01-04',
    max: '2024-12-24',
  },
})
MinMax.storyName = '🧩 Min & Max'

export const FreeSolo = Story({
  args: {
    label: 'Date',
    description: 'Without picker',
    freeSolo: true,
  },
})
FreeSolo.storyName = '🧩 Free Solo'

export const DefaultDate = Story({
  args: {
    label: 'Date',
    description: 'Where to start',
    defaultDate: '2024-02-20',
  },
})
DefaultDate.storyName = '🧩 Default Date'

export const AllowedDates = Story({
  render: () => `
    <ds-date id="allowed-dates" label="Label" description="Only even days are selectable"></ds-date>
    <script>
      const date = document.querySelector('#allowed-dates')
      date.allowedDates = dateString => {
        const d = new Date(dateString + 'T00:00')
        return d.getDate() % 2 === 0
      }
    </script>
  `,
})
AllowedDates.storyName = '🧩 Allowed Dates'

export const Disabled = Story({
  args: {
    label: 'Date',
    description: 'Description',
    disabled: true,
    value: '2026-07-13',
  },
})
Disabled.storyName = '🧩 Disabled'

export const Inline = Story({
  args: {
    label: 'Date',
    description: 'Description',
    inline: true,
  },
})
Inline.storyName = '🧩 Inline'
