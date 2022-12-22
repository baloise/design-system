import docs from './bal-form.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import {
  BalForm,
  BalFormGrid,
  BalFormCol,
  BalField,
  BalFieldLabel,
  BalFieldControl,
  BalInput,
  BalButtonGroup,
  BalButton,
} from '../../../../../.storybook/vue/generated/components'
import { ref } from 'vue'
import { element } from '../../../../../../components-vue/src/helpers'
import { Components } from '../../../../../src'
import { reduceConfigArgs, setConfig } from '../../../../stories/utils/config'

const component = BalComponentStory({
  title: 'Components/Form/Form',
  component: BalForm,
  docs,
})

export default component.story

const inputTemplate = (args: { invalid: boolean } = { invalid: false }) => `<bal-field ${args.invalid ? 'invalid' : ''}>
  <bal-field-label>Label</bal-field-label>
    <bal-field-control>
    <bal-input placeholder="Placeholder"></bal-input>
  </bal-field-control>
</bal-field>`

export const Basic = args => ({
  components: {
    ...component.components,
    BalFormGrid,
    BalFormCol,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalInput,
    BalButtonGroup,
    BalButton,
  },
  setup: () => {
    const form = ref(null)

    function submit() {
      if (form.value) {
        const formEl = element<Components.BalForm>(form)
        formEl.scrollToFirstInvalidField()
      }
    }

    return { args, form, submit }
  },
  template: `<bal-form v-bind="args" ref="form">
  <bal-form-grid>
    <bal-form-col>
      ${inputTemplate({ invalid: true })}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate()}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate({ invalid: true })}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate()}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate({ invalid: true })}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate()}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate({ invalid: true })}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate()}
    </bal-form-col>
    <bal-form-col>
      ${inputTemplate({ invalid: true })}
    </bal-form-col>
    <bal-form-col>
      <bal-button-group>
        <bal-button @click="submit()">Submit (scroll to the first invalid field)</bal-button>
      </bal-button-group>
    </bal-form-col>
  </bal-form-grid>
</bal-form>`,
})
Basic.args = {
  native: false,
  novalidate: false,
}
Basic.parameters = {
  ...component.sourceCode(Basic, {
    vue: `import { element } from '@baloise/design-system-components-vue'
import type { Components } from '@baloise/design-system-components'

const form = ref(null)

function submit() {
  if (form.value) {
    const formEl = element<Components.BalForm>(form)
    formEl.scrollToFirstInvalidField()
  }
}
`,
  }),
}

export const FormAutocomplete = args => ({
  components: { ...component.components, BalInput },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <bal-card>
    <bal-card-content>
      <bal-form-grid>
        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Firstname</bal-field-label>
            <bal-field-control>
              <bal-input name="firstname" placeholder="Enter your firstname" value="" autocomplete="on"></bal-input>
            </bal-field-control>
            <bal-field-message>Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Lastname</bal-field-label>
            <bal-field-control>
              <bal-input name="lastname" placeholder="Enter your lastname" value="" autocomplete="on"></bal-input>
            </bal-field-control>
            <bal-field-message>Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Street</bal-field-label>
            <bal-field-control>
              <bal-input name="street" placeholder="Enter your street" autocomplete="on"></bal-input>
            </bal-field-control>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-form-grid>
            <bal-form-col>
              <bal-field required>
                <bal-field-label>City</bal-field-label>
                <bal-field-control>
                  <bal-input name="city" placeholder="Basel" autocomplete="on"></bal-input>
                </bal-field-control>
              </bal-field>
            </bal-form-col>
          </bal-form-grid>
        </bal-form-col>
      </bal-form-grid>
    </bal-card-content>
    <bal-card-actions position="left">
    <bal-button element-type="submit" color="primary">Submit</bal-button>
  </bal-card-actions>
  </bal-card>
</form>`,
})
FormAutocomplete.args = {}
FormAutocomplete.parameters = { ...component.sourceCode(FormAutocomplete) }
