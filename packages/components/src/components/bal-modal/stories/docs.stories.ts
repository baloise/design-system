import { ref } from 'vue'
import { BalComponentStory } from '../../../stories/utils'
import { BalModal, BalModalHeader, BalButton, BalModalBody, BalModalFooter, BalModalActions } from '../../../../.storybook/vue/components'
import docs from './readme.docs.mdx'

const component = BalComponentStory({
  component: BalModal,
  subcomponents: { BalModalHeader, BalModalBody, BalModalFooter, BalModalActions },
  docs,
  layout: 'fullscreen',
})

export default component.story

const Template = args => ({
  components: { ...component.components, BalButton },
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
<bal-button @click="openModal()" class="m-4">Trigger a Modal</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
