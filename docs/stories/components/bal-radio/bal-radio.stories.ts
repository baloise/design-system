import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'
import { balBrandIconCarGreen, balBrandIconCarRed, balBrandIconCarPurple } from '@baloise/ds-brand-icons/dist'

type Args = JSX.BalRadio & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Radio',
  args: {
    name: 'radio-example',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-radio' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-radio-group value="1">
  <bal-radio ${props(args)} value="1">Label 1</bal-radio>
  <bal-radio ${props(args)} value="2">Label 2</bal-radio>
  <bal-radio ${props(args)} value="3" disabled="true">Disabled</bal-radio>
  <bal-radio ${props(
    args,
  )} value="4">Random text with a <a class="link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
</bal-radio-group>`,
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
    name: 'radio-example',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-radio-group value="2">
        <bal-radio ${props(args)} value="1">Label 1</bal-radio>
        <bal-radio ${props(args)} value="2">Label 2</bal-radio>
      </bal-radio-group>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
  </bal-field>`,
  ),
})

export const Vertical = Story({
  args: {
    name: 'radio-example',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-radio-group vertical="true">
            <bal-radio ${props(args)} value="1">Label 1</bal-radio>
            <bal-radio ${props(args)} value="2">Label 2</bal-radio>
        </bal-radio-group>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const SelectButtons = Story({
  args: {
    name: 'select-button-example',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-radio-group interface="select-button" value="yes">
            <bal-radio ${props(args)} value="yes">Yes</bal-radio>
            <bal-radio ${props(args)} value="no">No</bal-radio>
            <bal-radio ${props(
              args,
            )} value="with-link">Random text with a <a class="link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
        </bal-radio-group>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const RadioButton = Story({
  args: {
    name: 'radio-example',
    labelHidden: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-radio-group value="1">
    <bal-radio-button>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Simple radio button</bal-label>
            </bal-content>
            <bal-radio ${props(args)} value="1"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Radio button with a description</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="2"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button invalid="true">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarRed}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Invalid button</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="3"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button disabled="true">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarPurple}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Disabled button</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group. The user can only select one option from a number of choices.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="4"></bal-radio>
        </bal-stack>
    </bal-radio-button>
</bal-radio-group>`,
  ),
})

export const RadioButtonGrid = Story({
  args: {
    name: 'radio-example',
    labelHidden: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-radio-group value="1" columns="3" columns-tablet="2">
    <bal-radio-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Radio Button 1</bal-label>
            </bal-content>
            <bal-radio ${props(args)} value="1"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Radio Button 2</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="2"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Radio Button 3</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="3"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Radio Button 4</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="4"></bal-radio>
        </bal-stack>
    </bal-radio-button>
    <bal-radio-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Radio Button 5</bal-label>
                <bal-text size="small">Radio input is normally displayed in a radio group.</bal-text>
            </bal-content>
            <bal-radio ${props(args)} value="5"></bal-radio>
        </bal-stack>
    </bal-radio-button>
</bal-radio-group>`,
  ),
})
