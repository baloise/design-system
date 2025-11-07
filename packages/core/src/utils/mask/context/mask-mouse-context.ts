import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface MaskMouseContextEvent extends MaskContextEvent {}

export class MaskMouseContext extends MaskContext {}
