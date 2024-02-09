import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'
import { balBrandIconCarGreen } from '@baloise/design-system-brand-icons'
import { balBrandIconCarRed } from '@baloise/design-system-brand-icons'
import { balBrandIconCarPurple } from '@baloise/design-system-brand-icons'

type Args = JSX.BalCheckbox & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Checkbox',
  args: {
    ...withDefaultContent(),
    content: 'Label',
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-checkbox' }),
  },
  ...withRender(({ content, ...args }) => `<bal-checkbox ${props(args)}>${content}</bal-checkbox>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FieldControl = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-checkbox-group>
      <bal-checkbox>
        Label
      </bal-checkbox>
    </bal-checkbox-group>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const Switch = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
      <bal-checkbox-group>
          <bal-checkbox interface="switch">
              Label
          </bal-checkbox>
      </bal-checkbox-group>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const Group = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-checkbox-group>
      <bal-checkbox>
        Apple
      </bal-checkbox>
      <bal-checkbox checked="true">
        Pineapple
      </bal-checkbox>
      <bal-checkbox>
        Orange
      </bal-checkbox>
    </bal-checkbox-group>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const VerticalGroup = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-checkbox-group vertical="true">
      <bal-checkbox checked="true">
        Apple
      </bal-checkbox>
      <bal-checkbox>
        Pineapple
      </bal-checkbox>
      <bal-checkbox>
        Orange
      </bal-checkbox>
    </bal-checkbox-group>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const FilterButtons = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-checkbox-group interface="select-button">
            <bal-checkbox checked="true">
                Label
            </bal-checkbox>
            <bal-checkbox>
                Label
            </bal-checkbox>
            <bal-checkbox>
                Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it
            </bal-checkbox>
        </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const CheckboxButton = Story({
  ...withRender(
    () => `<bal-checkbox-group value="1">
    <bal-checkbox-button>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Simple checkbox button</bal-label>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="1"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Checkbox button with a switch</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox interface="switch" label-hidden="true" name="checkbox-example" value="2"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button invalid>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarRed}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Invalid button</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox interface="switch" label-hidden="true" name="checkbox-example" value="3"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button disabled="true">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarPurple}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Disabled button</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox interface="switch" label-hidden="true" name="checkbox-example" value="4"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
</bal-checkbox-group>`,
  ),
})
export const CheckboxButtonGrid = Story({
  ...withRender(
    () => `<bal-checkbox-group value="1" columns="3" columns-tablet="2">
    <bal-checkbox-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 1</bal-label>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="1"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 2</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="2"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 3</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="3"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 4</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="4"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
    <bal-checkbox-button>
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 5</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-checkbox label-hidden="true" name="checkbox-example" value="5"></bal-checkbox>
        </bal-stack>
    </bal-checkbox-button>
</bal-checkbox-group>`,
  ),
})
