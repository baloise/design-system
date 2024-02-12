import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core'

import type { BalModalController, ModalOptions } from '@baloise/design-system-components/components'
import { defineCustomElement } from '@baloise/design-system-components/components/bal-modal'

import { AngularDelegate, OverlayBaseController, BalTokenModal } from '@baloise/design-system-components-angular/common'

@Injectable()
export class BalModalService extends OverlayBaseController<ModalOptions, HTMLBalModalElement> {
  constructor(
    private angularDelegate: AngularDelegate,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(BalTokenModal) ctrl: BalModalController,
  ) {
    super(ctrl)
    defineCustomElement()
  }

  override create(opts: ModalOptions): Promise<HTMLBalModalElement> {
    return super.create({
      ...opts,
      delegate: this.angularDelegate.create(this.resolver, this.injector),
    })
  }
}
