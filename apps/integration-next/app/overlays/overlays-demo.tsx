'use client'

import { useState } from 'react'
import { DsButton, DsModalBody, DsModalHeader, Modal, useSnackbar, useToast } from '@helvetia-design/react'

export default function OverlaysDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [presentToast, dismissToast] = useToast()
  const [presentSnackbar, dismissSnackbar] = useSnackbar()

  return (
    <main>
      <h1>ds-react Next.js overlays</h1>

      <p data-testid="modal-open">Modal open: {String(isOpen)}</p>
      <DsButton data-testid="open-modal" onDsClick={() => setIsOpen(true)}>
        Open modal
      </DsButton>
      <Modal open={isOpen} onOpenChange={setIsOpen} data-testid="modal">
        <DsModalHeader>Test Modal</DsModalHeader>
        <DsModalBody>
          <p>Body content</p>
        </DsModalBody>
      </Modal>

      <DsButton
        data-testid="show-toast"
        onDsClick={() =>
          presentToast({
            heading: 'Saved',
            message: 'Your changes have been saved.',
            closable: true,
            duration: 'infinite',
            closeHandler: () => undefined,
            actionHandler: () => undefined,
          })
        }
      >
        Show toast
      </DsButton>
      <DsButton data-testid="dismiss-toast" onDsClick={() => dismissToast()}>
        Dismiss toast
      </DsButton>

      <DsButton
        data-testid="show-snackbar"
        onDsClick={() =>
          presentSnackbar({
            heading: 'Offline',
            message: 'You are currently offline.',
            closable: true,
            closeHandler: () => undefined,
            actionHandler: () => undefined,
          })
        }
      >
        Show snackbar
      </DsButton>
      <DsButton data-testid="dismiss-snackbar" onDsClick={() => dismissSnackbar()}>
        Dismiss snackbar
      </DsButton>
    </main>
  )
}
