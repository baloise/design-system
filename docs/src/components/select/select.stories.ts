import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSelect

const meta: Meta<Args> = {
  title: 'Components/Select/Variants',
  args: {
    label: 'Country',
    description: 'Select your country of residence',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-select' }),
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-basic" ${props(args)}></ds-select>
      <script>
        document.querySelector('#select-basic').options = [
          { label: 'Switzerland', value: 'ch' },
          { label: 'Germany', value: 'de' },
          { label: 'Austria', value: 'at' },
          { label: 'France', value: 'fr' },
          { label: 'Italy', value: 'it' },
        ]
      </script>
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
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    ({ ...args }) => `
      <div class="field">
        <label class="label" for="select-basic-html">${args.label}</label>
        <div class="control">
          <select class="select" id="select-basic-html" aria-describedby="select-basic-html-help">
            <option value="">-- Choose an option --</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help" id="select-basic-html-help">${args.description}</span>
      </div>
    `,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Searchable = Story({
  args: {
    label: 'Country',
    description: 'Type to filter countries',
    searchable: true,
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-searchable" ${props(args)}></ds-select>
      <script>
        document.querySelector('#select-searchable').options = [
          { label: 'Switzerland', value: 'ch' },
          { label: 'Germany', value: 'de' },
          { label: 'Austria', value: 'at' },
          { label: 'France', value: 'fr' },
          { label: 'Italy', value: 'it' },
        ]
      </script>
    `,
  ),
})
Searchable.storyName = '🧩 Searchable'

export const Clearable = Story({
  args: {
    label: 'Country',
    description: 'Select your country of residence',
    clearable: true,
    value: 'it',
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-clearable" ${props(args)}></ds-select>
      <script>
        document.querySelector('#select-clearable').options = [
          { label: 'Switzerland', value: 'ch' },
          { label: 'Germany', value: 'de' },
          { label: 'Austria', value: 'at' },
          { label: 'France', value: 'fr' },
          { label: 'Italy', value: 'it' },
        ]
      </script>
    `,
  ),
})
Clearable.storyName = '🧩 Clearable'

export const Multiple = Story({
  args: {
    label: 'Languages',
    description: 'Select all languages you speak',
    multiple: true,
    value: 'it,en',
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-multiple" ${props(args)}></ds-select>
      <script>
        document.querySelector('#select-multiple').options = [
          { label: 'German', value: 'de' },
          { label: 'French', value: 'fr' },
          { label: 'Italian', value: 'it' },
          { label: 'English', value: 'en' },
          { label: 'Romansh', value: 'rm' },
        ]
      </script>
    `,
  ),
})
Multiple.storyName = '🧩 Multiple'

export const Grouped = Story({
  args: {
    label: 'Location',
    description: 'Select a city',
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-grouped" ${props(args)}></ds-select>
      <script>
        document.querySelector('#select-grouped').optionGroups = [
          {
            label: 'Switzerland',
            options: [
              { label: 'Zurich', value: 'ch-zh' },
              { label: 'Basel', value: 'ch-bs' },
              { label: 'Bern', value: 'ch-be' },
            ],
          },
          {
            label: 'Germany',
            options: [
              { label: 'Berlin', value: 'de-be' },
              { label: 'Munich', value: 'de-mu' },
              { label: 'Hamburg', value: 'de-ha' },
            ],
          },
        ]
      </script>
    `,
  ),
})
Grouped.storyName = '🧩 Grouped'
