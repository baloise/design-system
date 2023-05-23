import { MaskContext, MaskContextEvent } from './mask-context'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskMouseContextEvent extends MaskContextEvent {}

export class MaskMouseContext extends MaskContext<MaskMouseContextEvent> {}
