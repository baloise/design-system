import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalNavbar & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Navigation/Navbar',
  args: {
    interface: 'app',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-navbar' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-navbar ${props(args)}>
  <bal-navbar-brand href="/" target="_blank">App Header</bal-navbar-brand>
  <bal-navbar-menu>
      <bal-navbar-menu-start>
          <bal-tabs interface="navbar" v-model="myActiveTab">
              <bal-tab-item value="tab-a" label="Tab A"></bal-tab-item>
              <bal-tab-item value="tab-b" label="Tab B"></bal-tab-item>
              <bal-tab-item value="tab-c" label="Tab C"></bal-tab-item>
          </bal-tabs>
      </bal-navbar-menu-start>
      <bal-navbar-menu-end>
          <bal-button-group>
              <bal-popover v-model="isActive">
                  <bal-button bal-popover-trigger color="light" inverted icon="web">
                      DE
                  </bal-button>
                  <bal-popover-content>
                      <bal-list border>
                          <bal-list-item clickable>
                              <bal-list-item-content>
                                  <bal-list-item-title>English</bal-list-item-title>
                              </bal-list-item-content>
                          </bal-list-item>
                          <bal-list-item clickable>
                              <bal-list-item-content>
                                  <bal-list-item-title>Français</bal-list-item-title>
                              </bal-list-item-content>
                          </bal-list-item>
                          <bal-list-item clickable>
                              <bal-list-item-content>
                                  <bal-list-item-title>Italiano</bal-list-item-title>
                              </bal-list-item-content>
                          </bal-list-item>
                      </bal-list>
                  </bal-popover-content>
              </bal-popover>
              <bal-button square color="light" inverted icon="call"></bal-button>
          </bal-button-group>
      </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Simple = Story({
  args: {
    interface: 'simple',
  },
  ...withRender(
    ({ ...args }) => `<bal-navbar ${props(args)}>
  <bal-navbar-brand href="/">Simple Header</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger :square="square" color="light" inverted  icon="web" @click="toggle()">
          <span class="is-hidden-mobile">DE</span>
        </bal-button>
        <bal-popover-content>
          <bal-list border>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>English</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>Français</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>Italiano</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
          </bal-list>
        </bal-popover-content>
      </bal-popover>
      <bal-button :square="square" href="tel://00800 24 800 800" color="light" inverted icon="call">
        <span class="is-hidden-mobile">Call us</span>
      </bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
  ),
})

export const Light = Story({
  args: {
    interface: 'simple',
    light: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-navbar ${props(args)}>
  <bal-navbar-brand logo='https://via.placeholder.com/200x50'>Partner Page</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger :square="square" color="light" icon="web" @click="toggle()">
          <span class="is-hidden-mobile">DE</span>
        </bal-button>
        <bal-popover-content>
          <bal-list border>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>English</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>Français</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
            <bal-list-item clickable>
              <bal-list-item-content>
                <bal-list-item-title>Italiano</bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
          </bal-list>
        </bal-popover-content>
      </bal-popover>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
  ),
})
