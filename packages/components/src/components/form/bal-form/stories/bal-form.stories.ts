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
} from '../../../../../.storybook/vue/components'
import { ref } from 'vue'
import { element } from '../../../../../../components-vue/src/helpers'
import { Components } from '../../../../../src'

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
  native: true,
}
Basic.parameters = { ...component.sourceCode(Basic) }
