import docs from './bal-radio.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalRadio,
  BalRadioGroup,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/generated/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Radio',
  component: BalRadioGroup,
  subcomponents: { BalRadio },
  docs,
  argTypes: {
    invalid: balFieldArgTypes.invalid,
    hasFieldMessage: {
      description: 'Show a hint or validation message below the control',
      table: {
        category: 'custom',
      },
    },
  },
  args: {
    readonly: false,
    invalid: false,
    vertical: false,
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = ['name']

export const Basic = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-radio-group v-bind="args" v-model="args.value">
    <bal-radio name="radio-example" value="1" :invalid="args.invalid">Label 1</bal-radio>
    <bal-radio name="radio-example" value="2" :invalid="args.invalid">Label 2</bal-radio>
    <bal-radio name="radio-example" value="3" disabled>Disabled</bal-radio>
    <bal-radio name="radio-example" value="4" :invalid="args.invalid">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
  </bal-radio-group>`,
})
Basic.args = {
  value: '1',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const FieldControl = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="radio-example" value="1">Label 1</bal-radio>
      <bal-radio name="radio-example" value="2">Label 2</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
FieldControl.args = {
  value: '2',
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: excludedControls },
}

export const Vertical = FieldControl.bind({})
Vertical.args = {
  content: 'Label',
  vertical: true,
}
Vertical.parameters = {
  ...component.sourceCode(Vertical),
  controls: { exclude: excludedControls },
}

export const SelectButton = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="select-button-example" value="yes">Yes</bal-radio>
      <bal-radio name="select-button-example" value="no">No</bal-radio>
      <bal-radio name="select-button-example" value="with-link">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
SelectButton.args = {
  interface: 'select-button',
  value: 'yes',
}
SelectButton.parameters = {
  ...component.sourceCode(SelectButton),
  controls: { exclude: excludedControls },
}

export const RadioButton = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalFieldMessage,
  },
  setup: () => {
    const autoSvg = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_403_16317)">
    <path d="M29 30.2143H35.4286V34.0714C35.4286 34.4124 35.2931 34.7395 35.052 34.9806C34.8109 35.2217 34.4838 35.3572 34.1429 35.3572H30.2857C29.9447 35.3572 29.6177 35.2217 29.3766 34.9806C29.1355 34.7395 29 34.4124 29 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M4.57153 30.2143H11.0001V34.0714C11.0001 34.4124 10.8646 34.7395 10.6235 34.9806C10.3824 35.2217 10.0554 35.3572 9.71439 35.3572H5.85725C5.51625 35.3572 5.18923 35.2217 4.94811 34.9806C4.70699 34.7395 4.57153 34.4124 4.57153 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M37.3571 12.2143H34.7857C34.4306 12.2143 34.1428 12.5021 34.1428 12.8572V14.1429C34.1428 14.4979 34.4306 14.7857 34.7857 14.7857H37.3571C37.7121 14.7857 38 14.4979 38 14.1429V12.8572C38 12.5021 37.7121 12.2143 37.3571 12.2143Z" fill="#1B5951"/>
    <path d="M5.21429 12.2143H2.64286C2.28782 12.2143 2 12.5021 2 12.8572V14.1429C2 14.4979 2.28782 14.7857 2.64286 14.7857H5.21429C5.56933 14.7857 5.85714 14.4979 5.85714 14.1429V12.8572C5.85714 12.5021 5.56933 12.2143 5.21429 12.2143Z" fill="#1B5951"/>
    <path d="M35.0301 19.9286L33.7444 16.0714H6.28154L4.99582 19.9286C4.72087 20.5527 4.57648 21.2265 4.57153 21.9086V28.9286H35.4287V21.9086C35.4319 21.2283 35.2962 20.5546 35.0301 19.9286ZM9.07153 25.0714C8.56004 25.0714 8.0695 24.8682 7.70783 24.5065C7.34615 24.1449 7.14296 23.6543 7.14296 23.1428C7.14296 22.6314 7.34615 22.1408 7.70783 21.7791C8.0695 21.4175 8.56004 21.2143 9.07153 21.2143C9.58302 21.2143 10.0736 21.4175 10.4352 21.7791C10.7969 22.1408 11.0001 22.6314 11.0001 23.1428C11.0001 23.6543 10.7969 24.1449 10.4352 24.5065C10.0736 24.8682 9.58302 25.0714 9.07153 25.0714ZM30.9287 25.0714C30.4172 25.0714 29.9266 24.8682 29.565 24.5065C29.2033 24.1449 29.0001 23.6543 29.0001 23.1428C29.0001 22.6314 29.2033 22.1408 29.565 21.7791C29.9266 21.4175 30.4172 21.2143 30.9287 21.2143C31.4402 21.2143 31.9307 21.4175 32.2924 21.7791C32.6541 22.1408 32.8573 22.6314 32.8573 23.1428C32.8573 23.6543 32.6541 24.1449 32.2924 24.5065C31.9307 24.8682 31.4402 25.0714 30.9287 25.0714Z" fill="#1B5951"/>
    <path d="M29.9899 6.87857C29.6978 6.17457 29.2035 5.57292 28.5697 5.14959C27.9358 4.72625 27.1907 4.50021 26.4285 4.5H13.5714C12.8091 4.50021 12.0641 4.72625 11.4302 5.14959C10.7963 5.57292 10.3021 6.17457 10.0099 6.87857L6.71851 14.7857H33.2814L29.9899 6.87857Z" fill="#94E3D4"/>
    </g>
    <defs>
    <clipPath id="clip0_403_16317">
    <rect width="36" height="30.8571" fill="white" transform="translate(2 4.5)"/>
    </clipPath>
    </defs>
    </svg>`

    return {
      args,
      autoSvg,
    }
  },
  template: `
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio-button>
        <bal-stack>
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content>
            <bal-label>Simple radio button</bal-label>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="1"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button>
        <bal-stack>
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content>
            <bal-label>Radio button with a description</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="2"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button invalid>
        <bal-stack>
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content>
            <bal-label>Invalid button</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="3"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button disabled>
        <bal-stack>
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content>
            <bal-label>Disabled button</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="4"></bal-radio>
        </bal-stack>
      </bal-radio-button>
    </bal-radio-group>`,
})
RadioButton.args = {
  interface: '',
  value: '1',
}
RadioButton.parameters = {
  ...component.sourceCode(RadioButton),
  controls: { exclude: excludedControls },
}

export const RadioButtonGrid = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalFieldMessage,
  },
  setup: () => {
    const autoSvg = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_403_16317)">
    <path d="M29 30.2143H35.4286V34.0714C35.4286 34.4124 35.2931 34.7395 35.052 34.9806C34.8109 35.2217 34.4838 35.3572 34.1429 35.3572H30.2857C29.9447 35.3572 29.6177 35.2217 29.3766 34.9806C29.1355 34.7395 29 34.4124 29 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M4.57153 30.2143H11.0001V34.0714C11.0001 34.4124 10.8646 34.7395 10.6235 34.9806C10.3824 35.2217 10.0554 35.3572 9.71439 35.3572H5.85725C5.51625 35.3572 5.18923 35.2217 4.94811 34.9806C4.70699 34.7395 4.57153 34.4124 4.57153 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M37.3571 12.2143H34.7857C34.4306 12.2143 34.1428 12.5021 34.1428 12.8572V14.1429C34.1428 14.4979 34.4306 14.7857 34.7857 14.7857H37.3571C37.7121 14.7857 38 14.4979 38 14.1429V12.8572C38 12.5021 37.7121 12.2143 37.3571 12.2143Z" fill="#1B5951"/>
    <path d="M5.21429 12.2143H2.64286C2.28782 12.2143 2 12.5021 2 12.8572V14.1429C2 14.4979 2.28782 14.7857 2.64286 14.7857H5.21429C5.56933 14.7857 5.85714 14.4979 5.85714 14.1429V12.8572C5.85714 12.5021 5.56933 12.2143 5.21429 12.2143Z" fill="#1B5951"/>
    <path d="M35.0301 19.9286L33.7444 16.0714H6.28154L4.99582 19.9286C4.72087 20.5527 4.57648 21.2265 4.57153 21.9086V28.9286H35.4287V21.9086C35.4319 21.2283 35.2962 20.5546 35.0301 19.9286ZM9.07153 25.0714C8.56004 25.0714 8.0695 24.8682 7.70783 24.5065C7.34615 24.1449 7.14296 23.6543 7.14296 23.1428C7.14296 22.6314 7.34615 22.1408 7.70783 21.7791C8.0695 21.4175 8.56004 21.2143 9.07153 21.2143C9.58302 21.2143 10.0736 21.4175 10.4352 21.7791C10.7969 22.1408 11.0001 22.6314 11.0001 23.1428C11.0001 23.6543 10.7969 24.1449 10.4352 24.5065C10.0736 24.8682 9.58302 25.0714 9.07153 25.0714ZM30.9287 25.0714C30.4172 25.0714 29.9266 24.8682 29.565 24.5065C29.2033 24.1449 29.0001 23.6543 29.0001 23.1428C29.0001 22.6314 29.2033 22.1408 29.565 21.7791C29.9266 21.4175 30.4172 21.2143 30.9287 21.2143C31.4402 21.2143 31.9307 21.4175 32.2924 21.7791C32.6541 22.1408 32.8573 22.6314 32.8573 23.1428C32.8573 23.6543 32.6541 24.1449 32.2924 24.5065C31.9307 24.8682 31.4402 25.0714 30.9287 25.0714Z" fill="#1B5951"/>
    <path d="M29.9899 6.87857C29.6978 6.17457 29.2035 5.57292 28.5697 5.14959C27.9358 4.72625 27.1907 4.50021 26.4285 4.5H13.5714C12.8091 4.50021 12.0641 4.72625 11.4302 5.14959C10.7963 5.57292 10.3021 6.17457 10.0099 6.87857L6.71851 14.7857H33.2814L29.9899 6.87857Z" fill="#94E3D4"/>
    </g>
    <defs>
    <clipPath id="clip0_403_16317">
    <rect width="36" height="30.8571" fill="white" transform="translate(2 4.5)"/>
    </clipPath>
    </defs>
    </svg>`

    return {
      args,
      autoSvg,
    }
  },
  template: `
    <bal-radio-group v-bind="args" v-model="args.value" columns="3" columns-tablet="2">
      <bal-radio-button>
        <bal-stack layout="vertical" align="center">
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content align="center">
            <bal-label size="large">Radio Button 1</bal-label>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="1"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button>
        <bal-stack layout="vertical" align="center">
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content align="center">
            <bal-label size="large">Radio Button 2</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="2"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button>
        <bal-stack layout="vertical" align="center">
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content align="center">
            <bal-label size="large">Radio Button 3</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="3"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button>
        <bal-stack layout="vertical" align="center">
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content align="center">
            <bal-label size="large">Radio Button 4</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="4"></bal-radio>
        </bal-stack>
      </bal-radio-button>
      <bal-radio-button>
        <bal-stack layout="vertical" align="center">
          <bal-icon :svg="autoSvg" size="large" color="auto"></bal-icon>
          <bal-content align="center">
            <bal-label size="large">Radio Button 5</bal-label>
            <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
          </bal-content>
          <bal-radio label-hidden name="radio-example" value="5"></bal-radio>
        </bal-stack>
      </bal-radio-button>
    </bal-radio-group>`,
})
RadioButtonGrid.args = {
  interface: '',
  value: '1',
}
RadioButtonGrid.parameters = {
  ...component.sourceCode(RadioButtonGrid),
  controls: { exclude: excludedControls },
}
