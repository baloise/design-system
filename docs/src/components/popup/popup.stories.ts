import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsPopup

const tag = 'ds-popup'

const meta: Meta<Args> = {
  title: 'Components/Popup/Variants',
  args: {
    placement: 'right',
    closable: false,
    backdropDismiss: false,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-popup' }),
  },
  ...withRender(
    ({ ...args }) => `
<ds-popup id="popup-story" ${props(args)}>
  <p>Popup content</p>
</ds-popup>

<!-- Trigger -->
<ds-button data-popup="popup-story">Open Popup</ds-button>`,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Popup = Story({
  args: {},
  ...withRender(
    ({ ...args }) => `
<ds-popup id="popup-story" ${props(args)}>
  <p>Popup content</p>
</ds-popup>

<!-- Trigger -->
<ds-button data-popup="popup-story">Open Popup</ds-button>`,
  ),
})
Popup.storyName = '🧩 Basic'

export const PlacementTop = Story({
  args: {
    placement: 'top',
    closable: true,
  },
  ...withRender(
    ({ placement, ...args }) => `
<ds-popup id="popup-top" placement="${placement}" ${props(args)}>
  <p>Placed above the trigger.</p>
</ds-popup>

<!-- Trigger -->
<ds-button data-popup="popup-top">Top</ds-button>`,
  ),
})
PlacementTop.storyName = '🧩 Placement: Top'

export const PlacementRight = Story({
  args: {
    placement: 'right',
    closable: true,
  },
  ...withRender(
    ({ placement, ...args }) => `
<ds-popup id="popup-right" placement="${placement}" ${props(args)}>
  <p>Placed to the right.</p>
</ds-popup>

<!-- Trigger -->
<ds-button data-popup="popup-right">Right</ds-button>
    `,
  ),
})
PlacementRight.storyName = '🧩 Placement: Right'

export const PlacementLeft = Story({
  args: {
    placement: 'left',
    closable: true,
  },
  ...withRender(
    ({ placement, ...args }) => `
<ds-popup id="popup-left" placement="${placement}" ${props(args)}>
  <p>Placed to the left.</p>
</ds-popup>

<!-- Trigger -->
<ds-button data-popup="popup-left">Left</ds-button>
    `,
  ),
})
PlacementLeft.storyName = '🧩 Placement: Left'

export const BackdropDismiss = Story({
  args: {
    backdropDismiss: true,
  },
  ...withRender(
    ({ ...args }) => `
<ds-button data-popup="popup-backdrop">Open (click outside to close)</ds-button>
<ds-popup id="popup-backdrop" ${props(args)}>
  <p>Click anywhere outside to close.</p>
</ds-popup>
    `,
  ),
})
BackdropDismiss.storyName = '🧩 Backdrop Dismiss'

export const BackdropOverlay = Story({
  args: {
    backdrop: true,
    backdropDismiss: true,
    closable: true,
  },
  ...withRender(
    ({ ...args }) => `
<ds-button data-popup="popup-overlay">Open with backdrop</ds-button>
<ds-popup id="popup-overlay" ${props(args)}>
  <p>Full-screen backdrop is visible behind the panel.</p>
</ds-popup>
    `,
  ),
})
BackdropOverlay.storyName = '🧩 Backdrop Overlay'

export const RoleListbox = Story({
  args: {
    role: 'listbox',
    backdropDismiss: true,
  },
  ...withRender(
    ({ role, ...args }) => `
<ds-button id="trigger-listbox">Choose option</ds-button>
<ds-popup id="popup-listbox" role="${role}" ${props(args)}>
  <ul role="group" style="list-style: none; margin: 0; padding: 0.5rem 0; min-width: 10rem">
    <li role="option" tabindex="0" style="padding: 0.5rem 1rem; cursor: pointer">Option A</li>
    <li role="option" tabindex="0" style="padding: 0.5rem 1rem; cursor: pointer">Option B</li>
    <li role="option" tabindex="0" style="padding: 0.5rem 1rem; cursor: pointer">Option C</li>
  </ul>
</ds-popup>
<script>
  (() => {
    const trigger = document.getElementById('trigger-listbox')
    const popup = document.getElementById('popup-listbox')
    if (trigger && popup) {
      popup.trigger = trigger
      trigger.addEventListener('click', () => popup.toggle())
    }
  })()
</script>
    `,
  ),
})
RoleListbox.storyName = '🧩 Role: Listbox'

export const Group = Story({
  ...withRender(
    () => `
<ds-button data-popup="popup-group-a">Open A</ds-button>
<ds-button data-popup="popup-group-b">Open B</ds-button>
<ds-popup id="popup-group-a" group="nav" closable>
  <p>Opening B will close this one.</p>
</ds-popup>
<ds-popup id="popup-group-b" group="nav" closable>
  <p>Opening A will close this one.</p>
</ds-popup>
    `,
  ),
})
Group.storyName = '🧩 Group: Mutual Exclusion'

export const Programmatic = Story({
  args: {
    closable: true,
    placement: 'bottom',
  },
  ...withRender(
    ({ ...args }) => `
<ds-button id="trigger-prog">Open</ds-button>
<ds-button id="trigger-prog-close">Close</ds-button>
<ds-popup id="popup-prog" ${props(args)}>
  <p>Opened and closed via <code>present()</code> / <code>dismiss()</code>.</p>
</ds-popup>
<script>
  (() => {
    const popup = document.getElementById('popup-prog')
    const trigger = document.getElementById('trigger-prog')
    if (popup && trigger) {
      popup.trigger = trigger
      trigger.addEventListener('click', () => popup.present())
      document.getElementById('trigger-prog-close')?.addEventListener('click', () => popup.dismiss())
    }
  })()
</script>
    `,
  ),
})
Programmatic.storyName = '🧩 Programmatic API'

export const FocusTrap = Story({
  args: {
    closable: true,
    backdropDismiss: true,
  },
  ...withRender(
    ({ ...args }) => `
<ds-button data-popup="popup-focus">Open with form</ds-button>
<ds-popup id="popup-focus" ${props(args)}>
  <div style="padding: 0.5rem; display: flex; flex-direction: column; gap: 0.75rem; min-width: 16rem">
    <ds-input placeholder="First name"></ds-input>
    <ds-input placeholder="Last name"></ds-input>
    <ds-button>Submit</ds-button>
  </div>
</ds-popup>
    `,
  ),
})
FocusTrap.storyName = '🧩 Focus Trap'
