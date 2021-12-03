import { ref } from 'vue'
import { stencilArgType } from '../../../stories/utils'
import { BalModal, BalModalHeader, BalButton, BalModalBody, BalModalFooter, BalModalActions } from '../../../../.storybook/vue/components'
import docs from './readme.docs.mdx'

const subcomponents = { BalModalHeader, BalModalBody, BalModalFooter, BalModalActions }
const components = { BalModal, ...subcomponents }

export default {
  title: 'Components/Modal',
  component: BalModal,
  subcomponents,
  argTypes: {
    ...stencilArgType('bal-modal'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { ...components, BalButton },
  props: Object.keys(argTypes),
  setup: () => {
    const modal = ref()

    function openModal() {
      modal.value?.$el.open()
    }

    function closeModal() {
      modal.value?.$el.close()
    }

    return {
      args,
      modal,
      openModal,
      closeModal,
    }
  },
  template: `
<bal-modal ref="modal" v-bind="args">
  <bal-modal-header>Modal Title</bal-modal-header>
  <bal-modal-body>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua.
    </p>
  </bal-modal-body>
  <bal-modal-footer>
    <bal-modal-actions>
      <bal-button color="link" @click="closeModal()">Cancel</bal-button>
      <bal-button color="primary" @click="closeModal()">Okay</bal-button>
    </bal-modal-actions>
  </bal-modal-footer>
</bal-modal>
<bal-button @click="openModal()">Trigger a Modal</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {}
