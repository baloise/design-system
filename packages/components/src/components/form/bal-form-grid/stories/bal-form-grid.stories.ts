import docs from './bal-form-grid.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalFormGrid, BalFormCol, BalInput } from '../../../../../.storybook/vue/components'
import { ref } from 'vue'

const component = BalComponentStory({
  title: 'Components/Form/Form Grid',
  component: BalFormGrid,
  subcomponents: { BalFormCol },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalInput },
  setup: () => ({ args }),
  template: `<bal-form-grid>
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
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const FormStructure = args => ({
  components: { ...component.components, BalInput },
  setup: () => {
    const invalid = ref(false)
    const disabled = ref(false)

    return { args, invalid, disabled }
  },
  template: `<form class="container is-compact">
  <bal-card>
    <bal-card-title>Example Form</bal-card-title>
    <bal-card-content>
      <bal-form-grid>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Input</bal-field-label>
            <bal-field-control>
              <bal-input placeholder="Placeholder"></bal-input>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
            <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Input</bal-field-label>
            <bal-field-control>
              <bal-input placeholder="Placeholder" value="Value"></bal-input>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Number Input</bal-field-label>
            <bal-field-control>
              <bal-number-input placeholder="Placeholder"></bal-number-input>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
            <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Number Input</bal-field-label>
            <bal-field-control>
              <bal-number-input placeholder="Placeholder" value="1000"></bal-number-input>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Input Group</bal-field-label>
            <bal-field-control>
              <bal-input-group class="mb-4">
                <bal-icon name="call"></bal-icon>
                <bal-select :disabled="disabled" :invalid="invalid" style="max-width: 106px" value="DE">
                    <bal-select-option label="DE" value="DE">DE</bal-select-option>
                    <bal-select-option label="FR" value="FR">FR</bal-select-option>
                    <bal-select-option label="IT" value="IT">IT</bal-select-option>
                </bal-select>
                <bal-input placeholder="79 123 45 67" :disabled="disabled" :invalid="invalid"></bal-input>
              </bal-input-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
            <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Input Group</bal-field-label>
            <bal-field-control>
              <bal-input-group class="mb-4">
                <bal-tag closable :disabled="disabled" :invalid="invalid" size="small">Tag</bal-tag>
                <bal-tag closable :disabled="disabled" :invalid="invalid" size="small">Tag</bal-tag>
                <bal-input placeholder="Enter text here" v-model="args.value" :disabled="disabled" :invalid="invalid"></bal-input>
                <bal-icon name="date" :class="disabled ? '' : is-clickable"></bal-icon>
              </bal-input-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Textarea</bal-field-label>
            <bal-field-control>
              <bal-textarea placeholder="Placeholder"></bal-textarea>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
            <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Textarea</bal-field-label>
            <bal-field-control>
              <bal-textarea placeholder="Placeholder" value="Value"></bal-textarea>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Datepicker</bal-field-label>
            <bal-field-control>
              <bal-datepicker placeholder="Placeholder"></bal-datepicker>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Datepicker</bal-field-label>
            <bal-field-control>
            <bal-datepicker placeholder="Placeholder" value="12.04.2023"></bal-datepicker>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Select</bal-field-label>
            <bal-field-control>
              <bal-select placeholder="Placeholder">
                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                <bal-select-option value="BL" label="BL">BL</bal-select-option>
              </bal-select>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Select</bal-field-label>
            <bal-field-control>
              <bal-select placeholder="Placeholder" value="BS">
                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                <bal-select-option value="BL" label="BL">BL</bal-select-option>
              </bal-select>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Multiple Select</bal-field-label>
            <bal-field-control>
              <bal-select multiple typeahead placeholder="Placeholder">
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
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Multiple Select</bal-field-label>
            <bal-field-control>
              <bal-select multiple placeholder="Placeholder" value="BS">
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
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Checkbox</bal-field-label>
            <bal-field-control>
              <bal-checkbox-group>
                <bal-checkbox>Label</bal-checkbox>
                <bal-checkbox checked>Label</bal-checkbox>
              </bal-checkbox-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Checkbox</bal-field-label>
            <bal-field-control>
              <bal-checkbox-group interface="switch">
                <bal-checkbox>Label</bal-checkbox>
                <bal-checkbox checked>Label</bal-checkbox>
              </bal-checkbox-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Checkbox</bal-field-label>
            <bal-field-control>
              <bal-checkbox-group interface="select-button">
                <bal-checkbox>Label</bal-checkbox>
                <bal-checkbox checked>Label</bal-checkbox>
              </bal-checkbox-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Radio</bal-field-label>
            <bal-field-control>
              <bal-radio-group value="2">
                <bal-radio value="1">Label</bal-radio>
                <bal-radio value="2" checked>Label</bal-radio>
              </bal-radio-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Radio</bal-field-label>
            <bal-field-control>
              <bal-radio-group value="2" interface="select-button">
                <bal-radio value="1">Label</bal-radio>
                <bal-radio value="2" checked>Label</bal-radio>
              </bal-radio-group>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>Input Stepper</bal-field-label>
            <bal-field-control>
              <bal-input-stepper></bal-input-stepper>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field :invalid="invalid" :disabled="disabled" required>
            <bal-field-label>File Upload</bal-field-label>
            <bal-field-control>
              <bal-file-upload accept="image/png,image/jpeg" has-file-list label="Choose or drop a file..." max-bundle-size="1000000" max-file-size="1000000" max-files="3" multiple></bal-file-upload>
            </bal-field-control>
            <bal-field-message v-if="invalid">Field Message</bal-field-message>
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
</form>



`,
})
FormStructure.args = {}
FormStructure.parameters = { ...component.sourceCode(FormStructure) }

//<bal-form-col size="half">
// <bal-field :invalid="invalid" :disabled="disabled" required>
//   <bal-field-label>Firstname</bal-field-label>
//   <bal-field-control>
//     <bal-input name="firstname" placeholder="Enter your firstname"></bal-input>
//   </bal-field-control>
//   <bal-field-message v-if="invalid">Field Message</bal-field-message>
// </bal-field>
// </bal-form-col>
// <bal-form-col size="half">
// <bal-field :invalid="invalid" :disabled="disabled" required>
//   <bal-field-label>Lastname</bal-field-label>
//   <bal-field-control>
//     <bal-input name="lastname" placeholder="Enter your lastname"></bal-input>
//   </bal-field-control>
//   <bal-field-message v-if="invalid">Field Message</bal-field-message>
// </bal-field>
// </bal-form-col>
// <bal-form-col size="half">
//         <bal-field :invalid="invalid" :disabled="disabled" required>
//           <bal-field-label>Street</bal-field-label>
//           <bal-field-control>
//             <bal-input name="street" placeholder="Enter your street"></bal-input>
//           </bal-field-control>
//           <bal-field-message v-if="invalid">Field Message</bal-field-message>
//         </bal-field>
//       </bal-form-col>
//       <bal-form-col size="half">
//         <bal-form-grid>
//           <bal-form-col size="one-third">
//             <bal-field :invalid="invalid" :disabled="disabled" required>
//               <bal-field-label>Postal Code</bal-field-label>
//               <bal-field-control>
//                 <bal-input name="postalCode" placeholder="4000"></bal-input>
//               </bal-field-control>
//               <bal-field-message v-if="invalid">Field Message</bal-field-message>
//             </bal-field>
//           </bal-form-col>
//           <bal-form-col size="two-thirds">
//             <bal-field :invalid="invalid" :disabled="disabled" required>
//               <bal-field-label>City</bal-field-label>
//               <bal-field-control>
//                 <bal-input name="city" placeholder="Basel"></bal-input>
//               </bal-field-control>
//               <bal-field-message v-if="invalid">Field Message</bal-field-message>
//             </bal-field>
//           </bal-form-col>
//         </bal-form-grid>
//       </bal-form-col>

//       <bal-form-col size="half">
//         <bal-field :invalid="invalid" :disabled="disabled" required>
//           <bal-field-label>Birthdate</bal-field-label>
//           <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
//           <bal-field-control>
//             <bal-datepicker min="2022-08-21" name="birthdate" placeholder="Select your birthdate"></bal-datepicker>
//           </bal-field-control>
//           <bal-field-message v-if="invalid">Field Message</bal-field-message>
//         </bal-field>
//       </bal-form-col>

// <bal-form-col>
// <bal-field :invalid="invalid" :disabled="disabled" required="false">
//   <bal-field-label>Comment</bal-field-label>
//   <bal-field-control>
//     <bal-textarea name="comment" placeholder="Enter your comment"></bal-textarea>
//   </bal-field-control>
//   <bal-field-message v-if="invalid">Field Message</bal-field-message>
// </bal-field>
// </bal-form-col>

// <bal-card-actions>
// <bal-button element-type="submit">Submit</bal-button>
// <bal-button element-type="reset" color="link">Reset</bal-button>
// <bal-button color="link" @click="() => invalid = !invalid">Toggle invalid</bal-button>
// <bal-button color="link" @click="() => disabled = !disabled">Toggle disabled</bal-button>
// </bal-card-actions>
