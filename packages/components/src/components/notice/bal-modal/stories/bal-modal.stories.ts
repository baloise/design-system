import { ref } from 'vue'
import { BalComponentStory } from '../../../../stories/utils'
import { BalModal, BalModalHeader, BalButton, BalModalBody } from '../../../../../.storybook/vue/components'
import docs from './bal-modal.docs.mdx'

const component = BalComponentStory({
  title: 'Components/Notice/Modal',
  component: BalModal,
  subcomponents: { BalModalHeader, BalModalBody },
  docs,
  layout: 'fullscreen',
})

export default component.story

export const Confirm = args => ({
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
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing?</p>
    <bal-button-group position="right" class="mt-5">
      <bal-button color="link" @click="closeModal()">Cancel</bal-button>
      <bal-button color="primary" @click="closeModal()">Okay</bal-button>
    </bal-button-group>
  </bal-modal-body>
</bal-modal>
<bal-button @click="openModal()" class="m-4">Trigger a Modal</bal-button>`,
})
Confirm.args = {}
Confirm.parameters = { ...component.sourceCode(Confirm) }

export const WithInput = args => ({
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
    <form class="columns is-multiline mt-0">
      <bal-field class="column is-full py-0">
        <bal-field-label>Date</bal-field-label>
        <bal-field-control>
          <bal-datepicker placeholder="Pick a date"></bal-datepicker>
        </bal-field-control>
      </bal-field>
    </form>
    <bal-button-group position="right" class="mt-5">
      <bal-button color="link" @click="closeModal()">Cancel</bal-button>
      <bal-button color="primary" @click="closeModal()">Okay</bal-button>
    </bal-button-group>
  </bal-modal-body>
</bal-modal>
<bal-button @click="openModal()" class="m-4">Trigger a Modal</bal-button>`,
})
WithInput.args = {}
WithInput.parameters = { ...component.sourceCode(WithInput) }

export const LargeContent = args => ({
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
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum¨
    </p>
    <bal-button-group position="right" class="mt-5">
      <bal-button color="link" @click="closeModal()">Cancel</bal-button>
      <bal-button color="primary" @click="closeModal()">Okay</bal-button>
    </bal-button-group>
  </bal-modal-body>
</bal-modal>
<bal-button @click="openModal()" class="m-4">Trigger a Modal</bal-button>`,
})
LargeContent.args = {}
LargeContent.parameters = { ...component.sourceCode(LargeContent) }
