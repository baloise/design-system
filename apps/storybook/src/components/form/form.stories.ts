import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, unknown>

const meta: Meta<Args> = {
  title: 'Components/Forms/Form/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
 <div class="ds-form">
  <div class="ds-form-col">
    <fieldset class="ds-field">
      <legend class="ds-label">Gender</legend>
      <div class="ds-radio-group">
        <label class="ds-radio">
          <input required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="ds-radio">
          <input required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="ds-help" id="help-gender">Select your gender</p>
    </fieldset>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field">
      <label class="ds-label" for="fname">First Name</label>
      <div class="ds-control">
        <input id="fname" class="ds-input" aria-describedby="help-fname" value="Jane" />
      </div>
      <p id="help-fname" class="ds-help">Provide the first name</p>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field">
      <label class="ds-label" for="lname">Last Name</label>
      <div class="ds-control">
        <input id="lname" class="ds-input" aria-describedby="help-lname" value="Doe" />
      </div>
      <p id="help-lname" class="ds-help">Provide the last name</p>
    </div>
  </div>

  <div class="ds-form-col">
    <div class="ds-field">
      <label class="ds-label" for="email">Email</label>
      <div class="ds-control">
        <input id="email" class="ds-input" type="email" aria-describedby="help-email" placeholder="jane@example.com" />
      </div>
      <p id="help-email" class="ds-help">Provide your email address</p>
    </div>
  </div>
</div>
  `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

/**
 * STORIES — Form Layout Patterns
 * ——————————————————————————————
 * Each story demonstrates a specific form layout approach or state.
 */

export const Basic = Story({})
Basic.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col">
    <fieldset class="ds-field is-disabled">
      <legend class="ds-label">Gender</legend>
      <div class="ds-radio-group">
        <label class="ds-radio is-disabled">
          <input disabled required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="ds-radio is-disabled">
          <input disabled required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="ds-help" id="help-gender">This field is disabled</p>
    </fieldset>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field is-disabled">
      <label class="ds-label" for="fname">First Name</label>
      <div class="ds-control">
        <input disabled id="fname" class="ds-input" aria-describedby="help-fname" value="Jane" />
      </div>
      <p id="help-fname" class="ds-help">This field is disabled</p>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field is-disabled">
      <label class="ds-label" for="lname">Last Name</label>
      <div class="ds-control">
        <input disabled id="lname" class="ds-input" aria-describedby="help-lname" value="Doe" />
      </div>
      <p id="help-lname" class="ds-help">This field is disabled</p>
    </div>
  </div>
</div>
  `,
  ),
})
Disabled.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col">
    <fieldset class="ds-field is-invalid">
      <legend class="ds-label">Gender</legend>
      <div class="ds-radio-group">
        <label class="ds-radio is-invalid">
          <input aria-invalid="true" required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="ds-radio is-invalid">
          <input aria-invalid="true" required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="ds-help" id="help-gender">This is an error message</p>
    </fieldset>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field is-invalid">
      <label class="ds-label" for="fname">First Name</label>
      <div class="ds-control">
        <input aria-invalid="true" id="fname" class="ds-input" aria-describedby="help-fname" value="" />
      </div>
      <p id="help-fname" class="ds-help">This field is required</p>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field is-invalid">
      <label class="ds-label" for="lname">Last Name</label>
      <div class="ds-control">
        <input aria-invalid="true" id="lname" class="ds-input" aria-describedby="help-lname" value="" />
      </div>
      <p id="help-lname" class="ds-help">This field is required</p>
    </div>
  </div>
</div>
  `,
  ),
})
Invalid.storyName = '🌍 Invalid'

export const NumericSizes = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col">
    <div class="ds-field">
      <label class="ds-label">Full Width (12)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 12" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field">
      <label class="ds-label">Half Width (6)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 6" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field">
      <label class="ds-label">Half Width (6)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 6" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4">
    <div class="ds-field">
      <label class="ds-label">Third Width (4)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4">
    <div class="ds-field">
      <label class="ds-label">Third Width (4)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4">
    <div class="ds-field">
      <label class="ds-label">Third Width (4)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Quarter (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Quarter (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Quarter (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Quarter (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Form column 3" />
      </div>
    </div>
  </div>
</div>
  `,
  ),
})
NumericSizes.storyName = '🌍 Numeric Sizes'

export const NumericMixed = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">PLZ (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="4000" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-9">
    <div class="ds-field">
      <label class="ds-label">City (9)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Basel" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6">
    <div class="ds-field">
      <label class="ds-label">Street (6)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="Main Street" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Number (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="123" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-3">
    <div class="ds-field">
      <label class="ds-label">Suffix (3)</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="A" />
      </div>
    </div>
  </div>
</div>
  `,
  ),
})
NumericMixed.storyName = '🌍 Numeric Mixed'

export const SemanticSizes = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col tablet:is-full">
    <div class="ds-field">
      <label class="ds-label">Full Width</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-full" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-half">
    <div class="ds-field">
      <label class="ds-label">Half Width</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-half" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-half">
    <div class="ds-field">
      <label class="ds-label">Half Width</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-half" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-third">
    <div class="ds-field">
      <label class="ds-label">One Third</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-third">
    <div class="ds-field">
      <label class="ds-label">One Third</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-third">
    <div class="ds-field">
      <label class="ds-label">One Third</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-quarter">
    <div class="ds-field">
      <label class="ds-label">Quarter</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-quarter">
    <div class="ds-field">
      <label class="ds-label">Quarter</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-quarter">
    <div class="ds-field">
      <label class="ds-label">Quarter</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-one-quarter">
    <div class="ds-field">
      <label class="ds-label">Quarter</label>
      <div class="ds-control">
        <input class="ds-input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>
</div>
  `,
  ),
})
SemanticSizes.storyName = '🌍 Semantic Sizes'

export const ResponsiveThirds = Story({
  ...withRender(
    () => `
<div class="ds-form">
  <div class="ds-form-col tablet:is-6 desktop:is-4">
    <div class="ds-field">
      <label class="ds-label" for="col1">Column 1</label>
      <div class="ds-control">
        <input id="col1" class="ds-input" placeholder="tablet:is-6 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-6 desktop:is-4">
    <div class="ds-field">
      <label class="ds-label" for="col2">Column 2</label>
      <div class="ds-control">
        <input id="col2" class="ds-input" placeholder="tablet:is-6 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-12 desktop:is-4">
    <div class="ds-field">
      <label class="ds-label" for="col3">Column 3</label>
      <div class="ds-control">
        <input id="col3" class="ds-input" placeholder="tablet:is-12 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4 desktop:is-3">
    <div class="ds-field">
      <label class="ds-label" for="col4">Column 4</label>
      <div class="ds-control">
        <input id="col4" class="ds-input" placeholder="tablet:is-4 desktop:is-3" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4 desktop:is-3">
    <div class="ds-field">
      <label class="ds-label" for="col5">Column 5</label>
      <div class="ds-control">
        <input id="col5" class="ds-input" placeholder="tablet:is-4 desktop:is-3" />
      </div>
    </div>
  </div>

  <div class="ds-form-col tablet:is-4 desktop:is-6">
    <div class="ds-field">
      <label class="ds-label" for="col6">Column 6</label>
      <div class="ds-control">
        <input id="col6" class="ds-input" placeholder="tablet:is-4 desktop:is-6" />
      </div>
    </div>
  </div>
</div>
  `,
  ),
})
ResponsiveThirds.storyName = '🌍 Responsive Thirds'
