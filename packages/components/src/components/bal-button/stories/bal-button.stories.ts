import { BalComponentStory } from '../../../stories/utils'
import { BalButton, BalButtonGroup } from '../../../../.storybook/vue/components'
import docs from './bal-button.docs.mdx'

const component = BalComponentStory({
  component: BalButton,
  docs,
  status: 'stable',
  args: {
    content: 'Primary',
    color: 'primary',
    icon: '',
    size: '',
    disabled: false,
    loading: false,
    inverted: false,
    expanded: false,
    square: false,
  },
})

export default component.story

const excludedControls = [
  'bottomRounded',
  'download',
  'isActive',
  'name',
  'rel',
  'target',
  'topRounded',
  'type',
  'value',
]

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">{{ args.content }}</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Primary',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const ButtonVariants = args => ({
  components: { ...component.components, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button v-bind="args">Primary</bal-button>
  <bal-button v-bind="args" color="info">Secondary</bal-button>
  <bal-button v-bind="args" color="info" outlined>Tertiary</bal-button>
  <bal-button v-bind="args" color="link">Link</bal-button>
</bal-button-group>`,
})
ButtonVariants.parameters = {
  ...component.sourceCode(ButtonVariants),
  controls: { exclude: [...excludedControls, 'color', 'expanded', 'href'] },
}

export const ButtonStates = args => ({
  components: { ...component.components, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button loading>Loading</bal-button>
  <bal-button disabled>Disabled</bal-button>
</bal-button-group>`,
})
ButtonStates.parameters = {
  ...component.sourceCode(ButtonStates),
  controls: { exclude: [...excludedControls, 'color', 'expanded', 'href'] },
}

export const AlertButtons = args => ({
  components: { ...component.components, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button v-bind="args" color="success">Success</bal-button>
  <bal-button v-bind="args" color="warning">Warning</bal-button>
  <bal-button v-bind="args" color="danger">Danger</bal-button>
</bal-button-group>`,
})
AlertButtons.parameters = {
  ...component.sourceCode(AlertButtons),
  controls: { exclude: [...excludedControls, 'color', 'expanded', 'href'] },
}

export const SquareButtons = args => ({
  components: { ...component.components, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button v-bind="args" icon="plus"></bal-button>
  <bal-button v-bind="args" color="info" icon="account"></bal-button>
  <bal-button v-bind="args" color="info" outlined>42</bal-button>
</bal-button-group>`,
})
SquareButtons.args = {
  square: true,
}
SquareButtons.parameters = {
  ...component.sourceCode(SquareButtons),
  controls: { exclude: [...excludedControls, 'color', 'expanded', 'href'] },
}

export const ButtonGroup = args => ({
  components: { ...component.components, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button v-bind="args" color="link">Left</bal-button>
  <bal-button v-bind="args">Aligned</bal-button>
</bal-button-group>
<bal-button-group position="center">
  <bal-button v-bind="args" color="link">Center</bal-button>
  <bal-button v-bind="args">Aligned</bal-button>
</bal-button-group>
<bal-button-group position="right">
  <bal-button v-bind="args" color="link">Right</bal-button>
  <bal-button v-bind="args">Aligned</bal-button>
</bal-button-group>`,
})
ButtonGroup.parameters = {
  ...component.sourceCode(ButtonGroup),
  controls: { exclude: [...excludedControls, 'color', 'expanded', 'href'] },
}

export const Link = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">Link</bal-button>`,
})
Link.args = {
  color: 'link',
  flat: false,
  inverted: false,
  iconRight: 'plus',
}
Link.parameters = { ...component.sourceCode(Link), controls: { exclude: excludedControls } }

export const NativeLink = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<a class="is-link">Link</a>`,
})
NativeLink.args = {}
NativeLink.parameters = { ...component.sourceCode(NativeLink), controls: { exclude: excludedControls } }
