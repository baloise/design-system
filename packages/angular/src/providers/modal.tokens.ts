import { InjectionToken } from '@angular/core'

/**
 * Injected into a component opened via `DsModalService.create()`, carrying that call's
 * `componentProps`. Mirrors Angular Material's `MAT_DIALOG_DATA` — replaces the deprecated
 * `BalModalService`'s `Object.assign`-onto-the-instance approach.
 */
export const DS_MODAL_DATA = new InjectionToken<unknown>('DS_MODAL_DATA')
