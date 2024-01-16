import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core'

import type { BalModalController, ModalOptions } from '@baloise/design-system-components/components'

import { AngularDelegate } from './angular-delegate'
import { OverlayBaseController } from './overlay'
import { BalTokenModal } from '../utils/token'

@Injectable()
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
    console.log('BalModalService.create')
    console.log('this.angularDelegate', this.angularDelegate)
    console.log('this.resolver', this.resolver)
    console.log('this.injector', this.injector)
    return super.create({
      ...opts,
      delegate: this.angularDelegate.create(this.resolver, this.injector),
    })
  }
}
