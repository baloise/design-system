import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.BalFormGrid & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/FormGrid',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-form-grid' }),
  },
  ...withRender(
    () => `<bal-form-grid>
  <bal-form-col><bal-input placeholder="fullwidth" /></bal-form-col>
  <bal-form-col size="half"><bal-input placeholder="half" /></bal-form-col>
  <bal-form-col size="half"><bal-input placeholder="half" /></bal-form-col>
  <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
  <bal-form-col size="two-thirds"><bal-input placeholder="two-thirds" /></bal-form-col>
  <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
  <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
  <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
  <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
  <bal-form-col size="three-quarters"><bal-input placeholder="three-quarters" /></bal-form-col>
  <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
  <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
  <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
  <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
</bal-form-grid>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FormStructure = Story({
  ...withRender(
    () => `<form class="container is-compact">
    <bal-card>
        <bal-card-title>Example Form</bal-card-title>
        <bal-card-content>
            <bal-form-grid>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Input</bal-field-label>
                        <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
                        <bal-field-control>
                            <bal-input placeholder="Placeholder"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Input</bal-field-label>
                        <bal-field-control>
                            <bal-input placeholder="Placeholder" value="Value"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Number Input</bal-field-label>
                        <bal-field-control>
                            <bal-number-input placeholder="Placeholder"></bal-number-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Number Input</bal-field-label>
                        <bal-field-control>
                            <bal-number-input placeholder="Placeholder" value="1000"></bal-number-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Input Group</bal-field-label>
                        <bal-field-control>
                            <bal-input-group class="mb-normal">
                                <bal-icon name="call"></bal-icon>
                                <bal-select style="max-width: 106px" value="DE">
                                    <bal-select-option label="DE" value="DE">DE</bal-select-option>
                                    <bal-select-option label="FR" value="FR">FR</bal-select-option>
                                    <bal-select-option label="IT" value="IT">IT</bal-select-option>
                                </bal-select>
                                <bal-input placeholder="79 123 45 67"></bal-input>
                            </bal-input-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Input Group</bal-field-label>
                        <bal-field-control>
                            <bal-input-group class="mb-normal">
                                <bal-tag closable size="small">Tag</bal-tag>
                                <bal-tag closable size="small">Tag</bal-tag>
                                <bal-input placeholder="Enter text here"></bal-input>
                                <bal-icon name="date"></bal-icon>
                            </bal-input-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Textarea</bal-field-label>
                        <bal-field-control>
                            <bal-textarea placeholder="Placeholder"></bal-textarea>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Textarea</bal-field-label>
                        <bal-field-control>
                            <bal-textarea placeholder="Placeholder" value="Value"></bal-textarea>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Datepicker</bal-field-label>
                        <bal-field-control>
                            <bal-date placeholder="Placeholder"></bal-date>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Datepicker</bal-field-label>
                        <bal-field-control>
                            <bal-date placeholder="Placeholder" value="2023-04-12"></bal-date>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Select</bal-field-label>
                        <bal-field-control>
                            <bal-select placeholder="Placeholder">
                                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                                <bal-select-option value="BL" label="BL">BL</bal-select-option>
                            </bal-select>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Select</bal-field-label>
                        <bal-field-control>
                            <bal-select placeholder="Placeholder" value="BS">
                                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                                <bal-select-option value="BL" label="BL">BL</bal-select-option>
                            </bal-select>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Multiple Select</bal-field-label>
                        <bal-field-control>
                            <bal-select multiple="true" typeahead="true" placeholder="Placeholder" value="AG,SO">
                                <bal-select-option value="AG" label="Argau">Argau</bal-select-option>
                                <bal-select-option value="BS" label="Basel">Basel</bal-select-option>
                                <bal-select-option value="BL" label="Basel-Land">Basel-Land</bal-select-option>
                                <bal-select-option value="SO" label="Solothurn">Solothurn</bal-select-option>
                                <bal-select-option value="LU" label="Luzern">Luzern</bal-select-option>
                                <bal-select-option value="GB" label="Graubünden">Graubünden</bal-select-option>
                                <bal-select-option value="BE" label="Bern">Bern</bal-select-option>
                                <bal-select-option value="ZH" label="Zürich">Zürich</bal-select-option>
                                <bal-select-option value="ZG" label="Zug">Zug</bal-select-option>
                            </bal-select>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col size="half">
                    <bal-field>
                        <bal-field-label>Multiple Select</bal-field-label>
                        <bal-field-control>
                            <bal-select multiple="true" placeholder="Placeholder" value="BS">
                                <bal-select-option value="AG" label="Argau">Argau</bal-select-option>
                                <bal-select-option value="BS" label="Basel">Basel</bal-select-option>
                                <bal-select-option value="BL" label="Basel-Land">Basel-Land</bal-select-option>
                                <bal-select-option value="SO" label="Solothurn">Solothurn</bal-select-option>
                                <bal-select-option value="LU" label="Luzern">Luzern</bal-select-option>
                                <bal-select-option value="GB" label="Graubünden">Graubünden</bal-select-option>
                                <bal-select-option value="BE" label="Bern">Bern</bal-select-option>
                                <bal-select-option value="ZH" label="Zürich">Zürich</bal-select-option>
                                <bal-select-option value="ZG" label="Zug">Zug</bal-select-option>
                            </bal-select>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Checkbox</bal-field-label>
                        <bal-field-control>
                            <bal-checkbox-group>
                                <bal-checkbox>Label</bal-checkbox>
                                <bal-checkbox checked="true">Label</bal-checkbox>
                            </bal-checkbox-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Checkbox</bal-field-label>
                        <bal-field-control>
                            <bal-checkbox-group interface="switch">
                                <bal-checkbox>Label</bal-checkbox>
                                <bal-checkbox checked="true">Label</bal-checkbox>
                            </bal-checkbox-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Checkbox</bal-field-label>
                        <bal-field-control>
                            <bal-checkbox-group interface="button">
                                <bal-checkbox>Label</bal-checkbox>
                                <bal-checkbox checked="true">Label</bal-checkbox>
                            </bal-checkbox-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Radio <a href="http://www.google.ch">Bubu</a></bal-field-label>
                        <bal-field-control>
                            <bal-radio-group value="2">
                                <bal-radio value="1">Label</bal-radio>
                                <bal-radio value="2" checked="true">Label</bal-radio>
                            </bal-radio-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Radio</bal-field-label>
                        <bal-field-control>
                            <bal-radio-group value="2" interface="button">
                                <bal-radio value="1">Label</bal-radio>
                                <bal-radio value="2" checked="true">Label</bal-radio>
                            </bal-radio-group>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>Input Stepper</bal-field-label>
                        <bal-field-control>
                            <bal-input-stepper></bal-input-stepper>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

                <bal-form-col>
                    <bal-field>
                        <bal-field-label>File Upload</bal-field-label>
                        <bal-field-control>
                            <bal-file-upload accept="image/png,image/jpeg" has-file-list label="Choose or drop a file..." max-bundle-size="1000000" max-file-size="1000000" max-files="3" multiple="true"></bal-file-upload>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>

            </bal-form-grid>
        </bal-card-content>
        <bal-card-actions>
            <bal-button element-type="submit">Submit</bal-button>
            <bal-button color="link" @click="() => invalid = !invalid">Toggle invalid</bal-button>
            <bal-button color="link" @click="() => disabled = !disabled">Toggle disabled</bal-button>
        </bal-card-actions>
    </bal-card>
</form>`,
  ),
})
