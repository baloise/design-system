import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core'

import type { BalModalController, ModalOptions } from '@baloise/ds-core'

import { AngularDelegate } from './angular-delegate'
import { OverlayBaseController } from './overlay'
import { BalTokenModal } from '../utils/token'

@Injectable({ providedIn: 'root' })
export class BalModalService extends OverlayBaseController<ModalOptions, HTMLBalModalElement> {
  constructor(
    private angularDelegate: AngularDelegate,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(BalTokenModal) ctrl: BalModalController,
  ) {
    super(ctrl)
  }

  override create(opts: ModalOptions): Promise<HTMLBalModalElement> {
    return super.create({
      ...opts,
      delegate: this.angularDelegate.create(this.resolver, this.injector),
    })
  }
}
