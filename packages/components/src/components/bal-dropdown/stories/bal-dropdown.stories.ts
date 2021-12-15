import { ref, watchEffect } from 'vue'
import docs from './bal-dropdown.docs.mdx'
import { withContent } from '../../../stories/utils'
import { BalDropdown, BalDropdownMenu, BalDropdownTrigger, BalButton } from '../../../../.storybook/vue/components'
import { BalComponentStory } from '../../../stories/utils/story'

const component = BalComponentStory({
  component: BalDropdown,
  subcomponents: { BalDropdownMenu, BalDropdownTrigger },
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalButton },
  setup: () => {
    const isActive = ref(true)

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.isActive
    })

    return {
      args,
      isActive,
      toggle,
    }
  },
  template: `<bal-dropdown v-bind="args" :is-active="isActive">
  <bal-dropdown-trigger>
    <bal-button @click="toggle()" aria-haspopup="true" aria-controls="dropdown-menu" color="is-info" outlined>
      <span id="bal-dropdown-1-trigger-label">Trigger</span>
    </bal-button>
  </bal-dropdown-trigger>
  <bal-dropdown-menu :scrollable="200">
    <div style="padding: 0 15px 15px">
      <h5 class="title is-size-3" style="margin-top: 0px">Title</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo
        dolor aperiam perferendis mollitia facilis harum vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque
        error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero.
      </p>
    </div>
  </bal-dropdown-menu>
  </bal-dropdown>`,
})
Basic.args = {
  isActive: false,
  expanded: true,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
Basic.parameters = { ...component.sourceCode(Basic) }
