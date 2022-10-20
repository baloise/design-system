import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core'
import { balModalController, ModalOptions } from '@baloise/design-system-components'
import { AngularDelegate } from './angular-delegate'
import { OverlayBaseController } from './overlay'

@Injectable()
export class BalModalService extends OverlayBaseController<ModalOptions, HTMLBalModalElement> {
  constructor(
    private angularDelegate: AngularDelegate,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    super(balModalController as any)
  }

  create(opts: ModalOptions): Promise<HTMLBalModalElement> {
    return super.create({
      ...opts,
      delegate: this.angularDelegate.create(this.resolver, this.injector),
    })
  }
}
