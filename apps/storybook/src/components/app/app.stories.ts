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
  <header><!-- Add Navigation here --></header>
  <main>
    <div class="ds-container my-lg">
      <h1 class="ds-title">Hello World!</h1>
      <!-- Page content -->
    </div>
  </main>
  <ds-app-footer>
    <!-- Footer content -->
  </ds-app-footer>
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

export const WithConfig = Story({
  ...withRender(
    () => `<ds-app brand="helvetia" region="IT" language="it" allowed-languages="it,en" fallback-language="en">
  <main>
    <div class="ds-container my-lg">
      <h1 class="ds-title">Ciao!</h1>
      <p class="my-md">The <code>language="it"</code> config on <code>ds-app</code> propagates to every design system component below it, including <code>ds-close</code>'s label.</p>
      <ds-close button></ds-close>
    </div>
  </main>
  </ds-app>`,
  ),
})
WithConfig.storyName = '🧩 With Config'
