import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskMouseContextEvent extends MaskContextEvent {}

export class MaskMouseContext extends MaskContext<MaskMouseContextEvent> {}
