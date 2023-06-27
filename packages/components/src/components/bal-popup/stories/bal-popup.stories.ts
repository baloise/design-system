import { ref, watchEffect } from 'vue'
import docs from './bal-popup.docs.mdx'
import { BalPopup } from '../../../../.storybook/vue/generated/components'
import { BalComponentStory, sourceCode } from '../../../stories/utils/story'

const component = BalComponentStory({
  title: 'Components/Popup',
  component: BalPopup,
  subcomponents: {},
  docs,
})

export default component.story

let randomId = 0

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    return {
      args,
      id: `popup-${++randomId}`,
    }
  },
  template: `
<div>
  <bal-button :bal-popup="id">Click me</bal-button>
  <bal-popup :id="id" v-bind="args">Popup content</bal-popup>
</div>
`,
})
Basic.args = {
  label: 'Popup Label',
  arrow: false,
  backdrop: false,
  backdropDismiss: false,
  closable: false,
}
Basic.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-button bal-popup="my-popup">Click me</bal-button>
      <bal-popup id="my-popup" label="Popup Label">Popup content</bal-popup>`,
      components: [],
    }),
    Basic.args,
    {},
  ),
  controls: { exclude: [] },
}

export const Popover = Basic.bind({})
Popover.args = {
  label: 'Popup Label',
  arrow: true,
  backdrop: true,
  backdropDismiss: true,
  closable: true,
}
Popover.parameters = {
  ...component.sourceCode(Popover),
}

export const Fullscreen = Basic.bind({})
Fullscreen.args = {
  variant: 'fullscreen',
  label: 'Popup Label',
  closable: true,
  arrow: false,
  backdrop: false,
  backdropDismiss: false,
}
Fullscreen.parameters = {
  ...component.sourceCode(Fullscreen),
}

export const Drawer = Basic.bind({})
Drawer.args = {
  variant: 'drawer',
  label: 'Popup Label',
  backdrop: true,
  backdropDismiss: true,
  closable: true,
  arrow: false,
}
Drawer.parameters = {
  ...component.sourceCode(Drawer),
}
