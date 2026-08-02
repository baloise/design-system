import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, unknown>

const meta: Meta<Args> = {
  title: 'Components/Form/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
 <div class="form">
  <div class="form-col">
    <fieldset class="field">
      <legend class="label">Gender</legend>
      <div class="radio-group">
        <label class="radio">
          <input required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="radio">
          <input required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="help" id="help-gender">Select your gender</p>
    </fieldset>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field">
      <label class="label" for="fname">First Name</label>
      <div class="control">
        <input id="fname" class="input" aria-describedby="help-fname" value="Jane" />
      </div>
      <p id="help-fname" class="help">Provide the first name</p>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field">
      <label class="label" for="lname">Last Name</label>
      <div class="control">
        <input id="lname" class="input" aria-describedby="help-lname" value="Doe" />
      </div>
      <p id="help-lname" class="help">Provide the last name</p>
    </div>
  </div>

  <div class="form-col">
    <div class="field">
      <label class="label" for="email">Email</label>
      <div class="control">
        <input id="email" class="input" type="email" aria-describedby="help-email" placeholder="jane@example.com" />
      </div>
      <p id="help-email" class="help">Provide your email address</p>
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
<div class="form">
  <div class="form-col">
    <fieldset class="field is-disabled">
      <legend class="label">Gender</legend>
      <div class="radio-group">
        <label class="radio is-disabled">
          <input disabled required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="radio is-disabled">
          <input disabled required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="help" id="help-gender">This field is disabled</p>
    </fieldset>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field is-disabled">
      <label class="label" for="fname">First Name</label>
      <div class="control">
        <input disabled id="fname" class="input" aria-describedby="help-fname" value="Jane" />
      </div>
      <p id="help-fname" class="help">This field is disabled</p>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field is-disabled">
      <label class="label" for="lname">Last Name</label>
      <div class="control">
        <input disabled id="lname" class="input" aria-describedby="help-lname" value="Doe" />
      </div>
      <p id="help-lname" class="help">This field is disabled</p>
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
<div class="form">
  <div class="form-col">
    <fieldset class="field is-invalid">
      <legend class="label">Gender</legend>
      <div class="radio-group">
        <label class="radio is-invalid">
          <input aria-invalid="true" required type="radio" name="gender" aria-describedby="help-gender" />
          Male
        </label>
        <label class="radio is-invalid">
          <input aria-invalid="true" required type="radio" name="gender" aria-describedby="help-gender" checked />
          Female
        </label>
      </div>
      <p class="help" id="help-gender">This is an error message</p>
    </fieldset>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field is-invalid">
      <label class="label" for="fname">First Name</label>
      <div class="control">
        <input aria-invalid="true" id="fname" class="input" aria-describedby="help-fname" value="" />
      </div>
      <p id="help-fname" class="help">This field is required</p>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field is-invalid">
      <label class="label" for="lname">Last Name</label>
      <div class="control">
        <input aria-invalid="true" id="lname" class="input" aria-describedby="help-lname" value="" />
      </div>
      <p id="help-lname" class="help">This field is required</p>
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
<div class="form">
  <div class="form-col">
    <div class="field">
      <label class="label">Full Width (12)</label>
      <div class="control">
        <input class="input" placeholder="Form column 12" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field">
      <label class="label">Half Width (6)</label>
      <div class="control">
        <input class="input" placeholder="Form column 6" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field">
      <label class="label">Half Width (6)</label>
      <div class="control">
        <input class="input" placeholder="Form column 6" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4">
    <div class="field">
      <label class="label">Third Width (4)</label>
      <div class="control">
        <input class="input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4">
    <div class="field">
      <label class="label">Third Width (4)</label>
      <div class="control">
        <input class="input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4">
    <div class="field">
      <label class="label">Third Width (4)</label>
      <div class="control">
        <input class="input" placeholder="Form column 4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Quarter (3)</label>
      <div class="control">
        <input class="input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Quarter (3)</label>
      <div class="control">
        <input class="input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Quarter (3)</label>
      <div class="control">
        <input class="input" placeholder="Form column 3" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Quarter (3)</label>
      <div class="control">
        <input class="input" placeholder="Form column 3" />
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
<div class="form">
  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">PLZ (3)</label>
      <div class="control">
        <input class="input" placeholder="4000" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-9">
    <div class="field">
      <label class="label">City (9)</label>
      <div class="control">
        <input class="input" placeholder="Basel" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-6">
    <div class="field">
      <label class="label">Street (6)</label>
      <div class="control">
        <input class="input" placeholder="Main Street" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Number (3)</label>
      <div class="control">
        <input class="input" placeholder="123" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-3">
    <div class="field">
      <label class="label">Suffix (3)</label>
      <div class="control">
        <input class="input" placeholder="A" />
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
<div class="form">
  <div class="form-col tablet:is-full">
    <div class="field">
      <label class="label">Full Width</label>
      <div class="control">
        <input class="input" placeholder="is-full" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-half">
    <div class="field">
      <label class="label">Half Width</label>
      <div class="control">
        <input class="input" placeholder="is-half" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-half">
    <div class="field">
      <label class="label">Half Width</label>
      <div class="control">
        <input class="input" placeholder="is-half" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-third">
    <div class="field">
      <label class="label">One Third</label>
      <div class="control">
        <input class="input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-third">
    <div class="field">
      <label class="label">One Third</label>
      <div class="control">
        <input class="input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-third">
    <div class="field">
      <label class="label">One Third</label>
      <div class="control">
        <input class="input" placeholder="is-one-third" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-quarter">
    <div class="field">
      <label class="label">Quarter</label>
      <div class="control">
        <input class="input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-quarter">
    <div class="field">
      <label class="label">Quarter</label>
      <div class="control">
        <input class="input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-quarter">
    <div class="field">
      <label class="label">Quarter</label>
      <div class="control">
        <input class="input" placeholder="is-one-quarter" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-one-quarter">
    <div class="field">
      <label class="label">Quarter</label>
      <div class="control">
        <input class="input" placeholder="is-one-quarter" />
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
<div class="form">
  <div class="form-col tablet:is-6 desktop:is-4">
    <div class="field">
      <label class="label" for="col1">Column 1</label>
      <div class="control">
        <input id="col1" class="input" placeholder="tablet:is-6 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-6 desktop:is-4">
    <div class="field">
      <label class="label" for="col2">Column 2</label>
      <div class="control">
        <input id="col2" class="input" placeholder="tablet:is-6 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-12 desktop:is-4">
    <div class="field">
      <label class="label" for="col3">Column 3</label>
      <div class="control">
        <input id="col3" class="input" placeholder="tablet:is-12 desktop:is-4" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4 desktop:is-3">
    <div class="field">
      <label class="label" for="col4">Column 4</label>
      <div class="control">
        <input id="col4" class="input" placeholder="tablet:is-4 desktop:is-3" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4 desktop:is-3">
    <div class="field">
      <label class="label" for="col5">Column 5</label>
      <div class="control">
        <input id="col5" class="input" placeholder="tablet:is-4 desktop:is-3" />
      </div>
    </div>
  </div>

  <div class="form-col tablet:is-4 desktop:is-6">
    <div class="field">
      <label class="label" for="col6">Column 6</label>
      <div class="control">
        <input id="col6" class="input" placeholder="tablet:is-4 desktop:is-6" />
      </div>
    </div>
  </div>
</div>
  `,
  ),
})
ResponsiveThirds.storyName = '🌍 Responsive Thirds'
