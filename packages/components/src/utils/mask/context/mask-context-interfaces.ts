import { MaskComponent } from '../component'
import { Mask } from '../mask-interfaces'

export interface MaskContextEvent {
  preventDefault?(): void
  stopPropagation?(): void
}

export interface MaskContextOptions<T> {
  component: MaskComponent
  event: T & MaskContextEvent
  mask: Mask
}
