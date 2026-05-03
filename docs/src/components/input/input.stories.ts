import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsInput

const tag = 'ds-input'

const meta: Meta<Args> = {
  title: 'Components/Forms/Input',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-input ${props(args)}></ds-input>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `
<ds-input label="Label" description="Description" placeholder="Enter a text"></ds-input>
<ds-input label="Label" description="Description" placeholder="Enter a text" required="false"></ds-input>
`,
  ),
})
Basic.storyName = `🧩 Basic`

export const BasicHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label" for="input-basic">Label</label>
  <div class="control">
    <input id="input-basic" class="input" placeholder="Enter a text" aria-describedby="help-basic" />
  </div>
  <p id="help-basic" class="help">Description</p>
</div>
`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-input label="Label" description="Description" placeholder="Placeholder" disabled></ds-input>
<ds-input label="Label" description="Description" value="Value" disabled></ds-input>
`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<div class="field is-disabled">
  <label class="label" for="input-disabled-1">Name</label>
  <div class="control">
    <input id="input-disabled-1" class="input" placeholder="Placeholder" disabled aria-describedby="help-disabled-1" />
  </div>
  <p id="help-disabled-1" class="help">This username is available</p>
</div>

<div class="field is-disabled">
  <label class="label" for="input-disabled-2">Name</label>
  <div class="control">
    <input id="input-disabled-2" class="input" value="Value" disabled aria-describedby="help-disabled-2" />
  </div>
  <p id="help-disabled-2" class="help">This username is available</p>
</div>
`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-input label="Label" description="Description" value="Value" invalid-text="Validation Error 3" invalid></ds-input>
`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<div class="field is-danger">
  <label class="label" for="input-invalid">Name</label>
  <div class="control">
    <input id="input-invalid" class="input" value="Value" aria-invalid="true" aria-describedby="help-invalid" />
  </div>
  <p id="help-invalid" class="help">This username is available</p>
</div>
`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Valid = Story({
  ...withRender(
    () => `
<ds-input label="Label" description="Description" value="Value" color="success"></ds-input>
`,
  ),
})
Valid.storyName = '🧩 Valid'

export const ValidHtml = Story({
  ...withRender(
    () => `
<div class="field is-success">
  <label class="label" for="input-valid">Name</label>
  <div class="control">
    <input id="input-valid" class="input" value="Value" aria-describedby="help-valid" />
  </div>
  <p id="help-valid" class="help">This username is available</p>
</div>
`,
  ),
})
ValidHtml.storyName = '🌍 Valid'

export const Loading = Story({
  ...withRender(
    () => `
<ds-input label="Label" loading></ds-input>
<ds-input label="Label" loading disabled></ds-input>
`,
  ),
})
Loading.storyName = '🧩 Loading'

export const LoadingHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label" for="input-loading-1">Name</label>
  <div class="control">
    <input id="input-loading-1" class="input" aria-describedby="help-loading-1" />
    <ds-spinner size="sm" variation="circle"></ds-spinner>
  </div>
  <p id="help-loading-1" class="help"></p>
</div>

<div class="field is-disabled">
  <label class="label" for="input-loading-2">Name</label>
  <div class="control">
    <input id="input-loading-2" class="input" aria-describedby="help-loading-2" />
    <ds-spinner size="sm" variation="circle"></ds-spinner>
  </div>
  <p id="help-loading-2" class="help"></p>
</div>
`,
  ),
})
LoadingHtml.storyName = '🌍 Loading'

export const Suffix = Story({
  ...withRender(
    () => `
<ds-input label="Label" suffix="CHF" value="100"></ds-input>
<ds-input label="Label" value="100">
  <span slot="start" class="tag is-sm is-square">CHF</span>
</ds-input>
<ds-input label="Label" value="100">
  <ds-button slot="end" size="sm">Click</ds-button>
</ds-input>
`,
  ),
})
Suffix.storyName = '🧩 Suffix'

export const SuffixHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label">Label</label>
  <div class="control">
    <span class="tag is-sm">Start</span>
    <input class="input" value="100" />
    <span class="tag is-sm">End</span>
  </div>
</div>
`,
  ),
})
SuffixHtml.storyName = '🌍 Suffix'

export const NumberType = Story({
  ...withRender(
    () => `
<ds-input type="number" label="Age" value="30"></ds-input>
`,
  ),
})
NumberType.storyName = '🧩 Number Type'

export const NumberTypeHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label">Age</label>
  <div class="control">
    <input type="number" class="input" value="30" />
  </div>
</div>
`,
  ),
})
NumberTypeHtml.storyName = '🌍 Number Type'

export const Slots = Story({
  ...withRender(
    () => `
<ds-input value="Value">
  <span slot="label">Slot Label</span>
  <span slot="start" class="tag is-sm is-square">START</span>
  <span slot="end" class="tag is-sm is-square">END</span>
  <span slot="description">Slot description</span>
</ds-input>
`,
  ),
})
Slots.storyName = '🧩 Slots'

export const FormReset = Story({
  ...withRender(
    () => `
<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <ds-input required name="hero" label="Hero" value="Steve Rogers"></ds-input>

  <ds-button-group>
    <ds-button element-type="submit" color="primary">Submit</ds-button>
    <ds-button data-testid="button-reset" element-type="reset" color="link">Reset</ds-button>
  </ds-button-group>
</form>
`,
  ),
})
FormReset.storyName = '🧩 Form Reset'

export const FormResetHtml = Story({
  ...withRender(
    () => `
<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <div class="field">
    <label class="label">Hero</label>
    <div class="control">
      <input required name="hero" class="input" value="Steve Rogers" />
    </div>
  </div>

  <div class="buttons">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button is-link" data-testid="button-reset">Reset</button>
  </div>
</form>
`,
  ),
})
FormResetHtml.storyName = '🌍 Form Reset'

export const Formatter = Story({
  ...withRender(
    () => `
<ds-input label="VehicleRegistrationNumber" mask="vehicle-registration-number" value="123456789012"></ds-input>
<ds-input label="OfferNumber" mask="offer-number" value="987654321"></ds-input>
<ds-input label="ContractNumber" mask="contract-number" value="9087654321"></ds-input>
<ds-input label="BasicContractNumber" mask="basic-contract-number" value="987654327"></ds-input>
<ds-input label="ClaimNumber" mask="claim-number" value="7300772816X"></ds-input>
<ds-input label="BeEnterpriseNumber" mask="be-enterprise-number" value="1234567890"></ds-input>
<ds-input label="BeIBAN" mask="be-iban" value="68539007547034"></ds-input>
`,
  ),
})
Formatter.storyName = '🧩 Formatter'
