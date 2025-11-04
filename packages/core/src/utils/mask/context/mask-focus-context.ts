import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface MaskFocusContextEvent extends MaskContextEvent {}

export class MaskFocusContext extends MaskContext<MaskFocusContextEvent> {}
