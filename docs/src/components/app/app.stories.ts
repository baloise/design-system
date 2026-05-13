import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsApp

const meta: Meta<Args> = {
  title: 'Components/App/Variants',
  argTypes: {
    ...withComponentControls({ tag: 'ds-app' }),
  },
  ...withRender(
    () => `<ds-app class="has-sticky-footer">
  <header>
    <ds-navbar>
      <ds-navbar-brand>App Title</ds-navbar-brand>
    </ds-navbar>
  </header>
  <main>
    <div class="container my-large">
      <h1 class="title">Hello World!</h1>
      <!-- Page content -->
    </div>
  </main>
  <ds-footer>
    <!-- Footer content -->
  </ds-footer>
  </ds-app>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'
