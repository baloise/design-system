import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory, newCodeSandboxFile } from '../../utils'

type Args = JSX.BalSelect & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Select',
  args: {
    value: 'v2000',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-select' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-select ${props(args)}>
    <bal-select-option value="v1995" label="1995">1995</bal-select-option>
    <bal-select-option value="v1996" label="1996">1996</bal-select-option>
    <bal-select-option value="v1997" label="1997">1997</bal-select-option>
    <bal-select-option value="v1998" label="1998">1998</bal-select-option>
    <bal-select-option value="v1999" label="1999 Option with long text Option with long text">1999 Option with long text Option with long text</bal-select-option>
    <bal-select-option value="v2000" label="2000">2000</bal-select-option>
</bal-select>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FieldControl = Story({
  args: {
    value: 'v2000',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-select ${props(args)}>
            <bal-select-option value="v1995" label="1995">1995</bal-select-option>
            <bal-select-option value="v1996" label="1996">1996</bal-select-option>
            <bal-select-option value="v1997" label="1997">1997</bal-select-option>
            <bal-select-option value="v1998" label="1998">1998</bal-select-option>
            <bal-select-option value="v1999" label="1999">1999</bal-select-option>
            <bal-select-option value="v2000" label="2000">2000</bal-select-option>
        </bal-select>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const Typeahead = Story({
  args: {
    noDataLabel: 'No option available',
    placeholder: 'Try finding your hero',
    typeahead: true,
    value: undefined,
  },
  ...withRender(
    ({ ...args }) => `<bal-select ${props(args)}>
    <bal-select-option value="BlackWidow" label="Black Widow">
        <b style="display: block">Black Widow</b>
        <span class="is-size-small">S.H.I.E.L.D.</span>
    </bal-select-option>
    <bal-select-option value="BlackPanter" label="Black Panter">
        <b style="display: block">Black Panter</b>
        <span class="is-size-small">Wakanda</span>
    </bal-select-option>
    <bal-select-option value="IronMan" label="Iron Man">
        <b style="display: block">Iron Man</b>
        <span class="is-size-small">Malibu</span>
    </bal-select-option>
    <bal-select-option value="SpiderMan" label="Spider Man">
        <b style="display: block">Spider Man</b>
        <span class="is-size-small">Queens</span>
    </bal-select-option>
    <bal-select-option value="CaptainAmerica" label="Captain America">
        <b style="display: block">Captain America</b>
        <span class="is-size-small">Broklyn</span>
    </bal-select-option>
    <bal-select-option value="Thor" label="Thor God of Thunder">
        <b style="display: block">Thor God of Thunder</b>
        <span class="is-size-small">Asgard</span>
    </bal-select-option>
</bal-select>`,
  ),
})

import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'

export const TypeaheadRemote = Story({
  parameters: {
    balCodeSandbox: {
      files: {
        ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
        ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
      },
    },
  },
  args: {
    typeahead: true,
    remote: true,
    loading: true,
    selectionOptional: true,
    value: 'Ticino',
    placeholder: 'Try finding your canton',
    disabled: false,
  },
})

export const MultiSelect = Story({
  args: {
    value: 'SpiderMan,IronMan',
    placeholder: 'Try finding your hero',
    multiple: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-select ${props(args)}>
    <bal-select-option value="BlackWidow" label="Black Widow">
        <b style="display: block">Black Widow</b>
        <span class="is-size-small">S.H.I.E.L.D.</span>
    </bal-select-option>
    <bal-select-option value="BlackPanter" label="Black Panter">
        <b style="display: block">Black Panter</b>
        <span class="is-size-small">Wakanda</span>
    </bal-select-option>
    <bal-select-option value="IronMan" label="Iron Man">
        <b style="display: block">Iron Man</b>
        <span class="is-size-small">Malibu</span>
    </bal-select-option>
    <bal-select-option value="SpiderMan" label="Spider Man">
        <b style="display: block">Spider Man</b>
        <span class="is-size-small">Queens</span>
    </bal-select-option>
    <bal-select-option value="CaptainAmerica" label="Captain America">
        <b style="display: block">Captain America</b>
        <span class="is-size-small">Broklyn</span>
    </bal-select-option>
    <bal-select-option value="Thor" label="Thor God of Thunder">
        <b style="display: block">Thor God of Thunder</b>
        <span class="is-size-small">Asgard</span>
    </bal-select-option>
</bal-select>`,
  ),
})
export const NativeSelect = Story({
  ...withRender(
    () => `<div class="field">
    <label class="label">Subject</label>
    <div class="control">
        <div class="select">
            <select>
                <option>Select dropdown</option>
                <option>With options</option>
            </select>
        </div>
    </div>
</div>
<div class="field">
    <label class="label is-disabled">Subject</label>
    <div class="control">
        <div class="select is-disabled">
            <select>
                <option>Select dropdown</option>
                <option>With options</option>
            </select>
        </div>
    </div>
</div>
<div class="field">
    <label class="label is-success">Subject</label>
    <div class="control">
        <div class="select is-success">
            <select>
                <option>Select dropdown</option>
                <option>With options</option>
            </select>
        </div>
    </div>
</div>
<div class="field">
    <label class="label is-danger">Subject</label>
    <div class="control">
        <div class="select is-danger">
            <select>
                <option>Select dropdown</option>
                <option>With options</option>
            </select>
        </div>
    </div>
</div>`,
  ),
})
