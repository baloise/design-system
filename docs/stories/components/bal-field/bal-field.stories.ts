import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalField & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Field',
  args: {
    placeholder: 'Enter your firstname',
    name: 'firstName',
    id: 'bal-input-1',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-field' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label required="true">Firstname</bal-field-label>
  <bal-field-control>
      <bal-input ${props(args)}></bal-input>
  </bal-field-control>
  <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Addons = Story({
  args: {
    placeholder: 'Search...',
    name: 'search',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label required="true">Search</bal-field-label>
  <bal-field-control>
      <bal-input ${props(args)}></bal-input>
      <bal-button color="info">Search</bal-button>
  </bal-field-control>
</bal-field>`,
  ),
})

export const WithGrid = Story({
  ...withRender(
    () => `<bal-card>
    <bal-card-content>
        <form>
            <bal-form-grid>
                <bal-form-col>
                    <bal-field>
                        <bal-field-control>
                            <bal-radio-group>
                                <bal-radio name="gender" value="male">Male</bal-radio>
                                <bal-radio name="gender" value="female">Female</bal-radio>
                            </bal-radio-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label required="true">Firstname</bal-field-label>
                        <bal-field-control>
                            <bal-input name="firstname" placeholder="Enter your firstname" required="true"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label required="true">Lastname</bal-field-label>
                        <bal-field-control>
                            <bal-input name="lastname" placeholder="Enter your lastname" required="true"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label required="true">Street</bal-field-label>
                        <bal-field-control>
                            <bal-input name="street" placeholder="Enter your street" required="true"></bal-input>
                        </bal-field-control>
                        <bal-field-message>Enter a valid swiss street.</bal-field-message>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-form-grid>
                        <bal-form-col size="one-third">
                            <bal-field>
                                <bal-field-label>Postal Code</bal-field-label>
                                <bal-field-control>
                                    <bal-input name="postalCode" placeholder="4000" required="true"></bal-input>
                                </bal-field-control>
                            </bal-field>
                        </bal-form-col>

                        <bal-form-col size="two-thirds">
                            <bal-field>
                                <bal-field-label>City</bal-field-label>
                                <bal-field-control>
                                    <bal-input name="city" placeholder="Basel" required="true"></bal-input>
                                </bal-field-control>
                            </bal-field>
                        </bal-form-col>
                    </bal-form-grid>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Canton</bal-field-label>
                        <bal-field-control>
                            <bal-select placeholder="select your canton" form-control-name="canton">
                                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                                <bal-select-option value="BL" label="BL">BL</bal-select-option>
                            </bal-select>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Birthdate</bal-field-label>
                        <bal-field-control>
                            <bal-date placeholder="Select your birthdate"></bal-date>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-control>
                            <bal-checkbox>Checkbox</bal-checkbox>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Comment</bal-field-label>
                        <bal-field-control>
                            <bal-textarea name="comment" placeholder="Enter your comment"></bal-textarea>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>
            </bal-form-grid>
        </form>
    </bal-card-content>
    <bal-card-actions position="right">
        <bal-button color="primary">Submit</bal-button>
        <bal-button color="text">Cancel</bal-button>
    </bal-card-actions>
</bal-card>`,
  ),
})

export const Horizontal = Story({
  args: {
    placeholder: 'Enter your email address',
  },
  ...withRender(
    ({ ...args }) => `<bal-field horizontal>
    <bal-field-label
      >Email address</bal-field-label
    >
    <bal-field-control>
      <bal-input ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message color="hint"
      >Enter a valid email address.</bal-field-message
    >
  </bal-field>`,
  ),
})
