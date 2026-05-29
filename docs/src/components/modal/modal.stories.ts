import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsModal

const meta: Meta<Args> = {
  title: 'Components/Modal/Variants',
  args: {
    closable: true,
    modalWidth: 640,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-modal' }),
  },
  ...withRender(
    ({ ...args }) => `
<ds-button onclick="document.getElementById('modal-basic').present()">Open Modal</ds-button>
<ds-modal id="modal-basic" ${props(args)}>
  <ds-modal-header>Modal Title</ds-modal-header>
  <ds-modal-body>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </ds-modal-body>
  <ds-button color="text" slot="actions" onclick="document.getElementById('modal-basic').dismiss()">Cancel</ds-button>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-basic').dismiss()">Confirm</ds-button>
</ds-modal>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const NotClosable = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-not-closable').present()">Open Modal</ds-button>
<ds-modal id="modal-not-closable" closable="false">
  <ds-modal-header>Cannot Be Dismissed</ds-modal-header>
  <ds-modal-body>
    <p>Escape key, close button, and backdrop click are all disabled.</p>
  </ds-modal-body>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-not-closable').dismiss()">Got it</ds-button>
</ds-modal>
`,
  ),
})
NotClosable.storyName = '🧩 Not Closable'

export const Narrow = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-narrow').present()">Open Modal</ds-button>
<ds-modal id="modal-narrow" modal-width="400">
  <ds-modal-header>Narrow Modal</ds-modal-header>
  <ds-modal-body>
    <p>Modal with <code>modal-width="400"</code>.</p>
  </ds-modal-body>
  <ds-button color="text" slot="actions" onclick="document.getElementById('modal-narrow').dismiss()">Cancel</ds-button>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-narrow').dismiss()">Confirm</ds-button>
</ds-modal>
`,
  ),
})
Narrow.storyName = '🧩 Narrow'

export const Wide = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-wide').present()">Open Modal</ds-button>
<ds-modal id="modal-wide" modal-width="900">
  <ds-modal-header>Wide Modal</ds-modal-header>
  <ds-modal-body>
    <p>Modal with <code>modal-width="900"</code>.</p>
  </ds-modal-body>
  <ds-button color="text" slot="actions" onclick="document.getElementById('modal-wide').dismiss()">Cancel</ds-button>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-wide').dismiss()">Confirm</ds-button>
</ds-modal>
`,
  ),
})
Wide.storyName = '🧩 Wide'

export const Scrollable = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-scrollable').present()">Open Modal</ds-button>
<ds-modal id="modal-scrollable">
  <ds-modal-header>Long Content</ds-modal-header>
  <ds-modal-body>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
    <p>Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.</p>
  </ds-modal-body>
  <ds-button color="text" slot="actions" onclick="document.getElementById('modal-scrollable').dismiss()">Cancel</ds-button>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-scrollable').dismiss()">Confirm</ds-button>
</ds-modal>
`,
  ),
})
Scrollable.storyName = '🧩 Scrollable'

export const Fullscreen = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-fullscreen').present()">Open Modal</ds-button>
<ds-modal id="modal-fullscreen" fullscreen>
  <ds-modal-header>Fullscreen Modal</ds-modal-header>
  <ds-modal-body>
    <p>This modal covers the entire viewport. Useful for complex flows or immersive content.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </ds-modal-body>
  <ds-button color="text" slot="actions" onclick="document.getElementById('modal-fullscreen').dismiss()">Cancel</ds-button>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-fullscreen').dismiss()">Confirm</ds-button>
</ds-modal>
`,
  ),
})
Fullscreen.storyName = '🧩 Fullscreen'

export const FullscreenNotClosable = Story({
  ...withRender(
    () => `
<ds-button onclick="document.getElementById('modal-fullscreen-nc').present()">Open Modal</ds-button>
<ds-modal id="modal-fullscreen-nc" fullscreen closable="false">
  <ds-modal-header>Fullscreen — Must Confirm</ds-modal-header>
  <ds-modal-body>
    <p>Escape and backdrop click are disabled. The user must use the action button to dismiss.</p>
  </ds-modal-body>
  <ds-button color="primary" slot="actions" onclick="document.getElementById('modal-fullscreen-nc').dismiss()">Got it</ds-button>
</ds-modal>
`,
  ),
})
FullscreenNotClosable.storyName = '🧩 Fullscreen — Not Closable'
