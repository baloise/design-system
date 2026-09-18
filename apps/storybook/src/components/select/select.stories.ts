import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSelect

const meta: Meta<Args> = {
  title: 'Components/Forms/Select/Variants',
  args: {
    label: 'Country',
    description: 'Select your country of residence',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-select' }),
  },
  ...withRender(
    ({ ...args }) => `
      <ds-select id="select-basic" ${props(args)}>
        <ds-select-option value="ch">Switzerland</ds-select-option>
        <ds-select-option value="de">Germany</ds-select-option>
        <ds-select-option value="at">Austria</ds-select-option>
        <ds-select-option value="fr">France</ds-select-option>
        <ds-select-option value="it">Italy</ds-select-option>
      </ds-select>
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
      <div class="ds-field">
        <label class="ds-label" for="select-basic-html">${args.label}</label>
        <div class="ds-control">
          <select class="ds-select" id="select-basic-html" aria-describedby="select-basic-html-help">
            <option value="">-- Choose an option --</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="ds-help" id="select-basic-html-help">${args.description}</span>
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
      <ds-select id="select-searchable" ${props(args)}>
        <ds-select-option value="ch">Switzerland</ds-select-option>
        <ds-select-option value="de">Germany</ds-select-option>
        <ds-select-option value="at">Austria</ds-select-option>
        <ds-select-option value="fr">France</ds-select-option>
        <ds-select-option value="it">Italy</ds-select-option>
      </ds-select>
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
      <ds-select id="select-clearable" ${props(args)}>
        <ds-select-option value="ch">Switzerland</ds-select-option>
        <ds-select-option value="de">Germany</ds-select-option>
        <ds-select-option value="at">Austria</ds-select-option>
        <ds-select-option value="fr">France</ds-select-option>
        <ds-select-option value="it">Italy</ds-select-option>
      </ds-select>
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
      <ds-select id="select-multiple" ${props(args)}>
        <ds-select-option value="de">German</ds-select-option>
        <ds-select-option value="fr">French</ds-select-option>
        <ds-select-option value="it">Italian</ds-select-option>
        <ds-select-option value="en">English</ds-select-option>
        <ds-select-option value="rm">Romansh</ds-select-option>
      </ds-select>
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
      <ds-select id="select-grouped" ${props(args)}>
        <ds-select-optgroup label="Switzerland">
          <ds-select-option value="ch-zh">Zurich</ds-select-option>
          <ds-select-option value="ch-bs">Basel</ds-select-option>
          <ds-select-option value="ch-be">Bern</ds-select-option>
        </ds-select-optgroup>
        <ds-select-optgroup label="Germany">
          <ds-select-option value="de-be">Berlin</ds-select-option>
          <ds-select-option value="de-mu">Munich</ds-select-option>
          <ds-select-option value="de-ha">Hamburg</ds-select-option>
        </ds-select-optgroup>
      </ds-select>
    `,
  ),
})
Grouped.storyName = '🧩 Grouped'
