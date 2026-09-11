import { act, useState, type ReactNode } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { render } from '../test/render'
import { Modal } from './modal'

const dismissEvent = { type: 'dsDidDismiss' }

vi.mock('../generated/components', () => ({
  DsModal: ({
    onDsDidDismiss,
    children,
    open,
  }: {
    onDsDidDismiss?: (event: unknown) => void
    children?: ReactNode
    open?: boolean
  }) => (
    <div data-testid="ds-modal" data-open={String(open)}>
      <button type="button" data-testid="dismiss" onClick={() => onDsDidDismiss?.(dismissEvent)}>
        dismiss
      </button>
      {children}
    </div>
  ),
}))

describe('Modal', () => {
  test('notifies the consumer when the overlay dismisses', () => {
    function Harness() {
      const [open, setOpen] = useState(true)
      return (
        <>
          <span data-testid="open-state">{String(open)}</span>
          <Modal open={open} onOpenChange={setOpen} />
        </>
      )
    }

    const { container, unmount } = render(<Harness />)
    expect(container.querySelector('[data-testid="open-state"]')?.textContent).toBe('true')

    act(() => {
      container.querySelector<HTMLButtonElement>('[data-testid="dismiss"]')?.click()
    })

    expect(container.querySelector('[data-testid="open-state"]')?.textContent).toBe('false')
    unmount()
  })

  test('still forwards onDsDidDismiss to the consumer', () => {
    const onDsDidDismiss = vi.fn()
    const { container, unmount } = render(<Modal open onDsDidDismiss={onDsDidDismiss} />)

    act(() => {
      container.querySelector<HTMLButtonElement>('[data-testid="dismiss"]')?.click()
    })

    expect(onDsDidDismiss).toHaveBeenCalledTimes(1)
    expect(onDsDidDismiss).toHaveBeenCalledWith(dismissEvent)
    unmount()
  })

  test('renders slotted children', () => {
    const { container, unmount } = render(
      <Modal open>
        <span data-testid="child">Body</span>
      </Modal>,
    )

    expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Body')
    unmount()
  })
})
