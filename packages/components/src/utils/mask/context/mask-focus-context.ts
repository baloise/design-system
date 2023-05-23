import { MaskContext, MaskContextEvent } from './mask-context'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskFocusContextEvent extends MaskContextEvent {}

export class MaskFocusContext extends MaskContext<MaskFocusContextEvent> {}
