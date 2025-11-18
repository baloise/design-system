import { balBrandIconCarGreen } from '@baloise/ds-brand-icons/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

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

export const CheckboxButton = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-checkbox-group interface="button">
            <bal-checkbox checked="true">
                Label
            </bal-checkbox>
            <bal-checkbox>
                Label
            </bal-checkbox>
            <bal-checkbox>
                Random text with a <a class="link" target="_blank" href="http://baloise.ch">Link</a> in it
            </bal-checkbox>
        </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const CheckboxTile = Story({
  ...withRender(
    () => `<bal-checkbox-group interface="tile" value="1">
    <bal-checkbox name="checkbox-example" value="1">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Simple checkbox button</bal-label>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="2">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Checkbox button with a switch</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-switch></bal-switch>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="3" invalid>
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Invalid button</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-switch></bal-switch>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="4" disabled="true">
        <bal-stack>
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content>
                <bal-label>Disabled button</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-switch></bal-switch>
        </bal-stack>
    </bal-checkbox>
</bal-checkbox-group>`,
  ),
})
export const CheckboxTileGrid = Story({
  ...withRender(
    () => `<bal-checkbox-group interface="tile" value="1" columns="3" columns-tablet="2">
    <bal-checkbox name="checkbox-example" value="1">
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 1</bal-label>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="2">
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 2</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="3">
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 3</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="4">
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 4</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
    <bal-checkbox name="checkbox-example" value="5">
        <bal-stack layout="vertical" align="center">
            <bal-icon svg='${balBrandIconCarGreen}' size="large" color="auto"></bal-icon>
            <bal-content align="center">
                <bal-label size="large">Checkbox Button 5</bal-label>
                <bal-text size="small">Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.</bal-text>
            </bal-content>
            <bal-check></bal-check>
        </bal-stack>
    </bal-checkbox>
</bal-checkbox-group>`,
  ),
})
