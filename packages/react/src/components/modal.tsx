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
      onDsDidDismiss={(event: Parameters<NonNullable<typeof onDsDidDismiss>>[0]) => {
        onOpenChange?.(false)
        onDsDidDismiss?.(event)
      }}
    />
  )
})
