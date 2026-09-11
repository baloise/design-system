import { ComponentProps, ComponentRef, forwardRef } from 'react'
import { DsModal } from '../generated/components'

export type ModalProps = ComponentProps<typeof DsModal> & {
  onOpenChange?: (open: boolean) => void
}

export const Modal = forwardRef<ComponentRef<typeof DsModal>, ModalProps>(function Modal(
  { onOpenChange, onDsDidDismiss, ...props },
  ref,
) {
  return (
    <DsModal
      {...props}
      ref={ref}
      onDsDidDismiss={event => {
        onOpenChange?.(false)
        onDsDidDismiss?.(event)
      }}
    />
  )
})
